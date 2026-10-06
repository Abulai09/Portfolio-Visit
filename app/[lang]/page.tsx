import { notFound } from 'next/navigation';
import { isLocale } from '@/config/i18n';
import { HomePage } from '../_site/HomePage';

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return <HomePage locale={lang} />;
}
