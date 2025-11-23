import React from 'react';
import styles from './TextInput.module.css';

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input field label */
  label: string;
  /** Placeholder text */
  placeholder?: string;
  /** Error message to display */
  error?: string;
  /** Additional CSS class */
  className?: string;
  /** Show error state */
  hasError?: boolean;
}

/**
 * TextInput Component
 * Reusable text input field with label and validation states
 * Supports default, focus, filled, error, and disabled states
 */
export function TextInput({
  label,
  placeholder,
  error,
  className = '',
  hasError = false,
  disabled = false,
  id,
  ...props
}: TextInputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const showError = hasError || Boolean(error);

  const containerClasses = [styles.container, className]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    styles.input,
    showError && styles.error,
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input
        id={inputId}
        className={inputClasses}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={showError}
        aria-describedby={showError ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-error`} className={styles.errorMessage}>
          {error}
        </span>
      )}
    </div>
  );
}
