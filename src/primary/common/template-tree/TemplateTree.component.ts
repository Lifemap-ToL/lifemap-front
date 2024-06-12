import mitt from 'mitt';

import { Component, Prop, Vue, Watch } from 'vue-facing-decorator';
import { DropdownVue } from '@/primary/common/dropdown';
import { DropdownBus } from '@/primary/common/dropdown/DropdownBus';

@Component({ components: { DropdownVue } })
export default class TemplateTreeComponent extends Vue {
  @Prop({ type: Boolean, default: false })
  expertMode!: boolean;

  expertModeDropdownBus = new DropdownBus(mitt());
  languageDropdownBus = new DropdownBus(mitt());

  openModeDropdown() {
    this.expertModeDropdownBus.open();
  }

  changeMode(expertMode: boolean) {
    const routeQuery = { ...this.$router.currentRoute.value.query, expertMode: `${expertMode}` };
    this.$router.push({ name: this.$router.currentRoute.value.name!, query: routeQuery });
    this.expertModeDropdownBus.close();
  }
}
