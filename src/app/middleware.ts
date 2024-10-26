import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'pl'],
  defaultLocale: 'en',
});

export const config = {
  // Skip paths that shouldn't be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
