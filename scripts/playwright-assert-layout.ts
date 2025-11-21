import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 10000 });
  } catch {
    console.log(JSON.stringify({ ok: false, reason: 'server-not-running' }));
    await browser.close();
    return;
  }

  const result: Record<string, unknown> = { ok: true };

  const viewport = page.viewportSize();
  result.viewport = viewport;

  // Hero section
  const heroHeading = page.getByRole('heading', { name: 'Given Out in Referral Rewards' });
  await heroHeading.waitFor({ timeout: 10000 });
  const heroSection = heroHeading.locator('xpath=ancestor::section[1]');
  const heroBox = await heroSection.boundingBox();

  // Next section after hero (assumes sections are direct children of main)
  const nextSectionHandle = await page.locator('main > section').nth(1);
  const nextBox = await nextSectionHandle.boundingBox();

  const footer = page.locator('footer');
  await footer.waitFor({ timeout: 10000 });
  const footerBox = await footer.boundingBox();

  const widthTolerance = 1; // px
  const gapTolerance = 1; // px

  const viewportWidth = viewport?.width ?? 0;
  const heroFullWidth = !!heroBox && Math.abs(heroBox.width - viewportWidth) <= widthTolerance;
  const footerFullWidth = !!footerBox && Math.abs(footerBox.width - viewportWidth) <= widthTolerance;

  let noGapBetweenHeroAndNext = false;
  if (heroBox && nextBox) {
    const heroBottom = heroBox.y + heroBox.height;
    const gap = Math.max(0, nextBox.y - heroBottom);
    noGapBetweenHeroAndNext = gap <= gapTolerance;
    result.gapHeroToNextPx = gap;
  }

  result.heroFullWidth = heroFullWidth;
  result.footerFullWidth = footerFullWidth;
  result.noGapBetweenHeroAndNext = noGapBetweenHeroAndNext;

  console.log(JSON.stringify(result));
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
