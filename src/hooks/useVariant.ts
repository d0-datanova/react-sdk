'use client';

import { useContext, useEffect, useState } from 'react';
import { Variant } from '@datanova/browser';
import { DatanovaContext } from '../providers/DatanovaProvider';

type ExperimentState =
  | { isLoading: true; data: undefined; error: null }
  | { isLoading: false; data: Variant; error: null }
  | { isLoading: false; data: 'control'; error: Error };

/**
 * Hook to get and track A/B test experiment variants.
 * Automatically tracks experiment exposure and manages loading/error states.
 *
 * SSR-safe: During server-side rendering, this hook returns null
 * to avoid hydration mismatches. The actual variant is fetched client-side.
 *
 * @param experimentId - The numeric ID of the experiment
 * @returns Object containing variant, loading state, and error
 *
 * @example
 * ```jsx
 * import { useVariant } from '@datanova/react';
 *
 * function MyComponent() {
 *   const { loading, data, error } = useVariant({ experimentId: 20 });
 *
 *   if (loading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       {data === 'variant' ? (
 *         <NewFeature />
 *       ) : (
 *         <OldFeature />
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useVariant({ experimentId }: { experimentId: number }): ExperimentState {
  const client = useContext(DatanovaContext);
  const [state, setState] = useState<ExperimentState>({
    isLoading: true,
    data: undefined,
    error: null,
  });

  useEffect(() => {
    if (!client) {
      setState({
        isLoading: false,
        data: 'control',
        error: new Error('useVariant must be used within a DatanovaProvider'),
      });
      return;
    }

    let cancelled = false;

    async function fetchVariant() {
      try {
        setState({ isLoading: true, data: undefined, error: null });
        const variant = await client!.getVariant(experimentId);

        if (!cancelled) {
          setState({
            isLoading: false,
            data: variant,
            error: null,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            isLoading: false,
            data: 'control',
            error: err instanceof Error ? err : new Error('Failed to load experiment'),
          });
        }
      }
    }

    if (typeof window !== 'undefined') {
      fetchVariant();
    } else {
      setState({ isLoading: false, data: 'control', error: null });
    }

    return () => {
      cancelled = true;
    };
  }, [experimentId, client]);

  return state;
}
