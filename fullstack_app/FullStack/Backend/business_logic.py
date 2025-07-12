import random
from typing import List, Dict
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
import models, schemas, crud

class MarketScoutEngine:
    """
    Business logic engine for MarketScout features including
    AI trend scoring, ad scanning, and alert generation.
    """
    
    def __init__(self):
        self.platforms = ["TikTok", "Facebook", "Instagram", "YouTube", "Twitter"]
        
    def calculate_ai_trend_score(self, product_id: int, db: Session) -> float:
        """
        Calculate AI trend score for a product based on various factors.
        This is a simplified implementation - in production, this would use
        machine learning models and real social media data.
        """
        # Get product ads and existing trends
        ads = db.query(models.Ad).filter(models.Ad.product_id == product_id).all()
        trends = db.query(models.Trend).filter(models.Trend.product_id == product_id).all()
        
        # Base score calculation (simplified)
        base_score = 50.0
        
        # Factor in number of ads across platforms
        platform_diversity = len(set(ad.platform for ad in ads))
        platform_score = min(platform_diversity * 10, 30)
        
        # Factor in recent activity
        recent_ads = [ad for ad in ads if ad.created_at > datetime.utcnow() - timedelta(days=7)]
        activity_score = min(len(recent_ads) * 5, 20)
        
        # Add some randomness to simulate real AI scoring
        randomness = random.uniform(-10, 10)
        
        final_score = base_score + platform_score + activity_score + randomness
        return max(0, min(100, final_score))  # Clamp between 0-100
    
    def scan_for_viral_ads(self, db: Session) -> List[Dict]:
        """
        Simulate scanning for viral ads across platforms.
        In production, this would integrate with social media APIs.
        """
        viral_ads = []
        
        # Simulate finding viral ads
        sample_products = ["Wireless Earbuds", "Smart Watch", "Phone Case", "Fitness Tracker", "Bluetooth Speaker"]
        sample_content = [
            "🔥 VIRAL PRODUCT ALERT! This is flying off the shelves!",
            "Everyone's talking about this! Get yours before it's sold out!",
            "This product is breaking the internet! Limited time offer!",
            "Influencers can't stop posting about this!",
            "The product everyone's searching for!"
        ]
        
        for i in range(random.randint(3, 8)):
            viral_ad = {
                "product_name": random.choice(sample_products),
                "platform": random.choice(self.platforms),
                "content": random.choice(sample_content),
                "engagement_score": random.randint(70, 100),
                "detected_at": datetime.utcnow()
            }
            viral_ads.append(viral_ad)
        
        return viral_ads
    
    def generate_heat_map_data(self, db: Session) -> Dict:
        """
        Generate heat map data showing product popularity by region.
        In production, this would use real geographic and engagement data.
        """
        regions = ["North America", "Europe", "Asia", "South America", "Africa", "Oceania"]
        products = db.query(models.Product).limit(10).all()
        
        heat_map_data = {}
        for product in products:
            heat_map_data[product.name] = {}
            for region in regions:
                # Simulate popularity scores
                popularity = random.randint(10, 100)
                heat_map_data[product.name][region] = popularity
        
        return heat_map_data
    
    def check_for_alerts(self, user_id: int, db: Session) -> List[str]:
        """
        Check if any products in user's watchlist have significant changes
        that warrant alerts.
        """
        alerts = []
        
        # Get user's watchlist
        watchlist = crud.get_user_watchlist(db, user_id)
        
        for item in watchlist:
            product = crud.get_product(db, item.product_id)
            if not product:
                continue
                
            # Get recent trends for this product
            recent_trends = db.query(models.Trend).filter(
                models.Trend.product_id == product.id,
                models.Trend.date > datetime.utcnow() - timedelta(days=1)
            ).order_by(models.Trend.date.desc()).limit(2).all()
            
            if len(recent_trends) >= 2:
                score_change = recent_trends[0].score - recent_trends[1].score
                
                if score_change > 15:
                    alerts.append(f"🚀 {product.name} trend score increased by {score_change:.1f} points!")
                elif score_change < -15:
                    alerts.append(f"📉 {product.name} trend score decreased by {abs(score_change):.1f} points")
                    
            # Check for new viral ads
            recent_ads = db.query(models.Ad).filter(
                models.Ad.product_id == product.id,
                models.Ad.created_at > datetime.utcnow() - timedelta(hours=6)
            ).all()
            
            if recent_ads:
                alerts.append(f"🔥 New viral ad detected for {product.name} on {recent_ads[0].platform}!")
        
        return alerts
    
    def get_trending_products(self, db: Session, limit: int = 10) -> List[Dict]:
        """
        Get list of currently trending products based on recent scores.
        """
        # Get products with recent trend data
        recent_trends = db.query(models.Trend).filter(
            models.Trend.date > datetime.utcnow() - timedelta(days=7)
        ).order_by(models.Trend.score.desc()).limit(limit).all()
        
        trending_products = []
        seen_products = set()
        
        for trend in recent_trends:
            if trend.product_id not in seen_products:
                product = crud.get_product(db, trend.product_id)
                if product:
                    trending_products.append({
                        "product": product,
                        "current_score": trend.score,
                        "last_updated": trend.date
                    })
                    seen_products.add(trend.product_id)
        
        return trending_products
    
    def export_data_to_csv(self, user_id: int, db: Session, data_type: str) -> str:
        """
        Export user data to CSV format.
        Returns CSV content as string.
        """
        import csv
        import io
        
        output = io.StringIO()
        
        if data_type == "watchlist":
            writer = csv.writer(output)
            writer.writerow(["Product ID", "Product Name", "Description", "Added Date"])
            
            watchlist = crud.get_user_watchlist(db, user_id)
            for item in watchlist:
                product = crud.get_product(db, item.product_id)
                if product:
                    writer.writerow([
                        product.id,
                        product.name,
                        product.description,
                        item.created_at.strftime("%Y-%m-%d %H:%M:%S")
                    ])
        
        elif data_type == "trends":
            writer = csv.writer(output)
            writer.writerow(["Product ID", "Product Name", "Trend Score", "Date"])
            
            # Get trends for products in user's watchlist
            watchlist = crud.get_user_watchlist(db, user_id)
            for item in watchlist:
                trends = crud.get_trends_by_product(db, item.product_id)
                product = crud.get_product(db, item.product_id)
                
                for trend in trends:
                    writer.writerow([
                        product.id if product else item.product_id,
                        product.name if product else "Unknown",
                        trend.score,
                        trend.date.strftime("%Y-%m-%d %H:%M:%S")
                    ])
        
        return output.getvalue()

# Global instance
market_scout_engine = MarketScoutEngine()

