import { Component, Inject, Vue } from 'vue-facing-decorator';
import { DropdownVue } from '@/primary/common/dropdown';
import { DropdownBus } from '@/primary/common/dropdown/DropdownBus';
import mitt from 'mitt';
import { type AppBus } from '@/primary/common/AppBus';

@Component({ components: { DropdownVue } })
export default class NavbarComponent extends Vue {
  @Inject()
  private appBus!: () => AppBus;

  languageDropdownBus = new DropdownBus(mitt());

  changeLocale(locale: string): void {
    this.$i18n.locale = locale;
    this.appBus().fire('changelocale', locale);
  }
}
