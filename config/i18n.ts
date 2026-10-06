// Языки сайта. Русский — основной и открывается по адресу «/», остальные — по /kk и /en.
// Так старые ссылки на сайт продолжают работать, а у каждого языка своя страница для поисковиков.

export const locales = ['kk', 'ru', 'en'] as const; // порядок = порядок в переключателе

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ru';

export const localeMeta: Record<Locale, { label: string; name: string; ogLocale: string }> = {
  kk: { label: 'ҚАЗ', name: 'Қазақша', ogLocale: 'kk_KZ' },
  ru: { label: 'РУС', name: 'Русский', ogLocale: 'ru_KZ' },
  en: { label: 'ENG', name: 'English', ogLocale: 'en_US' },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Адрес главной страницы на языке: ru → «/», kk → «/kk». */
export function localePath(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}`;
}

/** Параметры для app/[lang]: все языки, кроме основного (он живёт на «/»). */
export function prefixedLocaleParams(): { lang: Locale }[] {
  return locales.filter((l) => l !== defaultLocale).map((lang) => ({ lang }));
}
