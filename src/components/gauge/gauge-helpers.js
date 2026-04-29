/**
 * Generates an SVG path string for an arc.
 * Adjusts angles by -90 degrees to convert from MUI/CSS angles (0 at top) to SVG angles (0 at right).
 *
 * @param {number} cx - X coordinate of the center
 * @param {number} cy - Y coordinate of the center
 * @param {number} radius - Radius of the arc
 * @param {number} startAngle - Start angle in degrees
 * @param {number} endAngle - End angle in degrees
 * @returns {string} SVG path data string (d attribute)
 */
export const createArcPath = (cx, cy, radius, startAngle, endAngle) => {
  const startRad = ((startAngle - 90) * Math.PI) / 180;
  const endRad = ((endAngle - 90) * Math.PI) / 180;
  const x1 = cx + radius * Math.cos(startRad);
  const y1 = cy + radius * Math.sin(startRad);
  const x2 = cx + radius * Math.cos(endRad);
  const y2 = cy + radius * Math.sin(endRad);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
};

/**
 * Calculates the rotation angle for the gauge pointer.
 * The pointer points to the end of the last active segment.
 *
 * @param {number} startAngle - The starting angle of the gauge in degrees
 * @param {number} totalAngle - The total span of the gauge in degrees
 * @param {number} activeSegments - Number of active/filled segments
 * @param {number} totalSections - Total number of segments
 * @returns {number} The rotation angle for the pointer
 */
export const calculatePointerAngle = (startAngle, totalAngle, activeSegments, totalSections) => {
  if (activeSegments <= 0) {
    return startAngle;
  }
  const endPercent = activeSegments / totalSections;
  return startAngle + (totalAngle * endPercent);
};
