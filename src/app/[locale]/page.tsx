'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';

import LanguageToggle from '@/components/LanguageToggle';
import MakingOf from '@/components/MaakingOf';

export default function LandingPage() {
  const t = useTranslations('HomePage');
  const [email, setEmail] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [message, setMessage] = useState('');
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

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simple email validation
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
    // At least one field is required
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
      {/* Language Toggle */}
      <div className="flex justify-end p-4">
        <LanguageToggle />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex flex-col-reverse md:flex-row items-center flex-grow">
        {/* Left Side (Image) */}
        <div className="md:w-1/2 w-full">
          <Image
            src="/images/1024px-Hero-Edukey-Cooking-AI-for-Sales-and-Marketing.jpg"
            alt={t('altText')}
            width={500}
            height={500}
            className="object-cover w-full h-full md:object-center object-top"
          />
        </div>

        {/* Right Side (Text and Form) */}
        <div className="md:w-1/2 w-full md:pl-8">
          {/* Logo and Tagline */}
          <div className="flex items-center mb-4">
            <Image
              src="/images/logo-edukey.svg"
              alt="Edukey Logo"
              width={100}
              height={40}
            />
            <span className="ml-2 text-lg">{t('isCooking')}</span>
          </div>

          {/* Header */}
          <h1 className="text-4xl font-bold mb-4">
            {t('headerTitle')
              .split(' ')
              .map((word, index) =>
                word.toLowerCase() === 'acceleration' ||
                word.toLowerCase() === 'przyspieszająca' ? (
                  <span key={index} className="text-red">
                    {word}{' '}
                  </span>
                ) : (
                  <span key={index}>{word} </span>
                )
              )}
          </h1>

          {/* Subtitle */}
          <p className="mb-4">{t('headerSubtitle')}</p>

          {/* Invitation */}
          {(formStep === 1 || formStep === 2) && (
            <p className="mb-4">{t('joinWaitingList')}</p>
          )}

          {/* Form or Message */}
          {message && <p className="mb-4">{message}</p>}

          {formStep === 1 && (
            <form onSubmit={handleEmailSubmit} className="mb-4">
              <input
                type="email"
                name="email"
                placeholder={t('emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 mb-2 text-black"
                required
              />
              {errors.email && <p className="text-red-600">{errors.email}</p>}
              <button
                type="submit"
                className="bg-red hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 transition duration-300 ease-in-out"
              >
                {t('joinButton')}
              </button>
            </form>
          )}

          {formStep === 2 && (
            <form onSubmit={handleAdditionalSubmit} className="mb-4">
              <input
                type="text"
                name="name"
                placeholder={t('namePlaceholder')}
                value={additionalData.name}
                onChange={handleChange}
                className="w-full p-2 mb-2 text-black"
              />
              <select
                name="position"
                value={additionalData.position}
                onChange={handleChange}
                className="w-full p-2 mb-2 text-black"
              >
                <option value="">{t('positionPlaceholder')}</option>
                <option value="CEO">CEO</option>
                <option value="CTO">CTO</option>
                <option value="CMO">CMO</option>
                <option value="Developer">Developer</option>
                {/* Add more options as needed */}
              </select>
              <input
                type="text"
                name="company"
                placeholder={t('companyPlaceholder')}
                value={additionalData.company}
                onChange={handleChange}
                className="w-full p-2 mb-2 text-black"
              />
              <select
                name="country"
                value={additionalData.country}
                onChange={handleChange}
                className="w-full p-2 mb-2 text-black"
              >
                <option value="">{t('countryPlaceholder')}</option>
                <option value="US">United States</option>
                <option value="PL">Poland</option>
                {/* Add more countries or use a library */}
              </select>
              <select
                name="industry"
                value={additionalData.industry}
                onChange={handleChange}
                className="w-full p-2 mb-2 text-black"
              >
                <option value="">{t('industryPlaceholder')}</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                {/* Add more options as needed */}
              </select>
              <button
                type="submit"
                className="bg-red hover:bg-red-700 text-white font-bold py-2 px-4 mt-2 transition duration-300 ease-in-out"
              >
                {t('tellUsMoreButton')}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Making of Section */}
      <div className="text-center py-8">
        <p>{t('makingOfText')}</p>
        <MakingOf />
      </div>

      {/* Footer */}
      <footer className="text-center py-4 border-t border-gray-700">
        <Image
          src="/images/logo-edukey.svg"
          alt="Edukey Logo"
          width={80}
          height={32}
        />
        <p>{t('footerText')}</p>
      </footer>
    </div>
  );
}
