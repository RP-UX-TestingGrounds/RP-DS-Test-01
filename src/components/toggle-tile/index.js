import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

import Button from '../button';
import Chip from '../chip';
import Icon from '../icon';
import Switch from '../switch';

const Root = styled('div')(() => ({
  backgroundColor: 'var(--card-color)',
  border: '1px solid var(--grey-200)',
  borderRadius: 'var(--radius)',
  padding: 'var(--spacing-20)',
}));

/** Vertical stack of header block, body, footer — Figma gap 20px between sections */
const MainColumn = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-20)',
  width: '100%',
}));

/** Header row + optional subtitle — Figma gap 6px between row and subtitle */
const HeaderColumn = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-6)',
  width: '100%',
}));

const HeaderTopRow = styled('div')(() => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  gap: 'var(--spacing-lg)',
  justifyContent: 'space-between',
  width: '100%',
}));

/** Icon + title (single row). Figma spacing/10 between icon and title */
const HeaderLeading = styled('div')(() => ({
  alignItems: 'center',
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  gap: 'var(--spacing-md)',
  minWidth: 0,
}));

const LeadingSlot = styled('div')(() => ({
  alignItems: 'center',
  display: 'flex',
  flexShrink: 0,
  justifyContent: 'center',
}));

const TitleText = styled('div', {
  shouldForwardProp: (prop) => prop !== 'titleColor',
})(({ titleColor }) => ({
  color: titleColor,
  flex: '1 1 auto',
  fontFamily: 'var(--typography-title-md-font-family)',
  fontSize: 'var(--typography-title-md-font-size)',
  fontWeight: 'var(--typography-title-md-font-weight)',
  letterSpacing: 'var(--typography-title-md-letter-spacing)',
  lineHeight: 'var(--typography-title-md-line-height)',
  minWidth: 0,
  textAlign: 'left',
}));

const SubtitleText = styled('p')(() => ({
  color: 'var(--text-secondary)',
  fontFamily: 'var(--typography-body-md-font-family)',
  fontSize: 'var(--typography-body-md-font-size)',
  fontWeight: 'var(--typography-body-md-font-weight)',
  letterSpacing: 'var(--typography-body-md-letter-spacing)',
  lineHeight: 'var(--typography-body-md-line-height)',
  margin: 0,
  width: '100%',
  textAlign: 'left',
}));

const FooterRow = styled('div')(() => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: '100%',
}));

const FooterActionSlot = styled('div')(() => ({
  flexShrink: 0,
  marginLeft: 'auto',
}));

export default function ToggleTile({
  actionLabel,
  children,
  chipColor = 'default',
  chipLabel,
  iconColor = 'var(--text-secondary)',
  iconName,
  onClickAction,
  onToggleChange,
  subtitle,
  testId,
  title,
  titleColor = 'var(--text-primary)',
  toggle = false,
  toggleDisabled = false,
  toggleValue = false,
}) {
  const showFooter = Boolean(chipLabel || (actionLabel && onClickAction));

  return (
    <Root data-test-id={testId}>
      <MainColumn>
        <HeaderColumn>
          <HeaderTopRow>
            <HeaderLeading>
              {iconName ? (
                <LeadingSlot>
                  <Icon
                    fill={iconColor}
                    name={iconName}
                    width={35}
                  />
                </LeadingSlot>
              ) : null}
              <TitleText titleColor={titleColor}>{title}</TitleText>
            </HeaderLeading>
            {toggle ? (
              <Switch
                checked={toggleValue}
                disabled={toggleDisabled}
                onChange={onToggleChange}
                size="large"
                testId={`${testId}-toggle`}
              />
            ) : null}
          </HeaderTopRow>
          {subtitle ? <SubtitleText>{subtitle}</SubtitleText> : null}
        </HeaderColumn>

        {children}

        {showFooter ? (
          <FooterRow>
            {chipLabel ? (
              <Chip
                color={chipColor}
                label={chipLabel}
                testId={`${testId}-chip`}
              />
            ) : null}
            {actionLabel && onClickAction ? (
              <FooterActionSlot>
                <Button
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickAction(e);
                  }}
                  testId={`${testId}-action`}
                  variant="text"
                >
                  {actionLabel}
                </Button>
              </FooterActionSlot>
            ) : null}
          </FooterRow>
        ) : null}
      </MainColumn>
    </Root>
  );
}

ToggleTile.propTypes = {
  actionLabel: PropTypes.string,
  children: PropTypes.node,
  chipColor: PropTypes.oneOf(['default', 'primary', 'secondary', 'error', 'warning', 'info', 'success']),
  chipLabel: PropTypes.string,
  iconColor: PropTypes.string,
  iconName: PropTypes.string,
  onClickAction: PropTypes.func,
  onToggleChange: PropTypes.func,
  subtitle: PropTypes.string,
  testId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleColor: PropTypes.string,
  toggle: PropTypes.bool,
  toggleDisabled: PropTypes.bool,
  toggleValue: PropTypes.bool,
};
