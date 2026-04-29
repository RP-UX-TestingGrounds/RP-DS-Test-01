import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '../checkbox';

const StyledListItemButton = styled(MuiListItemButton)(({ selected }) => ({
  padding: 'var(--spacing-12) var(--spacing-16)',
  borderRadius: 'var(--radius)',
  backgroundColor: selected ? 'var(--primary-light)' : 'var(--white)',
  '&:hover': {
    backgroundColor: 'var(--primary-light)',
  },
  '&:active': {
    backgroundColor: 'hsl(from var(--primary-light) h s calc(l * 0.95))',
  },
  '&.Mui-selected': {
    backgroundColor: 'var(--primary-light)',
    '&:hover': {
      backgroundColor: 'var(--primary-light)',
    },
    '&:active': {
      backgroundColor: 'hsl(from var(--primary-light) h s calc(l * 0.95))',
    },
  },
}));

const StyledListItemIcon = styled(MuiListItemIcon)({
  minWidth: 'auto',
});

const TextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const PrimaryText = styled('span', {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ selected }) => ({
  fontSize: 'var(--typography-body-md-font-size)',
  fontWeight: 'var(--font-weight-medium)',
  lineHeight: 'var(--typography-body-md-line-height)',
  color: selected ? 'var(--primary-main)' : 'var(--text-primary)',
}));

const SecondaryText = styled('span')({
  fontSize: 'var(--typography-body-sm-font-size)',
  lineHeight: 'var(--typography-body-sm-line-height)',
  color: 'var(--text-secondary)',
});

const ListItem = ({
  label,
  onChange,
  selected = false,
  showCheckbox = false,
  subLabel,
  testId,
  value,
}) => {
  const handleClick = () => {
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <StyledListItemButton
      selected={selected}
      onClick={handleClick}
      disableRipple
      data-test-id={testId}
    >
      {showCheckbox && (
        <StyledListItemIcon>
          <Checkbox
            checked={selected}
            color="primary"
            tabIndex={-1}
          />
        </StyledListItemIcon>
      )}
      <TextContainer>
        <PrimaryText selected={selected}>{label}</PrimaryText>
        {subLabel && <SecondaryText>{subLabel}</SecondaryText>}
      </TextContainer>
    </StyledListItemButton>
  );
};

ListItem.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  selected: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  subLabel: PropTypes.string,
  testId: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default ListItem;
