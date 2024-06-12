import { Component, Vue } from 'vue-facing-decorator';

@Component({ emits: ['remove'] })
export default class TagComponent extends Vue {}
