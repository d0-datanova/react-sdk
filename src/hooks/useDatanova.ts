'use client';

import { useContext } from 'react';
import { DatanovaContext } from '../providers/DatanovaProvider';

/**
 * Hook to access Datanova analytics tracking methods.
 * Must be used within a DatanovaProvider component.
 *
 * @returns Object containing track, trackClick, trackPageView, trackImpression, trackSubmit, trackChange, identify, and reset methods
 *
 * @example
 * ```jsx
 * import { useDatanova } from '@datanova/react';
 *
 * function MyComponent() {
 *   const { track, identify, reset } = useDatanova();
 *
 *   const handleClick = () => {
 *     track('Button Clicked', EventType.CLICK, { buttonId: 'submit' });
 *   };
 *
 *   const handleLogin = (userId) => {
 *     identify(userId);
 *   };
 *
 *   const handleLogout = () => {
 *     reset();
 *   };
 *
 *   return <button onClick={handleClick}>Track Event</button>;
 * }
 * ```
 *
 * @throws {Error} If used outside of a DatanovaProvider
 */
export function useDatanova() {
  const context = useContext(DatanovaContext);

  if (!context) {
    throw new Error('useDatanova must be used within a DatanovaProvider');
  }

  return {
    track: context.track,
    trackClick: context.trackClick,
    trackPageView: context.trackPageView,
    trackImpression: context.trackImpression,
    trackSubmit: context.trackSubmit,
    trackChange: context.trackChange,
    identify: context.identify,
    reset: context.reset,
  };
}
