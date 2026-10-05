import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/config/site';

// Картинка для превью ссылки в WhatsApp, Telegram и соцсетях. Генерируется при сборке.
export const dynamic = 'force-static';
export const alt = site.seo.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const fontDir = join(process.cwd(), 'node_modules/@fontsource/manrope/files');

export default async function Image() {
  // Встроенный шрифт ImageResponse не знает кириллицу — подключаем Manrope (кириллица + латиница/цифры).
  // Знака ₸ в Manrope нет, поэтому в ogSubtitle цена пишется словом «тенге».
  const [cyr, lat] = await Promise.all([
    readFile(join(fontDir, 'manrope-cyrillic-800-normal.woff')),
    readFile(join(fontDir, 'manrope-latin-800-normal.woff')),
  ]);

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
        <div style={{ fontSize: 30, opacity: 0.85 }}>{`${site.brand.name} — ${site.brand.tagline}`}</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 76, lineHeight: 1.08, letterSpacing: -2 }}>{site.seo.ogTitle}</div>
          <div style={{ fontSize: 34, marginTop: 28, opacity: 0.9 }}>{site.seo.ogSubtitle}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Manrope', data: cyr, weight: 800, style: 'normal' },
        { name: 'Manrope', data: lat, weight: 800, style: 'normal' },
      ],
    },
  );
}
