import { Overlay } from 'ol';

const OVERLAY_ID = 'taxon-tooltip';
const OVERLAY_POSITIONING = 'center-left';
const OVERLAY_OFFSET = [24, 0];

export function createTaxonTooltipOverlay(): Overlay {
  return new Overlay({ id: OVERLAY_ID, positioning: OVERLAY_POSITIONING, offset: OVERLAY_OFFSET });
}
