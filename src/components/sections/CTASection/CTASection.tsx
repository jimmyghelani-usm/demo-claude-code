import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import styles from './CTASection.module.css';

export interface CTASectionProps {
  /** Section title */
  title: string;
  /** Section description */
  description?: string;
  /** Background image URL */
  image?: string;
  /** Call-to-action button label */
  ctaLabel?: string;
  /** Call-to-action button click handler */
  onCtaClick?: () => void;
  /** Additional CSS class */
  className?: string;
}

/**
 * CTASection Component
 * Large promotional section with background image, title, description, and CTA
 * Features:
 * - Full-width responsive section
 * - Optional background image with overlay
 * - Integrated SectionHeading component
 * - Customizable call-to-action
 * - Dark theme with accent colors
 */
export function CTASection({
  title,
  description,
  image,
  ctaLabel = 'Get Started',
  onCtaClick,
  className = '',
}: CTASectionProps) {
  const sectionClasses = [styles.section, className].filter(Boolean).join(' ');

  return (
    <section className={sectionClasses}>
      <div className={styles.content}>
        <SectionHeading
          title={title}
          description={description}
          align="center"
        />

        {image && (
          <div className={styles.imageContainer}>
            <img
              src={image}
              alt=""
              className={styles.backgroundImage}
            />
            <div className={styles.overlay} />
          </div>
        )}

        {ctaLabel && (
          <button
            className={styles.ctaButton}
            onClick={onCtaClick}
            type="button"
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </section>
  );
}
