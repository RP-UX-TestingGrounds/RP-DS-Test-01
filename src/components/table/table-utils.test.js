import { dynamicSortPropertyWithDirection } from './table-utils';

describe('dynamicSortPropertyWithDirection', () => {
  // Test case to verify sorting with ascending direction
  it('should sort objects in ascending order based on properties', () => {
    // Define properties and objects array
    const properties = [{ property: 'name', direction: 'asc' }, { property: 'age', direction: 'asc' }];
    const objects = [
      { name: 'John', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
    ];

    const sortFunction = dynamicSortPropertyWithDirection(properties);
    const sortedObjects = objects.toSorted(sortFunction);

    const expectedSortedObjects = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
      { name: 'John', age: 30 },
    ];

    expect(sortedObjects).toEqual(expectedSortedObjects);
  });

  // Test case to verify sorting with descending direction
  it('should sort objects in descending order based on properties', () => {
    // Define properties and objects array
    const properties = [{ property: 'name', direction: 'desc' }, { property: 'age', direction: 'desc' }];
    const objects = [
      { name: 'John', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
    ];

    const sortFunction = dynamicSortPropertyWithDirection(properties);
    const sortedObjects = objects.toSorted(sortFunction);

    const expectedSortedObjects = [
      { name: 'John', age: 30 },
      { name: 'Bob', age: 35 },
      { name: 'Alice', age: 25 },
    ];

    expect(sortedObjects).toEqual(expectedSortedObjects);
  });
});
