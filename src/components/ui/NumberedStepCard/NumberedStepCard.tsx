import React from 'react';
import styles from './NumberedStepCard.module.css';

export interface NumberedStepCardProps {
  /** Step number to display in badge */
  stepNumber: number;
  /** Step title */
  title: string;
  /** Step description */
  description: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * NumberedStepCard Component
 * Card for displaying numbered steps in a process (e.g., entry form steps)
 * Features:
 * - Numbered badge with step number
 * - Title and description text
 * - Clean, simple layout
 * - Responsive design
 */
export function NumberedStepCard({
  stepNumber,
  title,
  description,
  className = '',
}: NumberedStepCardProps) {
  const cardClasses = [styles.card, className].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} role="article" aria-label={`Step ${stepNumber}: ${title}`}>
      <div className={styles.badge} aria-hidden="true">
        {stepNumber}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
