import React from 'react';
import styles from './IconButton.module.css';

export type IconButtonVariant = 'outlined' | 'filled' | 'ghost';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon component or SVG element */
  icon: React.ReactNode;
  /** Button style variant */
  variant?: IconButtonVariant;
  /** Accessible label for the button */
  ariaLabel: string;
  /** Disable the button */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * IconButton Component
 * Circular button with icon for actions like chat, favorites, etc.
 * Supports outlined, filled, and ghost variants with hover and active states
 */
export function IconButton({
  icon,
  variant = 'outlined',
  ariaLabel,
  disabled = false,
  className = '',
  ...props
}: IconButtonProps) {
  const buttonClasses = [
    styles.button,
    styles[variant],
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled}
      type="button"
      aria-label={ariaLabel}
      aria-disabled={disabled}
      {...props}
    >
      <span className={styles.iconContainer}>{icon}</span>
    </button>
  );
}
