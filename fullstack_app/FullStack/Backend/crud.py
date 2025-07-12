from sqlalchemy.orm import Session
from passlib.context import CryptContext
import models, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# User CRUD operations
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        password_hash=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return False
    if not verify_password(password, user.password_hash):
        return False
    return user

# Product CRUD operations
def get_products(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Product).offset(skip).limit(limit).all()

def get_product(db: Session, product_id: int):
    return db.query(models.Product).filter(models.Product.id == product_id).first()

def create_product(db: Session, product: schemas.ProductCreate):
    db_product = models.Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

# Ad CRUD operations
def get_ads(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Ad).offset(skip).limit(limit).all()

def create_ad(db: Session, ad: schemas.AdCreate):
    db_ad = models.Ad(**ad.dict())
    db.add(db_ad)
    db.commit()
    db.refresh(db_ad)
    return db_ad

# Trend CRUD operations
def get_trends_by_product(db: Session, product_id: int):
    return db.query(models.Trend).filter(models.Trend.product_id == product_id).all()

def create_trend(db: Session, trend: schemas.TrendCreate):
    db_trend = models.Trend(**trend.dict())
    db.add(db_trend)
    db.commit()
    db.refresh(db_trend)
    return db_trend

# Watchlist CRUD operations
def get_user_watchlist(db: Session, user_id: int):
    return db.query(models.Watchlist).filter(models.Watchlist.user_id == user_id).all()

def create_watchlist_item(db: Session, watchlist: schemas.WatchlistCreate, user_id: int):
    db_watchlist = models.Watchlist(**watchlist.dict(), user_id=user_id)
    db.add(db_watchlist)
    db.commit()
    db.refresh(db_watchlist)
    return db_watchlist

def delete_watchlist_item(db: Session, user_id: int, product_id: int):
    db_watchlist = db.query(models.Watchlist).filter(
        models.Watchlist.user_id == user_id,
        models.Watchlist.product_id == product_id
    ).first()
    if db_watchlist:
        db.delete(db_watchlist)
        db.commit()
    return db_watchlist

# Alert CRUD operations
def get_user_alerts(db: Session, user_id: int):
    return db.query(models.Alert).filter(models.Alert.user_id == user_id).all()

def create_alert(db: Session, alert: schemas.AlertCreate, user_id: int):
    db_alert = models.Alert(**alert.dict(), user_id=user_id)
    db.add(db_alert)
    db.commit()
    db.refresh(db_alert)
    return db_alert

