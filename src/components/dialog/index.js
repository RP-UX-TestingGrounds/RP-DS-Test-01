import {
  Dialog as MuiDialog,
  styled,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Close } from '@mui/icons-material';

import Button, { BUTTON_COLORS } from '../button';
import IconButton from '../icon-button';
import DialogTitle from './dialog-title';
import DialogContent from './dialog-content';
import DialogActions from './dialog-actions';

const defaultTranslation = (key) => {
  return `—${key}—`;
};

const StyledDialog = styled(MuiDialog)(({ size, fullScreen }) => {
  const sizes = {
    'extra-small': 'var(--breakpoint-extra-small)',
    small: 'var(--breakpoint-small)',
    medium: 'var(--breakpoint-medium)',
    large: 'var(--breakpoint-large)',
    'extra-large': 'var(--breakpoint-extra-large)',
  };

  return {
    '& .MuiDialog-paper': {
      borderRadius: 'var(--radius)',
      width: fullScreen ? '100vw' : sizes[size] || undefined,
      maxWidth: '100vw',
    },
  };
});

export const DIALOG_SIZES = ['extra-small', 'small', 'medium', 'large', 'extra-large'];

const DefaultTitle = ({
  title,
  onClose,
  testId = 'dialog-title',
}) => {
  const closeButtonAttrs = {
    'data-test-id': `${testId}-close-button`,
  };

  return (
    <DialogTitle>
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
    </DialogTitle>
  );
};

DefaultTitle.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  testId: PropTypes.string,
};

const DefaultActions = ({
  onClose,
  onSubmit,
  translate = defaultTranslation,
  testId = 'dialog-actions',
  color = 'primary',
}) => {
  const cancelButtonAttrs = {
    'data-test-id': `${testId}-cancel-button`,
  };

  const submitButtonAttrs = {
    'data-test-id': `${testId}-submit-button`,
  };

  return (
    <DialogActions>
      <Button
        onClick={onClose}
        color="primary"
        variant="text"
        {...cancelButtonAttrs}
      >
        {translate('cancel')}
      </Button>
      <Button
        onClick={onSubmit}
        color={color}
        variant="contained"
        {...submitButtonAttrs}
      >
        {translate('submit')}
      </Button>
    </DialogActions>
  );
};

DefaultActions.propTypes = {
  onClose: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  translate: PropTypes.func,
  testId: PropTypes.string,
  color: PropTypes.oneOf(BUTTON_COLORS),
};

export default function Dialog({
  allowBackdropClose = true,
  children,
  fullScreen = false,
  message,
  onClose,
  onSubmit,
  open,
  responsiveFullScreen = true,
  size = 'medium',
  title,
  translate = defaultTranslation,
  testId = 'dialog',
  defaultActionColor = 'primary',
  ...other
}) {
  const attrs = {
    'data-test-id': testId,
  };

  // @todo: this is a bit gross, but css variables are not supported for breakpoints
  const isMobile = useMediaQuery('(max-width: 776px)');
  const isFullScreen = fullScreen || (responsiveFullScreen && isMobile);

  return (
    <StyledDialog
      open={open}
      fullScreen={isFullScreen}
      size={size}
      onClose={allowBackdropClose ? onClose : undefined}
      {...attrs}
      {...other}
    >
      {(typeof title === 'string') && (
        <DefaultTitle
          title={title}
          onClose={onClose}
          testId={`${testId}-title`}
        />
      )}

      {message && (
        <DialogContent>
          {message}
        </DialogContent>
      )}

      {children}

      {(typeof onSubmit === 'function') && (
        <DefaultActions
          onClose={onClose}
          onSubmit={onSubmit}
          translate={translate}
          testId={`${testId}-actions`}
          color={defaultActionColor}
        />
      )}
    </StyledDialog>
  );
}

Dialog.propTypes = {
  allowBackdropClose: PropTypes.bool,
  children: PropTypes.node,
  fullScreen: PropTypes.bool,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  open: PropTypes.bool.isRequired,
  responsiveFullScreen: PropTypes.bool,
  size: PropTypes.oneOf(DIALOG_SIZES),
  title: PropTypes.string,
  translate: PropTypes.func,
  testId: PropTypes.string,
  defaultActionColor: PropTypes.oneOf(BUTTON_COLORS),
};
