import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { extractClosestEdge, attachClosestEdge } from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import DraggableField from './index';

jest.mock('@atlaskit/pragmatic-drag-and-drop/element/adapter', () => ({
  draggable: jest.fn(),
  dropTargetForElements: jest.fn(),
}));

jest.mock('@atlaskit/pragmatic-drag-and-drop/combine', () => ({
  combine: jest.fn(),
}));

jest.mock('@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge', () => ({
  extractClosestEdge: jest.fn(),
  attachClosestEdge: jest.fn(),
}));

const renderComponent = (props) => render(<DraggableField {...props} />);

describe('DraggableField', () => {
  const instanceId = 'test-instance-id';

  it('should call onDelete when the delete button is clicked', () => {
    const onDelete = jest.fn();
    const { getByLabelText } = renderComponent({
      field: 'Test field',
      index: 0,
      onChange: jest.fn(),
      onDelete,
      registerField: jest.fn(),
      instanceId,
    });

    const deleteButton = getByLabelText('clear');
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith(0);
  });

  it('should initialize draggable and dropTargetForElements on mount', () => {
    const mockRegisterField = jest.fn(() => {
      const cleanup = jest.fn();
      draggable.mockImplementation(({ getInitialData }) => {
        const data = getInitialData();
        expect(data).toEqual({
          type: 'field', id: 0, index: 0, instanceId,
        });
        return cleanup;
      });

      dropTargetForElements.mockImplementation(({ getData }) => {
        const data = getData({ input: {} });
        expect(data).toEqual(expect.objectContaining({
          type: 'field', id: 0, index: 0, instanceId,
        }));
        return cleanup;
      });

      return cleanup;
    });

    renderComponent({
      field: 'Test field',
      index: 0,
      onChange: jest.fn(),
      onDelete: jest.fn(),
      registerField: mockRegisterField,
      instanceId,
    });

    expect(draggable).toHaveBeenCalled();
    expect(dropTargetForElements).toHaveBeenCalled();
  });

  it('should reset closestEdge state on drag start', () => {
    const onChange = jest.fn();
    const onDelete = jest.fn();
    const registerField = jest.fn();

    const { container } = renderComponent({
      field: 'Test Field',
      index: 0,
      onChange,
      onDelete,
      registerField,
      instanceId,
    });

    const draggableMock = draggable.mock.calls[0][0];

    act(() => {
      draggableMock.onDragStart();
    });

    expect(container.querySelector('[data-closest-edge]')).toBeNull();
  });

  it('should reset closestEdge state on drag leave', () => {
    const onChange = jest.fn();
    const onDelete = jest.fn();
    const registerField = jest.fn();

    const { container } = renderComponent({
      field: 'Test Field',
      index: 0,
      onChange,
      onDelete,
      registerField,
      instanceId,
    });

    const dropTargetMock = dropTargetForElements.mock.calls[0][0];

    act(() => {
      dropTargetMock.onDragLeave();
    });

    expect(container.querySelector('[data-closest-edge]')).toBeNull();
  });

  it('should reset closestEdge state on drop', () => {
    const onChange = jest.fn();
    const onDelete = jest.fn();
    const registerField = jest.fn();

    const { container } = renderComponent({
      field: 'Test Field',
      index: 0,
      onChange,
      onDelete,
      registerField,
      instanceId,
    });

    const dropTargetMock = dropTargetForElements.mock.calls[0][0];

    act(() => {
      dropTargetMock.onDrop();
    });

    expect(container.querySelector('[data-closest-edge]')).toBeNull();
  });

  it('should return true for canDrop when source data type is field', () => {
    const onChange = jest.fn();
    const onDelete = jest.fn();
    const registerField = jest.fn();

    renderComponent({
      field: 'Test Field',
      index: 0,
      onChange,
      onDelete,
      registerField,
      instanceId,
    });

    const dropTargetMock = dropTargetForElements.mock.calls[0][0];
    const { canDrop } = dropTargetMock;

    const sourceField = { data: { type: 'field', instanceId } };
    expect(canDrop({ source: sourceField })).toBe(true);

    const sourceNonField = { data: { type: 'non-field' } };
    expect(canDrop({ source: sourceNonField })).toBe(false);
  });

  it('should update closestEdge state on drag', () => {
    const onChange = jest.fn();
    const onDelete = jest.fn();
    const registerField = jest.fn();

    const { getAllByTestId } = renderComponent({
      field: 'Test Field',
      index: 0,
      onChange,
      onDelete,
      registerField,
      instanceId,
    });

    const mockClosestEdge = 'bottom';
    extractClosestEdge.mockReturnValue(mockClosestEdge);

    const dropTargetMock = dropTargetForElements.mock.calls[0][0];
    const self = { data: {} };

    act(() => {
      dropTargetMock.onDrag({ self });
    });

    expect(extractClosestEdge).toHaveBeenCalledWith(self.data);
    expect(attachClosestEdge).toHaveBeenCalled();
    expect(getAllByTestId('textField-1')[0].parentElement).toHaveAttribute('data-closest-edge', mockClosestEdge);
  });
});
