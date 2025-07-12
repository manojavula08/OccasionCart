"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface OverviewStatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconColor?: string;
  subValue?: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  progress?: number; // Value from 0 to 100 for progress bar
  footerText?: string;
}

export function OverviewStatCard({ 
  title, 
  value, 
  icon: Icon, 
  iconColor = "text-primary",
  subValue,
  change, 
  changeType,
  progress,
  footerText,
}: OverviewStatCardProps) {
  return (
    <Card className="bg-card shadow-lg h-full flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <div className="text-2xl font-bold text-foreground">{value}</div>
            {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
        </div>
        <div className={cn("p-2 rounded-md bg-primary/10", iconColor === "text-yellow-400" && "bg-yellow-400/10")}>
          <Icon className={cn("h-5 w-5", iconColor)} />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {change && (
          <p className={cn(
            "text-xs", 
            changeType === 'positive' ? 'text-green-500' : 'text-red-500'
          )}>
            {change}
          </p>
        )}
        {progress !== undefined && (
            <div className="mt-2">
                <Progress value={progress} className="h-2 [&>div]:bg-primary" />
                {footerText && <p className="text-xs text-muted-foreground mt-1 text-right">{footerText}</p>}
            </div>
        )}
      </CardContent>
    </Card>
  );
}
