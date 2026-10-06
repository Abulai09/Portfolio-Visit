import type { AddonGroupId, IconName, OtherSiteId, PackageId, PortfolioId, PriceUnit, site } from '@/config/site';

// Форма словаря одного языка. Ключи пакетов, работ и доп. функций берутся из config/site.ts,
// поэтому если добавить пакет туда и забыть перевести — сборка упадёт с ошибкой типа.

type Cta = { label: string; message: string };
type Feature = { icon: IconName; title: string; text: string };

export type Content = {
  /** Подпись бренда рядом с названием */
  tagline: string;
  fullTitle: string;

  seo: {
    title: string;
    description: string;
    ogTitle: string;
    /** Без ₸: этого знака нет в шрифте OG-картинки */
    ogSubtitle: string;
  };

  price: {
    /** «от 250 000 ₸» / «250 000 ₸-ден бастап» — порядок слов зависит от языка */
    from: (amount: string) => string;
    onRequest: string;
    units: Record<PriceUnit, string>;
  };

  ui: {
    skipLink: string;
    mainNav: string;
    mobileNav: string;
    footerNav: string;
    openMenu: string;
    closeMenu: string;
    themeToggle: string;
    themeToggleTitle: string;
    languageSwitcher: string;
    duration: string;
    included: string;
    mainBadge: string;
    heroBadgesLabel: string;
    step: (n: number) => string;
    carousel: string;
    slide: string;
    slideLabel: (n: number, total: number, name: string) => string;
    slideAlt: (name: string, kind: string) => string;
    showSlide: (n: number, name: string) => string;
    prevSlide: string;
    nextSlide: string;
    serviceType: string;
    country: string;
    offerCatalog: string;
    offerPackage: (name: string) => string;
  };

  nav: { label: string; href: string }[];

  /** shortLabel — в шапке рядом с иконкой WhatsApp; label — в мобильном меню */
  headerCta: Cta & { shortLabel: string };
  floatingCta: { ariaLabel: string; message: string };

  hero: {
    title: string;
    alsoLine: string;
    subtitle: string;
    badges: string[];
    stats: { value: string; label: string }[];
    primaryCta: Cta;
    secondaryCta: { label: string; href: string };
    showcase: { launched: string; orderTitle: string; orderText: string };
  };

  directions: { icon: IconName; title: string; text: string; href: string; linkLabel: string; main: boolean }[];

  portfolio: {
    title: string;
    subtitle: string;
    conceptLabel: string;
    demoLabel: string;
    /** Подпись ссылки-скриншота для скринридера */
    demoAria: (name: string) => string;
    items: Record<PortfolioId, { kind: string; text: string }>;
  };

  whyOwnStore: { title: string; subtitle: string; items: Feature[] };

  packages: {
    title: string;
    subtitle: string;
    popularBadge: string;
    ctaLabel: (name: string) => string;
    ctaMessage: (name: string) => string;
    items: Record<
      PackageId,
      { name: string; audience: string; duration: string; includesPrevious?: string; features: string[] }
    >;
    notes: string[];
  };

  marketplace: {
    eyebrow: string;
    title: string;
    text: string;
    name: string;
    duration: string;
    features: string[];
    cta: Cta;
  };

  otherSites: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaMessage: (name: string) => string;
    items: Record<OtherSiteId, { name: string; text: string; duration: string }>;
    footnote: string;
    footnoteCta: Cta;
  };

  addons: {
    title: string;
    subtitle: string;
    groups: { [G in AddonGroupId]: { title: string; items: Record<keyof (typeof site.addons)[G], string> } };
  };

  process: {
    title: string;
    subtitle: string;
    steps: { title: string; duration: string }[];
    paymentTitle: string;
    payments: { percent: string; text: string }[];
    guaranteesTitle: string;
    guarantees: Feature[];
  };

  faq: { title: string; items: { q: string; a: string }[] };

  finalCta: {
    title: string;
    text: string;
    whatsappLabel: string;
    whatsappMessage: string;
    telegramLabel: string;
    emailLabel: string;
    portfolioLabel: string;
  };

  footer: { text: string };
};
