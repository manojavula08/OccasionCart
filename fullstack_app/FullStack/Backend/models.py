from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    watchlists = relationship("Watchlist", back_populates="user")
    alerts = relationship("Alert", back_populates="user")

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    ads = relationship("Ad", back_populates="product")
    trends = relationship("Trend", back_populates="product")
    watchlists = relationship("Watchlist", back_populates="product")

class Ad(Base):
    __tablename__ = "ads"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    platform = Column(String)
    ad_content = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    product = relationship("Product", back_populates="ads")

class Trend(Base):
    __tablename__ = "trends"

    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    score = Column(Float)
    date = Column(DateTime(timezone=True), server_default=func.now())

    product = relationship("Product", back_populates="trends")

class Watchlist(Base):
    __tablename__ = "watchlists"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="watchlists")
    product = relationship("Product", back_populates="watchlists")

class Alert(Base):
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="alerts")


