import { Clock } from 'lucide-react';
import { site } from '@/config/site';
import { formatPrice } from '@/lib/format';
import { WhatsAppButton } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/CheckList';

export function Marketplace() {
  const m = site.marketplace;
  return (
    <section id="marketplace" aria-labelledby="marketplace-title" className="scroll-mt-20 py-16 sm:py-24">
      <div className="container-page">
        <div className="reveal surface-dark relative overflow-hidden rounded-[2rem] bg-night px-6 py-10 text-white shadow-2xl shadow-accent/30 sm:px-10 sm:py-14 lg:px-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(36rem_22rem_at_100%_0%,rgb(255_90_60/0.28),transparent_70%)]"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <div className="flex flex-col">
              <p className="font-bold text-coral-light">{m.eyebrow}</p>
              <h2 id="marketplace-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {m.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/85">{m.text}</p>

              <div className="mt-8 rounded-2xl bg-white/10 p-6 ring-1 ring-white/20">
                <p className="text-lg font-bold">{m.name}</p>
                <p className="mt-1 text-4xl font-extrabold tracking-tight text-coral-light">{formatPrice(m.price)}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-white/80">
                  <Clock className="size-4" aria-hidden="true" />
                  Срок: {m.duration}
                </p>
              </div>

              <WhatsAppButton
                message={m.cta.message}
                size="lg"
                className="mt-8 lg:mt-auto lg:self-start"
              >
                {m.cta.label}
              </WhatsAppButton>
            </div>

            <div className="text-[15px] sm:text-base">
              <p className="mb-5 font-bold text-white/90">Что входит:</p>
              <CheckList items={m.features} inverted />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
