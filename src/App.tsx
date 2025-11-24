import { Navigation, GiveawayHero, MilestoneCards, StatisticsSection, FAQSection, CTAFooterSection, CTASection, FeaturedSection, MultiStepForm, BusinessPageHeader, BusinessPageHero, FAQAccordion, BusinessPageFooter, PricingSection, DeviceShowcase, NetworkCoverage, UsMobileTradeInHero, UsMobileTradeInHowItWorks, UsMobileTradeInFAQ, UsMobileTradeInFooter } from '@/components/sections';
import { PricingCard, Button, TextInput, IconButton, FeatureCard, SectionHeading, NumberedStepCard, Card, DeviceCard } from '@/components/ui';
import './App.css';

/**
 * Main App component
 * Displays US Mobile's Business Marketing page:
 * - BusinessPageHeader: Fixed sticky navigation with logo, nav links, and CTA
 * - BusinessPageHero: Full-width hero section with background image and blur effects
 * - FAQAccordion: Expandable FAQ cards in two-column layout
 * - BusinessPageFooter: Footer with links and social icons
 *
 * Also includes showcase of UI components and other sections for reference
 */
function App() {
  // Sample FAQ data for the accordion
  const faqItems = [
    {
      id: '1',
      question: 'What makes US Mobile different?',
      answer: 'US Mobile offers unbeatable pricing, flexible plans, and premium nationwide network coverage. We cut out middlemen to provide transparent, affordable mobile service.'
    },
    {
      id: '2',
      question: 'How do your plans work?',
      answer: 'Our plans are simple and flexible. Choose your data, talk, and text amounts, then pay only for what you use. No hidden fees, no contracts.'
    },
    {
      id: '3',
      question: 'Can I keep my existing phone number?',
      answer: 'Yes! You can port your existing number to US Mobile during signup. The process is simple and typically takes just a few hours.'
    },
    {
      id: '4',
      question: 'What about international coverage?',
      answer: 'We offer international roaming in 200+ destinations. Add an International Pass to your account for data access while traveling.'
    },
    {
      id: '5',
      question: 'Do you offer 5G?',
      answer: 'Yes, 5G is included on most of our plans at no extra cost. Check our coverage map to see 5G availability in your area.'
    },
    {
      id: '6',
      question: 'How do I switch to US Mobile?',
      answer: 'Switching is easy: order a SIM card, port your number, and activate it. Our support team guides you through each step.'
    },
    {
      id: '7',
      question: 'What if I have technical issues?',
      answer: 'Our 24/7 customer support team is here to help. Contact us via chat, phone, or email for immediate assistance.'
    },
    {
      id: '8',
      question: 'Can I pause my service?',
      answer: 'Yes, you can pause your service for up to 3 months without losing your number. Perfect for when you need a break.'
    }
  ];

  return (
    <>
      <BusinessPageHeader />
      <main style={{ paddingTop: 0 }}>
        {/* Business Page Section */}
        <section style={{ paddingTop: 0 }}>
          <BusinessPageHero
            title="Welcome to US Mobile"
            subtitle="The most affordable network with premium coverage"
          />
          <PricingSection
            title="Simple, Transparent Pricing"
            description="Choose the plan that works best for your needs. All plans include access to our premium network."
          />
          <NetworkCoverage />
          <DeviceShowcase />
          <div style={{ backgroundColor: '#ffffff', padding: '80px 70px' }}>
            <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
              <FAQAccordion items={faqItems} columns={2} />
            </div>
          </div>
          <BusinessPageFooter />
        </section>

        {/* Divider */}
        <div style={{ height: '100px', backgroundColor: '#ffffff' }} />

        {/* US Mobile Trade In Page */}
        <UsMobileTradeInHero
          headline="Trade In Your Old Phone"
          subheadline="Get instant credit toward your next device"
          ctaLabel="START TRADE IN"
          ctaHref="/trade-in"
        />
        <UsMobileTradeInHowItWorks
          sectionTitle="Simple 4-Step Process"
          sectionDescription="Get the best value for your device in just a few minutes"
        />
        <UsMobileTradeInFAQ
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about our trade-in process"
        />
        <UsMobileTradeInFooter
          brandText="US Mobile"
          brandDescription="The best way to get the most value from your old devices. Trade in with confidence."
        />

        {/* Divider */}
        <div style={{ height: '100px', backgroundColor: '#ffffff' }} />

        {/* Legacy Components Section */}
        <GiveawayHero />
        <FeaturedSection
          title="Win a Tesla Cybertruck & Enjoy Our Network"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore."
          imageUrl="https://images.unsplash.com/photo-1560958089-b8a63dd8813f?w=996&h=570&fit=crop"
        />
        <MilestoneCards />
        <MultiStepForm />
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

        {/* UI Component Showcase */}
        <section style={{ padding: '80px 160px', backgroundColor: '#1c1c1c' }}>
          <h2 style={{ color: '#ffffff', marginBottom: '48px', textAlign: 'center' }}>UI Components</h2>

          {/* Button Components */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{ color: '#ffffff', marginBottom: '24px' }}>Buttons</h3>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <Button label="Try for Free" variant="primary" onClick={() => console.log('Primary clicked')} />
              <Button label="Sign In" variant="secondary" onClick={() => console.log('Secondary clicked')} />
              <Button label="Disabled" variant="primary" disabled />
            </div>
          </div>

          {/* TextInput Components */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{ color: '#ffffff', marginBottom: '24px' }}>Text Input</h3>
            <div style={{ display: 'flex', gap: '32px', maxWidth: '500px' }}>
              <TextInput label="First Name" placeholder="Jason" />
              <TextInput label="Error State" placeholder="Enter text" error="This field is required" />
            </div>
          </div>

          {/* IconButton Components */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{ color: '#ffffff', marginBottom: '24px' }}>Icon Button</h3>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <IconButton
                icon={<span style={{ fontSize: '20px' }}>💬</span>}
                variant="outlined"
                ariaLabel="Chat"
              />
              <IconButton
                icon={<span style={{ fontSize: '20px' }}>❤️</span>}
                variant="filled"
                ariaLabel="Like"
              />
              <IconButton
                icon={<span style={{ fontSize: '20px' }}>⭐</span>}
                variant="ghost"
                ariaLabel="Favorite"
              />
            </div>
          </div>

          {/* FeatureCard Components */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{ color: '#ffffff', marginBottom: '24px' }}>Feature Cards</h3>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <FeatureCard
                icon={<span style={{ fontSize: '32px' }}>🌍</span>}
                title="Global Coverage"
                description="Connect anywhere in the world"
                iconBackgroundColor="#608ff9"
              />
              <FeatureCard
                icon={<span style={{ fontSize: '32px' }}>⚡</span>}
                title="Fast Network"
                description="Lightning-fast speeds and reliability"
                iconBackgroundColor="#1d5ff6"
              />
              <FeatureCard
                icon={<span style={{ fontSize: '32px' }}>🛡️</span>}
                title="Secure"
                description="Your data is protected"
                iconBackgroundColor="#4d6dd9"
              />
            </div>
          </div>

          {/* SectionHeading Components */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{ color: '#ffffff', marginBottom: '24px' }}>Section Heading</h3>
            <SectionHeading
              title="Unlock Unlimited Possibilities"
              description="Experience the future of mobile connectivity"
              align="center"
            />
          </div>

          {/* NumberedStepCard Components */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{ color: '#ffffff', marginBottom: '24px' }}>Numbered Step Cards</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', maxWidth: '900px' }}>
              <NumberedStepCard
                stepNumber={1}
                title="Create Your Account"
                description="Sign up with your email and create a secure password"
              />
              <NumberedStepCard
                stepNumber={2}
                title="Verify Your Information"
                description="Confirm your email address and phone number"
              />
              <NumberedStepCard
                stepNumber={3}
                title="Choose Your Plan"
                description="Select the perfect plan that fits your needs"
              />
              <NumberedStepCard
                stepNumber={4}
                title="Start Using"
                description="Activate your service and begin your journey"
              />
            </div>
          </div>

          {/* Card Components */}
          <div style={{ marginBottom: '64px' }}>
            <h3 style={{ color: '#ffffff', marginBottom: '24px' }}>Cards</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '900px' }}>
              <Card shadow="md" padding="md">
                <h4 style={{ color: '#586271', marginBottom: '12px' }}>Standard Card</h4>
                <p style={{ color: '#8694AA', fontSize: '14px' }}>Medium shadow and padding</p>
              </Card>
              <Card shadow="lg" padding="lg">
                <h4 style={{ color: '#586271', marginBottom: '12px' }}>Large Card</h4>
                <p style={{ color: '#8694AA', fontSize: '14px' }}>Large shadow and padding</p>
              </Card>
              <Card shadow="sm" padding="sm">
                <h4 style={{ color: '#586271', marginBottom: '12px' }}>Subtle Card</h4>
                <p style={{ color: '#8694AA', fontSize: '14px' }}>Subtle shadow and padding</p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTASection Component */}
        <CTASection
          title="Ready to Experience the Difference?"
          description="Join thousands of satisfied customers and get connected today"
          ctaLabel="Get Started Now"
          onCtaClick={() => console.log('CTA clicked')}
        />

        <FAQSection />
        <CTAFooterSection />
      </main>
    </>
  );
}

export default App;
