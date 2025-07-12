
"use client";

import { QuickActionCard } from './quick-action-card';
import { Eye, CalendarClock, Zap } from 'lucide-react';

const quickActions = [
  {
    icon: Eye,
    title: 'Discover Trends',
    description: 'Find products trending in your area',
    href: '/dashboard/discover',
  },
  {
    icon: CalendarClock,
    title: 'Occasion Calendar',
    description: 'Plan for upcoming events',
    href: '#', // Placeholder link
  },
  {
    icon: Zap,
    title: 'TrendQuest™',
    description: 'Complete challenges for insights',
    href: '#', // Placeholder link
  },
];

export function QuickActionsSection() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold font-headline text-foreground">Quick Actions</h2>
        <p className="text-sm text-muted-foreground">Get started with your dropshipping journey</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => (
          <QuickActionCard
            key={action.title}
            icon={action.icon}
            title={action.title}
            description={action.description}
            href={action.href}
          />
        ))}
      </div>
    </section>
  );
}
