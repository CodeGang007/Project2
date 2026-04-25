import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.dynai.com' },
      { protocol: 'https', hostname: 'dynai.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'placehold.co' }
    ]
  },
  experimental: {
    // framer-motion intentionally excluded — the optimizer's per-export chunking
    // is fragile in dev mode and triggers `Cannot find module './vendor-chunks/framer-motion.js'`.
    // framer-motion ships its own tree-shaking; we don't need the experimental rewrite.
    optimizePackageImports: ['lucide-react']
  }
};

export default withNextIntl(nextConfig);
