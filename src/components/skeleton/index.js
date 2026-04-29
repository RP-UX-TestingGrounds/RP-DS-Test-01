import React from 'react';
import { Skeleton as MuiSkeletonBase, styled } from '@mui/material';
import PropTypes from 'prop-types';
import cx from 'classnames';

const StyledSkeleton = styled(MuiSkeletonBase)(() => ({
  fontFamily: 'inherit',
  backgroundColor: 'var(--skeleton-bg-color)',
  '&.MuiSkeleton-root': {
    transform: 'none',
  },
  // Text variant uses font-size to control height
  '&.MuiSkeleton-text': {
    borderRadius: 'var(--radius-button-field)',
  },
  // Rectangular variant
  '&.MuiSkeleton-rectangular': {
    borderRadius: 'var(--radius-none)',
  },
  // Rounded variant
  '&.MuiSkeleton-rounded': {
    borderRadius: 'var(--radius-button-field)',
  },
  // Circular variant
  '&.MuiSkeleton-circular': {
    borderRadius: 'var(--radius-circle)',
  },
}));

export const SKELETON_VARIANTS = ['text', 'circular', 'rectangular', 'rounded'];
export const SKELETON_ANIMATIONS = ['pulse', 'wave', false];

const Skeleton = React.forwardRef(({
  testId,
  variant = 'text',
  animation = 'pulse',
  width,
  height,
  className,
  sx,
  ...other
}, ref) => {
  const attrs = {
    'data-test-id': testId,
  };

  const classes = cx(className);

  return (
    <StyledSkeleton
      ref={ref}
      variant={variant}
      animation={animation}
      width={width}
      height={height}
      className={classes}
      sx={sx}
      {...attrs}
      {...other}
    />
  );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;

Skeleton.propTypes = {
  animation: PropTypes.oneOf(SKELETON_ANIMATIONS),
  className: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  sx: PropTypes.object,
  testId: PropTypes.string,
  variant: PropTypes.oneOf(SKELETON_VARIANTS),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
