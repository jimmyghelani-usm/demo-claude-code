import { Page, expect } from '@playwright/test';

/**
 * Test Utilities for E2E Tests
 * Common assertion helpers and test data
 */

/**
 * Verify element is visible in viewport
 */
export async function expectElementVisible(page: Page, selector: string) {
  const element = page.locator(selector);
  await expect(element).toBeVisible();
  return element;
}

/**
 * Verify element has specific text
 */
export async function expectElementHasText(
  page: Page,
  selector: string,
  text: string
) {
  const element = page.locator(selector);
  await expect(element).toContainText(text);
  return element;
}

/**
 * Verify element has specific attribute value
 */
export async function expectElementAttribute(
  page: Page,
  selector: string,
  attribute: string,
  value: string | RegExp
) {
  const element = page.locator(selector);
  await expect(element).toHaveAttribute(attribute, value);
  return element;
}

/**
 * Count elements matching selector
 */
export async function countElements(
  page: Page,
  selector: string
): Promise<number> {
  return page.locator(selector).count();
}

/**
 * Get all text from elements
 */
export async function getElementsText(page: Page, selector: string) {
  return page.locator(selector).allTextContents();
}

/**
 * Wait for element and return it
 */
export async function waitForElement(
  page: Page,
  selector: string,
  timeout = 5000
) {
  await page.locator(selector).waitFor({ state: 'visible', timeout });
  return page.locator(selector);
}

/**
 * Check if element is disabled
 */
export async function isElementDisabled(page: Page, selector: string) {
  return page.locator(selector).isDisabled();
}

/**
 * Check if element is enabled
 */
export async function isElementEnabled(page: Page, selector: string) {
  return page.locator(selector).isEnabled();
}

/**
 * Verify responsive breakpoint
 */
export async function verifyResponsiveBreakpoint(
  page: Page,
  width: number,
  height: number
) {
  await page.setViewportSize({ width, height });
  const viewport = page.viewportSize();
  expect(viewport?.width).toBe(width);
  expect(viewport?.height).toBe(height);
}

/**
 * Mock image loading
 */
export async function mockImageLoading(page: Page) {
  await page.evaluate(() => {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
    });
  });
}

/**
 * Get performance metrics
 */
export async function getPerformanceMetrics(page: Page) {
  return page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      timeToFirstByte: navigation.responseStart - navigation.requestStart,
    };
  });
}

/**
 * Check for console errors
 */
export async function getConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  return errors;
}

/**
 * Test data for Business Page
 */
export const businessPageTestData = {
  header: {
    logo: 'US Mobile',
    navLinks: [
      { text: 'NETWORKS', href: '#networks' },
      { text: 'HOW IT WORKS', href: '#how-it-works' },
      { text: 'SHOP', href: '#shop' },
    ],
    ctaButton: 'GET STARTED',
    signIn: 'SIGN IN',
    iconButtons: [
      { label: 'Chat with us', icon: '💬' },
      { label: 'Shopping cart', icon: '🛍️' },
    ],
  },
  hero: {
    title: 'Welcome to US Mobile',
    subtitle: 'The most affordable network with premium coverage',
    minHeight: 500,
  },
  faq: {
    sampleQuestions: [
      'What makes US Mobile different?',
      'How do your plans work?',
      'Can I keep my existing phone number?',
      'What about international coverage?',
      'Do you offer 5G?',
      'How do I switch to US Mobile?',
      'What if I have technical issues?',
      'Can I pause my service?',
    ],
  },
  footer: {
    links: [
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
    ],
    socialLinks: ['Twitter', 'LinkedIn', 'Facebook', 'Instagram'],
  },
  viewports: {
    mobile: { width: 375, height: 812 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1440, height: 900 },
  },
};

/**
 * Create test context with common utilities
 */
export interface TestContext {
  page: Page;
  takeScreenshot: (name: string) => Promise<string>;
  expectVisible: (selector: string) => Promise<void>;
  expectText: (selector: string, text: string) => Promise<void>;
  expectAttribute: (selector: string, attr: string, value: string) => Promise<void>;
}

/**
 * Setup test context
 */
export function createTestContext(page: Page): TestContext {
  return {
    page,
    takeScreenshot: async (name: string) => {
      return page.screenshot({
        path: `e2e/screenshots/${name}-${Date.now()}.png`,
      }).then(() => name);
    },
    expectVisible: async (selector: string) => {
      await expect(page.locator(selector)).toBeVisible();
    },
    expectText: async (selector: string, text: string) => {
      await expect(page.locator(selector)).toContainText(text);
    },
    expectAttribute: async (selector: string, attr: string, value: string) => {
      await expect(page.locator(selector)).toHaveAttribute(attr, value);
    },
  };
}
