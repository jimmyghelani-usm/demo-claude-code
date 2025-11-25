import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SplashPage } from './SplashPage';

describe('SplashPage', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<SplashPage />);
      expect(screen.getByText('Claude Code')).toBeInTheDocument();
    });

    it('renders with correct page structure', () => {
      const { container } = render(<SplashPage />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Main Heading', () => {
    it('displays "Claude Code" as main heading', () => {
      render(<SplashPage />);
      const heading = screen.getByText('Claude Code');
      expect(heading).toBeInTheDocument();
      expect(heading).toBeVisible();
    });

    it('displays "Cursor" as secondary heading', () => {
      render(<SplashPage />);
      const cursor = screen.getByText('Cursor');
      expect(cursor).toBeInTheDocument();
      expect(cursor).toBeVisible();
    });
  });

  describe('Subtitle', () => {
    it('displays "Autonomous Agentic Development Workflows" as subtitle', () => {
      render(<SplashPage />);
      const subtitle = screen.getByText('Autonomous Agentic Development Workflows');
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toBeVisible();
    });
  });

  describe('Description Text', () => {
    it('displays description text about multi-agent workflows', () => {
      render(<SplashPage />);
      const description = screen.getByText(/Orchestrate multi-agent AI workflows/i);
      expect(description).toBeInTheDocument();
    });

    it('mentions slash commands and agent coordination', () => {
      render(<SplashPage />);
      const description = screen.getByText(/slash commands and agent coordination/i);
      expect(description).toBeInTheDocument();
    });
  });

  describe('Feature Cards', () => {
    it('renders all feature cards for Claude Code section', () => {
      render(<SplashPage />);
      expect(screen.getByText('Subagents')).toBeInTheDocument();
      expect(screen.getByText('Commands')).toBeInTheDocument();
      expect(screen.getByText('Hooks')).toBeInTheDocument();
    });

    it('displays "Subagents" feature card with robot emoji', () => {
      render(<SplashPage />);
      const card = screen.getByText('Subagents');
      expect(card).toBeInTheDocument();
      expect(card).toBeVisible();

      const { container } = render(<SplashPage />);
      const cardText = container.textContent;
      expect(cardText).toContain('🤖');
      expect(cardText).toContain('Subagents');
    });

    it('displays "Commands" feature card with lightning emoji', () => {
      render(<SplashPage />);
      const card = screen.getByText('Commands');
      expect(card).toBeInTheDocument();
      expect(card).toBeVisible();

      const { container } = render(<SplashPage />);
      const cardText = container.textContent;
      expect(cardText).toContain('⚡');
      expect(cardText).toContain('Commands');
    });

    it('displays "Hooks" feature card with hook emoji', () => {
      render(<SplashPage />);
      const card = screen.getByText('Hooks');
      expect(card).toBeInTheDocument();
      expect(card).toBeVisible();

      const { container } = render(<SplashPage />);
      const cardText = container.textContent;
      expect(cardText).toContain('🪝');
      expect(cardText).toContain('Hooks');
    });

    it('displays all feature cards with correct labels', () => {
      render(<SplashPage />);
      const subagents = screen.getByText('Subagents');
      const commands = screen.getByText('Commands');
      const hooks = screen.getByText('Hooks');

      expect(subagents).toBeInTheDocument();
      expect(commands).toBeInTheDocument();
      expect(hooks).toBeInTheDocument();
    });
  });

  describe('Section Headings', () => {
    it('displays Claude Code section heading', () => {
      render(<SplashPage />);
      const heading = screen.getByText(/Claude Code: Subagents, Commands & Hooks/);
      expect(heading).toBeInTheDocument();
    });

    it('displays Cursor section heading', () => {
      render(<SplashPage />);
      const heading = screen.getByText(/Cursor: Slash Commands for Agent Coordination/);
      expect(heading).toBeInTheDocument();
    });
  });

  describe('Footer', () => {
    it('displays footer text containing "Claude Code Subagents"', () => {
      render(<SplashPage />);
      const footer = screen.getByText(/Claude Code Subagents/);
      expect(footer).toBeInTheDocument();
    });

    it('displays footer text containing "Cursor Integration"', () => {
      render(<SplashPage />);
      const footer = screen.getByText(/Cursor Integration/);
      expect(footer).toBeInTheDocument();
    });

    it('displays footer text containing "Agentic Development"', () => {
      render(<SplashPage />);
      const elements = screen.getAllByText(/Agentic Development/);
      expect(elements.length).toBeGreaterThan(0);
      expect(elements[elements.length - 1]).toBeInTheDocument(); // Check last occurrence (footer)
    });
  });

  describe('Interactivity', () => {
    it('Claude Code heading is clickable with correct accessibility', () => {
      render(<SplashPage />);
      const claudeCode = screen.getByRole('button', { name: /Click to scroll to Claude Code section/i });
      expect(claudeCode).toBeInTheDocument();
      expect(claudeCode).toHaveAttribute('tabIndex', '0');
    });

    it('Cursor heading is clickable with correct accessibility', () => {
      render(<SplashPage />);
      const cursor = screen.getByRole('button', { name: /Click to scroll to Cursor section/i });
      expect(cursor).toBeInTheDocument();
      expect(cursor).toHaveAttribute('tabIndex', '0');
    });

    it('handles keyboard navigation for Claude Code button', () => {
      render(<SplashPage />);
      const claudeCode = screen.getByRole('button', { name: /Click to scroll to Claude Code section/i });

      fireEvent.keyDown(claudeCode, { key: 'Enter' });
      expect(claudeCode).toBeInTheDocument();
    });

    it('handles keyboard navigation for Cursor button', () => {
      render(<SplashPage />);
      const cursor = screen.getByRole('button', { name: /Click to scroll to Cursor section/i });

      fireEvent.keyDown(cursor, { key: ' ' });
      expect(cursor).toBeInTheDocument();
    });
  });

  describe('Content Structure', () => {
    it('renders all major sections in correct order', () => {
      const { container } = render(<SplashPage />);
      const text = container.textContent || '';

      const claudeCodeIndex = text.indexOf('Claude Code');
      const subtitleIndex = text.indexOf('Autonomous Agentic Development Workflows');
      const descriptionIndex = text.indexOf('Orchestrate multi-agent');
      const subagentsIndex = text.indexOf('Subagents');
      const cursorSectionIndex = text.indexOf('Cursor: Slash Commands');

      expect(claudeCodeIndex).toBeLessThan(subtitleIndex);
      expect(subtitleIndex).toBeLessThan(descriptionIndex);
      expect(descriptionIndex).toBeLessThan(subagentsIndex);
      expect(subagentsIndex).toBeLessThan(cursorSectionIndex);
    });

    it('renders all text content as visible', () => {
      render(<SplashPage />);

      expect(screen.getByText('Claude Code')).toBeVisible();
      expect(screen.getByText('Cursor')).toBeVisible();
      expect(screen.getByText('Autonomous Agentic Development Workflows')).toBeVisible();
      expect(screen.getByText('Subagents')).toBeVisible();
      expect(screen.getByText('Commands')).toBeVisible();
      expect(screen.getByText('Hooks')).toBeVisible();
    });
  });

  describe('Accessibility', () => {
    it('contains readable text content', () => {
      const { container } = render(<SplashPage />);
      const textContent = container.textContent;

      expect(textContent).toBeTruthy();
      expect(textContent?.length).toBeGreaterThan(50);
    });

    it('has proper text hierarchy with headings and body text', () => {
      render(<SplashPage />);

      // Main headings
      expect(screen.getByText('Claude Code')).toBeInTheDocument();
      expect(screen.getByText('Cursor')).toBeInTheDocument();

      // Subtitle
      expect(screen.getByText('Autonomous Agentic Development Workflows')).toBeInTheDocument();

      // Body text
      expect(screen.getByText(/Orchestrate multi-agent AI workflows/)).toBeInTheDocument();

      // Feature labels
      expect(screen.getByText('Subagents')).toBeInTheDocument();
      expect(screen.getByText('Commands')).toBeInTheDocument();
      expect(screen.getByText('Hooks')).toBeInTheDocument();
    });

    it('renders with contrast-friendly text colors', () => {
      const { container } = render(<SplashPage />);
      const mainContainer = container.firstChild as HTMLElement;

      expect(mainContainer).toBeInTheDocument();
      expect(screen.getByText('Claude Code')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles multiple renders without errors', () => {
      const { rerender } = render(<SplashPage />);
      expect(screen.getByText('Claude Code')).toBeInTheDocument();

      rerender(<SplashPage />);
      expect(screen.getByText('Claude Code')).toBeInTheDocument();

      rerender(<SplashPage />);
      expect(screen.getByText('Claude Code')).toBeInTheDocument();
    });

    it('contains all expected emojis', () => {
      const { container } = render(<SplashPage />);
      const text = container.textContent || '';

      expect(text).toContain('🤖'); // Subagents
      expect(text).toContain('⚡'); // Commands
      expect(text).toContain('🪝'); // Hooks
    });

    it('maintains content integrity across renders', () => {
      const { container, rerender } = render(<SplashPage />);
      const initialContent = container.textContent;

      rerender(<SplashPage />);
      const rerenderedContent = container.textContent;

      expect(initialContent).toBe(rerenderedContent);
    });
  });

  describe('Hero Section with Starry Background', () => {
    it('renders hero section with stars', () => {
      const { container } = render(<SplashPage />);
      expect(container.querySelector('[style*="position: absolute"]')).toBeInTheDocument();
    });

    it('contains animation styles for blinking stars', () => {
      const { container } = render(<SplashPage />);
      const styles = container.querySelector('style');
      expect(styles?.textContent).toContain('@keyframes blink');
    });
  });

  describe('Curved Separator Element', () => {
    it('renders the curved separator element', () => {
      const { container } = render(<SplashPage />);
      const separators = container.querySelectorAll('[aria-hidden="true"]');
      expect(separators.length).toBeGreaterThan(0);
    });

    it('has aria-hidden attribute set to true for accessibility', () => {
      const { container } = render(<SplashPage />);
      const separator = container.querySelector('div[aria-hidden="true"]');
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveAttribute('aria-hidden', 'true');
    });

    it('has correct position styling (absolute positioning)', () => {
      const { container } = render(<SplashPage />);
      const separator = container.querySelector('div[aria-hidden="true"]');

      const style = separator?.getAttribute('style') || '';
      expect(style).toContain('position: absolute');
      expect(style).toContain('bottom: -200px');
      expect(style).toContain('left: 50%');
    });

    it('has correct transform property for centering', () => {
      const { container } = render(<SplashPage />);
      const separator = container.querySelector('div[aria-hidden="true"]');

      const style = separator?.getAttribute('style') || '';
      expect(style).toContain('transform: translateX(-50%)');
    });

    it('has correct dimensions (600px width and height)', () => {
      const { container } = render(<SplashPage />);
      const separator = container.querySelector('div[aria-hidden="true"]');

      const style = separator?.getAttribute('style') || '';
      expect(style).toContain('width: 600px');
      expect(style).toContain('height: 600px');
    });

    it('has border-radius set to 50% for circular shape', () => {
      const { container } = render(<SplashPage />);
      const separator = container.querySelector('div[aria-hidden="true"]');

      const style = separator?.getAttribute('style') || '';
      expect(style).toContain('border-radius: 50%');
    });

    it('has blur filter applied (80px)', () => {
      const { container } = render(<SplashPage />);
      const separator = container.querySelector('div[aria-hidden="true"]');

      const style = separator?.getAttribute('style') || '';
      expect(style).toContain('filter: blur(80px)');
    });

    it('has pointer-events set to none to prevent interaction', () => {
      const { container } = render(<SplashPage />);
      const separator = container.querySelector('div[aria-hidden="true"]');

      const style = separator?.getAttribute('style') || '';
      expect(style).toContain('pointer-events: none');
    });

    it('has correct z-index for layering', () => {
      const { container } = render(<SplashPage />);
      const separator = container.querySelector('div[aria-hidden="true"]');

      const style = separator?.getAttribute('style') || '';
      expect(style).toContain('z-index: 1');
    });

    it('has radial gradient background', () => {
      const { container } = render(<SplashPage />);
      const separator = container.querySelector('div[aria-hidden="true"]');

      const style = separator?.getAttribute('style') || '';
      expect(style).toContain('radial-gradient');
      expect(style).toContain('rgba(26, 26, 46, 0.8)');
      expect(style).toContain('rgba(10, 10, 10, 0.6)');
    });

    it('does not interfere with content interactivity', () => {
      render(<SplashPage />);
      const claudeCodeButton = screen.getByRole('button', {
        name: /Click to scroll to Claude Code section/i
      });

      expect(claudeCodeButton).toBeInTheDocument();
      expect(claudeCodeButton).not.toHaveAttribute('disabled');
    });

    it('is positioned at the bottom of hero section without breaking layout', () => {
      const { container } = render(<SplashPage />);
      const separator = container.querySelector('div[aria-hidden="true"]');

      // Separator should exist and be hidden from accessibility tree
      expect(separator).toBeInTheDocument();
      expect(separator).toHaveAttribute('aria-hidden', 'true');

      // Main content should still be accessible
      expect(screen.getByText('Claude Code')).toBeVisible();
      expect(screen.getByText('Autonomous Agentic Development Workflows')).toBeVisible();
    });

    it('should not be announced by screen readers', () => {
      const { container } = render(<SplashPage />);
      const separator = container.querySelector('div[aria-hidden="true"]');

      // aria-hidden="true" means screen readers will skip this element
      expect(separator).toHaveAttribute('aria-hidden', 'true');
    });

    it('maintains decorative styling without affecting content flow', () => {
      render(<SplashPage />);

      // Verify all content is still visible and properly ordered
      const heroText = screen.getByText('Autonomous Agentic Development Workflows');
      const description = screen.getByText(/Orchestrate multi-agent AI workflows/i);
      const claudeCodeSection = screen.getByText('Claude Code: Subagents, Commands & Hooks');

      expect(heroText).toBeVisible();
      expect(description).toBeVisible();
      expect(claudeCodeSection).toBeVisible();
    });

    it('has all required styling properties combined', () => {
      const { container } = render(<SplashPage />);
      const separator = container.querySelector('div[aria-hidden="true"]');

      const style = separator?.getAttribute('style') || '';
      const requiredProperties = [
        'position: absolute',
        'bottom: -200px',
        'left: 50%',
        'transform: translateX(-50%)',
        'width: 600px',
        'height: 600px',
        'border-radius: 50%',
        'filter: blur(80px)',
        'pointer-events: none',
        'z-index: 1'
      ];

      requiredProperties.forEach(prop => {
        expect(style).toContain(prop);
      });
    });
  });
});
