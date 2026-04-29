import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material';

/**
 * GroupField
 * Renders a list of labeled controls (switches, checkboxes, etc)
 */

const GroupFieldWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-12)',
});

const Title = styled('div')({
  fontFamily: 'var(--typography-heading-sm-font-family)',
  fontSize: 'var(--heading-3-size)',
  fontWeight: 'var(--typography-heading-sm-font-weight)',
  lineHeight: 'var(--heading-3-size)',
  letterSpacing: 'var(--typography-heading-sm-letter-spacing)',
  color: 'var(--text-primary)',
});

const List = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: 'var(--button-padding-x-small)',
});

const HelperText = styled('div')(({ error }) => ({
  marginTop: 'var(--spacing-8)',
  fontFamily: 'var(--typography-body-sm-font-family)',
  fontSize: 'var(--typography-body-sm-font-size)',
  fontWeight: 'var(--typography-body-sm-font-weight)',
  color: error ? 'var(--text-danger)' : 'var(--text-secondary)',
}));

export default function GroupField({
  title,
  name,
  testId,
  items,
  Component,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}) {
  const handleToggle = (key) => (event) => {
    const { checked } = event.target;

    const newValue = checked
      ? [...value, key]
      : value.filter((v) => v !== key);

    onChange(newValue);
  };

  return (
    <GroupFieldWrapper data-testid={testId}>

      {title && <Title>{title}</Title>}

      <List data-testid="field-group-list">
        {items.map((item) => (
          <Component
            key={item.key}
            name={name}
            label={item.label}
            checked={value.includes(item.key)}
            onChange={handleToggle(item.key)}
            onBlur={onBlur}
            disabled={item.disabled}
          />
        ))}
      </List>

      {(helperText || error) && (
        <HelperText>{helperText}</HelperText>
      )}

    </GroupFieldWrapper>
  );
}

GroupField.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  testId: PropTypes.string,

  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
    }),
  ).isRequired,

  Component: PropTypes.elementType.isRequired,

  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,

  error: PropTypes.bool,
  helperText: PropTypes.string,
};
