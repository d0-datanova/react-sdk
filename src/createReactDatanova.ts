import {
  Datanova,
  DatanovaEventsService,
  DatanovaExperimentsService,
  EventsService,
  ExperimentsService,
} from '@datanova/browser';
import { name, version } from '../package.json';

// Overload signatures
export function createReactDatanova(apiKey: string): Datanova;
export function createReactDatanova(config: {
  eventsService?: EventsService;
  experimentsService?: ExperimentsService;
}): Datanova;

/**
 * Create and initialize a Datanova client for React applications
 * @param keyOrServices - Either an SDK key string or configuration object
 * @returns Initialized Datanova instance
 * @example
 * ```javascript
 * import { createReactDatanova } from '@datanova/react';
 *
 * // Simple usage with API key
 * const client = createReactDatanova("YOUR_SDK_KEY");
 *
 * // Advanced usage with custom services
 * const client = createReactDatanova({
 *   eventsService: new DatanovaEventsService("YOUR_SDK_KEY"),
 *   experimentsService: new DatanovaExperimentsService("YOUR_SDK_KEY")
 * });
 * ```
 */
export function createReactDatanova(
  keyOrServices:
    | string
    | {
        eventsService?: EventsService;
        experimentsService?: ExperimentsService;
      }
): Datanova {
  const datanova = new Datanova();

  if (typeof keyOrServices === 'string') {
    datanova.init({
      eventsService: new DatanovaEventsService(keyOrServices),
      experimentsService: new DatanovaExperimentsService(keyOrServices),
      context: {
        library: {
          name,
          version,
        },
      },
    });
  } else {
    datanova.init({
      eventsService: keyOrServices.eventsService,
      experimentsService: keyOrServices.experimentsService,
      context: {
        library: {
          name,
          version,
        },
      },
    });
  }

  return datanova;
}
