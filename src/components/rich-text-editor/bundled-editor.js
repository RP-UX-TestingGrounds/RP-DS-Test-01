import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';

const GplEditor = lazy(() => import('./bundled-editor-gpl'));
const CdnEditor = lazy(() => import('./rich-text-editor-cdn'));

export default function BundledEditor({ apiKey, ...props }) {
  const hasApiKey = apiKey && apiKey.trim().length > 0;
  const mode = hasApiKey ? 'cdn' : 'gpl';

  return (
    <Suspense key={mode} fallback={<div>Loading editor...</div>}>
      {hasApiKey ? (
        <CdnEditor apiKey={apiKey} {...props} />
      ) : (
        <GplEditor {...props} />
      )}
    </Suspense>
  );
}

BundledEditor.propTypes = {
  apiKey: PropTypes.string,
  init: PropTypes.object,
};

BundledEditor.defaultProps = {
  apiKey: undefined,
  init: {},
};
