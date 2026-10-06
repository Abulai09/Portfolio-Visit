'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { MacBook } from '@/components/ui/MacBook';

export type PortfolioSlide = {
  id: string;
  name: string;
  kind: string;
  text: string;
  concept: boolean;
  small: string;
  large: string;
  alt: string;
  /** Подпись слайда для скринридера: «2 из 9: bazar.kz» */
  label: string;
  /** Подпись точки-переключателя */
  dotLabel: string;
  /** Ссылка на одностраничное демо, если оно есть */
  demoHref?: string;
  demoAria: string;
};

/**
 * Карусель на нативной прокрутке со scroll-snap: свайп на телефоне работает без JS-библиотек,
 * а кнопки и точки лишь прокручивают ленту к нужному слайду. Активный слайд считается
 * по положению прокрутки, поэтому подсвечен именно тот, что стоит по центру.
 */
export function PortfolioCarousel({
  slides,
  conceptLabel,
  demoLabel,
  labels,
}: {
  slides: PortfolioSlide[];
  conceptLabel: string;
  demoLabel: string;
  labels: { slide: string; prev: string; next: string };
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  // Активный — слайд, чей центр ближе всего к центру ленты. Считаем не чаще раза за кадр.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let minDistance = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const distance = Math.abs(el.offsetLeft + el.clientWidth / 2 - center);
        if (distance < minDistance) {
          minDistance = distance;
          closest = i;
        }
      });
      setActive(closest);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const target = (index + slides.length) % slides.length;
      const slide = track?.children[target] as HTMLElement | undefined;
      if (!track || !slide) return;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      track.scrollTo({
        left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
        behavior: reduceMotion ? 'auto' : 'smooth',
      });
    },
    [slides.length],
  );

  return (
    <div className="relative">
      {/* Свечение за активным ноутбуком — единственный «громкий» декоративный элемент страницы.
          Без filter: blur — радиальный градиент и так мягкий, а фильтр на большой площади тяжёл для GPU */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[8%] left-1/2 h-[70%] w-[min(90vw,56rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_90_60/0.38),rgb(124_92_255/0.22)_55%,transparent)]"
      />

      <ul
        ref={trackRef}
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-[7%] pt-4 pb-6 [scrollbar-width:none] sm:gap-8 md:px-[15%] lg:px-[19%] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => {
          const isActive = i === active;
          const laptop = (
            <MacBook
              small={slide.small}
              large={slide.large}
              alt={slide.alt}
              sizes="(min-width: 1024px) 62vw, (min-width: 768px) 70vw, 86vw"
              priority={i === 0}
            />
          );
          return (
            <li
              key={slide.id}
              data-index={i}
              role="group"
              aria-roledescription={labels.slide}
              aria-label={slide.label}
              className={`w-[86%] shrink-0 snap-center transition-[opacity,transform] duration-300 ease-out md:w-[70%] lg:w-[62%] ${
                isActive ? 'opacity-100' : 'scale-[0.92] opacity-45'
              }`}
            >
              {slide.demoHref ? (
                // Скриншот с демо — ссылка на него; у соседних слайдов ссылка не в порядке Tab
                <a
                  href={slide.demoHref}
                  aria-label={slide.demoAria}
                  tabIndex={isActive ? undefined : -1}
                  className="block rounded-[clamp(10px,2.4%,22px)] transition-transform duration-300 hover:-translate-y-1"
                >
                  {laptop}
                </a>
              ) : (
                laptop
              )}

              {/* Текст, под ним кнопки: слайд узкий (~490px на 1280), две кнопки рядом с текстом сжали бы его в столбик */}
              <div className="mt-6 flex flex-col gap-5 sm:mt-8">
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-2xl font-extrabold text-white">{slide.name}</h3>
                    <span className="text-white/70">{slide.kind}</span>
                    {slide.concept && (
                      <span className="rounded-full bg-coral/15 px-2.5 py-0.5 text-sm font-semibold text-coral-light ring-1 ring-coral/40">
                        {conceptLabel}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 max-w-md text-white/75">{slide.text}</p>
                </div>
                {slide.demoHref && (
                  <a
                    href={slide.demoHref}
                    // Кнопка только у центрального слайда: у соседей её обрезки торчали бы по краям
                    className={`${isActive ? '' : 'invisible'} inline-flex min-h-10 items-center gap-1.5 self-start rounded-full bg-white px-4 text-sm font-semibold text-night transition-colors hover:bg-coral-soft`}
                  >
                    {demoLabel}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="container-page mt-2 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label={labels.prev}
          className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </button>

        {/* На телефоне 9 точек по 44px не помещаются — показываем счётчик */}
        <p className="min-w-16 text-center font-semibold text-white tabular-nums sm:hidden" aria-live="polite">
          {active + 1} / {slides.length}
        </p>

        <div className="hidden items-center sm:flex">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={slide.dotLabel}
              aria-current={i === active ? 'true' : undefined}
              className="group inline-flex size-11 items-center justify-center"
            >
              <span
                className={`block h-2 rounded-full transition-[width,background-color] duration-300 ${
                  i === active ? 'w-8 bg-coral' : 'w-2 bg-white/35 group-hover:bg-white/60'
                }`}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label={labels.next}
          className="inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20"
        >
          <ChevronRight className="size-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
