import React from 'react';
import { MenuItem as MuiMenuItemBase, styled } from '@mui/material';
import PropTypes from 'prop-types';

import Checkbox from '../checkbox';

const StyledMenuItem = styled(MuiMenuItemBase)(({ highlighted }) => ({
  fontWeight: 'var(--font-weight-regular)',
  '&.Mui-selected': {
    backgroundColor: 'var(--primary-light)',
    color: 'var(--primary-dark)',
    fontWeight: 'var(--font-weight-medium)',
  },
  ...(highlighted && {
    backgroundColor: 'var(--bg-warning-color)',
  }),
}));

const MenuItem = React.forwardRef(({
  children,
  checkbox,
  selected,
  highlighted,
  disabled,
  ...other
}, ref) => (
    <StyledMenuItem
      ref={ref}
      selected={selected}
      disableRipple
      highlighted={highlighted}
      disabled={disabled}
      {...other}
    >
      {checkbox && (
        <Checkbox
          color="primary"
          checked={selected}
          disabled={disabled}
        />
      )}
      {children}
    </StyledMenuItem>
));

MenuItem.propTypes = {
  children: PropTypes.node,
  checkbox: PropTypes.bool,
  selected: PropTypes.bool,
  highlighted: PropTypes.bool,
  disabled: PropTypes.bool,
};
MenuItem.displayName = 'MenuItem';

export default MenuItem;
