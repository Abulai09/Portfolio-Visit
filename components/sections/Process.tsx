import { site } from '@/config/site';
import { Section } from '@/components/ui/Section';
import { FeatureCards } from './FeatureCards';

export function Process() {
  const p = site.process;
  return (
    <Section id="process" title={p.title} subtitle={p.subtitle} tone="muted">
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {p.steps.map((step, i) => (
          <li key={step.title} className="reveal card flex items-center gap-5 p-6">
            <span
              className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-xl font-extrabold text-white"
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="font-bold text-ink">
                <span className="sr-only">Шаг {i + 1}. </span>
                {step.title}
              </h3>
              <p className="mt-0.5 text-sm font-semibold text-ink-soft">{step.duration}</p>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="reveal mt-16 text-2xl font-extrabold text-ink">{p.paymentTitle}</h3>
      <ol className="mt-6 grid gap-4 sm:grid-cols-3">
        {p.payments.map((pay) => (
          <li key={pay.percent + pay.text} className="reveal card p-6 text-center">
            <p className="text-5xl font-extrabold tracking-tight text-accent-ink">{pay.percent}</p>
            <p className="mt-2 text-ink-soft">{pay.text}</p>
          </li>
        ))}
      </ol>

      <h3 className="reveal mt-16 mb-6 text-2xl font-extrabold text-ink">{p.guaranteesTitle}</h3>
      <FeatureCards items={p.guarantees} columns={4} headingLevel="h4" />
    </Section>
  );
}
