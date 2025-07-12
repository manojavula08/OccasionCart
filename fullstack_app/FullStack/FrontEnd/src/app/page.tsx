
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/landing/hero-section';
import { FeaturesGrid } from '@/components/sections/landing/features-grid';
import { SocialProof } from '@/components/sections/landing/social-proof';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesGrid />
        <SocialProof />
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              Ready to Find Your Next Bestseller?
            </h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Join MarketScout today and gain an unbeatable edge in the e-commerce world. Start your free trial and discover trending products before they explode.
            </p>
            <Button asChild size="lg" className="text-lg">
              <Link href="/signup">Claim Your Free Trial</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
