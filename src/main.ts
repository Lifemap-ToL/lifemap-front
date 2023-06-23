import './assets/styles/lifemap/lifemap.scss';

import { createApp } from 'vue';
import router from './router';
import { AppVue } from '@/primary/common/app';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';
import mitt from 'mitt';
import { InputBus } from '@/primary/common/InputBus';

const modalBus = new MittModalBus(mitt());
const inputBus = new InputBus(window);

const app = createApp(AppVue);

app.provide('modalBus', () => modalBus);
app.provide('inputBus', () => inputBus);
app.provide('globalWindow', () => window);

app.use(router);
app.mount('#app');
