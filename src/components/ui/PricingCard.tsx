import React from 'react';
import styles from './PricingCard.module.css';

export interface PricingCardProps {
  planName: string;
  description: string;
  price: string;
  period?: string;
  features?: string[];
  highlighted?: boolean;
  className?: string;
}

export function PricingCard({
  planName,
  description,
  price,
  period = '/month',
  features = [],
  highlighted = false,
  className = '',
}: PricingCardProps) {
  const cardClass = [styles.card, highlighted && styles.highlighted, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClass} role="article" aria-label={planName + ' pricing plan'}>
      <div className={styles.header}>
        <h3 className={styles.planName}>{planName}</h3>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.pricing}>
        <span className={styles.price}>${price}</span>
        {period && <span className={styles.period}>{period}</span>}
      </div>

      {features.length > 0 && (
        <ul className={styles.features}>
          {features.map((feature, index) => (
            <li key={index} className={styles.feature}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M16.6666 5L7.49998 14.1667L3.33331 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}

      <button className={styles.cta}>Get Started</button>
    </div>
  );
}
