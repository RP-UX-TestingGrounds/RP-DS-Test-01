import React from 'react';
import { styled } from '@mui/material';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import cx from 'classnames';

import TextField from '../text-field';

import MenuItem from './menu-item';
import Chip from '../chip';

/** Approximate height of one chip row (chip + gap) for maxDisplayRows calculation. */
const CHIP_ROW_HEIGHT_PX = 30;

const StyledSelectField = styled(TextField)({
  '& .MuiSelect-icon': {
    width: '2.3rem',
    height: '2.3rem',
    top: 'calc(50% - 1.15rem)',
  },
  '&.chip-display .MuiSelect-select': {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '0.6rem',
  },
});

function SelectField({
  autoComplete = 'off',
  autoFocus = false,
  defaultValue: defaultValueInput = '',
  disabled = false,
  error = false,
  portal = true,
  helperText,
  className,
  id,
  label,
  menuMaxHeight,
  name,
  required = false,
  testId,
  type,
  value,
  // Select Fields
  multiple = false,
  checkbox = false,
  chip = false,
  children,
  options,
  placeholder,
  maxDisplayRows,
  ...other
}) {
  const InputProps = {};
  const InputLabelProps = {};

  const classes = cx(className, {
    'chip-display': chip,
  });

  const MenuProps = {
    disablePortal: !portal,
    ...(menuMaxHeight != null && {
      PaperProps: {
        style: {
          maxHeight: typeof menuMaxHeight === 'number' ? `${menuMaxHeight}px` : menuMaxHeight,
        },
      },
    }),
  };

  const SelectProps = {
    MenuProps,
    displayEmpty: !label || !!placeholder,
    multiple,
  };

  if (chip && multiple) {
    SelectProps.renderValue = (selected) => {
      return selected.map((option) => {
        const optionLabel = (options || []).find((o) => o.value === option)?.label;
        return (
          <Chip
            label={optionLabel}
            variant="outlined"
            color="default"
            key={option}
            className="chip-menu-item"
            size="small"
          />
        );
      });
    };
  } else if (placeholder) {
    SelectProps.renderValue = (selected) => {
      if (!selected && selected !== 0) {
        return <span style={{ color: 'var(--text-secondary)' }}>{placeholder}</span>;
      }
      const match = (options || []).find((o) => o.value === selected);
      return match?.label || selected;
    };
  }

  if (maxDisplayRows != null) {
    const maxHeightPx = maxDisplayRows * CHIP_ROW_HEIGHT_PX;
    SelectProps.sx = {
      ...SelectProps.sx,
      '& .MuiSelect-select': {
        maxHeight: `${maxHeightPx}px`,
        overflow: 'auto',
      },
    };
  }

  let selectOptions = children;
  let defaultValue = defaultValueInput;

  if (options) {
    selectOptions = options.map((option) => {
      const {
        value: optionValue,
        label: optionLabel,
        highlighted: optionHighlighted,
        disabled: optionDisabled,
      } = option;
      return (
        <MenuItem
          key={optionValue}
          value={optionValue}
          checkbox={checkbox}
          highlighted={optionHighlighted}
          disabled={optionDisabled}
        >
          {optionLabel || optionValue}
        </MenuItem>
      );
    });
    if (!defaultValue && !placeholder && options.length > 0) {
      const firstEnabled = options.find((option) => !option.disabled);
      defaultValue = firstEnabled ? firstEnabled.value : undefined;
    }
  }

  const slotProps = {};

  if (!isEmpty(InputProps)) {
    slotProps.input = InputProps;
  }

  if (!isEmpty(InputLabelProps)) {
    slotProps.inputLabel = InputLabelProps;
  }

  if (!isEmpty(SelectProps)) {
    slotProps.select = SelectProps;
  }

  return (
    <StyledSelectField
      testId={testId}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      className={classes}
      defaultValue={defaultValue}
      disabled={disabled}
      error={error}
      fullWidth={true}
      helperText={helperText}
      id={id}
      slotProps={slotProps}
      label={label}
      multiline={false}
      name={name}
      required={required}
      type={type}
      value={value}
      variant="filled"
      select
      {...other}
    >
      {selectOptions}
    </StyledSelectField>
  );
}

const itemShape = PropTypes.shape({
  disabled: PropTypes.bool,
  highlighted: PropTypes.bool,
  label: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
});

SelectField.propTypes = {
  ...TextField.propTypes,
  checkbox: PropTypes.bool,
  children: PropTypes.node,
  chip: PropTypes.bool,
  maxDisplayRows: PropTypes.number,
  menuMaxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  multiple: PropTypes.bool,
  options: PropTypes.arrayOf(itemShape),
  placeholder: PropTypes.string,
  portal: PropTypes.bool,
};
SelectField.displayName = 'SelectField';

export default SelectField;
