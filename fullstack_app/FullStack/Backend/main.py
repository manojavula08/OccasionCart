from fastapi import FastAPI, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import List

import crud, models, schemas
import database
from business_logic import market_scout_engine
from config import settings
from logger import logger
from exceptions import (
    MarketScoutException, AuthenticationError, AuthorizationError,
    NotFoundError, ValidationError, DatabaseError,
    marketscout_exception_handler, http_exception_handler,
    validation_exception_handler, sqlalchemy_exception_handler,
    general_exception_handler
)
from rate_limiter import limiter, AUTH_RATE_LIMIT, API_RATE_LIMIT, HEAVY_OPERATION_RATE_LIMIT
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler

# Create database tables
models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(
    title=settings.APP_NAME,
    description="API for MarketScout application - Track social media ads and discover trending products",
    version=settings.APP_VERSION,
    debug=settings.DEBUG
)

# Add rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Add exception handlers
app.add_exception_handler(MarketScoutException, marketscout_exception_handler)
app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(SQLAlchemyError, sqlalchemy_exception_handler)
app.add_exception_handler(Exception, general_exception_handler)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# JWT settings
SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise AuthenticationError("Invalid token")
        token_data = schemas.TokenData(username=username)
    except JWTError:
        raise AuthenticationError("Invalid token")
    
    user = crud.get_user_by_username(db, username=token_data.username)
    if user is None:
        raise AuthenticationError("User not found")
    return user

