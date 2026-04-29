import { FormControlLabel as MuiFormControlLabelBase, styled } from '@mui/material';
import PropTypes from 'prop-types';

const StyledFormControlLabel = styled(MuiFormControlLabelBase, {
  shouldForwardProp: (prop) => prop !== 'fullWidth',
})(({ fullWidth }) => ({
  width: fullWidth ? '100%' : 'auto',
  '& .MuiFormControlLabel-label': {
    fontFamily: 'var(--font-family)',
    fontSize: 'var(--body-font-size)',
  },
}));

export const FORM_CONTROL_LABEL_PLACEMENT = ['end', 'start', 'top', 'bottom'];

export default function FormControlLabel({
  control,
  fullWidth = false,
  label,
  labelPlacement = 'end',
  testId,
  value,
  ...other
}) {
  const attrs = {};
  if (testId) {
    attrs['data-test-id'] = testId;
  }

  return (
    <StyledFormControlLabel
      control={control}
      fullWidth={fullWidth}
      label={label}
      labelPlacement={labelPlacement}
      value={value}
      {...attrs}
      {...other}
    />
  );
}

FormControlLabel.propTypes = {
  control: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  labelPlacement: PropTypes.oneOf(FORM_CONTROL_LABEL_PLACEMENT),
  testId: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
