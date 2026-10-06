import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { site, type PortfolioItem } from './site';

// Проверка config/site.ts во время сборки. Ошибка в контактах ломает все кнопки
// молча (wa.me просто не откроет чат), поэтому лучше уронить сборку с понятным текстом.

const PLACEHOLDERS = {
  whatsappPhone: '77000000000',
  siteUrl: 'https://example.kz',
  email: 'hello@example.kz',
  telegram: 'your_telegram',
};

function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}

export function validateSiteConfig(): void {
  const { contacts, siteUrl } = site;
  const errors: string[] = [];

  if (!/^\d{10,15}$/.test(contacts.whatsappPhone)) {
    errors.push(`contacts.whatsappPhone: только цифры без «+» и пробелов, например '77011234567' (сейчас '${contacts.whatsappPhone}')`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacts.email)) {
    errors.push(`contacts.email: некорректный адрес '${contacts.email}'`);
  }
  if (!/^[A-Za-z0-9_]{5,32}$/.test(contacts.telegram)) {
    errors.push(`contacts.telegram: username без «@», 5–32 символа: латиница, цифры, «_» (сейчас '${contacts.telegram}')`);
  }
  // Только https или якорь на странице: защищает от опечаток и от ссылок вида javascript:… в href
  const isAnchor = /^#[a-z][\w-]*$/i.test(contacts.portfolioUrl);
  if (!isHttpsUrl(contacts.portfolioUrl) && !isAnchor) {
    errors.push(`contacts.portfolioUrl: нужна ссылка https://… или якорь вида '#portfolio' (сейчас '${contacts.portfolioUrl}')`);
  }
  if (!isHttpsUrl(siteUrl) || siteUrl.endsWith('/')) {
    errors.push(`siteUrl: адрес вида 'https://site.kz' без «/» в конце (сейчас '${siteUrl}')`);
  }

  const portfolio: PortfolioItem[] = Object.values(site.portfolio);
  for (const item of portfolio) {
    const files = [item.image.small, item.image.large, item.demo].filter((src) => src !== undefined);
    for (const src of files) {
      if (!existsSync(join(process.cwd(), 'public', src))) {
        errors.push(`portfolio «${item.name}»: файл public${src} не найден`);
      }
    }
  }

  // Номер WhatsApp продублирован в общем скрипте демо (статический файл не видит config) — сверяем
  const demoScript = join(process.cwd(), 'public/demos/demo.js');
  if (existsSync(demoScript) && !readFileSync(demoScript, 'utf8').includes(`'${contacts.whatsappPhone}'`)) {
    errors.push(`public/demos/demo.js: WHATSAPP_PHONE должен совпадать с contacts.whatsappPhone ('${contacts.whatsappPhone}')`);
  }

  if (errors.length > 0) {
    throw new Error(`Ошибки в config/site.ts:\n- ${errors.join('\n- ')}`);
  }

  const leftovers = [
    contacts.whatsappPhone === PLACEHOLDERS.whatsappPhone && 'contacts.whatsappPhone',
    siteUrl === PLACEHOLDERS.siteUrl && 'siteUrl',
    contacts.email === PLACEHOLDERS.email && 'contacts.email',
    contacts.telegram === PLACEHOLDERS.telegram && 'contacts.telegram',
  ].filter(Boolean);

  if (leftovers.length > 0) {
    console.warn(`⚠ В config/site.ts остались заглушки: ${leftovers.join(', ')}. Замените их перед публикацией.`);
  }
}
