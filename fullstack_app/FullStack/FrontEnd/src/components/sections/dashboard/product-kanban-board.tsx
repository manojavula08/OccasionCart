"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ListTodo, Loader, CheckCircle, MoreHorizontal, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


interface Product {
  id: string;
  title: string;
  imageUrl: string;
  imageHint: string;
  score: number;
}

interface KanbanColumn {
  id: 'watchlist' | 'testing' | 'scaling';
  title: string;
  icon: React.ElementType;
  products: Product[];
}

const mockProducts: Product[] = [
  { id: 'p1', title: 'Smart Water Bottle', imageUrl: 'https://placehold.co/300x200.png', imageHint: 'smart bottle', score: 85 },
  { id: 'p2', title: 'Portable Blender X', imageUrl: 'https://placehold.co/300x200.png', imageHint: 'portable blender', score: 92 },
  { id: 'p3', title: 'Ergonomic Desk Chair', imageUrl: 'https://placehold.co/300x200.png', imageHint: 'office chair', score: 78 },
  { id: 'p4', title: 'Noise Cancelling Buds', imageUrl: 'https://placehold.co/300x200.png', imageHint: 'earbuds audio', score: 95 },
  { id: 'p5', title: 'Mini Drone Pro', imageUrl: 'https://placehold.co/300x200.png', imageHint: 'drone technology', score: 88 },
  { id: 'p6', title: 'Adjustable Standing Desk', imageUrl: 'https://placehold.co/300x200.png', imageHint: 'standing desk', score: 72 },
];

const initialColumns: KanbanColumn[] = [
  { id: 'watchlist', title: 'Watchlist', icon: ListTodo, products: mockProducts.slice(0, 2) },
  { id: 'testing', title: 'Testing', icon: Loader, products: mockProducts.slice(2, 4) },
  { id: 'scaling', title: 'Scaling', icon: CheckCircle, products: mockProducts.slice(4, 6) },
];

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="mb-3 hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={300}
          height={150} // Adjust height for better card aspect ratio
          className="rounded-t-lg object-cover w-full h-36" // Fixed height for image consistency
          data-ai-hint={product.imageHint}
        />
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-md mb-1">{product.title}</h4>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Move to Watchlist</DropdownMenuItem>
              <DropdownMenuItem>Move to Testing</DropdownMenuItem>
              <DropdownMenuItem>Move to Scaling</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Badge variant={product.score > 90 ? "default" : product.score > 80 ? "secondary" : "outline"}
               className={product.score > 90 ? "bg-green-500 text-white" : product.score > 80 ? "bg-yellow-500 text-white" : ""}
        >
          <Star className="mr-1 h-3 w-3" /> AI Score: {product.score}
        </Badge>
      </CardContent>
    </Card>
  );
}

export function ProductKanbanBoard() {
  // In a real app, columns and products would be state managed with DnD library
  const columns = initialColumns;

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
      {columns.map((column) => (
        <div key={column.id} className="w-80 flex-shrink-0">
          <Card className="bg-secondary/70 h-full">
            <CardHeader className="p-3 border-b">
              <CardTitle className="flex items-center text-lg font-headline">
                <column.icon className="mr-2 h-5 w-5 text-primary" />
                {column.title}
                <Badge variant="secondary" className="ml-auto">{column.products.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-3 h-[calc(100%-4rem)] overflow-y-auto"> {/* Adjust height for scroll */}
              {column.products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
               {column.products.length === 0 && (
                <div className="text-center text-muted-foreground py-8">No products here.</div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
