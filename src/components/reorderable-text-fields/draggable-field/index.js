import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import invariant from 'tiny-invariant';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Dehaze, Clear } from '@mui/icons-material';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import { extractClosestEdge, attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';

import styles from './draggable-field.css';

const DraggableField = ({
  field, index, onChange, onDelete, registerField, instanceId, disabled = false,
}) => {
  const ref = useRef(null);
  const dragHandleRef = useRef(null);
  const [closestEdge, setClosestEdge] = useState(null);

  // It is to set up the monitoring for draggable elements and handle drop events
  useEffect(() => {
    // Get the DOM element for the draggableItem and the drag handle
    const element = ref.current;
    const dragHandle = dragHandleRef.current;

    // Here we are ensuring that all the elements and the drag handle exist else it will throw error
    invariant(element);
    invariant(dragHandle);

    // Here define the data associated with this draggable item
    const data = {
      type: 'field', id: index, index, instanceId,
    };

    // Register the field in the registry using the provided registerField function
    const unregisterField = registerField(field, element);

    // Combine multiple cleanup functions to be executed when the effect is cleaned up
    const cleanup = combine(
      unregisterField,
      draggable({
        element: dragHandle,
        // Provide the initial data for the drag operation
        getInitialData: () => data,
        onDragStart: () => {
          // Reset the closest edge state when dragging starts
          setClosestEdge(null);
        },
      }),
      // Set up the drop target behavior for the draggable item
      dropTargetForElements({
        element,
        // it allow drop only for elements of type 'field'
        canDrop: ({ source }) => source.data.type === 'field',
        getData: ({ input }) => {
          // Attach the closest edge information to the data
          const closest = attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ['top', 'bottom'],
          });
          return { ...data, closest };
        },
        onDrag: ({ self }) => {
          // Update the closest edge state while dragging
          const closest = extractClosestEdge(self.data);
          setClosestEdge(closest);
        },
        onDragLeave: () => setClosestEdge(null),
        onDrop: () => {
          // Reset the closest edge state when dropping
          setClosestEdge(null);
        },
      }),
    );

    // Cleanup function to unregister the field and remove drag-and-drop listeners
    return cleanup;
  }, [index, registerField]);

  const handleTextFieldFocus = useCallback((e) => {
    const inputElement = e.target;
    const textLength = inputElement.value.length;
    inputElement.setSelectionRange(textLength, textLength);
  }, []);

  return (
    <Box
      ref={ref}
      className={styles.draggableItem}
      data-closest-edge={closestEdge}
    >
      <IconButton
        ref={dragHandleRef}
        label="Reorder"
        className={styles.dragHandle}
        disabled={disabled}
        disableRipple={true}
      >
        <Dehaze fontSize="small" htmlColor="black" />
      </IconButton>
      <TextField
        data-test-id={`textField-${index + 1}`}
        className={styles.textField}
        fullWidth
        variant="outlined"
        value={field}
        onChange={(e) => onChange(index, e.target.value)}
        onFocus={handleTextFieldFocus}
        size="small"
        disabled={disabled}
        slotProps={{
          htmlInput: {
            maxLength: 200,
            style: {
              fontSize: 'var(--body-font-size)',
              height: 'auto',
            },
          },
        }}
      />
      {!disabled && <div className={styles.charCount}>
        {`${field.length}/200`}
      </div>
      }
      <IconButton
        aria-label="clear"
        onClick={() => onDelete(index)}
        size="medium"
        className={styles.iconButton}
        disabled={disabled}
        disableRipple={true}
      >
        <Clear />
      </IconButton>
      {closestEdge && <DropIndicator edge={closestEdge} />}
    </Box>
  );
};

DraggableField.propTypes = {
  field: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  registerField: PropTypes.func.isRequired,
  instanceId: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default DraggableField;
