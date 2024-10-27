// src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

// TODO: add more configs in middleware based on:
// https://next-intl-docs.vercel.app/docs/routing/middleware

export const config = {
  // Apply middleware to the root and locale-based paths
  matcher: ['/', '/(en|pl)/:path*'],
};
