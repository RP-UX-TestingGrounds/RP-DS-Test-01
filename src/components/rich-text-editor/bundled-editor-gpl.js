// bundled-editor-gpl.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

import 'tinymce/tinymce';
import 'tinymce/models/dom/model';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/preview';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/content/default/content.css';

export default function GplEditor({ init, ...props }) {
  return (
    <Editor
      licenseKey="gpl"
      {...props}
      init={{
        license_key: 'gpl',
        skin: false,
        content_css: false,
        ...init,
      }}
    />
  );
}

GplEditor.propTypes = { init: PropTypes.object };
GplEditor.defaultProps = { init: {} };
