import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { defaultLocale, isLocale, prefixedLocaleParams } from '@/config/i18n';
import { buildMetadata, RootDocument } from '../_site/RootDocument';

// Остальные языки: /kk и /en. Любой другой адрес — 404 (страницы создаются только при сборке).
export const dynamicParams = false;
export { viewport } from '../_site/RootDocument';

export const generateStaticParams = prefixedLocaleParams;

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params;
  return isLocale(lang) ? buildMetadata(lang) : {};
}

export default async function LangLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang) || lang === defaultLocale) notFound();
  return <RootDocument locale={lang}>{children}</RootDocument>;
}
