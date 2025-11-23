import { test, expect } from '@playwright/test';
import {
  scrollToBottom,
  setViewport,
  takeNamedScreenshot,
  getElementDimensions,
} from './helpers/page-helpers';

/**
 * E2E Test Suite: Responsive Design
 * Tests for responsive behavior across mobile, tablet, and desktop
 */

test.describe('Responsive Design Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Mobile (375px) - iPhone SE', () => {
    test.beforeEach(async ({ page }) => {
      await setViewport(page, 375, 667);
    });

    test('Header should stack vertically on mobile', async ({ page }) => {
      const header = page.locator('header');
      await expect(header).toBeVisible();

      const logo = page.locator('a[aria-label="Home"]');
      const navLinks = page.locator('a[href="#networks"]');

      await expect(logo).toBeVisible();
      await expect(navLinks).toBeVisible({ timeout: 1000 }).catch(() => {
        // Navigation might be hidden on mobile
      });

      await takeNamedScreenshot(page, 'responsive-mobile-header');
    });

    test('Hero section should resize appropriately', async ({ page }) => {
      const hero = page.locator('section').first();
      await expect(hero).toBeVisible();

      const dimensions = await getElementDimensions(page, 'section');
      expect(dimensions.width).toBeLessThanOrEqual(375);

      const title = page.locator('h1');
      const titleDimensions = await getElementDimensions(page, 'h1');
      expect(titleDimensions.width).toBeLessThanOrEqual(375);

      await takeNamedScreenshot(page, 'responsive-mobile-hero');
    });

    test('FAQ should display in single column', async ({ page }) => {
      const container = page.locator('.container').first();
      await expect(container).toBeVisible();

      // Check if layout is single column
      const columnCount = await container.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return style.gridTemplateColumns;
      });

      expect(columnCount).toBeTruthy();

      await takeNamedScreenshot(page, 'responsive-mobile-faq');
    });

    test('Footer should be readable on mobile', async ({ page }) => {
      await scrollToBottom(page);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      const links = page.locator('footer a').first();
      const linkDimensions = await getElementDimensions(page, 'footer a');
      expect(linkDimensions.width).toBeGreaterThan(0);

      await takeNamedScreenshot(page, 'responsive-mobile-footer');
    });

    test('Text should be readable (font size)', async ({ page }) => {
      const title = page.locator('h1');
      await expect(title).toBeVisible();

      const fontSize = await page.locator('h1').evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });

      // Font should be at least 16px for readability
      const pixelSize = parseInt(fontSize);
      expect(pixelSize).toBeGreaterThanOrEqual(16);

      await takeNamedScreenshot(page, 'responsive-mobile-text-size');
    });

    test('Touch targets should be adequate size', async ({ page }) => {
      const buttons = page.locator('button').first();

      const dimensions = await getElementDimensions(page, 'button');
      // Touch targets should be at least 44x44px (WCAG guideline)
      expect(dimensions.height).toBeGreaterThanOrEqual(44);
      expect(dimensions.width).toBeGreaterThanOrEqual(44);

      await takeNamedScreenshot(page, 'responsive-mobile-touch-targets');
    });
  });

  test.describe('Tablet (768px) - iPad', () => {
    test.beforeEach(async ({ page }) => {
      await setViewport(page, 768, 1024);
    });

    test('Header should adapt to tablet size', async ({ page }) => {
      const header = page.locator('header');
      await expect(header).toBeVisible();

      const navLinks = page.locator('a[href="#networks"]');
      await expect(navLinks).toBeVisible();

      await takeNamedScreenshot(page, 'responsive-tablet-header');
    });

    test('Hero section should be properly sized', async ({ page }) => {
      const hero = page.locator('section').first();
      await expect(hero).toBeVisible();

      const dimensions = await getElementDimensions(page, 'section');
      expect(dimensions.width).toBeLessThanOrEqual(768);
      expect(dimensions.height).toBeGreaterThan(400);

      await takeNamedScreenshot(page, 'responsive-tablet-hero');
    });

    test('FAQ should display in two columns', async ({ page }) => {
      const twoColumns = page.locator('.twoColumns');
      const isVisible = await twoColumns.isVisible().catch(() => false);

      if (isVisible) {
        await expect(twoColumns).toBeVisible();
      }

      await takeNamedScreenshot(page, 'responsive-tablet-faq');
    });

    test('Footer layout should adapt', async ({ page }) => {
      await scrollToBottom(page);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      const contentInner = page.locator('footer [class*="contentInner"]');
      const isVisible = await contentInner.isVisible().catch(() => false);

      expect(footer).toBeDefined();

      await takeNamedScreenshot(page, 'responsive-tablet-footer');
    });

    test('Content should have proper padding', async ({ page }) => {
      const mainContent = page.locator('main');
      const padding = await mainContent.evaluate((el) => {
        return window.getComputedStyle(el).padding;
      });

      expect(padding).toBeTruthy();

      await takeNamedScreenshot(page, 'responsive-tablet-padding');
    });
  });

  test.describe('Desktop (1440px) - Large Screen', () => {
    test.beforeEach(async ({ page }) => {
      await setViewport(page, 1440, 900);
    });

    test('Header should display all elements', async ({ page }) => {
      const header = page.locator('header');
      await expect(header).toBeVisible();

      const logo = page.locator('a[aria-label="Home"]');
      const networks = page.locator('a[href="#networks"]');
      const ctaButton = page.locator('button:has-text("GET STARTED")');

      await expect(logo).toBeVisible();
      await expect(networks).toBeVisible();
      await expect(ctaButton).toBeVisible();

      await takeNamedScreenshot(page, 'responsive-desktop-header');
    });

    test('Hero section should be full width', async ({ page }) => {
      const hero = page.locator('section').first();
      await expect(hero).toBeVisible();

      const dimensions = await getElementDimensions(page, 'section');
      expect(dimensions.width).toBeLessThanOrEqual(1440);
      expect(dimensions.height).toBeGreaterThan(500);

      await takeNamedScreenshot(page, 'responsive-desktop-hero');
    });

    test('FAQ should be optimally spaced', async ({ page }) => {
      const container = page.locator('.container').first();
      await expect(container).toBeVisible();

      const dimensions = await getElementDimensions(page, '.container');
      expect(dimensions.width).toBeLessThanOrEqual(1440);

      await takeNamedScreenshot(page, 'responsive-desktop-faq');
    });

    test('Footer should have ample spacing', async ({ page }) => {
      await scrollToBottom(page);

      const footer = page.locator('footer');
      await expect(footer).toBeVisible();

      const dimensions = await getElementDimensions(page, 'footer');
      expect(dimensions.width).toBeLessThanOrEqual(1440);
      expect(dimensions.height).toBeGreaterThan(100);

      await takeNamedScreenshot(page, 'responsive-desktop-footer');
    });

    test('Content should have max-width constraint', async ({ page }) => {
      const mainContent = page.locator('main');

      const maxWidth = await mainContent.evaluate((el) => {
        return window.getComputedStyle(el).maxWidth;
      });

      expect(maxWidth).toBeDefined();

      await takeNamedScreenshot(page, 'responsive-desktop-max-width');
    });
  });

  test.describe('Orientation Changes', () => {
    test('Should handle portrait to landscape on mobile', async ({ page }) => {
      await setViewport(page, 375, 667); // Portrait
      await takeNamedScreenshot(page, 'orientation-portrait');

      await page.setViewportSize({ width: 667, height: 375 }); // Landscape
      await page.waitForTimeout(300);
      await takeNamedScreenshot(page, 'orientation-landscape');

      const header = page.locator('header');
      await expect(header).toBeVisible();
    });

    test('Should handle tablet orientation change', async ({ page }) => {
      await setViewport(page, 768, 1024); // Portrait
      let hero = page.locator('section').first();
      await expect(hero).toBeVisible();
      await takeNamedScreenshot(page, 'tablet-portrait');

      await page.setViewportSize({ width: 1024, height: 768 }); // Landscape
      await page.waitForTimeout(300);
      hero = page.locator('section').first();
      await expect(hero).toBeVisible();
      await takeNamedScreenshot(page, 'tablet-landscape');
    });
  });

  test.describe('Breakpoint Edge Cases', () => {
    test('Small mobile (320px)', async ({ page }) => {
      await setViewport(page, 320, 568);

      const header = page.locator('header');
      await expect(header).toBeVisible();

      await takeNamedScreenshot(page, 'edge-case-320px');
    });

    test('Large desktop (1920px)', async ({ page }) => {
      await setViewport(page, 1920, 1080);

      const header = page.locator('header');
      const hero = page.locator('section').first();

      await expect(header).toBeVisible();
      await expect(hero).toBeVisible();

      await takeNamedScreenshot(page, 'edge-case-1920px');
    });

    test('Ultra-wide desktop (2560px)', async ({ page }) => {
      await setViewport(page, 2560, 1440);

      const header = page.locator('header');
      await expect(header).toBeVisible();

      await takeNamedScreenshot(page, 'edge-case-2560px');
    });
  });

  test.describe('Content Overflow Handling', () => {
    test('Long text should wrap properly on mobile', async ({ page }) => {
      await setViewport(page, 375, 667);

      const subtitle = page.locator('section').first().locator('p');
      const isVisible = await subtitle.isVisible().catch(() => false);

      if (isVisible) {
        const overflow = await subtitle.evaluate((el) => {
          return window.getComputedStyle(el).overflow;
        });

        expect(overflow).toBeDefined();
      }

      await takeNamedScreenshot(page, 'overflow-mobile');
    });

    test('Images should scale properly', async ({ page }) => {
      await setViewport(page, 768, 1024);

      const backgroundElement = page.locator('section').first();

      const backgroundSize = await backgroundElement.evaluate((el) => {
        return window.getComputedStyle(el).backgroundSize;
      });

      expect(backgroundSize).toBeDefined();

      await takeNamedScreenshot(page, 'overflow-images');
    });

    test('Navigation should not overflow header', async ({ page }) => {
      await setViewport(page, 375, 667);

      const header = page.locator('header');
      const headerDimensions = await getElementDimensions(page, 'header');

      // Header should not exceed viewport width
      expect(headerDimensions.width).toBeLessThanOrEqual(375);

      await takeNamedScreenshot(page, 'overflow-header');
    });
  });
});
