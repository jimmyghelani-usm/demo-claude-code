import React from 'react';
import styles from './FeatureCard.module.css';

export interface FeatureCardProps {
  /** Icon component or SVG element */
  icon: React.ReactNode;
  /** Card title */
  title: string;
  /** Card description text */
  description: string;
  /** Background color for icon container */
  iconBackgroundColor?: string;
  /** Additional CSS class */
  className?: string;
}

/**
 * FeatureCard Component
 * Card component for displaying features with icon, title, and description
 * Features:
 * - Icon container with customizable background color
 * - Title and description text
 * - Hover effect with background and shadow changes
 * - Fully responsive
 */
export function FeatureCard({
  icon,
  title,
  description,
  iconBackgroundColor = '#608ff9',
  className = '',
}: FeatureCardProps) {
  const cardClasses = [styles.card, className].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} role="article" aria-label={title}>
      <div
        className={styles.iconContainer}
        style={{ backgroundColor: iconBackgroundColor }}
      >
        {icon}
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}
