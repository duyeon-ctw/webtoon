// This is a simplified implementation for demonstration purposes
// In production, you would need to install and use i18next and other related packages

export type Locale = 'en' | 'ko' | 'ja' | 'zh';

// Dummy translations map
const translations: Record<Locale, Record<string, any>> = {
  en: {
    common: {
      home: 'Home',
      discover: 'Discover',
      // ... other translations would go here
    }
  },
  ko: {
    common: {
      home: '홈',
      discover: '탐색',
      // ... other translations would go here
    }
  },
  ja: {
    common: {
      home: 'ホーム',
      discover: '探索',
      // ... other translations would go here
    }
  },
  zh: {
    common: {
      home: '首页',
      discover: '探索',
      // ... other translations would go here
    }
  }
};

// Default locale
let currentLocale: Locale = 'en';

export const i18n = {
  // Get the translation for a key in the current locale
  t: (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLocale];
    
    for (const k of keys) {
      if (!value[k]) return key; // Return the key if translation not found
      value = value[k];
    }
    
    return typeof value === 'string' ? value : key;
  },
  
  // Change the current locale
  changeLanguage: (locale: Locale): void => {
    if (translations[locale]) {
      currentLocale = locale;
    }
  },
  
  // Get the current locale
  getLocale: (): Locale => currentLocale
};

export default i18n; 