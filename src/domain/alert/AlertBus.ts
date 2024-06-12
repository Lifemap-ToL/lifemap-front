import { type Alerted } from '@/domain/alert/Alerted';
import { type Unsubscribe } from '@/domain/Unsubscribe';
import { type AlertMessage } from '@/domain/alert/AlertMessage';

export interface AlertBus {
  onAlert(alerted: Alerted): Unsubscribe;
  alert(alertMessage: AlertMessage): void;
}
