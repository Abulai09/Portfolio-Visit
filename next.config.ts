import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Полностью статический сайт: `npm run build` кладёт готовые файлы в папку out/
  output: 'export',
};

export default nextConfig;
