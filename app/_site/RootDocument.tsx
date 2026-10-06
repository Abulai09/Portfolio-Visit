import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Manrope } from 'next/font/google';
import { site } from '@/config/site';
import { getContent } from '@/config/content';
import { defaultLocale, localeMeta, localePath, locales, type Locale } from '@/config/i18n';
import { validateSiteConfig } from '@/config/validate';
import { themeInitScript } from '@/lib/theme';
import '../globals.css';

// Общая часть двух корневых layout: app/(default) — русский на «/», app/[lang] — /kk и /en.
// Папка с «_» не создаёт маршрут.

// Выполняется на сервере во время сборки, в браузер не попадает
validateSiteConfig();

const manrope = Manrope({
  variable: '--font-manrope',
  // Казахские буквы (ә, ғ, қ, ң, ө, ү, һ) — в cyrillic-ext. Шрифт подгружает его по unicode-range
  // только там, где эти буквы есть; здесь перечислены подмножества для preload.
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export function buildMetadata(locale: Locale): Metadata {
  const t = getContent(locale);
  const url = localePath(locale);

  return {
    metadataBase: new URL(site.siteUrl),
    title: t.seo.title,
    description: t.seo.description,
    alternates: {
      canonical: url,
      // hreflang: поисковик показывает человеку версию на его языке
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localePath(l)])),
        'x-default': localePath(defaultLocale),
      },
    },
    openGraph: {
      type: 'website',
      locale: localeMeta[locale].ogLocale,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeMeta[l].ogLocale),
      url,
      siteName: t.fullTitle,
      title: t.seo.title,
      description: t.seo.description,
    },
    twitter: {
      card: 'summary_large_image',
      title: t.seo.title,
      description: t.seo.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0a22' },
  ],
};

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    // suppressHydrationWarning: скрипт темы меняет data-theme на <html> до гидрации — это ожидаемо
    <html lang={locale} className={`${manrope.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
