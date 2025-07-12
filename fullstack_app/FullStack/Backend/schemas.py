from pydantic import BaseModel, validator, EmailStr
from datetime import datetime
from typing import Optional, List
import re

# User schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr

    @validator('username')
    def username_must_be_valid(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Username cannot be empty')
        if len(v) < 3:
            raise ValueError('Username must be at least 3 characters long')
        if len(v) > 50:
            raise ValueError('Username must be less than 50 characters')
        if not re.match(r'^[a-zA-Z0-9_]+$', v):
            raise ValueError('Username can only contain letters, numbers, and underscores')
        return v.strip()

class UserCreate(UserBase):
    password: str

    @validator('password')
    def password_must_be_valid(cls, v):
        if not v or len(v) < 6:
            raise ValueError('Password must be at least 6 characters long')
        if len(v) > 100:
            raise ValueError('Password must be less than 100 characters')
        return v

class User(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Product schemas
class ProductBase(BaseModel):
    name: str
    description: str

    @validator('name')
    def name_must_be_valid(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Product name cannot be empty')
        if len(v) > 200:
            raise ValueError('Product name must be less than 200 characters')
        return v.strip()

    @validator('description')
    def description_must_be_valid(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Product description cannot be empty')
        if len(v) > 1000:
            raise ValueError('Product description must be less than 1000 characters')
        return v.strip()

class ProductCreate(ProductBase):
    pass

class Product(ProductBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Ad schemas
class AdBase(BaseModel):
    platform: str
    ad_content: str

    @validator('platform')
    def platform_must_be_valid(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Platform cannot be empty')
        valid_platforms = ['TikTok', 'Facebook', 'Instagram', 'YouTube', 'Twitter']
        if v not in valid_platforms:
            raise ValueError(f'Platform must be one of: {", ".join(valid_platforms)}')
        return v

    @validator('ad_content')
    def ad_content_must_be_valid(cls, v):
        if not v or len(v.strip()) == 0:
            raise ValueError('Ad content cannot be empty')
        if len(v) > 2000:
            raise ValueError('Ad content must be less than 2000 characters')
        return v.strip()

class AdCreate(AdBase):
    product_id: int

class Ad(AdBase):
    id: int
    product_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Trend schemas
class TrendBase(BaseModel):
    score: float

class TrendCreate(TrendBase):
    product_id: int

class Trend(TrendBase):
    id: int
    product_id: int
    date: datetime

    class Config:
        from_attributes = True

# Watchlist schemas
class WatchlistBase(BaseModel):
    product_id: int

class WatchlistCreate(WatchlistBase):
    pass

class Watchlist(WatchlistBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Alert schemas
class AlertBase(BaseModel):
    message: str

class AlertCreate(AlertBase):
    pass

class Alert(AlertBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Token schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

