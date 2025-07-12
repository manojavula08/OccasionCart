import { Button } from '@/components/ui/button';
import { AdsTable } from '@/components/sections/dashboard/ads-table';
import { AdsFilterDrawer } from '@/components/sections/dashboard/ads-filter-drawer';
import { Download } from 'lucide-react';

export default function AdsManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Title is now in DashboardHeader for larger screens */}
        {/* <h1 className="text-2xl font-semibold font-headline">Ad Management</h1> */}
        <div className="flex gap-2 items-center">
          <AdsFilterDrawer />
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>
      <AdsTable />
    </div>
  );
}
