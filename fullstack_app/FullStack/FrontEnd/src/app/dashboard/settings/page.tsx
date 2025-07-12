import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileTab } from '@/components/sections/settings/profile-tab';
import { BillingTab } from '@/components/sections/settings/billing-tab';
import { ApiKeysTab } from '@/components/sections/settings/api-keys-tab';
import { IntegrationsTab } from '@/components/sections/settings/integrations-tab';
import { User, CreditCard, Key, Plug } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Title is now in DashboardHeader for larger screens */}
      {/* <h1 className="text-2xl font-semibold font-headline">Settings</h1> */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6">
          <TabsTrigger value="profile" className="py-2.5">
            <User className="mr-2 h-4 w-4 sm:inline-block hidden" /> Profile
          </TabsTrigger>
          <TabsTrigger value="billing" className="py-2.5">
            <CreditCard className="mr-2 h-4 w-4 sm:inline-block hidden" /> Billing
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="py-2.5">
            <Key className="mr-2 h-4 w-4 sm:inline-block hidden" /> API Keys
          </TabsTrigger>
          <TabsTrigger value="integrations" className="py-2.5">
            <Plug className="mr-2 h-4 w-4 sm:inline-block hidden" /> Integrations
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileTab />
        </TabsContent>
        <TabsContent value="billing">
          <BillingTab />
        </TabsContent>
        <TabsContent value="api-keys">
          <ApiKeysTab />
        </TabsContent>
        <TabsContent value="integrations">
          <IntegrationsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
