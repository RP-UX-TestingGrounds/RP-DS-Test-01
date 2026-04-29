import React from 'react';
import PropTypes from 'prop-types';

import { SVG_ICONS } from './icon-constants';

/**
 * Icon component that renders SVG icons from the icon constants.
 *
 * @param {Object} props - Component props
 * @param {keyof typeof SVG_ICONS} props.name - The name of the icon to render
 * @param {number} [props.width=24] - Width of the icon in pixels (height will match)
 * @param {string} [props.fill='var(--primary-main)'] - Fill color of the icon
 * @param {Object} [props.rest] - Additional props passed to the SVG element
 * @returns {React.ReactElement|null} The rendered icon or null if name is invalid
 */
export default function Icon({
  name,
  width = 24,
  fill = 'var(--primary-main)',
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
      const { d, fill: pathFill, ...pathAttrs } = pathData;
      return (
            <path
                key={index}
                d={d}
                fill={pathFill || fill}
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
