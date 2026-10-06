import type { Content } from '@/config/content';
import { externalLinkProps, waLink } from '@/lib/links';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export function FloatingWhatsApp({ t }: { t: Content }) {
  return (
    <a
      href={waLink(t.floatingCta.message)}
      {...externalLinkProps}
      aria-label={t.floatingCta.ariaLabel}
      className="fixed right-4 bottom-4 z-50 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/20 transition-transform duration-200 hover:scale-105 hover:bg-whatsapp-strong sm:right-6 sm:bottom-6 sm:size-16"
      style={{ marginBottom: 'env(safe-area-inset-bottom)' }}
    >
      <WhatsAppIcon className="size-7 sm:size-8" />
    </a>
  );
}
