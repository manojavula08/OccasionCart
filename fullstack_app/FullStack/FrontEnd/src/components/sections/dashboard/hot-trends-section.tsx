"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, MapPin, Tag, ExternalLink } from 'lucide-react'; // Using Flame for Hot Trends

interface TrendItem {
  id: string;
  name: string;
  location: string;
  categoryTag: string;
  priceRange: string;
  trendScore: number;
  changePercentage: number;
}

const mockTrends: TrendItem[] = [
  { id: 't1', name: 'Smart Fitness Trackers', location: 'San Francisco, CA', categoryTag: 'New Year Resolutions', priceRange: '$45 - $120', trendScore: 94, changePercentage: 23 },
  { id: 't2', name: 'Sustainable Water Bottles', location: 'Portland, OR', categoryTag: 'Earth Day Prep', priceRange: '$25 - $75', trendScore: 87, changePercentage: 18 },
  { id: 't3', name: 'LED Plant Grow Lights', location: 'Seattle, WA', categoryTag: 'Indoor Gardening Winter', priceRange: '$30 - $95', trendScore: 82, changePercentage: 12 },
];

export function HotTrendsSection() {
  return (
    <Card className="bg-card shadow-lg h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-headline flex items-center text-foreground">
          <Flame className="mr-2 h-6 w-6 text-orange-500 fill-orange-500" />
          Hot Trends Near You
        </CardTitle>
        <p className="text-sm text-muted-foreground">AI-powered insights for your location</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockTrends.map((trend) => (
          <div key={trend.id} className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-foreground">{trend.name}</h4>
              <Badge className={trend.changePercentage > 0 ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30"}>
                {trend.changePercentage > 0 ? '+' : ''}{trend.changePercentage}%
              </Badge>
            </div>
            <div className="flex items-center text-xs text-muted-foreground space-x-3 mb-2">
              <span className="flex items-center"><MapPin className="h-3 w-3 mr-1" /> {trend.location}</span>
              <span className="flex items-center"><Tag className="h-3 w-3 mr-1" /> {trend.categoryTag}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-foreground font-medium">{trend.priceRange}</span>
              <Badge variant="outline" className="border-primary/50 text-primary">Trend Score: {trend.trendScore}</Badge>
            </div>
          </div>
        ))}
         <Button variant="link" className="text-primary p-0 h-auto text-sm">
            View More Trends <ExternalLink className="ml-1 h-3 w-3"/>
        </Button>
      </CardContent>
    </Card>
  );
}
