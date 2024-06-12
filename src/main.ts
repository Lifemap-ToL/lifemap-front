import 'ol/ol.css';
import './assets/styles/styles.scss';

import en from '@/locale/en.json';
import fr from '@/locale/fr.json';
import { createApp } from 'vue';
import router from './router';
import { AppVue } from '@/primary/common/app';
import { MittModalBus } from '@/primary/common/modal/MittModalBus';
import mitt from 'mitt';
import { InputBus } from '@/primary/common/InputBus';
import { MittClickBus } from '@/primary/common/MittClickBus';
import { RESTTaxonRepository } from '@/secondary/taxon/RESTTaxonRepository';
import jsonP from 'fetch-jsonp';
import axios from 'axios';
import { AppBus } from '@/primary/common/AppBus';
import { createMap } from '@/primary/common/map/createMap';
import { createTaxonLayer } from '@/primary/common/map/layer/vector/createTaxonLayer';
import { createSelectedTaxonStyleFunction } from '@/primary/common/map/style/createSelectedTaxonStyleFunction';
import { createSelectableTaxonStyleFunction } from '@/primary/common/map/style/createSelectableTaxonStyleFunction';
import { Select } from '@/primary/common/map/interaction/Select';
import { type StyleLike } from 'ol/style/Style';
import { createTaxonTooltipOverlay } from '@/primary/common/map/overlay/createTaxonTooltipOverlay';
import { createAncestorRouteLayer } from '@/primary/common/map/layer/vector/createAncestorRouteLayer';
import { createSubtreeLayer } from '@/primary/common/map/layer/vector/createSubtreeLayer';
import { MittAlertBus } from '@/secondary/alert/MittAlertBus';
import { RESTWikidataRecordRepository } from '@/secondary/wikimedia/RESTWikidataRecordRepository';
import { createI18n } from 'vue-i18n';
import { RESTWikipediaPageRepository } from '@/secondary/wikimedia/RESTWikipediaPageRepository';
import { RESTWikidataPageRepository } from '@/secondary/wikimedia/RESTWikidataPageRepository';

const locale = navigator.language && navigator.language.startsWith('fr') ? 'fr' : 'en';

const i18n = createI18n({
  locale,
  fallbackLocale: 'fr',
  messages: { en, fr },
});

const clickMitt = mitt();
const clickBus = new MittClickBus(clickMitt);
const windowClick = (event: MouseEvent): void => clickBus.click(event);
window.onclick = windowClick;

const modalBus = new MittModalBus(mitt());
const inputBus = new InputBus(window);
const alertBus = new MittAlertBus(mitt());

const axiosInstance = axios.create();

const fetchLifemapAPI = (url: string) => jsonP(`${import.meta.env.VITE_LIFEMAP_API_BASE_URL}${url}`, { jsonpCallback: 'json.wrf' });
const restTaxonRepository = new RESTTaxonRepository(fetchLifemapAPI, axiosInstance, import.meta.env.VITE_TIME_TREE_FILE_URL);

const restWikidataRecordRepository = new RESTWikidataRecordRepository(axiosInstance);
const restWikidataPageRepository = new RESTWikidataPageRepository(axiosInstance);
const restWikipediaPageRepository = new RESTWikipediaPageRepository(axiosInstance);

const taxonLayer = createTaxonLayer();
const ancestorRouteLayer = createAncestorRouteLayer();
const subtreeLayer = createSubtreeLayer();

const taxonTooltipOverlay = createTaxonTooltipOverlay();

const selectOptions = {
  id: 'select',
  layer: taxonLayer,
  selectedStyle: createSelectedTaxonStyleFunction() as StyleLike,
  selectableStyle: createSelectableTaxonStyleFunction() as StyleLike,
  overlay: taxonTooltipOverlay,
};

const select = new Select(selectOptions);

const map = createMap([subtreeLayer, ancestorRouteLayer, taxonLayer], [select], [taxonTooltipOverlay]);

const app = createApp(AppVue);

const appBus = new AppBus(mitt());

app.provide('modalBus', () => modalBus);
app.provide('inputBus', () => inputBus);
app.provide('alertBus', () => alertBus);
app.provide('clickBus', () => clickBus);
app.provide('taxonLayer', () => taxonLayer);
app.provide('ancestorRouteLayer', () => ancestorRouteLayer);
app.provide('subtreeLayer', () => subtreeLayer);
app.provide('taxonRepository', () => restTaxonRepository);
app.provide('wikidataRecordRepository', () => restWikidataRecordRepository);
app.provide('wikidataPageRepository', () => restWikidataPageRepository);
app.provide('wikipediaPageRepository', () => restWikipediaPageRepository);
app.provide('map', () => map);
app.provide('appBus', () => appBus);
app.provide('globalWindow', () => window);

app.use(router);
app.use(i18n);
app.mount('#app');
