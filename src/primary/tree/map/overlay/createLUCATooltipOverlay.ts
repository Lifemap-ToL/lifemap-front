import { Overlay } from 'ol';

const OVERLAY_ID = 'luca-tooltip';
const OVERLAY_POSITIONING = 'center-left';
const OVERLAY_OFFSET = [24, 0];

export function createLUCATooltipOverlay(): Overlay {
  return new Overlay({ id: OVERLAY_ID, positioning: OVERLAY_POSITIONING, offset: OVERLAY_OFFSET });
}
