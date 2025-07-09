'use client';

import { ReactElement, cloneElement, isValidElement } from 'react';
import { useDatanova } from '../hooks/useDatanova';

/**
 * Props for the TrackChange component
 */
export interface TrackChangeProps {
  children: ReactElement<{ onChange?: (value: unknown) => void }>;
  /** Event name to track when the element value changes */
  eventName: string;
  /** Optional properties to include with the event */
  properties?: Record<string, unknown>;
}

/**
 * Component that tracks change events on form elements.
 * Wraps a form element (select, input, etc.) and tracks when its value changes,
 * preserving any existing onChange handler.
 *
 * @example
 * ```jsx
 * import { TrackChange } from '@datanova/react';
 *
 * function FilterForm() {
 *   return (
 *     <TrackChange eventName="Date Filter Changed" properties={{ filter: 'date' }}>
 *       <select onChange={(e) => console.log('Selected:', e.target.value)}>
 *         <option value="7d">Last 7 days</option>
 *         <option value="30d">Last 30 days</option>
 *       </select>
 *     </TrackChange>
 *   );
 * }
 * ```
 *
 * @throws {Error} If children is not a valid React element
 */
export function TrackChange({ children, eventName, properties }: TrackChangeProps) {
  const { trackChange } = useDatanova();

  if (!isValidElement(children)) {
    throw new Error('TrackChange must be used with a valid React element');
  }

  const originalOnChange = children.props.onChange;

  const handleChange = (value: unknown) => {
    trackChange(eventName, {
      ...properties,
      value,
    });
    originalOnChange?.(value);
  };

  return cloneElement(children, { onChange: handleChange });
}
