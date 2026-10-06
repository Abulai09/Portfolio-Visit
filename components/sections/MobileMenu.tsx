'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { WhatsAppButton } from '@/components/ui/Button';

export function MobileMenu({
  nav,
  cta,
  labels,
}: {
  nav: { label: string; href: string }[];
  cta: { label: string; message: string };
  labels: { open: string; close: string; nav: string };
}) {
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
        aria-label={open ? labels.close : labels.open}
        className="inline-flex size-11 items-center justify-center rounded-full bg-surface text-ink ring-1 ring-line transition-colors hover:bg-accent-soft hover:text-accent-ink"
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-line bg-surface shadow-lg"
      >
        <div className="container-page py-4">
          <nav aria-label={labels.nav}>
            <ul className="flex flex-col">
              {nav.map((item) => (
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
          </nav>
          <WhatsAppButton message={cta.message} size="lg" className="mt-4 w-full">
            {cta.label}
          </WhatsAppButton>
        </div>
      </div>
    </div>
  );
}
