import { type Emitter, type Handler } from 'mitt';

export class MittClickBus {
  constructor(private emitter: Emitter) {}

  onClick(clicked: (mouseEvent: MouseEvent) => void): () => void {
    const handler: Handler<MouseEvent> = mouseEvent => clicked(mouseEvent!);
    this.emitter.on<MouseEvent>('click', handler);
    return () => this.emitter.off('click', handler);
  }

  click(mouseEvent: MouseEvent): void {
    this.emitter.emit('click', mouseEvent);
  }
}
