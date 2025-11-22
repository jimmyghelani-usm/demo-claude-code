import React from 'react';
import styles from './MilestoneCards.module.css';

interface Milestone {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

interface MilestoneCardsProps {
  milestones?: Milestone[];
  className?: string;
}

const defaultMilestones: Milestone[] = [
  {
    icon: 'globe',
    title: 'Global Coverage',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.',
    color: '#fd9800'
  },
  {
    icon: 'flexible',
    title: 'Flexible Plans',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.',
  },
  {
    icon: 'premium',
    title: 'Premium Data',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.',
  },
  {
    icon: 'support',
    title: 'Expert Support Team',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed.',
  },
];

/**
 * MilestoneCards - Display key milestones for US Mobile's 10th Anniversary
 *
 * Features:
 * - Grid layout of 4 milestone cards
 * - Icon, title, and description for each card
 * - Gradient background cards
 * - Responsive grid (4 cols desktop, 2 cols tablet, 1 col mobile)
 */
export function MilestoneCards({ milestones = defaultMilestones, className = '' }: MilestoneCardsProps) {
  return (
    <section
      className={`${styles.section} ${className}`}
      aria-labelledby="milestones-title"
    >
      <div className={styles.container}>
        <h2 id="milestones-title" className={styles.title}>
          10 Years of US Mobile: Key Milestones
        </h2>

        <div className={styles.grid}>
          {milestones.map((milestone, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconContainer}>
                {milestone.color && (
                  <div 
                    className={styles.iconPlaceholder}
                    style={{ backgroundColor: milestone.color }}
                    role="img"
                    aria-label={milestone.icon}
                  ></div>
                )}
                {!milestone.color && (
                  <div className={styles.iconSvg} role="img" aria-label={milestone.icon}></div>
                )}
              </div>

              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{milestone.title}</h3>
                <p className={styles.cardDescription}>{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
