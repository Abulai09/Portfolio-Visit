import { Clock } from 'lucide-react';
import { site, type Package } from '@/config/site';
import { formatPrice } from '@/lib/format';
import { Section } from '@/components/ui/Section';
import { WhatsAppButton } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/CheckList';

export function Packages() {
  const p = site.packages;
  // Явный тип: у литералов из конфига нет необязательных полей, а у Package — есть
  const items: readonly Package[] = p.items;
  return (
    <Section id="packages" title={p.title} subtitle={p.subtitle}>
      <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {items.map((pkg) => {
          const popular = pkg.popular === true;
          return (
            <li
              key={pkg.id}
              className={`reveal card relative flex flex-col p-6 sm:p-7 ${
                popular ? 'border-2 border-accent-ink shadow-xl shadow-accent/15 xl:-my-3 xl:py-10' : ''
              }`}
            >
              {popular && (
                <span className="absolute -top-3.5 left-6 rounded-full bg-coral px-3.5 py-1 text-xs font-extrabold tracking-wider text-night">
                  {p.popularBadge}
                </span>
              )}
              <h3 className="text-2xl font-extrabold text-ink">{pkg.name}</h3>
              <p className="mt-2 min-h-12 text-[15px] text-ink-soft">{pkg.audience}</p>

              <p className="mt-5 text-3xl font-extrabold tracking-tight text-ink">{formatPrice(pkg.price)}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft">
                <Clock className="size-4" aria-hidden="true" />
                {p.durationLabel}: {pkg.duration}
              </p>

              <div className="mt-6 flex-1 border-t border-line pt-6 text-[15px] text-ink">
                {pkg.includesPrevious && (
                  <p className="mb-3 font-bold text-accent-ink">{pkg.includesPrevious}</p>
                )}
                <CheckList items={pkg.features} />
              </div>

              <WhatsAppButton
                message={p.ctaMessage(pkg.name)}
                variant={popular ? 'primary' : 'secondary'}
                className="mt-7 w-full"
              >
                {p.ctaLabel(pkg.name)}
              </WhatsAppButton>
            </li>
          );
        })}
      </ul>

      <ul className="reveal mt-10 grid gap-2 text-sm text-ink-soft sm:grid-cols-2">
        {p.notes.map((note) => (
          <li key={note} className="flex gap-2">
            <span aria-hidden="true">*</span>
            {note}
          </li>
        ))}
      </ul>
    </Section>
  );
}
