import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TrendingUp, Globe, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-12">
      <div className="container mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-4 md:grid-cols-4 lg:grid-cols-5">
        <div className="flex flex-col space-y-4 lg:col-span-2">
          <Link href="/" className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold font-headline">MarketScout</span>
          </Link>
          <p className="text-foreground/70">
            Turn social buzz into revenue. Discover trending products before they take off.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-headline text-lg font-medium">Product</h3>
          <ul className="space-y-2">
            <li><Link href="/#features" className="text-foreground/70 hover:text-primary">Features</Link></li>
            <li><Link href="/pricing" className="text-foreground/70 hover:text-primary">Pricing</Link></li>
            <li><Link href="/blog" className="text-foreground/70 hover:text-primary">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-headline text-lg font-medium">Company</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="text-foreground/70 hover:text-primary">About Us</Link></li>
            <li><Link href="/contact" className="text-foreground/70 hover:text-primary">Contact</Link></li>
            <li><Link href="/careers" className="text-foreground/70 hover:text-primary">Careers</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-1">
          <h3 className="mb-3 font-headline text-lg font-medium">Newsletter</h3>
          <p className="mb-2 text-sm text-foreground/70">Stay updated with the latest trends.</p>
          <form className="flex space-x-2">
            <Input type="email" placeholder="Enter your email" className="flex-grow" aria-label="Email for newsletter"/>
            <Button type="submit" size="icon" aria-label="Subscribe to newsletter"><Mail className="h-4 w-4" /></Button>
          </form>
          <div className="mt-4">
             <Button variant="outline" className="w-full">
                <Globe className="mr-2 h-4 w-4" /> English (US)
             </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8 max-w-screen-2xl border-t border-border/40 pt-8 text-center text-sm text-foreground/60">
        © {new Date().getFullYear()} MarketScout. All rights reserved.
      </div>
    </footer>
  );
}
