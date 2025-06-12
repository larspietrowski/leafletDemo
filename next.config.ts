import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// Specify the path to the i18n configuration
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // Next.js 15 with App Router uses middleware for i18n instead of this config
  // The middleware.ts file handles the locale detection and routing
  
  // Konfiguration für Leaflet
  transpilePackages: ['react-leaflet'],
  
  // Konfiguration für externe Bilder (für Leaflet-Marker)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unpkg.com',
        pathname: '/leaflet@**/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
