import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { TrackChange } from '../TrackChange';
import { DatanovaProvider } from '../../providers/DatanovaProvider';
import { Datanova } from '@datanova/browser';

const mockTrackChange = vi.fn();
const mockDatanova = {
  track: vi.fn(),
  trackClick: vi.fn(),
  trackPageView: vi.fn(),
  trackImpression: vi.fn(),
  trackSubmit: vi.fn(),
  trackChange: mockTrackChange,
  identify: vi.fn(),
  reset: vi.fn(),
};

describe('TrackChange', () => {
  beforeEach(() => {
    mockTrackChange.mockClear();
  });

  it('should track change event when input value changes', () => {
    const { getByTestId } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackChange eventName="Input Changed" properties={{ fieldName: 'email' }}>
          <input data-testid="test-input" type="text" />
        </TrackChange>
      </DatanovaProvider>
    );

    const input = getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    expect(mockTrackChange).toHaveBeenCalledWith('Input Changed', {
      fieldName: 'email',
      value: 'test@example.com',
    });
  });

  it('should track change event when select value changes', () => {
    const { getByTestId } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackChange eventName="Filter Changed" properties={{ filterType: 'date' }}>
          <select data-testid="test-select">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
        </TrackChange>
      </DatanovaProvider>
    );

    const select = getByTestId('test-select');
    fireEvent.change(select, { target: { value: '30d' } });

    expect(mockTrackChange).toHaveBeenCalledWith('Filter Changed', {
      filterType: 'date',
      value: '30d',
    });
  });

  it('should preserve original onChange handler', () => {
    const originalOnChange = vi.fn();

    const { getByTestId } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackChange eventName="Input Changed">
          <input data-testid="test-input" onChange={originalOnChange} />
        </TrackChange>
      </DatanovaProvider>
    );

    const input = getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'new value' } });

    expect(mockTrackChange).toHaveBeenCalledWith('Input Changed', {
      value: 'new value',
    });
    expect(originalOnChange).toHaveBeenCalled();
  });

  it('should work without additional properties', () => {
    const { getByTestId } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackChange eventName="Simple Change">
          <input data-testid="test-input" type="text" />
        </TrackChange>
      </DatanovaProvider>
    );

    const input = getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockTrackChange).toHaveBeenCalledWith('Simple Change', {
      value: 'test',
    });
  });

  it('should throw error when children is not a valid React element', () => {
    expect(() => {
      render(
        <DatanovaProvider value={mockDatanova as unknown as Datanova}>
          {/* @ts-expect-error Testing invalid children */}
          <TrackChange eventName="Invalid">Not a valid element</TrackChange>
        </DatanovaProvider>
      );
    }).toThrow('TrackChange must be used with a valid React element');
  });

  it('should handle element without onChange handler', () => {
    const { getByTestId } = render(
      <DatanovaProvider value={mockDatanova as unknown as Datanova}>
        <TrackChange eventName="Input Changed">
          <input data-testid="test-input" type="text" />
        </TrackChange>
      </DatanovaProvider>
    );

    const input = getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockTrackChange).toHaveBeenCalledWith('Input Changed', {
      value: 'test',
    });
  });
});
