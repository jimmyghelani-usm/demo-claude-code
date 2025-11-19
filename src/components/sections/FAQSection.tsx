import React from 'react';
import { FAQCard } from '../shared';
import { Button } from '../ui';
import styles from './FAQSection.module.css';

/**
 * FAQSection component - two-column accordion layout with FAQ cards
 * Light gradient background with CTA button at bottom
 */
export const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: 'What devices can I trade in?',
      answer:
        'You can trade in smartphones, tablets, smartwatches, and laptops from most major brands including Apple, Samsung, Google, and more. The device must be functional and in reasonable condition.',
    },
    {
      question: 'How is my trade-in value calculated?',
      answer:
        'Trade-in values are based on your device model, storage capacity, condition, and current market demand. Our instant quote tool gives you a transparent estimate based on these factors.',
    },
    {
      question: 'How long does the trade-in process take?',
      answer:
        "Once we receive your device, we inspect it within 1-2 business days. If everything checks out, you'll receive payment within 2-3 business days after inspection.",
    },
    {
      question: "What happens if my device condition doesn't match what I described?",
      answer:
        "If the condition differs significantly from your description, we'll send you a revised offer. You can accept the new offer or have your device returned to you at no cost.",
    },
    {
      question: 'Is my data safe?',
      answer:
        'Absolutely. We recommend you back up and erase your data before shipping. Once we receive your device, we perform a complete data wipe following industry-standard security protocols.',
    },
    {
      question: "Can I trade in a device that's not paid off?",
      answer:
        "You can trade in a device with an outstanding balance, but you're responsible for paying off the remaining amount to your carrier or financing company.",
    },
    {
      question: 'What payment methods are available?',
      answer:
        'You can receive payment via bank transfer, PayPal, or as credit toward your US Mobile account. Choose your preferred method when you submit your trade-in.',
    },
    {
      question: 'Do I need to include accessories?',
      answer:
        'No, you only need to send the device itself. Keep your charger, case, and other accessories. However, including original packaging may increase your trade-in value slightly.',
    },
  ];

  // Split FAQs into two columns
  const midpoint = Math.ceil(faqs.length / 2);
  const column1 = faqs.slice(0, midpoint);
  const column2 = faqs.slice(midpoint);

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.heading}>You've got questions, we've got answers!</h2>
        </header>

        <div className={styles.columns}>
          <div className={styles.column}>
            {column1.map((faq, index) => (
              <FAQCard
                key={index}
                question={faq.question}
                answer={faq.answer}
                defaultExpanded={index === 0}
              />
            ))}
          </div>

          <div className={styles.column}>
            {column2.map((faq, index) => (
              <FAQCard key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

        <div className={styles.ctaContainer}>
          <p className={styles.ctaText}>Still have questions?</p>
          <Button variant="primary" size="lg" onClick={() => {}}>
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};

FAQSection.displayName = 'FAQSection';
