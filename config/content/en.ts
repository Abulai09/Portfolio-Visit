import { site } from '@/config/site';
import { formatAmount, tenge } from '@/lib/format';
import type { Content } from './types';

// English (/en).

const start = formatAmount(site.packages.start.price.amount);
const filling = tenge(site.addons.content.catalogFilling.amount);
const { techSupport, changes } = site.addons.support;

export const en = {
  tagline: 'development & automation',
  fullTitle: 'Turnkey stores, apps and business automation',

  seo: {
    title: `Turnkey online stores, apps and business automation | Kazakhstan`,
    description: `Turnkey development in Kazakhstan: online stores and marketplaces, web and mobile apps, CRMs, chatbots, Kaspi and 1C integrations, AI automation. Stores from ${start} ₸, launch in as little as 14 days.`,
    ogTitle: 'Stores, apps and business automation',
    ogSubtitle: 'Online stores, CRMs, mobile apps, bots and AI, built turnkey',
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
    serviceType: 'Turnkey development and business automation',
    country: 'Kazakhstan',
    offerCatalog: 'Packages and services',
    offerPackage: (name) => `Online store “${name}”`,
  },

  nav: [
    { label: 'Work', href: '#portfolio' },
    { label: 'Stores', href: '#packages' },
    { label: 'Automation', href: '#automation' },
    { label: 'Websites', href: '#other-sites' },
    { label: 'How we work', href: '#process' },
    { label: 'Contact', href: '#contacts' },
  ],

  headerCta: {
    label: 'Message on WhatsApp',
    shortLabel: 'Message',
    message: 'Hello! I’d like to discuss a project and get some advice.',
  },

  floatingCta: {
    ariaLabel: 'Message on WhatsApp',
    message: 'Hello! I’d like to discuss a project and get some advice.',
  },

  hero: {
    title: 'Turnkey stores, apps and business automation',
    alsoLine: 'Online stores, CRMs, mobile apps, chatbots and AI assistants',
    subtitle:
      'Not just a website, but a system that sells, takes orders and takes routine work off your team. I handle everything: mapping your processes, design, development, launch and support.',
    badges: [
      'Built around your processes',
      'Kaspi online payments',
      '1C and CRM integrations',
      'Web and mobile apps',
      'Routine on autopilot',
    ],
    stats: [
      { value: 'From 14 days', label: 'to launch your store' },
      { value: '100%', label: 'of the code and access is yours' },
      { value: '1–3 months', label: 'of free support after launch' },
    ],
    primaryCta: {
      label: 'Discuss your project on WhatsApp',
      message: 'Hello! I’d like to discuss a project and get some advice.',
    },
    secondaryCta: { label: 'See packages', href: '#packages' },
    showcase: {
      launched: 'Store launched in 14 days',
      orderTitle: 'New order · 32 900 ₸',
      orderText: 'Paid with Kaspi, already in the CRM',
    },
  },

  directions: [
    {
      icon: 'store',
      title: 'Online store & marketplace',
      text: 'Your own store with a catalog, Kaspi payments and an admin panel — or a platform for many sellers.',
      href: '#packages',
      linkLabel: 'Packages and prices',
      main: true,
    },
    {
      icon: 'workflow',
      title: 'Apps & automation',
      text: 'CRMs, mobile apps, chatbots, integrations and AI — so orders, clients and reports run without manual busywork.',
      href: '#automation',
      linkLabel: 'What can be automated',
      main: true,
    },
    {
      icon: 'layout',
      title: 'Websites & services',
      text: 'Online booking sites, landing pages, company websites and business CRMs.',
      href: '#other-sites',
      linkLabel: 'Types and prices',
      main: false,
    },
  ],

  portfolio: {
    title: 'Work examples',
    subtitle:
      'Design concepts that show the quality of the work. Your project will be just as polished — in your own brand’s style.',
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
      start: {
        name: 'Start',
        audience: 'To start selling online quickly with a small product range.',
        duration: '14 days',
        features: [
          'Design based on a ready-made system, tailored to your brand',
          'Catalog of up to 40 products',
          'Admin panel: products and orders',
          'Online payments with Kaspi and bank cards',
          'Orders arrive in WhatsApp / Telegram',
          'Layout for phones and tablets',
          'Visitor and sales analytics',
          'Training on how to run the site',
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
          'Catalog of up to 100 products',
          'Catalog filters and search',
          'Customer accounts and order history',
          'Promo codes and discounts',
          '3 months of technical support',
        ],
      },
      premium: {
        name: 'Premium',
        audience: 'For large stores, chains and high traffic.',
        duration: '30–45 days',
        includesPrevious: 'Everything in “Business”, plus:',
        features: [
          'Unlimited catalog',
          'Order bot in Telegram, WhatsApp or Instagram',
          'A powerful back end for large catalogs',
          'Fast even under heavy load',
          'Staff roles in the admin panel',
          'Multiple languages (Russian / Kazakh / English)',
          'Sales reports',
        ],
      },
    },
    notes: [
      'Hosting and domain are paid separately (usually 5 000–15 000 ₸ a month) — I’ll help you choose and set everything up.',
      `Adding products is an extra service: ${filling} per product.`,
      'Free support comes with every package: 1 month in “Start”, 3 months in “Business” and “Premium”.',
      'All prices are in tenge.',
    ],
  },

  marketplace: {
    eyebrow: 'Turnkey marketplace',
    title: 'Your own platform where hundreds of sellers trade',
    text: 'A marketplace is a platform where many sellers sell their products, and the owner earns a commission on sales or a subscription fee. The price is for an MVP — the first working version of the platform with everything needed to start selling; it grows with your business from there.',
    name: 'Marketplace (MVP)',
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

  automation: {
    title: 'Apps and business automation',
    subtitle:
      'When a website isn’t enough: orders, clients, stock and messages run on their own, and your team works on the business instead of spreadsheets.',
    ctaLabel: 'Discuss your task',
    ctaMessage: (name) => `Hello! I’m interested in “${name}”. I’d like to discuss my task.`,
    package: {
      badge: 'Separate package',
      name: 'Turnkey web app and automation',
      audience: 'For businesses that need their own system: client booking, a CRM, client portals, reports and automated routine work.',
      duration: 'after reviewing your task',
      features: [
        'Process review and specification',
        'Interface design in your brand’s style',
        'Built around your processes, not a template',
        'Staff roles and access levels',
        'Easy to use on a computer and a phone',
        'Team training',
        '1 month of support',
      ],
      examplesTitle: 'For example, it could be:',
      examples: [
        'A website with online booking for a salon, clinic or service',
        'A CRM for your business: clients, deals, tasks and reports',
        'A portal for clients or partners',
        'An admin panel with sales reports',
        'A bot for orders and booking in Telegram or WhatsApp',
        'A link-up with Kaspi, 1C and delivery services',
      ],
      cta: {
        label: 'Discuss a web app',
        message: 'Hello! I’m interested in the “Turnkey web app and automation” package. I’d like to discuss my task.',
      },
    },
    servicesTitle: 'What else can be automated',
    items: {
      crm: {
        name: 'Web apps and CRMs',
        text: 'A system built around your processes: orders, clients, stock, staff and reports in one place.',
        examples: [
          'Client and partner portals',
          'Order, stock and payment tracking',
          'Staff roles and permissions',
        ],
      },
      mobileApp: {
        name: 'Mobile apps',
        text: 'An iOS and Android app your customers install from the App Store and Google Play.',
        examples: [
          'Catalog, orders and payments in the app',
          'Push notifications about deals and order status',
          'Loyalty program and rewards',
        ],
      },
      bots: {
        name: 'Telegram and WhatsApp chatbots',
        text: 'A bot takes orders and requests, answers common questions and books clients — around the clock.',
        examples: [
          'Order taking and online booking',
          'Notifications for clients and managers',
          'Broadcasts to your client base',
        ],
      },
      integrations: {
        name: 'Integrations',
        text: 'I connect your site, Kaspi, 1C, MoySklad, your CRM and delivery services so nobody copies data by hand.',
        examples: [
          'Stock and prices sync automatically',
          'Orders from Kaspi and your site land in the CRM',
          'Orders go to delivery automatically',
        ],
      },
      ai: {
        name: 'AI automation',
        text: 'AI assistants take over routine work: answering clients, sorting requests and drafting texts.',
        examples: [
          'AI consultant on your site and in messengers',
          'Sorting incoming requests and documents',
          'Product descriptions and review replies',
        ],
      },
    },
    note: 'Cost and timeline depend on your processes — I’ll calculate them after a free review of your task.',
    footnote: 'Not sure what can be automated?',
    footnoteCta: {
      label: 'Review my task',
      message: 'Hello! I want to automate my business — could you help me figure out where to start?',
    },
  },

  otherSites: {
    title: 'Other websites and services',
    subtitle: 'Websites for services and companies, plus CRMs and web services for business.',
    ctaLabel: 'Discuss',
    ctaMessage: (name) => `Hello! I’m interested in “${name}”. Could you tell me more?`,
    items: {
      booking: { name: 'Website with online booking', text: 'For salons, clinics and services: clients pick a service and a time and book themselves.', duration: '14–21 days' },
      landing: { name: 'Landing page', text: 'A one-page site for a service or a product.', duration: '5–7 days' },
      portfolio: { name: 'Business card / portfolio site', text: 'Tells people about you and your work, and brings in clients.', duration: '7–10 days' },
      corporate: { name: 'Company website', text: 'A multi-page site with services, news and contacts.', duration: '14–21 days' },
      crm: { name: 'CRM for your business', text: 'Clients, deals, tasks and reports in one system built around your processes.', duration: 'Timeline per brief' },
      webService: { name: 'Web service / SaaS / LMS', text: 'A subscription online service (SaaS) or a learning platform (LMS). Priced per brief.', duration: 'Timeline per brief' },
    },
    footnote: 'Don’t see what you need? Message me — I’ll find a solution for your task.',
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
          payments: 'Online payments (Kaspi Pay, cards, installments)',
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
          aiAssistant: 'AI assistant for customers',
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
      { title: 'Task review and brief', duration: '1 day' },
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
      { icon: 'badge-check', title: 'The code and access are yours', text: 'I hand over all access and source files.' },
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
        q: 'Can I start small and upgrade later?',
        a: 'Yes. You can begin with “Start”, then move to a bigger package or add individual features — the site gets extended, not rebuilt.',
      },
      {
        q: 'Why is my own store better than a marketplace?',
        a: 'No sales commissions, you control your own prices and promotions, and customer contacts stay with you for repeat sales.',
      },
      {
        q: 'Can I add products myself?',
        a: 'Yes, every package has an admin panel: you change products, prices and orders yourself, without a developer. After launch I’ll show you how everything works.',
      },
      {
        q: 'What if I need changes after launch?',
        a: `Free support comes with the package: 1 month in “Start”, 3 months in “Business” and “Premium”. After that — technical support at ${tenge(techSupport.amount)} a month or one-off changes at ${tenge(changes.amount)} an hour.`,
      },
      {
        q: 'Do you accept Kaspi?',
        a: `Yes. Online payments with Kaspi and bank cards come with every online store package, and can be added to a landing page or other site for ${tenge(site.addons.sales.payments.amount)}.`,
      },
      {
        q: 'How is a marketplace different from an online store?',
        a: 'In an online store, only you sell. On a marketplace, many sellers sell their products, and you as the platform owner earn from commissions or subscriptions.',
      },
      {
        q: 'Do you build mobile apps and automation?',
        a: 'Yes: web and mobile apps, CRMs, Telegram and WhatsApp chatbots, Kaspi, 1C and CRM integrations, and AI assistants. I also build landing pages and company websites. Tell me your task — I’ll review your processes and suggest a solution.',
      },
      {
        q: 'Where do I start with automation?',
        a: 'With a free review: you tell me where your team spends the most time, and I suggest what to automate first and how much it will cost. You can start with a single task — for example, making orders land in your CRM automatically.',
      },
    ],
  },

  finalCta: {
    title: 'Ready to launch a store or an app, or automate your business?',
    text: 'Message me — I’ll review your task for free, suggest a solution and calculate the exact cost.',
    whatsappLabel: 'Message on WhatsApp',
    whatsappMessage: 'Hello! I’d like to discuss a project and get some advice.',
    telegramLabel: 'Telegram',
    emailLabel: 'Email',
    portfolioLabel: 'Portfolio',
  },

  footer: {
    text: 'Turnkey stores, apps and business automation',
  },
} satisfies Content;
