import React from 'react';
import styles from './BusinessPageHeader.module.css';

/**
 * BusinessPageHeader Component
 * Fixed sticky header navigation for the business page
 * Features:
 * - Fixed sticky positioning (60px height)
 * - Logo on the left
 * - Navigation menu in center
 * - Sign In and Main CTA button on right
 * - Social icons (chat and bag) on far right
 */
export function BusinessPageHeader() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Logo */}
        <div className={styles.logo}>
          <a href="#home" aria-label="Home">
            <span className={styles.logoText}>US Mobile</span>
          </a>
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          <a href="#networks" className={styles.navLink}>
            NETWORKS
          </a>
          <a href="#how-it-works" className={styles.navLink}>
            HOW IT WORKS
          </a>
          <a href="#shop" className={styles.navLink}>
            SHOP
          </a>
        </div>

        {/* Right Section: Sign In, CTA Button, Icons */}
        <div className={styles.rightSection}>
          <a href="#signin" className={styles.signIn}>
            SIGN IN
          </a>

          <button className={styles.mainButton} type="button">
            GET STARTED
          </button>

          <button
            className={styles.iconButton}
            type="button"
            aria-label="Chat with us"
          >
            <span className={styles.chatIcon}>💬</span>
          </button>

          <button
            className={styles.iconButton}
            type="button"
            aria-label="Shopping cart"
          >
            <span className={styles.bagIcon}>🛍️</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
