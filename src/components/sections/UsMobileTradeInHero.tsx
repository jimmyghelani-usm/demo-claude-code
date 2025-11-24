import React from 'react';
import styles from './UsMobileTradeInHero.module.css';

/**
 * Props for the UsMobileTradeInHero component
 */
export interface UsMobileTradeInHeroProps {
  headline?: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  className?: string;
}

/**
 * UsMobileTradeInHero - Main hero section for US Mobile Trade In marketing page
 *
 * Features:
 * - Large headline with "Trade In" messaging
 * - Subheadline emphasizing benefits
 * - Call-to-action button with arrow icon
 * - Scroll indicator for mobile users
 * - Responsive design from mobile to desktop
 * - Semantic HTML with accessibility attributes
 * - Color scheme from Figma spec (blues, whites, grays)
 * - Typography following Figma design tokens
 */
export function UsMobileTradeInHero({
  headline = 'Trade In Your Old Phone',
  subheadline = 'Get instant credit toward your next device',
  ctaLabel = 'START TRADE IN',
  ctaHref = '#',
  onCtaClick,
  className = '',
}: UsMobileTradeInHeroProps) {
  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };

  return (
    <section
      className={`${styles.hero} ${className}`}
      role="region"
      aria-labelledby="trade-in-headline"
    >
      {/* Background gradient effects for visual interest */}
      <div className={styles.gradientBackground} aria-hidden="true" />

      <div className={styles.heroContent}>
        {/* Main Headline */}
        <h1 id="trade-in-headline" className={styles.headline}>
          {headline}
        </h1>

        {/* Subheadline */}
        <p className={styles.subheadline}>{subheadline}</p>

        {/* CTA Button */}
        <a
          href={ctaHref}
          className={styles.ctaButton}
          onClick={handleCtaClick}
          aria-label={`${ctaLabel} - Get credit for your old phone`}
        >
          {ctaLabel}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className={styles.arrowIcon}
          >
            <path
              d="M5 12H19M19 12L13 6M19 12L13 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Scroll Indicator */}
        <button
          className={styles.scrollIndicator}
          aria-label="Scroll down to see more details"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth',
            });
          }}
          type="button"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M8 12L16 20L24 12"
              stroke="#1D5FF6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Bottom Section Description */}
      <div className={styles.description} role="complementary">
        <p>
          Get the best value for your old device. Our simple trade-in process
          takes just minutes, and your credit is applied instantly to your new
          device purchase.
        </p>
      </div>
    </section>
  );
}
