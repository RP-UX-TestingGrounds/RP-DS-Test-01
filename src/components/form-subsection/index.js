import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

const Root = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-16)',
  width: '100%',
}));

const BannerSlot = styled('div')(() => ({
  fontFamily: 'var(--typography-body-md-font-family)',
  fontSize: 'var(--typography-body-md-font-size)',
  fontWeight: 'var(--typography-body-md-font-weight)',
  lineHeight: 'var(--typography-body-md-line-height)',
  letterSpacing: 'var(--typography-body-md-letter-spacing)',
  color: 'var(--text-primary)',
}));

const Toolbar = styled('div', {
  shouldForwardProp: (prop) => prop !== 'actionsOnly',
})(({ actionsOnly }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: actionsOnly ? 'flex-end' : 'space-between',
  flexWrap: 'wrap',
  gap: 'var(--spacing-12)',
  width: '100%',
}));

const Title = styled('div')(() => ({
  fontFamily: 'var(--typography-title-sm-font-family)',
  fontWeight: 'var(--typography-title-sm-font-weight)',
  fontSize: 'var(--typography-title-sm-font-size)',
  lineHeight: 'var(--typography-title-sm-line-height)',
  letterSpacing: 'var(--typography-title-sm-letter-spacing)',
  color: 'var(--typography-title-sm-color)',
}));

const Actions = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 'var(--spacing-12)',
}));

const Body = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-8)',
  width: '100%',
}));

/**
 * Reusable block for forms and settings: optional banner, optional toolbar (title + actions on one row), then body.
 *
 * Composition (use anywhere, not tied to a specific page):
 * - Wrap with `FormSection` when you need a section heading and a vertical stack (fields, text, etc.).
 * - Nest `FormSubsection` inside when you need a subsection with actions beside the title, or a banner above that row.
 * - Use `FormSubsection` alone inside `CardContent` if you do not need `FormSection`.
 *
 * `FormSection` = one semantic group (title + children, spaced with form fields).
 * `FormSubsection` = toolbar row + body; does not replace `FormSection`, it complements it.
 */
export default function FormSubsection({
  actions,
  banner,
  children,
  className,
  testId,
  title,
}) {
  const attrs = {};
  if (testId) {
    attrs['data-test-id'] = testId;
  }

  const showToolbar = title != null || actions != null;
  const actionsOnly = showToolbar && title == null && actions != null;

  return (
    <Root className={className} {...attrs}>
      {banner != null ? <BannerSlot>{banner}</BannerSlot> : null}
      {showToolbar && (
        <Toolbar actionsOnly={actionsOnly}>
          {title != null ? <Title>{title}</Title> : null}
          {actions != null ? <Actions>{actions}</Actions> : null}
        </Toolbar>
      )}
      <Body>{children}</Body>
    </Root>
  );
}

FormSubsection.propTypes = {
  actions: PropTypes.node,
  banner: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  testId: PropTypes.string,
  title: PropTypes.node,
};
