import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { UsMobileTradeInHowItWorks, type TradeInStep } from './UsMobileTradeInHowItWorks';

const meta: Meta<typeof UsMobileTradeInHowItWorks> = {
  title: 'Sections/UsMobileTradeInHowItWorks',
  component: UsMobileTradeInHowItWorks,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Step-by-step process section for the US Mobile Trade In page. Features a 4-step process layout with numbered icons, responsive grid (2 columns desktop, 1 mobile), smooth animations, and full accessibility support with ARIA attributes.',
      },
    },
  },
  argTypes: {
    sectionTitle: {
      control: { type: 'text' },
      description: 'Main title for the "How It Works" section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Simple 4-Step Process'" },
      },
    },
    sectionDescription: {
      control: { type: 'text' },
      description: 'Descriptive subtitle for the section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Get the best value for your device in just a few minutes'" },
      },
    },
    steps: {
      control: 'object',
      description: 'Array of trade-in steps with icon, number, title, and description',
      table: {
        type: { summary: 'TradeInStep[]' },
      },
    },
    className: {
      control: { type: 'text' },
      description: 'Additional CSS classes to apply to the section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UsMobileTradeInHowItWorks>;

/**
 * Default story with all 4 steps of the trade-in process.
 * Shows the complete step-by-step workflow.
 */
export const Default: Story = {
  args: {},
};

/**
 * Section with custom title.
 * Demonstrates how different section titles affect the messaging.
 */
export const CustomTitle: Story = {
  args: {
    sectionTitle: 'Get Started in 4 Easy Steps',
    sectionDescription: 'Get the best value for your device in just a few minutes',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with a custom section title.',
      },
    },
  },
};

/**
 * Section with extended description.
 * Tests how longer descriptive text is handled.
 */
export const ExtendedDescription: Story = {
  args: {
    sectionTitle: 'Simple 4-Step Process',
    sectionDescription:
      'Getting the best value for your device has never been easier. Our simple trade-in process takes just a few minutes, and your credit is applied instantly to your new device purchase.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the component handles longer description text.',
      },
    },
  },
};

/**
 * Section without description.
 * Shows how the component renders when sectionDescription is not provided.
 */
export const WithoutDescription: Story = {
  args: {
    sectionTitle: 'Simple 4-Step Process',
    sectionDescription: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component without a section description.',
      },
    },
  },
};

/**
 * Three-step process variant.
 * Demonstrates how the component adapts to a different number of steps.
 */
export const ThreeStepProcess: Story = {
  args: {
    sectionTitle: 'Simple 3-Step Process',
    sectionDescription: 'Trade in your device in just three steps',
    steps: [
      {
        stepNumber: 1,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="18" stroke="#1d5ff6" strokeWidth="2" />
            <path
              d="M14 20L18 24L26 16"
              stroke="#1d5ff6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        title: 'Select Your Device',
        description: 'Choose the phone or tablet you want to trade in.',
      },
      {
        stepNumber: 2,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="8" y="10" width="24" height="20" rx="2" stroke="#1d5ff6" strokeWidth="2" />
            <path d="M12 14H28" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18H28" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 22H20" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
        title: 'Assess Condition',
        description: 'Answer simple questions about your device condition.',
      },
      {
        stepNumber: 3,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6V34M6 20H34"
              stroke="#1d5ff6"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="20" cy="20" r="14" stroke="#1d5ff6" strokeWidth="2" />
          </svg>
        ),
        title: 'Apply Your Credit',
        description: 'Use your credit instantly toward your new device purchase.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component adapted to a 3-step process instead of the default 4 steps.',
      },
    },
  },
};

/**
 * Five-step extended process.
 * Demonstrates extensibility with more steps.
 */
export const FiveStepProcess: Story = {
  args: {
    sectionTitle: 'Complete Trade-In Workflow',
    sectionDescription: 'Our comprehensive 5-step trade-in process ensures you get the best value',
    steps: [
      {
        stepNumber: 1,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="18" stroke="#1d5ff6" strokeWidth="2" />
            <path
              d="M14 20L18 24L26 16"
              stroke="#1d5ff6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        title: 'Select Your Device',
        description: 'Choose the phone or tablet you want to trade in from our catalog.',
      },
      {
        stepNumber: 2,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="8" y="10" width="24" height="20" rx="2" stroke="#1d5ff6" strokeWidth="2" />
            <path d="M12 14H28" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18H28" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 22H20" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
        title: 'Assess Condition',
        description: 'Answer simple questions about your device condition. Takes less than 2 minutes.',
      },
      {
        stepNumber: 3,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6V34M6 20H34"
              stroke="#1d5ff6"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="20" cy="20" r="14" stroke="#1d5ff6" strokeWidth="2" />
          </svg>
        ),
        title: 'Get Instant Quote',
        description: 'Receive your trade-in value immediately. Lock it in for 30 days.',
      },
      {
        stepNumber: 4,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 16L20 28L32 12"
              stroke="#1d5ff6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        title: 'Ship Your Device',
        description: 'Use our prepaid shipping label to send your device. Completely free.',
      },
      {
        stepNumber: 5,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 20L16 28L32 12"
              stroke="#1d5ff6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        title: 'Apply Your Credit',
        description: 'Use your credit instantly toward any new device purchase.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component adapted to a 5-step process.',
      },
    },
  },
};

/**
 * Mobile viewport.
 * Shows how the component adapts to single-column layout on mobile.
 */
export const MobileView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Shows the component on mobile viewport with single-column layout.',
      },
    },
  },
};

/**
 * Tablet viewport.
 * Shows how the component renders on tablet screens.
 */
export const TabletView: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Shows the component on tablet viewport.',
      },
    },
  },
};

/**
 * Desktop viewport.
 * Shows the component on large desktop screens with 2-column layout.
 */
