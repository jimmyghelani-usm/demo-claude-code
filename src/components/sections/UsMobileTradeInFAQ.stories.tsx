import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect, waitFor } from 'storybook/test';
import { UsMobileTradeInFAQ, type FAQItem } from './UsMobileTradeInFAQ';

const meta: Meta<typeof UsMobileTradeInFAQ> = {
  title: 'Sections/UsMobileTradeInFAQ',
  component: UsMobileTradeInFAQ,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FAQ section with accordion-style expand/collapse functionality for the US Mobile Trade In page. Features 2-column responsive grid layout, smooth animations, full keyboard navigation support, and comprehensive ARIA attributes for accessibility.',
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Main title for the FAQ section',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Frequently Asked Questions'" },
      },
    },
    subtitle: {
      control: { type: 'text' },
      description: 'Subtitle describing the FAQ content',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Find answers to common questions about our trade-in process'" },
      },
    },
    items: {
      control: 'object',
      description: 'Array of FAQ items with id, question, and answer',
      table: {
        type: { summary: 'FAQItem[]' },
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
type Story = StoryObj<typeof UsMobileTradeInFAQ>;

/**
 * Default story with all 6 FAQ items.
 * Shows the complete FAQ section with standard configuration.
 */
export const Default: Story = {
  args: {},
};

/**
 * Custom title and subtitle.
 * Demonstrates how different header text affects the section.
 */
export const CustomHeaders: Story = {
  args: {
    title: 'Questions About Trading In?',
    subtitle: 'Get answers to all your trade-in questions',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with custom title and subtitle.',
      },
    },
  },
};

/**
 * Without subtitle.
 * Shows how the component renders when subtitle is not provided.
 */
export const WithoutSubtitle: Story = {
  args: {
    title: 'Frequently Asked Questions',
    subtitle: '',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component without a subtitle.',
      },
    },
  },
};

/**
 * Short FAQ with 3 items.
 * Tests how the component handles fewer FAQ items.
 */
export const ShortFAQ: Story = {
  args: {
    title: 'Quick Questions',
    subtitle: 'Get answers fast',
    items: [
      {
        id: 'faq-short-1',
        question: 'What devices can I trade in?',
        answer:
          'We accept most smartphones, tablets, and smartwatches in working condition. This includes iPhones, Samsung Galaxy, Google Pixel, and other popular brands.',
      },
      {
        id: 'faq-short-2',
        question: 'How long does the evaluation process take?',
        answer:
          'Our evaluation typically takes 1-2 business days after we receive your device. You will receive a detailed report and can accept or decline the trade-in value.',
      },
      {
        id: 'faq-short-3',
        question: 'Are there any fees?',
        answer:
          'No, there are no hidden fees. We provide free prepaid shipping labels and handle all evaluation costs.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with just 3 FAQ items.',
      },
    },
  },
};

/**
 * Extended FAQ with 9 items.
 * Tests how the component handles more questions.
 */
