/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { hostname: 'localhost', pathname: '**', port: '3000', protocol: 'http' },
      {
        hostname: 'ui-hippo-production.up.railway.app',
        pathname: '**',
        protocol: 'https'
      }
    ]
  }
};

export default nextConfig;
