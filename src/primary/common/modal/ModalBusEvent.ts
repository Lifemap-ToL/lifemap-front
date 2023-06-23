import { type BusCallback } from '@/primary/common/modal/BusCallback';

export interface ModalBusEvent<T> {
  name: string;
  callback: BusCallback<T>;
}
