import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Chip from '../chip';

const StyledContainer = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--spacing-8)',
  padding: 'var(--spacing-16)',
  borderRadius: 'var(--radius-button-field)',
  border: '1px solid var(--border-primary)',
  overflowY: 'auto',
  overflowX: 'hidden',
  minHeight: 'var(--multi-chip-min-height)',
  maxHeight: 'var(--multi-chip-max-height)',
}));

const MultiChip = forwardRef(
  (
    {
      items = [],
      testId,
      onDelete,
    },
    ref,
  ) => {
    return (
      <StyledContainer
        ref={ref}
        role="list"
        data-test-id={testId}
      >
        {items.map((item) => (
          <Chip
            key={item.id}
            label={item.label}
            size="small"
            testId={item.testId ?? (testId ? `${testId}-${item.id}` : undefined)}
            onDelete={onDelete ? () => onDelete(item.id) : undefined}
          />
        ))}
      </StyledContainer>
    );
  },
);

MultiChip.displayName = 'MultiChip';

MultiChip.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
      testId: PropTypes.string,
    }),
  ),
  onDelete: PropTypes.func,
  testId: PropTypes.string,
};

export default MultiChip;
