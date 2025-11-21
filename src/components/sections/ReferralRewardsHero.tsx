import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './ReferralRewardsHero.module.css';

export interface ReferralRewardsHeroProps {
  targetAmount?: number;
  animationDuration?: number;
  onCtaClick?: () => void;
  className?: string;
}

/**
 * ReferralRewardsHero - Hero section showcasing referral rewards with animated counter
 *
 * Features:
 * - Animated dollar amount counter with smooth easing
 * - Large headline and subheading
 * - CTA button with hover state
 * - Gradient blur effects on background edges
 * - Fully responsive design
 * - Intersection Observer for animation trigger
 * - Accessible with semantic HTML and ARIA attributes
 */
export function ReferralRewardsHero({
  targetAmount = 1000000,
  animationDuration = 2000,
  onCtaClick,
  className = '',
}: ReferralRewardsHeroProps) {
  const [displayAmount, setDisplayAmount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Easing function for smooth animation (ease-out)
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  // Format number with commas
  const formatNumber = (num: number): string => {
    return Math.floor(num).toLocaleString('en-US');
  };

  // Animation frame function using ref to avoid circular dependency
  const animateFrame = useCallback(
    (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentAmount = easedProgress * targetAmount;

      setDisplayAmount(currentAmount);

      if (progress < 1) {
        // Continue animation by requesting next frame
        animationRef.current = requestAnimationFrame(animateFrame);
      } else {
        animationRef.current = null;
        startTimeRef.current = null;
      }
    },
    [targetAmount, animationDuration]
  );

  // Start animation when component becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  // Trigger animation when visible
  useEffect(() => {
    if (isVisible && !animationRef.current) {
      animationRef.current = requestAnimationFrame(animateFrame);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, animateFrame]);

  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`${styles.hero} ${className}`}
      aria-labelledby="referral-heading"
    >
      {/* Background gradient effects */}
      <div className={styles.gradientTop} aria-hidden="true" />
      <div className={styles.gradientBottom} aria-hidden="true" />

      <div className={styles.content}>
        {/* Dollar amount display */}
        <div className={styles.amountSection}>
          <p className={styles.amount} aria-live="polite" aria-atomic="true">
            ${formatNumber(displayAmount)}
          </p>
        </div>

        {/* Text content */}
        <div className={styles.textContent}>
          <h1 id="referral-heading" className={styles.heading}>
            Given Out in Referral Rewards
          </h1>
          <h2 className={styles.subheading}>
            Still counting. Thousands of users are earning just by sharing.
          </h2>
        </div>

        {/* CTA Button */}
        <button
          className={styles.ctaButton}
          onClick={handleCtaClick}
          aria-label="Start earning referral rewards now"
        >
          Start Earning Now
        </button>
      </div>
    </section>
  );
}