export const ExtendedFAQ: Story = {
  args: {
    title: 'Comprehensive Trade-In Guide',
    subtitle: 'All your questions answered',
    items: [
      {
        id: 'faq-extended-1',
        question: 'What devices can I trade in?',
        answer:
          'We accept most smartphones, tablets, and smartwatches in working condition. This includes iPhones, Samsung Galaxy, Google Pixel, and other popular brands. Devices should be powered on and functional for evaluation.',
      },
      {
        id: 'faq-extended-2',
        question: 'How long does the evaluation process take?',
        answer:
          'Our evaluation typically takes 1-2 business days after we receive your device. We will inspect the device for functionality, screen condition, and physical damage. You will receive a detailed report and can accept or decline the trade-in value.',
      },
      {
        id: 'faq-extended-3',
        question: 'Can I trade in a device with damage?',
        answer:
          'Yes, we evaluate devices with minor to moderate damage. The trade-in value will be adjusted based on the extent of the damage. Significant damage like water damage or cracked screens will result in lower valuations.',
      },
      {
        id: 'faq-extended-4',
        question: 'How is the trade-in credit applied?',
        answer:
          'Once your device is evaluated and approved, the credit is applied directly to your account. You can use it toward a new device purchase, service plan, or any US Mobile products and services.',
      },
      {
        id: 'faq-extended-5',
        question: 'What if I change my mind after shipping?',
        answer:
          'You have 30 days from the evaluation date to accept or decline the trade-in offer. If you decline, we will return your device at no cost. If you accept, the credit is applied to your account immediately.',
      },
      {
        id: 'faq-extended-6',
        question: 'Are there any fees for the trade-in service?',
        answer:
          'No, there are no hidden fees. We provide free prepaid shipping labels and handle all evaluation costs. You only pay if you accept the trade-in offer.',
      },
      {
        id: 'faq-extended-7',
        question: 'How do I initiate the trade-in process?',
        answer:
          'Simply select your device model, assess its condition by answering a few questions, and receive an instant quote. If you accept, we will send you a prepaid shipping label to mail your device to us.',
      },
      {
        id: 'faq-extended-8',
        question: 'What happens if my device fails evaluation?',
        answer:
          'If your device fails our evaluation due to major damage or non-functionality, we will return it to you at no cost along with a detailed report explaining the issues.',
      },
      {
        id: 'faq-extended-9',
        question: 'Can I expedite the evaluation process?',
        answer:
          'We process evaluations in the order received. However, we do offer expedited evaluation services for an additional fee if you need faster processing.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with 9 FAQ items in a 2-column layout.',
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
    className: 'custom-faq-section',
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
    expect(section).toHaveClass('custom-faq-section');
  },
};

/**
 * Accordion interaction - single item expanded.
 * Demonstrates clicking on FAQ items to expand/collapse them.
 */
export const ExpandSingleItem: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates expanding a single FAQ item by clicking on it.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the first question button
    const buttons = canvasElement.querySelectorAll('button');
    if (buttons.length > 0) {
      const firstButton = buttons[0] as HTMLElement;

      // Click the first button to expand it
      await userEvent.click(firstButton);

      // Wait for the answer to appear
      await waitFor(() => {
        expect(firstButton).toHaveAttribute('aria-expanded', 'true');
      });
    }
  },
};

/**
 * Accordion interaction - expand and collapse.
 * Tests expanding multiple items and collapsing them.
 */
export const ExpandMultipleItems: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates expanding multiple FAQ items and shows that each can be independently controlled.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find all question buttons
    const buttons = canvasElement.querySelectorAll('button');

    // Expand first three items
    if (buttons.length >= 3) {
      await userEvent.click(buttons[0]);
      await userEvent.click(buttons[1]);
      await userEvent.click(buttons[2]);

      // Verify all three are expanded
      await waitFor(() => {
        expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
        expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
        expect(buttons[2]).toHaveAttribute('aria-expanded', 'true');
      });
    }
  },
};

/**
 * Keyboard navigation.
 * Tests keyboard interactions with the FAQ accordion.
 */
export const KeyboardNavigation: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates keyboard navigation using Tab to focus items and Enter/Space to toggle expansion.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the first question button
    const buttons = canvasElement.querySelectorAll('button');
    if (buttons.length > 0) {
      const firstButton = buttons[0] as HTMLElement;

      // Focus the button using Tab
      firstButton.focus();
      expect(firstButton).toHaveFocus();

      // Activate using Enter key
      await userEvent.keyboard('{Enter}');

      // Verify it expanded
      await waitFor(() => {
        expect(firstButton).toHaveAttribute('aria-expanded', 'true');
      });

      // Move to next button using Tab
      await userEvent.keyboard('{Tab}');
      expect(buttons[1]).toHaveFocus();
    }
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
          'Demonstrates accessibility features including semantic HTML, ARIA attributes (aria-expanded, aria-controls), role attributes, and keyboard navigation.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify section has proper aria-labelledby
    const section = canvasElement.querySelector('section');
    expect(section).toHaveAttribute('aria-labelledby', 'faq-title');

    // Verify main heading
    const mainHeading = canvas.getByRole('heading', {
      name: /Frequently Asked Questions/i,
    });
    expect(mainHeading).toHaveAttribute('id', 'faq-title');

    // Verify buttons have aria-expanded and aria-controls
    const buttons = canvasElement.querySelectorAll('button');
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded');
      expect(button).toHaveAttribute('aria-controls');
      expect(button).toHaveAttribute('type', 'button');
    });

    // Expand first item and verify answer region
    if (buttons.length > 0) {
      await userEvent.click(buttons[0]);

      const answerId = buttons[0].getAttribute('aria-controls');
      if (answerId) {
        const answerRegion = canvasElement.querySelector(`#${answerId}`);
        expect(answerRegion).toHaveAttribute('role', 'region');
      }
    }
  },
};

