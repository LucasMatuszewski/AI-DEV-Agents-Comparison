'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState, useMemo, useRef } from 'react';
import type { Country } from '@/data/countries';
import { fetchCountries } from '@/data/countries';
import { useTranslatedLists, ListNames } from '@/hooks/useTranslatedLists';

type FormData = {
  name: string;
  position: string;
  company: string;
  country: string;
  industry: string;
};

export default function SubscriptionForm() {
  const t = useTranslations('Forms');
  const positions = useTranslatedLists(ListNames.Positions);
  const industries = useTranslatedLists(ListNames.Industries);
  const [email, setEmail] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success'>('error');
  const [countries, setCountries] = useState<Country[]>([]);
  const [additionalData, setAdditionalData] = useState<FormData>({
    name: '',
    position: '',
    company: '',
    country: '',
    industry: '',
  });
  const [errors, setErrors] = useState<{ email?: string }>({});
  const formRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();

  const positionOptions = useMemo(
    () =>
      positions.map((position) => (
        <option key={position} value={position}>
          {position}
        </option>
      )),
    [positions]
  );

  const industryOptions = useMemo(
    () =>
      industries.map((industry) => (
        <option key={industry} value={industry}>
          {industry}
        </option>
      )),
    [industries]
  );

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
        body: JSON.stringify({ email, locale }),
        headers: { 'Content-Type': 'application/json' },
      });
      const result = await response.json();

      if (response.ok) {
        setMessage(t(result.message));
        setMessageType('success');
        setFormStep(2);
      } else {
        setMessage(t(result.error));
        setMessageType('error');
      }
    } catch (error) {
      console.error(error);
      setMessage(t('apiErrors.internalServerError'));
      setMessageType('error');
    }
  };

  const handleAdditionalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, position, company, country, industry } = additionalData;
    if (!name && !position && !company && !country && !industry) {
      setMessage(t('fillOneFieldError'));
      setMessageType('error');
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
        setMessageType('success');
        setFormStep(3);
      } else {
        setMessage(t(result.error || 'apiErrors.internalServerError'));
        setMessageType('error');
      }
    } catch (error) {
      console.error(error);
      setMessage(t('apiErrors.internalServerError'));
      setMessageType('error');
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

  useEffect(() => {
    if (formStep === 2 && formRef.current) {
      const yOffset = -20; // Offset to account for spacing
      const y =
        formRef.current.getBoundingClientRect().top + window.scrollY + yOffset;

      window.scrollTo({
        top: y,
        behavior: 'smooth',
      });
    }
  }, [formStep]);

  return (
    <div className="relative" ref={formRef}>
      <p
        className={`mb-4 md:mb-6 text-center md:text-left overflow-hidden transition-all duration-500 ease-in-out ${
          formStep === 1 || formStep === 2
            ? 'max-h-[200px] opacity-100 visible'
            : 'max-h-0 opacity-0 invisible'
        }`}
      >
        {t.rich('joinWaitingList', {
          bold: (chunks) => <strong>{chunks}</strong>,
        })}
      </p>

      {message && (
        <div className="animate-fade-in-up">
          <p
            className={`mb-4 p-4 rounded-sm ${
              messageType === 'error'
                ? 'bg-red-900 text-red-200'
                : 'bg-blue-200 text-black'
            }`}
          >
            {message}
          </p>
        </div>
      )}

      <div className="relative">
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            formStep === 1
              ? 'max-h-[200px] opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
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
        </div>

        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden animate-expand-down ${
            formStep === 2
              ? 'max-h-[500px] opacity-100 visible'
              : 'max-h-0 opacity-0 invisible'
          }`}
        >
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
                {positionOptions}
              </select>
              <select
                name="industry"
                value={additionalData.industry}
                onChange={handleChange}
                className="w-full p-2 mb-2 text-black rounded-sm"
              >
                <option value="">{t('industryPlaceholder')}</option>
                {industryOptions}
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
        </div>
      </div>
    </div>
  );
}
