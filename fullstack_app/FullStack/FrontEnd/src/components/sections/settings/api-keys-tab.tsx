
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Key, PlusCircle, Copy, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockApiKeys = [
    { id: "key1", name: "Default Key", key: "sk_live_xxxxxxxxxxxx1234", created: "2024-01-10", lastUsed: "2024-07-15" },
    { id: "key2", name: "Analytics Integration", key: "sk_live_xxxxxxxxxxxx5678", created: "2024-05-20", lastUsed: "2024-07-01" },
];

export function ApiKeysTab() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
            <div>
                <CardTitle className="font-headline">API Keys</CardTitle>
                <CardDescription>Manage API keys for programmatic access to MarketScout data.</CardDescription>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Key
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        {mockApiKeys.length > 0 ? (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Key (Partial)</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Last Used</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockApiKeys.map(apiKey => (
                        <TableRow key={apiKey.id}>
                            <TableCell className="font-medium">{apiKey.name}</TableCell>
                            <TableCell className="font-mono">{apiKey.key.substring(0,12)}...</TableCell>
                            <TableCell>{apiKey.created}</TableCell>
                            <TableCell>{apiKey.lastUsed}</TableCell>
                            <TableCell className="text-right space-x-1">
                                <Button variant="ghost" size="icon" aria-label="Copy API Key">
                                    <Copy className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" aria-label="Delete API Key" className="text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        ) : (
            <div className="text-center py-8 text-muted-foreground">
                <Key className="mx-auto h-12 w-12 mb-2" />
                <p>You haven&apos;t created any API keys yet.</p>
            </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground border-t pt-4">
        API access is available on the Pro plan. Refer to our <a href="/docs/api" className="text-primary underline">API documentation</a> for more details.
      </CardFooter>
    </Card>
  );
}
