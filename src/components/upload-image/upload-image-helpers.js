import formatFileSize from '../../utils/format-file-size';

export const UPLOAD_VALIDATION_ERROR_KEY = {
  FILE_TOO_LARGE: 'fileTooLarge',
  UNSUPPORTED_FILE: 'unsupportedFile',
};

/** MIME → short label for support text (not translated; type codes). */
export const MIME_TO_EXT = {
  'application/pdf': 'PDF',
  'image/gif': 'GIF',
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/svg+xml': 'SVG',
};

/**
 * @param {string} mime
 * @returns {string|null}
 */
function mimeToFormatLabel(mime) {
  if (!mime) {
    return null;
  }
  const mapped = MIME_TO_EXT[mime];
  if (mapped) {
    return mapped;
  }
  const subtype = mime.replace(/^[^/]+\//, '');
  if (!subtype) {
    return null;
  }
  return subtype.toUpperCase();
}

/**
 * Format accept string for support text; list separators and "or" come from `translate`.
 *
 * @param {string} [acceptedFileTypes]
 * @param {(key: string, data?: object) => string} translate
 * @returns {string}
 */
export function formatAcceptToLabel(acceptedFileTypes, translate) {
  const fallback = translate('defaultFormatList');
  if (!acceptedFileTypes || typeof acceptedFileTypes !== 'string') {
    return fallback;
  }
  const parts = acceptedFileTypes.split(',').map((t) => t.trim().toLowerCase());
  const rawLabels = parts.map((mime) => mimeToFormatLabel(mime));
  const labels = [...new Set(rawLabels.filter(Boolean))];
  if (labels.length === 0) return fallback;
  if (labels.length === 1) return labels[0];
  const last = labels[labels.length - 1];
  const rest = labels.slice(0, -1);
  const itemSeparator = translate('formatListItemSeparator');
  const before = rest.join(itemSeparator);
  return translate('formatListBeforeOrLast', { before, last });
}

/**
 * @param {string} [acceptedFileTypes]
 * @returns {string[]}
 */
export function getAcceptedMimeTypes(acceptedFileTypes) {
  if (!acceptedFileTypes || typeof acceptedFileTypes !== 'string') {
    return ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'];
  }
  return acceptedFileTypes.split(',').map((t) => t.trim().toLowerCase());
}

/**
 * @param {object} options
 * @param {string} [options.hintText] - full hint from consumer (already localized when applicable)
 * @param {string} [options.acceptedFileTypes]
 * @param {number} options.maxFileSize
 * @param {string} [options.acceptedFormatsLabel] - override format segment
 * @param {(key: string, data?: object) => string} options.translate
 * @param {(n: number) => string} [options.formatFileSizeFn]
 * @returns {string}
 */
export function getSupportText({
  acceptedFileTypes,
  acceptedFormatsLabel,
  formatFileSizeFn = formatFileSize,
  hintText,
  maxFileSize,
  translate,
}) {
  if (hintText != null && hintText !== '') {
    return hintText;
  }
  const formats = acceptedFormatsLabel ?? formatAcceptToLabel(acceptedFileTypes, translate);
  return translate('supportFormatsMax', {
    formats,
    maxSize: formatFileSizeFn(maxFileSize),
  });
}

/**
 * @param {File} file
 * @param {string} [acceptedFileTypes]
 * @param {number} maxFileSize
 * @returns {{ valid: true } | { valid: false, errorKey: string }}
 */
export function validateFile(file, acceptedFileTypes, maxFileSize) {
  const allowed = getAcceptedMimeTypes(acceptedFileTypes);
  const type = (file.type || '').toLowerCase();
  if (!allowed.some((t) => type === t || (t.endsWith('/*') && type.startsWith(t.replace(/\/\*$/, '/'))))) {
    return { errorKey: UPLOAD_VALIDATION_ERROR_KEY.UNSUPPORTED_FILE, valid: false };
  }
  if (file.size > maxFileSize) {
    return { errorKey: UPLOAD_VALIDATION_ERROR_KEY.FILE_TOO_LARGE, valid: false };
  }
  return { valid: true };
}
