
"use client";

import React, { useState } from 'react';
import { Eye, TrendingUp, Bell, Trash2, Plus, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock store for now - replace with actual Zustand store or context later
interface WatchlistItem {
  id: string;
  productName: string;
  currentPrice: number;
  targetPrice: number;
  alertType: 'price' | 'trend' | 'stock';
  location: string;
  dateAdded: string;
  trendDirection: 'up' | 'down' | 'neutral';
  changePercent: string;
  status: 'active' | 'triggered';
}

const initialWatchlistItems: WatchlistItem[] = [
  {
    id: '1',
    productName: 'Smart Fitness Trackers',
    currentPrice: 85,
    targetPrice: 75,
    alertType: 'price' as const,
    location: 'San Francisco, CA',
    dateAdded: '2024-01-15',
    trendDirection: 'up',
    changePercent: '+12%',
    status: 'active',
  },
  {
    id: '2',
    productName: 'LED Plant Grow Lights',
    currentPrice: 45,
    targetPrice: 40,
    alertType: 'trend' as const,
    location: 'Seattle, WA',
    dateAdded: '2024-01-10',
    trendDirection: 'down',
    changePercent: '-5%',
    status: 'triggered',
  },
  {
    id: '3',
    productName: 'Sustainable Water Bottles',
    currentPrice: 32,
    targetPrice: 30,
    alertType: 'stock' as const,
    location: 'Portland, OR',
    dateAdded: '2024-01-08',
    trendDirection: 'up',
    changePercent: '+8%',
    status: 'active',
  },
];

// Mock dispatch for now
const mockDispatch = (action: { type: string; payload?: any }) => {
  console.log('Dispatching action (mock):', action);
  // In a real scenario, this would update the Zustand store
  // For mock purposes, update local state if needed for UI changes
  if (action.type === 'REMOVE_FROM_WATCHLIST' && action.payload) {
    setLocalWatchlistItems(prev => prev.filter(item => item.id !== action.payload));
  }
};

let setLocalWatchlistItems: React.Dispatch<React.SetStateAction<WatchlistItem[]>>;


export default function WatchlistPage() {
  const [watchlistItems, _setLocalWatchlistItems] = useState<WatchlistItem[]>(initialWatchlistItems);
  setLocalWatchlistItems = _setLocalWatchlistItems;

  const removeFromWatchlist = (id: string) => {
    mockDispatch({ type: 'REMOVE_FROM_WATCHLIST', payload: id });
  };

  const triggeredAlertsCount = watchlistItems.filter(item => item.status === 'triggered').length;
  const trendingUpCount = watchlistItems.filter(item => item.trendDirection === 'up').length;

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white min-h-full"> {/* Dark theme for this page */}
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline mb-1">Your Watchlist</h1>
          <p className="text-gray-300 flex items-center text-sm">
            <Eye className="w-4 h-4 mr-2 opacity-80" />
            Track products, prices, and trends that matter to you
          </p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          Add to Watchlist
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-gray-300">Total Items</CardTitle>
            <Eye className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold text-white">{watchlistItems.length}</div>
            <p className="text-xs text-blue-400">Active monitoring</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-gray-300">Triggered Alerts</CardTitle>
            <Bell className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold text-white">{triggeredAlertsCount}</div>
            <p className="text-xs text-orange-400">Require action</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-gray-300">Trending Up</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold text-white">{trendingUpCount}</div>
            <p className="text-xs text-green-400">Positive momentum</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-medium text-gray-300">Avg. ROI Potential</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-2xl font-bold text-white">23%</div>
            <p className="text-xs text-purple-400">Based on trends</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      {triggeredAlertsCount > 0 && (
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg shadow-xl">
          <CardHeader className="pt-5 pb-3 px-5">
            <CardTitle className="text-white flex items-center text-xl font-headline">
              <AlertTriangle className="w-5 h-5 mr-2.5 text-orange-400" />
              Active Alerts
            </CardTitle>
            <CardDescription className="text-gray-400 mt-1">
              Items that have triggered your alert conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="px-5 pb-5">
            <div className="space-y-4">
              {watchlistItems
                .filter(item => item.status === 'triggered')
                .map((item) => (
                  <div key={item.id} className="bg-orange-600/10 border border-orange-500/40 rounded-lg p-4 shadow-md">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                      <h3 className="font-semibold text-white text-md">{item.productName}</h3>
                      <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 font-medium py-1">
                        Alert Triggered
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300 mb-3">
                      {item.alertType === 'price' && `Price dropped to $${item.currentPrice} (target: $${item.targetPrice})`}
                      {item.alertType === 'trend' && `Trend score changed by ${item.changePercent}`}
                      {item.alertType === 'stock' && `Stock levels changed significantly`}
                    </p>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white font-semibold">
                        Take Action
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-500 text-gray-300 hover:bg-slate-700 hover:text-white">
                        Dismiss
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Watchlist Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {watchlistItems.map((item) => (
          <Card key={item.id} className="bg-slate-800/60 border-slate-700/50 backdrop-blur-lg shadow-xl hover:border-purple-500/70 transition-colors flex flex-col">
            <CardHeader className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-white text-lg font-semibold leading-tight">{item.productName}</CardTitle>
                  <CardDescription className="text-gray-400 mt-1 text-xs">
                    {item.location}
                  </CardDescription>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFromWatchlist(item.id)}
                  className="text-gray-400 hover:text-red-400 h-8 w-8 -mt-1 -mr-1"
                  aria-label="Remove from watchlist"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 space-y-3 flex-grow flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-gray-400">Current Price</span>
                  <span className="text-xl font-bold text-white">${item.currentPrice}</span>
                </div>
                
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-gray-400">Target Price</span>
                  <span className="text-sm text-gray-300">${item.targetPrice}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Trend</span>
                  <Badge 
                    className={cn(
                      "font-medium py-0.5 px-2 text-xs",
                      item.trendDirection === 'up'
                        ? 'bg-green-500/20 text-green-300 border-green-500/30'
                        : item.trendDirection === 'down' ? 'bg-red-500/20 text-red-300 border-red-500/30'
                        : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                    )}
                  >
                    {item.changePercent}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Alert Type</span>
                  <Badge variant="secondary" className="capitalize bg-slate-700 text-slate-300 border-slate-600 text-xs py-0.5 px-2">
                    {item.alertType}
                  </Badge>
                </div>
              </div>
              
              <div className="pt-3 mt-2 border-t border-slate-700/70">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 border-gray-500 text-gray-300 hover:bg-slate-700 hover:text-white">
                    Edit Alert
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-md"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State (if no items) */}
      {watchlistItems.length === 0 && (
        <Card className="bg-slate-800/60 border-slate-700/50 backdrop-blur-xl shadow-xl">
          <CardContent className="text-center py-16">
            <Eye className="w-16 h-16 text-gray-500 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-white mb-2">Your watchlist is empty</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Start tracking products and trends to get personalized alerts. Add items from the Discover page or directly here.
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-md">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Item
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