export const DesktopView: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Shows the component on desktop viewport with 2-column grid layout.',
      },
    },
  },
};

/**
 * With custom CSS class.
 * Demonstrates how to apply custom styling via className prop.
 */
export const WithCustomClassName: Story = {
  args: {
    className: 'custom-how-it-works',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows how to apply custom CSS classes via the className prop.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const section = canvasElement.querySelector('section');
    expect(section).toHaveClass('custom-how-it-works');
  },
};

/**
 * Accessibility features story.
 * Demonstrates semantic HTML and ARIA attributes for screen readers.
 */
export const Accessibility: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates accessibility features including semantic HTML, ARIA labels, and proper heading hierarchy.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify section has proper aria-labelledby
    const section = canvasElement.querySelector('section');
    expect(section).toHaveAttribute(
      'aria-labelledby',
      'trade-in-how-it-works-heading'
    );

    // Verify main heading
    const mainHeading = canvas.getByRole('heading', {
      name: /Simple 4-Step Process/i,
    });
    expect(mainHeading).toHaveAttribute('id', 'trade-in-how-it-works-heading');

    // Verify step regions have aria-label
    const stepRegions = canvasElement.querySelectorAll('[role="region"]');
    expect(stepRegions.length).toBeGreaterThan(0);

    // Check that first step has proper aria-label
    if (stepRegions[0]) {
      const ariaLabel = stepRegions[0].getAttribute('aria-label');
      expect(ariaLabel).toMatch(/Step 1:/i);
    }
  },
};

/**
 * RTL (Right-to-Left) language support.
 * Shows how the component handles RTL text direction.
 */
export const RTLSupport: Story = {
  args: {
    sectionTitle: 'عملية بسيطة في 4 خطوات',
    sectionDescription: 'احصل على أفضل قيمة لجهازك في بضع دقائق فقط',
    steps: [
      {
        stepNumber: 1,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="18" stroke="#1d5ff6" strokeWidth="2" />
            <path
              d="M14 20L18 24L26 16"
              stroke="#1d5ff6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        title: 'اختر جهازك',
        description: 'اختر الهاتف أو الجهاز اللوحي الذي تريد استبداله.',
      },
      {
        stepNumber: 2,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="8" y="10" width="24" height="20" rx="2" stroke="#1d5ff6" strokeWidth="2" />
            <path d="M12 14H28" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18H28" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 22H20" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
        title: 'قيّم الحالة',
        description: 'أجب على أسئلة بسيطة حول حالة جهازك.',
      },
      {
        stepNumber: 3,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6V34M6 20H34"
              stroke="#1d5ff6"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="20" cy="20" r="14" stroke="#1d5ff6" strokeWidth="2" />
          </svg>
        ),
        title: 'احصل على عرض فوري',
        description: 'احصل على قيمة المقايضة على الفور. احجزها لمدة 30 يوماً.',
      },
      {
        stepNumber: 4,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 16L20 28L32 12"
              stroke="#1d5ff6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        title: 'استخدم رصيدك',
        description: 'استخدم رصيدك على الفور لشراء أي جهاز جديد.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with RTL text (Arabic example).',
      },
    },
  },
  decorators: [
    (Story) => (
      <div dir="rtl">
        <Story />
      </div>
    ),
  ],
};

/**
 * With very long step descriptions.
 * Tests how the component handles longer descriptive text in steps.
 */
export const LongDescriptions: Story = {
  args: {
    sectionTitle: 'Complete Trade-In Process',
    sectionDescription: 'Our comprehensive trade-in process with detailed explanations',
    steps: [
      {
        stepNumber: 1,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="20" cy="20" r="18" stroke="#1d5ff6" strokeWidth="2" />
            <path
              d="M14 20L18 24L26 16"
              stroke="#1d5ff6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        title: 'Select Your Device',
        description:
          'Browse our comprehensive catalog of supported devices and choose the phone or tablet you want to trade in. We support most major brands including iPhone, Samsung Galaxy, Google Pixel, and many others.',
      },
      {
        stepNumber: 2,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="8" y="10" width="24" height="20" rx="2" stroke="#1d5ff6" strokeWidth="2" />
            <path d="M12 14H28" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18H28" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 22H20" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ),
        title: 'Assess Condition',
        description:
          'Answer a series of simple questions about your device condition including screen damage, functionality, battery health, and any cosmetic issues. The entire assessment takes less than 2 minutes to complete.',
      },
      {
        stepNumber: 3,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 6V34M6 20H34"
              stroke="#1d5ff6"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="20" cy="20" r="14" stroke="#1d5ff6" strokeWidth="2" />
          </svg>
        ),
        title: 'Get Instant Quote',
        description:
          'Receive your personalized trade-in value immediately based on the device and condition information you provided. Your quote is valid and locked in for 30 days, giving you time to make your decision.',
      },
      {
        stepNumber: 4,
        icon: (
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 16L20 28L32 12"
              stroke="#1d5ff6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
        title: 'Apply Your Credit',
        description:
          'Use your approved trade-in credit instantly toward any new device purchase or service plan. The credit is applied automatically at checkout, giving you immediate savings on your new purchase.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the component handles longer step descriptions.',
      },
    },
  },
};

/**
 * Minimal configuration.
 * Shows the component with only required props, using all defaults.
 */
export const Minimal: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with default props when no arguments are provided.',
      },
    },
  },
};

/**
 * All steps visible on desktop.
 * Comprehensive view showing all 4 steps clearly laid out.
 */
export const AllStepsVisible: Story = {
  args: {
    sectionTitle: 'Our Trade-In Process',
    sectionDescription: 'Simple, transparent, and fast',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Shows all 4 steps clearly visible with proper spacing and alignment.',
      },
    },
  },
};
