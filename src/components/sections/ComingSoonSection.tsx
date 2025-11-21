import React, { useState, FormEvent } from 'react';
import styles from './ComingSoonSection.module.css';

export interface ComingSoonSectionProps {
  /** Badge text displayed above the heading */
  badge?: string;
  /** Main heading text */
  heading: string;
  /** Description text below the heading */
  description: string;
  /** Input placeholder text */
  placeholder?: string;
  /** Submit button text */
  buttonText?: string;
  /** Form submit handler that receives the email address */
  onSubmit?: (email: string) => void;
}

/**
 * ComingSoonSection component - Email capture section for upcoming features
 *
 * Design Specifications (FE-432):
 * - Desktop: 1440px × 704px container, 600px blue banner
 * - Mobile: 375px × 592px, full bleed design
 * - Background: #1D5FF6 (primary blue)
 * - Typography: GT Walsheim Pro font family
 * - White text with centered alignment
 * - Email input with validation
 * - Decorative circle element at top
 * - Responsive design with mobile-first approach
 *
 * Features:
 * - Email format validation
 * - Accessible form with proper labels
 * - Touch-friendly targets (50px height)
 * - Keyboard navigation support
 * - WCAG 2.1 AA compliant
 */
export const ComingSoonSection: React.FC<ComingSoonSectionProps> = ({
  badge = 'Desed risus!',
  heading = 'Lorem ipsum dolor sit amet com!',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor, Color sit amet, consectetur adipiscing elit, sed do eiusmod tempor.',
  placeholder = 'Enter your email address',
  buttonText = 'Notify me',
  onSubmit,
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string): boolean => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Call onSubmit callback if provided
    if (onSubmit) {
      onSubmit(email);
    }

    // Reset form on successful submission
    setEmail('');
  };

  return (
    <section className={styles.comingSoon} aria-labelledby="coming-soon-heading">
      <div className={styles.container}>
        {/* Decorative circle element */}
        <div className={styles.decorativeCircle} aria-hidden="true" />

        <div className={styles.content}>
          {/* Badge */}
          {badge && (
            <div className={styles.badge} aria-label="Feature category">
              {badge}
            </div>
          )}

          {/* Heading */}
          <h2 id="coming-soon-heading" className={styles.heading}>
            {heading}
          </h2>

          {/* Decorative line */}
          <div className={styles.decorativeLine} aria-hidden="true" />

          {/* Description */}
          <p className={styles.description}>{description}</p>

          {/* Email capture form */}
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.inputWrapper}>
              <label htmlFor="email-input" className={styles.visuallyHidden}>
                Email address
              </label>
              <input
                id="email-input"
                type="email"
                className={styles.emailInput}
                placeholder={placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error}
                aria-describedby={error ? 'email-error' : undefined}
                required
              />
              {error && (
                <span id="email-error" className={styles.error} role="alert">
                  {error}
                </span>
              )}
            </div>

            <button type="submit" className={styles.submitButton}>
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

ComingSoonSection.displayName = 'ComingSoonSection';
