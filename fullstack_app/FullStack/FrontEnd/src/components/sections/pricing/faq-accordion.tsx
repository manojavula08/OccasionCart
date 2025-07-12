import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Can I change my plan later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be prorated.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Our Starter plan is completely free and allows you to explore core features. For Growth and Pro plans, we offer a 7-day money-back guarantee.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express) via Stripe. For annual Pro plans, we can also support bank transfers.',
  },
  {
    question: 'How does the AI Trend Score work?',
    answer: 'Our AI analyzes multiple data points from social media ads, including engagement, velocity, and creative elements, to predict a product\'s potential to trend. This score helps you identify high-potential products early.',
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer: 'Yes, you can cancel your subscription at any time. If you cancel, you will retain access to your plan\'s features until the end of your current billing cycle.',
  },
];

export function FaqAccordion() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-foreground/80">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
