import { useTranslations } from 'next-intl';
import Image from 'next/image';

import LanguageToggle from '@/components/LanguageToggle';
import SubscriptionForm from '@/components/SubscriptionForm';

export default function LandingPage() {
  const t = useTranslations('HomePage');

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <div className="absolute top-0 right-0 z-10 p-4">
        <LanguageToggle />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col-reverse md:flex-row items-start flex-grow">
        <div className="md:w-1/2 w-full mb-20 opacity-0 animate-fade-in-up-delay-2 md:animate-fade-in-up">
          <Image
            src="/images/1024px-Hero-Edukey-Cooking-AI-for-Sales-and-Marketing.webp"
            alt={t('altText')}
            width={624}
            height={624}
            priority
            className="object-cover w-full h-full md:object-[center_center] object-[60%_40%]"
          />
        </div>

        <div className="md:w-1/2 w-full md:pl-8 text-center md:text-left">
          <div className="mb-4 md:mb-8 flex flex-col items-center md:items-start opacity-0 animate-fade-in-up md:animate-fade-in-up-delay">
            <Image
              src="/images/logo-edukey.svg"
              alt="Edukey Logo"
              priority
              width={400}
              height={160}
              className="w-[200px] md:w-[400px] h-auto mb-2 md:mb-4"
            />
            <span className="text-lg font-bold">{t('isCooking')}</span>
          </div>

          <div className="opacity-0 animate-fade-in-up-delay md:animate-fade-in-up-delay-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-12 max-w-[28rem] mx-auto md:mx-0">
              {t.rich('headerTitle', {
                red: (chunks) => <span className="text-red">{chunks}</span>,
              })}
            </h1>

            <p className="mb-4 md:mb-6">
              {t.rich('headerSubtitle', {
                bold: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>

            <SubscriptionForm />
          </div>
        </div>
      </div>

      {/* TODO: in Payload add Blog section here */}

      <footer className="mt-auto py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <Image
            src="/images/logo-edukey.svg"
            alt="Edukey Logo"
            width={120}
            height={48}
            className="w-[120px] h-auto mb-4"
          />
          <p className="text-gray-400">
            {`© ${new Date().getFullYear().toString()} ${t('footerText')}`}
          </p>
        </div>
      </footer>
    </div>
  );
}
