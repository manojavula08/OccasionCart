import { ProductKanbanBoard } from '@/components/sections/dashboard/product-kanban-board';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export default function ProductsManagementPage() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex items-center justify-between">
        {/* Title is now in DashboardHeader for larger screens */}
        {/* <h1 className="text-2xl font-semibold font-headline">Product Pipeline</h1> */}
        <div/> {/* This empty div helps keep the button to the right when title is hidden */}
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Product (Placeholder)
        </Button>
      </div>
      <div className="flex-grow overflow-hidden"> {/* Added overflow-hidden for better layout with flex-grow */}
        <ProductKanbanBoard />
      </div>
    </div>
  );
}
