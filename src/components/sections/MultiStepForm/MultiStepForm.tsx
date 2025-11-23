import React, { useState } from 'react';
import styles from './MultiStepForm.module.css';

interface Step {
  stepNumber: number;
  title: string;
  description: string;
}

interface MultiStepFormProps {
  steps?: Step[];
  onStepChange?: (stepNumber: number) => void;
  className?: string;
}

/**
 * MultiStepForm - Multi-step process section for the giveaway entry
 *
 * Features:
 * - 3-step process visualization
 * - Step 1: Entry form (account creation)
 * - Step 2: Plan selection with pricing cards (glassmorphic with backdrop blur)
 * - Step 3: Confirmation with image and description
 * - Step indicator with progress bar
 * - Mobile-first responsive design
 * - Semantic HTML with ARIA labels
 */
export function MultiStepForm({
  steps = [
    {
      stepNumber: 1,
      title: 'Fill Out the Entry Form',
      description: 'Fill out the entry form on the right with your social media handle and agree to the terms. We\'ll announce the winner on Cyber(truck) Monday, December 2, 2024.'
    },
    {
      stepNumber: 2,
      title: 'Activate a US Mobile Line',
      description: 'Make sure your US Mobile line is on a paid plan by September 30, 2024, and keep it active through December 2, 2024. If you\'re already on a paid plan, you\'re all set! (Snooze and Custom plans don\'t count.)'
    },
    {
      stepNumber: 3,
      title: 'Post Your Guess',
      description: 'Watch the video and guess how many SIM cards are in the pool. Post your guess on our social media with the hashtag #USMobileSweepstakes. The closest guess submitted first wins.'
    }
  ],
  onStepChange,
  className = ''
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    const nextStep = Math.min(currentStep + 1, steps.length - 1);
    setCurrentStep(nextStep);
    onStepChange?.(nextStep + 1);
  };

  const handlePrevStep = () => {
    const prevStep = Math.max(currentStep - 1, 0);
    setCurrentStep(prevStep);
    onStepChange?.(prevStep + 1);
  };

  const currentStepData = steps[currentStep];

  return (
    <section
      className={`${styles.multiStepForm} ${className}`}
      aria-labelledby="form-title"
    >
      <div className={styles.container}>
        {/* Progress Indicator */}
        <div className={styles.progressSection}>
          <h2 id="form-title" className={styles.formTitle}>
            First, let's create your account!
          </h2>

          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`
              }}
              role="progressbar"
              aria-valuenow={currentStep + 1}
              aria-valuemin={1}
              aria-valuemax={steps.length}
              aria-label="Form completion progress"
            />
          </div>

          <p className={styles.stepIndicator}>
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Step Content */}
        <div className={styles.stepContent}>
          <div className={styles.stepInfo}>
            <div className={styles.stepNumber}>{currentStepData.stepNumber}</div>
            <h3 className={styles.stepTitle}>{currentStepData.title}</h3>
            <p className={styles.stepDescription}>{currentStepData.description}</p>
          </div>

          {/* Form Fields - Step 1 */}
          {currentStep === 0 && (
            <div className={styles.formFields}>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label htmlFor="firstName" className={styles.label}>First name</label>
                  <input
                    id="firstName"
                    type="text"
                    className={styles.input}
                    placeholder="Jason"
                    defaultValue="Jason"
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="lastName" className={styles.label}>Last name</label>
                  <input
                    id="lastName"
                    type="text"
                    className={styles.input}
                    placeholder="Bourne"
                    defaultValue="Bourne"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="phone" className={styles.label}>Phone number</label>
                <input
                  id="phone"
                  type="tel"
                  className={styles.input}
                  placeholder="555-555-5555"
                  defaultValue="555-555"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>Email address</label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  placeholder="jason.bourne@spy.net"
                  defaultValue="jason.bourne@spy.net"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="password" className={styles.label}>Password</label>
                <input
                  id="password"
                  type="password"
                  className={styles.input}
                  placeholder="Make it a good one!"
                  defaultValue="Make it a good one!"
                />
              </div>
            </div>
          )}

          {/* Plan Selection - Step 2 */}
          {currentStep === 1 && (
            <div className={styles.plansGrid}>
              <div className={styles.plan}>
                <h4 className={styles.planName}>Unlimited</h4>
                <p className={styles.planDesc}>Premium Data</p>
                <p className={styles.planDesc}>Unlimited Talk & Text</p>
                <div className={styles.price}>
                  <span className={styles.pricePrefix}>as low as</span>
                  <span className={styles.priceValue}>$17.5</span>
                  <span className={styles.priceSuffix}>per month</span>
                </div>
              </div>

              <div className={styles.plan}>
                <h4 className={styles.planName}>By the Gig</h4>
                <p className={styles.planDesc}>5 GB Shareable Data</p>
                <p className={styles.planDesc}>Unlimited Talk & Text</p>
                <div className={styles.price}>
                  <span className={styles.pricePrefix}>from</span>
                  <span className={styles.priceValue}>$15</span>
                  <span className={styles.priceSuffix}>per month</span>
                </div>
              </div>

              <div className={styles.plan}>
                <h4 className={styles.planName}>Light</h4>
                <p className={styles.planDesc}>2 GB Premium Data</p>
                <p className={styles.planDesc}>Unlimited Talk & Text</p>
                <div className={styles.price}>
                  <span className={styles.pricePrefix}>as low as</span>
                  <span className={styles.priceValue}>$8</span>
                  <span className={styles.priceSuffix}>per month</span>
                </div>
              </div>

              <div className={styles.plan}>
                <h4 className={styles.planName}>Light</h4>
                <p className={styles.planDesc}>2 GB Premium Data</p>
                <p className={styles.planDesc}>Unlimited Talk & Text</p>
                <div className={styles.price}>
                  <span className={styles.pricePrefix}>as low as</span>
                  <span className={styles.priceValue}>$8</span>
                  <span className={styles.priceSuffix}>per month</span>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation - Step 3 */}
          {currentStep === 2 && (
            <div className={styles.confirmationContent}>
              <p className={styles.confirmMessage}>
                You're all set! Your entry has been submitted for the US Mobile Cybertruck Giveaway.
                Keep an eye on your email and our social channels for updates!
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <button
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className={styles.secondaryButton}
            aria-label="Go to previous step"
          >
            Back
          </button>

          <button
            onClick={handleNextStep}
            disabled={currentStep === steps.length - 1}
            className={styles.primaryButton}
            aria-label="Go to next step"
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    </section>
  );
}
