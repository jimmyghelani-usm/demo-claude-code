import { useState, useCallback } from 'react';
import styles from './FAQSection.module.css';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  title?: string;
  items?: FAQItem[];
  className?: string;
}

const DEFAULT_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does the US Mobile Rewards Program work?',
    answer:
      'The US Mobile Rewards Program allows you to earn rewards on every purchase you make with your US Mobile Rewards card. Points accumulate with each transaction and can be redeemed for exclusive benefits, discounts, or account credits.',
  },
  {
    id: 'faq-2',
    question: 'How do I get started with referrals?',
    answer:
      'Getting started is easy! Sign up for your US Mobile account, generate your unique referral link from your dashboard, and share it with friends and family. When they sign up using your link, you both earn rewards.',
  },
  {
    id: 'faq-3',
    question: 'What is the US Mobile Rewards card?',
    answer:
      'The US Mobile Rewards card is a prepaid card that integrates with your US Mobile account. It earns rewards on every purchase, can be used anywhere Visa is accepted, and gives you convenient access to your US Mobile funds.',
  },
  {
    id: 'faq-4',
    question: 'Does it cost money to use the US Mobile Rewards card?',
    answer:
      'No, there are no monthly fees or activation fees for the US Mobile Rewards card. You only pay for what you use, and every purchase earns you rewards. Some transactions may have minimal fees as disclosed in your cardholder agreement.',
  },
  {
    id: 'faq-5',
    question: 'Is US Mobile a bank?',
    answer:
      'US Mobile is a mobile virtual network operator (MVNO), not a bank. However, we partner with leading financial institutions to provide banking services and the US Mobile Rewards card, ensuring safety and security for your transactions.',
  },
  {
    id: 'faq-6',
    question: 'Where can I use my US Mobile Rewards card?',
    answer:
      'Your US Mobile Rewards card can be used anywhere Visa is accepted worldwide. This includes online purchases, in-store transactions, ATM withdrawals, and international purchases. Check your account dashboard for the current balance and transaction history.',
  },
];

/**
 * FAQSection - Frequently Asked Questions section with accordion functionality
 *
 * Features:
 * - 2-column grid layout on desktop, responsive on mobile
 * - Accordion collapse/expand functionality
 * - Smooth transitions and animations
 * - Full keyboard navigation (Enter to toggle, Tab to navigate)
 * - ARIA attributes for accessibility (aria-expanded, aria-controls)
 * - Dark themed background with rounded corners
 * - Semantic HTML structure
 * - 1110px container width, centered on 1440px page
 */
export function FAQSection({
  title = 'Frequently asked questions',
  items = DEFAULT_ITEMS,
  className = '',
}: FAQSectionProps) {
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
        {/* Title */}
        <div className={styles.titleWrapper}>
          <h2 id="faq-title" className={styles.title}>
            {title}
          </h2>
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
                  className={styles.questionButton}
                  onClick={() => toggleItem(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                  aria-expanded={isExpanded}
                  aria-controls={answerId}
                  id={`${item.id}-button`}
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
