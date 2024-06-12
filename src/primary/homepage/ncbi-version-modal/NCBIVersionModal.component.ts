import { Component, toNative, Vue } from 'vue-facing-decorator';
import { VersionModalVue } from '@/primary/homepage/version-modal';

@Component({ components: { VersionModalVue } })
export default class NCBIVersionModalComponent extends Vue {}
