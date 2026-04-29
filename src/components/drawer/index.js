import {
  Drawer as MuiDrawer,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Close } from '@mui/icons-material';

import IconButton from '../icon-button';
import DrawerHeader from './drawer-header';

export const DRAWER_SIZES = ['extra-small', 'small', 'medium', 'large'];
export const DRAWER_ANCHORS = ['bottom', 'left', 'right', 'top'];

const sizeMap = {
  'extra-small': 'var(--breakpoint-extra-small)',
  small: 'var(--breakpoint-small)',
  medium: 'var(--breakpoint-medium)',
  large: 'var(--breakpoint-large)',
};

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'size',
})(({ size, anchor }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: 'var(--card-color)',
    borderRadius: 'var(--radius-none)',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100vh',
    maxWidth: '100vw',
    ...(['left', 'right'].includes(anchor) && {
      width: sizeMap[size] || sizeMap.small,
    }),
    ...(['top', 'bottom'].includes(anchor) && {
      height: sizeMap[size] || sizeMap.small,
    }),
  },
}));

const DefaultHeader = ({
  title,
  onClose,
  testId = 'drawer-header',
}) => {
  const closeButtonAttrs = {
    'data-test-id': `${testId}-close-button`,
  };

  return (
    <DrawerHeader>
      {title}
      {onClose && (
        <IconButton
          onClick={onClose}
          size="small"
          {...closeButtonAttrs}
        >
          <Close />
        </IconButton>
      )}
    </DrawerHeader>
  );
};

DefaultHeader.propTypes = {
  onClose: PropTypes.func,
  testId: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default function Drawer({
  allowBackdropClose = true,
  anchor = 'right',
  children,
  onClose,
  open,
  size = 'small',
  testId = 'drawer',
  title,
  ...other
}) {
  const attrs = {
    'data-test-id': testId,
  };

  return (
    <StyledDrawer
      anchor={anchor}
      open={open}
      size={size}
      onClose={allowBackdropClose ? onClose : undefined}
      {...attrs}
      {...other}
    >
      {(typeof title === 'string') && (
        <DefaultHeader
          title={title}
          onClose={onClose}
          testId={`${testId}-header`}
        />
      )}

      {children}
    </StyledDrawer>
  );
}

Drawer.propTypes = {
  allowBackdropClose: PropTypes.bool,
  anchor: PropTypes.oneOf(DRAWER_ANCHORS),
  children: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  size: PropTypes.oneOf(DRAWER_SIZES),
  testId: PropTypes.string,
  title: PropTypes.string,
};
