import { Component, Prop, Vue } from 'vue-facing-decorator';

@Component
export default class AdditionalDataSidebarComponent extends Vue {
  @Prop({ type: String, default: '' })
  additional!: 'genomes' | '';

  changeAdditional(additional: 'genomes') {
    const newAdditional = this.additional === additional ? undefined : additional;
    const routeQuery = { ...this.$router.currentRoute.value.query, additional: newAdditional };
    this.$router.push({ name: this.$router.currentRoute.value.name!, query: routeQuery });
  }
}
