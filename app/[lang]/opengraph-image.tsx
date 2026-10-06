import { notFound } from 'next/navigation';
import { isLocale, prefixedLocaleParams } from '@/config/i18n';
import { ogSize, renderOgImage } from '../_site/og-image';

export const dynamic = 'force-static';
export const size = ogSize;
export const contentType = 'image/png';
// Маршруты метаданных не наследуют параметры layout — перечисляем языки и здесь
export const generateStaticParams = prefixedLocaleParams;

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return renderOgImage(lang);
}
