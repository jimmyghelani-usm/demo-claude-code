import React, { ReactNode } from 'react';
import styles from './UsMobileTradeInHowItWorks.module.css';

/**
 * Step data interface for the Trade In "How It Works" section
 */
export interface TradeInStep {
  icon: ReactNode;
  stepNumber: number;
  title: string;
  description: string;
}

/**
 * Props for the UsMobileTradeInHowItWorks component
 */
export interface UsMobileTradeInHowItWorksProps {
  sectionTitle?: string;
  sectionDescription?: string;
  steps?: TradeInStep[];
  className?: string;
}

/**
 * UsMobileTradeInHowItWorks - Step-by-step process for the trade-in program
 *
 * Features:
 * - Section title and description
 * - 4-step process layout with numbered icons
 * - Each step includes icon, number, title, and description
 * - Blue color scheme matching Figma spec (#1d5ff6, #608ff9)
 * - Responsive grid layout (2 columns on desktop, 1 on mobile)
 * - Semantic HTML with ARIA attributes for accessibility
 * - Custom typography from Figma tokens
 * - Smooth transitions and hover effects
 */
export function UsMobileTradeInHowItWorks({
  sectionTitle = 'Simple 4-Step Process',
  sectionDescription = 'Get the best value for your device in just a few minutes',
  steps = [
    {
      stepNumber: 1,
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="20" cy="20" r="18" stroke="#1d5ff6" strokeWidth="2" />
          <path
            d="M14 20L18 24L26 16"
            stroke="#1d5ff6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Select Your Device',
      description: 'Choose the phone or tablet you want to trade in from our catalog.',
    },
    {
      stepNumber: 2,
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="8" y="10" width="24" height="20" rx="2" stroke="#1d5ff6" strokeWidth="2" />
          <path d="M12 14H28" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 18H28" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 22H20" stroke="#1d5ff6" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      title: 'Assess Condition',
      description:
        'Answer simple questions about your device condition. Takes less than 2 minutes.',
    },
    {
      stepNumber: 3,
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 6V34M6 20H34"
            stroke="#1d5ff6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="20" cy="20" r="14" stroke="#1d5ff6" strokeWidth="2" />
        </svg>
      ),
      title: 'Get Instant Quote',
      description: 'Receive your trade-in value immediately. Lock it in for 30 days.',
    },
    {
      stepNumber: 4,
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 16L20 28L32 12"
            stroke="#1d5ff6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      title: 'Apply Your Credit',
      description: 'Use your credit instantly toward any new device purchase.',
    },
  ],
  className = '',
}: UsMobileTradeInHowItWorksProps) {
  return (
    <section
      className={`${styles.section} ${className}`}
      aria-labelledby="trade-in-how-it-works-heading"
    >
      {/* Background gradient effects */}
      <div className={styles.gradientTop} aria-hidden="true" />
      <div className={styles.gradientBottom} aria-hidden="true" />

      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <h2 id="trade-in-how-it-works-heading" className={styles.sectionTitle}>
            {sectionTitle}
          </h2>
          {sectionDescription && (
            <p className={styles.sectionDescription}>{sectionDescription}</p>
          )}
        </div>

        {/* Steps Grid */}
        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <div
              key={step.stepNumber}
              className={styles.stepCard}
              role="region"
              aria-label={`Step ${step.stepNumber}: ${step.title}`}
            >
              {/* Step Number Badge */}
              <div className={styles.stepNumberBadge} aria-hidden="true">
                {step.stepNumber}
              </div>

              {/* Icon */}
              <div className={styles.iconWrapper} aria-hidden="true">
                {step.icon}
              </div>

              {/* Step Content */}
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>

              {/* Connector Line (desktop only, between cards) */}
              {step.stepNumber < steps.length && (
                <div className={styles.connector} aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
