import { ReactNode } from 'react';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';

import { NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getMessages } from 'next-intl/server';
import { Locales, routing } from '@/i18n/routing';

// Variable Fonts - TODO: how to use them? They are not implemented now
const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

interface LocaleLayoutProps {
  children: ReactNode;
  params: {
    locale: Locales;
  };
}

export async function generateStaticParams() {
  return routing.locales.map((locale: Locales) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locales };
}) {
  // Await params to resolve dynamic values
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: t('titleTag'),
    description: t('metaDescription'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>) {
  // Await params to resolve dynamic values
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale)) {
    notFound(); /* TODO: redirect to default locale? */
  }

  // Set request locale for static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/images/favicon-edukey-2024.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
