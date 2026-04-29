import React from 'react';
import PropTypes from 'prop-types';
import { Link, styled } from '@mui/material';
import cx from 'classnames';
import Tooltip from '../tooltip';

const StyledKPITile = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-sm)',
  fontFamily: 'inherit',
  minWidth: '160px',
  maxWidth: '200px',
  width: '180px',
  '&.kpi-tile-large': {
    gap: 'var(--spacing-lg)',
  },
  '&.kpi-tile-medium': {
    gap: 'var(--spacing-sm)',
  },
  '&.kpi-tile-small': {
    gap: 'var(--spacing-xs)',
  },
}));

const Header = styled('div')(() => ({
  alignItems: 'center',
  display: 'flex',
  gap: 'var(--spacing-sm)',
  minHeight: 0,
}));

const Title = styled('div')(() => ({
  color: 'var(--grey-600)',
  fontFamily: 'var(--font-family)',
  fontSize: 'var(--body-font-size)',
  fontStyle: 'normal',
  fontWeight: 'var(--font-weight-semibold)',
  lineHeight: 'var(--line-height-sm)',
  minWidth: 0,
  textTransform: 'uppercase',
}));

const HeaderActions = styled('div')(() => ({
  alignItems: 'center',
  display: 'flex',
  flexShrink: 0,
  gap: 'var(--spacing-xs)',
}));

const MetricValue = styled('div')(() => ({
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-family)',
  fontSize: 'var(--font-size-xl)',
  fontStyle: 'normal',
  fontWeight: 'var(--font-weight-light)',
  lineHeight: 'var(--line-height-xl)',
}));

export default function KPITile({
  testId,
  title,
  metricValue,
  footer,
  size = 'medium',
  className,
  onClick,
  tooltipText,
  link,
  linkText,
}) {
  const attrs = {};
  if (testId) {
    attrs['data-test-id'] = testId;
  }

  const classes = cx(
    'kpi-tile',
    `kpi-tile-${size}`,
    {
      actionable: !!onClick,
    },
    className,
  );

  const hasHeaderContent = title || (link && linkText) || tooltipText;
  const hasHeaderActions = (link && linkText) || tooltipText;

  return (
    <StyledKPITile
      className={classes}
      onClick={onClick}
      {...attrs}
    >
      {hasHeaderContent && (
        <Header data-test-id={testId ? `${testId}-header` : undefined}>
          {title && <Title>{title}</Title>}
          {hasHeaderActions && (
            <HeaderActions>
              {(link && linkText) && (
                <Link
                  href={link}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {linkText}
                </Link>
              )}
              {tooltipText && <Tooltip title={tooltipText} />}
            </HeaderActions>
          )}
        </Header>
      )}
      <MetricValue>{metricValue}</MetricValue>
      {footer}
    </StyledKPITile>
  );
}

KPITile.propTypes = {
  testId: PropTypes.string,
  title: PropTypes.string,
  metricValue: PropTypes.string.isRequired,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  tooltipText: PropTypes.string,
  link: PropTypes.string,
  linkText: PropTypes.string,
};
