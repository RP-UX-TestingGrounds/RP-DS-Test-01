import PropTypes from 'prop-types';
import { Popover as MuiPopover, styled } from '@mui/material';

const StyledPopover = styled(MuiPopover)(() => ({
  '& .MuiPaper-root': {
    backgroundColor: 'var(--popover-bg-color)',
    borderRadius: 'var(--popover-border-radius)',
    boxShadow: 'var(--popover-shadow)',
    padding: 'var(--popover-padding)',
  },
}));

export const POPOVER_ANCHOR_VERTICAL = ['top', 'center', 'bottom'];
export const POPOVER_ANCHOR_HORIZONTAL = ['left', 'center', 'right'];

export default function Popover({
  anchorElement,
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'left',
  },
  children,
  onClose,
  open = false,
  transformOrigin = {
    vertical: 'top',
    horizontal: 'left',
  },
  testId,
  ...other
}) {
  const handleClose = (event, reason) => {
    if (onClose) {
      onClose(event, reason);
    }
  };

  return (
    <StyledPopover
      {...other}
      anchorEl={anchorElement || null}
      anchorOrigin={anchorOrigin}
      onClose={handleClose}
      open={open}
      transformOrigin={transformOrigin}
      slotProps={{
        ...other.slotProps,
        paper: {
          ...other.slotProps?.paper,
          'data-test-id': testId,
        },
      }}
    >
      {children}
    </StyledPopover>
  );
}

Popover.propTypes = {
  anchorElement: PropTypes.instanceOf(Element),
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(POPOVER_ANCHOR_VERTICAL),
    horizontal: PropTypes.oneOf(POPOVER_ANCHOR_HORIZONTAL),
  }),
  children: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  transformOrigin: PropTypes.shape({
    vertical: PropTypes.oneOf(POPOVER_ANCHOR_VERTICAL),
    horizontal: PropTypes.oneOf(POPOVER_ANCHOR_HORIZONTAL),
  }),
  testId: PropTypes.string,
};
