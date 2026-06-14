/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Compile the shared workspace packages (they ship TypeScript source).
  transpilePackages: ['@portfolio/content', '@portfolio/types'],
  // three.js ships ESM; keep transpilation predictable.
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
