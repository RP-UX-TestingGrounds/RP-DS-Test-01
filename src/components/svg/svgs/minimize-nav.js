import React from 'react';
import PropTypes from 'prop-types';

function MinimizeNav({
  width,
  attrs = {},
  fill = 'var(--primary-color)',
  ...rest
}) {
  // Default width/height based on SVG
  const defaultSize = 24;
  const size = width || defaultSize;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...attrs}
      {...rest}
    >
      <path
        d="M7.5 3.5C7.77614 3.5 8 3.72386 8 4V21C8 21.2761 7.77614 21.5 7.5 21.5H6C4.34315 21.5 3 20.1569 3 18.5V6.5C3 4.84315 4.34315 3.5 6 3.5H7.5ZM18 3.5C19.6569 3.5 21 4.84315 21 6.5V18.5C21 20.1569 19.6569 21.5 18 21.5H10.5C10.2239 21.5 10 21.2761 10 21V4C10 3.72386 10.2239 3.5 10.5 3.5H18Z"
        fill={fill}
        fillOpacity="0.5"
      />
    </svg>
  );
}

MinimizeNav.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fill: PropTypes.string,
  attrs: PropTypes.object,
};

export default MinimizeNav;
