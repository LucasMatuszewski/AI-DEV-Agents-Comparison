import { getRequestConfig } from 'next-intl/server';
import { Locales, routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  // Ensure a valid locale is used
  //   let locale = (await requestLocale) as (typeof routing.locales)[number];
  //   if (!locale || !routing.locales.includes(locale)) {
  //     locale = routing.defaultLocale;
  //   }

  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as Locales)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
