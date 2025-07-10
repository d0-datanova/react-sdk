import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { DatanovaProvider, DatanovaContext } from '../DatanovaProvider';
import { useContext } from 'react';
import { Datanova } from '@datanova/browser';

describe('DatanovaProvider', () => {
  it('should provide Datanova instance to children', () => {
    const mockDatanova = {
      track: () => {},
      trackClick: () => {},
      trackPageView: () => {},
    } as unknown as Datanova;

    const TestComponent = () => {
      const datanova = useContext(DatanovaContext);
      return <div>{datanova ? 'Has datanova' : 'No datanova'}</div>;
    };

    const { getByText } = render(
      <DatanovaProvider value={mockDatanova}>
        <TestComponent />
      </DatanovaProvider>
    );

    expect(getByText('Has datanova')).toBeInTheDocument();
  });

  it('should render children', () => {
    const mockDatanova = {} as Datanova;

    const { getByText } = render(
      <DatanovaProvider value={mockDatanova}>
        <div>Child Content</div>
      </DatanovaProvider>
    );

    expect(getByText('Child Content')).toBeInTheDocument();
  });

  it('should provide null when no provider is used', () => {
    const TestComponent = () => {
      const datanova = useContext(DatanovaContext);
      return <div>{datanova === null ? 'No context' : 'Has context'}</div>;
    };

    const { getByText } = render(<TestComponent />);

    expect(getByText('No context')).toBeInTheDocument();
  });

  it('should accept any Datanova instance', () => {
    const customDatanova = {
      track: () => {},
      trackClick: () => {},
      trackPageView: () => {},
      trackImpression: () => {},
      trackSubmit: () => {},
      trackChange: () => {},
      identify: () => {},
      reset: () => {},
      getVariant: () => Promise.resolve('control'),
    } as unknown as Datanova;

    const TestComponent = () => {
      const datanova = useContext(DatanovaContext);
      return <div>{datanova && 'getVariant' in datanova ? 'Has getVariant' : 'No getVariant'}</div>;
    };

    const { getByText } = render(
      <DatanovaProvider value={customDatanova}>
        <TestComponent />
      </DatanovaProvider>
    );

    expect(getByText('Has getVariant')).toBeInTheDocument();
  });

  it('should support nested components', () => {
    const mockDatanova = {} as Datanova;

    const DeepChild = () => {
      const datanova = useContext(DatanovaContext);
      return <div>{datanova ? 'Has context in deep child' : 'No context'}</div>;
    };

    const MiddleComponent = () => <DeepChild />;

    const { getByText } = render(
      <DatanovaProvider value={mockDatanova}>
        <MiddleComponent />
      </DatanovaProvider>
    );

    expect(getByText('Has context in deep child')).toBeInTheDocument();
  });

  it('should pass through identify method with userProperties support', () => {
    const mockIdentify = vi.fn();
    const mockDatanova = {
      identify: mockIdentify,
    } as unknown as Datanova;

    const TestComponent = () => {
      const datanova = useContext(DatanovaContext);

      const handleIdentify = () => {
        // Test both signatures
        datanova?.identify('user123');
        datanova?.identify('user456', { email: 'test@example.com', plan: 'pro' });
      };

      return <button onClick={handleIdentify}>Identify</button>;
    };

    const { getByText } = render(
      <DatanovaProvider value={mockDatanova}>
        <TestComponent />
      </DatanovaProvider>
    );

    getByText('Identify').click();

    expect(mockIdentify).toHaveBeenCalledTimes(2);
    expect(mockIdentify).toHaveBeenNthCalledWith(1, 'user123');
    expect(mockIdentify).toHaveBeenNthCalledWith(2, 'user456', {
      email: 'test@example.com',
      plan: 'pro',
    });
  });
});
