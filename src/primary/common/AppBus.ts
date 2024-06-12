import { type Emitter } from 'mitt';

type Event = string;

export class AppBus {
  constructor(private emitter: Emitter) {}

  public fire(event: Event, payload?: any): void {
    this.emitter.emit(event, payload);
  }

  public on(event: Event, handler: (payload?: any) => void) {
    this.emitter.on<any>(event, handler);
  }

  public off(event: Event, handler: (payload?: any) => void) {
    this.emitter.off<any>(event, handler);
  }
}
