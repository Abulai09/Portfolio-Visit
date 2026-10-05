import { site, type PortfolioItem } from '@/config/site';
import { waLink } from '@/lib/links';
import { PortfolioCarousel, type PortfolioSlide } from './PortfolioCarousel';

export function Portfolio() {
  const p = site.portfolio;
  const items: readonly PortfolioItem[] = p.items;

  // Ссылки на WhatsApp собираем на сервере: функции из конфига нельзя передать в клиентский компонент
  const slides: PortfolioSlide[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    kind: item.kind,
    text: item.text,
    concept: item.concept,
    small: item.image.small,
    large: item.image.large,
    ctaHref: waLink(p.ctaMessage(item.name, item.kind)),
  }));

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      aria-roledescription="карусель"
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

      <PortfolioCarousel slides={slides} conceptLabel={p.conceptLabel} ctaLabel={p.ctaLabel} />
    </section>
  );
}
