from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi import Request
from fastapi.responses import JSONResponse
from config import settings

# Create limiter instance
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=[f"{settings.RATE_LIMIT_REQUESTS}/minute"]
)

# Rate limit configurations for different endpoints
AUTH_RATE_LIMIT = "5/minute"  # Stricter for auth endpoints
API_RATE_LIMIT = f"{settings.RATE_LIMIT_REQUESTS}/minute"  # General API rate limit
HEAVY_OPERATION_RATE_LIMIT = "10/minute"  # For heavy operations like trend calculation

def get_rate_limit_exceeded_handler():
    """Custom rate limit exceeded handler."""
    async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
        response = {
            "error": True,
            "message": f"Rate limit exceeded: {exc.detail}",
            "status_code": 429
        }
        return JSONResponse(
            status_code=429,
            content=response
        )
    return rate_limit_handler

