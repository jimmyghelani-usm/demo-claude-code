import React from 'react';
import styles from './SectionHeading.module.css';

export interface SectionHeadingProps {
  /** Main heading text */
  title: string;
  /** Sub-heading or description text */
  description?: string;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Additional CSS class */
  className?: string;
}

/**
 * SectionHeading Component
 * Heading block with title and optional description for page sections
 * Features:
 * - Customizable title and description text
 * - Flexible text alignment (left, center, right)
 * - Full width responsive layout
 * - Proper typography hierarchy
 */
export function SectionHeading({
  title,
  description,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const containerClasses = [
    styles.container,
    styles[align],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
