import { chromium } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

async function main() {
  const baseUrl = 'http://localhost:3000';
  const outDir = path.resolve(process.cwd(), 'docs/temp/playwright-screenshots');
  await ensureDir(outDir);

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
  } catch (e) {
    console.error('Cannot reach local dev server at', baseUrl);
    console.log(JSON.stringify({ ok: false, reason: 'server-not-running' }));
    await browser.close();
    process.exit(0);
  }

  // Wait for hero heading text to be visible
  const heroHeading = page.getByRole('heading', { name: 'Given Out in Referral Rewards' });
  await heroHeading.waitFor({ timeout: 10000 });

  // Full page screenshot
  const pageShot = path.join(outDir, 'local-page-full.png');
  await page.screenshot({ path: pageShot, fullPage: true });

  // Hero screenshot (nearest section)
  const heroSection = heroHeading.locator('xpath=ancestor::section[1]');
  const heroShot = path.join(outDir, 'local-hero.png');
  await heroSection.screenshot({ path: heroShot });

  // Footer screenshot (footer element)
  const footer = page.locator('footer');
  await footer.waitFor({ timeout: 10000 });
  const footerShot = path.join(outDir, 'local-footer.png');
  await footer.screenshot({ path: footerShot });

  console.log(JSON.stringify({ ok: true, pageShot, heroShot, footerShot }));
  await browser.close();
}

main().catch(async (err) => {
  console.error('Error:', err);
  process.exit(1);
});
