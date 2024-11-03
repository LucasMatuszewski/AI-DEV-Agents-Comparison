'use client';

import { useRouter, usePathname, Locales, routing } from '@/i18n/routing';
import { ChangeEvent } from 'react';
import { useParams } from 'next/navigation';

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  /* TODO: locale toggle/switcher example & email confirmation (with mydevil email server?)
   * - analyze https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/components/LocaleSwitcherSelect.tsx
   * - and https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/components/LocaleSwitcher.tsx
   * - and routing with translated paths: https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/i18n/routing.ts
   * - request with HMR fix for Turbopack: https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/i18n/request.ts
   * - and use the best approach to switch language in this app (ask Sonnet/GPT)
   *
   * TODO: - Add email confirmation !!!
   */

  // Extract the current locale from the URL parameters
  const currentLocale = (params.locale as Locales) || routing.defaultLocale;

  // Access supported locales from routing configuration
  const locales = routing.locales;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value as Locales;

    // Navigate to the same pathname with the new locale
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <select
      value={currentLocale}
      onChange={handleChange}
      className="bg-black text-white p-1 cursor-pointer"
      aria-label="Select Language"
    >
      {locales.map((locale: Locales) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
