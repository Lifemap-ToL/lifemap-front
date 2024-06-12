import { type Emitter, type Handler } from 'mitt';

export class DropdownBus {
  constructor(private bus: Emitter) {}

  open() {
    this.bus.emit('open');
  }

  close() {
    this.bus.emit('close');
  }

  toggle() {
    this.bus.emit('toggle');
  }

  onOpen(callable: () => void) {
    this.bus.on('open', callable);
  }

  onClose(callable: () => void) {
    this.bus.on('close', callable);
  }

  onToggle(callable: () => void) {
    this.bus.on('toggle', callable);
  }

  destroy() {
    Array(...this.bus.all.entries()).forEach(([eventType, handlers]) =>
      handlers.forEach((handler: Handler) => this.bus.off(eventType, handler))
    );
  }
}