/**
 * RTL (Right-to-Left) language support.
 * Shows how the component handles RTL text direction.
 */
export const RTLSupport: Story = {
  args: {
    title: 'الأسئلة الشائعة',
    subtitle: 'العثور على إجابات لأسئلتك حول عملية المقايضة',
    items: [
      {
        id: 'rtl-faq-1',
        question: 'ما الأجهزة التي يمكنني استبدالها؟',
        answer:
          'نحن نقبل معظم الهواتف الذكية والأجهزة اللوحية والساعات الذكية في حالة عمل. يتضمن ذلك iPhones و Samsung Galaxy و Google Pixel وعلامات تجارية شهيرة أخرى.',
      },
      {
        id: 'rtl-faq-2',
        question: 'كم يستغرق عملية التقييم؟',
        answer:
          'عادة ما يستغرق تقييمنا يوم إلى يومي عمل بعد استلام جهازك. ستتلقى تقرير مفصل ويمكنك قبول أو رفض قيمة المقايضة.',
      },
      {
        id: 'rtl-faq-3',
        question: 'هل توجد رسوم مخفية؟',
        answer:
          'لا، لا توجد رسوم مخفية. نوفر ملصقات شحن مدفوعة مسبقاً مجاناً ونتولى جميع تكاليف التقييم.',
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
 * With very long answers.
 * Tests how the component handles longer answer text.
 */
export const LongAnswers: Story = {
  args: {
    title: 'Detailed Trade-In Guide',
    subtitle: 'Comprehensive answers to all your questions',
    items: [
      {
        id: 'long-faq-1',
        question: 'What is your complete trade-in process?',
        answer:
          'Our trade-in process is designed to be simple and transparent. First, you select your device from our comprehensive catalog. Second, you answer a few quick questions about your device condition including screen condition, functionality, and any damage. Third, you receive an instant quote that is locked in for 30 days. Fourth, if you accept, we send you a prepaid shipping label to mail your device. Finally, our team evaluates your device within 1-2 business days and processes your credit. The entire process is designed to give you the best value with minimal hassle.',
      },
      {
        id: 'long-faq-2',
        question: 'What happens if my device has damage?',
        answer:
          'We accept devices with minor to moderate damage. Our evaluation team carefully inspects each device for functionality, screen condition, physical damage, and battery health. If your device has damage, the trade-in value will be adjusted accordingly. For example, a cracked screen or minor dents will reduce the value, but we will still provide a quote. Devices with severe water damage or completely non-functional components may be declined, in which case we will return your device at no cost. We are transparent about our evaluation process and provide detailed reports so you understand exactly why your device received its valuation.',
      },
      {
        id: 'long-faq-3',
        question: 'How can I maximize my trade-in value?',
        answer:
          'To get the best trade-in value, keep your device in the best condition possible. This means avoiding physical damage, keeping the screen clean and uncracked, maintaining good battery health, and ensuring all functions work properly. When assessing your device during the trade-in process, be honest about any issues as this helps us provide an accurate quote. Keep your original packaging and accessories if possible, as these can increase the value. Additionally, trading in your device sooner rather than later is beneficial as older devices generally have lower values. Finally, compare our trade-in values with other options to ensure you are getting a competitive offer.',
      },
      {
        id: 'long-faq-4',
        question: 'What happens to my device after I trade it in?',
        answer:
          'After we receive your device and complete our evaluation, your trade-in credit is applied to your account. Your actual device goes through our refurbishment process where we clean, inspect, and test all components thoroughly. We then either resell the device as a certified refurbished unit or responsibly recycle it if it cannot be resold. We are committed to environmental responsibility and ensure that all devices are handled according to proper e-waste recycling standards. Our refurbished devices help reduce electronic waste and provide affordable options for other customers.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates how the component handles longer answer text.',
      },
    },
  },
};

/**
 * With varied question lengths.
 * Tests how the component handles different question lengths.
 */
export const VariedQuestionLengths: Story = {
  args: {
    title: 'Frequently Asked Questions',
    subtitle: 'Find answers to common questions',
    items: [
      {
        id: 'varied-1',
        question: 'How?',
        answer: 'We have a simple 4-step process that takes just minutes to complete.',
      },
      {
        id: 'varied-2',
        question: 'What devices do you accept?',
        answer: 'We accept most smartphones, tablets, and smartwatches in working condition.',
      },
      {
        id: 'varied-3',
        question: 'How long does it take for you to evaluate my device and provide a trade-in valuation?',
        answer:
          'Our evaluation typically takes 1-2 business days after we receive your device. You will receive a detailed report.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component with questions of varying lengths.',
      },
    },
  },
};

/**
 * Empty FAQ list.
 * Shows how the component handles when no FAQ items are provided.
 */
export const EmptyFAQ: Story = {
  args: {
    title: 'Frequently Asked Questions',
    subtitle: 'We will add common questions here',
    items: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the component when no FAQ items are provided.',
      },
    },
  },
};

/**
 * Trading-specific FAQ content.
 * Shows realistic trade-in related FAQ items.
 */
export const TradeInSpecific: Story = {
  args: {
    title: 'Trade-In Process Questions',
    subtitle: 'Everything you need to know about trading in your device',
    items: [
      {
        id: 'tradein-1',
        question: 'Can I lock in a trade-in value without shipping my device immediately?',
        answer:
          'Yes! Once you receive your quote, it is locked in for 30 days. You can take your time deciding whether to proceed with the trade-in.',
      },
      {
        id: 'tradein-2',
        question: 'What if the evaluation changes my quoted value?',
        answer:
          'If during physical evaluation we find issues not apparent in your initial assessment, we will notify you with the adjusted value. You can accept the new value or decline and we will return your device.',
      },
      {
        id: 'tradein-3',
        question: 'Do you accept international devices?',
        answer:
          'We primarily accept devices from the US market. International devices may have different carrier locks or specifications that affect compatibility.',
      },
      {
        id: 'tradein-4',
        question: 'Can I trade in multiple devices at once?',
        answer:
          'Absolutely! You can trade in multiple devices. Simply go through the process for each device and combine the credits toward your purchase.',
      },
      {
        id: 'tradein-5',
        question: 'Is the trade-in credit refundable?',
        answer:
          'Once you accept the trade-in offer and your device is evaluated, the credit is applied to your account. Credits must be used within a specified timeframe according to our terms.',
      },
      {
        id: 'tradein-6',
        question: 'What payment methods do you accept for the remaining balance?',
        answer:
          'We accept all major credit cards, debit cards, PayPal, and bank transfers. All transactions are secure and encrypted.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows trade-in specific FAQ items with realistic scenarios.',
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
 * Interactive demo with all items.
 * Shows all items with one pre-expanded for demonstration.
 */
export const InteractiveDemo: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Interactive demonstration with initial focus on the first FAQ item.',
      },
    },
  },
  play: async ({ canvasElement }) => {
    // Set focus on first button to show it's interactive
    const buttons = canvasElement.querySelectorAll('button');
    if (buttons.length > 0) {
      (buttons[0] as HTMLElement).focus();
    }
  },
};
