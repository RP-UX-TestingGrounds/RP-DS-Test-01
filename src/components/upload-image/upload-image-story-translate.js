import defaultTranslate from '../../utils/translation';

/**
 * English strings for Storybook and unit tests only. The component default `translate`
 * returns `—{key}—` placeholders so production apps must supply real i18n.
 *
 * @param {string} key
 * @param {Record<string, string>} [data]
 * @returns {string}
 */
function englishUploadImageTranslate(key, data = {}) {
  const translations = {
    ariaReplaceRegion: 'Click or drag to replace file',
    ariaUploadRegion: 'Upload file by clicking or dragging',
    complete: 'Complete',
    defaultFormatList: 'SVG, PNG, JPG or GIF',
    fileTooLarge: 'File too large.',
    formatListBeforeOrLast: '{{before}} or {{last}}',
    formatListItemSeparator: ', ',
    loading: 'Loading',
    orDragAndDrop: ' or Drag and Drop',
    removeFile: 'Remove file',
    statusFailed: 'Failed',
    supportFormatsMax: '{{formats}} (max. {{maxSize}})',
    unsupportedFile: 'Unsupported file.',
    uploadErrorFallback: 'Failed',
    uploadFailed: 'Upload failed.',
    uploadedFileFallback: 'Uploaded file',
    uploadedImageAlt: 'Uploaded file preview',
    uploadLabel: 'Upload File',
  };
  return defaultTranslate(translations, key, data);
}

export default englishUploadImageTranslate;
