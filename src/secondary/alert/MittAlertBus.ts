import { type Emitter, type Handler } from 'mitt';
import { type AlertBus } from '@/domain/alert/AlertBus';
import { type AlertMessage } from '@/domain/alert/AlertMessage';
import { type Unsubscribe } from '@/domain/Unsubscribe';
import { type Alerted } from '@/domain/alert/Alerted';

export class MittAlertBus implements AlertBus {
  constructor(private emitter: Emitter) {}

  alert(alertMessage: AlertMessage): void {
    this.emitter.emit<AlertMessage>('alert', alertMessage);
  }

  onAlert(alerted: Alerted): Unsubscribe {
    const handler: Handler<AlertMessage> = (message) => alerted(message!);
    this.emitter.on<AlertMessage>('alert', handler);
    return () => this.emitter.off('alert', handler);
  }
}
