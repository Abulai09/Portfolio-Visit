'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import { locales, localeMeta, localePath, type Locale } from '@/config/i18n';

/**
 * Компактный переключатель языка: кнопка «🌐 РУС» раскрывает список из трёх языков.
 * Паттерн disclosure (кнопка + список ссылок), а не role="menu": внутри обычная навигация,
 * ссылки видят поисковики. Закрывается по Esc, клику мимо и уходу фокуса.
 * Названия языков написаны на самих этих языках — человек узнаёт свой, даже не понимая текущий.
 */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      // Tab ушёл за пределы переключателя — закрываем, чтобы список не висел открытым
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={listId}
        aria-label={`${label}: ${localeMeta[current].name}`}
        className="inline-flex h-10 items-center gap-1.5 rounded-full pr-2.5 pl-3 text-sm font-bold tracking-wide text-ink transition-colors hover:bg-accent-soft hover:text-accent-ink aria-expanded:bg-accent-soft aria-expanded:text-accent-ink"
      >
        <Globe className="size-[18px]" aria-hidden="true" />
        {localeMeta[current].label}
        {/* Стрелка — только от sm: на 360px шапке каждый пиксель на счету */}
        <ChevronDown
          className={`hidden size-4 transition-transform duration-200 sm:block ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <ul
        id={listId}
        hidden={!open}
        className="absolute top-full right-0 z-50 mt-2 min-w-44 rounded-2xl bg-surface p-1.5 shadow-lg ring-1 ring-line"
      >
        {locales.map((locale) => {
          const { label: short, name } = localeMeta[locale];
          const isCurrent = locale === current;
          return (
            <li key={locale}>
              <a
                href={localePath(locale)}
                hrefLang={locale}
                lang={locale}
                aria-current={isCurrent ? 'page' : undefined}
                className={`flex min-h-11 items-center gap-3 rounded-xl px-3 font-semibold transition-colors ${
                  isCurrent ? 'bg-accent-soft text-accent-ink' : 'text-ink hover:bg-accent-soft hover:text-accent-ink'
                }`}
              >
                <span className="flex-1">{name}</span>
                {isCurrent ? (
                  <Check className="size-4" aria-hidden="true" strokeWidth={2.5} />
                ) : (
                  <span className="text-xs font-bold tracking-wide text-ink-soft" aria-hidden="true">
                    {short}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
