
"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from 'recharts';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  iconContainerClassName?: string;
  change?: string;
  changeType?: 'positive' | 'negative';
  changeClassName?: string;
  subtext?: string; // For text like "Items being tracked" or "Excellent opportunity"
  chartData?: { name: string; value: number }[];
  chartType?: 'line' | 'bar';
}

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
} satisfies Parameters<typeof ChartContainer>[0]["config"];


export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  iconContainerClassName,
  change, 
  changeType, 
  changeClassName,
  subtext,
  chartData, 
  chartType = 'line' 
}: StatCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-1 pt-4 px-4">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className={cn("p-1.5 rounded-full bg-primary/10 flex items-center justify-center", iconContainerClassName)}>
         <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <div className="text-3xl font-bold font-headline text-foreground">{value}</div>
        {change && (
          <p className={cn(
            "text-xs mt-1", 
            changeType === 'positive' ? 'text-green-600' : 'text-red-600',
            changeClassName
            )}>
            {change}
          </p>
        )}
        {subtext && !change && ( // Only show subtext if there's no 'change' text, or adjust logic as needed
          <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
        )}
        {chartData && chartData.length > 0 && (
          <div className="h-[50px] mt-2 -ml-4 -mr-2"> {/* Adjusted margins for tighter fit */}
            <ChartContainer config={chartConfig} className="h-full w-full">
              {chartType === 'line' ? (
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 5,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="name" hide />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide/>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel hideIndicator />}
                  />
                  <Line
                    dataKey="value"
                    type="monotone"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              ) : (
                <BarChart 
                  accessibilityLayer 
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 0,
                    top: 5,
                    bottom: 0,
                  }}
                >
                  <XAxis dataKey="name" hide />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide/>
                   <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel hideIndicator />}
                  />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={2} />
                </BarChart>
              )}
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
