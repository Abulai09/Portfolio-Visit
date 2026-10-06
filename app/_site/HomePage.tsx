import { getContent } from '@/config/content';
import type { Locale } from '@/config/i18n';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { Portfolio } from '@/components/sections/Portfolio';
import { WhyOwnStore } from '@/components/sections/WhyOwnStore';
import { Packages } from '@/components/sections/Packages';
import { Marketplace } from '@/components/sections/Marketplace';
import { OtherSites } from '@/components/sections/OtherSites';
import { Addons } from '@/components/sections/Addons';
import { Process } from '@/components/sections/Process';
import { Faq } from '@/components/sections/Faq';
import { Contacts } from '@/components/sections/Contacts';
import { Footer } from '@/components/sections/Footer';
import { FloatingWhatsApp } from '@/components/sections/FloatingWhatsApp';
import { RevealObserver } from '@/components/ui/RevealObserver';
import { JsonLd } from '@/components/JsonLd';

/** Вся страница на одном языке. Секции получают тексты через `t` и не знают, какой это язык. */
export function HomePage({ locale }: { locale: Locale }) {
  const t = getContent(locale);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-semibold focus:shadow-lg"
      >
        {t.ui.skipLink}
      </a>
      <Header t={t} locale={locale} />
      <main id="main">
        <div id="top" />
        <Hero t={t} />
        <Portfolio t={t} />
        <WhyOwnStore t={t} />
        <Packages t={t} />
        <Marketplace t={t} />
        <OtherSites t={t} />
        <Addons t={t} />
        <Process t={t} />
        <Faq t={t} />
        <Contacts t={t} />
      </main>
      <Footer t={t} />
      <FloatingWhatsApp t={t} />
      <RevealObserver />
      <JsonLd t={t} locale={locale} />
    </>
  );
}
