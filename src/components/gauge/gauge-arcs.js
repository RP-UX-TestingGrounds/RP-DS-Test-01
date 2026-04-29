import React from 'react';
import PropTypes from 'prop-types';
import { createArcPath } from './gauge-helpers';

export default function GaugeArcs({
  sections,
  totalSections,
  startAngle,
  totalAngle,
  actualCx,
  actualCy,
  arcRadius,
  gapAngle,
  strokeWidth,
}) {
  return (
    <>
      {sections.map((section, index) => {
        const segmentIndex = index;

        const sectionPercent = (segmentIndex + 1) / totalSections;
        const prevSectionPercent = segmentIndex / totalSections;

        const sectionStartAngle = startAngle + (totalAngle * prevSectionPercent);
        const sectionEndAngle = startAngle + (totalAngle * sectionPercent);

        const adjustedStartAngle = sectionStartAngle + gapAngle / 2;
        const adjustedEndAngle = sectionEndAngle - gapAngle / 2;

        if (adjustedEndAngle <= adjustedStartAngle) {
          return null;
        }

        const segmentColor = typeof section === 'string' ? section : section.color;

        return (
          <path
            key={index}
            d={createArcPath(actualCx, actualCy, arcRadius, adjustedStartAngle, adjustedEndAngle)}
            stroke={segmentColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
          />
        );
      })}
    </>
  );
}

GaugeArcs.propTypes = {
  actualCx: PropTypes.number.isRequired,
  actualCy: PropTypes.number.isRequired,
  arcRadius: PropTypes.number.isRequired,
  gapAngle: PropTypes.number.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: PropTypes.string.isRequired,
      }),
    ]),
  ).isRequired,
  startAngle: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number.isRequired,
  totalAngle: PropTypes.number.isRequired,
  totalSections: PropTypes.number.isRequired,
};
