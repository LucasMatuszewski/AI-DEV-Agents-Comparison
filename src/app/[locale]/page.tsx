'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import LanguageToggle from '@/components/LanguageToggle';
// import MakingOf from '@/components/MaakingOf';
import { positions } from '@/data/positions';
import { industries } from '@/data/industries';
import { Country, fetchCountries } from '@/data/countries';

export default function LandingPage() {
  const t = useTranslations('HomePage');
  const [email, setEmail] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [message, setMessage] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [additionalData, setAdditionalData] = useState({
    name: '',
    position: '',
    company: '',
    country: '',
    industry: '',
  });
  const [errors, setErrors] = useState<{ email?: string }>({});

  // TODO: refactor this to server component and move hooks to separate client components.
  // To use locales here after server refactor, we need to use:
  // Set request locale for static rendering
  // setRequestLocale(locale);
  // Once the request locale is set, you can call hooks from `next-intl`
  // const t = useTranslations('IndexPage');

  useEffect(() => {
    const loadCountries = async () => {
      const countriesData = await fetchCountries();
      setCountries(countriesData);
    };
    loadCountries();
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrors({ email: t('emailValidationError') });
      return;
    }
    setErrors({});
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(t('thankYouMessage'));
        setFormStep(2);
      } else {
        setMessage(
          result.error || 'An error occurred. Please try again later.'
        );
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  const handleAdditionalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, position, company, country, industry } = additionalData;
    if (!name && !position && !company && !country && !industry) {
      setMessage('Please fill at least one field.');
      return;
    }
    try {
      const response = await fetch('/api/update', {
        method: 'POST',
        body: JSON.stringify({ email, ...additionalData }),
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(t('thankYouAgainMessage'));
        setFormStep(3);
      } else {
        setMessage(
          result.error || 'An error occurred. Please try again later.'
        );
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setAdditionalData({
      ...additionalData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <div className="absolute top-0 right-0 z-10 p-4">
        <LanguageToggle />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col-reverse md:flex-row items-center flex-grow">
        <div className="md:w-1/2 w-full">
          <Image
            src="/images/1024px-Hero-Edukey-Cooking-AI-for-Sales-and-Marketing.jpg"
            alt={t('altText')}
            width={500}
            height={500}
            priority
            className="object-cover w-full h-full md:object-[center_center] object-[60%_40%]"
          />
        </div>

        <div className="md:w-1/2 w-full md:pl-8">
          <div className="mb-4 md:mb-8">
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

          <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-12 max-w-96">
            {t('headerTitle')
              .split(' ')
              .map((word, index) =>
                word.toLowerCase() === 'acceleration' ||
                word.toLowerCase() === 'akcelerująca' ? (
                  <span key={index} className="text-red">
                    {word}{' '}
                  </span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
          </h1>

          <p className="mb-4 md:mb-6">{t('headerSubtitle')}</p>

          {(formStep === 1 || formStep === 2) && (
            <p className="mb-4 md:mb-6">{t('joinWaitingList')}</p>
          )}

          {message && (
            <p className="mb-4 p-4 text-black bg-red-900 rounded-sm">
              {message}
            </p>
          )}

          {formStep === 1 && (
            <form onSubmit={handleEmailSubmit} className="mb-4">
              <div className="flex flex-col md:flex-row">
                <input
                  type="email"
                  name="email"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 text-black md:max-w-72 mb-2 md:mb-0 md:mr-2 rounded-sm"
                  required
                />
                <button
                  type="submit"
                  className="bg-red hover:bg-red-300 rounded-sm text-white font-bold py-2 px-6 transition duration-300 ease-in-out whitespace-nowrap"
                >
                  {t('joinButton')}
                </button>
              </div>
              {errors.email && <p className="text-red mt-2">{errors.email}</p>}
            </form>
          )}

          {formStep === 2 && (
            <form onSubmit={handleAdditionalSubmit} className="mb-4">
              <div className="md:grid md:grid-cols-2 md:gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder={t('namePlaceholder')}
                  value={additionalData.name}
                  onChange={handleChange}
                  className="w-full p-2 mb-2 text-black rounded-sm"
                />
                <input
                  type="text"
                  name="company"
                  placeholder={t('companyPlaceholder')}
                  value={additionalData.company}
                  onChange={handleChange}
                  className="w-full p-2 mb-2 text-black rounded-sm"
                />
                <select
                  name="position"
                  value={additionalData.position}
                  onChange={handleChange}
                  className="w-full p-2 mb-2 text-black rounded-sm"
                >
                  <option value="">{t('positionPlaceholder')}</option>
                  {positions.map((position) => (
                    <option key={position} value={position}>
                      {position}
                    </option>
                  ))}
                </select>
                <select
                  name="industry"
                  value={additionalData.industry}
                  onChange={handleChange}
                  className="w-full p-2 mb-2 text-black rounded-sm"
                >
                  <option value="">{t('industryPlaceholder')}</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry}>
                      {industry}
                    </option>
                  ))}
                </select>
              </div>
              <select
                name="country"
                value={additionalData.country}
                onChange={handleChange}
                className="w-full p-2 md:my-3 text-black rounded-sm"
              >
                <option value="">{t('countryPlaceholder')}</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-red hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 transition duration-300 ease-in-out w-full rounded-sm"
              >
                {t('tellUsMoreButton')}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* TODO: in Payload add Blog section here */}
      {/* <div className="container mx-auto px-4 py-8">
        <MakingOf />
      </div> */}

      <footer className="mt-auto py-6 border-t border-gray-800">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <Image
            src="/images/logo-edukey.svg"
            alt="Edukey Logo"
            width={120}
            height={48}
            className="w-[120px] h-auto mb-4"
          />
          <p className="text-gray-400">{t('footerText')}</p>
        </div>
      </footer>
    </div>
  );
}