# Authentication endpoints
@app.post("/signup", response_model=schemas.User)
@limiter.limit(AUTH_RATE_LIMIT)
def signup(request: Request, user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    logger.info(f"User signup attempt: {user.username}")
    
    try:
        # Check if email already exists
        db_user = crud.get_user_by_email(db, email=user.email)
        if db_user:
            logger.warning(f"Signup failed - email already registered: {user.email}")
            raise ValidationError("Email already registered")
        
        # Check if username already exists
        db_user = crud.get_user_by_username(db, username=user.username)
        if db_user:
            logger.warning(f"Signup failed - username already taken: {user.username}")
            raise ValidationError("Username already taken")
        
        new_user = crud.create_user(db=db, user=user)
        logger.info(f"User created successfully: {new_user.username}")
        return new_user
        
    except ValidationError:
        # Re-raise validation errors to be handled by FastAPI
        raise
    except Exception as e:
        logger.error(f"Failed to create user: {str(e)}")
        raise DatabaseError("Failed to create user")

@app.post("/token", response_model=schemas.Token)
@limiter.limit(AUTH_RATE_LIMIT)
def login_for_access_token(request: Request, form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    logger.info(f"Login attempt: {form_data.username}")
    
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        logger.warning(f"Login failed for user: {form_data.username}")
        raise AuthenticationError("Incorrect username or password")
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    
    logger.info(f"Login successful for user: {user.username}")
    return {"access_token": access_token, "token_type": "bearer"}

# Product endpoints
@app.get("/products", response_model=List[schemas.Product])
def read_products(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    products = crud.get_products(db, skip=skip, limit=limit)
    return products

@app.get("/products/{product_id}", response_model=schemas.Product)
def read_product(product_id: int, db: Session = Depends(database.get_db)):
    db_product = crud.get_product(db, product_id=product_id)
    if db_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return db_product

@app.post("/products", response_model=schemas.Product)
def create_product(product: schemas.ProductCreate, db: Session = Depends(database.get_db)):
    return crud.create_product(db=db, product=product)

# Ad endpoints
@app.get("/ads", response_model=List[schemas.Ad])
def read_ads(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    ads = crud.get_ads(db, skip=skip, limit=limit)
    return ads

@app.post("/ads", response_model=schemas.Ad)
def create_ad(ad: schemas.AdCreate, db: Session = Depends(database.get_db)):
    return crud.create_ad(db=db, ad=ad)

# Trend endpoints
@app.get("/trends/{product_id}", response_model=List[schemas.Trend])
def read_trends(product_id: int, db: Session = Depends(database.get_db)):
    trends = crud.get_trends_by_product(db, product_id=product_id)
    return trends

@app.post("/trends", response_model=schemas.Trend)
def create_trend(trend: schemas.TrendCreate, db: Session = Depends(database.get_db)):
    return crud.create_trend(db=db, trend=trend)

# Watchlist endpoints
@app.get("/watchlists", response_model=List[schemas.Watchlist])
def read_watchlist(current_user: schemas.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    watchlist = crud.get_user_watchlist(db, user_id=current_user.id)
    return watchlist

@app.post("/watchlists", response_model=schemas.Watchlist)
def create_watchlist_item(watchlist: schemas.WatchlistCreate, current_user: schemas.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    return crud.create_watchlist_item(db=db, watchlist=watchlist, user_id=current_user.id)

@app.delete("/watchlists/{product_id}")
def delete_watchlist_item(product_id: int, current_user: schemas.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    db_watchlist = crud.delete_watchlist_item(db, user_id=current_user.id, product_id=product_id)
    if db_watchlist is None:
        raise HTTPException(status_code=404, detail="Watchlist item not found")
    return {"message": "Watchlist item deleted"}

# Alert endpoints
@app.get("/alerts", response_model=List[schemas.Alert])
def read_alerts(current_user: schemas.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    alerts = crud.get_user_alerts(db, user_id=current_user.id)
    return alerts

@app.post("/alerts", response_model=schemas.Alert)
def create_alert(alert: schemas.AlertCreate, current_user: schemas.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    return crud.create_alert(db=db, alert=alert, user_id=current_user.id)

# Business Logic endpoints
@app.get("/scan-ads")
@limiter.limit(API_RATE_LIMIT)
def scan_ads(request: Request, db: Session = Depends(database.get_db)):
    logger.info("Scanning for viral ads")
    try:
        viral_ads = market_scout_engine.scan_for_viral_ads(db)
        return {"viral_ads": viral_ads}
    except Exception as e:
        logger.error(f"Failed to scan ads: {str(e)}")
        raise DatabaseError("Failed to scan ads")

@app.get("/heat-map")
@limiter.limit(API_RATE_LIMIT)
def get_heat_map(request: Request, db: Session = Depends(database.get_db)):
    logger.info("Generating heat map")
    try:
        heat_map = market_scout_engine.generate_heat_map_data(db)
        return {"heat_map": heat_map}
    except Exception as e:
        logger.error(f"Failed to generate heat map: {str(e)}")
        raise DatabaseError("Failed to generate heat map")

@app.get("/trending")
@limiter.limit(API_RATE_LIMIT)
def get_trending_products(request: Request, limit: int = 10, db: Session = Depends(database.get_db)):
    logger.info(f"Getting trending products (limit: {limit})")
    try:
        trending_products = market_scout_engine.get_trending_products(db, limit)
        return {"trending_products": trending_products}
    except Exception as e:
        logger.error(f"Failed to get trending products: {str(e)}")
        raise DatabaseError("Failed to get trending products")

@app.post("/calculate-score/{product_id}")
@limiter.limit(HEAVY_OPERATION_RATE_LIMIT)
def calculate_trend_score(request: Request, product_id: int, db: Session = Depends(database.get_db)):
    logger.info(f"Calculating trend score for product {product_id}")
    try:
        score = market_scout_engine.calculate_ai_trend_score(product_id, db)
        
        # Save the calculated score as a new trend entry
        trend_data = schemas.TrendCreate(
            product_id=product_id,
            score=score,
            date=datetime.utcnow()
        )
        new_trend = crud.create_trend(db, trend_data)
        
        return {
            "product_id": product_id,
            "trend_score": score,
            "calculated_at": new_trend.date.isoformat()
        }
    except Exception as e:
        logger.error(f"Failed to calculate trend score: {str(e)}")
        raise DatabaseError("Failed to calculate trend score")

@app.get("/check-alerts")
@limiter.limit(API_RATE_LIMIT)
def check_alerts(request: Request, current_user: schemas.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    logger.info(f"Checking alerts for user {current_user.username}")
    try:
        alerts = market_scout_engine.check_for_alerts(current_user.id, db)
        return {"alerts": alerts}
    except Exception as e:
        logger.error(f"Failed to check alerts: {str(e)}")
        raise DatabaseError("Failed to check alerts")

@app.get("/export/{data_type}")
@limiter.limit(API_RATE_LIMIT)
def export_data(request: Request, data_type: str, current_user: schemas.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    logger.info(f"Exporting {data_type} data for user {current_user.username}")
    try:
        if data_type == "watchlist":
            data = crud.get_user_watchlist(db, user_id=current_user.id)
        elif data_type == "trends":
            # Get trends for all products in user's watchlist
            watchlist = crud.get_user_watchlist(db, user_id=current_user.id)
            data = []
            for item in watchlist:
                trends = crud.get_trends_by_product(db, product_id=item.product_id)
                data.extend(trends)
        else:
            raise ValidationError("Invalid data type")
        
        # Convert to CSV format
        import csv
        import io
        output = io.StringIO()
        if data:
            writer = csv.DictWriter(output, fieldnames=data[0].__dict__.keys())
            writer.writeheader()
            for item in data:
                writer.writerow(item.__dict__)
        
        from fastapi.responses import StreamingResponse
        output.seek(0)
        return StreamingResponse(
            io.StringIO(output.getvalue()),
            media_type="text/csv",
            headers={"Content-Disposition": f"attachment; filename={data_type}_export.csv"}
        )
    except Exception as e:
        logger.error(f"Failed to export data: {str(e)}")
        raise DatabaseError("Failed to export data")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


# Business Logic endpoints
@app.get("/scan-ads")
def scan_viral_ads(db: Session = Depends(database.get_db)):
    """Scan for viral ads across platforms"""
    viral_ads = market_scout_engine.scan_for_viral_ads(db)
    return {"viral_ads": viral_ads}

@app.get("/heat-map")
def get_heat_map(db: Session = Depends(database.get_db)):
    """Get heat map data for product popularity by region"""
    heat_map_data = market_scout_engine.generate_heat_map_data(db)
    return {"heat_map": heat_map_data}

@app.get("/trending")
def get_trending_products(limit: int = 10, db: Session = Depends(database.get_db)):
    """Get currently trending products"""
    trending = market_scout_engine.get_trending_products(db, limit)
    return {"trending_products": trending}

@app.post("/calculate-score/{product_id}")
def calculate_trend_score(product_id: int, db: Session = Depends(database.get_db)):
    """Calculate and store AI trend score for a product"""
    score = market_scout_engine.calculate_ai_trend_score(product_id, db)
    
    # Store the calculated score
    trend_data = schemas.TrendCreate(product_id=product_id, score=score)
    trend = crud.create_trend(db, trend_data)
    
    return {"product_id": product_id, "trend_score": score, "calculated_at": trend.date}

@app.get("/check-alerts")
def check_user_alerts(current_user: schemas.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    """Check for alerts based on user's watchlist"""
    alerts = market_scout_engine.check_for_alerts(current_user.id, db)
    
    # Store alerts in database
    for alert_message in alerts:
        alert_data = schemas.AlertCreate(message=alert_message)
        crud.create_alert(db, alert_data, current_user.id)
    
    return {"alerts": alerts}

@app.get("/export/{data_type}")
def export_data(data_type: str, current_user: schemas.User = Depends(get_current_user), db: Session = Depends(database.get_db)):
    """Export user data to CSV format"""
    if data_type not in ["watchlist", "trends"]:
        raise HTTPException(status_code=400, detail="Invalid data type. Use 'watchlist' or 'trends'")
    
    csv_content = market_scout_engine.export_data_to_csv(current_user.id, db, data_type)
    
    from fastapi.responses import Response
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={data_type}_export.csv"}
    )

