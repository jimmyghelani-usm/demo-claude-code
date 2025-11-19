import React from 'react';
import { Header, Footer } from '@/components/layout';
import { HeroSection, HowItWorksSection, FAQSection } from '@/components/sections';
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
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
};

TradeInLandingPage.displayName = 'TradeInLandingPage';

export default TradeInLandingPage;
