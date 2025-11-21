import type { Meta, StoryObj } from '@storybook/react-vite';
import App from './App';

/**
 * App Component - Main splash page with animated gradient background
 *
 * This is the primary entry point component showcasing:
 * - Animated gradient background with smooth color transitions
 * - 20 floating particle effects for visual depth
 * - Centered white card with decorative corner accents
 * - Gradient text heading "Hello World"
 * - Responsive design with mobile media queries
 * - Multiple CSS animations: gradientShift, float, fadeInScale, pulse
 *
 * The component is stateless and renders a complete Hello World splash page
 * with no interactive props. It's designed to provide a fresh, clean entry point
 * to the React application with premium visual polish.
 */
const meta: Meta<typeof App> = {
  title: 'App/Main',
  component: App,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Main App component - A Hello World splash page featuring an animated gradient background, floating particles, and a centered card with gradient text. The component includes smooth CSS animations and responsive design for all screen sizes.',
      },
    },
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', width: '100%', overflow: 'hidden' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof App>;

/**
 * Default - The main App component showing the Hello World splash page
 *
 * Features visible in this story:
 * - Animated gradient background (15s cycle with blue and support blue colors)
 * - 20 floating particles with staggered animation delays
 * - Centered white card with rounded corners (32px border radius)
 * - Decorative corner accents in brand blue (top-left and bottom-right)
 * - "Hello World" heading with gradient text (blue to navy)
 * - Subtitle: "Welcome to your fresh, clean React app"
 * - Pulsing indicator badge with "Ready to build something amazing" message
 * - Responsive design that adapts heading and text size on mobile (max-width: 768px)
 *
 * CSS animations active:
 * - gradientShift: Background color animation over 15 seconds
 * - float: Particle floating motion with 10-20 second duration per particle
 * - fadeInScale: Initial card appearance with 0.8s ease-out
 * - pulse: Indicator dot pulsing with 2s cycle
 */
export const Default: Story = {};
