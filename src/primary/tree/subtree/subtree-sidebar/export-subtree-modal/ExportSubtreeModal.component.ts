import { Component, Inject, Prop, Vue } from 'vue-facing-decorator';
import { ModalVue } from '@/primary/common/modal';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';
import { TaxonTree } from '@/domain/taxon/TaxonTree';
import { type AlertBus } from '@/domain/alert/AlertBus';
import { AlertMessageType } from '@/domain/alert/AlertMessageType';

@Component({ components: { ModalVue } })
export default class ExportSubtreeModalComponent extends Vue {
  @Prop({ type: Object, required: true })
  readonly taxonSubtree!: TaxonTree;

  @Inject()
  private modalBus!: () => MittModalBus;

  @Inject()
  private alertBus!: () => AlertBus;

  @Inject()
  private globalWindow!: () => Window;

  singletons = false;
  nodeNames = false;
  nameFormat: 'scientific' | 'taxid' | 'full' = 'scientific';
  formattedSubtree = '';

  created() {
    this.formatSubtree();
  }

  private formatSubtree() {
    this.formattedSubtree = this.taxonSubtree.format(this.singletons, this.nodeNames, this.nameFormat);
  }

  toggleSingletons(): void {
    this.singletons = !this.singletons;
    this.formatSubtree();
  }

  toggleNodeNames(): void {
    this.nodeNames = !this.nodeNames;
    this.formatSubtree();
  }

  changeNameFormat(newNameFormat: 'scientific' | 'taxid' | 'full'): void {
    this.nameFormat = newNameFormat;
    this.formatSubtree();
  }

  close() {
    this.modalBus().close();
  }

  copyToClipboard() {
    const textarea = this.$refs['textarea'] as HTMLTextAreaElement;
    textarea.select();
    textarea.focus();
    this.globalWindow().navigator.clipboard.writeText(this.formattedSubtree);
    this.alertBus().alert({ message: this.$t('subtree-copy-success'), type: AlertMessageType.SUCCESS });
  }
}
