import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { calculatePointerAngle } from './gauge-helpers';
import GaugeArcs from './gauge-arcs';
import GaugePointer from './gauge-pointer';

const defaultFormatText = (active, total, label, ofText) => `${active} ${ofText} ${total} ${label}`;

const nextFrame = () => new Promise((resolve) => {
  requestAnimationFrame(() => resolve());
});

const useMountAnimation = (initialValue) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let mounted = true;

    const animate = async () => {
      await nextFrame();
      await nextFrame();
      if (mounted) {
        setValue(initialValue);
      }
    };

    animate();

    return () => {
      mounted = false;
    };
  }, [initialValue]);

  return value;
};

export default function Gauge({
  testId,
  activeSegments = 0,
  width = 300,
  height = 300,
  startAngle = -110,
  endAngle = 110,
  innerRadius = '70%',
  outerRadius = '100%',
  cx,
  cy,
  margin = 0,
  sections,
  className,
  label = 'Levels Earned',
  textOf = 'of',
  formatText = defaultFormatText,
}) {
  const animatedSegments = useMountAnimation(activeSegments);

  const attrs = {
    'data-test-id': testId,
  };

  if (!sections || sections.length === 0) {
    throw new Error('Gauge component requires sections prop with at least one section');
  }

  const marginObj = typeof margin === 'number'
    ? {
      top: margin, right: margin, bottom: margin, left: margin,
    }
    : {
      top: 0, right: 0, bottom: 0, left: 0, ...margin,
    };

  const availableWidth = width - marginObj.left - marginObj.right;
  const availableHeight = height - marginObj.top - marginObj.bottom;

  // Center of the drawing area relative to the SVG
  let actualCx;
  if (cx !== undefined) {
    if (typeof cx === 'string') {
      actualCx = parseFloat(cx);
    } else {
      actualCx = cx;
    }
  } else {
    actualCx = marginObj.left + availableWidth / 2;
  }

  let actualCy;
  if (cy !== undefined) {
    if (typeof cy === 'string') {
      actualCy = parseFloat(cy);
    } else {
      actualCy = cy;
    }
  } else {
    actualCy = marginObj.top + availableHeight / 2;
  }

  // Calculate radii relative to the available space
  // Base size is the minimum dimension of the available area
  const maxRadius = Math.min(availableWidth, availableHeight) / 2;

  const actualOuterRadius = typeof outerRadius === 'string'
    ? (parseFloat(outerRadius) / 100) * maxRadius
    : outerRadius;
  const actualInnerRadius = typeof innerRadius === 'string'
    ? (parseFloat(innerRadius) / 100) * maxRadius
    : innerRadius;

  const totalSections = sections.length;

  const clampedActiveSegments = Math.min(Math.max(animatedSegments, 0), totalSections);
  const finalActiveSegments = Math.min(Math.max(activeSegments, 0), totalSections);

  // Custom text function - ALWAYS show the final value
  const text = () => formatText(finalActiveSegments, totalSections, label, textOf);

  // Draw segmented arcs with gaps
  const totalAngle = endAngle - startAngle;

  // Arc radius (middle point) and stroke width
  const arcRadius = (actualOuterRadius + actualInnerRadius) / 2;
  const gapAngle = 8;
  const strokeWidth = (actualOuterRadius - actualInnerRadius) * 0.3;

  // Calculate pointer angle - should point to the end of the last active segment
  const currentAngle = calculatePointerAngle(
    startAngle,
    totalAngle,
    clampedActiveSegments,
    totalSections,
  );

  return (
    <div
      {...attrs}
      className={className}
      style={{
        position: 'relative',
        width,
        height,
      }}
    >
      {/* SVG overlay with custom segmented arcs and pointer */}
      <svg
        width={width}
        height={height}
        style={{
          display: 'block', // Removes extra space below SVG
        }}
      >
        <g>
          {/* Render segmented arcs */}
          <GaugeArcs
            sections={sections}
            totalSections={totalSections}
            startAngle={startAngle}
            totalAngle={totalAngle}
            actualCx={actualCx}
            actualCy={actualCy}
            arcRadius={arcRadius}
            gapAngle={gapAngle}
            strokeWidth={strokeWidth}
          />
          {/* Custom SVG pointer */}
          <GaugePointer
            actualCx={actualCx}
            actualCy={actualCy}
            currentAngle={currentAngle}
            arcRadius={arcRadius}
          />
          {/* Central Text */}
          <text
            x={actualCx}
            y={actualCy + (actualOuterRadius * 0.45)}
            textAnchor="middle"
            dominantBaseline="central"
            style={{
              fill: 'var(--text-primary)',
              fontFamily: 'var(--font-family)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 'var(--font-weight-regular)',
              letterSpacing: 'var(--gauge-text-letter-spacing)',
            }}
          >
            {text()}
          </text>
        </g>
      </svg>
    </div>
  );
}

Gauge.propTypes = {
  activeSegments: PropTypes.number,
  className: PropTypes.string,
  cx: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cy: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  endAngle: PropTypes.number,
  formatText: PropTypes.func,
  height: PropTypes.number,
  innerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  margin: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      top: PropTypes.number,
      bottom: PropTypes.number,
      left: PropTypes.number,
      right: PropTypes.number,
    }),
  ]),
  outerRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sections: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: PropTypes.string.isRequired,
      }),
    ]),
  ).isRequired,
  startAngle: PropTypes.number,
  testId: PropTypes.string,
  textOf: PropTypes.string,
  width: PropTypes.number,
};
