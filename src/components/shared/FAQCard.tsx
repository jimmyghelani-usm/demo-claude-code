import React, { useState } from 'react';
import styles from './FAQCard.module.css';

export interface FAQCardProps {
  /**
   * Question text
   */
  question: string;
  /**
   * Answer text
   */
  answer: string;
  /**
   * Whether the card is expanded by default
   */
  defaultExpanded?: boolean;
}

/**
 * FAQCard component - collapsible accordion card for FAQ section
 * White background, 1px border, 12px radius, smooth height animation
 */
export const FAQCard: React.FC<FAQCardProps> = ({ question, answer, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleExpanded();
    }
  };

  return (
    <article className={styles.faqCard}>
      <button
        className={styles.header}
        onClick={toggleExpanded}
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        type="button"
      >
        <h4 className={styles.question}>{question}</h4>
        <span className={styles.icon} aria-hidden="true">
          {isExpanded ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19" strokeWidth="2" strokeLinecap="round" />
              <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </span>
      </button>

      <div
        className={`${styles.content} ${isExpanded ? styles.expanded : ''}`}
        role="region"
        aria-hidden={!isExpanded}
      >
        <div className={styles.answer}>
          <p>{answer}</p>
        </div>
      </div>
    </article>
  );
};

FAQCard.displayName = 'FAQCard';
