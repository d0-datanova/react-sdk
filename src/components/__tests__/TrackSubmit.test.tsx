import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { TrackSubmit } from '../TrackSubmit';
import { DatanovaProvider } from '../../providers/DatanovaProvider';
import { Datanova } from '@datanova/browser';

const mockTrackSubmit = vi.fn();
const mockDatanova = {
  track: vi.fn(),
  trackClick: vi.fn(),
  trackPageView: vi.fn(),
  trackImpression: vi.fn(),
  trackSubmit: mockTrackSubmit,
  trackChange: vi.fn(),
  identify: vi.fn(),
  reset: vi.fn(),
};

describe('TrackSubmit', () => {
  beforeEach(() => {
    mockTrackSubmit.mockClear();
  });

  it('should track submit event when form is submitted', () => {
    const { getByTestId } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackSubmit eventName="Form Submitted" properties={{ formId: 'contact' }}>
          <form data-testid="test-form">
            <button type="submit">Submit</button>
          </form>
        </TrackSubmit>
      </DatanovaProvider>
    );

    fireEvent.submit(getByTestId('test-form'));

    expect(mockTrackSubmit).toHaveBeenCalledWith('Form Submitted', { formId: 'contact' });
  });

  it('should preserve original onSubmit handler', () => {
    const originalOnSubmit = vi.fn((e) => e.preventDefault());

    const { getByTestId } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackSubmit eventName="Form Submitted">
          <form data-testid="test-form" onSubmit={originalOnSubmit}>
            <button type="submit">Submit</button>
          </form>
        </TrackSubmit>
      </DatanovaProvider>
    );

    fireEvent.submit(getByTestId('test-form'));

    expect(mockTrackSubmit).toHaveBeenCalledWith('Form Submitted', undefined);
    expect(originalOnSubmit).toHaveBeenCalled();
  });

  it('should work without properties', () => {
    const { getByTestId } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackSubmit eventName="Simple Form Submitted">
          <form data-testid="test-form">
            <button type="submit">Submit</button>
          </form>
        </TrackSubmit>
      </DatanovaProvider>
    );

    fireEvent.submit(getByTestId('test-form'));

    expect(mockTrackSubmit).toHaveBeenCalledWith('Simple Form Submitted', undefined);
  });

  it('should throw error when children is not a valid React element', () => {
    expect(() => {
      render(
        <DatanovaProvider value={mockDatanova as unknown as Datanova}>
          {/* @ts-expect-error Testing invalid children */}
          <TrackSubmit eventName="Invalid">Not a valid element</TrackSubmit>
        </DatanovaProvider>
      );
    }).toThrow('TrackSubmit must be used with a valid React element');
  });

  it('should handle form without onSubmit handler', () => {
    const { getByTestId } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackSubmit eventName="Form Submitted">
          <form data-testid="test-form">
            <input type="text" name="test" />
            <button type="submit">Submit</button>
          </form>
        </TrackSubmit>
      </DatanovaProvider>
    );

    fireEvent.submit(getByTestId('test-form'));

    expect(mockTrackSubmit).toHaveBeenCalledWith('Form Submitted', undefined);
  });
});
