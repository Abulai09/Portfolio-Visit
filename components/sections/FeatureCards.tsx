import type { IconName } from '@/config/site';
import { IconBadge } from '@/components/ui/Icon';
import { toneAt } from '@/components/ui/tones';

/** Сетка карточек «иконка + заголовок + текст» — для «Почему свой магазин» и гарантий. */
export function FeatureCards({
  items,
  columns = 3,
  headingLevel: Heading = 'h3',
}: {
  items: { icon: IconName; title: string; text: string }[];
  columns?: 3 | 4;
  headingLevel?: 'h3' | 'h4';
}) {
  const grid = columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3';
  return (
    <ul className={`grid gap-4 sm:gap-5 ${grid}`}>
      {items.map((item, i) => (
        <li key={item.title} className="reveal card p-6 sm:p-7">
          <IconBadge name={item.icon} tone={toneAt(i)} />
          <Heading className="mt-5 text-lg font-bold text-ink">{item.title}</Heading>
          <p className="mt-2 leading-relaxed text-ink-soft">{item.text}</p>
        </li>
      ))}
    </ul>
  );
}
