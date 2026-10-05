import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { site } from './site';

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

  for (const item of site.portfolio.items) {
    for (const src of [item.image.small, item.image.large]) {
      if (!existsSync(join(process.cwd(), 'public', src))) {
        errors.push(`portfolio «${item.name}»: файл public${src} не найден`);
      }
    }
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
