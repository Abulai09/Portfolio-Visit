import { site } from '@/config/site';
import { WhatsAppButton } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MobileMenu } from './MobileMenu';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-surface/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a href="#top" className="flex min-h-11 items-center gap-2 font-extrabold tracking-tight">
          <span className="text-lg whitespace-nowrap text-ink">{site.brand.name}</span>
          <span className="hidden text-sm font-medium whitespace-nowrap text-ink-soft 2xl:inline">— {site.brand.tagline}</span>
        </a>

        <nav aria-label="Основное меню" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3.5 text-[15px] font-medium whitespace-nowrap text-ink-soft transition-colors hover:bg-accent-soft hover:text-accent-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle />
          {/* На мобильном кнопка в бургер-меню и плавающая — в шапке не помещается */}
          <div className="hidden sm:block">
            <WhatsAppButton message={site.headerCta.message} className="whitespace-nowrap">
              {site.headerCta.label}
            </WhatsAppButton>
          </div>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
