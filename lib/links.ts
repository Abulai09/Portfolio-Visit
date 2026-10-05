import { site } from '@/config/site';

/** Ссылка на WhatsApp с заранее заполненным сообщением. */
export function waLink(text: string): string {
  return `https://wa.me/${site.contacts.whatsappPhone}?text=${encodeURIComponent(text)}`;
}

export function telegramLink(): string {
  return `https://t.me/${site.contacts.telegram}`;
}

export function emailLink(): string {
  return `mailto:${site.contacts.email}`;
}

/** Атрибуты для внешних ссылок: новая вкладка без доступа к window.opener. */
export const externalLinkProps = {
  target: '_blank',
  rel: 'noopener noreferrer',
} as const;
