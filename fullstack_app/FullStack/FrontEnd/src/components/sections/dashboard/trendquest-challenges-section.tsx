"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Zap, Target } from 'lucide-react'; // Using Zap for TrendQuest, Target for challenge icon

interface ChallengeItem {
  id: string;
  title: string;
  progress: number; // 0-100
  points: number;
  totalPoints: number;
}

const mockChallenges: ChallengeItem[] = [
  { id: 'c1', title: 'Spot 5 Rising Trends', progress: 60, points: 150, totalPoints: 150 },
  { id: 'c2', title: 'Add 3 Items to Watchlist', progress: 33, points: 100, totalPoints: 100 },
  { id: 'c3', title: 'Discover Local Opportunity', progress: 80, points: 200, totalPoints: 200 },
];

export function TrendQuestChallengesSection() {
  return (
    <Card className="bg-card shadow-lg h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-headline flex items-center text-foreground">
          <Zap className="mr-2 h-6 w-6 text-yellow-400 fill-yellow-400" />
          TrendQuest™ Challenges
        </CardTitle>
        <p className="text-sm text-muted-foreground">Complete challenges to level up</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockChallenges.map((challenge) => (
          <div key={challenge.id} className="p-3 rounded-lg bg-secondary/30">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-semibold text-foreground flex items-center text-sm">
                <Target className="h-4 w-4 mr-2 text-primary"/> {challenge.title}
              </h4>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
                +{challenge.points}
              </span>
            </div>
            <Progress value={challenge.progress} className="h-1.5 my-1 [&>div]:bg-primary" />
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{challenge.progress}% complete</span>
              <span>{challenge.totalPoints} points</span>
            </div>
          </div>
        ))}
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-2">
          View All Challenges
        </Button>
      </CardContent>
    </Card>
  );
}
