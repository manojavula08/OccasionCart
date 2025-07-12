
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Construction } from 'lucide-react';

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center font-headline">
            <Users className="mr-2 h-6 w-6 text-primary" />
            Suppliers
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center py-12">
          <Construction className="h-16 w-16 text-primary/70 mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-foreground">Feature Coming Soon!</h3>
          <p className="text-muted-foreground max-w-md">
            We're hard at work developing our new Suppliers management feature. It's currently in the testing phase and will be available soon.
          </p>
          <p className="text-muted-foreground mt-2 max-w-md">
            This section will allow you to manage supplier information, utilize advanced filtering, and access detailed insights. Stay tuned for updates!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
