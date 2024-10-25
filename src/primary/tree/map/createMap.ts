import Map from 'ol/Map.js';
import { Overlay, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { type Interaction } from 'ol/interaction';
import { defaults } from 'ol/interaction/defaults';
import VectorTileLayer from 'ol/layer/VectorTile';
import { fromLonLat, transformExtent } from 'ol/proj';

const MAP_INITIAL_ZOOM = 5;
const MAP_INITIAL_CENTER = [0, -5];
const MAP_MIN_ZOOM = 4;
const MAP_MAX_ZOOM = 42;
const MAP_EXTENT = [-74.203515625, -33.7091796875, 68.003515625, 35.1091796875];

export function createMap(
  vectorTileLayers: VectorTileLayer[],
  vectorLayers: VectorLayer<VectorSource>[],
  interactions: Interaction[],
  overlays: Overlay[]
): Map {
  const view = new View({
    center: fromLonLat(MAP_INITIAL_CENTER),
    zoom: MAP_INITIAL_ZOOM,
    minZoom: MAP_MIN_ZOOM,
    maxZoom: MAP_MAX_ZOOM,
    extent: transformExtent(MAP_EXTENT, 'EPSG:4326', 'EPSG:3857'),
    constrainResolution: false,
    enableRotation: false,
  });

  return new Map({
    view,
    layers: [...vectorTileLayers, ...vectorLayers],
    interactions: [...interactions, ...defaults().getArray()],
    overlays,
    controls: [],
  });
}
