# @datanova/react

Official React SDK for event tracking and A/B testing with Datanova. This SDK provides React-specific components and hooks that make it easy to integrate Datanova analytics into your React applications.

## Features

- 🎯 **Event Tracking Components** - Pre-built components for common tracking scenarios
- 🪝 **React Hooks** - Custom hooks for experiments and tracking
- 📦 **Tree-shakeable** - Import only what you need
- 🎨 **TypeScript Support** - Full TypeScript support with type definitions
- ⚡ **SSR Compatible** - Works with Next.js and other SSR frameworks

## Installation

```bash
npm install @datanova/react
# or
yarn add @datanova/react
# or
pnpm add @datanova/react
```

## Quick Start

### 1. Initialize the Client

```jsx
import { createReactDatanova, DatanovaProvider } from '@datanova/react';

// Create client instance
const datanova = createReactDatanova('YOUR_SDK_KEY');

// Wrap your app with the provider
function App() {
  return (
    <DatanovaProvider value={datanova}>
      <YourApp />
    </DatanovaProvider>
  );
}
```

### 2. Track Events with Components

```jsx
import { TrackClick, TrackPageView, TrackImpression } from '@datanova/react';

function HomePage() {
  return (
    <TrackPageView name="home_page">
      <TrackImpression name="hero_banner" data={{ variant: 'A' }}>
        <div>Your banner content</div>
      </TrackImpression>

      <TrackClick name="cta_button" data={{ location: 'hero' }}>
        <button>Click Me!</button>
      </TrackClick>
    </TrackPageView>
  );
}
```

### 3. Run A/B Tests

```jsx
import { useVariant } from '@datanova/react';

function Feature() {
  const { data, isLoading } = useVariant({ experimentId: 123 });

  if (isLoading) return <div>Loading...</div>;

  return <div>{data === 'variant' ? <NewFeature /> : <OldFeature />}</div>;
}
```

## API Reference

### Components

#### `<TrackPageView />`

Tracks page views automatically when the component mounts.

```jsx
<TrackPageView name="product_page" data={{ productId: '123', category: 'electronics' }} />
```

#### `<TrackClick />`

Tracks clicks on child elements.

```jsx
<TrackClick name="add_to_cart" data={{ productId: '123' }}>
  <button>Add to Cart</button>
</TrackClick>
```

#### `<TrackImpression />`

Tracks when elements become visible using Intersection Observer.

```jsx
<TrackImpression name="product_card" data={{ productId: '123' }} threshold={0.5}>
  <ProductCard />
</TrackImpression>
```

#### `<TrackSubmit />`

Tracks form submissions.

```jsx
<TrackSubmit name="contact_form">
  <form>
    <input type="email" name="email" />
    <button type="submit">Submit</button>
  </form>
</TrackSubmit>
```

#### `<TrackChange />`

Tracks changes to form inputs.

```jsx
<TrackChange name="search_input">
  <input type="search" placeholder="Search..." />
</TrackChange>
```

#### `<Experiment />`

Renders different content based on A/B test variants.

```jsx
import { Experiment } from '@datanova/react';

// Basic usage
<Experiment
  experimentId={123}
  control={<OldVersion />}
  variant={<NewVersion />}
/>

// With loading and error states
<Experiment
  experimentId={123}
  control={<OldCheckout />}
  variant={<NewCheckout />}
  loading={<CheckoutSkeleton />}
  error={<OldCheckout />} // Fallback to control on error
/>
```

### Hooks

#### `useVariant({ experimentId })`

Hook to get and track A/B test variants.

```jsx
const { data, isLoading, error } = useVariant({ experimentId: 123 });
```

#### `useDatanova()`

Hook to access the Datanova client instance.

```jsx
const datanova = useDatanova();

// Track custom events
datanova.track('custom_event', { foo: 'bar' });
```

## Advanced Usage

### Custom Event Service

```jsx
import { createReactDatanova } from '@datanova/react';
import { ConsoleEventsService } from '@datanova/browser';

// Use console logging for development
const datanova = createReactDatanova({
  eventsService: new ConsoleEventsService(),
});
```

### SSR with Next.js

```jsx
// _app.tsx
import { createReactDatanova, DatanovaProvider } from '@datanova/react';

// Initialize outside of component to prevent re-initialization
const datanova = createReactDatanova(process.env.NEXT_PUBLIC_DATANOVA_KEY!);

function MyApp({ Component, pageProps }) {
  return (
    <DatanovaProvider value={datanova}>
      <Component {...pageProps} />
    </DatanovaProvider>
  );
}

export default MyApp;
```

## License

MIT © [Datanova](https://github.com/d0-datanova)
