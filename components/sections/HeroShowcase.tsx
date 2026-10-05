import { BadgeCheck, ShoppingBag } from 'lucide-react';
import { site } from '@/config/site';

/**
 * Иллюстрация в hero (только на десктопе): два окна браузера с примерами сайтов
 * и «живые» уведомления — сразу показывает, что получит клиент: сайт и заказы.
 * Декоративная: те же работы с подписями есть в блоке «Примеры сайтов».
 */
function BrowserWindow({ src, url, className }: { src: string; url: string; className: string }) {
  return (
    <div className={`absolute overflow-hidden rounded-2xl bg-surface shadow-[0_30px_60px_-24px_rgb(46_26_140/0.45)] ring-1 ring-line ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-line bg-surface-muted px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 rounded-md bg-surface px-3 py-0.5 text-xs text-ink-soft ring-1 ring-line">{url}</span>
      </div>
      {/* Скрыто на мобильном (display:none) + lazy — на телефоне картинки не скачиваются */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={960} height={600} loading="lazy" decoding="async" className="block h-auto w-full" />
    </div>
  );
}

export function HeroShowcase() {
  const { launched, orderTitle, orderText } = site.hero.showcase;
  return (
    <div aria-hidden="true" className="relative hidden h-[480px] lg:block">
      <div className="absolute top-4 right-0 size-[400px] rounded-full bg-coral-soft" />
      <div className="absolute bottom-0 left-10 size-40 rounded-full bg-accent-soft" />

      <BrowserWindow src="/portfolio/bazar-960.webp" url="bazar.kz" className="top-2 right-4 w-[88%] rotate-[2.5deg]" />
      <BrowserWindow src="/portfolio/bloom-960.webp" url="bloom.kz" className="bottom-6 left-0 w-[66%] -rotate-[3deg]" />

      <div className="absolute right-0 bottom-24 flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 shadow-[0_20px_40px_-18px_rgb(46_26_140/0.5)] ring-1 ring-line">
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-coral text-white">
          <ShoppingBag className="size-5" />
        </span>
        <span className="text-sm">
          <span className="block font-bold text-ink">{orderTitle}</span>
          <span className="text-ink-soft">{orderText}</span>
        </span>
      </div>

      <div className="absolute top-0 left-6 flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-[0_16px_32px_-16px_rgb(46_26_140/0.5)] ring-1 ring-line">
        <BadgeCheck className="size-5 text-accent-ink" />
        {launched}
      </div>
    </div>
  );
}
