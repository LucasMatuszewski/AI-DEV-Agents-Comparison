import React from 'react';

import { useMessages, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const MakingOf: React.FC = () => {
  const t = useTranslations('aiTools');
  const messages = useMessages();
  const aiTools = messages.aiTools ? Object.keys(messages.aiTools) : [];

  return (
    <ul className="list-disc list-inside">
      {aiTools.map((tool: string, index: number) => (
        <li key={index}>
          <Link href={t(`${tool}.url`)} className="text-blue-500">
            {t(`${tool}.anchor`)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MakingOf;
