'use client';

import { useEffect } from 'react';

/**
 * Анимация появления блоков `.reveal` при прокрутке. Сама анимация — в CSS.
 *
 * Блоки прячутся только классом `reveal-ready`, который ставится здесь, после запуска JS.
 * Если скрипты не загрузились (плохой мобильный интернет, ошибка), контент просто виден —
 * он никогда не остаётся прозрачным.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const items = [...document.querySelectorAll<HTMLElement>('.reveal')];

    // То, что уже на экране, помечаем видимым до включения анимации — без мигания
    const pending = items.filter((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) {
        el.classList.add('is-visible');
        return false;
      }
      return true;
    });

    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    pending.forEach((el) => observer.observe(el));
    root.classList.add('reveal-ready');

    return () => {
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}
