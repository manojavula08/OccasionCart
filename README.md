# MarketScout - AI-Powered Product Trend Discovery

[![Version](https://img.shields.io/badge/version-1.0.0--beta-blue.svg)](https://github.com/yourusername/marketscout/releases)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.11+-blue.svg)](https://python.org)
[![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black.svg)](https://nextjs.org)

MarketScout is a production-ready, full-stack application designed to track social media trends and identify viral products before they explode in popularity. Built with enterprise-grade standards, comprehensive testing, and robust security measures.

## 🚀 Features

- **AI-Powered Trend Scoring**: Proprietary algorithm that scores products based on social media engagement and viral potential
- **Multi-Platform Ad Scanner**: Automated scanning across TikTok, Facebook, Instagram, YouTube, and Twitter
- **Real-Time Heat Maps**: Geographic visualization of product popularity and engagement hotspots
- **Smart Watchlists**: User-customizable product tracking with intelligent alerts
- **Advanced Analytics**: Comprehensive data export and trend analysis capabilities
- **Enterprise Security**: JWT authentication, rate limiting, input validation, and CORS protection

## 🏗️ Architecture

### Backend (FastAPI + Python)
- **Framework**: FastAPI for high-performance, async API development
- **Database**: PostgreSQL (production) / SQLite (development)
- **Authentication**: JWT tokens with bcrypt password hashing
- **Rate Limiting**: SlowAPI for DDoS protection and fair usage
- **Validation**: Pydantic models for comprehensive input validation

### Frontend (Next.js + React)
- **Framework**: Next.js 15.3.3 with React 18
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Context for authentication
- **TypeScript**: Full type safety across the application
- **Responsive Design**: Mobile-first approach with modern UI/UX

## 🛠️ Quick Start

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **Python**: Version 3.11 or higher
- **Git**: For version control

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/marketscout.git
   cd marketscout
   ```

2. **Backend Setup**
   ```bash
   cd fullstack_app/FullStack/Backend
   python -m pip install -r requirements.txt
   python main.py
   ```

3. **Frontend Setup**
   ```bash
   cd ../FrontEnd
   npm install
   npm run dev
   ```

4. **Access the Application**
   - **Frontend**: http://localhost:9002
   - **Backend API**: http://localhost:8000
   - **API Documentation**: http://localhost:8000/docs

## 📁 Project Structure

```
marketscout/
├── fullstack_app/
│   ├── FullStack/
│   │   ├── Backend/           # FastAPI backend
│   │   │   ├── main.py        # FastAPI application
│   │   │   ├── models.py      # Database models
│   │   │   ├── schemas.py     # Pydantic schemas
│   │   │   ├── crud.py        # Database operations
│   │   │   └── requirements.txt
│   │   └── FrontEnd/          # Next.js frontend
│   │       ├── src/
│   │       │   ├── app/       # Next.js app router
│   │       │   ├── components/ # React components
│   │       │   └── lib/       # Utility libraries
│   │       └── package.json
│   └── COMPREHENSIVE_DOCUMENTATION.md
├── .gitignore
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` in the FrontEnd directory:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
```

### Backend Configuration

Set environment variables for the backend:
```bash
DATABASE_URL=sqlite:///./marketscout.db
SECRET_KEY=your-secret-key-here
DEBUG=False
```

## 🧪 Testing

### Backend Tests
```bash
cd fullstack_app/FullStack/Backend
python test_app.py
```

### Frontend Tests
```bash
cd fullstack_app/FullStack/FrontEnd
npm run test
```

## 📊 API Documentation

The API documentation is automatically generated and available at:
- **Interactive Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key Endpoints

- `POST /signup` - User registration
- `POST /token` - User authentication
- `GET /products` - List products
- `GET /trending` - Get trending products
- `GET /scan-ads` - Scan for viral ads
- `GET /heat-map` - Get popularity heat map

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Manual Deployment
```bash
# Backend
cd fullstack_app/FullStack/Backend
uvicorn main:app --host 0.0.0.0 --port 8000

# Frontend
cd fullstack_app/FullStack/FrontEnd
npm run build
npm start
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Protection against DDoS attacks
- **Input Validation**: Comprehensive data validation
- **CORS Protection**: Secure cross-origin requests
- **Password Hashing**: Bcrypt for secure password storage
- **SQL Injection Protection**: SQLAlchemy ORM with parameterized queries

## 📈 Performance

- **FastAPI**: High-performance async API framework
- **Next.js SSR**: Server-side rendering for better SEO
- **Database Optimization**: Indexed queries and efficient ORM usage
- **Caching**: Built-in caching mechanisms
- **CDN Ready**: Optimized for content delivery networks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [COMPREHENSIVE_DOCUMENTATION.md](fullstack_app/COMPREHENSIVE_DOCUMENTATION.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/marketscout/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/marketscout/discussions)

## 🙏 Acknowledgments

- FastAPI for the excellent web framework
- Next.js team for the amazing React framework
- Tailwind CSS for the utility-first CSS framework
- All contributors and supporters of this project

---

**MarketScout v1.0.0-beta** - Discover trending products before they explode! 🚀 