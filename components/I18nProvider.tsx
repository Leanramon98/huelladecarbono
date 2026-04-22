'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useLanguage } from '@/lib/store/useLanguage';
import es from '@/lib/i18n/es.json';
import pt from '@/lib/i18n/pt.json';
import en from '@/lib/i18n/en.json';
import { ReactNode, useEffect, useState } from 'react';

const messagesMap = { es, pt, en };

export default function I18nProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  // Avoid hydration mismatch because Zustand's persist reads from localStorage
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <NextIntlClientProvider locale={language || 'es'} messages={messagesMap[language || 'es']}>
      {children}
    </NextIntlClientProvider>
  );
}
