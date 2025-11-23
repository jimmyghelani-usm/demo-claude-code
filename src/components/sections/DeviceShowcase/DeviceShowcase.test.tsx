import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DeviceShowcase } from './DeviceShowcase';

describe('DeviceShowcase Component', () => {
  describe('Rendering', () => {
    it('renders with default title and description', () => {
      render(<DeviceShowcase />);
      expect(screen.getByText('Choose Your Device')).toBeInTheDocument();
      expect(screen.getByText('Premium devices available for immediate delivery')).toBeInTheDocument();
    });

    it('renders title as heading', () => {
      render(<DeviceShowcase />);
      const heading = screen.getByRole('heading', { name: /Choose Your Device/i });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H2');
    });

    it('renders section element', () => {
      const { container } = render(<DeviceShowcase />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('renders header with title and description', () => {
      const { container } = render(<DeviceShowcase />);
      const header = container.querySelector('[class*="header"]');
      expect(header).toBeInTheDocument();
      expect(header).toHaveTextContent('Choose Your Device');
    });
  });

  describe('Default Devices', () => {
    it('renders all three default devices', () => {
      render(<DeviceShowcase />);
      expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
      expect(screen.getByText('iPhone 15')).toBeInTheDocument();
      expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    });

    it('renders correct prices for default devices', () => {
      render(<DeviceShowcase />);
      expect(screen.getByText('$999')).toBeInTheDocument();
      expect(screen.getByText('$799')).toBeInTheDocument();
      expect(screen.getByText('$599')).toBeInTheDocument();
    });

    it('renders device images with alt text', () => {
      render(<DeviceShowcase />);
      expect(screen.getByAltText('iPhone 15 Pro')).toBeInTheDocument();
      expect(screen.getByAltText('iPhone 15')).toBeInTheDocument();
      expect(screen.getByAltText('iPhone 13')).toBeInTheDocument();
    });

    it('renders view details buttons for each device', () => {
      render(<DeviceShowcase />);
      const buttons = screen.getAllByText('View Details');
      expect(buttons.length).toBe(3);
    });
  });

  describe('Custom Content', () => {
    it('accepts custom title and description', () => {
      render(
        <DeviceShowcase
          title="Our Products"
          description="Premium selection available"
        />
      );
      expect(screen.getByText('Our Products')).toBeInTheDocument();
      expect(screen.getByText('Premium selection available')).toBeInTheDocument();
    });

    it('renders custom devices', () => {
      const customDevices = [
        {
          id: 'custom-1',
          name: 'Custom Device',
          price: 499,
          image: 'https://example.com/device.jpg',
        },
      ];
      render(<DeviceShowcase devices={customDevices} />);
      expect(screen.getByText('Custom Device')).toBeInTheDocument();
      expect(screen.getByText('$499')).toBeInTheDocument();
    });

    it('renders single custom device', () => {
      const customDevices = [
        {
          id: 'single-device',
          name: 'Single Device',
          price: 399,
          image: 'https://example.com/device.jpg',
        },
      ];
      render(<DeviceShowcase devices={customDevices} />);
      expect(screen.getByText('Single Device')).toBeInTheDocument();
      expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument();
    });

    it('renders multiple custom devices', () => {
      const customDevices = [
        { id: '1', name: 'Device 1', price: 100, image: 'url1' },
        { id: '2', name: 'Device 2', price: 200, image: 'url2' },
        { id: '3', name: 'Device 3', price: 300, image: 'url3' },
        { id: '4', name: 'Device 4', price: 400, image: 'url4' },
      ];
      render(<DeviceShowcase devices={customDevices} />);
      customDevices.forEach((device) => {
        expect(screen.getByText(device.name)).toBeInTheDocument();
      });
    });
  });

  describe('Grid Layout', () => {
    it('renders grid container', () => {
      const { container } = render(<DeviceShowcase />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toBeInTheDocument();
    });

    it('renders device cards in grid', () => {
      const { container } = render(<DeviceShowcase />);
      const deviceCards = container.querySelectorAll('[class*="card"]');
      expect(deviceCards.length).toBeGreaterThanOrEqual(3);
    });

    it('renders correct number of device cards for custom devices', () => {
      const customDevices = [
        { id: '1', name: 'Device 1', price: 100, image: 'url1' },
        { id: '2', name: 'Device 2', price: 200, image: 'url2' },
      ];
      const { container } = render(<DeviceShowcase devices={customDevices} />);
      const deviceCards = container.querySelectorAll('[class*="card"]');
      expect(deviceCards.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Device Cards', () => {
    it('renders DeviceCard component for each device', () => {
      const { container } = render(<DeviceShowcase />);
      const cards = container.querySelectorAll('[class*="card"]');
      expect(cards.length).toBeGreaterThanOrEqual(3);
    });

    it('passes correct props to DeviceCard components', () => {
      render(<DeviceShowcase />);
      expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
      expect(screen.getByText('$999')).toBeInTheDocument();
      expect(screen.getByAltText('iPhone 15 Pro')).toBeInTheDocument();
    });

    it('renders cards with images', () => {
      render(<DeviceShowcase />);
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('User Interactions', () => {
    it('has view details buttons for each device', () => {
      render(<DeviceShowcase />);
      const buttons = screen.getAllByRole('button', { name: /view details/i });
      expect(buttons.length).toBe(3);
    });

    it('buttons are clickable', async () => {
      const user = userEvent.setup();
      render(<DeviceShowcase />);
      const buttons = screen.getAllByRole('button', { name: /view details/i });

      await user.click(buttons[0]);
      // Should complete without errors and button should still be in document
      expect(buttons[0]).toBeInTheDocument();
    });

    it('buttons are keyboard accessible with Tab', async () => {
      const user = userEvent.setup();
      render(<DeviceShowcase />);

      const buttons = screen.getAllByRole('button', { name: /view details/i });
      const firstButton = buttons[0];

      await user.tab();
      expect(firstButton).toHaveFocus();
    });

    it('buttons are keyboard accessible with Enter', async () => {
      const user = userEvent.setup();
      render(<DeviceShowcase />);

      const buttons = screen.getAllByRole('button', { name: /view details/i });
      buttons[0].focus();
      await user.keyboard('{Enter}');

      expect(buttons[0]).toBeInTheDocument();
    });

    it('buttons are keyboard accessible with Space', async () => {
      const user = userEvent.setup();
      render(<DeviceShowcase />);

      const buttons = screen.getAllByRole('button', { name: /view details/i });
      buttons[0].focus();
      await user.keyboard(' ');

      expect(buttons[0]).toBeInTheDocument();
    });

    it('multiple buttons can be interacted with sequentially', async () => {
      const user = userEvent.setup();
      render(<DeviceShowcase />);

      const buttons = screen.getAllByRole('button', { name: /view details/i });
      await user.click(buttons[0]);
      await user.click(buttons[1]);
      await user.click(buttons[2]);

      buttons.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has semantic heading structure', () => {
      render(<DeviceShowcase />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent).toBe('Choose Your Device');
    });

    it('all device names are readable', () => {
      render(<DeviceShowcase />);
      expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
      expect(screen.getByText('iPhone 15')).toBeInTheDocument();
      expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    });

    it('all prices are properly formatted and readable', () => {
      render(<DeviceShowcase />);
      const prices = ['$999', '$799', '$599'];
      prices.forEach((price) => {
        expect(screen.getByText(price)).toBeInTheDocument();
      });
    });

    it('all device images have descriptive alt text', () => {
      render(<DeviceShowcase />);
      const images = screen.getAllByRole('img');
      images.forEach((img) => {
        expect(img).toHaveAttribute('alt');
        expect((img as HTMLImageElement).alt).toBeTruthy();
      });
    });

    it('section has proper semantic structure', () => {
      const { container } = render(<DeviceShowcase />);
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('buttons are semantically correct', () => {
      render(<DeviceShowcase />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThanOrEqual(3);
      buttons.forEach((button) => {
        expect(button.tagName).toBe('BUTTON');
      });
    });
  });

  describe('Responsive Behavior', () => {
    it('renders all devices on mobile viewport', () => {
      render(<DeviceShowcase />);
      // Should render all devices regardless of viewport
      expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
      expect(screen.getByText('iPhone 15')).toBeInTheDocument();
      expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    });

    it('grid maintains structure with varying device counts', () => {
      const { container, rerender } = render(
        <DeviceShowcase
          devices={[
            { id: '1', name: 'Device 1', price: 100, image: 'url1' },
          ]}
        />
      );
      expect(container.querySelector('[class*="grid"]')).toBeInTheDocument();

      rerender(
        <DeviceShowcase
          devices={[
            { id: '1', name: 'Device 1', price: 100, image: 'url1' },
            { id: '2', name: 'Device 2', price: 200, image: 'url2' },
            { id: '3', name: 'Device 3', price: 300, image: 'url3' },
            { id: '4', name: 'Device 4', price: 400, image: 'url4' },
            { id: '5', name: 'Device 5', price: 500, image: 'url5' },
          ]}
        />
      );
      expect(container.querySelector('[class*="grid"]')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('renders with empty devices array', () => {
      render(<DeviceShowcase devices={[]} />);
      expect(screen.getByText('Choose Your Device')).toBeInTheDocument();
    });

    it('handles devices with very long names', () => {
      const longName = 'iPhone 15 Pro Max Ultra Plus Limited Edition Special Gold Titanium';
      const customDevices = [
        {
          id: 'long-name-device',
          name: longName,
          price: 1299,
          image: 'https://example.com/device.jpg',
        },
      ];
      render(<DeviceShowcase devices={customDevices} />);
      expect(screen.getByText(longName)).toBeInTheDocument();
    });

    it('handles devices with high prices', () => {
      const customDevices = [
        {
          id: 'expensive-device',
          name: 'Premium Device',
          price: 9999,
          image: 'https://example.com/device.jpg',
        },
      ];
      render(<DeviceShowcase devices={customDevices} />);
      expect(screen.getByText('$9999')).toBeInTheDocument();
    });

    it('handles devices with decimal prices', () => {
      const customDevices = [
        {
          id: 'decimal-price-device',
          name: 'Decimal Device',
          price: 999.99,
          image: 'https://example.com/device.jpg',
        },
      ];
      render(<DeviceShowcase devices={customDevices} />);
      expect(screen.getByText('$999.99')).toBeInTheDocument();
    });

    it('maintains functionality with many devices', () => {
      const manyDevices = Array.from({ length: 12 }, (_, i) => ({
        id: `device-${i}`,
        name: `Device ${i + 1}`,
        price: (i + 1) * 100,
        image: `https://example.com/device${i}.jpg`,
      }));
      render(<DeviceShowcase devices={manyDevices} />);

      manyDevices.forEach((device) => {
        expect(screen.getByText(device.name)).toBeInTheDocument();
      });
    });

    it('maintains functionality with all props and variations combined', () => {
      const customDevices = [
        { id: '1', name: 'Premium Device A', price: 1299, image: 'https://example.com/a.jpg' },
        { id: '2', name: 'Premium Device B', price: 999, image: 'https://example.com/b.jpg' },
      ];
      render(
        <DeviceShowcase
          title="Limited Edition Devices"
          description="Exclusive device selection"
          devices={customDevices}
        />
      );

      expect(screen.getByText('Limited Edition Devices')).toBeInTheDocument();
      expect(screen.getByText('Exclusive device selection')).toBeInTheDocument();
      expect(screen.getByText('Premium Device A')).toBeInTheDocument();
      expect(screen.getByText('Premium Device B')).toBeInTheDocument();
    });
  });
});
