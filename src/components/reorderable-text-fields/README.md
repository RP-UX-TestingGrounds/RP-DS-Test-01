# DraggableField Component

## State and Refs:
- `ref` is a ref for the container element of the draggable field.
- `dragHandleRef` is a ref for the drag handle.
- `closestEdge` is a state for tracking the closest edge during drag-and-drop operations.

## Effect:
- `useEffect` to set up draggable and droppable behaviors for the field. It combines multiple cleanup functions using the `combine` utility.

## Explanation

### Drag-and-Drop Functionality
The `@atlaskit/pragmatic-drag-and-drop` library is used to implement drag-and-drop functionality. Here's a breakdown of how it works:

#### Monitoring for Elements
The `monitorForElements` function in `ReorderableTextFields` sets up monitoring for elements of type `field`. When a drop event occurs, it determines the target element and reorders the list using the `reorderField` function.

#### Drag and Drop Behavior
In `DraggableField`, the `draggable` function is used to make the field draggable. The `dropTargetForElements` function sets up the field as a drop target. These functions handle the drag-and-drop logic, including attaching and extracting the closest edge for precise reordering.

#### Registering Fields
The `registerField` function in both components registers the field in a map for easy access and management during drag-and-drop operations.

#### Cleanup
Cleanup functions are used extensively to ensure that event listeners and other resources are properly released when the components are unmounted or dependencies change.


# Reorderable TextField Component

This component is responsible for managing a list of text fields that can be reordered through drag-and-drop interactions. It uses the `DraggableField` component to render each text field.

## Props:
- `items` (array of strings): The list of text field values.
- `onUpdate` (function): Callback function called when the list of items is updated (e.g., after reordering or editing).

# DraggableField Component 

This component renders a single text field that can be dragged to reorder. It also includes functionality for deleting the field.

## Props:
### From Parent to Text Field:
- `field` (string): The value of the text field.
- `index` (number): The position of the text field in the list.
- `onChange` (function): Callback function called when the text field value changes.
- `onDelete` (function): Callback function called when the text field is deleted.
- `registerField` (function): Function to register the DOM element for drag-and-drop functionality.

# Implementation Details

## Reorderable TextField Component

### State and Refs:
- `registryRef` is a ref that stores a map of registered fields.

### Callback Functions:
- `reorderField`: Handles reordering of fields when a drop event occurs. It calculates the new position of the dragged item and updates the list using the `onUpdate` callback.
- `registerField`: Registers a field in the registry map and returns a cleanup function to unregister it.
- `handleChange`: Updates the value of a text field at a specific index.
- `handleDelete`: Deletes a text field at a specific index.

### Effects:
- `useEffect` for live region cleanup when the component is unmounted.
- `useEffect` to set up monitoring for draggable elements and handle drop events using `monitorForElements`.

link: https://docs.google.com/document/d/1kh21P_aMSpIVF0fNUCvcr6jKJQsRPlqM1JG8vYeVEPw/edit?usp=sharing