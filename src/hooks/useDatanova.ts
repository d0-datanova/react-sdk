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
 *   const { trackClick, identify, reset } = useDatanova();
 *
 *   const handleClick = () => {
 *     trackClick('Button Clicked', { buttonId: 'submit' });
 *   };
 *
 *   const handleLogin = (userId, plan) => {
 *     // Simple identify with just userId
 *     identify(userId);
 *
 *     // Or with user properties (v1.7.0+)
 *     identify(userId, { plan });
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
    trackClick: context.trackClick,
    trackPageView: context.trackPageView,
    trackImpression: context.trackImpression,
    trackSubmit: context.trackSubmit,
    trackChange: context.trackChange,
    identify: context.identify,
    reset: context.reset,
  };
}
