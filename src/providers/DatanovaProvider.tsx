'use client';

import { ReactNode, createContext } from 'react';
import { Datanova } from '@datanova/browser';

/**
 * Props for the DatanovaProvider component
 */
interface DatanovaProviderProps {
  value: Datanova;
  children: ReactNode;
}

export type DatanovaContextValue = Datanova;

export const DatanovaContext = createContext<DatanovaContextValue | null>(null);

/**
 * Provider component that provides Datanova tracking methods to child components.
 * Must be placed at the root of your component tree.
 *
 * @remarks
 * The DatanovaProvider uses React Context to make the Datanova instance available
 * throughout your application. Initialize the Datanova instance outside of your
 * component tree to prevent re-initialization on re-renders.
 *
 * @example
 * Basic usage with SDK key:
 * ```jsx
 * import { createReactDatanova, DatanovaProvider } from '@datanova/react';
 *
 * // Simple initialization with SDK key
 * const datanova = createReactDatanova("your-sdk-key");
 *
 * function App() {
 *   return (
 *     <DatanovaProvider value={datanova}>
 *       <YourApp />
 *     </DatanovaProvider>
 *   );
 * }
 * ```
 *
 * @example
 * Advanced usage with custom services:
 * ```jsx
 * import { createReactDatanova, DatanovaProvider } from '@datanova/react';
 * import { DatanovaEventsService, DatanovaExperimentsService } from '@datanova/browser';
 *
 * // Custom configuration with specific services
 * const datanova = createReactDatanova({
 *   eventsService: new YourEventsService(),
 *   experimentsService: new YourExperimentsService()
 * });
 *
 * function App() {
 *   return (
 *     <DatanovaProvider value={datanova}>
 *       <YourApp />
 *     </DatanovaProvider>
 *   );
 * }
 * ```
 *
 * @example
 * Development usage with ConsoleEventsService:
 * ```jsx
 * import { createReactDatanova, DatanovaProvider } from '@datanova/react';
 * import { ConsoleEventsService } from '@datanova/browser';
 *
 * // Use ConsoleEventsService for development/debugging
 * const datanova = createReactDatanova({
 *   eventsService: new ConsoleEventsService()
 * });
 *
 * function App() {
 *   return (
 *     <DatanovaProvider value={datanova}>
 *       <YourApp />
 *     </DatanovaProvider>
 *   );
 * }
 * ```
 *
 * @param props - The provider props
 * @param props.value - The Datanova instance to provide to child components
 * @param props.children - The child components that will have access to the Datanova instance
 */
export function DatanovaProvider({ value, children }: DatanovaProviderProps) {
  return <DatanovaContext.Provider value={value}>{children}</DatanovaContext.Provider>;
}
