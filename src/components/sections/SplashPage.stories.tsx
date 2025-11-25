import type { Meta, StoryObj } from '@storybook/react';
import { SplashPage } from './SplashPage';

const meta = {
  title: 'Sections/SplashPage',
  component: SplashPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `A full-page splash/landing page showcasing Claude Code and Cursor tooling for autonomous agentic development workflows.

## Key Features:

### Hero Section
- Interactive hero section with animated starry background (50 randomly positioned stars with twinkling animation)
- Gradient text headings for "Claude Code" and "Cursor" (blue and yellow respectively)
- Clickable buttons that scroll to respective feature sections
- Accessible keyboard navigation (Enter/Space keys supported)
- Supports up to 60% viewport height with centered content

### Curved Separator Effect
- **Visual Enhancement**: Creates a smooth, curved separation between the hero section and Claude Code features section
- **Technical Implementation**:
  - Absolutely positioned circular element with 600px diameter
  - Positioned 200px below hero section using 50% left offset with translateX transform
  - Radial gradient background: opaque center (rgba(26, 26, 46, 0.8)) fading to transparent edges (rgba(10, 10, 10, 0.6))
  - Heavy blur filter (80px) for smooth blending with gradient backgrounds
  - Decorative element (aria-hidden="true") - not interactive
  - zIndex: 1 for layering between sections
- **Visual Effect**: Creates an organic, flowing visual transition that blends seamlessly with the dark theme gradients

### Feature Sections
- **Claude Code Section**: Highlights subagents, commands, and hooks with gradient card design
- **Cursor Integration Section**: Demonstrates pseudo-autonomous workflow with sync, context, and autonomous collaboration features

### Design Elements
- Dark gradient background (135deg linear gradient from #0a0a0a to #1a1a2e)
- Radial gradient hero background for depth
- Glass-morphism cards with backdrop blur effects
- Responsive grid layout (auto-fit, minmax 280px)
- System font stack for consistent rendering
- Full accessibility support with proper ARIA labels and semantic HTML

This is a stateless component with no props—all content and styling are self-contained.`,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SplashPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view of the SplashPage component showcasing all sections including the curved separator effect.
 *
 * The component displays:
 * - Hero section with animated stars and interactive title
 * - Smooth curved separator (blur effect) between sections
 * - Claude Code features (subagents, commands, hooks)
 * - Cursor integration showcase
 *
 * The curved separator uses a 600px diameter circle with 80px blur at the bottom of the hero
 * section, creating an organic visual transition between the dark hero gradient and the Claude
 * Code features section.
 */
export const Default: Story = {};
