
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
}

export function QuickActionCard({ icon: Icon, title, description, href }: QuickActionCardProps) {
  return (
    <Link href={href} className="block group">
      <Card className="h-full hover:shadow-lg transition-shadow hover:border-primary/30">
        <CardHeader className="pb-2 pt-5">
          <Icon className="h-6 w-6 text-primary mb-1 group-hover:text-primary/80 transition-colors" />
          <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-5">
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
