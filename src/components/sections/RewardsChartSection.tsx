import { useMemo, useRef, useEffect, useState, useCallback } from 'react';
import styles from './RewardsChartSection.module.css';

export interface RewardsChartSectionProps {
  className?: string;
  animationDuration?: number;
  onLoad?: () => void;
}

interface Tier {
  tier: number;
  label: string;
  amount: number;
}

/**
 * RewardsChartSection - Displays tiered referral rewards as an animated bar chart
 *
 * Features:
 * - SVG-based bar chart with 10 referral tiers
 * - Animated bars with staggered entrance
 * - Reward amounts: 1st-2nd: $25, 3rd: $75, 4th: $100, 5th-10th: $225
 * - Tier labels below each bar (1st, 2nd, 3rd... 10th)
 * - Dark background with light top border
 * - Responsive scaling
 * - Accessibility: ARIA labels and semantic structure
 * - Intersection Observer for performance
 */
export function RewardsChartSection({
  className = '',
  animationDuration = 1200,
  onLoad,
}: RewardsChartSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLSection>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Define tier data
  const tiers: Tier[] = useMemo(
    () => [
      { tier: 1, label: '1st', amount: 25 },
      { tier: 2, label: '2nd', amount: 25 },
      { tier: 3, label: '3rd', amount: 75 },
      { tier: 4, label: '4th', amount: 100 },
      { tier: 5, label: '5th', amount: 225 },
      { tier: 6, label: '6th', amount: 225 },
      { tier: 7, label: '7th', amount: 225 },
      { tier: 8, label: '8th', amount: 225 },
      { tier: 9, label: '9th', amount: 225 },
      { tier: 10, label: '10th', amount: 225 },
    ],
    []
  );

  // Find max amount for scaling
  const maxAmount = useMemo(() => Math.max(...tiers.map((t) => t.amount)), [tiers]);

  // Easing function for smooth animation (ease-out cubic)
  const easeOutCubic = useCallback((t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  }, []);

  // Animate bars on scroll
  const animateFrame = useCallback(
    (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / animationDuration, 1);
      const easedProgress = easeOutCubic(progress);

      setAnimationProgress(easedProgress);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateFrame);
      } else {
        animationRef.current = null;
        startTimeRef.current = null;
      }
    },
    [animationDuration, easeOutCubic]
  );

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            if (onLoad) {
              onLoad();
            }
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
  }, [isVisible, onLoad]);

  // Start animation when visible
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

  // Calculate bar dimensions
  const chartPadding = 60;
  const chartWidth = 1016 - 2 * chartPadding;
  const chartHeight = 300;
  const barWidth = chartWidth / tiers.length;
  const gapWidth = barWidth * 0.15; // 15% gap
  const actualBarWidth = barWidth - gapWidth;

  // SVG chart
  const chartMarginTop = 20;

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${className}`}
      aria-labelledby="rewards-chart-heading"
    >
      <div className={styles.container}>
        <div className={styles.chartWrapper}>
          <svg
            viewBox={`0 0 1016 348`}
            className={styles.svg}
            aria-label="Referral rewards chart showing 10 tiers with varying reward amounts"
            role="img"
          >
            {/* Chart background */}
            <rect width="1016" height="348" fill="transparent" />

            {/* Grid lines and scale labels */}
            <g className={styles.gridGroup}>
              {/* Y-axis label for max amount */}
              <text
                x={chartPadding - 10}
                y={chartMarginTop + 16}
                className={styles.scaleLabel}
                textAnchor="end"
              >
                ${maxAmount}
              </text>

              {/* Scale reference line at top */}
              <line
                x1={chartPadding}
                y1={chartMarginTop + 20}
                x2={chartPadding + chartWidth}
                y2={chartMarginTop + 20}
                className={styles.scaleLine}
              />

              {/* Zero line at bottom */}
              <line
                x1={chartPadding}
                y1={chartMarginTop + chartHeight + 20}
                x2={chartPadding + chartWidth}
                y2={chartMarginTop + chartHeight + 20}
                className={styles.baselineLine}
              />
            </g>

            {/* Bars */}
            <g className={styles.barsGroup}>
              {tiers.map((tier, index) => {
                // Staggered animation for each bar
                const barDelay = (index / tiers.length) * 0.3; // First 30% of animation
                const barStartProgress = barDelay;
                const barEndProgress = barDelay + 0.7; // Overlapping animations
                const barProgress = Math.max(
                  0,
                  Math.min((animationProgress - barStartProgress) / (barEndProgress - barStartProgress), 1)
                );
                const barEasedProgress = easeOutCubic(barProgress);

                const xPos = chartPadding + index * barWidth + gapWidth / 2;
                const barHeightRatio = tier.amount / maxAmount;
                const maxBarHeight = chartHeight;
                const barHeight = barHeightRatio * maxBarHeight * barEasedProgress;
                const yPos = chartMarginTop + chartHeight + 20 - barHeight;

                return (
                  <g key={tier.tier}>
                    {/* Bar rectangle */}
                    <rect
                      x={xPos}
                      y={yPos}
                      width={actualBarWidth}
                      height={barHeight}
                      className={styles.bar}
                      role="presentation"
                      aria-hidden="true"
                    />

                    {/* Amount label above bar */}
                    {barEasedProgress > 0.3 && (
                      <text
                        x={xPos + actualBarWidth / 2}
                        y={yPos - 12}
                        className={styles.amountLabel}
                        textAnchor="middle"
                      >
                        ${tier.amount}
                      </text>
                    )}

                    {/* Tier label below chart */}
                    <text
                      x={xPos + actualBarWidth / 2}
                      y={chartMarginTop + chartHeight + 20 + 32}
                      className={styles.tierLabel}
                      textAnchor="middle"
                    >
                      {tier.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Subtitle */}
        <p className={styles.subtitle}>The first 10 completed referrals will be rewarded</p>
      </div>
    </section>
  );
}
