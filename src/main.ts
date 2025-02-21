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
import axios from 'axios';
import { AppBus } from '@/primary/common/AppBus';
import { createMap } from '@/primary/tree/map/createMap';
import { createTaxonLayer } from '@/primary/tree/map/layer/vector/createTaxonLayer';
import { createSelectedTaxonStyleFunction } from '@/primary/tree/map/style/createSelectedTaxonStyleFunction';
import { createSelectableTaxonStyleFunction } from '@/primary/tree/map/style/createSelectableTaxonStyleFunction';
import { Select } from '@/primary/tree/map/interaction/Select';
import { type StyleLike } from 'ol/style/Style';
import { createTaxonTooltipOverlay } from '@/primary/tree/map/overlay/createTaxonTooltipOverlay';
import { createAncestorRouteLayer } from '@/primary/tree/map/layer/vector/createAncestorRouteLayer';
import { createSubtreeLayer } from '@/primary/tree/map/layer/vector/createSubtreeLayer';
import { MittAlertBus } from '@/secondary/alert/MittAlertBus';
import { createI18n, type VueI18n } from 'vue-i18n';
import { ConsoleLogger } from '@/secondary/ConsoleLogger';
import { RESTTreeRepository } from '@/secondary/tree/RESTTreeRepository';
import { WikidataCaller } from '@/secondary/wikidata/WikidataCaller';
import { createLUCALayer } from '@/primary/tree/map/layer/vector/createLUCALayer';
import { createSelectedLUCAStyle } from '@/primary/tree/map/style/createSelectedLUCAStyle';
import { createSelectableLUCAStyle } from '@/primary/tree/map/style/createSelectableLUCAStyle';
import { Clickable } from '@/primary/tree/map/interaction/Clickable';
import VueMatomo from 'vue-matomo';
import { createView } from '@/primary/tree/map/view/createView';
import { createCompositeLayer } from './primary/tree/map/layer/vector-tile/createCompositeLayer';
import { createCompositeStyleFunction } from './primary/tree/map/style/createCompositeStyleFunction';
import { createLUCATooltipOverlay } from '@/primary/tree/map/overlay/createLUCATooltipOverlay';
import Map from 'ol/Map';
import type VectorTileLayer from 'ol/layer/VectorTile';
import type { View } from 'ol';

function mobileDevice() {
  return window.document.body.clientWidth < 1024;
}

function activateInteractions(clickable: Clickable, select: Select, lucaSelect: Select) {
  return function () {
    clickable.setActive(true);
    select.setSelectable(true);
    lucaSelect.setSelectable(true);
  };
}

function deactivateInteractions(clickable: Clickable, select: Select, lucaSelect: Select) {
  return function () {
    clickable.setActive(false);
    select.setSelectable(false);
    lucaSelect.setSelectable(false);
  };
}

function onChangeLocale(compositeLayer: VectorTileLayer, view: View) {
  return function (locale: 'en' | 'fr') {
    const storedEfficiencyMode = window.localStorage.getItem('efficiency-mode');
    const efficiencyMode = storedEfficiencyMode === null ? mobileDevice() : storedEfficiencyMode === 'true';
    compositeLayer.setStyle(createCompositeStyleFunction(view, efficiencyMode, locale));
    window.localStorage.setItem('app-language', locale);
  };
}

function onChangeWikipediaLanguage(lang: string) {
  const langToStore = lang === 'app' ? undefined : lang;
  window.localStorage.setItem('wikipedia-preferred-language', langToStore);
}

function manageInteractions(map: Map, efficiencyMode: boolean, enableInteractions: () => void, disableInteractions: () => void) {
  if (!efficiencyMode) {
    enableInteractions();
    map.on('movestart', disableInteractions);
    map.on('moveend', enableInteractions);
  }

  if (efficiencyMode) {
    disableInteractions();
    map.un('movestart', disableInteractions);
    map.un('moveend', enableInteractions);
  }
}

function onChangeEfficiencyMode(map: Map, enableInteractions: () => void, disableInteractions: () => void) {
  return function (efficiencyMode: boolean) {
    const view = map.getView();
    const browserLocale = navigator.language && navigator.language.startsWith('fr') ? 'fr' : 'en';
    const locale = window.localStorage.getItem('app-language') || browserLocale;
    const newCompositeLayer = createCompositeLayer(view, efficiencyMode, locale as 'en' | 'fr');

    map.getLayers().removeAt(0);
    map.getLayers().insertAt(0, newCompositeLayer);

    manageInteractions(map, efficiencyMode, enableInteractions, disableInteractions);

    window.localStorage.setItem('efficiency-mode', `${efficiencyMode}`);
  };
}

