import { styled } from '@mui/material';

const DrawerHeader = styled('div')({
  alignItems: 'center',
  display: 'flex',
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'var(--font-weight-bold)',
  justifyContent: 'space-between',
  lineHeight: 'var(--line-height-lg)',
  padding: 'var(--spacing-16) var(--spacing-24)',
});

export default DrawerHeader;
