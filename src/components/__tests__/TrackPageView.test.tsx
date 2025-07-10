import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { TrackPageView } from '../TrackPageView';
import { DatanovaProvider } from '../../providers/DatanovaProvider';
import { Datanova } from '@datanova/browser';

const mockTrackPageView = vi.fn();
const mockDatanova = {
  track: vi.fn(),
  trackClick: vi.fn(),
  trackPageView: mockTrackPageView,
  trackImpression: vi.fn(),
  trackSubmit: vi.fn(),
  trackChange: vi.fn(),
  identify: vi.fn(),
  reset: vi.fn(),
};

describe('TrackPageView', () => {
  beforeEach(() => {
    mockTrackPageView.mockClear();
  });

  it('should track page view event on mount', () => {
    render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackPageView eventName="Page Viewed" />
      </DatanovaProvider>
    );

    expect(mockTrackPageView).toHaveBeenCalledWith('Page Viewed', undefined);
  });

  it('should track page view event with properties', () => {
    const properties = { pageId: '123', section: 'products' };

    render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackPageView eventName="Product Page Viewed" properties={properties} />
      </DatanovaProvider>
    );

    expect(mockTrackPageView).toHaveBeenCalledWith('Product Page Viewed', properties);
  });

  it('should render nothing', () => {
    const { container } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackPageView eventName="Page Viewed" />
      </DatanovaProvider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('should re-track when eventName changes', () => {
    const { rerender } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackPageView eventName="Page 1 Viewed" />
      </DatanovaProvider>
    );

    expect(mockTrackPageView).toHaveBeenCalledTimes(1);
    expect(mockTrackPageView).toHaveBeenCalledWith('Page 1 Viewed', undefined);

    rerender(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackPageView eventName="Page 2 Viewed" />
      </DatanovaProvider>
    );

    expect(mockTrackPageView).toHaveBeenCalledTimes(2);
    expect(mockTrackPageView).toHaveBeenLastCalledWith('Page 2 Viewed', undefined);
  });
});
