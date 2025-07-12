
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap } from 'lucide-react';

export function SidebarTrendQuestCard() {
  return (
    <Card className="bg-secondary border-none shadow-none my-2">
      <CardHeader className="p-3 pb-1">
        <CardTitle className="text-sm font-semibold flex items-center text-foreground">
          <Zap className="h-4 w-4 mr-1.5 text-primary"/> TrendQuest™
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-1">
        <p className="text-xs text-muted-foreground mb-1.5">Complete challenges to unlock insights</p>
        <Progress value={60} className="h-1.5 [&>div]:bg-primary" />
      </CardContent>
    </Card>
  );
}
