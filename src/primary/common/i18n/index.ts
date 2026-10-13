import en from '@/locale/en.json';
import es from '@/locale/es.json';
import fr from '@/locale/fr.json';
import de from '@/locale/de.json';
import el from '@/locale/el.json';
import { createI18n } from 'vue-i18n';
import { type AppLocale, DEFAULT_LOCALE } from '@/primary/common/i18n/locale';

type MessageSchema = typeof en;

export default createI18n<[MessageSchema], AppLocale>({
  legacy: true,
  locale: DEFAULT_LOCALE,
  fallbackLocale: 'en',
  messages: { en, fr, es, de, el },
});
