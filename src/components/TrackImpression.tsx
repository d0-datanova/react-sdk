'use client';

import { ReactNode } from 'react';
import { InView } from 'react-intersection-observer';
import { useDatanova } from '../hooks/useDatanova';

/**
 * Props for the TrackImpression component
 */
export interface TrackImpressionProps {
  children: ReactNode;
  /** Event name to track when the element comes into view */
  eventName: string;
  /** Optional properties to include with the event */
  properties?: Record<string, unknown>;
  /** Percentage of element that must be visible to trigger (0-1). Default: 0.5 (50%) */
  threshold?: number;
  /** Whether to track only the first impression. Default: true */
  triggerOnce?: boolean;
}

/**
 * Component that tracks when its children come into the viewport using Intersection Observer.
 * Useful for tracking impressions of content blocks, images, or any visual elements.
 *
 * @example
 * ```jsx
 * import { TrackImpression } from '@datanova/react';
 *
 * function HeroSection() {
 *   return (
 *     <TrackImpression eventName="Hero Section Viewed">
 *       <section className="hero">
 *         <h1>Welcome to Our Product</h1>
 *         <p>Start your journey today</p>
 *       </section>
 *     </TrackImpression>
 *   );
 * }
 * ```
 *
 * @example
 * ```jsx
 * // Track when 80% of element is visible, multiple times
 * <TrackImpression
 *   eventName="Product Card Viewed"
 *   properties={{ productId: '123' }}
 *   threshold={0.8}
 *   triggerOnce={false}
 * >
 *   <ProductCard />
 * </TrackImpression>
 * ```
 *
 * @example
 * ```jsx
 * // Track lazy-loaded content
 * <TrackImpression
 *   eventName="Comments Section Viewed"
 *   threshold={0.1} // Track when just 10% is visible
 * >
 *   <LazyComments />
 * </TrackImpression>
 * ```
 */
export function TrackImpression({
  children,
  eventName,
  properties,
  threshold = 0.5,
  triggerOnce = true,
}: TrackImpressionProps) {
  const { trackImpression } = useDatanova();

  return (
    <InView
      onChange={(inView) => {
        if (inView) {
          trackImpression(eventName, properties);
        }
      }}
      threshold={threshold}
      triggerOnce={triggerOnce}
    >
      {children}
    </InView>
  );
}
