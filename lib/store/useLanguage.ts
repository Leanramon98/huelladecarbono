import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'es' | 'pt' | 'en';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'es',
      setLanguage: (lang: Language) => set({ language: lang }),
    }),
    {
      name: 'language-storage',
    }
  )
);
