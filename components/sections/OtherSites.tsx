import { Clock } from 'lucide-react';
import { site } from '@/config/site';
import { formatPrice } from '@/lib/format';
import { Section } from '@/components/ui/Section';
import { WhatsAppButton } from '@/components/ui/Button';

export function OtherSites() {
  const o = site.otherSites;
  return (
    <Section id="other-sites" title={o.title} subtitle={o.subtitle} surface="warm">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {o.items.map((item) => (
          <li key={item.name} className="reveal card flex flex-col p-6">
            <h3 className="text-lg font-bold text-ink">{item.name}</h3>
            <p className="mt-2 flex-1 text-ink-soft">{item.text}</p>
            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <p className="text-2xl font-extrabold tracking-tight text-ink">{formatPrice(item.price)}</p>
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft">
                <Clock className="size-4" aria-hidden="true" />
                {item.duration}
              </p>
            </div>
            <WhatsAppButton message={o.ctaMessage(item.name)} variant="secondary" className="mt-5 w-full">
              {o.ctaLabel}
            </WhatsAppButton>
          </li>
        ))}

        <li className="reveal flex flex-col justify-center rounded-3xl border-2 border-dashed border-accent/30 p-6">
          <p className="text-lg font-bold text-ink">{o.footnote}</p>
          <WhatsAppButton message={o.footnoteCta.message} className="mt-5 w-full">
            {o.footnoteCta.label}
          </WhatsAppButton>
        </li>
      </ul>
    </Section>
  );
}
