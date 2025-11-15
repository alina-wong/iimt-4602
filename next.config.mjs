/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ['@mui/x-data-grid', '@mui/material', '@mui/x-charts']
  }
};

export default nextConfig;
