import {
  formatAcceptToLabel,
  getAcceptedMimeTypes,
  getSupportText,
  UPLOAD_VALIDATION_ERROR_KEY,
  validateFile,
} from './upload-image-helpers';

const passthroughTranslate = (key, data = {}) => {
  const map = {
    defaultFormatList: 'SVG, PNG, JPG or GIF',
    formatListBeforeOrLast: `${data.before} or ${data.last}`,
    formatListItemSeparator: ', ',
    supportFormatsMax: `${data.formats} (max. ${data.maxSize})`,
  };
  return map[key] ?? key;
};

describe('upload-image-helpers', () => {
  describe('formatAcceptToLabel', () => {
    it('uses translate fallback when accept is missing', () => {
      expect(formatAcceptToLabel(undefined, passthroughTranslate)).toBe('SVG, PNG, JPG or GIF');
    });

    it('formats multiple types with "or" before last', () => {
      expect(formatAcceptToLabel('image/png,image/jpeg', passthroughTranslate)).toBe('PNG or JPG');
    });

    it('formats three or more types with commas then translated or', () => {
      expect(formatAcceptToLabel('image/png,image/jpeg,image/gif', passthroughTranslate)).toBe('PNG, JPG or GIF');
    });
  });

  describe('getAcceptedMimeTypes', () => {
    it('returns defaults when empty', () => {
      expect(getAcceptedMimeTypes()).toEqual(['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif']);
    });

    it('parses comma-separated list', () => {
      expect(getAcceptedMimeTypes('application/pdf, image/png')).toEqual(['application/pdf', 'image/png']);
    });
  });

  describe('getSupportText', () => {
    it('returns hintText when set', () => {
      expect(getSupportText({
        hintText: 'Custom hint',
        maxFileSize: 1000,
        translate: passthroughTranslate,
      })).toBe('Custom hint');
    });

    it('builds support line from accept and max size', () => {
      expect(getSupportText({
        acceptedFileTypes: 'image/png',
        maxFileSize: 1024,
        translate: passthroughTranslate,
      })).toBe('PNG (max. 1 KB)');
    });
  });

  describe('validateFile', () => {
    const png = new File(['x'], 'a.png', { type: 'image/png' });

    it('returns valid for allowed type and size', () => {
      expect(validateFile(png, 'image/png', 9999)).toEqual({ valid: true });
    });

    it('returns error key for wrong type', () => {
      const pdf = new File(['x'], 'a.pdf', { type: 'application/pdf' });
      expect(validateFile(pdf, 'image/png', 9999)).toEqual({
        errorKey: UPLOAD_VALIDATION_ERROR_KEY.UNSUPPORTED_FILE,
        valid: false,
      });
    });

    it('returns error key when too large', () => {
      const big = new File([new Uint8Array(2000)], 'a.png', { type: 'image/png' });
      expect(validateFile(big, 'image/png', 100)).toEqual({
        errorKey: UPLOAD_VALIDATION_ERROR_KEY.FILE_TOO_LARGE,
        valid: false,
      });
    });
  });
});
