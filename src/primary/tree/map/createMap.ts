import Map from 'ol/Map.js';
import { Overlay, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { MouseWheelZoom, type Interaction } from 'ol/interaction';
import { defaults } from 'ol/interaction/defaults';
import VectorTileLayer from 'ol/layer/VectorTile';

const mouseWheelZoom = new MouseWheelZoom({
  onFocusOnly: false,
  constrainResolution: false,
  maxDelta: 1,
  duration: 300,
  timeout: 100,
});

export function createMap(
  view: View,
  vectorTileLayers: VectorTileLayer[],
  vectorLayers: VectorLayer<VectorSource>[],
  interactions: Interaction[],
  overlays: Overlay[]
): Map {
  return new Map({
    view,
    layers: [...vectorTileLayers, ...vectorLayers],
    interactions: [...interactions, ...defaults().extend([mouseWheelZoom]).getArray()],
    overlays,
    controls: [],
  });
}
