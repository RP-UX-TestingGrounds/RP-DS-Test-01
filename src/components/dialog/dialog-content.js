import {
  DialogContent as MuiDialogContent,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';

const ModalContent = styled(MuiDialogContent)(({ dividers }) => ({
  padding: dividers
    ? 'var(--spacing-16) var(--spacing-24)'
    : 'var(--spacing-0) var(--spacing-24)',
}));

ModalContent.propTypes = {
  ...MuiDialogContent.propTypes,
  dividers: PropTypes.bool,
};

export default ModalContent;
