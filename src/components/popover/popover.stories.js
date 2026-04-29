import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { action } from 'storybook/actions';
import { Link, Typography } from '@mui/material';
import { Info, MoreVert } from '@mui/icons-material';
import Popover from './index';
import Button from '../button';
import IconButton from '../icon-button';

export default {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A reusable popover component that displays content on top of another element. Built on top of the MUI Modal component — scroll and click away are blocked by default.',
      },
    },
  },
  argTypes: {
    anchorElement: {
      description: 'The DOM element to attach the popover to',
    },
    anchorOrigin: {
      description: 'The anchor point on the anchor element',
      control: 'object',
    },
    children: {
      description: 'Content to display inside the popover',
      control: false,
    },
    onClose: {
      action: 'closed',
      description: 'Callback fired when the popover is closed',
    },
    open: {
      control: 'boolean',
      description: 'Whether the popover is open',
    },
    transformOrigin: {
      description: 'The transform origin point on the popover',
      control: 'object',
    },
    testId: {
      control: 'text',
      description: 'Test ID applied to the popover paper element',
    },
  },
};

export const Basic = {
  render: () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      action('onClose')();
    };

    return (
      <>
        <Button
          ref={anchorRef}
          variant="contained"
          color="primary"
          onClick={handleOpen}
          testId="popover-trigger"
        >
          Open Popover
        </Button>
        <Popover
          anchorElement={anchorRef.current}
          open={open}
          onClose={handleClose}
          testId="popover-basic"
        >
          <Typography>The content of the Popover.</Typography>
        </Popover>
      </>
    );
  },
};

export const WithIconButton = {
  render: () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      action('onClose')();
    };

    return (
      <>
        <IconButton
          ref={anchorRef}
          color="primary"
          onClick={handleOpen}
          testId="popover-icon-trigger"
        >
          <Info />
        </IconButton>
        <Popover
          anchorElement={anchorRef.current}
          open={open}
          onClose={handleClose}
          testId="popover-icon"
        >
          <Typography>Helpful information displayed in a popover.</Typography>
        </Popover>
      </>
    );
  },
};

const positions = [
  {
    label: 'Top Left',
    anchorOrigin: { vertical: 'top', horizontal: 'left' },
    transformOrigin: { vertical: 'bottom', horizontal: 'right' },
  },
  {
    label: 'Top Center',
    anchorOrigin: { vertical: 'top', horizontal: 'center' },
    transformOrigin: { vertical: 'bottom', horizontal: 'center' },
  },
  {
    label: 'Top Right',
    anchorOrigin: { vertical: 'top', horizontal: 'right' },
    transformOrigin: { vertical: 'bottom', horizontal: 'left' },
  },
  {
    label: 'Center Left',
    anchorOrigin: { vertical: 'center', horizontal: 'left' },
    transformOrigin: { vertical: 'center', horizontal: 'right' },
  },
  {
    label: 'Center',
    anchorOrigin: { vertical: 'center', horizontal: 'center' },
    transformOrigin: { vertical: 'center', horizontal: 'center' },
  },
  {
    label: 'Center Right',
    anchorOrigin: { vertical: 'center', horizontal: 'right' },
    transformOrigin: { vertical: 'center', horizontal: 'left' },
  },
  {
    label: 'Bottom Left',
    anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
    transformOrigin: { vertical: 'top', horizontal: 'right' },
  },
  {
    label: 'Bottom Center',
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
    transformOrigin: { vertical: 'top', horizontal: 'center' },
  },
  {
    label: 'Bottom Right',
    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
    transformOrigin: { vertical: 'top', horizontal: 'left' },
  },
];

const PositionItem = ({ label, anchorOrigin, transformOrigin }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    action('onClose')();
  };

  const testSlug = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Button
        ref={anchorRef}
        variant="outlined"
        color="primary"
        onClick={handleOpen}
        testId={`popover-${testSlug}-trigger`}
      >
        {label}
      </Button>
      <Popover
        anchorElement={anchorRef.current}
        open={open}
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        testId={`popover-${testSlug}`}
      >
        <Typography variant="body2">
          anchor: {anchorOrigin.vertical} {anchorOrigin.horizontal}
        </Typography>
        <Typography variant="body2">
          transform: {transformOrigin.vertical} {transformOrigin.horizontal}
        </Typography>
      </Popover>
    </div>
  );
};

PositionItem.propTypes = {
  label: PropTypes.string.isRequired,
  anchorOrigin: PropTypes.shape({
    vertical: PropTypes.string.isRequired,
    horizontal: PropTypes.string.isRequired,
  }).isRequired,
  transformOrigin: PropTypes.shape({
    vertical: PropTypes.string.isRequired,
    horizontal: PropTypes.string.isRequired,
  }).isRequired,
};

export const AllPositions = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--spacing-40)',
        padding: '120px 80px',
        minHeight: '500px',
      }}
    >
      {positions.map((position) => (
        <PositionItem
          key={position.label}
          label={position.label}
          anchorOrigin={position.anchorOrigin}
          transformOrigin={position.transformOrigin}
        />
      ))}
    </div>
  ),
};

export const RichContent = {
  render: () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
      action('onClose')();
    };

    return (
      <>
        <IconButton
          ref={anchorRef}
          color="primary"
          onClick={handleOpen}
          testId="popover-rich-trigger"
        >
          <MoreVert />
        </IconButton>
        <Popover
          anchorElement={anchorRef.current}
          open={open}
          onClose={handleClose}
          testId="popover-rich"
        >
          <Typography variant="subtitle1" gutterBottom>
            Popover Title
          </Typography>
          <Typography variant="body2" color="textSecondary">
            This popover contains richer content with a title and description.
            {' '}
            <Link
              href="https://mui.com/material-ui/react-popover/"
              target="_blank"
              rel="noopener"
            >
              Learn more
            </Link>
          </Typography>
        </Popover>
      </>
    );
  },
};
