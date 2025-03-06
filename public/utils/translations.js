/**
 * Utility functions for handling translations
 */

// Cache for loaded translations
let translationsCache = {};

/**
 * Load translations for a specific language
 * @param {string} lang - Language code (e.g., 'ar', 'en')
 * @returns {Promise<Object>} - Translation object
 */
export async function loadTranslations(lang) {
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
 * @param {Object} translations - Translation object
 * @param {string} key - Translation key
 * @returns {string} - Translated text or key if not found
 */
export function getTranslation(translations, key) {
  return translations[key] || key;
}

/**
 * Create a translation function for a specific language
 * @param {string} lang - Language code
 * @returns {Function} - Translation function
 */
export function createTranslator(lang) {
  let translations = {};
  
  // Load translations immediately
  loadTranslations(lang).then(result => {
    translations = result;
  });
  
  // Return translation function
  return function(key) {
    return translations[key] || key;
  };
}