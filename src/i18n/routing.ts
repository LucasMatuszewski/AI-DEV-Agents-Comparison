// src/i18n/routing.ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export enum Locales {
  en = 'en',
  pl = 'pl',
}

// Define the supported locales and the default locale
export const routing = defineRouting({
  locales: [...Object.values(Locales)],
  defaultLocale: Locales.en,
});

// Create navigation APIs that respect the routing configuration
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
