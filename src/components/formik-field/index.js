import PropTypes from 'prop-types';

export default function FormikField({
  InputField,
  formik,
  helperText: inputHelperText,
  name,
  onBlur,
  onChange,
  testId,
  ...other
}) {
  // Get field-specific values from formik
  const {
    value,
    onChange: onChangeFormik,
    onBlur: onBlurFormik,
  } = formik.getFieldProps(name);

  const {
    error,
    touched,
  } = formik.getFieldMeta(name);

  let handleChange = onChange;
  if (onChangeFormik) {
    handleChange = (e) => {
      onChangeFormik(e);
      if (typeof onChange === 'function') {
        onChange(e);
      }
    };
  }

  let handleBlur = onBlur;
  if (onBlurFormik) {
    handleBlur = (e) => {
      onBlurFormik(e);
      if (typeof onBlur === 'function') {
        onBlur(e);
      }
    };
  }

  const showError = error && touched;
  const helperText = showError ? error : inputHelperText;

  // Create enhanced props for the InputField component
  const enhancedProps = {
    name,
    testId,
    error: showError,
    helperText,
    value,
    onChange: handleChange,
    onBlur: handleBlur,
    // Pass through any additional props that the InputField might need
    ...other,
  };

  // Render the InputField component with the enhanced props
  return <InputField {...enhancedProps} />;
}

FormikField.propTypes = {
  InputField: PropTypes.func.isRequired,
  formik: PropTypes.object.isRequired,
  helperText: PropTypes.string,
  name: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  testId: PropTypes.string.isRequired,
};
