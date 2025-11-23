import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeviceCard } from './DeviceCard';

describe('DeviceCard Component', () => {
  const defaultProps = {
    id: 'iphone-1',
    name: 'iPhone 15',
    price: 999,
    image: 'https://example.com/iphone.jpg',
  };

  describe('Rendering', () => {
    it('renders device name and price', () => {
      render(<DeviceCard {...defaultProps} />);
      expect(screen.getByText('iPhone 15')).toBeInTheDocument();
      expect(screen.getByText('$999')).toBeInTheDocument();
    });

    it('renders device image with correct src and alt', () => {
      render(<DeviceCard {...defaultProps} />);
      const image = screen.getByAltText('iPhone 15');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'https://example.com/iphone.jpg');
      expect(image.tagName).toBe('IMG');
    });

    it('renders image container element', () => {
      const { container } = render(<DeviceCard {...defaultProps} />);
      const imageContainer = container.querySelector('[class*="imageContainer"]');
      expect(imageContainer).toBeInTheDocument();
    });

    it('renders content section with name and price', () => {
      const { container } = render(<DeviceCard {...defaultProps} />);
      const content = container.querySelector('[class*="content"]');
      expect(content).toBeInTheDocument();
      expect(content).toHaveTextContent('iPhone 15');
      expect(content).toHaveTextContent('$999');
    });
  });

  describe('Image Handling', () => {
    it('uses device name as default alt text', () => {
      render(<DeviceCard {...defaultProps} />);
      expect(screen.getByAltText('iPhone 15')).toBeInTheDocument();
    });

    it('uses custom image alt text', () => {
      render(<DeviceCard {...defaultProps} imageAlt="Custom alt text" />);
      expect(screen.getByAltText('Custom alt text')).toBeInTheDocument();
    });

    it('renders image from URL', () => {
      const imageUrl = 'https://example.com/custom-device.jpg';
      render(<DeviceCard {...defaultProps} image={imageUrl} />);
      const image = screen.getByAltText('iPhone 15') as HTMLImageElement;
      expect(image.src).toContain('custom-device.jpg');
    });

    it('handles image URLs with query parameters', () => {
      const imageUrl = 'https://example.com/device.jpg?w=300&h=400';
      render(<DeviceCard {...defaultProps} image={imageUrl} />);
      const image = screen.getByAltText('iPhone 15') as HTMLImageElement;
      expect(image.src).toContain('?w=300&h=400');
    });
  });

  describe('Price Formatting', () => {
    it('renders price with dollar sign for numeric price', () => {
      render(<DeviceCard {...defaultProps} price={999} />);
      expect(screen.getByText('$999')).toBeInTheDocument();
    });

    it('renders price with dollar sign for string price', () => {
      render(<DeviceCard {...defaultProps} price="1299" />);
      expect(screen.getByText('$1299')).toBeInTheDocument();
    });

    it('handles zero price', () => {
      render(<DeviceCard {...defaultProps} price={0} />);
      expect(screen.getByText('$0')).toBeInTheDocument();
    });

    it('handles large prices', () => {
      render(<DeviceCard {...defaultProps} price={9999} />);
      expect(screen.getByText('$9999')).toBeInTheDocument();
    });

    it('handles decimal prices', () => {
      render(<DeviceCard {...defaultProps} price={999.99} />);
      expect(screen.getByText('$999.99')).toBeInTheDocument();
    });
  });

  describe('CTA Button', () => {
    it('renders CTA button when onViewDetails is provided', () => {
      const handleViewDetails = vi.fn();
      render(<DeviceCard {...defaultProps} onViewDetails={handleViewDetails} />);
      expect(screen.getByText('View Details')).toBeInTheDocument();
    });

    it('does not render button when onViewDetails is not provided', () => {
      render(<DeviceCard {...defaultProps} />);
      expect(screen.queryByText('View Details')).not.toBeInTheDocument();
    });

    it('renders button with correct text', () => {
      const handleViewDetails = vi.fn();
      render(<DeviceCard {...defaultProps} onViewDetails={handleViewDetails} />);
      const button = screen.getByRole('button', { name: /view details/i });
      expect(button).toBeInTheDocument();
    });

    it('button has primary variant styling', () => {
      const handleViewDetails = vi.fn();
      const { container } = render(
        <DeviceCard {...defaultProps} onViewDetails={handleViewDetails} />
      );
      const button = screen.getByRole('button', { name: /view details/i });
      expect(button.className).toContain('primary');
    });
  });

  describe('User Interactions', () => {
    it('calls onViewDetails callback when button is clicked', async () => {
      const user = userEvent.setup();
      const handleViewDetails = vi.fn();
      render(<DeviceCard {...defaultProps} onViewDetails={handleViewDetails} />);

      const button = screen.getByRole('button', { name: /view details/i });
      await user.click(button);

      expect(handleViewDetails).toHaveBeenCalledTimes(1);
    });

    it('calls onViewDetails multiple times on multiple clicks', async () => {
      const user = userEvent.setup();
      const handleViewDetails = vi.fn();
      render(<DeviceCard {...defaultProps} onViewDetails={handleViewDetails} />);

      const button = screen.getByRole('button', { name: /view details/i });
      await user.click(button);
      await user.click(button);

      expect(handleViewDetails).toHaveBeenCalledTimes(2);
    });

    it('button is keyboard accessible with Enter', async () => {
      const user = userEvent.setup();
      const handleViewDetails = vi.fn();
      render(<DeviceCard {...defaultProps} onViewDetails={handleViewDetails} />);

      const button = screen.getByRole('button', { name: /view details/i });
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleViewDetails).toHaveBeenCalledTimes(1);
    });

    it('button is keyboard accessible with Space', async () => {
      const user = userEvent.setup();
      const handleViewDetails = vi.fn();
      render(<DeviceCard {...defaultProps} onViewDetails={handleViewDetails} />);

      const button = screen.getByRole('button', { name: /view details/i });
      button.focus();
      await user.keyboard(' ');

      expect(handleViewDetails).toHaveBeenCalledTimes(1);
    });

    it('button can be focused via Tab', async () => {
      const user = userEvent.setup();
      const handleViewDetails = vi.fn();
      render(
        <>
          <button>First button</button>
          <DeviceCard {...defaultProps} onViewDetails={handleViewDetails} />
        </>
      );

      const button = screen.getByRole('button', { name: /view details/i });
      await user.tab();
      await user.tab();
      expect(button).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('image has descriptive alt text', () => {
      render(<DeviceCard {...defaultProps} />);
      const image = screen.getByAltText('iPhone 15');
      expect(image).toHaveAttribute('alt', 'iPhone 15');
    });

    it('button is semantically correct', () => {
      const handleViewDetails = vi.fn();
      render(<DeviceCard {...defaultProps} onViewDetails={handleViewDetails} />);
      const button = screen.getByRole('button', { name: /view details/i });
      expect(button).toBeInTheDocument();
    });

    it('card structure supports screen reader navigation', () => {
      const { container } = render(<DeviceCard {...defaultProps} />);
      expect(container.querySelector('[class*="card"]')).toBeInTheDocument();
      expect(container.querySelector('img')).toBeInTheDocument();
      expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    });
  });

  describe('Props Variations', () => {
    it('renders with all props provided', () => {
      const handleViewDetails = vi.fn();
      render(
        <DeviceCard
          {...defaultProps}
          imageAlt="Custom iPhone description"
          onViewDetails={handleViewDetails}
        />
      );
      expect(screen.getByAltText('Custom iPhone description')).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders without optional callback', () => {
      const { container } = render(<DeviceCard {...defaultProps} />);
      expect(container.querySelector('[class*="card"]')).toBeInTheDocument();
      expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    });

    it('renders different devices with same component', () => {
      const { rerender } = render(<DeviceCard {...defaultProps} />);
      expect(screen.getByText('iPhone 15')).toBeInTheDocument();

      rerender(
        <DeviceCard
          id="iphone-2"
          name="iPhone 14"
          price={799}
          image="https://example.com/iphone14.jpg"
        />
      );
      expect(screen.getByText('iPhone 14')).toBeInTheDocument();
      expect(screen.getByText('$799')).toBeInTheDocument();
      expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles very long device names', () => {
      const longName = 'iPhone 15 Pro Max Ultra Plus Limited Edition Special';
      render(<DeviceCard {...defaultProps} name={longName} />);
      expect(screen.getByText(longName)).toBeInTheDocument();
    });

    it('handles empty alt text', () => {
      render(<DeviceCard {...defaultProps} imageAlt="" />);
      const image = screen.getByAltText('');
      expect(image).toBeInTheDocument();
    });

    it('maintains functionality with all variations combined', async () => {
      const user = userEvent.setup();
      const handleViewDetails = vi.fn();
      render(
        <DeviceCard
          id="test-device"
          name="Test Device"
          price="1999.99"
          image="https://example.com/device.jpg?w=300"
          imageAlt="A test device"
          onViewDetails={handleViewDetails}
        />
      );

      expect(screen.getByText('Test Device')).toBeInTheDocument();
      expect(screen.getByText('$1999.99')).toBeInTheDocument();
      expect(screen.getByAltText('A test device')).toBeInTheDocument();

      const button = screen.getByRole('button', { name: /view details/i });
      await user.click(button);
      expect(handleViewDetails).toHaveBeenCalled();
    });
  });
});
