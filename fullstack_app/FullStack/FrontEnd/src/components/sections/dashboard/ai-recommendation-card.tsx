
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, Heart, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RecommendationTag {
  text: string;
  type: 'category' | 'occasion'; 
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | null | undefined;
  className?: string;
}

export interface AiRecommendation {
  id: string;
  name: string;
  imageUrl: string;
  imageHint: string;
  tags: RecommendationTag[];
  location: string;
  priceRange: string;
  demandPercentage: number;
  tip?: string;
  score: number;
}

interface AiRecommendationCardProps {
  recommendation: AiRecommendation;
  isInWatchlist: boolean;
  onToggleWatchlist: (id: string) => void;
}

export function AiRecommendationCard({ recommendation, isInWatchlist, onToggleWatchlist }: AiRecommendationCardProps) {
  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-full h-40 sm:h-48">
        <Image
          src={recommendation.imageUrl || "https://placehold.co/400x250.png"}
          alt={recommendation.name}
          layout="fill"
          objectFit="cover"
          data-ai-hint={recommendation.imageHint}
        />
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-md sm:text-lg text-foreground">{recommendation.name}</h3>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {recommendation.tags.map((tag) => (
                <Badge 
                  key={tag.text} 
                  variant={tag.variant || (tag.type === 'category' ? 'secondary' : 'outline')}
                  className={cn("text-xs py-0.5", tag.className)}
                >
                  {tag.text}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-right flex-shrink-0 pl-2">
            <p className="text-3xl font-bold text-primary">{recommendation.score}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn(
                "text-muted-foreground hover:text-primary -mr-2 mt-0.5",
                isInWatchlist && "text-primary"
              )}
              onClick={() => onToggleWatchlist(recommendation.id)}
            >
              <Heart 
                className={cn(
                  "h-3.5 w-3.5 mr-1",
                  isInWatchlist && "fill-current"
                )} 
              /> 
              {isInWatchlist ? "Watching" : "Watch"}
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground flex items-center space-x-1.5">
          <MapPin className="h-3.5 w-3.5" />
          <span>{recommendation.location}</span>
          <span className="text-muted-foreground/50">|</span>
          <span>{recommendation.priceRange}</span>
        </div>
        
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Demand Forecast</span>
            <span>{recommendation.demandPercentage}% next month</span>
          </div>
          <Progress value={recommendation.demandPercentage} className="h-1.5 [&>div]:bg-primary" />
        </div>
        
        {recommendation.tip && (
          <div className="text-xs text-muted-foreground bg-primary-foreground border border-primary/20 p-2.5 rounded-md flex items-start">
             <Info className="h-3.5 w-3.5 mr-2 mt-px text-primary flex-shrink-0" /> 
             <span>{recommendation.tip}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
