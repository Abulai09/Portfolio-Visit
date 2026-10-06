import type { Content } from '@/config/content';
import { keysOf, site, type Price } from '@/config/site';
import { formatPrice } from '@/lib/format';
import { Section } from '@/components/ui/Section';
import { tones, toneAt } from '@/components/ui/tones';

// Список «название — цена» вместо <table>: на узком экране строка переносится,
// а горизонтального скролла нет.
export function Addons({ t }: { t: Content }) {
  const a = t.addons;
  // Группы и цены — из config/site.ts, названия — из словаря
  const groups = keysOf(site.addons).map((groupId) => {
    const prices: Record<string, Price> = site.addons[groupId];
    const names: Record<string, string> = a.groups[groupId].items;
    return {
      id: groupId,
      title: a.groups[groupId].title,
      items: keysOf(prices).map((id) => ({ id, name: names[id], price: prices[id] })),
    };
  });

  return (
    <Section id="addons" title={a.title} subtitle={a.subtitle}>
      <div className="grid gap-5 lg:grid-cols-2">
        {groups.map((group, i) => (
          <div key={group.id} className="reveal card p-6 sm:p-7">
            <h3 className={`text-lg font-extrabold ${tones[toneAt(i)].text}`}>{group.title}</h3>
            <dl className="mt-4 divide-y divide-line">
              {group.items.map((item) => (
                <div key={item.id} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5">
                  <dt className="text-ink">{item.name}</dt>
                  <dd className="font-bold whitespace-nowrap text-ink">{formatPrice(item.price, t.price)}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Section>
  );
}
