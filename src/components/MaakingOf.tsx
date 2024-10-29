import React from 'react';
import { useMessages, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const MakingOf: React.FC = () => {
  const t = useTranslations('aiTools');
  const messages = useMessages();
  const aiTools = messages.aiTools ? Object.keys(messages.aiTools) : [];

  return (
    <div className="text-left">
      <h2 className="text-xl font-bold mb-4">Making of:</h2>
      <ul className="list-disc list-inside">
        {aiTools.map((tool: string, index: number) => (
          <li key={index}>
            <Link
              href={t(`${tool}.url`)}
              className="text-gray-300 hover:underline hover:text-white transition-colors duration-200"
            >
              {t(`${tool}.anchor`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MakingOf;
