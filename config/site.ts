// Данные сайта, одинаковые для всех языков: контакты, цены, скриншоты работ.
// Тексты на каждом языке лежат в config/content/{ru,kk,en}.ts.
// Цену меняйте здесь — она сразу поменяется на всех языках.
// Цены пакетов, маркетплейса, веб-приложения, сайтов и большинства доп. функций задал владелец 07.10.2026.
// Черновые (не подтверждены): «Премиум», лояльность, брошенные корзины, отзывы, доставка, CRM-интеграция,
// выгрузка на Kaspi и тарифы поддержки.

export type IconName =
  | 'store'
  | 'marketplace'
  | 'layout'
  | 'wallet'
  | 'users'
  | 'zap'
  | 'smartphone'
  | 'settings'
  | 'search'
  | 'file-signature'
  | 'badge-check'
  | 'calendar-check'
  | 'eye'
  | 'workflow'
  | 'bot'
  | 'plug'
  | 'sparkles';

/** Единица после цены. Подпись на каждом языке — в `price.units` словаря. */
export type PriceUnit = 'month' | 'hour' | 'item' | 'language';

export type Price = {
  /** Сумма в тенге. `null` — цена по ТЗ (подпись `price.onRequest` из словаря). */
  amount: number | null;
  /** Показывать «от» перед ценой. */
  from?: boolean;
  unit?: PriceUnit;
};

export type PackageData = { price: Price; popular?: boolean };

export type PortfolioItem = {
  /** Название бренда — не переводится. */
  name: string;
  /** true — концепт дизайна, а не выполненный заказ. На слайде появится пометка. */
  concept: boolean;
  /** Скриншоты 16:10 (1440×900 @1x/@2x) из public/. Нужны оба размера. */
  image: { small: string; large: string };
  /** Одностраничное демо из public/demos/ — тогда в карусели появится «Открыть демо». */
  demo?: `/demos/${string}.html`;
};

export const site = {
  brandName: 'Rakhat dev',

  // Адрес сайта после деплоя — нужен для SEO (sitemap, Open Graph, канонический URL).
  siteUrl: 'https://example.kz',

  contacts: {
    whatsappPhone: '77086823182', // только цифры, без +
    email: 'rakhatulyabylai@gmail.com',
    telegram: 'Abo_2399', // username без @
    portfolioUrl: '#portfolio', // якорь на блок «Примеры сайтов» или внешняя ссылка https://…
  },

  // Порядок ключей = порядок карточек на странице
  packages: {
    start: { price: { amount: 390_000 } },
    business: { price: { amount: 650_000 }, popular: true },
    premium: { price: { amount: 1_200_000, from: true } },
  } satisfies Record<string, PackageData>,

  marketplacePrice: { amount: 3_000_000, from: true } satisfies Price,

  /** Пакет «Веб-приложение и автоматизация под ключ» (карточка в блоке «Приложения и автоматизация»). */
  webAppPrice: { amount: 500_000, from: true } satisfies Price,

  otherSites: {
    booking: { amount: 350_000, from: true },
    landing: { amount: 150_000, from: true },
    portfolio: { amount: 150_000, from: true },
    corporate: { amount: 300_000, from: true },
    crm: { amount: 900_000, from: true },
    cabinet: { amount: 200_000, from: true },
    dashboard: { amount: 300_000, from: true },
    webService: { amount: 2_000_000, from: true },
  } satisfies Record<string, Price>,

  // Приложения и автоматизация: без цены на карточке — стоимость считается после разбора задачи.
  // Порядок ключей = порядок карточек.
  automation: {
    crm: { icon: 'workflow' },
    mobileApp: { icon: 'smartphone' },
    bots: { icon: 'bot' },
    integrations: { icon: 'plug' },
    ai: { icon: 'sparkles' },
  } satisfies Record<string, { icon: IconName }>,

  addons: {
    sales: {
      payments: { amount: 100_000 },
      loyalty: { amount: 90_000 },
      abandonedCarts: { amount: 45_000 },
      reviews: { amount: 35_000 },
    },
    integrations: {
      accounting: { amount: 300_000, from: true },
      delivery: { amount: 70_000 },
      telegramBot: { amount: 100_000 },
      crm: { amount: 90_000, from: true },
      kaspiFeed: { amount: 70_000 },
      aiAssistant: { amount: 200_000 },
    },
    content: {
      multilingual: { amount: 60_000, unit: 'language' },
      blog: { amount: 55_000 },
      catalogFilling: { amount: 700, unit: 'item' },
      pwa: { amount: 150_000, from: true },
    },
    support: {
      techSupport: { amount: 30_000, unit: 'month' },
      changes: { amount: 8_000, unit: 'hour' },
    },
  } satisfies Record<string, Record<string, Price>>,

  portfolio: {
    luna: {
      name: 'LUNA',
      concept: true,
      image: { small: '/portfolio/luna-960.webp', large: '/portfolio/luna-1600.webp' },
      demo: '/demos/luna.html',
    },
    bazar: {
      name: 'bazar.kz',
      concept: true,
      image: { small: '/portfolio/bazar-960.webp', large: '/portfolio/bazar-1600.webp' },
      demo: '/demos/bazar.html',
    },
    volt: {
      name: 'VOLT',
      concept: true,
      image: { small: '/portfolio/volt-960.webp', large: '/portfolio/volt-1600.webp' },
      demo: '/demos/volt.html',
    },
    bloom: {
      name: 'bloom',
      concept: true,
      image: { small: '/portfolio/bloom-960.webp', large: '/portfolio/bloom-1600.webp' },
      demo: '/demos/bloom.html',
    },
    nordhaus: {
      name: 'Nordhaus',
      concept: true,
      image: { small: '/portfolio/nordhaus-960.webp', large: '/portfolio/nordhaus-1600.webp' },
      demo: '/demos/nordhaus.html',
    },
    lumiere: {
      name: 'Lumière',
      concept: true,
      image: { small: '/portfolio/lumiere-960.webp', large: '/portfolio/lumiere-1600.webp' },
      demo: '/demos/lumiere.html',
    },
    dastarkhan: {
      name: 'dastarkhan',
      concept: true,
      image: { small: '/portfolio/dastarkhan-960.webp', large: '/portfolio/dastarkhan-1600.webp' },
      demo: '/demos/dastarkhan.html',
    },
    qurylys: {
      name: 'Qurylys Group',
      concept: true,
      image: { small: '/portfolio/qurylys-960.webp', large: '/portfolio/qurylys-1600.webp' },
      demo: '/demos/qurylys.html',
    },
    qahua: {
      name: 'Qahua',
      concept: true,
      image: { small: '/portfolio/qahua-960.webp', large: '/portfolio/qahua-1600.webp' },
      demo: '/demos/qahua.html',
    },
  } satisfies Record<string, PortfolioItem>,
};

export type PackageId = keyof typeof site.packages;
export type OtherSiteId = keyof typeof site.otherSites;
export type AutomationId = keyof typeof site.automation;
export type AddonGroupId = keyof typeof site.addons;
export type PortfolioId = keyof typeof site.portfolio;

/** Ключи объекта в порядке объявления, с точным типом (Object.keys возвращает string[]). */
export function keysOf<T extends object>(obj: T): (keyof T & string)[] {
  return Object.keys(obj) as (keyof T & string)[];
}
