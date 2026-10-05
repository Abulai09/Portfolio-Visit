import { Check } from 'lucide-react';

export function CheckList({ items, tone = 'default' }: { items: string[]; tone?: 'default' | 'inverted' }) {
  const iconBox = tone === 'inverted' ? 'bg-coral/20 text-coral-light' : 'bg-coral-soft text-coral-ink';
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className={`mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full ${iconBox}`}
            aria-hidden="true"
          >
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
