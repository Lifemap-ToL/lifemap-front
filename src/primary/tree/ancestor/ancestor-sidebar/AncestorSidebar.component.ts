import { Component, Inject, Prop, Vue, Watch } from 'vue-facing-decorator';
import { type Taxon } from '@/domain/taxon/Taxon';
import { AncestorFormVue } from '@/primary/tree/ancestor/ancestor-sidebar/ancestor-form';
import type { AppBus } from '@/primary/common/AppBus';
import { MessageVue } from '@/primary/common/message';

@Component({ components: { AncestorFormVue, MessageVue }, emits: ['close'] })
export default class AncestorSidebarComponent extends Vue {
  @Prop({ type: Object, required: false })
  ancestor?: Taxon;

  @Prop({ type: Array, required: false })
  ancestorRoute?: Taxon[];

  @Prop({ type: Function, required: true })
  onAncestorRouteFit!: () => void;

  @Inject()
  private appBus!: () => AppBus;

  error = false;

  get ancestorId(): string {
    return this.ancestor ? this.ancestor.id : '';
  }

  get ancestorRouteExtremes(): Taxon[] {
    return this.ancestorRoute ? [this.ancestorRoute[0], this.ancestorRoute[this.ancestorRoute.length - 1]] : [];
  }

  created() {
    this.appBus().on('ancestors:error', this.handleError);
  }

  beforeUnmount(): void {
    this.appBus().off('ancestors:error', this.handleError);
  }

  handleError() {
    this.error = true;
  }

  @Watch('ancestorRoute')
  revokeError() {
    this.error = false;
  }

  public clearAncestor() {
    this.$router.push({
      name: this.$router.currentRoute.value.name!,
      query: { ...this.$router.currentRoute.value.query, ancestor: undefined },
    });
  }
}
