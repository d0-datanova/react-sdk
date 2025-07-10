import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { TrackClick } from '../TrackClick';
import { DatanovaProvider } from '../../providers/DatanovaProvider';
import { Datanova } from '@datanova/browser';

const mockTrackClick = vi.fn();
const mockDatanova = {
  track: vi.fn(),
  trackClick: mockTrackClick,
  trackPageView: vi.fn(),
  trackImpression: vi.fn(),
  trackSubmit: vi.fn(),
  trackChange: vi.fn(),
  identify: vi.fn(),
  reset: vi.fn(),
};

describe('TrackClick', () => {
  beforeEach(() => {
    mockTrackClick.mockClear();
  });

  it('should track click event when child element is clicked', () => {
    const { getByText } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackClick eventName="Button Clicked" properties={{ buttonId: 'test' }}>
          <button>Click me</button>
        </TrackClick>
      </DatanovaProvider>
    );

    fireEvent.click(getByText('Click me'));

    expect(mockTrackClick).toHaveBeenCalledWith('Button Clicked', { buttonId: 'test' });
  });

  it('should preserve original onClick handler', () => {
    const originalOnClick = vi.fn();

    const { getByText } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackClick eventName="Button Clicked">
          <button onClick={originalOnClick}>Click me</button>
        </TrackClick>
      </DatanovaProvider>
    );

    fireEvent.click(getByText('Click me'));

    expect(mockTrackClick).toHaveBeenCalledWith('Button Clicked', undefined);
    expect(originalOnClick).toHaveBeenCalled();
  });

  it('should throw error when children is not a valid React element', () => {
    expect(() => {
      render(
        <DatanovaProvider value={mockDatanova as unknown as Datanova}>
          {/* @ts-expect-error Testing invalid children */}
          <TrackClick eventName="Invalid">Not a valid element</TrackClick>
        </DatanovaProvider>
      );
    }).toThrow('TrackClick must be used with a valid React element');
  });
});
