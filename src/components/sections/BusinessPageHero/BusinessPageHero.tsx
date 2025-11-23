import React from 'react';
import styles from './BusinessPageHero.module.css';

interface BusinessPageHeroProps {
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
}

/**
 * BusinessPageHero Component
 * Full-width hero section with background image and blur effects
 * Features:
 * - Full viewport height (738px)
 * - Background image with cover fit
 * - Blue blur effect (34px) for visual depth
 * - Gradient overlay on top
 * - Optional title and subtitle
 */
export function BusinessPageHero({
  backgroundImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1440&h=738&fit=crop',
  title = 'Welcome to Our Business',
  subtitle = 'Discover what we can do for you',
}: BusinessPageHeroProps) {
  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        aria-hidden="true"
      />

      {/* Blue Blur Overlay Effect */}
      <div className={styles.blurOverlay} aria-hidden="true" />

      {/* Gradient Overlay */}
      <div className={styles.gradientOverlay} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </section>
  );
}
