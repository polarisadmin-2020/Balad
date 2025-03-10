'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from './useLanguage';

/**
 * Custom hook for handling translations in the admin package
 * @returns {Object} Translation utilities
 */
export const useTranslation = () => {
  const { language } = useLanguage();
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Use a ref to track if translations have been loaded
  const translationsLoadedRef = useRef(false);

  useEffect(() => {
    // Load translations for the current language
    const fetchTranslations = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/translations/${language}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations: ${response.status}`);
        }
        const translationsData = await response.json();
        setTranslations(translationsData);
        translationsLoadedRef.current = true;
      } catch (error) {
        console.error("Error loading translations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTranslations();
    
    // Listen for language change events
    const handleLanguageChange = () => {
      fetchTranslations();
    };
    
    window.addEventListener('language-changed', handleLanguageChange);
    
    return () => {
      window.removeEventListener('language-changed', handleLanguageChange);
    };
  }, [language]);

  /**
   * Translate a key to the current language
   * @param key The translation key
   * @param params Optional parameters for interpolation
   * @returns The translated string
   */
  const t = (key: string, params?: Record<string, string>): string => {
    // Get the translation for the current language
    const translation = translations[key] || key;
    
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
  
  return { t, language, isLoading };
};