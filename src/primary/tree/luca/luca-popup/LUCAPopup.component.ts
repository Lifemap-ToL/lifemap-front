import { Component, Vue } from 'vue-facing-decorator';

@Component({ emits: ['close'] })
export default class LUCAPopupComponent extends Vue {
  public close() {
    this.$emit('close');
  }
}
