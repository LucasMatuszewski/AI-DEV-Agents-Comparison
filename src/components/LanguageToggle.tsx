'use client';

import { useRouter, usePathname, Locales, routing } from '@/i18n/routing';
import { ChangeEvent } from 'react';
import { useParams } from 'next/navigation';

export default function LanguageToggle() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

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
      className="bg-black text-white border border-white p-1"
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
