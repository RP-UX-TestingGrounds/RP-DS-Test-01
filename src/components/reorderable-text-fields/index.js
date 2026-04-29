import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import {
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { extractClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import { reorder } from '@atlaskit/pragmatic-drag-and-drop/reorder';
import { getReorderDestinationIndex } from '@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index';
import * as liveRegion from '@atlaskit/pragmatic-drag-and-drop-live-region';

import DraggableField from './draggable-field/index';

const ReorderableTextFields = ({ items, onUpdate, disabled = false }) => {
  // Reference to hold a registry of draggable elements
  const registryRef = useRef(new Map());
  const instanceId = useRef(uuidv4());

  // Callback to reorder fields based on drag and drop
  const reorderField = useCallback(
    ({ startIndex, indexOfTarget, closestEdgeOfTarget }) => {
      // Calculate the destination index for reordering
      const finishIndex = getReorderDestinationIndex({
        axis: 'vertical',
        startIndex,
        indexOfTarget,
        closestEdgeOfTarget,
      });

      // it perform the reordering of items
      const updatedFields = reorder({
        list: items,
        startIndex,
        finishIndex,
      });

      // Update the parent component with the new order
      onUpdate(updatedFields);
    },
    [items, onUpdate],
  );

  // useEffect to clean up live region when the component is unmounted
  // Return the cleanup function from the liveRegion
  useEffect(() => liveRegion.cleanup, []);

  // useEffect to set up monitoring for draggable elements and handle drop events
  useEffect(() => {
    // Start monitoring for draggable elements
    const cleanup = monitorForElements({
      canMonitor({ source }) {
        // Only monitor elements of type 'field'
        return source.data.type === 'field' && source.data.instanceId === instanceId.current;
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) return;

        const { index: startIndex } = source.data;
        const { index: indexOfTarget } = target.data;
        if (startIndex === indexOfTarget) return;

        const closestEdgeOfTarget = extractClosestEdge(target.data);
        // Get the closest edge of the target and perform reordering
        reorderField({ startIndex, indexOfTarget, closestEdgeOfTarget });
      },
    });

    // Return the cleanup function to stop monitoring when the component unmounts or dependencies change
    return cleanup;
  }, [reorderField]);

  const registerField = useCallback((id, element) => {
    registryRef.current.set(id, element);
    return () => registryRef.current.delete(id);
  }, []);

  const handleChange = useCallback((index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    onUpdate(newItems);
  }, [items, onUpdate]);

  const handleDelete = useCallback((index) => {
    const newItems = items.filter((_, i) => i !== index);
    onUpdate(newItems);
  }, [items, onUpdate]);

  return (
    items.map((item, index) => (
        <DraggableField
          key={index}
          field={item}
          index={index}
          items={items}
          onChange={handleChange}
          onDelete={handleDelete}
          instanceId={instanceId.current}
          registerField={registerField}
          disabled={disabled}
        />
    ))
  );
};

ReorderableTextFields.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpdate: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ReorderableTextFields;
