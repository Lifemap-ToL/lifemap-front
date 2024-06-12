import { Fill, Stroke, Text } from 'ol/style';

const TEXT_COLOR = 'rgba(255, 255, 255, 1)';
const TEXT_STROKE_COLOR = 'rgba(0, 0, 0, 1)';

export function createTaxonNameText(taxonName: string, taxonNameLabelFontSize: number, taxonCommonName?: string): Text {
  const taxonNameLabelFont = `${taxonNameLabelFontSize}px sans-serif`;
  const taxonCommonNameLabelFontSize = taxonNameLabelFontSize - 8;
  const taxonCommonNameLabelFont = `${taxonCommonNameLabelFontSize}px sans-serif`;
  const nameText = [taxonName, taxonNameLabelFont];
  const commonNameText =
    taxonCommonName && taxonCommonNameLabelFontSize > 10 ? ['\n', taxonNameLabelFont, taxonCommonName, taxonCommonNameLabelFont] : [];
  const text = [...nameText, ...commonNameText];
  const offsetY = taxonCommonName ? 32 : 22;

  return new Text({
    fill: new Fill({ color: TEXT_COLOR }),
    stroke: new Stroke({ width: 2, color: TEXT_STROKE_COLOR }),
    text,
    offsetY,
  });
}
