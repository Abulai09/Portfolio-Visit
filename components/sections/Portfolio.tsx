import type { Content } from '@/config/content';
import { defaultLocale, type Locale } from '@/config/i18n';
import { keysOf, site, type PortfolioItem } from '@/config/site';
import { PortfolioCarousel, type PortfolioSlide } from './PortfolioCarousel';

export function Portfolio({ t, locale }: { t: Content; locale: Locale }) {
  const p = t.portfolio;

  // Подписи и ссылки собираем на сервере: функции из словаря нельзя передать в клиентский компонент
  const ids = keysOf(site.portfolio);
  const slides: PortfolioSlide[] = ids.map((id, i) => {
    const item: PortfolioItem = site.portfolio[id];
    const { name, concept, image, demo } = item;
    const { kind, text } = p.items[id];
    return {
      id,
      name,
      kind,
      text,
      concept,
      small: image.small,
      large: image.large,
      alt: t.ui.slideAlt(name, kind),
      label: t.ui.slideLabel(i + 1, ids.length, name),
      dotLabel: t.ui.showSlide(i + 1, name),
      // Язык передаём демо, чтобы плашка «это демо» и ссылка назад были на том же языке
      demoHref: demo && (locale === defaultLocale ? demo : `${demo}?lang=${locale}`),
      demoAria: p.demoAria(name),
    };
  });

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      aria-roledescription={t.ui.carousel}
      className="surface-dark scroll-mt-16 overflow-hidden bg-night py-16 sm:py-24"
    >
      <div className="container-page">
        <header className="reveal mb-10 max-w-2xl sm:mb-14">
          <h2 id="portfolio-title" className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {p.title}
          </h2>
          <p className="mt-4 text-lg text-white/75">{p.subtitle}</p>
        </header>
      </div>

      <PortfolioCarousel
        slides={slides}
        conceptLabel={p.conceptLabel}
        demoLabel={p.demoLabel}
        labels={{ slide: t.ui.slide, prev: t.ui.prevSlide, next: t.ui.nextSlide }}
      />
    </section>
  );
}
