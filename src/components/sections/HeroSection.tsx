import { CountdownTimer } from './CountdownTimer';
import styles from './HeroSection.module.css';

/**
 * HeroSection - Main hero section with headline, countdown timer, and CTA
 *
 * Features:
 * - Large gradient headline "Something major is coming."
 * - Subheadline text
 * - Countdown timer with target date (6/23 at 11 a.m. EST)
 * - "LOGIN TO SIGN UP" CTA button
 * - Scroll indicator chevron
 * - Bottom description text
 */
export function HeroSection() {
  // Target date: June 23, 2025 at 11:00 AM EST
  const targetDate = new Date('2025-06-23T11:00:00-05:00');

  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        {/* Main Headline */}
        <h1 className={styles.headline}>
          <span className={styles.yellow}>Something</span>{' '}
          <span className={styles.white}>major</span>{' '}
          <span className={styles.yellow}>is coming.</span>
        </h1>

        {/* Subheadline */}
        <p className={styles.subheadline}>
          It&apos;s never been better to be a US Mobile customer.
        </p>

        {/* Countdown Timer */}
        <div className={styles.timerWrapper}>
          <CountdownTimer targetDate={targetDate} />
        </div>

        {/* CTA Button */}
        <a href="/login" className={styles.ctaButton}>
          LOGIN TO SIGN UP
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 2L12 18M12 2L6 8M12 2L18 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 14L4 20C4 21.1046 4.89543 22 6 22L18 22C19.1046 22 20 21.1046 20 20L20 14"
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
          aria-label="Scroll to learn more"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
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
              stroke="#FFE174"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Bottom Description */}
      <div className={styles.description}>
        <p>
          We can&apos;t say too much yet but to our current customers: we hear
          you loud and clear. Get ready for something...{' '}
          <strong>big</strong>. Launching 6/23 at 11 a.m. EST. Click the button
          above to be notified as soon as we&apos;re live.
        </p>
      </div>
    </section>
  );
}
