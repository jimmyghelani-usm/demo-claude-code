import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroSection } from './HeroSection';

/**
 * HeroSection component - Updated to match Figma node 1413:13347
 *
 * ## Component Overview
 * The HeroSection displays a centered hero banner with:
 * - Single-line headline "Lorem ipsum dolor amet"
 * - Descriptive body text
 * - Primary CTA button
 *
 * **No props interface** - Component has fixed content for this iteration.
 *
 * ## Design Specifications (Figma node 1413:13347)
 * Figma Reference:
 * - **Desktop**: node-id 1413:13347 (1440px × 615px, centered layout)
 *
 * ### Desktop Layout
 * - Container: 1440px × 615px
 * - Hero Content Area: 680px width (centered)
 * - Background: #1A5DF6 (primary blue)
 * - Headline: 52px / 54px line height / -1.2px letter spacing
 *   - "Lorem ipsum dolor amet" - white color
 *   - Font: GT Walsheim Pro Bold
 * - Description: 24px / 30px line height, white color
 * - CTA Button: 162px × 50px, white background, blue text (#1A5DF6), 15px border radius
 * - Spacing: 36px vertical gap between text group and button, 4px between heading and subheading
 *
 * ### Mobile Layout
 * - Responsive padding and typography
 * - Maintains accessibility standards
 * - 44px minimum touch target height
 *
 * ## Key Features
 * - **Background**: #1A5DF6 (primary blue)
 * - **Typography**: GT Walsheim Pro font family
 * - **Responsive**: Mobile-first design with fluid breakpoints
 * - **Accessibility**: WCAG 2.1 AA compliant, semantic HTML, keyboard accessible
 */
const meta = {
  title: 'Sections/HeroSection',
  component: HeroSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Hero section with centered 680px content area - matches Figma node 1413:13347 with #1A5DF6 background.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default hero section on desktop (1440px × 615px, centered 680px content area)
 * - Background: #1A5DF6
 * - White text throughout
 * - CTA button: white background with blue text
 */
export const Default: Story = {};

/**
 * Hero section on mobile viewport (375px)
 * - Responsive typography (32px headline, 16px body)
 * - Maintains white text throughout
 * - 44px minimum touch target height
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story:
          'Mobile view with responsive typography and maintained accessibility standards.',
      },
    },
  },
};

/**
 * Hero section on small mobile viewport (320px)
 * - Further reduced typography
 * - Maintained accessibility standards
 */
export const SmallMobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile2',
    },
    docs: {
      description: {
        story: 'Compact mobile view with reduced typography while maintaining touch targets.',
      },
    },
  },
};

/**
 * Hero section on large desktop viewport (1920px)
 * - Centered content constrained to 1440px max-width
 */
export const LargeDesktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'Large desktop view showing content remains centered and constrained.',
      },
    },
  },
};
