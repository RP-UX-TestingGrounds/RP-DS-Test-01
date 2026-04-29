import {
  CardHeader as MuiCardHeader,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';

export const PageTitle = styled('span')({
  alignItems: 'center',
  display: 'inline-flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-6)',
});

const StyledCardHeader = styled(MuiCardHeader)({
  '& .MuiCardHeader-content': {
    color: 'var(--text-primary)',
    fontFamily: 'var(--typography-heading-sm-font-family)',
    fontSize: 'var(--typography-heading-sm-font-size)',
    fontWeight: 'var(--typography-heading-sm-font-weight)',
    letterSpacing: 'var(--typography-heading-sm-letter-spacing)',
    lineHeight: 'var(--typography-heading-sm-line-height)',
  },
  padding: 'var(--spacing-0) var(--spacing-0)',
  '& .MuiCardHeader-action': {
    alignSelf: 'center',
    marginTop: 'var(--spacing-0)',
    marginRight: 'var(--spacing-0)',
  },
});

const Description = styled('div')({
  color: 'var(--text-subtle)',
  fontFamily: 'var(--typography-body-md-font-family)',
  fontSize: 'var(--typography-body-md-font-size)',
  fontWeight: 'var(--typography-body-md-font-weight)',
  letterSpacing: 'var(--typography-body-md-letter-spacing)',
  lineHeight: 'var(--typography-body-md-line-height)',
  margin: 'var(--spacing-0)',
});

const PageHeaderWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-16)',
  padding: 'var(--spacing-32) var(--spacing-0)',
});

export default function CardHeader({
  action,
  description,
  testId,
  title,
  ...other
}) {
  const attrs = testId ? { 'data-test-id': testId } : {};

  return (
    <PageHeaderWrapper>
      <StyledCardHeader
        action={action}
        disableTypography
        title={title}
        {...attrs}
        {...other}
      />
      {description && (
        <Description>
          {description}
        </Description>
      )}
    </PageHeaderWrapper>
  );
}

CardHeader.propTypes = {
  action: PropTypes.node,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  testId: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
