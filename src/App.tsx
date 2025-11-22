import { Navigation, GiveawayHero, MilestoneCards, StatisticsSection, FAQSection, CTAFooterSection } from '@/components/sections';
import { PricingCard } from '@/components/ui';
import './App.css';

/**
 * Main App component
 * Displays US Mobile's 10th Anniversary Giveaway page:
 * - Navigation bar with US Mobile branding
 * - GiveawayHero component from Figma design (node 2172:13523)
 * - MilestoneCards component showing 10 years of key milestones
 * - StatisticsSection component showing customer statistics
 * - PricingCard components for plan options
 * - FAQSection component with frequently asked questions
 * - CTAFooterSection component with final CTA and footer
 */
function App() {
  return (
    <>
      <Navigation />
      <main className="noSectionGaps">
        <GiveawayHero />
        <MilestoneCards />
        <StatisticsSection />
        <div style={{ padding: '80px 160px', backgroundColor: '#0a0a0a', display: 'flex', gap: '32px', justifyContent: 'center' }}>
          <PricingCard
            planName="Unlimited"
            description="Everything you need for a 3 mo. commitment"
            price="17.5"
          />
          <PricingCard
            planName="Big On GIG"
            description="Lots of data for a 12 mo. commitment"
            price="15"
            highlighted
          />
          <PricingCard
            planName="Light"
            description="Best value for a 12 mo. commitment"
            price="8"
          />
        </div>
        <FAQSection />
        <CTAFooterSection />
      </main>
    </>
  );
}

export default App;
