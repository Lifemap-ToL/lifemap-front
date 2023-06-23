import { type Component } from 'vue';

export interface ModalOpened {
  component: Component;
  props?: any;
}
