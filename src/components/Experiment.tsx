'use client';

import { ReactNode } from 'react';
import { useExperiment } from '../hooks/useExperiment';

interface ExperimentProps {
  /** The numeric ID of the experiment */
  experimentId: number;
  /** Content to show for the control variant */
  control: ReactNode;
  /** Content to show for the variant */
  variant: ReactNode;
  /** Optional content to show while loading */
  loading?: ReactNode;
  /** Optional content to show on error */
  error?: ReactNode;
}

/**
 * Component for declarative A/B testing.
 * Automatically handles experiment assignment and tracks exposure.
 *
 * @example
 * ```jsx
 * import { Experiment } from '@datanova/react';
 *
 * function HomePage() {
 *   return (
 *     <Experiment
 *       experimentId={20}
 *       control={<OldHero />}
 *       variant={<NewHero />}
 *     />
 *   );
 * }
 * ```
 *
 * @example With loading and error states
 * ```jsx
 * <Experiment
 *   experimentId={20}
 *   control={<OldCheckout />}
 *   variant={<NewCheckout />}
 *   loading={<CheckoutSkeleton />}
 *   error={<OldCheckout />} // Fallback to control on error
 * />
 * ```
 */
export function Experiment({
  experimentId,
  control,
  variant: variantContent,
  loading: loadingContent,
  error: errorContent,
}: ExperimentProps) {
  const { variant, isLoading, error } = useExperiment(experimentId);

  if (isLoading) {
    return <>{loadingContent ?? null}</>;
  }

  if (error) {
    return <>{errorContent ?? control}</>;
  }

  const content = variant === 'variant' ? variantContent : control;

  return <>{content}</>;
}
