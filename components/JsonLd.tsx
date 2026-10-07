import type { Content } from '@/config/content';
import { localePath, type Locale } from '@/config/i18n';
import { keysOf, site, type Price } from '@/config/site';

// Разметка schema.org Service/Offer для поисковиков. Строится из того же конфига,
// поэтому цены в разметке всегда совпадают с ценами на странице.

export function JsonLd({ t, locale }: { t: Content; locale: Locale }) {
  const url = new URL(localePath(locale), site.siteUrl).href;

  function offer(name: string, price: Price, description?: string) {
    const base = { '@type': 'Offer', name, description, priceCurrency: 'KZT', url };
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

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t.fullTitle,
    serviceType: t.ui.serviceType,
    description: t.seo.description,
    url,
    inLanguage: locale,
    areaServed: { '@type': 'Country', name: t.ui.country },
    provider: {
      '@type': 'Person',
      name: site.brandName,
      email: site.contacts.email,
      telephone: `+${site.contacts.whatsappPhone}`,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.ui.offerCatalog,
      itemListElement: [
        ...keysOf(site.packages).map((id) => {
          const pkg = t.packages.items[id];
          return offer(t.ui.offerPackage(pkg.name), site.packages[id].price, pkg.audience);
        }),
        offer(t.marketplace.name, site.marketplacePrice, t.marketplace.text),
        offer(t.automation.package.name, site.webAppPrice, t.automation.package.audience),
        ...keysOf(site.automation).map((id) => {
          const item = t.automation.items[id];
          return offer(item.name, { amount: null }, item.text);
        }),
        ...keysOf(site.otherSites).map((id) => {
          const item = t.otherSites.items[id];
          return offer(item.name, site.otherSites[id], item.text);
        }),
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
