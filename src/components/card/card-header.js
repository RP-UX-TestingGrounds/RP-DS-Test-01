import {
  CardHeader as MuiCardHeader,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';
import IconMenu from '../icon-menu';

const StyledCardHeader = styled(MuiCardHeader)({
  '& .MuiCardHeader-content .MuiTypography-root': {
    fontSize: 'var(--typography-title-lg-font-size)',
    fontWeight: 'var(--typography-title-lg-font-weight)',
    lineHeight: 'var(--typography-title-lg-line-height)',
    letterSpacing: 'var(--typography-title-lg-letter-spacing)',
    fontFamily: 'var(--typography-title-lg-font-family)',
    color: 'var(--text-primary)',
  },
  padding: 'var(--spacing-0) var(--spacing-0)',
  '& .MuiCardHeader-action': {
    alignSelf: 'center',
    marginTop: 'var(--spacing-0)',
    marginRight: 'var(--spacing-0)',
  },
});

const TitleContainer = styled('div')({
  alignItems: 'center',
  display: 'flex',
  gap: 'var(--spacing-16)',
});

const ActionsContainer = styled('div')({
  alignItems: 'center',
  display: 'flex',
  gap: 'var(--spacing-16)',
});

const Description = styled('div')({
  color: 'var(--text-subtle)',
  margin: 'var(--spacing-0)',
  fontFamily: 'var(--typography-body-md-font-family)',
  fontWeight: 'var(--typography-body-md-font-weight)',
  fontSize: 'var(--typography-body-md-font-size)',
  lineHeight: 'var(--typography-body-md-line-height)',
  letterSpacing: 'var(--typography-body-md-letter-spacing)',
});

const CardHeaderWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-12)',
  padding: 'var(--spacing-28) var(--spacing-32) var(--spacing-20) var(--spacing-32)',
  borderBottom: '1px solid var(--border-primary)',
});

export default function CardHeader({
  action,
  badge,
  menuItems,
  testId,
  title,
  description,
  ...other
}) {
  const attrs = testId ? { 'data-test-id': testId } : {};

  // Compose the title with the optional badge
  const titleContent = badge ? (
    <TitleContainer>
      {title}
      {badge}
    </TitleContainer>
  ) : title;

  // Compose the action area with the menu and main action
  let actionContent = null;
  if (action || menuItems) {
    actionContent = (
      <ActionsContainer>
        {action}
        {menuItems && (
          <IconMenu
            buttonSize="small"
            items={menuItems}
            testId={testId ? `${testId}-menu` : undefined}
            anchorOrigin={{
              horizontal: 'right',
              vertical: 'bottom',
            }}
            transformOrigin={{
              horizontal: 'right',
              vertical: 'top',
            }}
          />
        )}
      </ActionsContainer>
    );
  }

  return (
    <CardHeaderWrapper>
      <StyledCardHeader
        action={actionContent}
        title={titleContent}
        {...attrs}
        {...other}
      />
      {description && (
        <Description>
          {description}
        </Description>
      )}
    </CardHeaderWrapper>
  );
}

CardHeader.propTypes = {
  action: PropTypes.node,
  badge: PropTypes.node,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      disabled: PropTypes.bool,
      icon: PropTypes.node,
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    }),
  ),
  testId: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
