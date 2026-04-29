import { styled } from '@mui/material';
import PropTypes from 'prop-types';

const DrawerContent = styled('div', {
  shouldForwardProp: (prop) => prop !== 'dividers',
})(({ dividers }) => ({
  flex: 1,
  overflow: 'auto',
  padding: dividers
    ? 'var(--spacing-16) var(--spacing-24)'
    : 'var(--spacing-0) var(--spacing-24)',
  ...(dividers && {
    borderBottom: '1px solid var(--surface-border-color)',
    borderTop: '1px solid var(--surface-border-color)',
  }),
}));

DrawerContent.propTypes = {
  children: PropTypes.node,
  dividers: PropTypes.bool,
};

export default DrawerContent;
