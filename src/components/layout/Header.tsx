import React from 'react';
import { Button, IconButton } from '../ui';
import styles from './Header.module.css';

/**
 * Header component for US Mobile Trade In landing page
 * Fixed positioning, 60px height, max-width 1440px
 * Contains logo, navigation menu, and action buttons
 */
export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="/" aria-label="US Mobile home">
            <svg width="120" height="28" viewBox="0 0 120 28" fill="none" aria-hidden="true">
              <text x="0" y="20" fontSize="20" fontWeight="700" fill="#0C173E">
                US Mobile
              </text>
            </svg>
          </a>
        </div>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            <li>
              <a href="/plans" className={styles.navLink}>
                PLANS
              </a>
            </li>
            <li>
              <a href="/networks" className={styles.navLink}>
                NETWORKS
              </a>
            </li>
            <li>
              <a href="/how-it-works" className={styles.navLink}>
                HOW IT WORKS
              </a>
            </li>
            <li>
              <a href="/shop" className={styles.navLink}>
                SHOP
              </a>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <IconButton
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M6 2L4 4H1v2h1l1.5 12h11L16 6h1V4h-3l-2-2H6zm0 2h6l1 2H5l1-2zm-2 4h12l-1.2 9.6H5.2L4 8z" />
              </svg>
            }
            aria-label="Shopping cart"
            badgeCount={0}
          />
          <IconButton
            icon={
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2C5.589 2 2 5.589 2 10s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 2c3.308 0 6 2.692 6 6s-2.692 6-6 6-6-2.692-6-6 2.692-6 6-6zm-1 2v5l3.5 2 .5-1-3-1.8V6H9z" />
              </svg>
            }
            aria-label="Chat support"
          />
          <Button variant="text" size="sm">
            Sign In
          </Button>
          <Button variant="primary" size="md">
            Get US Mobile
          </Button>
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
