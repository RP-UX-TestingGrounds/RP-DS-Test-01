import { convertToTwelveHour, extendedDateFormat } from './date-format';

describe('convertToTwelveHour', () => {
  it('formats time correctly in en-US', () => {
    const time = new Date('2025-08-01T14:30:00');
    const result = convertToTwelveHour(time, 'en-US');
    expect(result).toMatch('2:30 PM');
  });

  it('formats time correctly in fr-CA ', () => {
    const time = new Date('2025-08-01T13:05:00');
    const result = convertToTwelveHour(time, 'fr-CA');
    expect(result).toMatch('13 h 05');
  });

  it('works with midnight (00:00)', () => {
    const time = new Date('2025-08-01T00:00:00');
    const result = convertToTwelveHour(time, 'en-US');
    expect(result).toMatch('12:00 AM');
  });

  it('works with noon (12:00)', () => {
    const time = new Date('2025-08-01T12:00:00');
    const result = convertToTwelveHour(time, 'en-US');
    expect(result).toMatch('12:00 PM');
  });

  it('handles invalid date gracefully (should throw)', () => {
    expect(() => {
      convertToTwelveHour(new Date('invalid-date'));
    }).toThrow();
  });
});

describe('extendedDateFormat', () => {
  it('formats date correctly in en-US', () => {
    const date = new Date('2025-08-01T12:00:00Z');
    const result = extendedDateFormat(date, 'en-US');
    expect(result).toBe('August 1, 2025');
  });

  it('formats date correctly in fr-CA', () => {
    const date = new Date('2025-08-01T12:00:00Z');
    const result = extendedDateFormat(date, 'fr-CA');
    expect(result).toMatch('1 août 2025');
  });

  it('handles invalid date gracefully (should throw)', () => {
    expect(() => {
      extendedDateFormat(new Date('invalid-date'));
    }).toThrow();
  });
});
