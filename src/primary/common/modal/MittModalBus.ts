import { type Emitter } from 'mitt';
import { type ModalBusEvent } from '@/primary/common/modal/ModalBusEvent';
import { type ModalOpened } from '@/primary/common/modal/ModalOpened';
import { type BusCallback } from '@/primary/common/modal/BusCallback';

const OPEN = 'open';
const CLOSE = 'close';

export class MittModalBus {
  private subscribedId = 0;
  private subscribed = new Map<string, ModalBusEvent<any>>();

  constructor(private bus: Emitter) {}

  public open(message: ModalOpened): void {
    this.bus.emit(OPEN, message);
  }

  public close(): void {
    this.bus.emit(CLOSE);
  }

  private subscribe(event: ModalBusEvent<any>): string {
    const { name, callback } = event;
    this.subscribedId++;
    this.subscribed.set(this.subscribedId.toString(), {
      name,
      callback,
    });
    this.bus.on(name, callback);
    return this.subscribedId.toString();
  }

  public opened(callback: BusCallback<ModalOpened>): string {
    return this.subscribe({ name: OPEN, callback });
  }

  public closed(callback: BusCallback<void>): string {
    return this.subscribe({ name: CLOSE, callback });
  }

  public unsubscribe(subscribeId: string): boolean {
    if (!this.subscribed.has(subscribeId)) {
      return false;
    }
    const { name, callback } = this.subscribed.get(subscribeId)!;
    this.subscribed.delete(subscribeId);
    this.bus.off(name, callback);
    return true;
  }
}
