import React from 'react';
import styles from './NetworkCoverage.module.css';

interface NetworkCoverageProps {
  title?: string;
  description?: string;
  benefits?: string[];
  illustrationUrl?: string;
}

const DEFAULT_BENEFITS = [
  'Nationwide 4G LTE Coverage',
  'Premium 5G Network Access',
  '99.9% Network Uptime Guarantee',
  'International Roaming in 200+ Countries',
  '24/7 Customer Support',
  'Fast Switching Between Networks',
];

/**
 * NetworkCoverage Component
 * Highlights network coverage benefits with illustration
 * Features:
 * - Two-column layout (content and illustration)
 * - Configurable benefits list
 * - Responsive design
 * - Optional background illustration
 */
export const NetworkCoverage: React.FC<NetworkCoverageProps> = ({
  title = 'Nationwide Network Coverage',
  description = 'Experience seamless connectivity across the United States with our premium network infrastructure.',
  benefits = DEFAULT_BENEFITS,
  illustrationUrl = 'https://images.unsplash.com/photo-1450101499163-c8917c7b4edc?w=600&h=600&fit=crop',
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>

          <ul className={styles.benefits}>
            {benefits.map((benefit, index) => (
              <li key={index} className={styles.benefit}>
                <span className={styles.icon}>✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.illustration}>
          <img src={illustrationUrl} alt="Network coverage visualization" />
        </div>
      </div>
    </section>
  );
};
