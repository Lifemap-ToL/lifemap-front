import { type AlertMessage } from '@/domain/alert/AlertMessage';

export type Alerted = (message: AlertMessage) => void;
