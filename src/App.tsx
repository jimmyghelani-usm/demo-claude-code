import { ReferralRewardsHero, StatisticsSection, HowItWorksSection, RewardsChartSection, FAQSection, CTAFooterSection } from '@/components/sections';
import './App.css';

/**
 * Main App component
 * Displays:
 * - ReferralRewardsHero component from Figma design (node 2172:3290)
 * - StatisticsSection component showing key referral program statistics
 * - HowItWorksSection component demonstrating the referral program steps
 * - RewardsChartSection component showing tiered referral rewards visualization
 * - FAQSection component with frequently asked questions accordion
 * - CTAFooterSection component with final CTA and footer links/social icons
 */
function App() {
  return (
    <main className="noSectionGaps">
      <ReferralRewardsHero />
      <StatisticsSection />
      <HowItWorksSection />
      <RewardsChartSection />
      <FAQSection />
      <CTAFooterSection />
    </main>
  );
}

export default App;
