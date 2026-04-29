import {
  Card as MuiCard,
  styled,
} from '@mui/material';
import PropTypes from 'prop-types';

import CardHeader from './card-header';

const StyledCard = styled(MuiCard)({
  borderRadius: 'var(--radius)',
  boxShadow: 'var(--shadow-card)',
  padding: 0,
});

const DefaultCardHeader = ({ title, action, testId = 'card-header' }) => {
  return (
    <CardHeader
      title={title}
      action={action}
      data-test-id={testId}
    />
  );
};

DefaultCardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  action: PropTypes.node,
  testId: PropTypes.string,
};

export default function Card({
  children,
  title,
  action,
  testId = 'card',
  ...other
}) {
  const attrs = {
    'data-test-id': testId,
  };

  return (
    <StyledCard
      {...attrs}
      {...other}
    >
      {(typeof title === 'string') && (
        <DefaultCardHeader
          title={title}
          action={action}
          testId={`${testId}-header`}
        />
      )}
      {children}
    </StyledCard>
  );
}

Card.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node,
  testId: PropTypes.string,
  title: PropTypes.string,
};
