import { BadgeCheck, ShoppingBag } from 'lucide-react';
import type { Content } from '@/config/content';
import { site } from '@/config/site';

/** Магазины, которые по очереди появляются на экране ноутбука (первый — сразу). */
const SCREENS = ['volt', 'bloom', 'luna', 'bazar'] as const satisfies readonly (keyof typeof site.portfolio)[];

/**
 * Иллюстрация в hero: 3D-ноутбук на чистом CSS (стили .hero-laptop* в globals.css).
 * При загрузке крышка открывается, потом ноутбук парит, а на экране сменяются магазины.
 * Рядом всплывают «Сайт запущен» и «Новый заказ» — то, что получит клиент.
 * Декоративная: те же работы с подписями есть в блоке «Примеры сайтов».
 */
export function HeroShowcase({ showcase }: { showcase: Content['hero']['showcase'] }) {
  const { launched, orderTitle, orderText } = showcase;
  return (
    <div aria-hidden="true" className="hero-laptop">
      <div className="hero-laptop__shadow" />
      <div className="hero-laptop__float">
        <div className="hero-laptop__device">
          <div className="hero-laptop__base">
            <div className="hero-laptop__keys" />
            <div className="hero-laptop__pad" />
          </div>
          <div className="hero-laptop__lid">
            <div className="hero-laptop__screen">
              <div className="hero-laptop__view">
                {SCREENS.map((id) => (
                  // На телефоне ноутбук ниже первого экрана: lazy не тормозит загрузку заголовка
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={id}
                    src={site.portfolio[id].image.small}
                    alt=""
                    width={960}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            </div>
            <div className="hero-laptop__back" />
          </div>
        </div>
      </div>

      <div className="hero-chip hero-chip--launched inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs font-semibold text-ink shadow-[0_16px_32px_-16px_rgb(46_26_140/0.5)] ring-1 ring-line sm:px-4 sm:py-2 sm:text-sm">
        <BadgeCheck className="size-4 text-accent-ink sm:size-5" />
        {launched}
      </div>

      <div className="hero-chip hero-chip--order flex items-center gap-2.5 rounded-2xl bg-surface px-3 py-2 shadow-[0_20px_40px_-18px_rgb(46_26_140/0.5)] ring-1 ring-line sm:gap-3 sm:px-4 sm:py-3">
        <span className="inline-flex size-8 items-center justify-center rounded-xl bg-coral text-white sm:size-10">
          <ShoppingBag className="size-4 sm:size-5" />
        </span>
        <span className="text-xs sm:text-sm">
          <span className="block font-bold text-ink">{orderTitle}</span>
          <span className="text-ink-soft">{orderText}</span>
        </span>
      </div>
    </div>
  );
}
