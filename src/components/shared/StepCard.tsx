import React from 'react';
import styles from './StepCard.module.css';

export interface StepCardProps {
  /**
   * Step number (1, 2, or 3)
   */
  stepNumber: number;
  /**
   * Title of the step
   */
  title: string;
  /**
   * Description text for the step
   */
  description: string;
  /**
   * Icon to display (can be an SVG element, emoji, or image)
   */
  icon: React.ReactNode | string;
}

/**
 * StepCard component for displaying trade-in process steps
 * 311px width, center-aligned, with icon, step label, title, and description
 */
export const StepCard: React.FC<StepCardProps> = ({ stepNumber, title, description, icon }) => {
  const isStringIcon = typeof icon === 'string';

  return (
    <article className={styles.stepCard}>
      <div className={styles.iconContainer} aria-hidden="true">
        {isStringIcon ? <span className={styles.iconText}>{icon}</span> : icon}
      </div>

      <div className={styles.stepLabel}>Step {stepNumber}</div>

      <h3 className={styles.title}>{title}</h3>

      <p className={styles.description}>{description}</p>
    </article>
  );
};

StepCard.displayName = 'StepCard';
