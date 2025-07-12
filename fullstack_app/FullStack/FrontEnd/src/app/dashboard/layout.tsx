import { DashboardSidebar } from '@/components/layout/dashboard-sidebar';
import { DashboardHeader } from '@/components/layout/dashboard-header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Use defaultOpen={true} for desktop-first approach where sidebar is open
    <SidebarProvider defaultOpen={true}> 
      <div className="flex min-h-screen w-full bg-background"> {/* Main background for the entire dashboard area */}
        <DashboardSidebar /> {/* Sidebar now has its own bg-sidebar */}
        <div className="flex flex-1 flex-col">
          <DashboardHeader /> {/* Header has bg-background */}
          <main className="flex-1 overflow-auto p-4 sm:p-6 bg-background"> {/* Content area background */}
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
