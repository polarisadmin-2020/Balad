/**
 * Custom hook for handling translations in the admin package
 */

import { useState, useEffect } from 'react';
import { useLanguage } from './useLanguage';

export const useTranslation = () => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/translations/${language}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations: ${response.status}`);
        }
        const translationsData = await response.json();
        setTranslations(translationsData);
      } catch (error) {
        console.error("Error loading translations:", error);
        setTranslations({});
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  const t = (key: string, params?: Record<string, string>): string => {
    const translation = translations[key] || key;

    if (!params) {
      return translation;
    }

    let result = translation;
    Object.entries(params).forEach(([param, value]) => {
      result = result.replace(new RegExp(`{{${param}}}`, 'g'), value);
    });

    return result;
  };

  return { t, language, isLoading };
};