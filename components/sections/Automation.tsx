import { Clock } from 'lucide-react';
import type { Content } from '@/config/content';
import { keysOf, site } from '@/config/site';
import { formatPrice } from '@/lib/format';
import { Section } from '@/components/ui/Section';
import { WhatsAppButton } from '@/components/ui/Button';
import { IconBadge } from '@/components/ui/Icon';
import { CheckList } from '@/components/ui/CheckList';
import { toneAt } from '@/components/ui/tones';

/**
 * Приложения и автоматизация. Сверху — отдельный пакет «Веб-приложение под ключ» с ценой «от»,
 * ниже — отдельные услуги без цен: их стоимость зависит от процессов клиента (подпись note).
 */
export function Automation({ t }: { t: Content }) {
  const a = t.automation;
  const pkg = a.package;
  return (
    <Section id="automation" title={a.title} subtitle={a.subtitle} surface="cool">
      <article className="reveal card relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12 lg:p-10">
        <span aria-hidden="true" className="absolute inset-x-6 top-0 h-1.5 rounded-b-full bg-accent sm:inset-x-8" />
        <div className="flex flex-col">
          <span className="self-start rounded-full bg-coral-soft px-3 py-1 text-xs font-bold text-coral-ink">
            {pkg.badge}
          </span>
          <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{pkg.name}</h3>
          <p className="mt-3 text-ink-soft">{pkg.audience}</p>
          <p className="mt-6 text-4xl font-extrabold tracking-tight text-ink">{formatPrice(site.webAppPrice, t.price)}</p>
          <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft">
            <Clock className="size-4" aria-hidden="true" />
            {t.ui.duration}: {pkg.duration}
          </p>
          <WhatsAppButton message={pkg.cta.message} size="lg" className="mt-8 lg:mt-auto lg:self-start">
            {pkg.cta.label}
          </WhatsAppButton>
        </div>

        <div className="grid gap-8 text-[15px] sm:grid-cols-2 lg:gap-10">
          <div>
            <p className="mb-4 font-bold text-ink">{t.ui.included}</p>
            <CheckList items={pkg.features} tone="violet" />
          </div>
          <div>
            <p className="mb-4 font-bold text-ink">{pkg.examplesTitle}</p>
            <ul className="space-y-2.5">
              {pkg.examples.map((example) => (
                <li key={example} className="rounded-xl bg-surface-cool px-4 py-3 text-ink">
                  {example}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>

      <h3 className="reveal mt-14 mb-6 text-2xl font-extrabold tracking-tight text-ink">{a.servicesTitle}</h3>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {keysOf(site.automation).map((id, i) => {
          const item = a.items[id];
          const tone = toneAt(i);
          return (
            <li key={id} className="reveal card flex flex-col p-6 sm:p-7">
              <IconBadge name={site.automation[id].icon} tone={tone} />
              <h4 className="mt-5 text-lg font-bold text-ink">{item.name}</h4>
              <p className="mt-2 text-ink-soft">{item.text}</p>
              <div className="mt-5 flex-1 text-[15px] text-ink">
                <CheckList items={item.examples} tone={tone} />
              </div>
              <WhatsAppButton message={a.ctaMessage(item.name)} variant="secondary" className="mt-6 w-full">
                {a.ctaLabel}
              </WhatsAppButton>
            </li>
          );
        })}

        <li className="reveal flex flex-col justify-center rounded-3xl border-2 border-dashed border-accent/30 p-6 sm:p-7">
          <p className="text-lg font-bold text-ink">{a.footnote}</p>
          <p className="mt-2 text-ink-soft">{a.note}</p>
          <WhatsAppButton message={a.footnoteCta.message} className="mt-5 w-full">
            {a.footnoteCta.label}
          </WhatsAppButton>
        </li>
      </ul>
    </Section>
  );
}
