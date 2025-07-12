"use client";

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Filter } from 'lucide-react';
import { DateRangePicker } from '@/components/ui/date-range-picker'; // Assuming this exists or will be created

// Placeholder for DateRangePicker if not available.
// If you don't have a DateRangePicker, you can use two Input type="date" fields.
// For simplicity, I'm adding a basic version here.
const DateRangePickerPlaceholder = () => (
  <div className="space-y-2">
    <Label>Date Range</Label>
    <div className="flex space-x-2">
      <Input type="date" placeholder="Start Date" />
      <Input type="date" placeholder="End Date" />
    </div>
  </div>
);


export function AdsFilterDrawer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[350px] sm:w-[450px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline">Filter Ads</SheetTitle>
          <SheetDescription>
            Refine your ad search using the filters below.
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        <div className="flex-grow space-y-6 overflow-y-auto p-1 pr-3">
          <div>
            <Label className="text-base font-medium">Source</Label>
            <div className="mt-2 space-y-2">
              {['TikTok', 'Facebook', 'AliExpress', 'Shopify'].map((source) => (
                <div key={source} className="flex items-center space-x-2">
                  <Checkbox id={`filter-${source.toLowerCase()}`} />
                  <Label htmlFor={`filter-${source.toLowerCase()}`} className="font-normal">
                    {source}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div>
            <Label htmlFor="cpm-slider" className="text-base font-medium">CPM Range</Label>
            <Slider
              id="cpm-slider"
              defaultValue={[2, 10]}
              min={0}
              max={20}
              step={0.1}
              className="mt-2"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>$2.00</span>
              <span>$10.00</span>
            </div>
          </div>
          
          <Separator />

          <div>
            {/* Replace with actual DateRangePicker if available */}
            <DateRangePickerPlaceholder />
          </div>
        </div>
        <SheetFooter className="mt-auto pt-4 border-t">
          <SheetClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button type="submit">Apply Filters</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