(function () {
  const browserLocale = navigator.language && navigator.language.startsWith('fr') ? 'fr' : 'en';
  const wikipediaPreferredLanguage = window.localStorage.getItem('wikipedia-preferred-language');
  const storedEfficiencyMode = window.localStorage.getItem('efficiency-mode');
  const efficiencyMode = storedEfficiencyMode === null ? mobileDevice() : storedEfficiencyMode === 'true';

  const locale = window.localStorage.getItem('app-language') || browserLocale;

  const i18n = createI18n({
    locale,
    fallbackLocale: 'fr',
    messages: { en, fr },
  });

  const logger = new ConsoleLogger(console); // eslint-disable-line no-console
  const clickMitt = mitt();
  const clickBus = new MittClickBus(clickMitt);
  const windowClick = (event: MouseEvent): void => clickBus.click(event);
  window.onclick = windowClick;

  const modalBus = new MittModalBus(mitt());
  const sidebarBus = new MittModalBus(mitt());
  const inputBus = new InputBus(window);
  const alertBus = new MittAlertBus(mitt());

  const lifemapAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_LIFEMAP_API_BASE_URL,
  });

  const wikidataQueryServiceAxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_WIKIDATA_QUERY_SERVICE_API_BASE_URL,
  });

  const wikidataCaller = new WikidataCaller(wikidataQueryServiceAxiosInstance);

  const restTreeRepository = new RESTTreeRepository(lifemapAxiosInstance);
  const restTaxonRepository = new RESTTaxonRepository(lifemapAxiosInstance, wikidataCaller, i18n.global as VueI18n);

  const view = createView();

  const compositeLayer = createCompositeLayer(view, efficiencyMode, locale as 'en' | 'fr');

  const lucaLayer = createLUCALayer();
  const taxonLayer = createTaxonLayer();
  const ancestorRouteLayer = createAncestorRouteLayer();
  const subtreeLayer = createSubtreeLayer();

  const taxonTooltipOverlay = createTaxonTooltipOverlay();
  const lucaTooltipOverlay = createLUCATooltipOverlay();

  const selectOptions = {
    id: 'select',
    layer: taxonLayer,
    selectedStyle: createSelectedTaxonStyleFunction() as StyleLike,
    selectableStyle: createSelectableTaxonStyleFunction() as StyleLike,
    overlay: taxonTooltipOverlay,
  };

  const lucaSelectOptions = {
    id: 'luca-select',
    layer: lucaLayer,
    selectedStyle: createSelectedLUCAStyle() as StyleLike,
    selectableStyle: createSelectableLUCAStyle() as StyleLike,
    overlay: lucaTooltipOverlay,
  };

  const select = new Select(selectOptions);
  const lucaSelect = new Select(lucaSelectOptions);
  const clickable = new Clickable({ id: 'clickable', layers: [lucaLayer, taxonLayer] });

  const map = createMap(
    view,
    [compositeLayer],
    [subtreeLayer, ancestorRouteLayer, taxonLayer, lucaLayer],
    [select, lucaSelect, clickable],
    [taxonTooltipOverlay, lucaTooltipOverlay]
  );

  const enableInteractions = activateInteractions(clickable, select, lucaSelect);
  const disableInteractions = deactivateInteractions(clickable, select, lucaSelect);

  manageInteractions(map, efficiencyMode, enableInteractions, disableInteractions);

  const appBus = new AppBus(mitt());

  appBus.on('changelocale', onChangeLocale(compositeLayer, view));
  appBus.on('changewikipedialanguage', onChangeWikipediaLanguage);
  appBus.on('changeefficiencymode', onChangeEfficiencyMode(map, enableInteractions, disableInteractions));

  const app = createApp(AppVue);
  app.provide('modalBus', () => modalBus);
  app.provide('sidebarBus', () => sidebarBus);
  app.provide('inputBus', () => inputBus);
  app.provide('alertBus', () => alertBus);
  app.provide('clickBus', () => clickBus);
  app.provide('taxonLayer', () => taxonLayer);
  app.provide('lucaLayer', () => lucaLayer);
  app.provide('ancestorRouteLayer', () => ancestorRouteLayer);
  app.provide('subtreeLayer', () => subtreeLayer);
  app.provide('taxonRepository', () => restTaxonRepository);
  app.provide('treeRepository', () => restTreeRepository);
  app.provide('map', () => map);
  app.provide('appBus', () => appBus);
  app.provide('globalWindow', () => window);
  app.provide('logger', () => logger);

  app.use(router);
  app.use(i18n);

  // Matomo tracking
  if (import.meta.env.VITE_ENABLE_MATOMO_TRACKING === 'true') {
    app.use(VueMatomo, {
      host: 'https://lbbe-analytics.univ-lyon1.fr/',
      siteId: 6,
      router: router,
    });

    window._paq.push(['trackPageView']); // Pour suivre les visites sur vos pages
    window._paq.push(['disableCampaignParameters']);
    window._paq.push(['disableCookies']);
    window._paq.push(['enableLinkTracking']);
  }

  app.mount('#app');

  const unregister = router.beforeEach(guard => {
    if (guard.name === 'tree') {
      const efficiencyModeQueryString = { 'efficiency-mode': `${efficiencyMode}` };
      const queryStrings = wikipediaPreferredLanguage
        ? { ...efficiencyModeQueryString, 'wikipedia-lang': `${wikipediaPreferredLanguage}` }
        : efficiencyModeQueryString;
      guard.query = { ...guard.query, ...queryStrings };
      unregister();
      return guard;
    }
  });
})();
