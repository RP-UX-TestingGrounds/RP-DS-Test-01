import React from 'react';
import PropTypes from 'prop-types';
import MuiList from '@mui/material/List';
import ListItem from '../list-item';

const isValueSelected = (selectedValues, itemValue) => {
  return selectedValues.some((v) => String(v) === String(itemValue));
};

const SelectableList = ({
  items = [],
  multiple = false,
  showCheckbox = true,
  onChange,
  testId,
  value = [],
}) => {
  const handleItemChange = (itemValue) => {
    if (!onChange) {
      return;
    }

    const isCurrentlySelected = isValueSelected(value, itemValue);
    let newValue;

    if (multiple) {
      if (isCurrentlySelected) {
        newValue = value.filter((v) => String(v) !== String(itemValue));
      } else {
        newValue = [...value, itemValue];
      }
    } else {
      newValue = isCurrentlySelected ? [] : [itemValue];
    }

    onChange(newValue);
  };

  return (
    <MuiList
      disablePadding
      data-test-id={testId}
    >
      {items.map((item) => (
        <ListItem
          key={item.value}
          label={item.label}
          onChange={handleItemChange}
          selected={isValueSelected(value, item.value)}
          showCheckbox={showCheckbox}
          subLabel={item.subLabel}
          testId={`${testId}-item-${item.value}`}
          value={item.value}
        />
      ))}
    </MuiList>
  );
};

SelectableList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      subLabel: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }),
  ),
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  showCheckbox: PropTypes.bool,
  testId: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
};

export default SelectableList;
