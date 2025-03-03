'use client';

import { useState, useEffect } from 'react';
import { loadTranslations, getTranslation } from '../services/translationService';

/**
 * Custom hook for handling translations in the admin package
 * @returns {Object} Translation utilities
 */
export const useTranslation = () => {
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'ar' | 'en';
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
    
    // Load translations for the current language
    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        const translationsData = await loadTranslations(language);
        setTranslations(translationsData);
      } catch (error) {
        console.error("Error loading translations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTranslations();
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  /**
   * Translate a key to the current language
   * @param key The translation key
   * @param params Optional parameters for interpolation
   * @returns The translated string
   */
  const t = (key: string, params?: Record<string, string>): string => {
    // Get the translation for the current language
    const translation = getTranslation(translations, key);
    
    // If there are no params, return the translation as is
    if (!params) {
      return translation;
    }
    
    // Replace parameters in the translation
    let result = translation;
    Object.entries(params).forEach(([param, value]) => {
      result = result.replace(new RegExp(`{{${param}}}`, 'g'), value);
    });
    
    return result;
  };
  
  return { t, language, toggleLanguage, isLoading };
};