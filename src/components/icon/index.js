import PropTypes from 'prop-types';

import { SVG_ICONS } from './icon-constants';

/**
 * Icon component that renders SVG icons from the icon constants.
 * @ignore
 *
 * @param {Object} props - Component props
 * @param {keyof typeof SVG_ICONS} props.name - The name of the icon to render
 * @param {number} [props.width=24] - Width of the icon in pixels (height will match)
 * @param {string} [props.fill='var(--primary-color)'] - Fill color of the icon
 * @param {Object} [props.rest] - Additional props passed to the SVG element
 * @returns {React.ReactElement|null} The rendered icon or null if name is invalid
 */
export default function Icon({
  name,
  width = 24,
  fill = 'var(--primary-color)',
  ...rest
}) {
  if (!SVG_ICONS[name]) {
    return null;
  }

  const { paths, viewBox } = SVG_ICONS[name];

  const renderPaths = () => {
    if (!Array.isArray(paths)) {
      return null;
    }

    return paths.map((pathData, index) => {
      const {
        d, fill: pathFill, stroke: pathStroke, ...pathAttrs
      } = pathData;

      const isStrokeIcon = pathStroke || pathAttrs.strokeWidth;
      return (
            <path
                key={index}
                d={d}
                fill={isStrokeIcon ? 'none' : (pathFill || fill)}
                stroke={isStrokeIcon ? (pathStroke || fill) : 'none'}
                {...pathAttrs}
            />
      );
    });
  };

  return (
        <svg
            width={width}
            height={width}
            viewBox={viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...rest}
        >
            {renderPaths()}
        </svg>
  );
}

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(SVG_ICONS)).isRequired,
  width: PropTypes.number,
  fill: PropTypes.string,
};
