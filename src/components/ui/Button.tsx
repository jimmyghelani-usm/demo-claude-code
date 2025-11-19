import React from 'react';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant of the button
   */
  variant?: 'primary' | 'secondary' | 'text';
  /**
   * Size of the button
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Content to display inside the button
   */
  children: React.ReactNode;
  /**
   * Whether the button is disabled
   */
  disabled?: boolean;
  /**
   * Full width button
   */
  fullWidth?: boolean;
}

/**
 * Button component with multiple variants and sizes
 * Implements accessible button with proper hover, focus, and active states
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={classes} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

Button.displayName = 'Button';
