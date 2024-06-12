import { Component, Inject, Vue } from 'vue-facing-decorator';
import { type ToastEntry } from '@/primary/common/toast/toasts/ToastEntry';
import { type Unsubscribe } from '@/domain/Unsubscribe';
import { type ToastDisplayed } from '@/primary/common/toast/ToastDisplayed';
import { type AlertBus } from '@/domain/alert/AlertBus';
import { AlertToastVue } from '@/primary/common/alert';
import { markRaw } from 'vue';

@Component
export default class ToastsComponent extends Vue {
  id = 0;
  toasts: ToastEntry[] = [];
  unsubscribeAlertBus!: Unsubscribe;

  @Inject()
  private alertBus!: () => AlertBus;

  created() {
    this.unsubscribeAlertBus = this.alertBus().onAlert(alertMessage =>
      this.display({
        props: { message: alertMessage.message },
        component: markRaw(AlertToastVue),
      })
    );
  }

  beforeUnmount() {
    this.unsubscribeAlertBus();
  }

  display(displayed: ToastDisplayed) {
    const id = this.generateId();
    this.toasts.push({ id, displayed });
  }

  remove(id: number) {
    this.toasts = this.toasts.filter(entry => entry.id !== id);
  }

  private generateId() {
    const id = this.id;
    this.id++;
    return id;
  }
}
