import zh from './zh.json';
import en from './en.json';

export type Locale = 'zh' | 'en';

const translations = { zh, en } as const;

export function useTranslations(locale: Locale) {
  const t = translations[locale] || translations.zh;

  return {
    t(key: string): string {
      const keys = key.split('.');
      let result: unknown = t;
      for (const k of keys) {
        if (result && typeof result === 'object' && k in (result as Record<string, unknown>)) {
          result = (result as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      return typeof result === 'string' ? result : key;
    },
    raw(key: string): unknown {
      const keys = key.split('.');
      let result: unknown = t;
      for (const k of keys) {
        if (result && typeof result === 'object' && k in (result as Record<string, unknown>)) {
          result = (result as Record<string, unknown>)[k];
        } else {
          return undefined;
        }
      }
      return result;
    },
  };
}

export function getLocaleFromUrl(url: URL): Locale {
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts[0] === 'en') return 'en';
  return 'zh';
}
