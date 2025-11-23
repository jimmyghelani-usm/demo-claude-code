import React from 'react';
import { PricingCard } from '@/components/ui';
import { Button } from '@/components/ui';
import styles from './PricingSection.module.css';

interface Plan {
  id: string;
  title: string;
  price: number | string;
  period?: string;
  description?: string;
  features: string[];
  highlighted?: boolean;
}

interface PricingSectionProps {
  title?: string;
  description?: string;
  plans?: Plan[];
}

const DEFAULT_PLANS: Plan[] = [
  {
    id: 'plan-1',
    title: '5GB Free for Unlimited',
    price: 57,
    period: '/ Month',
    description: 'Best for individuals',
    features: [
      'Unlimited data, talk',
      'Unlimited text',
      '5GB hotspot',
    ],
  },
  {
    id: 'plan-2',
    title: '10GB Premium',
    price: 74,
    period: '/ Month',
    description: 'Most popular',
    features: [
      'Unlimited data, talk',
      'Unlimited text',
      '10GB hotspot',
    ],
    highlighted: true,
  },
  {
    id: 'plan-3',
    title: 'Business Plan',
    price: 554,
    period: '/ Month',
    description: 'For teams',
    features: [
      'Unlimited data, talk',
      'Unlimited text',
      'Unlimited hotspot',
    ],
  },
];

/**
 * PricingSection Component
 * Displays pricing cards in a responsive grid
 * Features:
 * - Configurable plans
 * - Highlight featured plan
 * - Responsive grid layout (3 columns desktop, 2 tablet, 1 mobile)
 * - CTA buttons for each plan
 */
export const PricingSection: React.FC<PricingSectionProps> = ({
  title = 'Simple, Transparent Pricing',
  description = 'Choose the plan that works best for your needs. All plans include access to our premium network.',
  plans = DEFAULT_PLANS,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.grid}>
          {plans.map((plan) => (
            <div key={plan.id} className={styles.cardWrapper}>
              <PricingCard
                planName={plan.title}
                price={String(plan.price)}
                description={plan.description || ''}
                period={plan.period || '/month'}
                features={plan.features}
                highlighted={plan.highlighted}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
