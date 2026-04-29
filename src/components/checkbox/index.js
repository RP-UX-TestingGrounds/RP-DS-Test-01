import { Checkbox as MuiCheckboxBase, styled } from '@mui/material';
import PropTypes from 'prop-types';

export const CHECKBOX_COLORS = ['primary', 'secondary', 'error', 'success', 'warning'];

const StyledCheckbox = styled(MuiCheckboxBase)({
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    color: 'inherit',
  },
});

export default function Checkbox({
  checked,
  disabled = false,
  color = 'primary',
  id,
  indeterminate = false,
  testId,
  value,
  ...other
}) {
  const attrs = {
    'data-test-id': testId,
  };

  return (
    <StyledCheckbox
      checked={checked}
      disableRipple={true}
      disableFocusRipple={true}
      disableTouchRipple={true}
      disabled={disabled}
      color={color}
      id={id}
      indeterminate={indeterminate}
      value={value}
      {...attrs}
      {...other}
    />
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  indeterminate: PropTypes.bool,
  color: PropTypes.oneOf(CHECKBOX_COLORS),
  testId: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};
