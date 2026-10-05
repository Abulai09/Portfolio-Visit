import { site } from '@/config/site';
import { Section } from '@/components/ui/Section';
import { FeatureCards } from './FeatureCards';

export function WhyOwnStore() {
  const { title, subtitle, items } = site.whyOwnStore;
  return (
    <Section id="why" title={title} subtitle={subtitle} surface="muted">
      <FeatureCards items={items} />
    </Section>
  );
}
