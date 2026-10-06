import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/config/site';
import { getContent } from '@/config/content';
import type { Locale } from '@/config/i18n';

// Картинка для превью ссылки в WhatsApp, Telegram и соцсетях — своя на каждом языке.
// Маршруты: app/(default)/opengraph-image.tsx и app/[lang]/opengraph-image.tsx.

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), 'node_modules/@fontsource/manrope/files');

export async function renderOgImage(locale: Locale) {
  const t = getContent(locale);

  // Встроенный шрифт ImageResponse не знает кириллицу — подключаем Manrope:
  // cyrillic-ext нужен для казахских букв (ә, ғ, қ, ң, ө, ү, һ).
  // Знака ₸ в Manrope нет, поэтому в ogSubtitle цена пишется словом.
  const [cyr, cyrExt, lat] = await Promise.all(
    ['cyrillic', 'cyrillic-ext', 'latin'].map((subset) =>
      readFile(join(fontDir, `manrope-${subset}-800-normal.woff`)),
    ),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'radial-gradient(circle at 85% 15%, #ff5a3c 0%, rgba(255,90,60,0) 38%), linear-gradient(135deg, #160c4d 0%, #2e1a8c 100%)',
          color: 'white',
          fontFamily: 'Manrope',
        }}
      >
        <div style={{ fontSize: 30, opacity: 0.85 }}>{`${site.brandName} — ${t.tagline}`}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, lineHeight: 1.08, letterSpacing: -2 }}>{t.seo.ogTitle}</div>
          <div style={{ fontSize: 34, marginTop: 28, opacity: 0.9 }}>{t.seo.ogSubtitle}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Manrope', data: cyr, weight: 800, style: 'normal' },
        { name: 'Manrope', data: cyrExt, weight: 800, style: 'normal' },
        { name: 'Manrope', data: lat, weight: 800, style: 'normal' },
      ],
    },
  );
}
