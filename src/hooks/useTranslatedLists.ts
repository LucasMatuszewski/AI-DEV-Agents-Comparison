'use client';

import { useTranslations, useMessages } from 'next-intl';
import { useMemo } from 'react';

export enum ListNames {
  Positions = 'positions',
  Industries = 'industries',
}

type Messages = {
  [K in ListNames]: Record<string, string>;
} & Record<string, unknown>;

export const useTranslatedLists = (listName: ListNames): string[] => {
  const messages = useMessages() as Messages;
  const t = useTranslations(listName);

  return useMemo(() => {
    if (!messages[listName]) return [];
    return Object.keys(messages[listName]).map((key) => t(key));
  }, [messages, listName, t]);
};
