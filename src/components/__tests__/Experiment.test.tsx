import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { Experiment } from '../Experiment';

// Mock the useVariant hook
const mockUseVariant = vi.fn();
vi.mock('../../hooks/useVariant', () => ({
  useVariant: (props: { experimentId: number }) => mockUseVariant(props),
}));

describe('Experiment', () => {
  beforeEach(() => {
    mockUseVariant.mockClear();
  });

  it('should render control content when variant is control', () => {
    mockUseVariant.mockReturnValue({
      data: 'control',
      isLoading: false,
      error: null,
    });

    const { getByText } = render(
      <Experiment
        experimentId={123}
        control={<div>Control Content</div>}
        variant={<div>Variant Content</div>}
      />
    );

    expect(getByText('Control Content')).toBeInTheDocument();
    expect(mockUseVariant).toHaveBeenCalledWith({ experimentId: 123 });
  });

  it('should render variant content when variant is variant', () => {
    mockUseVariant.mockReturnValue({
      data: 'variant',
      isLoading: false,
      error: null,
    });

    const { getByText } = render(
      <Experiment
        experimentId={123}
        control={<div>Control Content</div>}
        variant={<div>Variant Content</div>}
      />
    );

    expect(getByText('Variant Content')).toBeInTheDocument();
  });

  it('should render loading content when loading', () => {
    mockUseVariant.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { getByText } = render(
      <Experiment
        experimentId={123}
        control={<div>Control Content</div>}
        variant={<div>Variant Content</div>}
        loading={<div>Loading...</div>}
      />
    );

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should render nothing when loading and no loading content provided', () => {
    mockUseVariant.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    const { container } = render(
      <Experiment
        experimentId={123}
        control={<div>Control Content</div>}
        variant={<div>Variant Content</div>}
      />
    );

    expect(container.textContent).toBe('');
  });

  it('should render error content when error occurs', () => {
    mockUseVariant.mockReturnValue({
      data: 'control',
      isLoading: false,
      error: new Error('Failed to load experiment'),
    });

    const { getByText } = render(
      <Experiment
        experimentId={123}
        control={<div>Control Content</div>}
        variant={<div>Variant Content</div>}
        error={<div>Error occurred</div>}
      />
    );

    expect(getByText('Error occurred')).toBeInTheDocument();
  });

  it('should render control content when error occurs and no error content provided', () => {
    mockUseVariant.mockReturnValue({
      data: 'control',
      isLoading: false,
      error: new Error('Failed to load experiment'),
    });

    const { getByText } = render(
      <Experiment
        experimentId={123}
        control={<div>Control Content</div>}
        variant={<div>Variant Content</div>}
      />
    );

    expect(getByText('Control Content')).toBeInTheDocument();
  });

  it('should accept complex React nodes as content', () => {
    mockUseVariant.mockReturnValue({
      data: 'variant',
      isLoading: false,
      error: null,
    });

    const ControlComponent = () => (
      <div>
        <h1>Control Title</h1>
        <p>Control description</p>
      </div>
    );

    const VariantComponent = () => (
      <div>
        <h1>Variant Title</h1>
        <p>Variant description</p>
      </div>
    );

    const { getByText } = render(
      <Experiment
        experimentId={123}
        control={<ControlComponent />}
        variant={<VariantComponent />}
      />
    );

    expect(getByText('Variant Title')).toBeInTheDocument();
    expect(getByText('Variant description')).toBeInTheDocument();
  });
});
