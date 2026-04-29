import {
  DialogActions as MuiDialogActions,
  styled,
} from '@mui/material';

const ModalActions = styled(MuiDialogActions)({
  padding: 'var(--spacing-24)',
  gap: 'var(--spacing-8)',
  '& > :not(style) ~ :not(style)': {
    marginLeft: 'var(--spacing-0)',
  },
});

ModalActions.propTypes = {
  ...MuiDialogActions.propTypes,
};

export default ModalActions;
