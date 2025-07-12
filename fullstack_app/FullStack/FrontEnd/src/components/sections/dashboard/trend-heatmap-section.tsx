
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrendHeatmapSectionProps {
  selectedLocation: string;
}

export function TrendHeatmapSection({ selectedLocation }: TrendHeatmapSectionProps) {
  const [lastUpdatedMinutes, setLastUpdatedMinutes] = useState<number>(2); // Mock: 2 minutes ago

  useEffect(() => {
    // In a real app, this might fetch data or listen to updates
    const interval = setInterval(() => {
      setLastUpdatedMinutes(Math.floor(Math.random() * 5) + 1); // Random minutes between 1 and 5
    }, 60000 * 5); // Update mock time every 5 minutes for demo
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center">
            <Map className="w-6 h-6 mr-3 text-primary flex-shrink-0" />
            <div>
              <CardTitle className="text-xl font-headline">Trend Heatmap</CardTitle>
              <CardDescription>Visualize product demand intensity in your area.</CardDescription>
            </div>
          </div>
          <div className="flex items-center text-xs text-muted-foreground mt-1 sm:mt-0">
            <Clock className="w-3 h-3 mr-1" />
            Updated {lastUpdatedMinutes} minutes ago
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="aspect-[16/7] w-full border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center p-6 bg-secondary/30">
          <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-primary/50 mb-3 sm:mb-4" />
          <p className="text-md sm:text-lg font-medium text-foreground/80 text-center">Interactive Heatmap Visualization</p>
          <p className="text-xs sm:text-sm text-muted-foreground text-center mt-1">
            Showing trend intensity for <span className="font-semibold text-primary">{selectedLocation}</span>.
          </p>
          <p className="text-xs text-muted-foreground mt-2 max-w-md text-center">
            (Actual map rendering to be implemented. Data would be derived from AI predictions analyzing product buzz, location affinity, and demand signals from various sources.)
          </p>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-6 text-sm">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-400 mr-1.5 sm:mr-2"></span>
            <span className="text-muted-foreground text-xs sm:text-sm">Low Activity</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-yellow-400 mr-1.5 sm:mr-2"></span>
            <span className="text-muted-foreground text-xs sm:text-sm">Medium Activity</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-500 mr-1.5 sm:mr-2"></span>
            <span className="text-muted-foreground text-xs sm:text-sm">High Activity</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
