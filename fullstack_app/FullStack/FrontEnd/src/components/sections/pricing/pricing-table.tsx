"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Starter',
    monthlyPrice: 0,
    annualPrice: 0,
    description: 'For individuals starting out and exploring trends.',
    features: [
      'Limited Ad Tracking (1 Platform)',
      'Basic Trend Scores',
      '5 Watchlist Items',
      'Email Support',
    ],
    cta: 'Get Started',
    isPopular: false,
  },
  {
    name: 'Growth',
    monthlyPrice: 49,
    annualPrice: 39, // 49 * 12 * 0.8 / 12 ~ 39
    description: 'For growing businesses needing more power and insights.',
    features: [
      'Full Ad Tracking (All Platforms)',
      'Advanced AI Trend Scores',
      '50 Watchlist Items',
      'Priority Email Support',
      'CSV Export',
    ],
    cta: 'Choose Growth',
    isPopular: true,
  },
  {
    name: 'Pro',
    monthlyPrice: 149,
    annualPrice: 119, // 149 * 12 * 0.8 / 12 ~ 119
    description: 'For established businesses and agencies scaling rapidly.',
    features: [
      'All Growth Features',
      'Unlimited Watchlist Items',
      'API Access',
      'Dedicated Account Manager',
      'Early Access to New Features',
    ],
    cta: 'Go Pro',
    isPopular: false,
  },
];

interface PricingTableProps {
  accentColor?: string; // e.g., #3ab795
}

export function PricingTable({ accentColor = '#3ab795' }: PricingTableProps) {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Find the Perfect Plan
          </h1>
          <p className="mt-4 text-lg text-foreground/70">
            Simple, transparent pricing. Choose the plan that fits your needs.
          </p>
        </div>

        <div className="mb-10 flex items-center justify-center space-x-3">
          <Label htmlFor="billing-cycle" className={cn(!isAnnual && "text-primary font-semibold")}>Monthly</Label>
          <Switch
            id="billing-cycle"
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            aria-label="Toggle billing cycle"
          />
          <Label htmlFor="billing-cycle" className={cn(isAnnual && "text-primary font-semibold")}>Annual (Save 20%)</Label>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className={cn("flex flex-col", plan.isPopular && "border-2 border-primary shadow-xl")}>
              {plan.isPopular && (
                <div style={{ backgroundColor: accentColor }} className="px-4 py-1 text-center text-sm font-semibold text-primary-foreground rounded-t-lg -mb-px">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">{plan.name}</CardTitle>
                <CardDescription className="text-lg">
                  <span className="font-headline text-4xl font-bold text-foreground">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  /month
                </CardDescription>
                <p className="text-sm text-foreground/60">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full text-lg" 
                  variant={plan.isPopular ? 'default' : 'outline'}
                  style={plan.isPopular ? { backgroundColor: accentColor, borderColor: accentColor } : {}}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
