"use client";

import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Edit3, Trash2, Star } from 'lucide-react';

const mockAds = [
  {
    id: 'ad1',
    thumbnail: 'https://placehold.co/80x80.png',
    thumbnailHint: 'gadget product',
    headline: 'Revolutionary New Gadget!',
    source: 'TikTok',
    cpm: '$5.20',
    added: '2024-07-15',
  },
  {
    id: 'ad2',
    thumbnail: 'https://placehold.co/80x80.png',
    thumbnailHint: 'fashion accessory',
    headline: 'Summer Fashion Must-Have',
    source: 'Facebook',
    cpm: '$3.80',
    added: '2024-07-14',
  },
  {
    id: 'ad3',
    thumbnail: 'https://placehold.co/80x80.png',
    thumbnailHint: 'kitchen tool',
    headline: 'Cook Like a Pro with This Tool',
    source: 'Shopify',
    cpm: '$6.10',
    added: '2024-07-13',
  },
  {
    id: 'ad4',
    thumbnail: 'https://placehold.co/80x80.png',
    thumbnailHint: 'fitness equipment',
    headline: 'Get Fit This Summer - 50% Off',
    source: 'AliExpress',
    cpm: '$2.50',
    added: '2024-07-12',
  },
  {
    id: 'ad5',
    thumbnail: 'https://placehold.co/80x80.png',
    thumbnailHint: 'home decor',
    headline: 'Transform Your Home Instantly',
    source: 'TikTok',
    cpm: '$7.00',
    added: '2024-07-11',
  },
];

export function AdsTable() {
  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox aria-label="Select all ads" />
            </TableHead>
            <TableHead className="w-[100px]">Thumbnail</TableHead>
            <TableHead>Headline</TableHead>
            <TableHead>Source</TableHead>
            <TableHead>CPM</TableHead>
            <TableHead>Added</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAds.map((ad) => (
            <TableRow key={ad.id}>
              <TableCell>
                <Checkbox aria-label={`Select ad ${ad.id}`} />
              </TableCell>
              <TableCell>
                <Image
                  src={ad.thumbnail}
                  alt={ad.headline}
                  width={60}
                  height={60}
                  className="rounded-md object-cover"
                  data-ai-hint={ad.thumbnailHint}
                />
              </TableCell>
              <TableCell className="font-medium">{ad.headline}</TableCell>
              <TableCell>
                <Badge variant={
                  ad.source === 'TikTok' ? 'default' :
                  ad.source === 'Facebook' ? 'secondary' :
                  ad.source === 'Shopify' ? 'outline' : 'destructive' // Example variants
                }>{ad.source}</Badge>
              </TableCell>
              <TableCell>{ad.cpm}</TableCell>
              <TableCell>{ad.added}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                      <span className="sr-only">Ad actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Star className="mr-2 h-4 w-4" /> Add to Watchlist
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Edit3 className="mr-2 h-4 w-4" /> Edit Ad (Placeholder)
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Ad (Placeholder)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}

// Need to import Card component for the table wrapper
import { Card } from '@/components/ui/card';
