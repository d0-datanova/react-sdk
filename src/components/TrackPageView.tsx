'use client';

import { useEffect } from 'react';
import { useDatanova } from '../hooks/useDatanova';

/**
 * Props for the TrackPageView component
 */
export interface TrackPageViewProps {
  /** Event name to track when the component mounts */
  eventName: string;
  /** Optional properties to include with the event */
  properties?: Record<string, unknown>;
}

/**
 * Component that tracks a page view event when it mounts.
 * The browser SDK automatically captures page metadata like URL, title, and referrer.
 *
 * @example
 * ```jsx
 * import { TrackPageView } from '@datanova/react';
 *
 * function HomePage() {
 *   return (
 *     <>
 *       <TrackPageView eventName="Home Page Viewed" />
 *       <h1>Welcome to our site</h1>
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * ```jsx
 * // With additional properties
 * function ProductPage({ productId }) {
 *   return (
 *     <>
 *       <TrackPageView
 *         eventName="Product Page Viewed"
 *         properties={{ productId, category: 'electronics' }}
 *       />
 *       <ProductDetails />
 *     </>
 *   );
 * }
 * ```
 */
export function TrackPageView({ eventName, properties }: TrackPageViewProps) {
  const { trackPageView } = useDatanova();

  useEffect(() => {
    trackPageView(eventName, properties);
  }, [eventName, properties, trackPageView]);

  return null;
}
