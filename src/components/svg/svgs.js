import PartsInOrbit from './svgs/parts-in-orbit';
import MinimizeNav from './svgs/minimize-nav';

export const svgs = {
  partsInOrbit: PartsInOrbit,
  minimizeNav: MinimizeNav,
};

export const loadSvg = (name, args = {}) => {
  if (!svgs[name]) {
    return null;
  }
  const svg = svgs[name];
  return svg(args);
};
