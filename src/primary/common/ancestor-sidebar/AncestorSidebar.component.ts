import { Component, Prop, toNative, Vue } from 'vue-facing-decorator';
import { type Taxon } from '@/domain/taxon/Taxon';
import { AncestorFormVue } from '@/primary/common/ancestor-sidebar/ancestor-form';

@Component({ components: { AncestorFormVue } })
export default class AncestorSidebarComponent extends Vue {
  @Prop({ type: Object, required: false })
  ancestor?: Taxon;

  @Prop({ type: Array, required: false })
  ancestorRoute?: Taxon[];

  @Prop({ type: Function, required: true })
  onAncestorRouteFit!: () => void;

  get ancestorId(): string {
    return this.ancestor ? this.ancestor.id : '';
  }

  get ancestorRouteExtremes(): Taxon[] {
    return this.ancestorRoute ? [this.ancestorRoute[0], this.ancestorRoute[this.ancestorRoute.length - 1]] : [];
  }

  public clearAncestor() {
    this.$router.push({
      name: this.$router.currentRoute.value.name!,
      query: { ...this.$router.currentRoute.value.query, ancestor: undefined },
    });
  }
}
