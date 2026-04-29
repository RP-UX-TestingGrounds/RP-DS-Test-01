import path from 'path';

const IGNORED_FILLS = new Set(['none', 'currentColor']);

function extractAttribute(str, attr) {
  const match = str.match(new RegExp(`(?<![\\w-])${attr}\\s*=\\s*["']([^"']+)["']`));
  return match ? match[1] : undefined;
}

function extractGroupAttributes(svgString) {
  const groupMatches = [...svgString.matchAll(/<g([^>]*)>([\s\S]*?)<\/g>/g)];
  const groupAttributes = new Map();

  groupMatches.forEach(([, groupAttrs, groupContent]) => {
    const groupData = {};
    const opacity = extractAttribute(groupAttrs, 'opacity');
    const fill = extractAttribute(groupAttrs, 'fill');
    const stroke = extractAttribute(groupAttrs, 'stroke');

    if (opacity) groupData.opacity = opacity;
    if (fill && !IGNORED_FILLS.has(fill)) groupData.fill = fill;
    if (stroke && stroke !== 'none') groupData.stroke = stroke;

    [...groupContent.matchAll(/<path[^>]*>/g)].forEach(([pathTag]) => {
      groupAttributes.set(pathTag, groupData);
    });
  });

  return groupAttributes;
}

function extractPathData(pathTag, groupAttributes) {
  const d = extractAttribute(pathTag, 'd');
  if (!d) return null;

  const pathData = { d };

  const groupAttrs = groupAttributes.get(pathTag) || {};
  Object.assign(pathData, groupAttrs);

  const clipRule = extractAttribute(pathTag, 'clip-rule');
  const fill = extractAttribute(pathTag, 'fill');
  const fillOpacity = extractAttribute(pathTag, 'fill-opacity');
  const fillRule = extractAttribute(pathTag, 'fill-rule');
  const opacity = extractAttribute(pathTag, 'opacity');
  const stroke = extractAttribute(pathTag, 'stroke');
  const strokeWidth = extractAttribute(pathTag, 'stroke-width');

  if (clipRule) pathData.clipRule = clipRule;
  if (fill) {
    if (IGNORED_FILLS.has(fill)) delete pathData.fill;
    else pathData.fill = fill;
  }
  if (fillOpacity) pathData.fillOpacity = fillOpacity;
  if (fillRule) pathData.fillRule = fillRule;
  if (opacity) pathData.opacity = opacity;
  if (stroke) {
    if (stroke === 'none') delete pathData.stroke;
    else pathData.stroke = stroke;
  }
  if (strokeWidth) pathData.strokeWidth = strokeWidth;

  return pathData;
}

export function extractSvgData(svgString) {
  const viewBox = extractAttribute(svgString, 'viewBox') || '0 0 24 24';
  const groupAttributes = extractGroupAttributes(svgString);
  const pathMatches = [...svgString.matchAll(/<path[^>]*>/g)];

  const paths = pathMatches
    .map(([pathTag]) => extractPathData(pathTag, groupAttributes))
    .filter(Boolean);

  return { viewBox, paths };
}

export function iconNameFromFilename(filePath) {
  return path.basename(filePath, '.svg')
    .replace(/[-_\s]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (_, c) => c.toLowerCase());
}

