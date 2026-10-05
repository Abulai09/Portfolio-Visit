import { ChevronDown } from 'lucide-react';
import { site } from '@/config/site';
import { Section } from '@/components/ui/Section';

// Аккордеон на нативных <details>/<summary>: работает без JS и доступен с клавиатуры.
export function Faq() {
  const f = site.faq;
  return (
    <Section id="faq" title={f.title}>
      <div className="mx-auto max-w-3xl space-y-3">
        {f.items.map((item) => (
          <details key={item.q} className="reveal card">
            <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-3xl px-6 py-4 text-lg font-bold text-ink hover:text-accent-ink focus-visible:outline-offset-[-3px]">
              {item.q}
              <ChevronDown
                className="faq-chevron size-5 shrink-0 text-accent-ink transition-transform duration-200"
                aria-hidden="true"
              />
            </summary>
            <p className="px-6 pb-5 leading-relaxed text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
