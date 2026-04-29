import { createArcPath, calculatePointerAngle } from './gauge-helpers';

describe('Gauge Helpers', () => {
  describe('createArcPath', () => {
    it('should generate correct path for a simple arc', () => {
      // Center (100, 100), radius 50, start 0, end 90
      // 0 degrees in MUI/Gauge is top (12 o'clock).
      // createArcPath adjusts by -90 for SVG.
      // 0 deg -> -90 deg (top)
      // 90 deg -> 0 deg (right)
      const cx = 100;
      const cy = 100;
      const radius = 50;
      const startAngle = 0;
      const endAngle = 90;

      const path = createArcPath(cx, cy, radius, startAngle, endAngle);

      // Expected calculation:
      // startRad = -90 * PI / 180 = -PI/2
      // x1 = 100 + 50 * cos(-PI/2) = 100 + 0 = 100
      // y1 = 100 + 50 * sin(-PI/2) = 100 - 50 = 50
      // endRad = 0 * PI / 180 = 0
      // x2 = 100 + 50 * cos(0) = 150
      // y2 = 100 + 50 * sin(0) = 100
      // largeArcFlag = 0 (90 - 0 <= 180)

      // Expected string: M 100 50 A 50 50 0 0 1 150 100
      // Note: float precision might cause tiny differences, so we might need fuzzy match if values were complex,
      // but for these standard angles it should be exact or close enough.

      // Using simple regex or partial match to verify structure
      expect(path).toContain('M 100 50');
      expect(path).toContain('A 50 50 0 0 1 150 100');
    });

    it('should handle large arcs > 180 degrees', () => {
      const path = createArcPath(100, 100, 50, 0, 270);
      // 270 - 0 = 270 > 180, so largeArcFlag should be 1
      expect(path).toContain('A 50 50 0 1 1');
    });
  });

  describe('calculatePointerAngle', () => {
    it('should return startAngle when activeSegments is 0', () => {
      const angle = calculatePointerAngle(-90, 180, 0, 10);
      expect(angle).toBe(-90);
    });

    it('should return correct angle for middle segment', () => {
      // Start -90, total 180. Range is -90 to 90.
      // 5 active out of 10. 50%.
      // Angle = -90 + (180 * 0.5) = 0.
      const angle = calculatePointerAngle(-90, 180, 5, 10);
      expect(angle).toBe(0);
    });

    it('should return end angle when all segments active', () => {
      // Start 0, total 100.
      // 10 active out of 10.
      // Angle = 0 + (100 * 1) = 100.
      const angle = calculatePointerAngle(0, 100, 10, 10);
      expect(angle).toBe(100);
    });
  });
});
