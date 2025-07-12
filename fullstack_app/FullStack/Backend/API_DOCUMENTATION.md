# MarketScout Backend API Documentation

## Overview

The MarketScout Backend API provides comprehensive functionality for tracking social media ads, scoring emerging products, and managing user watchlists. Built with FastAPI and PostgreSQL, this API enables users to discover trending products before they explode in popularity.

## Base URL

```
http://localhost:8000
```

## Authentication

The API uses JWT (JSON Web Token) authentication. After successful login, include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### Authentication Endpoints

#### POST /signup
Create a new user account.

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "id": 1,
  "username": "string",
  "email": "string",
  "created_at": "2025-07-12T00:00:00"
}
```

#### POST /token
Login and receive an access token.

**Request Body (Form Data):**
```
username: string
password: string
```

**Response:**
```json
{
  "access_token": "string",
  "token_type": "bearer"
}
```

### Product Endpoints

#### GET /products
Get a list of all products.

**Query Parameters:**
- `skip` (optional): Number of records to skip (default: 0)
- `limit` (optional): Maximum number of records to return (default: 100)

**Response:**
```json
[
  {
    "id": 1,
    "name": "string",
    "description": "string",
    "created_at": "2025-07-12T00:00:00"
  }
]
```

#### GET /products/{product_id}
Get details for a specific product.

**Path Parameters:**
- `product_id`: Integer ID of the product

**Response:**
```json
{
  "id": 1,
  "name": "string",
  "description": "string",
  "created_at": "2025-07-12T00:00:00"
}
```

#### POST /products
Create a new product.

**Request Body:**
```json
{
  "name": "string",
  "description": "string"
}
```

**Response:**
```json
{
  "id": 1,
  "name": "string",
  "description": "string",
  "created_at": "2025-07-12T00:00:00"
}
```

### Ad Endpoints

#### GET /ads
Get a list of all ads.

**Query Parameters:**
- `skip` (optional): Number of records to skip (default: 0)
- `limit` (optional): Maximum number of records to return (default: 100)

**Response:**
```json
[
  {
    "id": 1,
    "product_id": 1,
    "platform": "TikTok",
    "ad_content": "string",
    "created_at": "2025-07-12T00:00:00"
  }
]
```

#### POST /ads
Create a new ad.

**Request Body:**
```json
{
  "product_id": 1,
  "platform": "string",
  "ad_content": "string"
}
```

**Response:**
```json
{
  "id": 1,
  "product_id": 1,
  "platform": "string",
  "ad_content": "string",
  "created_at": "2025-07-12T00:00:00"
}
```

### Trend Endpoints

#### GET /trends/{product_id}
Get trend data for a specific product.

**Path Parameters:**
- `product_id`: Integer ID of the product

**Response:**
```json
[
  {
    "id": 1,
    "product_id": 1,
    "score": 85.5,
    "date": "2025-07-12T00:00:00"
  }
]
```

#### POST /trends
Create a new trend record.

**Request Body:**
```json
{
  "product_id": 1,
  "score": 85.5
}
```

**Response:**
```json
{
  "id": 1,
  "product_id": 1,
  "score": 85.5,
  "date": "2025-07-12T00:00:00"
}
```

### Watchlist Endpoints (Protected)

#### GET /watchlists
Get the current user's watchlist.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "product_id": 1,
    "created_at": "2025-07-12T00:00:00"
  }
]
```

#### POST /watchlists
Add a product to the user's watchlist.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "product_id": 1
}
```

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "product_id": 1,
  "created_at": "2025-07-12T00:00:00"
}
```

#### DELETE /watchlists/{product_id}
Remove a product from the user's watchlist.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `product_id`: Integer ID of the product to remove

**Response:**
```json
{
  "message": "Watchlist item deleted"
}
```

### Alert Endpoints (Protected)

#### GET /alerts
Get the current user's alerts.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "message": "string",
    "created_at": "2025-07-12T00:00:00"
  }
]
```

#### POST /alerts
Create a new alert.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "message": "string"
}
```

**Response:**
```json
{
  "id": 1,
  "user_id": 1,
  "message": "string",
  "created_at": "2025-07-12T00:00:00"
}
```

