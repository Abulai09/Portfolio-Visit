import { Clock } from 'lucide-react';
import type { Content } from '@/config/content';
import { keysOf, site, type PackageData } from '@/config/site';
import { formatPrice } from '@/lib/format';
import { Section } from '@/components/ui/Section';
import { WhatsAppButton } from '@/components/ui/Button';
import { CheckList } from '@/components/ui/CheckList';
import { tones, type Tone } from '@/components/ui/tones';

// Цвет = уровень пакета: от бирюзового «старта» к янтарному «золотому» Премиуму
const TIER_TONES: Tone[] = ['teal', 'violet', 'amber'];

export function Packages({ t }: { t: Content }) {
  const p = t.packages;
  // Цена и «популярный» — общие для всех языков, тексты — из словаря
  const items = keysOf(site.packages).map((id) => {
    const shared: PackageData = site.packages[id];
    return { id, ...shared, ...p.items[id] };
  });
  return (
    <Section id="packages" title={p.title} subtitle={p.subtitle}>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((pkg, i) => {
          const popular = pkg.popular === true;
          const tone = tones[TIER_TONES[i % TIER_TONES.length]];
          return (
            <li
              key={pkg.id}
              className={`reveal card relative flex flex-col p-6 sm:p-7 ${
                popular ? 'border-2 border-accent-ink shadow-xl shadow-accent/15 lg:-my-3 lg:py-10' : ''
              }`}
            >
              <span aria-hidden="true" className={`absolute inset-x-6 top-0 h-1.5 rounded-b-full ${tone.solid}`} />
              {popular && (
                <span className="absolute -top-3.5 left-6 z-10 rounded-full bg-coral px-3.5 py-1 text-xs font-extrabold tracking-wider text-night">
                  {p.popularBadge}
                </span>
              )}
              <h3 className={`text-2xl font-extrabold ${tone.text}`}>{pkg.name}</h3>
              <p className="mt-2 min-h-12 text-[15px] text-ink-soft">{pkg.audience}</p>

              <p className="mt-5 text-3xl font-extrabold tracking-tight text-ink">{formatPrice(pkg.price, t.price)}</p>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft">
                <Clock className="size-4" aria-hidden="true" />
                {t.ui.duration}: {pkg.duration}
              </p>

              <div className="mt-6 flex-1 border-t border-line pt-6 text-[15px] text-ink">
                {pkg.includesPrevious && (
                  <p className="mb-3 font-bold text-accent-ink">{pkg.includesPrevious}</p>
                )}
                <CheckList items={pkg.features} tone={TIER_TONES[i % TIER_TONES.length]} />
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
