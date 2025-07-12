
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function BillingTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Billing & Subscription</CardTitle>
        <CardDescription>Manage your subscription, payment methods, and view invoices.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Current Plan</h3>
          <p className="text-primary font-medium text-lg">Growth Plan ($49/month)</p>
        </div>
        <div>
          <h3 className="font-semibold">Next Billing Date</h3>
          <p>August 15, 2024</p>
        </div>
        <div>
          <h3 className="font-semibold">Payment Method</h3>
          <p>Visa **** **** **** 1234</p>
        </div>
         <Button onClick={() => alert("Redirect to Stripe Customer Portal (placeholder)")}>
          Manage Subscription in Stripe <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
