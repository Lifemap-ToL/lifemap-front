import { Component, Inject, Vue } from 'vue-facing-decorator';
import { DropdownBus } from '@/primary/common/dropdown/DropdownBus';
import mitt from 'mitt';
import { DropdownVue } from '@/primary/common/dropdown';
import type { AppBus } from '@/primary/common/AppBus';

@Component({ components: { DropdownVue } })
export default class ParametersSidebarComponent extends Vue {
  @Inject()
  private appBus!: () => AppBus;

  languages: { key: string; title: string }[] = [
    { key: 'en', title: 'English' },
    { key: 'fr', title: 'Français' },
    { key: 'de', title: 'Deutsch' },
    { key: 'es', title: 'Español' },
    { key: 'it', title: 'Italiano' },
    { key: 'pt', title: 'Português' },
  ];

  selectedLanguage!: { key: string; title: string };
  languageDropdownBus = new DropdownBus(mitt());

  created() {
    const selectedLanguageKey = this.$router.currentRoute.value.query['wikipedia-lang'] as string;
    const queryLanguage = this.languages.find(language => language.key === selectedLanguageKey);
    this.selectedLanguage = queryLanguage || { key: 'app', title: '' };
  }

  public changeWikipediaLanguage(language: { key: string; title: string }) {
    const queryLanguage = language.key === 'app' ? undefined : language.key;
    const routeQuery = { ...this.$router.currentRoute.value.query, 'wikipedia-lang': queryLanguage };
    this.$router.push({ name: this.$router.currentRoute.value.name!, query: routeQuery });
    this.languageDropdownBus.close();
    this.selectedLanguage = language;
    this.appBus().fire('changewikipedialanguage', language.key);
  }
}
