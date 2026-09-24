import en from './en.json';
import es from './es.json';
import fr from './fr.json';

export const languages = [
  { locale: 'en', name: 'English', enabled: true, mapLocale: 'en', messages: en },
  { locale: 'fr', name: 'Français', enabled: true, mapLocale: 'fr', messages: fr },
  { locale: 'es', name: 'Español', enabled: true, mapLocale: 'en', messages: es }
] as const;

export type AppLocale = (typeof languages)[number]['locale'];
export type MapLocale = (typeof languages)[number]['mapLocale'];

export function mapLocaleFor(locale: AppLocale): MapLocale {
  const language = languages.find(language => language.locale === locale);
  return language?.mapLocale ?? 'en';
}

export const fallbackLocale: AppLocale = 'en';
