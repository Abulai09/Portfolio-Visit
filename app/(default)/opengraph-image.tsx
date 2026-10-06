import { ogSize, renderOgImage } from '../_site/og-image';

export const dynamic = 'force-static';
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return renderOgImage('ru');
}
