import React, { useState } from 'react';
import styles from './FAQAccordion.module.css';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  columns?: number;
}

/**
 * FAQAccordion Component
 * Expandable FAQ cards with accordion behavior
 * Features:
 * - Individual card state management
 * - Smooth height transitions
 * - Rotating chevron icon
 * - Two-column layout support
 * - Accessibility with aria-expanded and aria-controls
 */
export function FAQAccordion({ items, columns = 2 }: FAQAccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const leftItems = items.slice(0, Math.ceil(items.length / 2));
  const rightItems = items.slice(Math.ceil(items.length / 2));

  const renderCards = (cardItems: FAQItem[]) =>
    cardItems.map((item) => (
      <button
        key={item.id}
        className={`${styles.card} ${
          expandedId === item.id ? styles.expanded : ''
        }`}
        onClick={() => toggleCard(item.id)}
        aria-expanded={expandedId === item.id}
        aria-controls={`faq-answer-${item.id}`}
        type="button"
      >
        <div className={styles.cardHeader}>
          <h3 className={styles.question}>{item.question}</h3>
          <div className={styles.chevron} aria-hidden="true">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6.5L8.5 11L13 6.5"
                stroke="#1d5ff6"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {expandedId === item.id && (
          <div
            className={styles.cardAnswer}
            id={`faq-answer-${item.id}`}
            role="region"
          >
            <p>{item.answer}</p>
          </div>
        )}
      </button>
    ));

  if (columns === 1) {
    return (
      <div className={styles.container}>
        <div className={styles.column}>{renderCards(items)}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.twoColumns}>
        <div className={styles.column}>{renderCards(leftItems)}</div>
        <div className={styles.column}>{renderCards(rightItems)}</div>
      </div>
    </div>
  );
}
