import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

const StyledHelperText = styled('div', {
  shouldForwardProp: (prop) => prop !== 'error' && prop !== 'disableMargin',
})(({ error, disableMargin }) => ({
  marginTop: disableMargin ? 0 : 'var(--spacing-4)',
  fontFamily: 'var(--typography-body-sm-font-family)',
  fontSize: 'var(--typography-body-sm-font-size)',
  fontWeight: 'var(--typography-body-sm-font-weight)',
  lineHeight: 'var(--typography-body-sm-line-height)',
  color: error ? 'var(--error-main)' : 'var(--text-secondary)',
}));

function HelperText({
  children,
  className,
  disableMargin = false,
  error = false,
  text,
}) {
  const content = text || children;

  if (!content) {
    return null;
  }

  return (
    <StyledHelperText
      className={className}
      data-error={error || undefined}
      disableMargin={disableMargin}
      error={error}
    >
      {content}
    </StyledHelperText>
  );
}

HelperText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disableMargin: PropTypes.bool,
  error: PropTypes.bool,
  text: PropTypes.string,
};

export default HelperText;
