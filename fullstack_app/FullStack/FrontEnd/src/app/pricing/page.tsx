import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PricingTable } from '@/components/sections/pricing/pricing-table';
import { FaqAccordion } from '@/components/sections/pricing/faq-accordion';

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <PricingTable accentColor="#3ab795" />
        <FaqAccordion />
      </main>
      <Footer />
    </>
  );
}
