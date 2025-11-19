import React from 'react';
import styles from './IconButton.module.css';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Icon to display (can be an SVG element or emoji)
   */
  icon: React.ReactNode;
  /**
   * Accessible label for screen readers
   */
  'aria-label': string;
  /**
   * Badge count to display (optional)
   */
  badgeCount?: number;
  /**
   * Badge content to display (optional, alternative to badgeCount)
   */
  badgeContent?: React.ReactNode;
}

/**
 * IconButton component for icon-only actions
 * 35x35px dimensions as per design spec
 * Supports badge notifications
 */
export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  'aria-label': ariaLabel,
  badgeCount,
  badgeContent,
  className = '',
  ...props
}) => {
  const hasBadge = badgeCount !== undefined || badgeContent !== undefined;
  const displayBadge = badgeContent ?? (badgeCount !== undefined && badgeCount > 0 ? badgeCount : null);

  return (
    <button
      className={`${styles.iconButton} ${className}`}
      aria-label={ariaLabel}
      type="button"
      {...props}
    >
      <span className={styles.iconWrapper}>
        {icon}
        {hasBadge && displayBadge !== null && (
          <span className={styles.badge} aria-label={`${badgeCount} items`}>
            {displayBadge}
          </span>
        )}
      </span>
    </button>
  );
};

IconButton.displayName = 'IconButton';
