import React from 'react';
import PropTypes from 'prop-types';
import {
  Divider,
  ListSubheader,
  Menu as MuiMenu,
  styled,
} from '@mui/material';
import MenuItem from './menu-item';
import EmptyMessage from '../empty-message';

// Styled component for the dropdown menu
const StyledMenu = styled(MuiMenu)(() => ({
  '& .MuiPaper-root': {
    backgroundColor: 'var(--card-color)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow-menu)',
    maxHeight: 'clamp(300px, 50vh, 80vh)',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}));

const StyledGroupHeader = styled(ListSubheader)({
  backgroundColor: 'var(--grey-100)',
  color: 'var(--text-secondary)',
  fontFamily: 'var(--font-family)',
  fontSize: 'var(--typography-body-md-font-size)',
  fontWeight: 'var(--font-weight-semibold)',
  lineHeight: 'var(--typography-body-sm-line-height)',
  padding: '8px 16px 4px',
});

export default function Menu({
  anchorElement,
  groups,
  items = [],
  onItemClick,
  onClose,
  open = false,
  optionIcon = false,
  iconPosition = 'start',
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
  },
  transformOrigin = {
    vertical: 'top',
    horizontal: 'left',
  },
  testId,
  emptyMessage,
  selectedValue,
}) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleItemClick = (item) => {
    // If item has its own onClick handler, use that instead
    if (item.onClick) {
      item.onClick(item);
    }

    // Call the parent's onItemClick if provided
    if (onItemClick) {
      onItemClick(item);
    }

    handleClose();
  };

  return (
    <StyledMenu
      anchorEl={anchorElement || null}
      open={open}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      slotProps={{
        paper: {
          sx: {
            minWidth: anchorElement?.offsetWidth || 'auto',
          },
          'data-test-id': testId,
        },
      }}
    >
      {items.length === 0 && !(groups?.length > 0) && emptyMessage && (
        <EmptyMessage message={emptyMessage} />
      )}
      {groups?.length > 0 && groups
        .filter((group) => group.items?.length > 0)
        .map((group, groupIndex) => (
          <React.Fragment key={`group-${group.label}`}>
            {groupIndex > 0 && <Divider />}
            <StyledGroupHeader>{group.label}</StyledGroupHeader>
            {group.items.map((item, index) => (
              <MenuItem
                key={item.value || index}
                onClick={() => handleItemClick(item)}
                selected={selectedValue !== undefined && item.value === selectedValue}
                disabled={item.disabled}
                optionIcon={optionIcon}
                iconPosition={iconPosition}
                icon={item.icon}
                color={item.color || 'default'}
                style={{ paddingLeft: '22px' }}
                data-test-id={item.testId || (testId ? `${testId}_menu-item-${item.value}` : undefined)}
              >
                {item.label}
              </MenuItem>
            ))}
          </React.Fragment>
        ))}
      {!(groups?.length > 0) && items.length > 0 && items.map((item, index) => (
        <MenuItem
          key={item.value || index}
          onClick={() => handleItemClick(item)}
          selected={selectedValue !== undefined && item.value === selectedValue}
          disabled={item.disabled}
          optionIcon={optionIcon}
          iconPosition={iconPosition}
          icon={item.icon}
          color={item.color || 'default'}
          data-test-id={item.testId || (testId ? `${testId}_menu-item-${item.value}` : undefined)}
        >
          {item.label}
        </MenuItem>
      ))}
    </StyledMenu>
  );
}

const itemShape = PropTypes.shape({
  disabled: PropTypes.bool,
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  testId: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
});

Menu.propTypes = {
  anchorElement: PropTypes.instanceOf(Element),
  groups: PropTypes.arrayOf(PropTypes.shape({
    items: PropTypes.arrayOf(itemShape),
    label: PropTypes.string.isRequired,
  })),
  items: PropTypes.arrayOf(itemShape),
  onItemClick: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  optionIcon: PropTypes.bool,
  iconPosition: PropTypes.oneOf(['start', 'end']),
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['top', 'bottom', 'center']),
    horizontal: PropTypes.oneOf(['left', 'right', 'center']),
  }),
  transformOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(['top', 'bottom', 'center']),
    horizontal: PropTypes.oneOf(['left', 'right', 'center']),
  }),
  testId: PropTypes.string,
  emptyMessage: PropTypes.string,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
