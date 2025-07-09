'use client';

import { MouseEvent, ReactElement, cloneElement, isValidElement } from 'react';
import { useDatanova } from '../hooks/useDatanova';

/**
 * Props for the TrackClick component
 */
export interface TrackClickProps {
  children: ReactElement<{ onClick?: (event: MouseEvent) => void }>;
  /** Event name to track when the element is clicked */
  eventName: string;
  /** Optional properties to include with the event */
  properties?: Record<string, unknown>;
}

/**
 * Component that tracks click events on its child element.
 * Wraps a single React element and tracks when it's clicked, preserving any existing onClick handler.
 *
 * @example
 * ```jsx
 * import { TrackClick } from '@datanova/react';
 *
 * function CTAButton() {
 *   return (
 *     <TrackClick eventName="CTA Clicked" properties={{ location: 'header' }}>
 *       <button onClick={() => console.log('Original handler')}>
 *         Get Started
 *       </button>
 *     </TrackClick>
 *   );
 * }
 * ```
 *
 * @throws {Error} If children is not a valid React element
 */
export function TrackClick({ children, eventName, properties }: TrackClickProps) {
  const { trackClick } = useDatanova();

  if (!isValidElement(children)) {
    throw new Error('TrackClick must be used with a valid React element');
  }

  const originalOnClick = children.props.onClick;

  const handleClick = (event: MouseEvent) => {
    trackClick(eventName, properties);
    if (originalOnClick) {
      originalOnClick(event);
    }
  };

  return cloneElement(children, { onClick: handleClick });
}
