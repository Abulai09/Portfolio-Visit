import { site } from '@/config/site';
import { formatAmount, tenge } from '@/lib/format';
import type { Content } from './types';

// English (/en).

const trial = formatAmount(site.packages.trial.price.amount);
const { techSupport, changes } = site.addons.support;

export const en = {
  tagline: 'web development',
  fullTitle: 'Turnkey websites: online stores and marketplaces',

  seo: {
    title: `Turnkey online stores and marketplaces — from ${trial} ₸ | Web development in Kazakhstan`,
    description: `Turnkey online store and marketplace development in Kazakhstan: design, Kaspi online payments, admin panel, SEO and launch. Packages from ${trial} ₸, launch in as little as 7 days. Landing pages and company websites too.`,
    ogTitle: 'Turnkey online stores and marketplaces',
    ogSubtitle: `Design, development, payments, delivery and launch. From ${trial} tenge`,
  },

  price: {
    from: (amount) => `from ${amount}`,
    onRequest: 'Quoted per brief',
    units: { month: '/ month', hour: '/ hour', item: '/ product', language: 'per language' },
  },

  ui: {
    skipLink: 'Skip to content',
    mainNav: 'Main menu',
    mobileNav: 'Mobile menu',
    footerNav: 'Footer navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    themeToggle: 'Switch color theme',
    themeToggleTitle: 'Light / dark theme',
    languageSwitcher: 'Site language',
    duration: 'Timeline',
    included: 'What’s included:',
    mainBadge: 'Core',
    heroBadgesLabel: 'What you get',
    step: (n) => `Step ${n}.`,
    carousel: 'carousel',
    slide: 'slide',
    slideLabel: (n, total, name) => `${n} of ${total}: ${name}`,
    slideAlt: (name, kind) => `Home page of ${name} — ${kind.toLowerCase()}`,
    showSlide: (n, name) => `Show example ${n}: ${name}`,
    prevSlide: 'Previous example',
    nextSlide: 'Next example',
    serviceType: 'Turnkey website development',
    country: 'Kazakhstan',
    offerCatalog: 'Packages and website types',
    offerPackage: (name) => `Online store “${name}”`,
  },

  nav: [
    { label: 'Work', href: '#portfolio' },
    { label: 'Stores', href: '#packages' },
    { label: 'Marketplace', href: '#marketplace' },
    { label: 'Other sites', href: '#other-sites' },
    { label: 'How we work', href: '#process' },
    { label: 'Contact', href: '#contacts' },
  ],

  headerCta: {
    label: 'Message on WhatsApp',
    shortLabel: 'Message',
    message: 'Hello! I’d like to discuss a website and get some advice.',
  },

  floatingCta: {
    ariaLabel: 'Message on WhatsApp',
    message: 'Hello! I’d like to discuss a website and get some advice.',
  },

  hero: {
    title: 'Turnkey online stores and marketplaces',
    alsoLine: 'Plus landing pages, company websites and any other web project',
    subtitle:
      'A fast, modern, easy-to-use website that sells 24/7. You focus on your products — I take care of everything else: design, development, payments, delivery and launch.',
    badges: [
      'Your own site, not a template',
      'Online payments',
      'Easy admin panel',
      'Built for phones',
      'SEO from day one',
    ],
    stats: [
      { value: 'From 7 days', label: 'to launch your store' },
      { value: '100%', label: 'of the site and code is yours' },
      { value: '1 month', label: 'of free support with any package' },
    ],
    primaryCta: {
      label: 'Discuss your project on WhatsApp',
      message: 'Hello! I’d like an online store and need some advice.',
    },
    secondaryCta: { label: 'See packages', href: '#packages' },
    showcase: {
      launched: 'Site launched in 14 days',
      orderTitle: 'New order · 32 900 ₸',
      orderText: 'Paid with Kaspi',
    },
  },

  directions: [
    {
      icon: 'store',
      title: 'Online store',
      text: 'Your own store with a catalog, cart, online payments and an admin panel.',
      href: '#packages',
      linkLabel: 'Packages and prices',
      main: true,
    },
    {
      icon: 'marketplace',
      title: 'Marketplace',
      text: 'A platform for many sellers: you earn from commissions or subscriptions.',
      href: '#marketplace',
      linkLabel: 'What’s included',
      main: true,
    },
    {
      icon: 'layout',
      title: 'Other turnkey websites',
      text: 'Landing pages, business card sites, company websites, online booking and web services.',
      href: '#other-sites',
      linkLabel: 'Website types',
      main: false,
    },
  ],

  portfolio: {
    title: 'Website examples',
    subtitle:
      'Design concepts that show the quality of the work. Your site will be just as polished — in your own brand’s style.',
    conceptLabel: 'Design concept',
    demoLabel: 'Open demo',
    demoAria: (name) => `Open the ${name} demo site`,
    items: {
      luna: { kind: 'Clothing store', text: 'Collections catalog, lookbook, cart and try-on before payment.' },
      bazar: { kind: 'Marketplace', text: 'Thousands of sellers, ratings, Kaspi installments and a single cart.' },
      volt: { kind: 'Electronics store', text: 'Catalog search, reviews, promo banners and 0‑0‑12 installments.' },
      bloom: { kind: 'Cosmetics store', text: 'Skincare matched to skin type, categories, bestsellers and reviews.' },
      nordhaus: { kind: 'Furniture store', text: 'Catalog by room, installments, showroom booking and in-room preview.' },
      lumiere: { kind: 'Salon with online booking', text: 'Pick a service, a stylist and a time — confirmation arrives on WhatsApp.' },
      dastarkhan: { kind: 'Food delivery', text: 'Menu by category, one-tap cart, delivery address and time.' },
      qurylys: { kind: 'Company website', text: 'Company projects, key figures, services and tender requests.' },
      qahua: { kind: 'Landing page', text: 'A coffee roaster’s sales page: blends, subscription and 2-click ordering.' },
    },
  },

  whyOwnStore: {
    title: 'Why your own store',
    subtitle: 'Marketplaces are a good start, but your own site works for your brand and your profit.',
    items: [
      { icon: 'wallet', title: 'No marketplace fees', text: 'All the revenue stays with you, and you set your own prices and promotions.' },
      { icon: 'users', title: 'Your own customer base', text: 'Customer contacts, order history, repeat sales and newsletters.' },
      { icon: 'zap', title: 'Fast loading', text: 'Pages open in a fraction of a second.' },
      { icon: 'smartphone', title: 'Easy on a phone', text: 'Over 80% of purchases are made on a smartphone.' },
      { icon: 'settings', title: 'Simple to manage', text: 'Add products, change prices and process orders without a developer.' },
      { icon: 'search', title: 'Found on Google and Yandex', text: 'A proper SEO structure brings free traffic.' },
    ],
  },

  packages: {
    title: 'Online store packages',
    subtitle: 'Choose a package that fits your business — start small and grow as you go.',
    popularBadge: 'POPULAR',
    ctaLabel: (name) => `Choose “${name}”`,
    ctaMessage: (name) => `Hello! I’d like an online store with the “${name}” package. Could you tell me more?`,
    items: {
      trial: {
        name: 'Trial',
        audience: 'To start selling online quickly and affordably.',
        duration: '7–10 days',
        features: [
          'Ready-made design in your brand colors',
          'Catalog of up to 20 products',
          '20 products added for free',
          'Cart and checkout',
          'Orders arrive on WhatsApp',
          '“Message on WhatsApp” button on the site',
          'Mobile-friendly layout',
          'Domain and SSL setup',
          'Store QR code for business cards and packaging',
          '1 month of support',
        ],
      },
      start: {
        name: 'Start',
        audience: 'For new sellers with a small product range.',
        duration: '14 days',
        features: [
          'Design based on a ready-made system, tailored to your brand',
          'Catalog of up to 100 products',
          'Product pages with photos and descriptions',
          'Cart and checkout',
          'Requests via WhatsApp / Telegram and email',
          'Admin panel: products and orders',
          'Layout for phones and tablets',
          'Basic SEO and domain setup',
          '1 month of support',
        ],
      },
      business: {
        name: 'Business',
        audience: 'For an established business that wants to sell online.',
        duration: '21–30 days',
        includesPrevious: 'Everything in “Start”, plus:',
        features: [
          'Custom design',
          'Unlimited catalog',
          'Filters, search and sorting',
          'Online payments (Kaspi, bank cards)',
          'Customer accounts and order history',
          'Promo codes and discounts',
          'Delivery cost calculation and pickup',
          '1 month of support',
        ],
      },
      premium: {
        name: 'Premium',
        audience: 'For large stores, chains and high traffic.',
        duration: '30–45 days',
        includesPrevious: 'Everything in “Business”, plus:',
        features: [
          'A powerful back end for large catalogs',
          'Fast even under heavy load',
          'Staff roles in the admin panel',
          'Multiple languages (Russian / Kazakh / English)',
          'Sales reports',
          '1 month of support',
        ],
      },
    },
    notes: [
      'Hosting and domain are paid separately (usually 5 000–15 000 ₸ a month) — I’ll help you choose and set everything up.',
      'Adding products is free only in “Trial”; in other packages it’s an extra service.',
      '1 month of free support comes with every package.',
      'All prices are in tenge.',
    ],
  },

  marketplace: {
    eyebrow: 'Turnkey marketplace',
    title: 'Your own platform where hundreds of sellers trade',
    text: 'A marketplace is a platform where many sellers sell their products, and the owner earns a commission on sales or a subscription fee.',
    name: 'Marketplace',
    duration: 'from 45 days',
    features: [
      'Seller sign-up and seller accounts',
      'Moderation of sellers and products',
      'Shared catalog with filters and search',
      'One cart for products from different sellers',
      'Online payments (Kaspi, cards) and platform commission calculation',
      'Seller payouts and reports',
      'Seller reviews and ratings',
      'Admin panel for the platform owner',
      'Reliable with many sellers and buyers',
      '1 month of support',
    ],
    cta: {
      label: 'Discuss a marketplace',
      message: 'Hello! I’d like a turnkey marketplace. Could you tell me more?',
    },
  },

  otherSites: {
    title: 'Other turnkey websites',
    subtitle: 'Not just e-commerce — I build sites for services, companies and any other need.',
    ctaLabel: 'Discuss',
    ctaMessage: (name) => `Hello! I need a website: ${name}. Could you tell me more?`,
    items: {
      landing: { name: 'Landing page', text: 'A one-page site for a service or a product.', duration: '5–7 days' },
      portfolio: { name: 'Business card / portfolio site', text: 'Tells people about you and your work, and brings in clients.', duration: '7–10 days' },
      corporate: { name: 'Company website', text: 'A multi-page site with services, news and contacts.', duration: '14–21 days' },
      booking: { name: 'Site with online booking', text: 'For salons, clinics and services: clients book themselves.', duration: '14–21 days' },
      webService: { name: 'Web service / client portal / CRM', text: 'A solution built around your task and business processes.', duration: 'Timeline per brief' },
    },
    footnote: 'Don’t see what you need? Message me — I’ll build any site for your task.',
    footnoteCta: {
      label: 'Message me',
      message: 'Hello! I need a website for my own task, I’ll explain the details.',
    },
  },

  addons: {
    title: 'Extra features',
    subtitle: 'Add them to any package — pay only for what you need.',
    groups: {
      sales: {
        title: 'Sales and payments',
        items: {
          payments: 'Online payments (Kaspi Pay, cards, installments) for “Start”',
          loyalty: 'Loyalty program',
          abandonedCarts: 'Abandoned cart recovery',
          reviews: 'Product reviews and ratings',
        },
      },
      integrations: {
        title: 'Integrations',
        items: {
          accounting: '1C / MoySklad',
          delivery: 'Delivery services (Kazpost, CDEK)',
          telegramBot: 'Telegram bot for orders',
          crm: 'CRM (amoCRM, Bitrix24)',
          kaspiFeed: 'Kaspi.kz product export (XML feed)',
        },
      },
      content: {
        title: 'Site and content',
        items: {
          multilingual: 'Multiple languages',
          blog: 'Blog / news',
          catalogFilling: 'Adding products',
          pwa: 'Mobile app (PWA)',
        },
      },
      support: {
        title: 'Support',
        items: {
          techSupport: 'Technical support',
          changes: 'Changes on request',
        },
      },
    },
  },

  process: {
    title: 'How we work',
    subtitle: 'Transparent and under contract: you always know where your project stands.',
    steps: [
      { title: 'Intro call and brief', duration: '1 day' },
      { title: 'Contract and deposit', duration: '1 day' },
      { title: 'Design', duration: '3–7 days' },
      { title: 'Development', duration: '7–30 days' },
      { title: 'Testing and training', duration: '2–3 days' },
      { title: 'Launch and support', duration: '1 day' },
    ],
    paymentTitle: 'Pay in stages',
    payments: [
      { percent: '50%', text: 'when the contract is signed' },
      { percent: '30%', text: 'when the design is approved' },
      { percent: '20%', text: 'after launch' },
    ],
    guaranteesTitle: 'Guarantees',
    guarantees: [
      { icon: 'badge-check', title: 'The code and site are yours', text: 'I hand over all access and source files.' },
      { icon: 'file-signature', title: 'Fixed price', text: 'The cost is set in the contract.' },
      { icon: 'calendar-check', title: 'Deadlines in the contract', text: 'You know the exact launch date.' },
      { icon: 'eye', title: 'Regular progress updates', text: 'You see results at every stage.' },
    ],
  },

  faq: {
    title: 'FAQ',
    items: [
      {
        q: 'How much does hosting cost?',
        a: 'Usually 5 000–15 000 ₸ a month including the domain. It’s paid separately — I’ll help you choose and set everything up.',
      },
      {
        q: 'Can I start with “Trial” and upgrade later?',
        a: 'Yes. You can start with “Trial”, then move to a bigger package or add individual features — the site gets extended, not rebuilt.',
      },
      {
        q: 'Why is my own store better than a marketplace?',
        a: 'No sales commissions, you control your own prices and promotions, and customer contacts stay with you for repeat sales.',
      },
      {
        q: 'Can I add products myself?',
        a: 'Yes, from the “Start” package up there’s an admin panel: you change products, prices and orders yourself, without a developer. After launch I’ll show you how everything works.',
      },
      {
        q: 'What if I need changes after launch?',
        a: `The first month of support is free with any package. After that — technical support at ${tenge(techSupport.amount)} a month or one-off changes at ${tenge(changes.amount)} an hour.`,
      },
      {
        q: 'Do you accept Kaspi?',
        a: `Yes. Online payments via Kaspi and bank cards are included in “Business” and “Premium”, and can be added to “Start” for ${tenge(site.addons.sales.payments.amount)}.`,
      },
      {
        q: 'How is a marketplace different from an online store?',
        a: 'In an online store, only you sell. On a marketplace, many sellers sell their products, and you as the platform owner earn from commissions or subscriptions.',
      },
      {
        q: 'Do you build sites that aren’t for selling?',
        a: 'Yes: landing pages, business card sites, company websites, online booking, client portals and CRMs. Tell me your task and I’ll find a solution.',
      },
    ],
  },

  finalCta: {
    title: 'Ready to launch your store, marketplace or website?',
    text: 'Message me — I’ll advise you for free, pick a package and calculate the exact cost for your business.',
    whatsappLabel: 'Message on WhatsApp',
    whatsappMessage: 'Hello! I’d like to discuss a website and get some advice.',
    telegramLabel: 'Telegram',
    emailLabel: 'Email',
    portfolioLabel: 'Portfolio',
  },

  footer: {
    text: 'Turnkey websites: online stores and marketplaces',
  },
} satisfies Content;
