import React from 'react';
import Skeleton from '.';

export default {
  title: 'Components/Skeleton',
  tags: ['autodocs'],
  component: Skeleton,
};

export const Default = {
  args: {
    animation: 'pulse',
    testId: 'test-skeleton',
    variant: 'text',
  },
  render: (args) => {
    return (<div style={{ padding: '40px' }}>
      <Skeleton
        {...args}
        width={210}
        sx={{ fontSize: '1rem' }}
      />
    </div>);
  },
};

export const Variants = {
  args: {
    animation: 'pulse',
    testId: 'test-skeleton',
  },
  render: (args) => {
    return (<div
style={{
  display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px',
}}
            >
      <div>
        <h4 style={{ marginBottom: '10px' }}>Text</h4>
        <Skeleton
          {...args}
          variant="text"
          width={210}
          sx={{ fontSize: '1rem' }}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '10px' }}>Circular</h4>
        <Skeleton
          {...args}
          variant="circular"
          width={40}
          height={40}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '10px' }}>Rectangular</h4>
        <Skeleton
          {...args}
          variant="rectangular"
          width={210}
          height={60}
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '10px' }}>Rounded</h4>
        <Skeleton
          {...args}
          variant="rounded"
          width={210}
          height={60}
        />
      </div>
    </div>);
  },
};

export const Animations = {
  args: {
    variant: 'rectangular',
    width: 210,
    height: 118,
    testId: 'test-skeleton',
  },
  render: (args) => {
    return (<div
style={{
  display: 'flex', flexDirection: 'column', gap: '20px', padding: '40px',
}}
            >
      <div>
        <h4 style={{ marginBottom: '10px' }}>Pulse (default)</h4>
        <Skeleton
          {...args}
          animation="pulse"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '10px' }}>Wave</h4>
        <Skeleton
          {...args}
          animation="wave"
        />
      </div>
      <div>
        <h4 style={{ marginBottom: '10px' }}>No Animation</h4>
        <Skeleton
          {...args}
          animation={false}
        />
      </div>
    </div>);
  },
};

export const TextSizes = {
  args: {
    variant: 'text',
    testId: 'test-skeleton',
  },
  render: (args) => {
    return (<div style={{ padding: '40px' }}>
      <Skeleton
        {...args}
        sx={{ fontSize: '3.4rem', marginBottom: '12px' }}
      />
      <Skeleton
        {...args}
        sx={{ fontSize: '2.6rem', marginBottom: '12px' }}
      />
      <Skeleton
        {...args}
        sx={{ fontSize: '1.8rem', marginBottom: '12px' }}
      />
      <Skeleton
        {...args}
        sx={{ fontSize: '1.4rem', marginBottom: '12px' }}
      />
      <Skeleton
        {...args}
        sx={{ fontSize: '1.2rem' }}
      />
    </div>);
  },
};

export const CustomWidth = {
  args: {
    variant: 'rectangular',
    height: 60,
    testId: 'test-skeleton',
  },
  render: (args) => {
    return (<div
style={{
  display: 'flex', flexDirection: 'column', gap: '10px', padding: '40px',
}}
            >
      <Skeleton
        {...args}
        width="100%"
      />
      <Skeleton
        {...args}
        width="80%"
      />
      <Skeleton
        {...args}
        width="60%"
      />
      <Skeleton
        {...args}
        width="40%"
      />
      <Skeleton
        {...args}
        width="20%"
      />
    </div>);
  },
};

export const KPITileExample = {
  args: {
    testId: 'test-skeleton',
  },
  render: (args) => {
    return (<div
  style={{
    display: 'flex', gap: '20px', padding: '40px', flexWrap: 'wrap',
  }}
            >
        {/* KPI Tile with footer */}
        <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '180px',
  }}
        >
          <Skeleton
            {...args}
            variant="text"
            sx={{ fontSize: '1.3rem', width: '60%' }}
          />
          <Skeleton
            {...args}
            variant="text"
            sx={{ fontSize: '3.4rem', marginBottom: '8px' }}
          />
          <Skeleton
            {...args}
            variant="text"
            sx={{ fontSize: '1.3rem', width: '50%' }}
          />
        </div>

        {/* KPI Tile without title */}
        <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '180px',
  }}
        >
          <Skeleton
            {...args}
            variant="text"
            sx={{ fontSize: '3.4rem', marginBottom: '8px' }}
          />
          <Skeleton
            {...args}
            variant="text"
            sx={{ fontSize: '1.3rem', width: '50%' }}
          />
        </div>

        {/* KPI Tile with Sparkline */}
        <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '180px',
  }}
        >
          <Skeleton
            {...args}
            variant="text"
            sx={{ fontSize: '1.3rem', width: '70%' }}
          />
          <Skeleton
            {...args}
            variant="text"
            sx={{ fontSize: '3.4rem', marginBottom: '8px' }}
          />
          <Skeleton
            {...args}
            variant="rectangular"
            width="100%"
            height={30}
          />
        </div>

        {/* Large size KPI Tile */}
        <div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '180px',
  }}
        >
          <Skeleton
            {...args}
            variant="text"
            sx={{ fontSize: '1.3rem', width: '50%' }}
          />
          <Skeleton
            {...args}
            variant="text"
            sx={{ fontSize: '3.4rem', marginBottom: '12px' }}
          />
          <Skeleton
            {...args}
            variant="text"
            sx={{ fontSize: '1.3rem', width: '60%' }}
          />
        </div>
      </div>);
  },
};
