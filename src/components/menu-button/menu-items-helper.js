import React from 'react';
import menuItemsData from './menu-items-data.json';

/**
 * Generates menu items from JSON data
 * @param {string} type - The type of menu items to generate
 * @returns {Array} Array of menu items with React elements
 */
export function generateMenuItems(type) {
  const data = menuItemsData[type];
  if (!data) {
    return [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ];
  }

  return data.map((item) => {
    const processedItem = {
      label: item.label,
      value: item.value,
      disabled: item.disabled,
      image: item.image,
    };

    // Process icon if it exists
    if (item.icon) {
      if (item.icon.type === 'img') {
        processedItem.icon = (
          <img
            src={item.icon.src}
            alt={item.icon.alt}
            style={item.icon.style}
          />
        );
      } else if (item.icon.type === 'span') {
        processedItem.icon = (
          <span style={item.icon.style}>
            {item.icon.content}
          </span>
        );
      }
    }

    return processedItem;
  });
}

export default generateMenuItems;
