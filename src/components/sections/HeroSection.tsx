import React from 'react';
import styles from './HeroSection.module.css';

/**
 * HeroSection component - Hero Banner
 * Updated to match Figma design node 1413:13348
 *
 * Figma Reference:
 * - Node: 1413:13348 (1440px × 615px, hero banner)
 *
 * Design Specifications (node 1413:13348):
 * - Background: #1A5DF6 (vibrant blue)
 * - Text Color: #FFFFFF (white)
 * - Height: 615px
 * - Layout: Centered content with headline, description, CTA button, and feature cards
 *
 * Components:
 * - Headline: "Lorem ipsum dolor amet" (white, bold, ~48px)
 * - Description: Supporting text (white, regular, ~16px)
 * - CTA Button: White background, blue text, pill-shaped
 * - Feature Cards: 4-column grid with icon placeholders and labels
 *
 * Features:
 * - Full-width hero banner
 * - Semantic HTML with WCAG 2.1 AA accessibility
 * - Responsive design with mobile breakpoints
 * - Centered content layout
 */
export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Headline */}
          <h1 id="hero-heading" className={styles.headline}>
            Lorem ipsum dolor amet
          </h1>

          {/* Description */}
          <p className={styles.description}>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ac placerat
            vestibulum lectus mauris.
          </p>

          {/* CTA Button */}
          <button className={styles.ctaButton} type="button">
            nullam vehic
          </button>
        </div>

        {/* Feature Cards */}
        <div className={styles.featureCards}>
          <div className={styles.card}>
            <div className={styles.iconPlaceholder} aria-hidden="true" />
            <p className={styles.cardLabel}>Commodo viverra</p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconPlaceholder} aria-hidden="true" />
            <p className={styles.cardLabel}>Eaestas sed sed risus</p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconPlaceholder} aria-hidden="true" />
            <p className={styles.cardLabel}>Et maanis parturient</p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconPlaceholder} aria-hidden="true" />
            <p className={styles.cardLabel}>Amet tellu sadioliscin</p>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';
