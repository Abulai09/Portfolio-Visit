// Данные сайта, одинаковые для всех языков: контакты, цены, скриншоты работ.
// Тексты на каждом языке лежат в config/content/{ru,kk,en}.ts.
// Цену меняйте здесь — она сразу поменяется на всех языках.
// ВНИМАНИЕ: подтверждена только цена «Пробного» (250 000 ₸). Остальные цены черновые.

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
  | 'eye';

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
};

export const site = {
  brandName: 'ВАШ.МАГАЗИН',

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
    trial: { price: { amount: 250_000 } },
    start: { price: { amount: 350_000 } },
    business: { price: { amount: 650_000 }, popular: true },
    premium: { price: { amount: 1_200_000, from: true } },
  } satisfies Record<string, PackageData>,

  marketplacePrice: { amount: 2_500_000, from: true } satisfies Price,

  otherSites: {
    landing: { amount: 120_000, from: true },
    portfolio: { amount: 150_000, from: true },
    corporate: { amount: 300_000, from: true },
    booking: { amount: 350_000, from: true },
    webService: { amount: null },
  } satisfies Record<string, Price>,

  addons: {
    sales: {
      payments: { amount: 60_000 },
      loyalty: { amount: 90_000 },
      abandonedCarts: { amount: 45_000 },
      reviews: { amount: 35_000 },
    },
    integrations: {
      accounting: { amount: 150_000, from: true },
      delivery: { amount: 70_000 },
      telegramBot: { amount: 80_000 },
      crm: { amount: 90_000, from: true },
      kaspiFeed: { amount: 70_000 },
    },
    content: {
      multilingual: { amount: 60_000, unit: 'language' },
      blog: { amount: 40_000 },
      catalogFilling: { amount: 300, unit: 'item' },
      pwa: { amount: 150_000, from: true },
    },
    support: {
      techSupport: { amount: 30_000, unit: 'month' },
      changes: { amount: 8_000, unit: 'hour' },
    },
  } satisfies Record<string, Record<string, Price>>,

  portfolio: {
    luna: { name: 'LUNA', concept: true, image: { small: '/portfolio/luna-960.webp', large: '/portfolio/luna-1600.webp' } },
    bazar: { name: 'bazar.kz', concept: true, image: { small: '/portfolio/bazar-960.webp', large: '/portfolio/bazar-1600.webp' } },
    volt: { name: 'VOLT', concept: true, image: { small: '/portfolio/volt-960.webp', large: '/portfolio/volt-1600.webp' } },
    bloom: { name: 'bloom', concept: true, image: { small: '/portfolio/bloom-960.webp', large: '/portfolio/bloom-1600.webp' } },
    nordhaus: { name: 'Nordhaus', concept: true, image: { small: '/portfolio/nordhaus-960.webp', large: '/portfolio/nordhaus-1600.webp' } },
    lumiere: { name: 'Lumière', concept: true, image: { small: '/portfolio/lumiere-960.webp', large: '/portfolio/lumiere-1600.webp' } },
    dastarkhan: { name: 'dastarkhan', concept: true, image: { small: '/portfolio/dastarkhan-960.webp', large: '/portfolio/dastarkhan-1600.webp' } },
    qurylys: { name: 'Qurylys Group', concept: true, image: { small: '/portfolio/qurylys-960.webp', large: '/portfolio/qurylys-1600.webp' } },
    qahua: { name: 'Qahua', concept: true, image: { small: '/portfolio/qahua-960.webp', large: '/portfolio/qahua-1600.webp' } },
  } satisfies Record<string, PortfolioItem>,
};

export type PackageId = keyof typeof site.packages;
export type OtherSiteId = keyof typeof site.otherSites;
export type AddonGroupId = keyof typeof site.addons;
export type PortfolioId = keyof typeof site.portfolio;

/** Ключи объекта в порядке объявления, с точным типом (Object.keys возвращает string[]). */
export function keysOf<T extends object>(obj: T): (keyof T & string)[] {
  return Object.keys(obj) as (keyof T & string)[];
}
