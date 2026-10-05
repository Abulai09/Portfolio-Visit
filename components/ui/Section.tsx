import type { ReactNode } from 'react';

/** Фон секции: чередование лавандового, персикового и небесного вместо одного серого. */
const surfaces = {
  plain: '',
  muted: 'bg-surface-muted',
  warm: 'bg-surface-warm',
  cool: 'bg-surface-cool',
};

/** Обёртка секции: якорь, отступы, контейнер и заголовок. */
export function Section({
  id,
  title,
  subtitle,
  eyebrow,
  children,
  className = '',
  surface = 'plain',
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  surface?: keyof typeof surfaces;
}) {
  const headingId = id && title ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-20 py-16 sm:py-24 ${surfaces[surface]} ${className}`}
    >
      <div className="container-page">
        {title && (
          <header className="reveal mb-10 max-w-2xl sm:mb-14">
            {eyebrow && <p className="mb-3 font-bold text-coral-ink">{eyebrow}</p>}
            <h2 id={headingId} className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {title}
            </h2>
            {subtitle && <p className="mt-4 text-lg text-ink-soft">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
