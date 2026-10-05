# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

Reply to the user in Russian.

## Project

A one-page selling site for a Kazakhstan-based developer offering turnkey websites. The primary niche is **online stores and marketplaces**, and these must dominate the page; other site types are a secondary block. Every call to action leads to WhatsApp. All copy is in Russian and prices are in tenge (₸). The original spec is `prompt-sait-vizitka.md` (in Russian); check it before changing content or structure.

## Commands

- `npm run dev`: dev server
- `npm run build`: static export to `out/` (must pass)
- `npm run lint`: ESLint flat config (must pass)
- `npx serve out`: preview the built static site
- `npm run portfolio:capture`: re-screenshot the demo sites in `design/demos/*.html` with headless Chrome (2×) and write `public/portfolio/<slug>-960.webp` and `-1600.webp` with sharp. Set `CHROME_PATH` if Chrome isn't found.

There is no test suite.

## Stack and hard constraints

- Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4 (CSS-first config in `app/globals.css`, with no tailwind.config). Next 16 has breaking changes, so check `node_modules/next/dist/docs/` before using unfamiliar APIs.
- `output: 'export'`: fully static. No API routes, server actions or runtime data. Metadata routes (`robots.ts`, `sitemap.ts`, `opengraph-image.tsx`) need `export const dynamic = 'force-static'`.
- Only `lucide-react` is allowed as a UI dependency (`sharp` is a dev-only dependency used by the capture script). Animations are CSS-only. Target Lighthouse 95+ on mobile, with no horizontal scroll at 360px.

## Architecture

- **`config/site.ts` is the single source of all content**: texts, prices, packages, add-ons, FAQ, contacts and WhatsApp messages. Components only read from it and never hardcode copy. Prices are `Price` objects (`amount` / `from` / `unit` / `label`) and are rendered only through `formatPrice` in `lib/format.ts`. Icons are referenced in the config as `IconName` strings and mapped to lucide components in `components/ui/Icon.tsx`.
- **WhatsApp links** are built with `waLink()` in `lib/links.ts`. Use `WhatsAppButton` (`components/ui/Button.tsx`), which applies `target="_blank"` and `rel="noopener noreferrer"`.
- **Sections** live in `components/sections/` and are composed in `app/page.tsx`. The nav and footer depend on these anchor ids: `packages`, `marketplace`, `other-sites`, `addons`, `process`, `contacts`. Almost everything is a server component; the only client components are `MobileMenu`, `RevealObserver`, `PortfolioCarousel` and `ThemeToggle`.
- **Scroll reveal**: add the `reveal` class to an element. Elements are hidden only under `html.reveal-ready`, which `RevealObserver` sets after hydration, once it has marked already-visible items as `is-visible`. If JS fails to load, content stays visible. Don't put `reveal` on hero content, because that hurts LCP.
- **Portfolio**: `site.portfolio.items` in the config feeds `Portfolio.tsx` (a server component that builds the WhatsApp hrefs, because config functions can't be passed to client components) and `PortfolioCarousel.tsx` (native scroll-snap; the active slide is computed from scroll position on rAF). `components/ui/MacBook.tsx` is a pure-CSS frame for 16:10 screenshots that uses `<img srcSet>`, since `next/image` can't optimize with static export. The current items are design concepts (`concept: true` shows a «Концепт дизайна» tag). Never present concepts as completed client work. `design/demos/` holds their HTML sources (Unsplash photos, Google Fonts with Cyrillic support) and isn't served. `HeroShowcase.tsx` reuses the same screenshots on desktop only.
- **Theme (light/dark)**: the device setting (`prefers-color-scheme`) is the default. A manual choice is stored in `localStorage.theme` and applied as `html[data-theme]` by `themeInitScript` (`lib/theme.ts`), which is inlined in `<head>` before paint so the wrong theme never flashes. Choosing the theme that matches the device clears the override. Dark tokens live in `globals.css` in two blocks that must stay identical (the media query and `[data-theme='dark']`). The toggle icon is switched by CSS (`.theme-icon-*`), not React state, to avoid a hydration mismatch. Never hardcode `bg-white` or `text-accent` on theme-aware surfaces: use `bg-surface`, `text-accent-ink` and `text-coral-ink`. The `night` sections (portfolio, marketplace) stay dark in both themes, so `text-white` is fine there.
- **Config validation**: `config/validate.ts` runs at build time from `layout.tsx`. Invalid contacts (a phone with `+` or spaces, a `portfolioUrl` that is neither https nor a `#anchor`, a malformed Telegram username) and missing portfolio image files fail the build; leftover placeholders only print a warning. Extend it when adding new contact or URL fields.
- **Security headers** live in `vercel.json` (static export ignores `headers()` in next.config). The CSP needs `script-src 'unsafe-inline'` because Next inlines hydration scripts; this is accepted since the site has no user input. `frame-ancestors 'none'` blocks iframes, including your own local iframe tests, so test narrow widths on a server without those headers. If you add an external resource (analytics, fonts, images), update the CSP.
- **SEO**: metadata lives in `layout.tsx` (`metadataBase` comes from `site.siteUrl`). JSON-LD is in `components/JsonLd.tsx` and is generated from the same config. The OG image is built at build time in `app/opengraph-image.tsx`.

## Gotchas

- Don't put `hidden` together with `inline-flex` on the same element (the `buttonClass` styles include `inline-flex`), because `inline-flex` wins. Wrap the element in a `hidden sm:block` container instead.
- Manrope has no ₸ glyph. On the page, the browser falls back to the system font for it. In the OG image (Satori), ₸ breaks rendering, so `seo.ogSubtitle` writes «тенге» instead. The OG fonts are `.woff` files from `@fontsource/manrope`, because Satori can't read woff2.
- The `/opengraph-image` file is exported without an extension, so `vercel.json` sets `Content-Type: image/png` for it. On other hosts, configure the same header or link previews break.
- Palette roles: `accent` is the background of buttons with white text, and `accent-ink` is for text, icons and borders. Dark mode needs different values for those two roles, so never use `text-accent`. `coral` (`#ff5a3c`) is graphic-only (icons, glow, dots), because it has only 3.1:1 contrast on white. Use `coral-ink` only for coral text (it flips light in dark mode), `coral-light` on `night` surfaces, and `bg-coral text-night` for badges. Dark sections need the `surface-dark` class so the focus ring turns `coral-light`.
- Reveal transitions only on `.is-visible` (the appear direction). Putting the transition on the hidden state made ~50 off-screen blocks animate at load.
- Avoid `filter: blur` on large or repeated elements (the carousel glow, laptop shadows). Radial gradients look the same and are far cheaper.
- Headless Chrome can't go narrower than ~500px. To check 360px, render the page inside a 360px iframe.
- Demo sites: Space Grotesk and Fraunces have no Cyrillic glyphs (they fall back to a serif). Pick Google Fonts with Cyrillic support (Unbounded, Lora, Cormorant, Rubik, Inter).
- The WhatsApp green is darkened to `#15803d`, because white text on the brand color `#25D366` fails WCAG AA.

## Content caveat

Only the «Пробный» package price (250 000 ₸) is confirmed. All other prices are drafts. Contacts are real; `siteUrl` is still a placeholder. Remind the user about prices and `siteUrl` before any deploy. The user asked not to show technologies (frameworks, databases) to clients: describe features by their benefit, never by the stack.
