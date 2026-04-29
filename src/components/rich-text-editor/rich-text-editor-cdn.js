import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

export default function CdnEditor({ apiKey, init, ...props }) {
  return (
    <Editor
      apiKey={apiKey}
      {...props}
      init={init}
    />
  );
}

CdnEditor.propTypes = {
  apiKey: PropTypes.string,
  init: PropTypes.object,
};

CdnEditor.defaultProps = {
  apiKey: undefined,
  init: {},
};
