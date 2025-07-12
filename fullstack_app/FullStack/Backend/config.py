import os
from typing import Optional

class Settings:
    """Application settings and configuration."""
    
    # Database settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./marketscout.db")
    
    # JWT settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here-change-in-production")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    
    # CORS settings
    ALLOWED_ORIGINS: list = os.getenv("ALLOWED_ORIGINS", "*").split(",")
    
    # Application settings
    APP_NAME: str = "MarketScout API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # Rate limiting
    RATE_LIMIT_REQUESTS: int = int(os.getenv("RATE_LIMIT_REQUESTS", "100"))
    RATE_LIMIT_WINDOW: int = int(os.getenv("RATE_LIMIT_WINDOW", "60"))  # seconds
    
    # Logging
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")

settings = Settings()

