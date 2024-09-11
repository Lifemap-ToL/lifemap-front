import { Component, Vue } from 'vue-facing-decorator';

@Component({ emits: ['close'] })
export default class MessageComponent extends Vue {
  closed = false;

  close() {
    this.closed = true;
    this.$emit('close');
  }
}
