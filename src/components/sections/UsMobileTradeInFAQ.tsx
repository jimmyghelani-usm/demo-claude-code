import { useState, useCallback } from 'react';
import styles from './UsMobileTradeInFAQ.module.css';

/**
 * Represents a single FAQ item with question and answer
 */
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

/**
 * Props for the UsMobileTradeInFAQ component
 */
export interface UsMobileTradeInFAQProps {
  title?: string;
  subtitle?: string;
  items?: FAQItem[];
  className?: string;
}

const DEFAULT_ITEMS: FAQItem[] = [
  {
    id: 'trade-in-faq-1',
    question: 'What devices can I trade in?',
    answer:
      'We accept most smartphones, tablets, and smartwatches in working condition. This includes iPhones, Samsung Galaxy, Google Pixel, and other popular brands. Devices should be powered on and functional for evaluation.',
  },
  {
    id: 'trade-in-faq-2',
    question: 'How long does the evaluation process take?',
    answer:
      'Our evaluation typically takes 1-2 business days after we receive your device. We will inspect the device for functionality, screen condition, and physical damage. You will receive a detailed report and can accept or decline the trade-in value.',
  },
  {
    id: 'trade-in-faq-3',
    question: 'Can I trade in a device with damage?',
    answer:
      'Yes, we evaluate devices with minor to moderate damage. The trade-in value will be adjusted based on the extent of the damage. Significant damage like water damage or cracked screens will result in lower valuations.',
  },
  {
    id: 'trade-in-faq-4',
    question: 'How is the trade-in credit applied?',
    answer:
      'Once your device is evaluated and approved, the credit is applied directly to your account. You can use it toward a new device purchase, service plan, or any US Mobile products and services.',
  },
  {
    id: 'trade-in-faq-5',
    question: 'What if I change my mind after shipping?',
    answer:
      'You have 30 days from the evaluation date to accept or decline the trade-in offer. If you decline, we will return your device at no cost. If you accept, the credit is applied to your account immediately.',
  },
  {
    id: 'trade-in-faq-6',
    question: 'Are there any fees for the trade-in service?',
    answer:
      'No, there are no hidden fees. We provide free prepaid shipping labels and handle all evaluation costs. You only pay if you accept the trade-in offer.',
  },
];

/**
 * UsMobileTradeInFAQ - FAQ section with accordion functionality for Trade In page
 *
 * Features:
 * - Accordion-style expand/collapse for each FAQ item
 * - 2-column responsive grid layout
 * - Smooth animations on expand/collapse
 * - Full keyboard navigation support
 * - Comprehensive ARIA attributes for accessibility
 * - Mobile-responsive design with single column on smaller screens
 * - Customizable title, subtitle, and FAQ items
 * - Semantic HTML structure
 */
export function UsMobileTradeInFAQ({
  title = 'Frequently Asked Questions',
  subtitle = 'Find answers to common questions about our trade-in process',
  items = DEFAULT_ITEMS,
  className = '',
}: UsMobileTradeInFAQProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleItem = useCallback((id: string) => {
    setExpandedIds((prevSet) => {
      const newSet = new Set(prevSet);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, id: string) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleItem(id);
      }
    },
    [toggleItem]
  );

  return (
    <section
      className={`${styles.section} ${className}`}
      aria-labelledby="faq-title"
    >
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.header}>
          <h2 id="faq-title" className={styles.title}>
            {title}
          </h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>

        {/* FAQ Grid */}
        <div className={styles.grid}>
          {items.map((item) => {
            const isExpanded = expandedIds.has(item.id);
            const answerId = `${item.id}-answer`;

            return (
              <div key={item.id} className={styles.item}>
                {/* Question Button */}
                <button
                  className={`${styles.questionButton} ${
                    isExpanded ? styles.questionButtonExpanded : ''
                  }`}
                  onClick={() => toggleItem(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                  aria-expanded={isExpanded}
                  aria-controls={answerId}
                  id={`${item.id}-button`}
                  type="button"
                >
                  <span className={styles.questionText}>{item.question}</span>
                  <span
                    className={`${styles.icon} ${
                      isExpanded ? styles.iconExpanded : ''
                    }`}
                    aria-hidden="true"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer Content */}
                {isExpanded && (
                  <div
                    id={answerId}
                    className={styles.answerWrapper}
                    role="region"
                    aria-labelledby={`${item.id}-button`}
                  >
                    <p className={styles.answerText}>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
