import {
  DialogTitle as MuiDialogTitle,
  styled,
} from '@mui/material';

const ModalTitle = styled(MuiDialogTitle)({
  fontSize: 'var(--font-size-lg)',
  fontWeight: 'var(--font-weight-bold)',
  lineHeight: 'var(--line-height-lg)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 'var(--spacing-16) var(--spacing-24)',
  // remove additional padding from the actions container
  '& .MuiDialogActions-root': {
    padding: 'var(--spacing-0)',
  },
});

ModalTitle.propTypes = {
  ...MuiDialogTitle.propTypes,
};

export default ModalTitle;
