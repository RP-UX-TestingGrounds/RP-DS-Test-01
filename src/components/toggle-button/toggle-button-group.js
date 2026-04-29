import React from 'react';
import { ToggleButtonGroup as MuiToggleButtonGroup, styled } from '@mui/material';
import PropTypes from 'prop-types';
import cx from 'classnames';

const StyledToggleButtonGroup = styled(MuiToggleButtonGroup)(() => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: '0',
    marginLeft: '0',
    marginRight: '0',
    border: '1px solid var(--border-primary)',
    '&:not(:first-of-type)': {
      marginLeft: '0',
      marginRight: '0',
      borderLeft: 'none',
    },
    '&:first-of-type': {
      marginLeft: '0',
      marginRight: '0',
      borderTopLeftRadius: 'var(--radius-button-field)',
      borderBottomLeftRadius: 'var(--radius-button-field)',
    },
    '&:last-of-type': {
      marginLeft: '0',
      marginRight: '0',
      borderTopRightRadius: 'var(--radius-button-field)',
      borderBottomRightRadius: 'var(--radius-button-field)',
    },
    '&:not(:first-of-type):not(:last-of-type)': {
      marginLeft: '0',
      marginRight: '0',
    },
  },
  '&.MuiToggleButtonGroup-vertical .MuiToggleButtonGroup-grouped': {
    marginTop: '0',
    marginBottom: '0',
    '&:not(:first-of-type)': {
      marginTop: '0',
      marginBottom: '0',
      marginLeft: '0',
      borderLeft: '1px solid var(--border-primary)',
      borderTop: 'none',
    },
    '&:first-of-type': {
      marginTop: '0',
      marginBottom: '0',
      borderTopLeftRadius: 'var(--radius-button-field)',
      borderTopRightRadius: 'var(--radius-button-field)',
      borderBottomLeftRadius: '0',
    },
    '&:last-of-type': {
      marginTop: '0',
      marginBottom: '0',
      borderBottomLeftRadius: 'var(--radius-button-field)',
      borderBottomRightRadius: 'var(--radius-button-field)',
      borderTopRightRadius: '0',
    },
    '&:not(:first-of-type):not(:last-of-type)': {
      marginTop: '0',
      marginBottom: '0',
    },
  },
}));

export default function ToggleButtonGroup({
  testId,
  value,
  exclusive = true,
  onChange,
  size = 'medium',
  orientation = 'horizontal',
  children,
  className,
  ...other
}) {
  const attrs = {
    'data-test-id': testId,
  };

  const classes = cx(className);

  // Clone children to pass color and size props to each ToggleButton
  const enhancedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        size: child.props.size || size,
      });
    }
    return child;
  });

  return (
    <StyledToggleButtonGroup
      value={value}
      exclusive={exclusive}
      onChange={onChange}
      size={size}
      orientation={orientation}
      className={classes}
      {...attrs}
      {...other}
    >
      {enhancedChildren}
    </StyledToggleButtonGroup>
  );
}

ToggleButtonGroup.propTypes = {
  testId: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
  exclusive: PropTypes.bool,
  onChange: PropTypes.func,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  children: PropTypes.node,
  className: PropTypes.string,
};
