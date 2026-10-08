import { Component, Inject, Vue } from 'vue-facing-decorator';
import { DropdownVue } from '@/primary/common/dropdown';
import { DropdownBus } from '@/primary/common/dropdown/DropdownBus';
import mitt from 'mitt';
import type { AppBus } from '@/primary/common/AppBus';
import { type AppLocale } from '@/primary/common/i18n/locale';
import { capitalize } from '@/domain/util/Text';

@Component({ components: { DropdownVue } })
export default class LanguageDropdownComponent extends Vue {
  @Inject()
  private appBus!: () => AppBus;

  bus = new DropdownBus(mitt());

  get languages(): AppLocale[] {
    return (this.$i18n.availableLocales as AppLocale[]).sort((locale1: AppLocale, locale2: AppLocale) =>
      this.autonym(locale1).localeCompare(this.autonym(locale2))
    );
  }

  autonym(language: AppLocale): string {
    return new Intl.DisplayNames([language], { type: 'language' }).of(language) as string;
  }

  getLanguageTitle(language: AppLocale): string {
    return capitalize(this.autonym(language));
  }

  changeLocale(locale: AppLocale): void {
    this.$i18n.locale = locale;
    this.appBus().fire('changelocale', locale);
  }
}
