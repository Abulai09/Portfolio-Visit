'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '@/config/site';
import { WhatsAppButton } from '@/components/ui/Button';

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        className="inline-flex size-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-accent-soft"
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-line bg-surface shadow-lg"
      >
        <nav aria-label="Мобильное меню" className="container-page py-4">
          <ul className="flex flex-col">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-xl px-3 text-lg font-semibold text-ink hover:bg-accent-soft hover:text-accent-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <WhatsAppButton message={site.headerCta.message} size="lg" className="mt-4 w-full">
            {site.headerCta.label}
          </WhatsAppButton>
        </nav>
      </div>
    </div>
  );
}
