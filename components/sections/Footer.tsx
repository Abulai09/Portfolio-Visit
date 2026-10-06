import type { Content } from '@/config/content';
import { site } from '@/config/site';

export function Footer({ t }: { t: Content }) {
  return (
    // Нижний отступ больше на мобильном, чтобы плавающая кнопка WhatsApp не закрывала ссылки
    <footer className="bg-surface-muted pb-28 sm:pb-12">
      <div aria-hidden="true" className="brand-stripe mb-10 h-1" />
      <div className="container-page flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-ink-soft">
          © {new Date().getFullYear()} {site.brandName}. {t.footer.text}
        </p>
        <nav aria-label={t.ui.footerNav}>
          <ul className="flex flex-wrap gap-x-1 gap-y-1">
            {t.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3 font-medium text-ink-soft hover:text-accent-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
