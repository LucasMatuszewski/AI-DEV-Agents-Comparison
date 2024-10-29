'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
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

  return (
    <>
      {(formStep === 1 || formStep === 2) && (
        <p className="mb-4 md:mb-6">
          {t.rich('joinWaitingList', {
            bold: (chunks) => <strong>{chunks}</strong>,
          })}
        </p>
      )}

      {message && (
        <p
          className={`mb-4 p-4 rounded-sm ${
            messageType === 'error'
              ? 'bg-red-900 text-red-200'
              : 'bg-blue-200 text-black'
          }`}
        >
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
    </>
  );
}
