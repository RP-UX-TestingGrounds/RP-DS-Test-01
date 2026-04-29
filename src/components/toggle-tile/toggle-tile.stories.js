import React, { useEffect, useState } from 'react';

import { action } from 'storybook/actions';
import ToggleTile from '.';
import StorySlot from '../../utils/story-slot';

export default {
  title: 'Components/ToggleTile',
  tags: ['autodocs'],
  component: ToggleTile,
  parameters: {
    controls: {
      exclude: ['children'],
    },
  },
};

function createToggleTileStory(children) {
  function Story(args) {
    const { toggleValue: argsToggleValue, ...rest } = args;
    const [checked, setChecked] = useState(Boolean(argsToggleValue));

    useEffect(() => {
      setChecked(Boolean(argsToggleValue));
    }, [argsToggleValue]);

    return (
      <ToggleTile
        {...rest}
        toggleValue={checked}
        onToggleChange={(event, isChecked) => {
          setChecked(isChecked);
        }}
      >
        {children}
      </ToggleTile>
    );
  }
  Story.displayName = 'ToggleTileStory';
  return Story;
}

const baseArgs = {
  testId: 'toggle-tile',
  title: 'Payment method',
  subtitle: 'Use this card for wholesale orders.',
  toggle: true,
  toggleValue: false,
  chipLabel: 'Default',
  actionLabel: 'Edit',
  onClickAction: () => action('toggle-tile-action-clicked')(),
};

export const Full = {
  render: createToggleTileStory(
    <StorySlot>Body slot — forms, lists, or custom content</StorySlot>,
  ),
  args: {
    ...baseArgs,
    iconName: 'credit',
  },
};

export const NoContent = {
  render: createToggleTileStory(null),
  args: {
    ...baseArgs,
    iconName: 'credit',
  },
};

export const NoToggle = {
  render: createToggleTileStory(
    <StorySlot>No switch in header</StorySlot>,
  ),
  args: {
    ...baseArgs,
    toggle: false,
    iconName: 'credit',
  },
};

export const TitleOnly = {
  render: createToggleTileStory(null),
  args: {
    testId: 'toggle-tile',
    title: 'Title only',
  },
};

export const WithChipColor = {
  render: createToggleTileStory(null),
  args: {
    testId: 'toggle-tile',
    title: 'Status',
    chipLabel: 'Primary',
    chipColor: 'primary',
  },
};

export const WithGreenHeader = {
  render: createToggleTileStory(
    <StorySlot>Colored title and icon</StorySlot>,
  ),
  args: {
    ...baseArgs,
    iconName: 'credit',
    iconColor: 'var(--success-dark)',
    titleColor: 'var(--success-dark)',
  },
};

export const WithNonSquareIcon = {
  render: createToggleTileStory(
    <StorySlot>Wide logo icon (visaLogo stub)</StorySlot>,
  ),
  args: {
    ...baseArgs,
    iconName: 'visaLogo',
  },
};
