import React from 'react';
import cx from 'classnames';
import { Backdrop as MuiBackdropBase, styled } from '@mui/material';

import PropTypes from 'prop-types';
import Spinner from '../spinner';

import styles from './dimmer.css';

const StyledBackdrop = styled(MuiBackdropBase)({
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
});

export default function Dimmer({
  active = false,
  spinner = <Spinner />,
  children,
  strata = 'page',
  onClick,
}) {
  const classes = cx({
    [styles.dimmer]: true,
    [styles.dimmed]: active,
  });

  let zIndex = 'var(--z-page-spinner)';
  if (strata === 'app') {
    zIndex = 'var(--z-app-spinner)';
  }

  let position = 'absolute';
  if (strata === 'app') {
    position = 'fixed';
  }

  const backdropStyles = {
    zIndex,
    position,
  };

  return (
    <div className={classes}>
      <StyledBackdrop
        open={active}
        style={backdropStyles}
        data-test-id="dimmer-backdrop"
        onClick={onClick}
      >
        {spinner}
      </StyledBackdrop>

      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}

Dimmer.propTypes = {
  active: PropTypes.bool,
  spinner: PropTypes.node,
  children: PropTypes.node,
  strata: PropTypes.oneOf(['page, modal, app']),
  onClick: PropTypes.func,
};
