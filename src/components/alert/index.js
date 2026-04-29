import { Alert as MuiAlert, AlertTitle, styled } from '@mui/material';
import PropTypes from 'prop-types';

const StyledAlert = styled(MuiAlert)({
  alignItems: 'flex-start',
  '& .MuiAlert-message': {
    width: '100%',
  },
  '& .MuiAlertTitle-root': {
    fontWeight: 600,
  },
  '&.MuiAlert-standardError': {
    backgroundColor: 'var(--error-light)',
    color: 'var(--error-dark)',
    '& .MuiAlert-icon, & .MuiAlert-icon .MuiSvgIcon-root': {
      color: 'var(--error-dark)',
    },
    '& .MuiAlert-action .MuiIconButton-root, & .MuiAlert-action .MuiSvgIcon-root': {
      color: 'var(--error-dark)',
    },
  },
  '&.MuiAlert-standardInfo': {
    backgroundColor: 'var(--info-light)',
    color: 'var(--info-dark)',
    '& .MuiAlert-icon, & .MuiAlert-icon .MuiSvgIcon-root': {
      color: 'var(--info-dark)',
    },
    '& .MuiAlert-action .MuiIconButton-root, & .MuiAlert-action .MuiSvgIcon-root': {
      color: 'var(--info-dark)',
    },
  },
  '&.MuiAlert-standardSuccess': {
    backgroundColor: 'var(--success-light)',
    color: 'var(--success-dark)',
    '& .MuiAlert-icon, & .MuiAlert-icon .MuiSvgIcon-root': {
      color: 'var(--success-dark)',
    },
    '& .MuiAlert-action .MuiIconButton-root, & .MuiAlert-action .MuiSvgIcon-root': {
      color: 'var(--success-dark)',
    },
  },
  '&.MuiAlert-standardWarning': {
    backgroundColor: 'var(--warning-alert-bg)',
    color: 'var(--on-warning)',
    '& .MuiAlert-icon, & .MuiAlert-icon .MuiSvgIcon-root': {
      color: 'var(--on-warning)',
    },
    '& .MuiAlert-action .MuiIconButton-root, & .MuiAlert-action .MuiSvgIcon-root': {
      color: 'var(--on-warning)',
    },
  },
});

export default function Alert({
  children,
  className,
  onClose,
  severity = 'error',
  testId,
  title,
}) {
  const attrs = {};
  if (testId) {
    attrs['data-test-id'] = testId;
  }

  return (
    <StyledAlert
      className={className}
      onClose={onClose}
      severity={severity}
      {...attrs}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </StyledAlert>
  );
}

export const ALERT_SEVERITIES = ['error', 'info', 'success', 'warning'];

Alert.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func,
  severity: PropTypes.oneOf(ALERT_SEVERITIES),
  testId: PropTypes.string,
  title: PropTypes.string,
};
