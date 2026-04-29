export default function translate(translations, key, data = {}) {
  if (typeof translations !== 'object') {
    throw new Error('Translations must be an object');
  }
  const translationDataKeys = Object.keys(data);

  let translated = translations[key] || key;
  if (typeof translated === 'string') {
    translationDataKeys.forEach((dataKey) => {
      translated = translated.replace(`{{${dataKey}}}`, data[dataKey]);
    });
  }

  return translated;
}
