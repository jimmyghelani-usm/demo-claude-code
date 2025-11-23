import { Page, expect } from '@playwright/test';

/**
 * Page Helper Utilities
 * Common functions for E2E testing across the application
 */

/**
 * Scroll to a specific element
 */
export async function scrollToElement(page: Page, selector: string) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  // Small delay to allow rendering after scroll
  await page.waitForTimeout(300);
}

/**
 * Scroll by a specific pixel amount
 */
export async function scrollByPixels(page: Page, pixels: number) {
  await page.evaluate((px) => {
    window.scrollBy(0, px);
  }, pixels);
  await page.waitForTimeout(300);
}

/**
 * Get current scroll position
 */
export async function getScrollPosition(page: Page): Promise<number> {
  return page.evaluate(() => window.scrollY);
}

/**
 * Scroll to top of page
 */
export async function scrollToTop(page: Page) {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);
}

/**
 * Scroll to bottom of page
 */
export async function scrollToBottom(page: Page) {
  await page.evaluate(() => {
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await page.waitForTimeout(300);
}

/**
 * Wait for element to be visible and clickable
 */
export async function waitForElementClickable(page: Page, selector: string) {
  const element = page.locator(selector);
  await element.waitFor({ state: 'visible' });
  await expect(element).toBeEnabled();
}

/**
 * Click element with retry logic
 */
export async function clickWithRetry(
  page: Page,
  selector: string,
  maxRetries = 3
) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      await page.locator(selector).click({ timeout: 5000 });
      return;
    } catch (error) {
      lastError = error;
      await page.waitForTimeout(200);
    }
  }
  throw lastError;
}

/**
 * Type text with delay between characters
 */
export async function typeWithDelay(
  page: Page,
  selector: string,
  text: string,
  delayMs = 50
) {
  const input = page.locator(selector);
  await input.focus();
  for (const char of text) {
    await input.type(char);
    await page.waitForTimeout(delayMs);
  }
}

/**
 * Take a screenshot with descriptive filename
 */
export async function takeNamedScreenshot(
  page: Page,
  filename: string,
  fullPage = false
) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotName = `${filename}-${timestamp}.png`;
  await page.screenshot({
    path: `e2e/screenshots/${screenshotName}`,
    fullPage,
  });
  return screenshotName;
}

/**
 * Check if element is in viewport
 */
export async function isElementInViewport(
  page: Page,
  selector: string
): Promise<boolean> {
  return page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }, selector);
}

/**
 * Get element computed styles
 */
export async function getElementStyles(
  page: Page,
  selector: string,
  properties: string[]
) {
  return page.evaluate(
    ({ sel, props }) => {
      const element = document.querySelector(sel);
      if (!element) return null;
      const styles = window.getComputedStyle(element);
      return props.reduce(
        (acc, prop) => {
          acc[prop] = styles.getPropertyValue(prop);
          return acc;
        },
        {} as Record<string, string>
      );
    },
    { sel: selector, props: properties }
  );
}

/**
 * Check if element has ARIA attribute
 */
export async function hasAriaAttribute(
  page: Page,
  selector: string,
  attribute: string
): Promise<boolean> {
  return page.locator(selector).evaluate((el, attr) => {
    return el.hasAttribute(attr);
  }, attribute);
}

/**
 * Get ARIA attribute value
 */
export async function getAriaAttribute(
  page: Page,
  selector: string,
  attribute: string
): Promise<string | null> {
  return page.locator(selector).getAttribute(attribute);
}

/**
 * Wait for animations to complete
 */
export async function waitForAnimations(page: Page, selector: string) {
  await page.locator(selector).evaluate((el) => {
    return new Promise((resolve) => {
      let animationCount = 0;
      const handleAnimationStart = () => animationCount++;
      const handleAnimationEnd = () => {
        animationCount--;
        if (animationCount === 0) {
          el.removeEventListener('animationstart', handleAnimationStart);
          el.removeEventListener('animationend', handleAnimationEnd);
          resolve(null);
        }
      };
      el.addEventListener('animationstart', handleAnimationStart);
      el.addEventListener('animationend', handleAnimationEnd);
      if (animationCount === 0) {
        resolve(null);
      }
    });
  });
}

/**
 * Get element dimensions
 */
export async function getElementDimensions(
  page: Page,
  selector: string
): Promise<{
  width: number;
  height: number;
  top: number;
  left: number;
}> {
  return page.locator(selector).evaluate((el) => {
    const rect = el.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top,
      left: rect.left,
    };
  });
}

/**
 * Check if element is sticky/fixed
 */
export async function isElementSticky(
  page: Page,
  selector: string
): Promise<boolean> {
  return page.locator(selector).evaluate((el) => {
    const position = window.getComputedStyle(el).position;
    return position === 'fixed' || position === 'sticky';
  });
}

/**
 * Emulate viewport
 */
export async function setViewport(page: Page, width: number, height: number) {
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(300);
}

/**
 * Get all text content from selector
 */
export async function getAllTextContent(page: Page, selector: string) {
  return page.locator(selector).allTextContents();
}

/**
 * Check if text is visible
 */
export async function isTextVisible(page: Page, text: string): Promise<boolean> {
  return page.locator(`text=${text}`).isVisible();
}

/**
 * Wait for text to appear
 */
export async function waitForText(page: Page, text: string, timeout = 5000) {
  await page.locator(`text=${text}`).waitFor({ state: 'visible', timeout });
}
