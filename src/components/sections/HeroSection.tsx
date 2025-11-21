import React from 'react';
import styles from './HeroSection.module.css';

/**
 * HeroSection component - Updated to match Figma design node 1413:13347
 *
 * Figma Reference:
 * - Desktop: node-id 1413:13347 (1440px × 615px, centered content)
 *
 * Layout:
 * - Desktop: Centered content with 680px max width
 * - Mobile: Single-column centered content with responsive padding
 *
 * Design Specifications (node 1413:13347):
 * - Container: 1440px × 615px
 * - Hero Content Area: 680px width (centered)
 * - Background: #1A5DF6 (primary blue)
 * - Heading: 52px/54px, Letter Spacing: -1.2px, Color: #FFFFFF
 * - Font: GT Walsheim Pro Bold
 * - Description: 24px/30px, Color: #FFFFFF
 * - CTA Button: 162px × 50px, Border Radius: 15px
 * - Button: White background, #1A5DF6 text, Bold 16px
 * - Spacing: 36px vertical gap between elements, 4px between heading/subheading
 *
 * Features:
 * - Background: #1A5DF6 (primary blue)
 * - Typography: GT Walsheim Pro font family
 * - White text throughout
 * - CTA button: white background with blue text
 * - WCAG 2.1 AA accessible with semantic HTML
 * - Mobile-first responsive design
 */
export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Text group with 4px gap */}
          <div className={styles.textGroup}>
            {/* Main headline */}
            <h1 id="hero-heading" className={styles.headline}>
              Lorem ipsum dolor amet
            </h1>

            {/* Subheading/Description text */}
            <p className={styles.description}>
              Trade in your device and get the latest model with instant credit.
            </p>
          </div>

          {/* CTA Button */}
          <button className={styles.ctaButton} type="button">
            Get started
          </button>
        </div>
      </div>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';
