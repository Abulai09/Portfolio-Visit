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

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-semibold focus:shadow-lg"
      >
        Перейти к содержимому
      </a>
      <Header />
      <main id="main">
        <div id="top" />
        <Hero />
        <Portfolio />
        <WhyOwnStore />
        <Packages />
        <Marketplace />
        <OtherSites />
        <Addons />
        <Process />
        <Faq />
        <Contacts />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <RevealObserver />
      <JsonLd />
    </>
  );
}
