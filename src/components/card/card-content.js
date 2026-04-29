import {
  CardContent as MuiCardContent,
  styled,
} from '@mui/material';

const StyledCardContent = styled(MuiCardContent)({
  padding: 'var(--spacing-20) var(--spacing-32)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-32)',
});

StyledCardContent.propTypes = {
  ...MuiCardContent.propTypes,
};

export default StyledCardContent;
