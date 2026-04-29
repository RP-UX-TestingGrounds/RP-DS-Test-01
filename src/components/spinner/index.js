import { CircularProgress as MuiCircularProgressBase, styled } from '@mui/material';
import PropTypes from 'prop-types';

const StyledCircularProgress = styled(MuiCircularProgressBase)({
  color: 'var(--primary-color)',
});

export default function Spinner({
  size = 'medium',
}) {
  const spinnerSize = {
    small: 20,
    medium: 44,
    large: 66,
    huge: 88,
  };
  // thickness scales with size, so do adjustments here
  const thickness = {
    small: 3,
    medium: 2,
    large: 2,
    huge: 2,
  };

  return (
    <StyledCircularProgress
      size={spinnerSize[size]}
      thickness={thickness[size]}
    />
  );
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large', 'huge']),
};
