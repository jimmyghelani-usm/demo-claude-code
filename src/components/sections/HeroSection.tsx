import React from 'react';
import { Button } from '../ui';
import styles from './HeroSection.module.css';

/**
 * HeroSection component - two-column layout with headline and device showcase
 * Left: Main headline, subheading, and CTA
 * Right: Device showcase images
 * Background: #F4F8FF
 */
export const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.headline}>
            <span className={styles.primaryText}>US Mobile Trade In</span>
            <span className={styles.emojiText}>
              Get 💰 for your old 📱
            </span>
          </h1>

          <p className={styles.subheading}>
            Trade in your old phone, tablet, or smartwatch and get cash or credit toward your next
            device. It&apos;s easy, secure, and good for the environment.
          </p>

          <Button variant="primary" size="lg" onClick={() => {}}>
            Check trade in value
          </Button>
        </div>

        <div className={styles.showcase}>
          <div className={styles.deviceGrid}>
            <div className={`${styles.device} ${styles.deviceLarge}`} aria-hidden="true">
              <div className={styles.devicePlaceholder}>
                <svg width="120" height="200" viewBox="0 0 120 200" fill="none">
                  <rect width="120" height="200" rx="20" fill="#D2DFFD" />
                  <rect x="20" y="30" width="80" height="140" rx="4" fill="#FFFFFF" opacity="0.3" />
                  <circle cx="60" cy="180" r="8" fill="#FFFFFF" opacity="0.3" />
                </svg>
                <span className={styles.deviceLabel}>📱</span>
              </div>
            </div>

            <div className={`${styles.device} ${styles.deviceMedium}`} aria-hidden="true">
              <div className={styles.devicePlaceholder}>
                <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
                  <rect width="100" height="120" rx="16" fill="#F4F7FF" />
                  <rect x="15" y="20" width="70" height="80" rx="4" fill="#FFFFFF" opacity="0.3" />
                </svg>
                <span className={styles.deviceLabel}>⌚</span>
              </div>
            </div>

            <div className={`${styles.device} ${styles.deviceSmall}`} aria-hidden="true">
              <div className={styles.devicePlaceholder}>
                <svg width="140" height="100" viewBox="0 0 140 100" fill="none">
                  <rect width="140" height="100" rx="12" fill="#D2DFFD" />
                  <rect x="20" y="15" width="100" height="70" rx="2" fill="#FFFFFF" opacity="0.3" />
                </svg>
                <span className={styles.deviceLabel}>💻</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

HeroSection.displayName = 'HeroSection';
