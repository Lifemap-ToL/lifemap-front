import type { TreeLocale } from '@/domain/tree/TreeLocale';

const APP_LOCALES = ['en', 'fr', 'es', 'de', 'el'] as const;

const TREE_LOCALES: { [key in AppLocale]: TreeLocale } = {
  en: 'en',
  fr: 'fr',
  es: 'es',
  de: 'de',
  el: 'el',
};

export const DEFAULT_LOCALE: AppLocale = 'en';

export type AppLocale = (typeof APP_LOCALES)[number];

function validAppLocale(locale: string): boolean {
  return APP_LOCALES.includes(locale as AppLocale);
}

export function resolveTreeLocale(locale: AppLocale): TreeLocale {
  return TREE_LOCALES[locale];
}

export function getAppLocale(): AppLocale {
  const localStorageLocale = window.localStorage.getItem('app-language');
  const navigatorLocale = navigator.language;

  if (localStorageLocale && validAppLocale(localStorageLocale)) {
    return localStorageLocale as AppLocale;
  }

  if (navigatorLocale && validAppLocale(navigatorLocale.substring(0, 2))) {
    return navigatorLocale.substring(0, 2) as AppLocale;
  }

  return DEFAULT_LOCALE;
}
