import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  shadow?: 'sm' | 'md' | 'lg';
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

/**
 * Card Component
 * Base card container with flexible styling
 * Features:
 * - Adjustable shadow levels
 * - Configurable padding
 * - Optional click handler
 * - Responsive design
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  shadow = 'md',
  padding = 'md',
  onClick,
}) => {
  return (
    <div
      className={`${styles.card} ${styles[`shadow-${shadow}`]} ${styles[`padding-${padding}`]} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};
