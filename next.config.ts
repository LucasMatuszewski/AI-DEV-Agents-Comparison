// next.config.ts
import { NextConfig } from 'next';
const createNextIntlPlugin = require('next-intl/plugin');

// Initialize the plugin with the path to the config file
// const withNextIntl = createNextIntlPlugin('./next-intl.config.js');
const withNextIntl = createNextIntlPlugin();

/** @type {NextConfig} */
const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);
