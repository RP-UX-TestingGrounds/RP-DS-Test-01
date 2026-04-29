import PropTypes from 'prop-types';

import { loadSvg } from './svgs';

export default function Svg({
  testId,
  svg: svgName,
  className,
  fill = 'currentColor',
  width,
}) {
  const attrs = {};
  if (testId) {
    attrs['data-test-id'] = testId;
  }

  return loadSvg(svgName, {
    className,
    width,
    fill,
    attrs,
  });
}

Svg.propTypes = {
  testId: PropTypes.string,
  svg: PropTypes.string.isRequired,
  fill: PropTypes.string,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
