import { Component, Prop, Vue } from 'vue-facing-decorator';
import { DropdownVue } from '@/primary/common/dropdown';
import { DropdownBus } from '@/primary/common/dropdown/DropdownBus';
import mitt from 'mitt';

@Component({ components: { DropdownVue } })
export default class ModeDropdownComponent extends Vue {
  @Prop({ type: Boolean, default: false })
  expertMode!: boolean;

  expertModeDropdownBus = new DropdownBus(mitt());

  changeMode(expertMode: boolean) {
    const routeQuery = { ...this.$router.currentRoute.value.query, expertMode: `${expertMode}` };
    this.$router.push({ name: this.$router.currentRoute.value.name!, query: routeQuery });
    this.expertModeDropdownBus.close();
  }
}
