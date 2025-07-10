import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { TrackImpression } from '../TrackImpression';
import { DatanovaProvider } from '../../providers/DatanovaProvider';
import { Datanova } from '@datanova/browser';

const mockTrackImpression = vi.fn();
const mockDatanova = {
  track: vi.fn(),
  trackClick: vi.fn(),
  trackPageView: vi.fn(),
  trackImpression: mockTrackImpression,
  trackSubmit: vi.fn(),
  trackChange: vi.fn(),
  identify: vi.fn(),
  reset: vi.fn(),
};

vi.mock('react-intersection-observer', () => ({
  InView: ({
    children,
    onChange,
    threshold,
    triggerOnce,
  }: {
    children: React.ReactNode;
    onChange: (inView: boolean) => void;
    threshold: number;
    triggerOnce: boolean;
  }) => {
    const testId = `inview-${threshold}-${triggerOnce}`;

    return (
      <div
        data-testid={testId}
        data-threshold={threshold}
        data-trigger-once={triggerOnce}
        onClick={() => onChange(true)}
      >
        {children}
      </div>
    );
  },
}));

describe('TrackImpression', () => {
  beforeEach(() => {
    mockTrackImpression.mockClear();
  });

  it('should render children', () => {
    const { getByText } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackImpression eventName="Section Viewed">
          <div>Test Content</div>
        </TrackImpression>
      </DatanovaProvider>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('should track impression when element comes into view', () => {
    const { getByTestId } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackImpression eventName="Section Viewed">
          <div>Test Content</div>
        </TrackImpression>
      </DatanovaProvider>
    );

    // Simulate element coming into view
    getByTestId('inview-0.5-true').click();

    expect(mockTrackImpression).toHaveBeenCalledWith('Section Viewed', undefined);
  });

  it('should track impression with properties', () => {
    const properties = { sectionId: 'hero', position: 1 };

    const { getByTestId } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackImpression eventName="Hero Viewed" properties={properties}>
          <div>Hero Section</div>
        </TrackImpression>
      </DatanovaProvider>
    );

    // Simulate element coming into view
    getByTestId('inview-0.5-true').click();

    expect(mockTrackImpression).toHaveBeenCalledWith('Hero Viewed', properties);
  });

  it('should use custom threshold', () => {
    const { getByTestId } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackImpression eventName="Section Viewed" threshold={0.8}>
          <div>Test Content</div>
        </TrackImpression>
      </DatanovaProvider>
    );

    const element = getByTestId('inview-0.8-true');
    expect(element.getAttribute('data-threshold')).toBe('0.8');
  });

  it('should use triggerOnce setting', () => {
    const { getByTestId } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackImpression eventName="Section Viewed" triggerOnce={false}>
          <div>Test Content</div>
        </TrackImpression>
      </DatanovaProvider>
    );

    const element = getByTestId('inview-0.5-false');
    expect(element.getAttribute('data-trigger-once')).toBe('false');
  });

  it('should not track when element is not in view', () => {
    render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackImpression eventName="Section Viewed">
          <div>Test Content</div>
        </TrackImpression>
      </DatanovaProvider>
    );

    expect(mockTrackImpression).not.toHaveBeenCalled();
  });
});
