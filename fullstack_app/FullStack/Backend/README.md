# MarketScout Backend

A powerful FastAPI backend for the MarketScout application that tracks social media ads and scores emerging products to help users discover trending products before they explode in popularity.

## Features

- **User Authentication**: JWT-based authentication system
- **Product Management**: CRUD operations for products
- **Ad Tracking**: Store and retrieve social media ads
- **AI Trend Scoring**: Proprietary algorithm to score product trends
- **Watchlist Management**: Users can track their favorite products
- **Real-time Alerts**: Notifications for significant changes
- **Heat Map Data**: Geographic popularity visualization
- **CSV Export**: Export data for analysis
- **Viral Ad Scanner**: Discover trending ads across platforms

## Technology Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL (SQLite for development/testing)
- **Authentication**: JWT with passlib and bcrypt
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Testing**: pytest with TestClient

## Quick Start

### Prerequisites

- Python 3.11+
- PostgreSQL (for production) or SQLite (for development)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd marketscout_backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Configure database connection in `database.py`:
   ```python
   # For PostgreSQL
   SQLALCHEMY_DATABASE_URL = "postgresql://username:password@localhost/marketscout_db"
   
   # For SQLite (development)
   SQLALCHEMY_DATABASE_URL = "sqlite:///./marketscout.db"
   ```

4. Run the application:
   ```bash
   python main.py
   ```

5. Access the API documentation:
   - Interactive docs: http://localhost:8000/docs
   - ReDoc: http://localhost:8000/redoc

### Testing

Run the test suite:
```bash
python test_app.py
```

## Project Structure

```
marketscout_backend/
├── main.py                 # FastAPI application and routes
├── models.py              # SQLAlchemy database models
├── schemas.py             # Pydantic schemas for validation
├── crud.py                # Database CRUD operations
├── database.py            # Database connection and session management
├── business_logic.py      # MarketScout business logic engine
├── test_app.py           # Test suite
├── requirements.txt       # Python dependencies
├── API_DOCUMENTATION.md   # Detailed API documentation
└── README.md             # This file
```

## API Endpoints

### Authentication
- `POST /signup` - Create user account
- `POST /token` - Login and get JWT token

### Products
- `GET /products` - List all products
- `GET /products/{id}` - Get specific product
- `POST /products` - Create new product

### Ads
- `GET /ads` - List all ads
- `POST /ads` - Create new ad

### Trends
- `GET /trends/{product_id}` - Get product trends
- `POST /trends` - Create trend record
- `POST /calculate-score/{product_id}` - Calculate AI trend score

### Watchlists (Protected)
- `GET /watchlists` - Get user's watchlist
- `POST /watchlists` - Add to watchlist
- `DELETE /watchlists/{product_id}` - Remove from watchlist

### Alerts (Protected)
- `GET /alerts` - Get user's alerts
- `POST /alerts` - Create alert
- `GET /check-alerts` - Check for new alerts

### Business Logic
- `GET /scan-ads` - Scan for viral ads
- `GET /heat-map` - Get popularity heat map
- `GET /trending` - Get trending products
- `GET /export/{data_type}` - Export data to CSV

## Database Schema

The application uses the following main entities:

- **Users**: User accounts with authentication
- **Products**: Products being tracked
- **Ads**: Social media advertisements
- **Trends**: AI-calculated trend scores over time
- **Watchlists**: User's tracked products
- **Alerts**: Notifications for users

## Business Logic

The `MarketScoutEngine` class provides the core business functionality:

### AI Trend Scoring
Calculates trend scores based on:
- Platform diversity of ads
- Recent activity levels
- Engagement metrics
- Machine learning factors (simulated)

### Viral Ad Scanner
Simulates scanning across platforms:
- TikTok
- Facebook
- Instagram
- YouTube
- Twitter

### Heat Map Generation
Provides geographic popularity data for visualization.

### Alert System
Monitors watchlisted products for:
- Significant score changes
- New viral ads
- Trending status changes

## Configuration

### Environment Variables
Consider setting these environment variables for production:

```bash
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://username:password@localhost/marketscout_db
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### CORS Configuration
The application is configured to allow all origins for development. For production, update the CORS settings in `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yourdomain.com"],  # Specify your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Deployment

### Using Docker (Recommended)

1. Create a Dockerfile:
   ```dockerfile
   FROM python:3.11
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   EXPOSE 8000
   CMD ["python", "main.py"]
   ```

2. Build and run:
   ```bash
   docker build -t marketscout-backend .
   docker run -p 8000:8000 marketscout-backend
   ```

### Using Uvicorn

For production deployment with Uvicorn:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Security Considerations

- Change the default `SECRET_KEY` in production
- Use environment variables for sensitive configuration
- Implement rate limiting for production use
- Configure CORS properly for your domain
- Use HTTPS in production
- Regularly update dependencies

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on the repository or contact the development team.

