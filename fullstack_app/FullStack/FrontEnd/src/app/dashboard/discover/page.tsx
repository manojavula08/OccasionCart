
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  TrendingUp,
  Heart,
  Zap,
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrendHeatmapSection } from '@/components/sections/dashboard/trend-heatmap-section'; // Added import

// Mock store for now - replace with actual Zustand store later
interface AppState {
  selectedLocation: string;
  watchlist: Array<{ id: string; name: string }>;
}

const initialAppState: AppState = {
  selectedLocation: 'San Francisco, CA 94102', // Default location
  watchlist: [],
};

// Mock dispatch for now
const mockDispatch = (action: { type: string; payload?: any }) => {
  console.log('Dispatching action:', action);
  // In a real scenario, this would update the Zustand store
  // For mock purposes, update local state if needed for UI changes
  if (action.type === 'ADD_TO_WATCHLIST' && action.payload) {
    setLocalWatchlist(prev => [...prev, action.payload]);
  } else if (action.type === 'REMOVE_FROM_WATCHLIST' && action.payload) {
    setLocalWatchlist(prev => prev.filter(item => item.id !== action.payload.id));
  }
};

let setLocalWatchlist: React.Dispatch<React.SetStateAction<Array<{ id: string; name: string }>>>;


const categories = ['All', 'Electronics', 'Fashion', 'Home & Garden', 'Health', 'Sports', 'Beauty'];
const occasions = ['Back to School', 'Halloween', 'Black Friday', 'Christmas', 'New Year', 'Valentines Day'];

interface DiscoverItem {
  id: string;
  name: string;
  category: string;
  trendScore: number;
  location: string;
  occasion?: string;
  priceRange: [number, number];
  supplierSuggestions: string[];
  demandForecast: { nextWeek: number; nextMonth: number; seasonal: number };
  aiInsights: string[];
  // imageUrl is not used in this version as per the reference image
  // imageHint is not used in this version
}

