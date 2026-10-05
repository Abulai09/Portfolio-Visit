import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { site } from '@/config/site';
import { validateSiteConfig } from '@/config/validate';
import { themeInitScript } from '@/lib/theme';
import './globals.css';

// Выполняется на сервере во время сборки, в браузер не попадает
validateSiteConfig();

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: site.seo.title,
  description: site.seo.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_KZ',
    url: '/',
    siteName: site.brand.fullTitle,
    title: site.seo.title,
    description: site.seo.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0a22' },
  ],
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // suppressHydrationWarning: скрипт темы меняет data-theme на <html> до гидрации — это ожидаемо
    <html lang="ru" className={`${manrope.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-dvh font-sans">{children}</body>
    </html>
  );
}