### Business Logic Endpoints

#### GET /scan-ads
Scan for viral ads across platforms.

**Response:**
```json
{
  "viral_ads": [
    {
      "product_name": "string",
      "platform": "string",
      "content": "string",
      "engagement_score": 85,
      "detected_at": "2025-07-12T00:00:00"
    }
  ]
}
```

#### GET /heat-map
Get heat map data for product popularity by region.

**Response:**
```json
{
  "heat_map": {
    "Product Name": {
      "North America": 85,
      "Europe": 72,
      "Asia": 91
    }
  }
}
```

#### GET /trending
Get currently trending products.

**Query Parameters:**
- `limit` (optional): Maximum number of products to return (default: 10)

**Response:**
```json
{
  "trending_products": [
    {
      "product": {
        "id": 1,
        "name": "string",
        "description": "string",
        "created_at": "2025-07-12T00:00:00"
      },
      "current_score": 85.5,
      "last_updated": "2025-07-12T00:00:00"
    }
  ]
}
```

#### POST /calculate-score/{product_id}
Calculate and store AI trend score for a product.

**Path Parameters:**
- `product_id`: Integer ID of the product

**Response:**
```json
{
  "product_id": 1,
  "trend_score": 85.5,
  "calculated_at": "2025-07-12T00:00:00"
}
```

#### GET /check-alerts (Protected)
Check for alerts based on user's watchlist.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "alerts": [
    "🚀 Product Name trend score increased by 15.2 points!",
    "🔥 New viral ad detected for Product Name on TikTok!"
  ]
}
```

#### GET /export/{data_type} (Protected)
Export user data to CSV format.

**Headers:**
```
Authorization: Bearer <token>
```

**Path Parameters:**
- `data_type`: Either "watchlist" or "trends"

**Response:**
CSV file download with appropriate headers.

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Error message describing the issue"
}
```

### 401 Unauthorized
```json
{
  "detail": "Could not validate credentials"
}
```

### 404 Not Found
```json
{
  "detail": "Resource not found"
}
```

### 422 Validation Error
```json
{
  "detail": [
    {
      "loc": ["field_name"],
      "msg": "Error message",
      "type": "error_type"
    }
  ]
}
```

## Rate Limiting

Currently, no rate limiting is implemented. In production, consider implementing rate limiting to prevent abuse.

## CORS

The API is configured to allow cross-origin requests from any origin for development purposes. In production, configure CORS to only allow requests from your frontend domain.

## Database Schema

### Users Table
- `id`: Primary key (Integer)
- `username`: Unique username (String)
- `email`: Unique email address (String)
- `password_hash`: Hashed password (String)
- `created_at`: Account creation timestamp (DateTime)

### Products Table
- `id`: Primary key (Integer)
- `name`: Product name (String)
- `description`: Product description (String)
- `created_at`: Product creation timestamp (DateTime)

### Ads Table
- `id`: Primary key (Integer)
- `product_id`: Foreign key to Products table (Integer)
- `platform`: Social media platform (String)
- `ad_content`: Ad content/description (String)
- `created_at`: Ad creation timestamp (DateTime)

### Trends Table
- `id`: Primary key (Integer)
- `product_id`: Foreign key to Products table (Integer)
- `score`: AI trend score (Float, 0-100)
- `date`: Trend calculation timestamp (DateTime)

### Watchlists Table
- `id`: Primary key (Integer)
- `user_id`: Foreign key to Users table (Integer)
- `product_id`: Foreign key to Products table (Integer)
- `created_at`: Watchlist item creation timestamp (DateTime)

### Alerts Table
- `id`: Primary key (Integer)
- `user_id`: Foreign key to Users table (Integer)
- `message`: Alert message (String)
- `created_at`: Alert creation timestamp (DateTime)

## Getting Started

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Configure database connection in `database.py`

3. Run the application:
   ```bash
   python main.py
   ```

4. Access the interactive API documentation at:
   ```
   http://localhost:8000/docs
   ```

## Testing

Run the test suite:
```bash
python test_app.py
```

The test suite covers all major endpoints and functionality, using an in-memory SQLite database for testing.

