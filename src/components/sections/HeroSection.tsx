import React from 'react';
import styles from './HeroSection.module.css';

/**
 * HeroSection component - Updated to match Figma design FE-426
 * Layout: Two-column with content on left and image placeholder on right
 * Background: #759FFF (light blue)
 * Typography: GT Walsheim Pro font family
 * Includes badge, headline with decorative underline, subheadline, description, and CTA button
 */
export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Badge component */}
          <span className={styles.badge} role="status" aria-label="Announcement">
            Agna liqua!
          </span>

          {/* Main headline with decorative underline */}
          <div className={styles.headlineGroup}>
            <h1 id="hero-heading" className={styles.headline}>
              At auctor urna nunci
            </h1>
            <svg
              className={styles.underline}
              width="213"
              height="7"
              viewBox="0 0 213 7"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M1 5.5C71 1.5 142 1.5 212 5.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Subheadline */}
          <p className={styles.subheadline}>Lorem ipsum dolor sit amet, consectetur adi</p>

          {/* Description text */}
          <p className={styles.description}>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac placerat
            vestibulum lectus mauris.
          </p>

          {/* CTA Button */}
          <button className={styles.ctaButton} type="button">
            <span className={styles.buttonText}>Check trade-in value</span>
            <svg
              className={styles.buttonIcon}
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Image placeholder */}
        <div className={styles.imagePlaceholder} role="img" aria-label="Product showcase image">
          <div className={styles.placeholderContent}>
            <span className={styles.placeholderText}>Image Placeholder</span>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';
