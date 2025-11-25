import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  describe('rendering', () => {
    it('renders the SplashPage component', () => {
      render(<App />);
      expect(screen.getByText('Claude Code')).toBeInTheDocument();
    });

    it('renders the main heading', () => {
      render(<App />);
      const claudeCode = screen.getByText('Claude Code');
      expect(claudeCode).toBeInTheDocument();
      expect(claudeCode).toBeVisible();
    });

    it('renders the Cursor heading', () => {
      render(<App />);
      expect(screen.getByText('Cursor')).toBeInTheDocument();
    });

    it('renders the subtitle', () => {
      render(<App />);
      expect(screen.getByText('Autonomous Agentic Development Workflows')).toBeInTheDocument();
    });
  });

  describe('structure', () => {
    it('renders without crashing', () => {
      const { container } = render(<App />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('contains main content', () => {
      const { container } = render(<App />);
      const textContent = container.textContent;
      expect(textContent).toBeTruthy();
      expect(textContent?.length).toBeGreaterThan(100);
    });
  });

  describe('content', () => {
    it('displays feature sections', () => {
      render(<App />);
      expect(screen.getByText('Subagents')).toBeInTheDocument();
      expect(screen.getByText('Commands')).toBeInTheDocument();
      expect(screen.getByText('Hooks')).toBeInTheDocument();
    });

    it('displays section headings', () => {
      render(<App />);
      expect(screen.getByText(/Claude Code: Subagents, Commands & Hooks/)).toBeInTheDocument();
      expect(screen.getByText(/Cursor: Slash Commands for Agent Coordination/)).toBeInTheDocument();
    });
  });
});
