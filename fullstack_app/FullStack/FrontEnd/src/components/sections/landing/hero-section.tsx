
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-background to-secondary/30">
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="font-headline text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Turn social <span className="bg-gradient-to-r from-primary via-accent to-sky-400 bg-clip-text text-transparent">buzz</span> into revenue.
          </h1>
          <p className="text-lg text-foreground/80 md:text-xl">
            MarketScout tracks social media ads and scores emerging products, so you can act first and capitalize on trends.
          </p>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <Button asChild size="lg" className="text-lg">
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://placehold.co/600x400.png"
            alt="Rising graph animation"
            width={600}
            height={400}
            className="rounded-lg shadow-xl"
            data-ai-hint="rising graph"
          />
        </div>
      </div>
    </section>
  );
}
