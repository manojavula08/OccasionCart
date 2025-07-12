'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiClient, Product, Ad } from '@/lib/api';
import { TrendingUp, Eye, Bell, Download, Scan, Map } from 'lucide-react';

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [ads, setAds] = useState<Ad[]>([]);
  const [viralAds, setViralAds] = useState<any[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    loadDashboardData();
  }, [isAuthenticated, router]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [productsData, adsData, viralAdsData, trendingData] = await Promise.all([
        apiClient.getProducts(0, 10),
        apiClient.getAds(0, 10),
        apiClient.scanAds(),
        apiClient.getTrendingProducts(5),
      ]);

      setProducts(productsData);
      setAds(adsData);
      setViralAds(viralAdsData.viral_ads);
      setTrendingProducts(trendingData.trending_products);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const checkAlerts = async () => {
    try {
      const alertsData = await apiClient.checkAlerts();
      setAlerts(alertsData.alerts);
    } catch (err) {
      console.error('Failed to check alerts:', err);
    }
  };

  const calculateTrendScore = async (productId: number) => {
    try {
      await apiClient.calculateTrendScore(productId);
      // Refresh trending products after calculation
      const trendingData = await apiClient.getTrendingProducts(5);
      setTrendingProducts(trendingData.trending_products);
    } catch (err) {
      console.error('Failed to calculate trend score:', err);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          <p className="mt-4 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">MarketScout Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Welcome, {user?.username}</span>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {alerts.length > 0 && (
          <Alert className="mb-6">
            <Bell className="h-4 w-4" />
            <AlertDescription>
              <strong>New Alerts:</strong>
              <ul className="mt-2 space-y-1">
                {alerts.map((alert, index) => (
                  <li key={index} className="text-sm">{alert}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Viral Ads Found</CardTitle>
              <Scan className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{viralAds.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trending Products</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trendingProducts.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{alerts.length}</div>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2" 
                onClick={checkAlerts}
              >
                Check Alerts
              </Button>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="viral-ads">Viral Ads</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="ads">All Ads</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
                <CardDescription>
                  Manage and track your products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Created: {new Date(product.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => calculateTrendScore(product.id)}
                      >
                        Calculate Score
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="viral-ads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Viral Ads Scanner</CardTitle>
                <CardDescription>
                  Recently discovered viral advertisements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {viralAds.map((ad, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{ad.product_name}</h3>
                        <Badge variant="secondary">{ad.platform}</Badge>
                      </div>
                      <p className="text-sm mb-2">{ad.content}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Engagement Score: {ad.engagement_score}</span>
                        <span>Detected: {new Date(ad.detected_at).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Trending Products</CardTitle>
                <CardDescription>
                  Products with the highest trend scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingProducts.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.product.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">
                          {item.current_score.toFixed(1)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Updated: {new Date(item.last_updated).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Advertisements</CardTitle>
                <CardDescription>
                  Complete list of tracked advertisements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ads.map((ad) => (
                    <div key={ad.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{ad.platform}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Product ID: {ad.product_id}
                        </span>
                      </div>
                      <p className="text-sm mb-2">{ad.ad_content}</p>
                      <p className="text-xs text-muted-foreground">
                        Created: {new Date(ad.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

