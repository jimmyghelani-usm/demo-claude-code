import { ReferralRewardsHero } from '@/components/sections';

/**
 * Demo page to showcase the ReferralRewardsHero component
 */
export function ReferralRewardsDemo() {
  const handleCtaClick = () => {
    // Navigate to sign up or other action
    // You can implement navigation or other logic here
    window.location.href = '/signup';
  };

  return (
    <div style={{ backgroundColor: '#000000', minHeight: '100vh' }}>
      <ReferralRewardsHero
        targetAmount={1000000}
        animationDuration={2000}
        onCtaClick={handleCtaClick}
      />
    </div>
  );
}
