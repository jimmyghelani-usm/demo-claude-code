import React from 'react';
import styles from './GiveawayHero.module.css';

interface GiveawayHeroProps {
  className?: string;
}

/**
 * GiveawayHero - Main hero section for US Mobile's 10th Anniversary Giveaway
 *
 * Features:
 * - Full-width Tesla Cybertruck background image
 * - Centered headline text
 * - Subheadline with bold emphasis
 * - CTA button to enter giveaway
 * - Responsive design for mobile/tablet/desktop
 */
export function GiveawayHero({ className = '' }: GiveawayHeroProps) {
  return (
    <section
      className={`${styles.hero} ${className}`}
      aria-labelledby="giveaway-title"
    >
      <div className={styles.background} role="img" aria-label="Tesla Cybertruck"></div>

      <div className={styles.content}>
        <h1 id="giveaway-title" className={styles.title}>
          US Mobile's 10th Anniversary Giveaway
        </h1>

        <div className={styles.subtitle}>
          <p>
            Win a <strong>Tesla Cybertruck</strong> & Experience Our Reliable Network
          </p>
        </div>

        <a href="#entry-form" className={styles.cta}>
          <span>Enter now to win</span>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12 9L19 16L12 23"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
