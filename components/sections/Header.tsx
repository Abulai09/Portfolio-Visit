import type { Content } from '@/config/content';
import type { Locale } from '@/config/i18n';
import { site } from '@/config/site';
import { WhatsAppButton } from '@/components/ui/Button';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { MobileMenu } from './MobileMenu';

/**
 * Шапка из трёх зон: бренд — меню (по центру, от xl) — управление.
 * Справа три вида элементов, все высотой 44px: настройки (язык │ тема) в одной капсуле с обводкой,
 * единственное действие с заливкой (WhatsApp) и бургер с той же обводкой, что у капсулы.
 */
export function Header({ t, locale }: { t: Content; locale: Locale }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-surface/85 backdrop-blur-md">
      <div aria-hidden="true" className="brand-stripe h-[3px]" />
      <div className="container-page flex h-16 items-center gap-3 xl:gap-6">
        <a href="#top" className="mr-auto flex min-h-11 items-center font-extrabold tracking-tight xl:mr-0">
          <span className="text-base whitespace-nowrap text-ink min-[360px]:text-lg">{site.brandName}</span>
        </a>

        <nav aria-label={t.ui.mainNav} className="hidden flex-1 justify-center xl:flex">
          <ul className="flex items-center gap-0.5">
            {t.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-2.5 text-[15px] font-medium whitespace-nowrap text-ink-soft transition-colors hover:bg-accent-soft hover:text-accent-ink 2xl:px-3"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full bg-surface p-0.5 ring-1 ring-line">
            <LanguageSwitcher current={locale} label={t.ui.languageSwitcher} />
            <span aria-hidden="true" className="h-5 w-px bg-line" />
            <ThemeToggle label={t.ui.themeToggle} title={t.ui.themeToggleTitle} />
          </div>
          {/* На телефоне WhatsApp — плавающая кнопка и пункт в меню; в шапке 360px ему нет места */}
          <div className="hidden sm:block">
            <WhatsAppButton message={t.headerCta.message} className="whitespace-nowrap">
              {t.headerCta.shortLabel}
            </WhatsAppButton>
          </div>
          <MobileMenu
            nav={t.nav}
            cta={t.headerCta}
            labels={{ open: t.ui.openMenu, close: t.ui.closeMenu, nav: t.ui.mobileNav }}
          />
        </div>
      </div>
    </header>
  );
}
