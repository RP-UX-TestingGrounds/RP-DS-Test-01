import React from 'react';

import Button from '../button';
import FormFields from '../form-fields';
import FormSection from '../form-section';
import FormSubsection from '.';
import HelperText from '../helper-text';
import MultiChip from '../multi-chip';
import StorySlot from '../../utils/story-slot';

export default {
  title: 'Components/Form/FormSubsection',
  tags: [],
  component: FormSubsection,
  parameters: {
    docs: {
      description: {
        component:
          'Use **`FormSection`** for a titled vertical stack. Nest **`FormSubsection`** when you need a banner, '
          + 'a **title + actions on one row**, and a body (lists, chips, fields). '
          + 'Both are generic building blocks for any settings or form screen.',
      },
    },
  },
};

const documentation = {
  actions: {
    description: 'Optional node on the right side of the toolbar (e.g. buttons)',
    table: { type: { summary: 'node' } },
  },
  banner: {
    description: 'Optional node above the toolbar (body-md typography)',
    table: { type: { summary: 'node' } },
  },
  children: {
    description: 'Main content below the toolbar, stacked with spacing-8',
    table: { type: { summary: 'node' } },
  },
  className: {
    description: 'Additional CSS class on the root',
    table: { type: { summary: 'string' } },
  },
  testId: {
    description: 'data-test-id on the root element',
    table: { type: { summary: 'string' } },
  },
  title: {
    description: 'Optional toolbar title (title-sm; aligns visually with FormSection title)',
    table: { type: { summary: 'node' } },
  },
};

/** Standalone: no outer FormSection */
export const Default = {
  args: {
    title: 'Subsection title',
    testId: 'form-subsection-default',
  },
  render: (args) => (
    <FormSubsection
      {...args}
      actions={(
        <>
          <Button
            variant="text"
            color="primary"
            size="small"
            testId="reset"
          >
            Reset
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            testId="add"
          >
            Add
          </Button>
        </>
      )}
    >
      <StorySlot height="80px">Any body content (fields, MultiChip, tables, …)</StorySlot>
    </FormSubsection>
  ),
  argTypes: documentation,
};

export const WithBanner = {
  render: () => (
    <FormSubsection
      testId="form-subsection-banner"
      banner="Short contextual message or disclaimer for this block."
      title="Labels"
      actions={(
        <Button
          variant="outlined"
          color="primary"
          size="small"
          testId="add-label"
        >
          Add label
        </Button>
      )}
    >
      <MultiChip
        testId="chips"
        items={[
          { id: '1', label: 'Alpha' },
          { id: '2', label: 'Beta' },
        ]}
        onDelete={() => {}}
      />
      <HelperText>Optional helper or validation text.</HelperText>
    </FormSubsection>
  ),
  argTypes: documentation,
};

export const ActionsOnlyToolbar = {
  render: () => (
    <FormSubsection
      testId="form-subsection-actions-only"
      actions={(
        <Button
          variant="contained"
          color="primary"
          size="small"
          testId="primary-action"
        >
          Save
        </Button>
      )}
    >
      <StorySlot height="48px">Toolbar actions only (no subsection title)</StorySlot>
    </FormSubsection>
  ),
  argTypes: documentation,
};

/**
 * Pattern: `<FormSection>` when you need a section title; `<FormSubsection>` inside when that section
 * includes a toolbar row + body. No discount-specific copy—same structure works on any screen.
 */
export const NestedInsideFormSection = {
  parameters: {
    docs: {
      description: {
        story:
          '**`FormSection` → `FormSubsection`:** outer title + inner toolbar + body. '
          + 'Use this whenever one grouped block mixes plain fields and a subsection that needs actions beside its title.',
      },
    },
  },
  render: () => (
    <FormSection title="Section title" testId="outer-form-section">
      <FormSubsection
        testId="nested-subsection"
        banner="Optional banner when you need copy above the subsection toolbar."
        title="Subsection title"
        actions={(
          <>
            <Button
              variant="text"
              color="primary"
              size="small"
              testId="nested-reset"
            >
              Reset
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              testId="nested-add"
            >
              Add
            </Button>
          </>
        )}
      >
        <MultiChip
          testId="nested-chips"
          items={[{ id: '1', label: 'Sample item' }]}
          onDelete={() => {}}
        />
        <HelperText>Helper text below the body.</HelperText>
      </FormSubsection>
    </FormSection>
  ),
  argTypes: documentation,
};

/** Same as nested pattern, but with optional sibling fields above the subsection (common in long forms). */
export const FormSectionWithFieldsAndSubsection = {
  parameters: {
    docs: {
      description: {
        story:
          '**`FormSection` → `FormFields` (optional) → `FormSubsection`:** section title, a row of fields, then a subsection with its own toolbar.',
      },
    },
  },
  render: () => (
    <FormSection title="Section title" testId="section-with-fields">
      <FormFields>
        <FormSection flex={1}>
          <StorySlot height="56px">Field or control</StorySlot>
        </FormSection>
        <FormSection flex={1}>
          <StorySlot height="56px">Field or control</StorySlot>
        </FormSection>
      </FormFields>
      <FormSubsection
        testId="subsection-after-fields"
        title="Related list"
        actions={(
          <Button
            variant="outlined"
            color="primary"
            size="small"
            testId="manage-list"
          >
            Manage
          </Button>
        )}
      >
        <StorySlot height="64px">List, chips, or nested content</StorySlot>
      </FormSubsection>
    </FormSection>
  ),
  argTypes: documentation,
};
