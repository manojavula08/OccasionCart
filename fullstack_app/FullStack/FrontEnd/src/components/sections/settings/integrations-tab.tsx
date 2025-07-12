
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Plug, Settings2 } from "lucide-react";

const integrations = [
  { 
    id: 'shopify', 
    name: 'Shopify', 
    description: 'Sync your Shopify store products and orders.', 
    logo: 'https://placehold.co/40x40.png', 
    logoHint: 'Shopify logo',
    isActive: true 
  },
  { 
    id: 'google-ads', 
    name: 'Google Ads', 
    description: 'Import campaign data and track performance.', 
    logo: 'https://placehold.co/40x40.png', 
    logoHint: 'Google Ads logo',
    isActive: false 
  },
  { 
    id: 'facebook-ads', 
    name: 'Facebook Ads', 
    description: 'Connect your Facebook Ad account for insights.', 
    logo: 'https://placehold.co/40x40.png', 
    logoHint: 'Facebook Ads logo',
    isActive: true 
  },
  { 
    id: 'slack', 
    name: 'Slack', 
    description: 'Get real-time notifications in your Slack channels.', 
    logo: 'https://placehold.co/40x40.png', 
    logoHint: 'Slack logo',
    isActive: false 
  },
];

export function IntegrationsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Integrations</CardTitle>
        <CardDescription>Connect MarketScout with your favorite tools and platforms.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {integrations.map((integration, index) => (
          <div key={integration.id}>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-3">
                <Image 
                  src={integration.logo} 
                  alt={`${integration.name} logo`} 
                  width={40} 
                  height={40} 
                  className="rounded-md"
                  data-ai-hint={integration.logoHint}
                />
                <div>
                  <h4 className="font-semibold">{integration.name}</h4>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Switch id={`switch-${integration.id}`} defaultChecked={integration.isActive} aria-label={`Toggle ${integration.name} integration`} />
                <Button variant="outline" size="sm">
                  <Settings2 className="mr-1.5 h-4 w-4" /> Setup
                </Button>
              </div>
            </div>
            {index < integrations.length - 1 && <Separator className="my-6" />}
          </div>
        ))}
        {integrations.length === 0 && (
             <div className="text-center py-8 text-muted-foreground">
                <Plug className="mx-auto h-12 w-12 mb-2" />
                <p>No integrations available yet. Check back soon!</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
