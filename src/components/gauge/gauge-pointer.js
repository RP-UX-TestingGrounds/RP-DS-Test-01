import React from 'react';
import PropTypes from 'prop-types';

export default function GaugePointer({
  actualCx,
  actualCy,
  currentAngle,
  arcRadius,
}) {
  return (
    <g
      transform={`translate(${actualCx}, ${actualCy}) rotate(${currentAngle - 40})`}
      style={{ transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      <g transform={`scale(${(arcRadius * 0.70) / 62})`}>
        {/* Gray base circle centered at origin */}
        <circle
          cx="0"
          cy="0"
          r="10.1976"
          fill="var(--gauge-base-color)"
        />
        {/* Pointer shape */}
        <path
          d="M41.9746 -55.6132C42.5965 -56.3322 43.6742 -56.4342 44.42 -55.8448C45.1659 -55.2554 45.3157 -54.1834 44.7599 -53.4121L3.98053 3.18612C2.35623 5.44052 -0.820489 5.88442 -3.00053 4.16162C-5.18058 2.43882 -5.48298 -0.754488 -3.66508 -2.85589L41.9746 -55.6132Z"
          fill="var(--gauge-pointer-color)"
        />
      </g>
    </g>
  );
}

GaugePointer.propTypes = {
  actualCx: PropTypes.number.isRequired,
  actualCy: PropTypes.number.isRequired,
  arcRadius: PropTypes.number.isRequired,
  currentAngle: PropTypes.number.isRequired,
};
