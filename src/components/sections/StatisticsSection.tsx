/**
 * StatisticsSection - Landing page statistics showcase
 *
 * Displays 3 key statistics in a responsive grid layout with:
 * - Animated stat cards with icons
 * - Large stat numbers with descriptive labels
 * - Dark rounded card backgrounds
 * - Fully responsive design (desktop to mobile)
 * - Accessible with semantic HTML and ARIA attributes
 *
 * Design Specs:
 * - 3-column grid layout
 * - 165px padding from edges
 * - 110px gap between sections (desktop)
 * - Container width: 1110px centered on 1440px page
 * - Mobile-first responsive design
 */

import styles from './StatisticsSection.module.css';

export interface StatisticCardData {
  id: string;
  number: string;
  label: string;
  description: string;
  icon?: string;
}

export interface StatisticsSectionProps {
  cards?: StatisticCardData[];
  className?: string;
}

const DEFAULT_CARDS: StatisticCardData[] = [
  {
    id: 'referrers',
    number: '25,000',
    label: 'Referrers rewarded',
    description: 'Active users earning through referrals',
    icon: '👥',
  },
  {
    id: 'payout',
    number: '$175,000',
    label: 'Biggest monthly payout',
    description: 'Maximum rewards distributed in a single month',
    icon: '💰',
  },
  {
    id: 'city',
    number: 'New York',
    label: 'Top city this week',
    description: 'Leading city by referral activity',
    icon: '📍',
  },
];

/**
 * StatCard - Individual statistic card component
 */
function StatCard({ card }: { card: StatisticCardData }) {
  return (
    <article className={styles.card} aria-label={`${card.number} - ${card.label}`}>
      {/* Icon */}
      {card.icon && (
        <div className={styles.iconContainer} aria-hidden="true">
          <span className={styles.icon}>{card.icon}</span>
        </div>
      )}

      {/* Number */}
      <h3 className={styles.number}>{card.number}</h3>

      {/* Label */}
      <h4 className={styles.label}>{card.label}</h4>

      {/* Description */}
      <p className={styles.description}>{card.description}</p>
    </article>
  );
}

/**
 * StatisticsSection - Main statistics section component
 */
export function StatisticsSection({
  cards = DEFAULT_CARDS,
  className = '',
}: StatisticsSectionProps) {
  return (
    <section
      className={`${styles.section} ${className}`}
      aria-labelledby="statistics-heading"
    >
      <div className={styles.container}>
        {/* Section Heading */}
        <div className={styles.header}>
          <h2 id="statistics-heading" className={styles.heading}>
            By the Numbers
          </h2>
          <p className={styles.subheading}>
            Real impact from our referral program
          </p>
        </div>

        {/* Statistics Grid */}
        <div className={styles.grid}>
          {cards.map((card) => (
            <StatCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
