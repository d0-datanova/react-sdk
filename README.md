# @datanova/react

Official React SDK for event tracking and A/B testing with Datanova. This SDK provides React-specific components and hooks that make it easy to integrate Datanova analytics into your React applications.

## Features

- 🎯 **Event Tracking Components** - Pre-built components for common tracking scenarios
- 🪝 **React Hooks** - Custom hooks for experiments and tracking
- 🔄 **Automatic Re-rendering** - Components automatically re-render when experiments change
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
import { createDatanova, DatanovaProvider } from '@datanova/react';

// Create client instance
const datanova = createDatanova('YOUR_SDK_KEY');

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
    <>
      <TrackPageView name="home_page" />
      
      <TrackImpression name="hero_banner" data={{ variant: 'A' }}>
        <div>Your banner content</div>
      </TrackImpression>
      
      <TrackClick name="cta_button" data={{ location: 'hero' }}>
        <button>Click Me!</button>
      </TrackClick>
    </>
  );
}
```

### 3. Run A/B Tests

```jsx
import { useExperiment } from '@datanova/react';

function Feature() {
  const { variant, isLoading } = useExperiment(123);
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {variant === 'variant' ? (
        <NewFeature />
      ) : (
        <OldFeature />
      )}
    </div>
  );
}
```

## API Reference

### Components

#### `<TrackPageView />`
Tracks page views automatically when the component mounts.

```jsx
<TrackPageView 
  name="product_page" 
  data={{ productId: '123', category: 'electronics' }} 
/>
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
<TrackImpression 
  name="product_card" 
  data={{ productId: '123' }}
  threshold={0.5}
>
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
<Experiment experimentId={123}>
  <Experiment.Control>
    <OldVersion />
  </Experiment.Control>
  <Experiment.Variant>
    <NewVersion />
  </Experiment.Variant>
</Experiment>
```

### Hooks

#### `useExperiment(experimentId)`
Hook to get and track A/B test variants.

```jsx
const { variant, isLoading, error } = useExperiment(123);
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
import { createDatanova, ConsoleEventsService } from '@datanova/react';

// Use console logging for development
const datanova = createDatanova({
  eventsService: new ConsoleEventsService(),
  experimentsService: new RandomExperimentsService()
});
```

### SSR with Next.js

```jsx
// _app.tsx
import { createDatanova, DatanovaProvider } from '@datanova/react';

// Initialize outside of component to prevent re-initialization
const datanova = createDatanova(process.env.NEXT_PUBLIC_DATANOVA_KEY!);

function MyApp({ Component, pageProps }) {
  return (
    <DatanovaProvider value={datanova}>
      <Component {...pageProps} />
    </DatanovaProvider>
  );
}

export default MyApp;
```

### TypeScript

All components and hooks are fully typed. Import types as needed:

```typescript
import type { 
  TrackClickProps, 
  TrackPageViewProps,
  ExperimentState 
} from '@datanova/react';
```

## Browser Support

- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions  
- Safari: Last 2 versions
- IE: Not supported

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT © [Datanova](https://github.com/d0-datanova)