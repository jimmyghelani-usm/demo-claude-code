import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BusinessPageHeader } from './BusinessPageHeader';

describe('BusinessPageHeader', () => {
  describe('Rendering', () => {
    it('renders header with logo', () => {
      render(<BusinessPageHeader />);
      expect(screen.getByText('US Mobile')).toBeInTheDocument();
    });

    it('renders all navigation links', () => {
      render(<BusinessPageHeader />);
      expect(screen.getByText('NETWORKS')).toBeInTheDocument();
      expect(screen.getByText('HOW IT WORKS')).toBeInTheDocument();
      expect(screen.getByText('SHOP')).toBeInTheDocument();
    });

    it('renders sign in link', () => {
      render(<BusinessPageHeader />);
      expect(screen.getByText('SIGN IN')).toBeInTheDocument();
    });

    it('renders main CTA button with correct text', () => {
      render(<BusinessPageHeader />);
      expect(screen.getByRole('button', { name: /GET STARTED/i })).toBeInTheDocument();
    });

    it('renders icon buttons with proper aria labels', () => {
      render(<BusinessPageHeader />);
      expect(screen.getByLabelText('Chat with us')).toBeInTheDocument();
      expect(screen.getByLabelText('Shopping cart')).toBeInTheDocument();
    });

    it('renders social icon emojis', () => {
      render(<BusinessPageHeader />);
      const chatButton = screen.getByLabelText('Chat with us');
      const shoppingButton = screen.getByLabelText('Shopping cart');
      expect(chatButton.textContent).toContain('💬');
      expect(shoppingButton.textContent).toContain('🛍️');
    });
  });

  describe('Semantic Structure', () => {
    it('has proper semantic header element', () => {
      const { container } = render(<BusinessPageHeader />);
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
    });

    it('contains nav element for navigation', () => {
      const { container } = render(<BusinessPageHeader />);
      const nav = container.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });

    it('logo link has home aria-label', () => {
      render(<BusinessPageHeader />);
      const logoLink = screen.getByLabelText('Home');
      expect(logoLink).toBeInTheDocument();
      expect(logoLink.tagName.toLowerCase()).toBe('a');
    });

    it('nav links are anchor tags with correct hrefs', () => {
      render(<BusinessPageHeader />);
      const networksLink = screen.getByText('NETWORKS').closest('a');
      const howItWorksLink = screen.getByText('HOW IT WORKS').closest('a');
      const shopLink = screen.getByText('SHOP').closest('a');

      expect(networksLink).toHaveAttribute('href', '#networks');
      expect(howItWorksLink).toHaveAttribute('href', '#how-it-works');
      expect(shopLink).toHaveAttribute('href', '#shop');
    });

    it('sign in is an anchor tag with correct href', () => {
      render(<BusinessPageHeader />);
      const signInLink = screen.getByText('SIGN IN').closest('a');
      expect(signInLink).toHaveAttribute('href', '#signin');
    });
  });

  describe('Button Interactions', () => {
    it('main CTA button is clickable', async () => {
      const user = userEvent.setup();
      render(<BusinessPageHeader />);
      const getStartedButton = screen.getByRole('button', { name: /GET STARTED/i });
      await user.click(getStartedButton);
      expect(getStartedButton).toBeInTheDocument();
    });

    it('chat icon button is clickable', async () => {
      const user = userEvent.setup();
      render(<BusinessPageHeader />);
      const chatButton = screen.getByLabelText('Chat with us');
      await user.click(chatButton);
      expect(chatButton).toBeInTheDocument();
    });

    it('shopping cart button is clickable', async () => {
      const user = userEvent.setup();
      render(<BusinessPageHeader />);
      const cartButton = screen.getByLabelText('Shopping cart');
      await user.click(cartButton);
      expect(cartButton).toBeInTheDocument();
    });

    it('all buttons are of type button', () => {
      render(<BusinessPageHeader />);
      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveAttribute('type', 'button');
      });
    });
  });

  describe('Keyboard Navigation', () => {
    it('logo link is keyboard focusable', async () => {
      const user = userEvent.setup();
      render(<BusinessPageHeader />);
      const logoLink = screen.getByLabelText('Home');
      await user.tab();
      expect(logoLink).toHaveFocus();
    });

    it('main button is keyboard focusable', async () => {
      const user = userEvent.setup();
      render(<BusinessPageHeader />);
      const getStartedButton = screen.getByRole('button', { name: /GET STARTED/i });
      getStartedButton.focus();
      expect(getStartedButton).toHaveFocus();
    });

    it('all icon buttons are keyboard focusable', async () => {
      render(<BusinessPageHeader />);
      const chatButton = screen.getByLabelText('Chat with us');
      const cartButton = screen.getByLabelText('Shopping cart');

      chatButton.focus();
      expect(chatButton).toHaveFocus();

      cartButton.focus();
      expect(cartButton).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('has correct role attributes', () => {
      render(<BusinessPageHeader />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('icon buttons have descriptive aria labels', () => {
      render(<BusinessPageHeader />);
      const chatButton = screen.getByLabelText('Chat with us');
      const cartButton = screen.getByLabelText('Shopping cart');

      expect(chatButton).toHaveAttribute('aria-label', 'Chat with us');
      expect(cartButton).toHaveAttribute('aria-label', 'Shopping cart');
    });

    it('logo link has aria-label for screen readers', () => {
      render(<BusinessPageHeader />);
      const logoLink = screen.getByLabelText('Home');
      expect(logoLink).toHaveAttribute('aria-label', 'Home');
    });

    it('header has no accessibility violations with correct structure', () => {
      const { container } = render(<BusinessPageHeader />);
      const header = container.querySelector('header');
      const nav = header?.querySelector('nav');
      expect(header).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
    });
  });

  describe('Styling and Layout', () => {
    it('header container exists and is properly positioned', () => {
      const { container } = render(<BusinessPageHeader />);
      const header = container.querySelector('header');
      expect(header).toBeInTheDocument();
      const styles = window.getComputedStyle(header!);
      expect(styles.position).toBe('fixed');
    });

    it('logo text displays correctly', () => {
      render(<BusinessPageHeader />);
      const logoText = screen.getByText('US Mobile');
      expect(logoText).toBeVisible();
    });

    it('all navigation links are visible', () => {
      render(<BusinessPageHeader />);
      expect(screen.getByText('NETWORKS')).toBeVisible();
      expect(screen.getByText('HOW IT WORKS')).toBeVisible();
      expect(screen.getByText('SHOP')).toBeVisible();
    });

    it('buttons have correct styling applied', () => {
      render(<BusinessPageHeader />);
      const getStartedButton = screen.getByRole('button', { name: /GET STARTED/i });
      const chatButton = screen.getByLabelText('Chat with us');

      expect(getStartedButton).toBeInTheDocument();
      expect(chatButton).toBeInTheDocument();
    });
  });

  describe('Integration', () => {
    it('renders complete header structure with all elements', () => {
      const { container } = render(<BusinessPageHeader />);
      const header = container.querySelector('header');
      const nav = header?.querySelector('nav');
      const logo = nav?.querySelector('[aria-label="Home"]');
      const buttons = container.querySelectorAll('button');

      expect(header).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
      expect(logo).toBeInTheDocument();
      expect(buttons.length).toBe(3); // GET STARTED, Chat, Shopping
    });

    it('logo link and navigation links have correct href patterns', () => {
      render(<BusinessPageHeader />);
      const logoLink = screen.getByLabelText('Home');
      const networksLink = screen.getByText('NETWORKS').closest('a');
      const signInLink = screen.getByText('SIGN IN').closest('a');

      expect(logoLink).toHaveAttribute('href');
      expect(networksLink).toHaveAttribute('href');
      expect(signInLink).toHaveAttribute('href');
    });
  });
});
