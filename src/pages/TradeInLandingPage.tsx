import React from 'react';
import { Header, Footer } from '@/components/layout';
import { HeroSection, ComingSoonSection, HowItWorksSection, FAQSection } from '@/components/sections';
import styles from './TradeInLandingPage.module.css';

/**
 * TradeInLandingPage - Main landing page for US Mobile Trade In
 * Composition of Header, Hero, HowItWorks, FAQ, and Footer sections
 */
export const TradeInLandingPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <HeroSection />
        <HowItWorksSection />
        <ComingSoonSection
          badge="Coming Soon"
          heading="Exciting features on the way!"
          description="We're working on something special. Be the first to know when we launch new features designed to make your trade-in experience even better."
          placeholder="Enter your email address"
          buttonText="Notify me"
        />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
};

TradeInLandingPage.displayName = 'TradeInLandingPage';

export default TradeInLandingPage;
