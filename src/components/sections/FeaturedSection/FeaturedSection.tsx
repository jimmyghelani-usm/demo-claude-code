import React from 'react';
import styles from './FeaturedSection.module.css';

interface FeaturedSectionProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  className?: string;
}

/**
 * FeaturedSection - Section with title, description, and featured image with play icon overlay
 *
 * Features:
 * - Dark background (#202020)
 * - Centered title and description
 * - Featured image with 50% opacity
 * - Play button overlay on image
 * - Mobile-first responsive design
 * - Semantic HTML with ARIA labels
 */
export function FeaturedSection({
  title = 'Win a Tesla Cybertruck & Enjoy Our Network',
  description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  imageUrl = 'https://via.placeholder.com/996x570',
  className = ''
}: FeaturedSectionProps) {
  return (
    <section className={`${styles.featured} ${className}`} aria-labelledby="featured-title">
      <div className={styles.container}>
        {/* Heading */}
        <div className={styles.heading}>
          <h2 id="featured-title" className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        {/* Featured Image with Play Overlay */}
        <div className={styles.imageWrapper}>
          <img
            src={imageUrl}
            alt="Featured content"
            className={styles.image}
          />
          <button
            className={styles.playButton}
            aria-label="Play featured video"
            onClick={() => console.log('Play video')}
          >
            <svg
              width="42"
              height="42"
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M16 10.5L32 21L16 31.5V10.5Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
