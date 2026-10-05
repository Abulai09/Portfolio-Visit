import { ArrowRight, Check } from 'lucide-react';
import { site } from '@/config/site';
import { WhatsAppButton, buttonClass } from '@/components/ui/Button';
import { IconBadge } from '@/components/ui/Icon';
import { HeroShowcase } from './HeroShowcase';
import { tones, type Tone } from '@/components/ui/tones';

const STAT_TONES: Tone[] = ['coral', 'violet', 'teal'];
const DIRECTION_TONES: Tone[] = ['violet', 'coral', 'teal'];

export function Hero() {
  const { hero, directions } = site;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="aurora pointer-events-none absolute inset-0" />
      <div className="relative container-page pt-12 pb-16 sm:pt-16 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div className="max-w-3xl">
            <h1
              id="hero-title"
              className="text-[2.25rem] leading-[1.1] font-extrabold tracking-tight text-balance text-ink sm:text-5xl xl:text-[3.5rem]"
            >
              {hero.title}
            </h1>
            <p className="mt-4 text-lg font-semibold text-accent-ink sm:text-xl">{hero.alsoLine}</p>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft sm:text-xl">{hero.subtitle}</p>

            {/* Кнопки идут сразу после текста: на телефоне 360px они должны попасть в первый экран */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>a]:sm:whitespace-nowrap">
              <WhatsAppButton message={hero.primaryCta.message} size="lg">
                {hero.primaryCta.label}
              </WhatsAppButton>
              <a href={hero.secondaryCta.href} className={buttonClass('secondary', 'lg')}>
                {hero.secondaryCta.label}
              </a>
            </div>

            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Что вы получаете">
              {hero.badges.map((badge) => (
                <li
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-1.5 text-sm font-semibold text-ink ring-1 ring-line"
                >
                  <Check className="size-4 text-coral-ink" aria-hidden="true" strokeWidth={2.5} />
                  {badge}
                </li>
              ))}
            </ul>
          </div>
          <HeroShowcase />
        </div>

        <dl className="mt-12 grid gap-4 sm:grid-cols-3">
          {hero.stats.map((stat, i) => (
            <div key={stat.label} className="card flex flex-col-reverse px-6 py-5">
              <dt className="mt-1 text-[15px] text-ink-soft">{stat.label}</dt>
              <dd className={`text-3xl font-extrabold tracking-tight ${tones[STAT_TONES[i % STAT_TONES.length]].text}`}>
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {directions.map((d, i) => (
            <li key={d.href}>
              <a
                href={d.href}
                className={`group card flex h-full flex-col p-6 transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-accent-ink sm:p-7 ${
                  d.main ? 'ring-1 ring-accent/15' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <IconBadge name={d.icon} size="lg" tone={DIRECTION_TONES[i % DIRECTION_TONES.length]} />
                  {d.main && (
                    <span className="rounded-full bg-coral-soft px-3 py-1 text-xs font-bold text-coral-ink">
                      Основное
                    </span>
                  )}
                </div>
                <h2 className="mt-5 text-xl font-extrabold text-ink">{d.title}</h2>
                <p className="mt-2 flex-1 text-ink-soft">{d.text}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 font-semibold text-accent-ink">
                  {d.linkLabel}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
