
import Image from 'next/image';

const logos = [
  { name: 'Amazon', src: 'https://placehold.co/120x40.png/9CA3AF/E5E7EB?text=Amazon', hint: 'Amazon logo' },
  { name: 'DoorDash', src: 'https://placehold.co/120x40.png/9CA3AF/E5E7EB?text=DoorDash', hint: 'DoorDash logo' },
  { name: 'Temu', src: 'https://placehold.co/120x40.png/9CA3AF/E5E7EB?text=Temu', hint: 'Temu logo' },
  { name: 'Meta', src: 'https://placehold.co/120x40.png/9CA3AF/E5E7EB?text=Meta', hint: 'Meta logo' },
  { name: 'ByteDance', src: 'https://placehold.co/120x40.png/9CA3AF/E5E7EB?text=ByteDance', hint: 'ByteDance logo' },
];

export function SocialProof() {
  return (
    <section className="py-12 md:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h3 className="mb-8 text-center font-headline text-xl font-semibold text-foreground/60">
          Trusted by merchants from leading platforms
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo) => (
            <Image
              key={logo.name}
              src={logo.src}
              alt={`${logo.name} logo`}
              width={120}
              height={40}
              className="opacity-70 grayscale filter transition hover:opacity-100 hover:grayscale-0"
              data-ai-hint={logo.hint}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
