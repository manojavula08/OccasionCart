
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Compass,
  Bookmark,
  Users,
  SettingsIcon, // Renamed for clarity
  Zap, 
  LogOut,
  HelpCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { SidebarTrendQuestCard } from '@/components/sections/dashboard/sidebar-trendquest-card';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/discover', label: 'Discover', icon: Compass },
  { href: '/dashboard/watchlist', label: 'Watchlist', icon: Bookmark },
  { href: '/dashboard/suppliers', label: 'Suppliers', icon: Users },
  { href: '/dashboard/settings', label: 'Settings', icon: SettingsIcon },
];


export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground" style={{ width: '260px' }}>
      <SidebarHeader className="p-4 border-b border-sidebar-border h-16 flex items-center">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <Zap className="h-7 w-7 text-primary" />
          <div className="flex flex-col">
            <span className="text-xl font-bold font-headline text-foreground">Dropspot</span>
            <div className="text-xs text-primary flex items-center -mt-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-0.5"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Occasio™ AI
            </div>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-grow p-2 space-y-1">
        <SidebarMenu>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className={cn(
                    "w-full justify-start text-sm font-medium",
                    isActive ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  )}
                  size="default"
                >
                  <Link href={item.href} className="flex items-center">
                    <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-primary" : "text-sidebar-foreground/60")} />
                    {item.label}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarGroup className="mt-auto px-2 pb-1 space-y-1 border-t-0">
          <SidebarTrendQuestCard />
          <div className="p-3 rounded-md bg-transparent">
               <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="beginner-mode-switch" className="text-sm font-medium text-sidebar-foreground/80">
                      Beginner Mode
                  </Label>
                  <Switch id="beginner-mode-switch" defaultChecked={true} />
              </div>
              <p className="text-xs text-sidebar-foreground/60 flex items-start">
                  <HelpCircle className="h-3 w-3 mr-1 mt-0.5 shrink-0"/>
                  Get extra guidance and simplified views.
              </p>
          </div>
      </SidebarGroup>

      <SidebarFooter className="p-3 border-t border-sidebar-border">
        <SidebarMenuButton
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/70 hover:text-destructive"
            size="default"
            onClick={() => alert("Logout functionality to be implemented")}
        >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
