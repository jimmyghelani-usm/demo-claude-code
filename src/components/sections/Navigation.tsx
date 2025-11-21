import styles from './Navigation.module.css';

/**
 * Navigation - Top navigation bar for the countdown page
 *
 * Features:
 * - Fixed at top of page
 * - US Mobile logo
 * - Left navigation menu (PLANS, NETWORKS, FEATURES, BUSINESS, STUDENTS, SHOP)
 * - Right action buttons (Chat, Try For Free, Sign In)
 * - Responsive design
 */
export function Navigation() {
  return (
    <nav className={styles.nav} role="navigation" aria-label="Main navigation">
      <div className={styles.container}>
        {/* Logo */}
        <div className={styles.logo}>
          <a href="/" aria-label="US Mobile Home">
            <img
              src="/usmobile-logo-white.svg"
              alt="US Mobile"
              width="60"
              height="32"
            />
          </a>
        </div>

        {/* Left Nav Items */}
        <ul className={styles.leftNav}>
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
            <button
              className={styles.navLink}
              aria-expanded="false"
              aria-haspopup="true"
            >
              FEATURES
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </li>
          <li>
            <a href="/business" className={styles.navLink}>
              BUSINESS
            </a>
          </li>
          <li>
            <a href="/students" className={styles.navLink}>
              STUDENTS
            </a>
          </li>
          <li>
            <a href="/shop" className={styles.navLink}>
              SHOP
            </a>
          </li>
        </ul>

        {/* Right Nav Items */}
        <div className={styles.rightNav}>
          {/* Chat Button */}
          <button
            className={styles.chatButton}
            aria-label="Open chat support"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Try For Free Button */}
          <a href="/try-free" className={styles.tryFreeButton}>
            TRY FOR FREE
          </a>

          {/* Sign In Button */}
          <a href="/sign-in" className={styles.signInButton}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
                fill="currentColor"
              />
              <path
                d="M10 12.5C4.47715 12.5 0 16.9772 0 22.5H20C20 16.9772 15.5228 12.5 10 12.5Z"
                fill="currentColor"
              />
            </svg>
            SIGN IN
          </a>
        </div>
      </div>
    </nav>
  );
}
