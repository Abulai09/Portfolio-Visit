import { Briefcase, Mail, Send } from 'lucide-react';
import { site } from '@/config/site';
import { emailLink, externalLinkProps, telegramLink } from '@/lib/links';
import { WhatsAppButton, buttonClass } from '@/components/ui/Button';

export function Contacts() {
  const c = site.finalCta;
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
        <div className="reveal card mx-auto max-w-4xl px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2 id="contacts-title" className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            {c.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-soft">{c.text}</p>

          <WhatsAppButton message={c.whatsappMessage} size="lg" className="mt-9 w-full sm:w-auto">
            {c.whatsappLabel}
          </WhatsAppButton>

          <ul className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            {secondary.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? externalLinkProps : {})}
                  className={buttonClass('secondary', 'md', 'w-full sm:w-auto')}
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
