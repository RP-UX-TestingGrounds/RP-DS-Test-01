/**
 * Human-readable file size for UI (KB / MB / B).
 *
 * @param {number} bytes
 * @returns {string}
 */
export default function formatFileSize(bytes) {
  if (bytes >= 1024 * 1024) {
    return `${Math.round(bytes / (1024 * 1024))} MB`;
  }
  if (bytes >= 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }
  return `${bytes} B`;
}
