export class InputBus {
  constructor(private globalWindow: Window) {}

  public on(callable: (ev: KeyboardEvent) => void) {
    this.globalWindow.addEventListener('keydown', callable);
  }

  public off(callable: (ev: KeyboardEvent) => void) {
    this.globalWindow.removeEventListener('keydown', callable);
  }
}
