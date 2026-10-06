import type { Content } from '@/config/content';
import { Section } from '@/components/ui/Section';
import { FeatureCards } from './FeatureCards';

export function WhyOwnStore({ t }: { t: Content }) {
  const { title, subtitle, items } = t.whyOwnStore;
  return (
    <Section id="why" title={title} subtitle={subtitle} surface="muted">
      <FeatureCards items={items} />
    </Section>
  );
}
