// Делает скриншоты демо-сайтов из design/demos/*.html и кладёт их в public/portfolio/
// в формате WebP двух размеров (для телефона и для десктопа).
//
// Запуск: npm run portfolio:capture
// Нужен установленный Chrome (или Edge). Путь можно задать переменной CHROME_PATH.
//
// Свои реальные работы сюда добавлять не нужно: положите их скриншоты
// (1440×900 или 2880×1800) прямо в public/portfolio/ и пропишите в config/site.ts.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const ROOT = resolve(import.meta.dirname, '..');
const DEMOS_DIR = join(ROOT, 'design/demos');
const OUT_DIR = join(ROOT, 'public/portfolio');
const TMP_DIR = join(ROOT, '.capture-tmp');

const VIEWPORT = { width: 1440, height: 900 };
const OUTPUT_WIDTHS = [960, 1600];

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

function findChrome() {
  const found = CHROME_CANDIDATES.find((p) => existsSync(p));
  if (!found) {
    throw new Error('Chrome не найден. Укажите путь в переменной CHROME_PATH.');
  }
  return found;
}

async function main() {
  const chrome = findChrome();
  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(TMP_DIR, { recursive: true });

  const demos = readdirSync(DEMOS_DIR).filter((f) => f.endsWith('.html'));
  for (const file of demos) {
    const slug = file.replace(/\.html$/, '');
    const png = join(TMP_DIR, `${slug}.png`);

    execFileSync(chrome, [
      '--headless=new',
      '--hide-scrollbars',
      '--force-device-scale-factor=2',
      `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
      // Время на загрузку веб-шрифтов и фото до снимка
      '--virtual-time-budget=15000',
      `--screenshot=${png}`,
      pathToFileURL(join(DEMOS_DIR, file)).href,
    ], { stdio: 'ignore' });

    for (const width of OUTPUT_WIDTHS) {
      const out = join(OUT_DIR, `${slug}-${width}.webp`);
      await sharp(png).resize({ width }).webp({ quality: 82 }).toFile(out);
      console.log(`✓ ${out.replace(ROOT, '.')}`);
    }
  }

  rmSync(TMP_DIR, { recursive: true, force: true });
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
