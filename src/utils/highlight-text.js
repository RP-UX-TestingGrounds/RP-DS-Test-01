// Utility to escape regex special characters
const escapeRegExp = (string = '') => String(string).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default function highlightText(text = '', query = '') {
  if (!query) {
    return text;
  }
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  const parts = String(text).split(regex);

  return parts.map((part, i) => {
    return regex.test(part)
      ? (
        <em key={`${part}-${i}`}>
          {part}
        </em>
      ) : (
        part
      );
  });
}
