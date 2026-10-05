import { site, type Price } from '@/config/site';

// Разметка schema.org Service/Offer для поисковиков. Строится из того же config/site.ts,
// поэтому цены в разметке всегда совпадают с ценами на странице.

function offer(name: string, price: Price, description?: string) {
  const base = { '@type': 'Offer', name, description, priceCurrency: 'KZT', url: site.siteUrl };
  if (price.amount === null) return base;
  if (price.from) {
    return {
      ...base,
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'KZT',
        minPrice: price.amount,
      },
    };
  }
  return { ...base, price: price.amount };
}

export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: site.brand.fullTitle,
    serviceType: 'Разработка сайтов под ключ',
    description: site.seo.description,
    url: site.siteUrl,
    areaServed: { '@type': 'Country', name: 'Казахстан' },
    provider: {
      '@type': 'Person',
      name: site.brand.name,
      email: site.contacts.email,
      telephone: `+${site.contacts.whatsappPhone}`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Пакеты и типы сайтов',
      itemListElement: [
        ...site.packages.items.map((p) => offer(`Интернет-магазин «${p.name}»`, p.price, p.audience)),
        offer(site.marketplace.name, site.marketplace.price, site.marketplace.text),
        ...site.otherSites.items.map((s) => offer(s.name, s.price, s.text)),
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      // Экранируем `<`, чтобы строка не могла закрыть тег <script>
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
