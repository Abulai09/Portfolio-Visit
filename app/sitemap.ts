import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { localePath, locales } from '@/config/i18n';

export const dynamic = 'force-static';

const absolute = (path: string) => new URL(path, site.siteUrl).href;

export default function sitemap(): MetadataRoute.Sitemap {
  // Каждая языковая версия — отдельная запись со ссылками на остальные (hreflang)
  const languages = Object.fromEntries(locales.map((l) => [l, absolute(localePath(l))]));
  return locales.map((locale) => ({
    url: absolute(localePath(locale)),
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
    alternates: { languages },
  }));
}
