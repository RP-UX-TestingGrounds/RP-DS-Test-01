import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import KPITile from './index';
import TrendIndicator from '../trend-indicator';
import SecondaryMetric from '../secondary-metric';

describe('KPITile', () => {
  it('renders basic KPI tile with title and metric value', () => {
    const { container } = render(
      <KPITile
        testId="basic-kpi"
        title="Revenue"
        metricValue="$1,234"
      />,
    );

    expect(container.querySelector('[data-test-id="basic-kpi"]')).toBeInTheDocument();
    expect(container.textContent).toContain('Revenue');
    expect(container.textContent).toContain('$1,234');
  });

  it('renders KPI tile without title', () => {
    const { container } = render(
      <KPITile
        testId="no-title-kpi"
        metricValue="85%"
      />,
    );

    expect(container.querySelector('[data-test-id="no-title-kpi"]')).toBeInTheDocument();
    expect(container.textContent).toContain('85%');
  });

  it('does not render header when no title, link, or tooltip', () => {
    const { container } = render(
      <KPITile testId="no-header-kpi" metricValue="99" />,
    );

    expect(container.querySelector('[data-test-id="no-header-kpi"]')).toBeInTheDocument();
    expect(container.textContent).toContain('99');
    expect(container.querySelector('[data-test-id="no-header-kpi-header"]')).not.toBeInTheDocument();
  });

  it('renders with TrendIndicator footer', () => {
    const { container } = render(
      <KPITile
        testId="positive-trend-kpi"
        title="Growth"
        metricValue="12.5%"
        footer={<TrendIndicator variant="success" value="5.2%" />}
      />,
    );

    expect(container.textContent).toContain('Growth');
    expect(container.textContent).toContain('12.5%');
    expect(container.textContent).toContain('5.2%');
  });

  it('renders with negative TrendIndicator footer', () => {
    const { container } = render(
      <KPITile
        testId="negative-trend-kpi"
        title="Decline"
        metricValue="8.3%"
        footer={<TrendIndicator variant="error" value="2.1%" />}
      />,
    );

    expect(container.textContent).toContain('Decline');
    expect(container.textContent).toContain('8.3%');
    expect(container.textContent).toContain('2.1%');
  });

  it('renders with SecondaryMetric footer', () => {
    const { container } = render(
      <KPITile
        testId="secondary-metric-kpi"
        title="Sales"
        metricValue="$50K"
        footer={<SecondaryMetric value="$5K" label="Secondary" />}
      />,
    );

    expect(container.textContent).toContain('Sales');
    expect(container.textContent).toContain('$50K');
    expect(container.textContent).toContain('$5K');
    expect(container.textContent).toContain('Secondary');
  });

  it('renders with custom footer', () => {
    const { container } = render(
      <KPITile
        testId="custom-footer-kpi"
        title="Custom"
        metricValue="45%"
        footer={<div data-test-id="custom-footer">Custom content</div>}
      />,
    );

    expect(container.textContent).toContain('Custom');
    expect(container.textContent).toContain('45%');
    expect(container.querySelector('[data-test-id="custom-footer"]')).toBeInTheDocument();
    expect(container.textContent).toContain('Custom content');
  });

  it('renders without footer', () => {
    const { container } = render(
      <KPITile
        testId="no-footer-kpi"
        title="Simple"
        metricValue="100"
      />,
    );

    expect(container.textContent).toContain('Simple');
    expect(container.textContent).toContain('100');
  });

  it('applies custom className', () => {
    const { container } = render(
      <KPITile
        testId="custom-class-kpi"
        title="Custom"
        metricValue="99"
        className="custom-kpi-class"
      />,
    );

    const kpiElement = container.querySelector('[data-test-id="custom-class-kpi"]');
    expect(kpiElement).toHaveClass('custom-kpi-class');
  });

  it('applies size classes correctly', () => {
    const { rerender, container } = render(
      <KPITile
        testId="size-test-kpi"
        title="Size Test"
        metricValue="100"
        size="small"
      />,
    );

    let kpiElement = container.querySelector('[data-test-id="size-test-kpi"]');
    expect(kpiElement).toHaveClass('kpi-tile-small');

    rerender(
      <KPITile
        testId="size-test-kpi"
        title="Size Test"
        metricValue="100"
        size="large"
      />,
    );

    kpiElement = container.querySelector('[data-test-id="size-test-kpi"]');
    expect(kpiElement).toHaveClass('kpi-tile-large');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <KPITile
        testId="clickable-kpi"
        title="Clickable"
        metricValue="50"
        onClick={handleClick}
      />,
    );

    const kpiElement = container.querySelector('[data-test-id="clickable-kpi"]');
    expect(kpiElement).toHaveClass('actionable');

    kpiElement.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with neutral TrendIndicator footer', () => {
    const { container } = render(
      <KPITile
        testId="neutral-trend-kpi"
        title="Stable"
        metricValue="5%"
      footer={<TrendIndicator variant="default" value="0%" />}
      />,
    );

    expect(container.textContent).toContain('Stable');
    expect(container.textContent).toContain('5%');
    expect(container.textContent).toContain('0%');
  });

  it('renders with tooltip', async () => {
    const { container, getByText } = render(
      <KPITile
        testId="tooltip-kpi"
        title="Tooltip"
        metricValue="100"
        tooltipText="This is a tooltip"
      />,
    );

    expect(container.textContent).toContain('Tooltip');
    expect(container.textContent).toContain('100');

    const tooltipIcon = container.querySelector('svg');
    expect(tooltipIcon).toBeInTheDocument();
    await act(async () => {
      fireEvent.mouseOver(tooltipIcon);
    });

    await waitFor(() => {
      expect(getByText('This is a tooltip')).toBeInTheDocument();
    });
  });

  it('renders with link', () => {
    const { container } = render(
      <KPITile
        testId="link-kpi"
        title="Link"
        metricValue="100"
        link="https://www.mycompany.com/learn-more"
        linkText="Learn More"
      />,
    );

    expect(container.textContent).toContain('Link');
    expect(container.textContent).toContain('100');
    expect(container.textContent).toContain('Learn More');
  });

  it('renders with tooltip and link', async () => {
    const { container, getByText } = render(
      <KPITile
        testId="tooltip-link-kpi"
        title="Tooltip and Link"
        metricValue="100"
        tooltipText="This is a tooltip"
        link="https://www.mycompany.com/learn-more"
        linkText="Learn More"
      />,
    );

    expect(container.textContent).toContain('Tooltip and Link');
    expect(container.textContent).toContain('100');
    expect(container.textContent).toContain('Learn More');

    const tooltipIcon = container.querySelector('svg');
    expect(tooltipIcon).toBeInTheDocument();
    await act(async () => {
      fireEvent.mouseOver(tooltipIcon);
    });

    await waitFor(() => {
      expect(getByText('This is a tooltip')).toBeInTheDocument();
    });
  });
});
