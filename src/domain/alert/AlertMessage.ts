import type { AlertMessageType } from '@/domain/alert/AlertMessageType';

export interface AlertMessage {
  message: string;
  type?: AlertMessageType;
}
