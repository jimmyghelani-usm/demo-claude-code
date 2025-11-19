import React from 'react';
import { StepCard } from '../shared';
import styles from './HowItWorksSection.module.css';

/**
 * HowItWorksSection component - displays 3-step process and video placeholder
 * Shows how US Mobile Trade In works with step cards and demo video
 */
export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      stepNumber: 1,
      title: 'Check trade in value',
      description:
        'Answer a few questions about your device to get an instant quote. No commitments required.',
      icon: '✓',
    },
    {
      stepNumber: 2,
      title: 'Ship your device',
      description:
        "Pack up your device and ship it to us for free. We'll send you a prepaid shipping label.",
      icon: '📦',
    },
    {
      stepNumber: 3,
      title: 'Get Paid',
      description:
        "Once we receive and verify your device, you'll get paid via your preferred method within 2-3 business days.",
      icon: '💵',
    },
  ];

  return (
    <section className={styles.howItWorks}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.heading}>How does US Mobile Trade In work?</h2>
          <p className={styles.subheading}>Just three steps between you and that $$$.</p>
        </header>

        <div className={styles.steps}>
          {steps.map((step) => (
            <StepCard
              key={step.stepNumber}
              stepNumber={step.stepNumber}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>

        <div className={styles.videoContainer}>
          <button
            className={styles.videoPlaceholder}
            aria-label="Play trade in demo video"
            onClick={() => {}}
          >
            <div className={styles.videoThumbnail}>
              <svg
                width="946"
                height="478"
                viewBox="0 0 946 478"
                fill="none"
                aria-hidden="true"
              >
                <rect width="946" height="478" rx="32" fill="#D2DFFD" />
                <rect x="100" y="100" width="746" height="278" rx="8" fill="#FFFFFF" opacity="0.1" />
              </svg>
              <div className={styles.playButton}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="32" fill="#1D5FF6" />
                  <path d="M26 20L44 32L26 44V20Z" fill="white" />
                </svg>
              </div>
              <span className={styles.videoLabel}>Watch how it works</span>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

HowItWorksSection.displayName = 'HowItWorksSection';
