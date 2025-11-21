import React, { ReactNode } from 'react';
import styles from './HowItWorksSection.module.css';

/**
 * Step data interface for the "How It Works" section
 */
export interface HowItWorksStep {
  icon: ReactNode;
  title: string;
  description: string;
}

/**
 * Props for the HowItWorksSection component
 */
export interface HowItWorksSectionProps {
  sectionTitle?: string;
  steps?: HowItWorksStep[];
  rightColumnContent?: ReactNode;
  className?: string;
}

/**
 * HowItWorksSection - Two-column layout showcasing referral program steps
 *
 * Features:
 * - Section title: "How Our Referral Program Works"
 * - Left column: 3 numbered steps with icons, titles, and descriptions
 * - Right column: Rounded rectangle container with custom visual element
 * - Dark rounded background container
 * - Container width: 1110px, centered on 1440px page
 * - Step styling: Icon (32x32), title (28px), description text below
 * - Spacing: 165px padding, 100px top margin
 * - Fully responsive design
 * - Accessible with semantic HTML and ARIA attributes
 */
export function HowItWorksSection({
  sectionTitle = 'How Our Referral Program Works',
  steps = [
    {
      icon: <div className={styles.placeholderIcon} aria-hidden="true">1</div>,
      title: 'Share your link',
      description: 'Get your unique referral link and share it with friends and colleagues.',
    },
    {
      icon: <div className={styles.placeholderIcon} aria-hidden="true">2</div>,
      title: 'Your friend signs up and...',
      description: 'They complete their first task or purchase using your referral link.',
    },
    {
      icon: <div className={styles.placeholderIcon} aria-hidden="true">3</div>,
      title: 'You both get rewarded',
      description: 'Earn rewards instantly and watch your earnings grow with every referral.',
    },
  ],
  rightColumnContent = (
    <div className={styles.placeholderImage} aria-hidden="true">
      <svg width="200" height="200" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="80" fill="#1d5ff6" opacity="0.1" />
        <circle cx="100" cy="100" r="60" fill="#608ff9" opacity="0.2" />
        <circle cx="100" cy="100" r="40" fill="#608ff9" opacity="0.3" />
        <circle cx="100" cy="100" r="20" fill="#1d5ff6" />
      </svg>
    </div>
  ),
  className = '',
}: HowItWorksSectionProps) {
  return (
    <section
      className={`${styles.section} ${className}`}
      aria-labelledby="how-it-works-heading"
    >
      {/* Background blur effects */}
      <div className={styles.gradientTop} aria-hidden="true" />
      <div className={styles.gradientBottom} aria-hidden="true" />

      <div className={styles.container}>
        {/* Section title */}
        <h2 id="how-it-works-heading" className={styles.sectionTitle}>
          {sectionTitle}
        </h2>

        {/* Main content grid */}
        <div className={styles.content}>
          {/* Left column - Steps */}
          <div className={styles.stepsContainer}>
            {steps.map((step, index) => (
              <div
                key={index}
                className={styles.step}
                role="region"
                aria-label={`Step ${index + 1}: ${step.title}`}
              >
                {/* Icon */}
                <div className={styles.iconWrapper} aria-hidden="true">
                  {step.icon}
                </div>

                {/* Step content */}
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right column - Visual element */}
          <div className={styles.rightColumn}>
            <div className={styles.visualContainer}>{rightColumnContent}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
