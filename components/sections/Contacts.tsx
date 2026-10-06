import { Briefcase, Mail, Send } from 'lucide-react';
import type { Content } from '@/config/content';
import { site } from '@/config/site';
import { emailLink, externalLinkProps, telegramLink } from '@/lib/links';
import { WhatsAppButton } from '@/components/ui/Button';

export function Contacts({ t }: { t: Content }) {
  const c = t.finalCta;
  const secondary = [
    { label: c.telegramLabel, href: telegramLink(), icon: Send, external: true },
    { label: c.emailLabel, href: emailLink(), icon: Mail, external: false },
    {
      label: c.portfolioLabel,
      href: site.contacts.portfolioUrl,
      icon: Briefcase,
      external: !site.contacts.portfolioUrl.startsWith('#'),
    },
  ];

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="scroll-mt-20 py-16 sm:py-24">
      <div className="container-page">
        <div className="reveal surface-vivid mx-auto max-w-4xl rounded-[2rem] px-6 py-12 text-center shadow-2xl shadow-accent/30 sm:px-12 sm:py-16">
          <h2 id="contacts-title" className="text-3xl font-extrabold tracking-tight text-balance text-white sm:text-4xl">
            {c.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">{c.text}</p>

          <WhatsAppButton message={c.whatsappMessage} size="lg" className="mt-9 w-full sm:w-auto">
            {c.whatsappLabel}
          </WhatsAppButton>

          <ul className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            {secondary.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? externalLinkProps : {})}
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-black/15 px-5 py-2.5 text-[15px] font-semibold text-white ring-1 ring-white/35 transition-colors hover:bg-black/25 sm:w-auto"
                >
                  <Icon className="size-5" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
