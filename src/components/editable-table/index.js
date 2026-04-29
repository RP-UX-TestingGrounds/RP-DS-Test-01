import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import styles from './editable-table.css';

const EditableCell = ({
  value,
  onChange,
  dataTestId,
  disabled,
}) => (
  <TableCell className={styles.tableCellInputContainer}>
    <TextField
      variant={'outlined'}
      size={'small'}
      value={value}
      fullWidth
      onChange={onChange}
      disabled={disabled}
      slotProps={{
        htmlInput: {
          'data-test-id': dataTestId,
          style: {
            fontSize: 'var(--body-font-size)',
            height: 'auto',
          },
        },
      }}
    />
  </TableCell>
);

const RemoveButton = ({ onClick, dataTestId, disabled }) => (
  <TableCell className={styles.tableCellClearButton}>
    <IconButton
      data-test-id={dataTestId}
      size={'small'}
      onClick={onClick}
      disabled={disabled}
      disableRipple={true}
    >
      <ClearIcon />
    </IconButton>
  </TableCell>
);

export default function EditableTable({
  headers,
  fieldValues,
  onUpdate,
  disabled = false,
}) {
  const handleRemoveRow = useCallback((rowIndex) => {
    if (onUpdate && !disabled) {
      const filteredRows = fieldValues.filter((_, index) => index !== rowIndex);
      onUpdate(filteredRows);
    }
  }, [fieldValues, onUpdate]);

  const handleInputChange = useCallback((event, rowIndex, fieldName) => {
    const { value } = event.target;
    const updatedFields = [...fieldValues];
    updatedFields[rowIndex][fieldName] = value;
    onUpdate(updatedFields);
  }, [fieldValues, onUpdate]);

  return (
    <Table data-test-id="editable-column-table">
      <TableHead className={styles.tableHeadContainer}>
        <TableRow>
          { headers.map((header, index) => (
            <TableCell
              className={styles.headerContainer}
              key={index}
              data-test-id={`header-cell-${index}`}
              style={{
                fontSize: 'var(--body-font-size)',
              }}
            >
              {header.label}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        { fieldValues.map((value, rowIndex) => (
          <TableRow key={rowIndex} data-test-id={`table-row-${rowIndex}`}>
            {
              headers.map((header, colIndex) => (
                <EditableCell
                  value={value[header.key] || ''}
                  onChange={(event) => handleInputChange(event, rowIndex, header.key)}
                  dataTestId={`input-${rowIndex}-${header.key}`}
                  key={`${rowIndex}-${colIndex}`}
                  disabled={disabled}
                />
              ))
            }
            <RemoveButton
              onClick={() => handleRemoveRow(rowIndex)}
              dataTestId={`remove-button-${rowIndex}`}
              disabled={disabled}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

EditableCell.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

RemoveButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

EditableTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object),
  fieldValues: PropTypes.arrayOf(PropTypes.object),
  onUpdate: PropTypes.func,
  disabled: PropTypes.bool,
};
