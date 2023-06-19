import './assets/styles/lifemap.scss';

import { createApp } from 'vue';
import router from './router';
import { AppVue } from '@/common/app';

const app = createApp(AppVue);

app.use(router);
app.mount('#app');
