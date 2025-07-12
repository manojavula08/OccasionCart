from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from sqlalchemy.exc import SQLAlchemyError
from logger import logger
import traceback

class MarketScoutException(Exception):
    """Base exception for MarketScout application."""
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

class AuthenticationError(MarketScoutException):
    """Authentication related errors."""
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(message, 401)

class AuthorizationError(MarketScoutException):
    """Authorization related errors."""
    def __init__(self, message: str = "Access denied"):
        super().__init__(message, 403)

class NotFoundError(MarketScoutException):
    """Resource not found errors."""
    def __init__(self, message: str = "Resource not found"):
        super().__init__(message, 404)

class ValidationError(MarketScoutException):
    """Data validation errors."""
    def __init__(self, message: str = "Validation failed"):
        super().__init__(message, 422)

class DatabaseError(MarketScoutException):
    """Database operation errors."""
    def __init__(self, message: str = "Database operation failed"):
        super().__init__(message, 500)

async def marketscout_exception_handler(request: Request, exc: MarketScoutException):
    """Handle custom MarketScout exceptions."""
    logger.error(f"MarketScout exception: {exc.message}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "message": exc.message,
            "status_code": exc.status_code
        }
    )

async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """Handle HTTP exceptions."""
    logger.error(f"HTTP exception: {exc.detail}")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": True,
            "message": exc.detail,
            "status_code": exc.status_code
        }
    )

async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle validation exceptions."""
    logger.error(f"Validation exception: {exc.errors()}")
    return JSONResponse(
        status_code=422,
        content={
            "error": True,
            "message": "Validation failed",
            "details": exc.errors(),
            "status_code": 422
        }
    )

async def sqlalchemy_exception_handler(request: Request, exc: SQLAlchemyError):
    """Handle SQLAlchemy database exceptions."""
    logger.error(f"Database exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "error": True,
            "message": "Database operation failed",
            "status_code": 500
        }
    )

async def general_exception_handler(request: Request, exc: Exception):
    """Handle general exceptions."""
    logger.error(f"Unhandled exception: {str(exc)}")
    logger.error(traceback.format_exc())
    return JSONResponse(
        status_code=500,
        content={
            "error": True,
            "message": "Internal server error",
            "status_code": 500
        }
    )

