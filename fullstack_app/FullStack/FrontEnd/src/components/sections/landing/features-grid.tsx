
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScanSearch, MapPinned, Cpu, Star, Bell, FileDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: ScanSearch,
    title: 'Ad Scanner',
    description: 'Automatically discover viral ads across TikTok, Facebook, and more.',
  },
  {
    icon: MapPinned,
    title: 'Heat Map',
    description: 'Visualize product popularity and engagement hotspots globally.',
  },
  {
    icon: Cpu,
    title: 'AI Trend Score',
    description: 'Proprietary AI model scores products based on their breakout potential.',
  },
  {
    icon: Star,
    title: 'Watchlist',
    description: 'Track promising products and get notified of significant changes.',
  },
  {
    icon: Bell,
    title: 'Real-time Alerts',
    description: 'Instant notifications for new trending ads and product score updates.',
  },
  {
    icon: FileDown,
    title: 'CSV Export',
    description: 'Easily export ad and product data for your own analysis.',
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Powerful Features, Unfair Advantage
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Everything you need to find winning products before anyone else.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col transition-all hover:shadow-lg hover:border-primary/50">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <feature.icon className="h-10 w-10 text-primary" />
                <CardTitle className="font-headline text-2xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
