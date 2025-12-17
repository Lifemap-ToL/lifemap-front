import { Fill, Stroke, Text } from 'ol/style';

const TEXT_COLOR = 'rgba(255, 255, 255, 1)';
const TEXT_STROKE_COLOR = 'rgba(0, 0, 0, 1)';

export function createTaxonNameText(
  taxonName: string,
  labelNameCSSFont: string,
  taxonCommonName?: string,
  labelCommonNameCSSFont?: string
): Text {
  const nameText = [taxonName, labelNameCSSFont];
  if (taxonCommonName !== undefined) {
    if (taxonCommonName.length > 70) {
      taxonCommonName = taxonCommonName.substring(0, 70);
      const commaPos = taxonCommonName.lastIndexOf(',');
      taxonCommonName = taxonCommonName.substring(0, commaPos) + '...';
    }
    taxonCommonName = `(${taxonCommonName})`;
  }
  const commonNameText = taxonCommonName && labelCommonNameCSSFont ? ['\n', labelNameCSSFont, taxonCommonName, labelCommonNameCSSFont] : [];
  const text = [...nameText, ...commonNameText];
  const offsetY = taxonCommonName ? 32 : 22;

  return new Text({
    fill: new Fill({ color: TEXT_COLOR }),
    stroke: new Stroke({ width: 2, color: TEXT_STROKE_COLOR }),
    text,
    offsetY,
  });
}
