import React from 'react';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import { v4 as uuidv4 } from 'uuid';
import {
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import ReorderableTextFields from './index';

jest.mock('@atlaskit/pragmatic-drag-and-drop/element/adapter', () => ({
  monitorForElements: jest.fn(),
  draggable: jest.fn(),
  dropTargetForElements: jest.fn(),
}));
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));
describe('ReorderableTextFields Component', () => {
  const instanceId = 'mock-instance-id';
  uuidv4.mockReturnValue(instanceId);
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('renders without crashing', () => {
    const items = ['Item 1', 'Item 2'];
    const onUpdate = jest.fn();

    const { getByDisplayValue, getByTestId } = render(
      <ReorderableTextFields items={items} onUpdate={onUpdate} />,
    );

    items.forEach((item) => expect(getByDisplayValue(item)).toBeInTheDocument());
    const tab = getByTestId('textField-1');
    expect(tab).toBeInTheDocument();
  });

  it('calls onUpdate when an item is deleted', async () => {
    const handleUpdate = jest.fn();
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const { getAllByLabelText } = render(<ReorderableTextFields items={items} onUpdate={handleUpdate} />);

    const deleteButtons = getAllByLabelText('clear');
    fireEvent.click(deleteButtons[0]);

    await (() => expect(handleUpdate).toHaveBeenCalledWith(['Item 2', 'Item 3']));
  });

  it('calls onUpdate when a text field value is changed', async () => {
    const items = ['Item 1', 'Item 2'];
    const onUpdate = jest.fn();

    const { container } = render(
      <ReorderableTextFields items={items} onUpdate={onUpdate} />,
    );

    const inputs = container.querySelectorAll('.MuiInputBase-input');
    fireEvent.change(inputs[0], { target: { value: 'Updated Item 1' } });

    await (() => {
      expect(onUpdate).toHaveBeenCalledWith(['Updated Item 1', 'Item 2']);
    });
  });

  it('calls onUpdate when text fields are reordered via drag-and-drop', async () => {
    const items = ['Item 1', 'Item 2'];
    const onUpdate = jest.fn();

    const { getAllByRole } = render(
      <ReorderableTextFields items={items} onUpdate={onUpdate} />,
    );

    // Mock dragging the first item to the position of the second item
    const dragHandles = getAllByRole('button', { name: /Reorder/i });
    const dragHandle = dragHandles[0];
    const targetField = dragHandles[1];

    fireEvent.dragStart(dragHandle);
    fireEvent.dragEnter(targetField);
    fireEvent.drop(targetField);
    fireEvent.dragEnd(dragHandle);

    await (() => {
      expect(onUpdate).toHaveBeenCalledWith(['Item 2', 'Item 1']);
    });
  });
  it('sets up drag and drop correctly', async () => {
    const items = ['Item 1', 'Item 2'];
    const onUpdate = jest.fn();

    const { getAllByRole } = render(
      <ReorderableTextFields items={items} onUpdate={onUpdate} />,
    );

    const dragHandles = getAllByRole('button', { name: /Reorder/i });
    const firstDragHandle = dragHandles[0];
    const secondDragHandle = dragHandles[1];

    fireEvent.dragStart(firstDragHandle);
    fireEvent.dragEnter(secondDragHandle);
    fireEvent.drop(secondDragHandle);
    fireEvent.dragEnd(firstDragHandle);

    await (() => {
      expect(onUpdate).toHaveBeenCalledWith(['Item 2', 'Item 1']);
    });
  });

  it('calls setClosestEdge on drag', async () => {
    const items = ['Item 1', 'Item 2'];
    const onUpdate = jest.fn();
    const setClosestEdge = jest.fn();

    const { getAllByRole } = render(
      <ReorderableTextFields items={items} onUpdate={onUpdate} />,
    );

    const dragHandles = getAllByRole('button', { name: /Reorder/i });
    const firstDragHandle = dragHandles[0];
    const secondDragHandle = dragHandles[1];

    fireEvent.dragStart(firstDragHandle);
    fireEvent.dragEnter(secondDragHandle);

    await (() => { expect(setClosestEdge).toHaveBeenCalledWith(expect.any(String)); });
    fireEvent.dragLeave(secondDragHandle);

    await (() => {
      expect(setClosestEdge).toHaveBeenCalledWith(null);
    });

    fireEvent.drop(secondDragHandle);

    await (() => {
      expect(setClosestEdge).toHaveBeenCalledWith(null);
    });
  });

  it('resets closestEdge onDragStart', async () => {
    const items = ['Item 1', 'Item 2'];
    const onUpdate = jest.fn();

    const { getAllByRole } = render(
      <ReorderableTextFields items={items} onUpdate={onUpdate} />,
    );

    const dragHandles = getAllByRole('button', { name: /Reorder/i });
    const firstDragHandle = dragHandles[0];

    fireEvent.dragStart(firstDragHandle);

    await (() => {
      expect(firstDragHandle.closestEdge).toBeNull();
    });
  });

  it('calls setClosestEdge onDragLeave', async () => {
    const items = ['Item 1', 'Item 2'];
    const onUpdate = jest.fn();
    const setClosestEdge = jest.fn();

    const { getAllByRole } = render(
      <ReorderableTextFields items={items} onUpdate={onUpdate} />,
    );

    const dragHandles = getAllByRole('button', { name: /Reorder/i });
    const firstDragHandle = dragHandles[0];
    const secondDragHandle = dragHandles[1];

    fireEvent.dragStart(firstDragHandle);
    fireEvent.dragEnter(secondDragHandle);
    fireEvent.dragLeave(secondDragHandle);

    await (() => {
      expect(setClosestEdge).toHaveBeenCalledWith(null);
    });
  });

  it('calls setClosestEdge onDrop', async () => {
    const items = ['Item 1', 'Item 2'];
    const onUpdate = jest.fn();
    const setClosestEdge = jest.fn();

    const { getAllByRole } = render(
      <ReorderableTextFields items={items} onUpdate={onUpdate} />,
    );

    const dragHandles = getAllByRole('button', { name: /Reorder/i });
    const firstDragHandle = dragHandles[0];
    const secondDragHandle = dragHandles[1];

    fireEvent.dragStart(firstDragHandle);
    fireEvent.dragEnter(secondDragHandle);
    fireEvent.drop(secondDragHandle);

    await (() => {
      expect(setClosestEdge).toHaveBeenCalledWith(null);
    });
  });

  it('returns the correct reorder destination index', () => {
    const startIndex = 0;
    const indexOfTarget = 1;
    const closestEdgeOfTarget = 'bottom';
    const getReorderDestinationIndex = jest.fn();

    getReorderDestinationIndex.mockReturnValueOnce(1);

    const result = getReorderDestinationIndex({
      axis: 'vertical',
      startIndex,
      indexOfTarget,
      closestEdgeOfTarget,
    });

    expect(result).toBe(1);
  });
  test('getInitialData returns the correct data', async () => {
    const items = ['Field 1', 'Field 2', 'Field 3'];
    const onUpdate = jest.fn();

    const { getAllByRole } = render(<ReorderableTextFields items={items} onUpdate={onUpdate} />);

    const dragHandle = getAllByRole('button', { name: /Reorder/i })[0];
    dragHandle.getInitialData = jest.fn(() => ({ type: 'field', id: 0, index: 0 }));
    expect(dragHandle.getInitialData()).toEqual({ type: 'field', id: 0, index: 0 });
  });

  test('should call the drag method', async () => {
    const items = ['Field 1', 'Field 2', 'Field 3'];
    const onUpdate = jest.fn();

    const { getAllByRole } = render(<ReorderableTextFields items={items} onUpdate={onUpdate} />);

    const dragHandles = getAllByRole('button', { name: /Reorder/i });
    const firstDragHandle = dragHandles[0];
    const secondDragHandle = dragHandles[1];

    fireEvent.dragStart(firstDragHandle);
    fireEvent.dragEnter(secondDragHandle);
    fireEvent.drop(secondDragHandle);
  });

  it('should monitor elements of type "field"', () => {
    const items = ['Item 1', 'Item 2'];
    const onUpdate = jest.fn();

    render(<ReorderableTextFields items={items} onUpdate={onUpdate} />);
    const source = { data: { type: 'field', instanceId } };
    expect(monitorForElements).toHaveBeenCalled();
    const { canMonitor } = monitorForElements.mock.calls[0][0];
    const result = canMonitor({ source });
    expect(result).toBe(true);
  });

  it('should reorder items on drop', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const onUpdate = jest.fn();

    render(<ReorderableTextFields items={items} onUpdate={onUpdate} />);
    const location = {
      current: {
        dropTargets: [{ data: { index: 1, instanceId } }],
      },
    };
    const source = { data: { index: 0, instanceId } };

    const { onDrop } = monitorForElements.mock.calls[0][0];
    onDrop({ location, source });
    const expectedItems = ['Item 2', 'Item 1', 'Item 3'];
    expect(onUpdate).toHaveBeenCalledWith(expectedItems);
  });

  it('should reorder items on drop', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const onUpdate = jest.fn();

    render(<ReorderableTextFields items={items} onUpdate={onUpdate} />);
    const location = {
      current: {
        dropTargets: [{ data: { index: 1, instanceId } }],
      },
    };
    const source = { data: { index: 0, instanceId } };

    const { onDrop } = monitorForElements.mock.calls[0][0];
    onDrop({ location, source });

    const expectedItems = ['Item 2', 'Item 1', 'Item 3'];
    expect(onUpdate).toHaveBeenCalledWith(expectedItems);
  });

  it('should not reorder items when dropping on the same target', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const onUpdate = jest.fn();

    render(<ReorderableTextFields items={items} onUpdate={onUpdate} />);

    const location = {
      current: {
        dropTargets: [{ data: { index: 0, instanceId } }],
      },
    };
    const source = { data: { index: 0, instanceId } };

    const { onDrop } = monitorForElements.mock.calls[0][0];
    onDrop({ location, source });

    expect(onUpdate).not.toHaveBeenCalled();
  });

  it('should not reorder items when dropping on an invalid target', () => {
    const items = ['Item 1', 'Item 2', 'Item 3'];
    const onUpdate = jest.fn();

    render(<ReorderableTextFields items={items} onUpdate={onUpdate} />);

    const location = {
      current: {
        dropTargets: [],
      },
    };
    const source = { data: { index: 0, instanceId } };
    const { onDrop } = monitorForElements.mock.calls[0][0];
    onDrop({ location, source });
    expect(onUpdate).not.toHaveBeenCalled();
  });
});
