import type { ReactNode } from 'react';
import { externalLinkProps, waLink } from '@/lib/links';
import { WhatsAppIcon } from './WhatsAppIcon';

type Variant = 'primary' | 'whatsapp' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 text-center';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-strong shadow-sm',
  whatsapp: 'bg-whatsapp text-white hover:bg-whatsapp-strong shadow-sm',
  secondary: 'bg-surface text-ink ring-1 ring-line hover:ring-accent-ink hover:text-accent-ink',
  ghost: 'text-accent-ink hover:bg-accent-soft',
};

const sizes: Record<Size, string> = {
  md: 'min-h-11 px-5 py-2.5 text-[15px]',
  lg: 'min-h-14 px-5 py-3.5 text-base sm:px-7 sm:text-lg',
};

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

/** Кнопка-ссылка на WhatsApp с готовым сообщением. Открывается в новой вкладке. */
export function WhatsAppButton({
  message,
  children,
  variant = 'whatsapp',
  size = 'md',
  className = '',
  withIcon = true,
}: {
  message: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  withIcon?: boolean;
}) {
  return (
    <a href={waLink(message)} {...externalLinkProps} className={buttonClass(variant, size, className)}>
      {withIcon && <WhatsAppIcon className={size === 'lg' ? 'size-6' : 'size-5'} />}
      {children}
    </a>
  );
}
