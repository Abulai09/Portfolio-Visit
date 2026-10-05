import { site } from '@/config/site';
import { formatPrice } from '@/lib/format';
import { Section } from '@/components/ui/Section';

// Список «название — цена» вместо <table>: на узком экране строка переносится,
// а горизонтального скролла нет.
export function Addons() {
  const a = site.addons;
  return (
    <Section id="addons" title={a.title} subtitle={a.subtitle}>
      <div className="grid gap-5 lg:grid-cols-2">
        {a.groups.map((group) => (
          <div key={group.title} className="reveal card p-6 sm:p-7">
            <h3 className="text-lg font-extrabold text-accent-ink">{group.title}</h3>
            <dl className="mt-4 divide-y divide-line">
              {group.items.map((item) => (
                <div key={item.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5">
                  <dt className="text-ink">{item.name}</dt>
                  <dd className="font-bold whitespace-nowrap text-ink">{formatPrice(item.price)}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Section>
  );
}
