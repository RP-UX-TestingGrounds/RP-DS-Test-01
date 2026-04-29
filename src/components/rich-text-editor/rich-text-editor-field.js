import PropTypes from 'prop-types';
import FormikField from '../formik-field';
import RichTextEditor from './index';

/**
 * RichTextEditorField - A Formik-compatible wrapper for RichTextEditor
 *
 * This component integrates RichTextEditor with Formik form state management,
 * automatically handling validation, error display, and field state synchronization.
 *
 * @example
 * ```
 * import { useFormik } from 'formik';
 * import * as yup from 'yup';
 * import RichTextEditorField from './rich-text-editor-field';
 *
 * const MyForm = () => {
 *   const formik = useFormik({
 *     initialValues: { content: '' },
 *     validationSchema: yup.object({
 *       content: yup.string().required('Content is required')
 *     }),
 *     onSubmit: (values) => console.log(values)
 *   });
 *
 *   return (
 *     <RichTextEditorField
 *       formik={formik}
 *       name="content"
 *       label="Content"
 *       testId="content-editor"
 *     />
 *   );
 * };
 * ```
 */
export default function RichTextEditorField({
  formik,
  name,
  testId,
  ...other
}) {
  return (
    <FormikField
      InputField={RichTextEditor}
      formik={formik}
      name={name}
      testId={testId}
      {...other}
    />
  );
}

RichTextEditorField.propTypes = {
  /** Formik instance from useFormik hook */
  formik: PropTypes.object.isRequired,
  /** Field name that matches Formik form values */
  name: PropTypes.string.isRequired,
  /** Test ID for testing purposes */
  testId: PropTypes.string.isRequired,
  /** Label text displayed above the editor */
  label: PropTypes.string,
  /** Placeholder text shown when editor is empty */
  placeholder: PropTypes.string,
  /** Disabled state */
  disabled: PropTypes.bool,
  /** Required field indicator */
  required: PropTypes.bool,
  /** CSS class name */
  className: PropTypes.string,
  /** Optional TinyMCE API key. If not provided, uses open-source version */
  apiKey: PropTypes.string,
  /** Override the full toolbar string */
  toolbarOptions: PropTypes.string,
  /** File upload handler function */
  onFileUpload: PropTypes.func,
  /** Character limit for the editor */
  characterLimit: PropTypes.number,
  /** Callback when editor is ready. Receives editor instance. */
  onEditorReady: PropTypes.func,
  /** Value to insert into editor */
  insertValue: PropTypes.string,
  /** Callback when text is inserted */
  onTextInserted: PropTypes.func,
  /** Editor height in pixels */
  height: PropTypes.number,
  /** Callback when Insert Template button is clicked. Receives editor instance. */
  onInsertTemplate: PropTypes.func,
  /** Callback when Email Checker button is clicked. Receives editor instance. */
  onEmailChecker: PropTypes.func,
  /** Grouped text replacements rendered as sections with headers: [{ label, items: [{ label, value }] }] */
  textReplacementGroups: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
  /** Array of text replacement options: [{ label: string, value: string }] */
  textReplacements: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  /** Array of templates: [{ title: string, content: string }] or [{ name: string, html: string }] */
  templates: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      name: PropTypes.string,
      content: PropTypes.string,
      html: PropTypes.string,
    }),
  ),
};
