// next.config.ts
import { NextConfig } from 'next';
const createNextIntlPlugin = require('next-intl/plugin');

// Initialize the plugin with the path to the config file
// const withNextIntl = createNextIntlPlugin('./next-intl.config.js');
const withNextIntl = createNextIntlPlugin();

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone', // .next/standalone directory, that only includes necessary files/dependencies. Useful for self-hosting in a Docker container.
  // assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '', // Ensures correct asset paths
};

export default withNextIntl(nextConfig);
