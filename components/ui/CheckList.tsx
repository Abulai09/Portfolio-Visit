import { Check } from 'lucide-react';
import { tones, type Tone } from './tones';

export function CheckList({
  items,
  tone = 'coral',
  inverted = false,
}: {
  items: string[];
  tone?: Tone;
  /** Для тёмных секций (night) */
  inverted?: boolean;
}) {
  const iconBox = inverted ? 'bg-coral/20 text-coral-light' : tones[tone].badge;
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
