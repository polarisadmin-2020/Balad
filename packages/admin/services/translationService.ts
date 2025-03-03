/**
 * Translation Service for the Admin Package
 * Handles loading and retrieving translations
 */

// Cache for loaded translations
let translationsCache: Record<string, Record<string, string>> = {};

/**
 * Load translations for a specific language
 * @param {string} lang - Language code (e.g., 'ar', 'en')
 * @returns {Promise<Record<string, string>>} - Translation object
 */
export async function loadTranslations(lang: string): Promise<Record<string, string>> {
  if (translationsCache[lang]) {
    return translationsCache[lang];
  }
  
  try {
    const response = await fetch(`/translations/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}`);
    }
    
    const translations = await response.json();
    translationsCache[lang] = translations;
    return translations;
  } catch (error) {
    console.error(`Error loading translations for ${lang}:`, error);
    return {};
  }
}

/**
 * Get translation for a specific key
 * @param {Record<string, string>} translations - Translation object
 * @param {string} key - Translation key
 * @returns {string} - Translated text or key if not found
 */
export function getTranslation(translations: Record<string, string>, key: string): string {
  return translations[key] || key;
}

/**
 * Create a translation function for a specific language
 * @param {string} lang - Language code
 * @returns {Function} - Translation function
 */
export function createTranslator(lang: string): (key: string) => string {
  let translations: Record<string, string> = {};
  
  // Load translations immediately
  loadTranslations(lang).then(result => {
    translations = result;
  });
  
  // Return translation function
  return function(key: string): string {
    return translations[key] || key;
  };
}