export default function DiscoverPage() {
  const [state, setState] = useState<AppState>(initialAppState);
  const [watchlist, _setLocalWatchlist] = useState<Array<{ id: string; name: string }>>(initialAppState.watchlist);
  setLocalWatchlist = _setLocalWatchlist; 

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedOccasion, setSelectedOccasion] = useState('');

  const handleAddToWatchlist = (item: DiscoverItem) => {
    if (watchlist.some(w => w.id === item.id)) {
        mockDispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: { id: item.id } });
    } else {
        mockDispatch({ type: 'ADD_TO_WATCHLIST', payload: { id: item.id, name: item.name } });
    }
  };

  const mockDiscoverItems: DiscoverItem[] = [
    {
      id: 'disc-1',
      name: 'Halloween LED String Lights',
      category: 'Home & Garden',
      trendScore: 95,
      location: state.selectedLocation,
      occasion: 'Halloween',
      priceRange: [15, 45],
      supplierSuggestions: ['FestiveLights Co', 'Seasonal Supplies'],
      demandForecast: { nextWeek: 85, nextMonth: 95, seasonal: 98 },
      aiInsights: ['Peak demand in 2 weeks', 'Order soon to avoid stockouts']
    },
    {
      id: 'disc-2',
      name: 'Bluetooth Noise-Canceling Headphones',
      category: 'Electronics',
      trendScore: 89,
      location: state.selectedLocation,
      occasion: 'Back to School',
      priceRange: [120, 299],
      supplierSuggestions: ['AudioTech Direct', 'ElectroSource'],
      demandForecast: { nextWeek: 45, nextMonth: 70, seasonal: 85 },
      aiInsights: ['Student discounts driving sales', 'Remote work trend continues']
    },
    {
      id: 'disc-3',
      name: 'Pumpkin Spice Candles',
      category: 'Home & Garden',
      trendScore: 92,
      location: state.selectedLocation,
      occasion: 'Halloween',
      priceRange: [8, 25],
      supplierSuggestions: ['Autumn Scents', 'Cozy Home Co'],
      demandForecast: { nextWeek: 75, nextMonth: 90, seasonal: 95 },
      aiInsights: ['Seasonal peak starting now', 'Social media buzz increasing']
    }
  ];

  const filteredItems = mockDiscoverItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesOccasion = !selectedOccasion || item.occasion === selectedOccasion;
    return matchesSearch && matchesCategory && matchesOccasion;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Discover Trends</h1>
        <p className="text-muted-foreground">Explore trending products in {state.selectedLocation}</p>
      </div>

      <TrendHeatmapSection selectedLocation={state.selectedLocation} />

      {/* Search and Filters */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-xl font-headline">
            <Search className="w-5 h-5 mr-2 text-primary" />
            Smart Discovery
          </CardTitle>
          <CardDescription>Use AI-powered search to find trending opportunities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input 
              placeholder="Search products, trends, or occasions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 h-10"
            />
            <Button variant="outline" size="icon" aria-label="Filter">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          <Tabs defaultValue="category" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="category">Categories</TabsTrigger>
              <TabsTrigger value="occasions">Occasions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="category" className="pt-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="font-normal"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="occasions" className="pt-4">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedOccasion ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedOccasion('')}
                  className="font-normal"
                >
                  All Occasions
                </Button>
                {occasions.map((occasion) => (
                  <Button
                    key={occasion}
                    variant={selectedOccasion === occasion ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedOccasion(occasion)}
                    className="font-normal"
                  >
                    <Calendar className="w-3.5 h-3.5 mr-1.5" />
                    {occasion}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden flex flex-col">
            <CardHeader className="pb-2 pt-4 px-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 mr-2">
                  <CardTitle className="text-lg font-semibold leading-tight">{item.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    {item.location}
                  </CardDescription>
                </div>
                <div className={cn(
                  "flex flex-col items-center justify-center px-2 py-1 rounded-md text-white min-w-[60px] text-center", // Adjusted min-width
                  item.trendScore >= 90 ? 'bg-green-500' : 'bg-yellow-500' // Simplified colors
                )}>
                  {item.trendScore >= 90 && <span className="text-[10px] font-semibold leading-none flex items-center"><Flame className="w-2.5 h-2.5 mr-0.5"/>HOT</span>}
                  <div className="text-2xl font-bold leading-none">{item.trendScore}</div>
                  <div className="text-[10px] opacity-90 leading-none mt-0.5">Trend Score</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-2 px-4 pb-4 space-y-3 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline" className="font-normal bg-secondary border-border">
                    {item.category}
                  </Badge>
                  {item.occasion && (
                    <Badge className="font-normal bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100/80">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.occasion}
                    </Badge>
                  )}
                </div>

                <div className="space-y-1 text-sm mb-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price Range</span>
                    <span className="font-medium text-foreground">${item.priceRange[0]} - ${item.priceRange[1]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Next Month Demand</span>
                    <span className="font-medium text-green-600">+{item.demandForecast.nextMonth}%</span>
                  </div>
                </div>

                <div className="bg-primary/10 p-2.5 rounded-md">
                  <div className="flex items-start">
                    <Zap className="w-4 h-4 text-primary mr-2 mt-px flex-shrink-0" />
                    <div className="text-xs text-primary/90"> 
                      <strong>AI Insight:</strong> {item.aiInsights[0]}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-auto pt-3">
                <Button 
                  className="flex-1"
                  onClick={() => handleAddToWatchlist(item)}
                  disabled={watchlist.some(w => w.id === item.id)}
                >
                  {watchlist.some(w => w.id === item.id) ? (
                    <>
                      <Heart className="w-4 h-4 mr-2 fill-current" />
                      In Watchlist
                    </>
                  ) : (
                    <>
                      <Heart className="w-4 h-4 mr-2" />
                      Add to Watchlist
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon" aria-label="View Trend Details">
                  <TrendingUp className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No trends found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
