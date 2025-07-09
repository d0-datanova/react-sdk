'use client';

import { FormEvent, ReactElement, cloneElement, isValidElement } from 'react';
import { useDatanova } from '../hooks/useDatanova';

/**
 * Props for the TrackSubmit component
 */
export interface TrackSubmitProps {
  children: ReactElement<{ onSubmit?: (event: FormEvent) => void }>;
  /** Event name to track when the form is submitted */
  eventName: string;
  /** Optional properties to include with the event */
  properties?: Record<string, unknown>;
}

/**
 * Component that tracks submit events on form elements.
 * Wraps a form element and tracks when it's submitted, preserving any existing onSubmit handler.
 *
 * @example
 * ```jsx
 * import { TrackSubmit } from '@datanova/react';
 *
 * function ContactForm() {
 *   return (
 *     <TrackSubmit eventName="Contact Form Submitted" properties={{ type: 'inquiry' }}>
 *       <form onSubmit={(e) => { e.preventDefault(); console.log('Form submitted'); }}>
 *         <input type="email" name="email" required />
 *         <button type="submit">Submit</button>
 *       </form>
 *     </TrackSubmit>
 *   );
 * }
 * ```
 *
 * @throws {Error} If children is not a valid React element
 */
export function TrackSubmit({ children, eventName, properties }: TrackSubmitProps) {
  const { trackSubmit } = useDatanova();

  if (!isValidElement(children)) {
    throw new Error('TrackSubmit must be used with a valid React element');
  }

  const originalOnSubmit = children.props.onSubmit;

  const handleSubmit = (event: FormEvent) => {
    trackSubmit(eventName, properties);
    originalOnSubmit?.(event);
  };

  return cloneElement(children, { onSubmit: handleSubmit });
}
