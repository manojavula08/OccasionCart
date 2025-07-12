
"use client";

// Removed useState as state is now managed by parent
import { AiRecommendationCard, type AiRecommendation } from './ai-recommendation-card';
import { Zap } from 'lucide-react';

const mockRecommendations: AiRecommendation[] = [
  {
    id: 'rec1',
    name: 'Wireless Earbuds Pro',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'wireless earbuds',
    tags: [
      { text: 'Electronics', type: 'category', variant: 'secondary', className: "bg-purple-100 text-purple-700 border-purple-200" },
      { text: 'Back to School', type: 'occasion', variant: 'outline', className: "border-pink-300 text-pink-600 bg-pink-50" },
    ],
    location: 'San Francisco, CA',
    priceRange: '$79 - $199',
    demandPercentage: 45,
    tip: 'Peak demand expected during university orientation week',
    score: 92,
  },
  {
    id: 'rec2',
    name: 'Yoga Mat Premium',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'yoga mat',
    tags: [
      { text: 'Fitness', type: 'category', variant: 'secondary', className: "bg-green-100 text-green-700 border-green-200" },
      { text: 'New Year Resolutions', type: 'occasion', variant: 'outline', className: "border-blue-300 text-blue-600 bg-blue-50" },
    ],
    location: 'San Francisco, CA',
    priceRange: '$25 - $89',
    demandPercentage: 65,
    tip: 'January spike predicted due to fitness resolutions.',
    score: 87,
  },
  {
    id: 'rec3',
    name: 'Smart Water Bottle',
    imageUrl: 'https://placehold.co/400x250.png',
    imageHint: 'smart bottle',
    tags: [
      { text: 'Health', type: 'category', variant: 'secondary', className: "bg-teal-100 text-teal-700 border-teal-200" },
    ],
    location: 'San Francisco, CA',
    priceRange: '$35 - $79',
    demandPercentage: 38,
    tip: 'Health consciousness driving sales, especially with hydration tracking features.',
    score: 84,
  },
];

interface AiRecommendationsSectionProps {
  currentWatchlistIds: string[];
  onToggleWatchlist: (id: string) => void;
}

export function AiRecommendationsSection({ currentWatchlistIds, onToggleWatchlist }: AiRecommendationsSectionProps) {
  // Local state for watchedItemIds has been removed.
  // The onToggleWatchlist function prop now handles state updates in the parent.

  return (
    <section className="space-y-4">
      <div className="flex items-center space-x-2">
        <Zap className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-xl font-semibold font-headline text-foreground">Occasio™ AI Recommendations</h2>
          <p className="text-sm text-muted-foreground">Hyper-localized trends for San Francisco, CA 94102 powered by AI</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockRecommendations.map((recommendation) => (
          <AiRecommendationCard
            key={recommendation.id}
            recommendation={recommendation}
            isInWatchlist={currentWatchlistIds.includes(recommendation.id)}
            onToggleWatchlist={onToggleWatchlist} // Pass down the handler from props
          />
        ))}
      </div>
    </section>
  );
}
