
"use client";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, TrendingUp } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  // Add more links as needed
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline sm:inline-block text-lg">
            MarketScout
          </span>
        </Link>
        <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <ModeToggle />
          <Button variant="ghost" asChild className="hidden md:inline-flex">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Main Navigation Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-8">
              <Link href="/" className="mb-4 flex items-center space-x-2">
                <TrendingUp className="h-6 w-6 text-primary" />
                <span className="font-bold font-headline sm:inline-block text-lg">
                  MarketScout
                </span>
              </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                    onClick={() => document.querySelector<HTMLButtonElement>('[data-radix-dialog-close]')?.click()}
                  >
                    {link.label}
                  </Link>
                ))}
                 <Button variant="ghost" asChild className="text-lg">
                  <Link href="/login">Log In</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
