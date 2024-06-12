import Map from 'ol/Map.js';
import { XYZ } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import { Overlay, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { type Interaction } from 'ol/interaction';
import { defaults } from 'ol/interaction/defaults';

const MAP_INITIAL_ZOOM = 5;
const MAP_INITIAL_CENTER = [0, -5];
const MAP_MIN_ZOOM = 4;
const MAP_MAX_ZOOM = 42;
const MAP_EXTENT = [-74.203515625, -33.7091796875, 68.003515625, 35.1091796875];

const TILE_LAYER_SOURCE_URL = 'https://lifemap.univ-lyon1.fr/nolabels/{z}/{x}/{y}.png';

export function createMap(vectorLayers: VectorLayer<VectorSource>[], interactions: Interaction[], overlays: Overlay[]): Map {
  const tileSource = new XYZ({ url: TILE_LAYER_SOURCE_URL, transition: 1000, opaque: true /*, crossOrigin: 'Anonymous'*/ });
  const tileLayer = new TileLayer({ source: tileSource });

  const view = new View({
    projection: 'EPSG:4326',
    center: MAP_INITIAL_CENTER,
    zoom: MAP_INITIAL_ZOOM,
    minZoom: MAP_MIN_ZOOM,
    maxZoom: MAP_MAX_ZOOM,
    extent: MAP_EXTENT,
    constrainResolution: true,
  });

  return new Map({
    view,
    layers: [tileLayer, ...vectorLayers],
    interactions: [...interactions, ...defaults().getArray()],
    overlays,
    controls: [],
  });
}
