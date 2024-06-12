import { Component, toNative, Vue } from 'vue-facing-decorator';
import { ModalVue } from '@/primary/common/modal';

@Component({ components: { ModalVue } })
export default class VersionModalComponent extends Vue {}
