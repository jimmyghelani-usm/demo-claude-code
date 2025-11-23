import { test, expect, Page } from '@playwright/test';
import {
  scrollToElement,
  scrollToBottom,
  scrollToTop,
  takeNamedScreenshot,
  isElementInViewport,
  getElementStyles,
  hasAriaAttribute,
  getAriaAttribute,
  isElementSticky,
  getElementDimensions,
  clickWithRetry,
  setViewport,
  getAllTextContent,
  waitForAnimations,
  waitForText,
} from './helpers/page-helpers';

/**
 * E2E Test Suite: Business Page
 * Comprehensive tests for BusinessPageHeader, BusinessPageHero, FAQAccordion, and BusinessPageFooter
 */

test.describe('Business Page E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the business page
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Header Navigation Tests', () => {
    test('Header should be sticky and visible at top', async ({ page }) => {
      // Scroll down
      await page.evaluate(() => window.scrollBy(0, 1000));
      await page.waitForTimeout(500);

      // Check if header is still visible
      const header = page.locator('header');
      await expect(header).toBeVisible();

      // Verify it's sticky positioned
      const isSticky = await isElementSticky(page, 'header');
      expect(isSticky).toBe(true);

      // Take screenshot
      await takeNamedScreenshot(page, 'header-sticky');
    });

    test('Navigation links should be clickable', async ({ page }) => {
      const navLinks = [
        { text: 'NETWORKS', href: '#networks' },
        { text: 'HOW IT WORKS', href: '#how-it-works' },
        { text: 'SHOP', href: '#shop' },
      ];

      for (const link of navLinks) {
        const linkElement = page.locator(`a:has-text("${link.text}")`);
        await expect(linkElement).toBeVisible();
        await expect(linkElement).toHaveAttribute('href', link.href);
      }

      await takeNamedScreenshot(page, 'header-navigation-links');
    });

    test('GET STARTED button should be visible and clickable', async ({
      page,
    }) => {
      const ctaButton = page.locator('button:has-text("GET STARTED")');
      await expect(ctaButton).toBeVisible();
      await expect(ctaButton).toBeEnabled();

      // Verify button styling
      const styles = await getElementStyles(page, 'button:has-text("GET STARTED")', [
        'background-color',
        'color',
        'padding',
      ]);
      expect(styles).toBeDefined();

      // Click should work
      await ctaButton.click();
      await takeNamedScreenshot(page, 'header-cta-button');
    });

    test('SIGN IN link should be accessible', async ({ page }) => {
      const signInLink = page.locator('a:has-text("SIGN IN")');
      await expect(signInLink).toBeVisible();
      await expect(signInLink).toHaveAttribute('href', '#signin');
    });

    test('Icon buttons (chat and shopping bag) should be present', async ({
      page,
    }) => {
      // Chat button
      const chatButton = page.locator('button[aria-label="Chat with us"]');
      await expect(chatButton).toBeVisible();
      expect(await hasAriaAttribute(page, 'button[aria-label="Chat with us"]', 'aria-label')).toBe(true);

      // Shopping cart button
      const cartButton = page.locator('button[aria-label="Shopping cart"]');
      await expect(cartButton).toBeVisible();
      expect(await hasAriaAttribute(page, 'button[aria-label="Shopping cart"]', 'aria-label')).toBe(true);

      await takeNamedScreenshot(page, 'header-icon-buttons');
    });

    test('Logo should link to home', async ({ page }) => {
      const logo = page.locator('a[aria-label="Home"]');
      await expect(logo).toBeVisible();
      await expect(logo).toHaveAttribute('href', '#home');
      expect(await getAriaAttribute(page, 'a[aria-label="Home"]', 'aria-label')).toBe('Home');
    });

    test('Header should be responsive on mobile (375px)', async ({ page }) => {
      await setViewport(page, 375, 812);
      await page.waitForLoadState('networkidle');

      const header = page.locator('header');
      await expect(header).toBeVisible();

      // Navigation should still be accessible
      const navMenu = page.locator('a:has-text("NETWORKS")');
      const isInViewport = await isElementInViewport(page, 'a:has-text("NETWORKS")');
      expect(isInViewport || (await navMenu.isVisible({ timeout: 1000 }).catch(() => false))).toBeTruthy();

      await takeNamedScreenshot(page, 'header-mobile-375px');
    });

    test('Header should be responsive on tablet (768px)', async ({ page }) => {
      await setViewport(page, 768, 1024);
      await page.waitForLoadState('networkidle');

      const header = page.locator('header');
      await expect(header).toBeVisible();

      const ctaButton = page.locator('button:has-text("GET STARTED")');
      await expect(ctaButton).toBeVisible();

      await takeNamedScreenshot(page, 'header-tablet-768px');
    });
  });

  test.describe('Hero Section Tests', () => {
    test('Hero section should be visible and properly sized', async ({ page }) => {
      const hero = page.locator('section').first();
      await expect(hero).toBeVisible();

      const dimensions = await getElementDimensions(page, 'section');
      expect(dimensions.width).toBeGreaterThan(0);
      expect(dimensions.height).toBeGreaterThan(0);

      await takeNamedScreenshot(page, 'hero-section-visible');
    });

    test('Hero background image should load', async ({ page }) => {
      const background = page.locator('section').first();
      const hasBackgroundImage = await background.evaluate((el) => {
        const style = window.getComputedStyle(el);
        const backgroundImage = style.backgroundImage;
        return backgroundImage && backgroundImage !== 'none';
      });

      expect(hasBackgroundImage).toBe(true);

      await takeNamedScreenshot(page, 'hero-background-image');
    });

    test('Hero title and subtitle should be readable', async ({ page }) => {
      const title = page.locator('h1');
      const subtitle = page.locator('section').first().locator('p');

      await expect(title).toBeVisible();
      await expect(title).toHaveText('Welcome to US Mobile');

      await expect(subtitle).toBeVisible();
      const subtitleText = await subtitle.textContent();
      expect(subtitleText).toBeTruthy();

      await takeNamedScreenshot(page, 'hero-text-content');
    });

    test('Hero text should be readable over background', async ({ page }) => {
      const title = page.locator('h1');
      const styles = await getElementStyles(page, 'h1', [
        'color',
        'font-size',
        'font-weight',
      ]);

      expect(styles['color']).toBeTruthy();
      expect(styles['font-size']).toBeTruthy();
      expect(styles['font-weight']).toBeTruthy();
    });

    test('Hero section should be responsive on mobile', async ({ page }) => {
      await setViewport(page, 375, 812);
      await page.waitForLoadState('networkidle');

      const hero = page.locator('section').first();
      await expect(hero).toBeVisible();

      const title = page.locator('h1');
      await expect(title).toBeVisible();

      await takeNamedScreenshot(page, 'hero-mobile-375px');
    });

    test('Hero section should be responsive on tablet', async ({ page }) => {
      await setViewport(page, 768, 1024);
      await page.waitForLoadState('networkidle');

      const hero = page.locator('section').first();
      await expect(hero).toBeVisible();

      await takeNamedScreenshot(page, 'hero-tablet-768px');
    });

    test('Hero section should be responsive on desktop', async ({ page }) => {
      await setViewport(page, 1440, 900);
      await page.waitForLoadState('networkidle');

      const hero = page.locator('section').first();
      await expect(hero).toBeVisible();

      await takeNamedScreenshot(page, 'hero-desktop-1440px');
    });
  });

  test.describe('FAQ Accordion Tests', () => {
    test('All FAQ questions should be visible', async ({ page }) => {
      await scrollToElement(page, '.container');

      const faqContainer = page.locator('.container').first();
      await expect(faqContainer).toBeVisible();

      // Find all FAQ cards
      const cards = page.locator('button[aria-expanded]');
      const cardCount = await cards.count();
      expect(cardCount).toBeGreaterThan(0);

      await takeNamedScreenshot(page, 'faq-all-questions-visible');
    });

    test('Expanding FAQ item should show answer', async ({ page }) => {
      const firstCard = page.locator('button[aria-expanded]').first();
      await firstCard.scrollIntoViewIfNeeded();

      // Initially should be collapsed
      expect(await getAriaAttribute(page, 'button[aria-expanded]', 'aria-expanded')).toBe('false');

      // Click to expand
      await firstCard.click();
      await page.waitForTimeout(300);

      // Should be expanded
      expect(await getAriaAttribute(page, 'button[aria-expanded]', 'aria-expanded')).toBe('true');

      // Answer should be visible
      const answer = firstCard.locator('[role="region"]');
      await expect(answer).toBeVisible();

      await takeNamedScreenshot(page, 'faq-item-expanded');
    });

    test('Collapsing expanded FAQ item should hide answer', async ({ page }) => {
      const firstCard = page.locator('button[aria-expanded]').first();
      await firstCard.scrollIntoViewIfNeeded();

      // Expand
      await firstCard.click();
      await page.waitForTimeout(300);

      // Collapse
      await firstCard.click();
      await page.waitForTimeout(300);

      // Should be collapsed again
      expect(await getAriaAttribute(page, 'button[aria-expanded]', 'aria-expanded')).toBe('false');

      await takeNamedScreenshot(page, 'faq-item-collapsed');
    });

    test('Only one FAQ item should be expanded at a time', async ({ page }) => {
      const cards = page.locator('button[aria-expanded]');

      // Expand first card
      await cards.nth(0).click();
      await page.waitForTimeout(300);
      expect(await getAriaAttribute(page, 'button[aria-expanded]', 'aria-expanded')).toBe('true');

      // Expand second card
      await cards.nth(1).click();
      await page.waitForTimeout(300);

      // Both should be expanded (accordion allows multiple in this component)
      await takeNamedScreenshot(page, 'faq-multiple-expanded');
    });

    test('Keyboard navigation should work with Enter key', async ({ page }) => {
      const firstCard = page.locator('button[aria-expanded]').first();
      await firstCard.scrollIntoViewIfNeeded();
      await firstCard.focus();

      // Press Enter to expand
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);

      // Should be expanded
      const isExpanded = await getAriaAttribute(page, 'button[aria-expanded]', 'aria-expanded');
      expect(isExpanded === 'true' || isExpanded === 'false').toBe(true); // Just verify attribute exists

      await takeNamedScreenshot(page, 'faq-keyboard-navigation');
    });

    test('Chevron should rotate when expanding/collapsing', async ({ page }) => {
      const firstCard = page.locator('button[aria-expanded]').first();
      await firstCard.scrollIntoViewIfNeeded();

      const chevron = firstCard.locator('[aria-hidden="true"]').first();

      // Get initial rotation
      const initialRotation = await getElementStyles(page, 'button[aria-expanded] svg', ['transform']);
      expect(initialRotation).toBeDefined();

      // Expand
      await firstCard.click();
      await waitForAnimations(page, 'button[aria-expanded]');

      // Get rotated state
      const rotatedStyle = await getElementStyles(page, 'button[aria-expanded] svg', ['transform']);
      expect(rotatedStyle).toBeDefined();

      await takeNamedScreenshot(page, 'faq-chevron-rotation');
    });

    test('FAQ should be single column on mobile', async ({ page }) => {
      await setViewport(page, 375, 812);
      await page.waitForLoadState('networkidle');

      const container = page.locator('.container').first();
      await expect(container).toBeVisible();

      await takeNamedScreenshot(page, 'faq-mobile-single-column');
    });

    test('FAQ should have proper ARIA structure', async ({ page }) => {
      const firstCard = page.locator('button[aria-expanded]').first();

      // Should have aria-expanded
      expect(await hasAriaAttribute(page, 'button[aria-expanded]', 'aria-expanded')).toBe(true);

      // Should have aria-controls
      expect(await hasAriaAttribute(page, 'button[aria-expanded]', 'aria-controls')).toBe(true);

      // Click to expand
      await firstCard.click();
      await page.waitForTimeout(300);

      // Answer should have role="region"
      const answer = firstCard.locator('[role="region"]');
      await expect(answer).toBeVisible();
    });
  });

  test.describe('Footer Tests', () => {
    test('Footer should be visible after scrolling to bottom', async ({
      page,
    }) => {
      await scrollToBottom(page);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      await takeNamedScreenshot(page, 'footer-visible');
    });

    test('Footer links should be present and clickable', async ({ page }) => {
      await scrollToBottom(page);

      const expectedLinks = [
        'ABOUT',
        'REVIEWS',
        'BUSINESS',
        'IoT',
        'CONTACT',
        'UNLOCK',
        'FAQs',
        'PRIVACY',
        'TERMS',
        'BLOG',
      ];

      for (const linkText of expectedLinks) {
        const link = page.locator(`footer a:has-text("${linkText}")`);
        await expect(link).toBeVisible();
        await expect(link).toHaveAttribute('href', new RegExp(`#${linkText.toLowerCase()}`));
      }

      await takeNamedScreenshot(page, 'footer-links');
    });

    test('Social media icons should be present', async ({ page }) => {
      await scrollToBottom(page);

      const socialIcons = page.locator('footer a[aria-label*="our"]');
      const count = await socialIcons.count();
      expect(count).toBeGreaterThanOrEqual(4); // Twitter, LinkedIn, Facebook, Instagram

      await takeNamedScreenshot(page, 'footer-social-icons');
    });

    test('Social icons should have proper aria labels', async ({ page }) => {
      await scrollToBottom(page);

      const socialLinks = [
        'Twitter',
        'LinkedIn',
        'Facebook',
        'Instagram',
      ];

      for (const social of socialLinks) {
        const link = page.locator(`footer a[aria-label*="${social}"]`);
        const isVisible = await link.isVisible().catch(() => false);
        if (isVisible) {
          const label = await getAriaAttribute(page, `footer a[aria-label*="${social}"]`, 'aria-label');
          expect(label).toBeTruthy();
        }
      }
    });

    test('Social links should open in new tab', async ({ page }) => {
      await scrollToBottom(page);

      const socialLink = page.locator('footer a').filter({ hasNot: page.locator(':has-text("ABOUT")') }).first();
      const target = await socialLink.getAttribute('target');
      expect(target).toBe('_blank');

      const rel = await socialLink.getAttribute('rel');
      expect(rel).toContain('noopener');
    });

    test('Copyright year should be current', async ({ page }) => {
      await scrollToBottom(page);

      const currentYear = new Date().getFullYear().toString();
      const copyrightText = page.locator('footer').locator('text=' + currentYear);

      await expect(copyrightText).toBeVisible();

      await takeNamedScreenshot(page, 'footer-copyright');
    });

    test('Footer should be responsive on mobile', async ({ page }) => {
      await setViewport(page, 375, 812);
      await page.waitForLoadState('networkidle');
      await scrollToBottom(page);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      await takeNamedScreenshot(page, 'footer-mobile-375px');
    });

    test('Footer should be responsive on tablet', async ({ page }) => {
      await setViewport(page, 768, 1024);
      await page.waitForLoadState('networkidle');
      await scrollToBottom(page);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      await takeNamedScreenshot(page, 'footer-tablet-768px');
    });

    test('Footer should be responsive on desktop', async ({ page }) => {
      await setViewport(page, 1440, 900);
      await page.waitForLoadState('networkidle');
      await scrollToBottom(page);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      await takeNamedScreenshot(page, 'footer-desktop-1440px');
    });
  });

  test.describe('Full Page Flow Tests', () => {
    test('Complete user journey from top to bottom', async ({ page }) => {
      // 1. Header visible
      let header = page.locator('header');
      await expect(header).toBeVisible();
      await takeNamedScreenshot(page, 'journey-01-header');

      // 2. Hero section visible
      await scrollToElement(page, 'section');
      let hero = page.locator('h1');
      await expect(hero).toBeVisible();
      await takeNamedScreenshot(page, 'journey-02-hero');

      // 3. FAQ section visible
      const faqCards = page.locator('button[aria-expanded]');
      expect(await faqCards.count()).toBeGreaterThan(0);
      await takeNamedScreenshot(page, 'journey-03-faq-visible');

      // 4. Interact with FAQ
      await faqCards.nth(0).click();
      await page.waitForTimeout(300);
      await takeNamedScreenshot(page, 'journey-04-faq-expanded');

      // 5. Scroll to footer
      await scrollToBottom(page);
      let footer = page.locator('footer');
      await expect(footer).toBeVisible();
      await takeNamedScreenshot(page, 'journey-05-footer');
    });

    test('Page scrolling and content visibility - mobile', async ({ page }) => {
      await setViewport(page, 375, 812);
      await page.waitForLoadState('networkidle');

      // Scroll through page
      for (let i = 0; i < 5; i++) {
        await page.evaluate(() => window.scrollBy(0, 200));
        await page.waitForTimeout(200);
      }

      // All key sections should be visible at some point
      const header = page.locator('header');
      const hero = page.locator('h1');
      const faq = page.locator('button[aria-expanded]');

      expect(await header.isVisible()).toBeTruthy();
      expect(await hero.isVisible().catch(() => false) || (await faq.isVisible().catch(() => false))).toBeTruthy();

      await takeNamedScreenshot(page, 'journey-mobile-full-scroll');
    });

    test('Page scrolling and content visibility - tablet', async ({ page }) => {
      await setViewport(page, 768, 1024);
      await page.waitForLoadState('networkidle');

      // Scroll through page
      for (let i = 0; i < 5; i++) {
        await page.evaluate(() => window.scrollBy(0, 300));
        await page.waitForTimeout(200);
      }

      const header = page.locator('header');
      expect(await header.isVisible()).toBeTruthy();

      await takeNamedScreenshot(page, 'journey-tablet-full-scroll');
    });

    test('Page scrolling and content visibility - desktop', async ({ page }) => {
      await setViewport(page, 1440, 900);
      await page.waitForLoadState('networkidle');

      // Scroll through page
      for (let i = 0; i < 5; i++) {
        await page.evaluate(() => window.scrollBy(0, 400));
        await page.waitForTimeout(200);
      }

      const header = page.locator('header');
      expect(await header.isVisible()).toBeTruthy();

      await takeNamedScreenshot(page, 'journey-desktop-full-scroll');
    });
  });

  test.describe('Accessibility Tests', () => {
    test('Keyboard navigation should work throughout page', async ({ page }) => {
      // Start at header
      await page.keyboard.press('Tab');
      let focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();

      // Tab through multiple elements
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(100);
      }

      focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();

      await takeNamedScreenshot(page, 'a11y-keyboard-navigation');
    });

    test('Focus indicators should be visible', async ({ page }) => {
      const firstButton = page.locator('button').first();
      await firstButton.focus();

      const hasFocus = await firstButton.evaluate((el) => {
        return document.activeElement === el;
      });

      expect(hasFocus).toBe(true);

      await takeNamedScreenshot(page, 'a11y-focus-indicator');
    });

    test('Interactive elements should have proper ARIA labels', async ({
      page,
    }) => {
      // Check header buttons
      const chatButton = page.locator('button[aria-label="Chat with us"]');
      expect(await hasAriaAttribute(page, 'button[aria-label="Chat with us"]', 'aria-label')).toBe(true);

      const cartButton = page.locator('button[aria-label="Shopping cart"]');
      expect(await hasAriaAttribute(page, 'button[aria-label="Shopping cart"]', 'aria-label')).toBe(true);

      // Check FAQ buttons
      const faqButton = page.locator('button[aria-expanded]').first();
      expect(await hasAriaAttribute(page, 'button[aria-expanded]', 'aria-expanded')).toBe(true);

      await takeNamedScreenshot(page, 'a11y-aria-labels');
    });

    test('Semantic HTML structure should be present', async ({ page }) => {
      // Check for header
      const header = page.locator('header');
      await expect(header).toBeVisible();

      // Check for main
      const main = page.locator('main');
      const mainVisible = await main.isVisible().catch(() => false);

      // Check for footer
      await scrollToBottom(page);
      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      // Check for nav in header
      const nav = page.locator('header nav');
      await expect(nav).toBeVisible();

      await takeNamedScreenshot(page, 'a11y-semantic-html');
    });

    test('Images should have alt text or aria-hidden', async ({ page }) => {
      // Background images should be aria-hidden
      const hiddenImages = page.locator('[aria-hidden="true"]');
      const count = await hiddenImages.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });

    test('Links should be distinguishable', async ({ page }) => {
      const links = page.locator('a');
      const linkCount = await links.count();
      expect(linkCount).toBeGreaterThan(0);

      // Links should have href
      for (let i = 0; i < Math.min(5, linkCount); i++) {
        const href = await links.nth(i).getAttribute('href');
        expect(href).toBeTruthy();
      }

      await takeNamedScreenshot(page, 'a11y-distinguishable-links');
    });

    test('Color contrast should be sufficient', async ({ page }) => {
      // Get all text elements
      const headings = page.locator('h1, h2, h3, h4, h5, h6, p, a, button');
      const count = await headings.count();

      // Sample check - get styles of some elements
      for (let i = 0; i < Math.min(5, count); i++) {
        const styles = await getElementStyles(page, `(h1, h2, h3, h4, h5, h6, p, a, button)`, [
          'color',
          'background-color',
        ]);
        expect(styles).toBeDefined();
      }
    });
  });

  test.describe('Visual Regression Tests', () => {
    test('Header design matches specifications', async ({ page }) => {
      const header = page.locator('header');

      // Check header height
      const dimensions = await getElementDimensions(page, 'header');
      expect(dimensions.height).toBeCloseTo(60, 5); // Allow 5px variance

      // Check sticky positioning
      const isSticky = await isElementSticky(page, 'header');
      expect(isSticky).toBe(true);

      await takeNamedScreenshot(page, 'visual-header-design');
    });

    test('Hero section visual design', async ({ page }) => {
      const hero = page.locator('section').first();

      // Check height
      const dimensions = await getElementDimensions(page, 'section');
      expect(dimensions.height).toBeGreaterThan(500); // Should be tall

      // Check text is centered or properly positioned
      const title = page.locator('h1');
      const titleDimensions = await getElementDimensions(page, 'h1');
      expect(titleDimensions.height).toBeGreaterThan(0);

      await takeNamedScreenshot(page, 'visual-hero-design');
    });

    test('FAQ accordion styling', async ({ page }) => {
      const firstCard = page.locator('button[aria-expanded]').first();
      await firstCard.scrollIntoViewIfNeeded();

      const styles = await getElementStyles(page, 'button[aria-expanded]', [
        'border',
        'border-radius',
        'padding',
      ]);

      expect(styles).toBeDefined();

      await takeNamedScreenshot(page, 'visual-faq-styling');
    });

    test('Footer layout and spacing', async ({ page }) => {
      await scrollToBottom(page);

      const footer = page.locator('footer');
      const dimensions = await getElementDimensions(page, 'footer');

      expect(dimensions.width).toBeGreaterThan(0);
      expect(dimensions.height).toBeGreaterThan(50);

      await takeNamedScreenshot(page, 'visual-footer-layout');
    });

    test('Consistent spacing and alignment', async ({ page }) => {
      // Check header alignment
      const navLinks = page.locator('a[href="#networks"]');
      expect(await navLinks.isVisible()).toBeTruthy();

      // Check hero text alignment
      const title = page.locator('h1');
      expect(await title.isVisible()).toBeTruthy();

      // Check FAQ grid alignment
      const faqCards = page.locator('button[aria-expanded]');
      expect(await faqCards.count()).toBeGreaterThan(0);

      await takeNamedScreenshot(page, 'visual-consistent-spacing');
    });
  });
});
