import {
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';

const pageMaxWidthByVariant = {
  default: 'var(--page-max-width)',
  wide: 'var(--page-max-width-wide)',
};

const StyledPage = styled('div')(({ ownerState }) => ({
  maxWidth: pageMaxWidthByVariant[ownerState.widthVariant] || pageMaxWidthByVariant.default,
  margin: 'var(--spacing-0) auto',
}));

export default function Page({
  children,
  testId = 'page',
  widthVariant = 'default',
  ...other
}) {
  const attrs = {
    'data-test-id': testId,
  };

  return (
    <StyledPage
      ownerState={{ widthVariant }}
      {...attrs}
      {...other}
    >
      {children}
    </StyledPage>
  );
}

Page.propTypes = {
  children: PropTypes.node,
  testId: PropTypes.string,
  widthVariant: PropTypes.oneOf(['default', 'wide']),
};
