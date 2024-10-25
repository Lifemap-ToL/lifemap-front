import Map from 'ol/Map.js';
import { Overlay, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { type Interaction } from 'ol/interaction';
import { defaults } from 'ol/interaction/defaults';
import VectorTileLayer from 'ol/layer/VectorTile';

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
    interactions: [...interactions, ...defaults().getArray()],
    overlays,
    controls: [],
  });
}
