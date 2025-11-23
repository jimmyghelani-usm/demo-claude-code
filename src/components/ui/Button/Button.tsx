import React from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button text label */
  label: string;
  /** Button style variant */
  variant?: ButtonVariant;
  /** Optional icon component to display */
  icon?: React.ReactNode;
  /** Disable the button */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Button Component
 * Reusable button with primary and secondary variants
 * - Primary: White background with blue text
 * - Secondary: Transparent background with white border
 */
export function Button({
  label,
  variant = 'primary',
  icon,
  disabled = false,
  className = '',
  ...props
}: ButtonProps) {
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
      {...props}
      aria-disabled={disabled}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.label}>{label}</span>
    </button>
  );
}
