import { Navigation } from './Navigation';
import { HeroSection } from './HeroSection';
import styles from './CountdownPage.module.css';

/**
 * CountdownPage - Main landing page for the countdown marketing campaign
 *
 * Features:
 * - Fixed navigation bar with logo and menu items
 * - Hero section with headline, countdown timer, and CTA
 * - Bottom description section
 * - Full-page dark theme (#191919)
 * - Responsive design
 */
export function CountdownPage() {
  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.main}>
        <HeroSection />
      </main>
    </div>
  );
}
