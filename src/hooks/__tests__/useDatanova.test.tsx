import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useDatanova } from '../useDatanova';
import { DatanovaProvider } from '../../providers/DatanovaProvider';
import { ReactNode } from 'react';
import { Datanova } from '@datanova/browser';

const mockDatanova = {
  track: vi.fn(),
  trackClick: vi.fn(),
  trackPageView: vi.fn(),
  trackImpression: vi.fn(),
  trackSubmit: vi.fn(),
  trackChange: vi.fn(),
  identify: vi.fn(),
  reset: vi.fn(),
};

describe('useDatanova', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <DatanovaProvider value={mockDatanova as unknown as Datanova}>{children}</DatanovaProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return datanova methods when used within provider', () => {
    const { result } = renderHook(() => useDatanova(), { wrapper });

    expect(result.current).toHaveProperty('trackClick');
    expect(result.current).toHaveProperty('trackPageView');
    expect(result.current).toHaveProperty('trackImpression');
    expect(result.current).toHaveProperty('trackSubmit');
    expect(result.current).toHaveProperty('trackChange');
    expect(result.current).toHaveProperty('identify');
    expect(result.current).toHaveProperty('reset');
  });

  it('should throw error when used outside of DatanovaProvider', () => {
    expect(() => {
      renderHook(() => useDatanova());
    }).toThrow('useDatanova must be used within a DatanovaProvider');
  });

  it('should call identify with userId only', () => {
    const { result } = renderHook(() => useDatanova(), { wrapper });

    result.current.identify('user123');

    expect(mockDatanova.identify).toHaveBeenCalledWith('user123');
  });

  it('should call identify with userId and userProperties', () => {
    const { result } = renderHook(() => useDatanova(), { wrapper });

    result.current.identify('user123', {
      plan: 'premium',
    });

    expect(mockDatanova.identify).toHaveBeenCalledWith('user123', {
      plan: 'premium',
    });
  });
});
