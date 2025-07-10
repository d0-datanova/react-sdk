import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useVariant } from '../useVariant';
import { DatanovaProvider } from '../../providers/DatanovaProvider';
import { ReactNode } from 'react';
import { Datanova } from '@datanova/browser';

describe('useVariant', () => {
  const mockGetVariant = vi.fn();
  const mockDatanova = {
    track: vi.fn(),
    trackClick: vi.fn(),
    trackPageView: vi.fn(),
    trackImpression: vi.fn(),
    trackSubmit: vi.fn(),
    trackChange: vi.fn(),
    identify: vi.fn(),
    reset: vi.fn(),
    getVariant: mockGetVariant,
  };

  const wrapper = ({ children }: { children: ReactNode }) => (
    <DatanovaProvider value={mockDatanova as unknown as Datanova}>{children}</DatanovaProvider>
  );

  beforeEach(() => {
    mockGetVariant.mockClear();
  });

  it('should return loading state initially', () => {
    const { result } = renderHook(() => useVariant({ experimentId: 123 }), { wrapper });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  it('should fetch and return variant data', async () => {
    mockGetVariant.mockResolvedValue('variant');

    const { result } = renderHook(() => useVariant({ experimentId: 123 }), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBe('variant');
    expect(result.current.error).toBeNull();
    expect(mockGetVariant).toHaveBeenCalledWith(123);
  });

  it('should return control variant on error', async () => {
    mockGetVariant.mockRejectedValue(new Error('Failed to fetch'));

    const { result } = renderHook(() => useVariant({ experimentId: 123 }), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toBe('control');
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Failed to fetch');
  });

  it('should return error when used outside DatanovaProvider', () => {
    const { result } = renderHook(() => useVariant({ experimentId: 123 }));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe('control');
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('useVariant must be used within a DatanovaProvider');
  });
});
