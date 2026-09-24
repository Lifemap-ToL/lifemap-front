import { Component, Inject, Vue } from 'vue-facing-decorator';
import { DropdownVue } from '@/primary/common/dropdown';
import { DropdownBus } from '@/primary/common/dropdown/DropdownBus';
import { languages as configuredLanguages, type AppLocale } from '@/locale/languages';
import mitt from 'mitt';
import type { AppBus } from '@/primary/common/AppBus';

@Component({ components: { DropdownVue } })
export default class LanguageDropdownComponent extends Vue {
  @Inject()
  private appBus!: () => AppBus;

  bus = new DropdownBus(mitt());
  languages = configuredLanguages.filter(language => language.enabled);

  changeLocale(locale: AppLocale): void {
    this.$i18n.locale = locale;
    this.appBus().fire('changelocale', locale);
  }
}
