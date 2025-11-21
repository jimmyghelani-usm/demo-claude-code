import fs from 'fs';
import { promises as fsp } from 'fs';
import path from 'path';
import sharp from 'sharp';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

async function loadToPngBuffer(filePath: string, width?: number, height?: number) {
  const img = sharp(filePath).ensureAlpha();
  const meta = await img.metadata();
  let pipeline = img;
  if (width && height) {
    pipeline = img.resize(width, height, { fit: 'cover' });
  }
  const raw = await pipeline.raw().toBuffer();
  const w = width || meta.width || 0;
  const h = height || meta.height || 0;
  return { raw, width: w, height: h };
}

async function savePngFromRaw(raw: Buffer, width: number, height: number, outPath: string) {
  const png = new PNG({ width, height });
  // raw is RGBA already
  png.data.set(raw);
  await new Promise<void>((resolve, reject) => {
    png
      .pack()
      .pipe(fs.createWriteStream(outPath))
      .on('finish', () => resolve())
      .on('error', reject);
  });
}

async function main() {
  const [aPath, bPath] = process.argv.slice(2);
  if (!aPath || !bPath) {
    console.error('Usage: npx tsx scripts/compare-images.ts <figma.png> <local.png>');
    process.exit(1);
  }

  // Use B (local) dimensions as target
  const bMeta = await sharp(bPath).metadata();
  const targetW = bMeta.width || 0;
  const targetH = bMeta.height || 0;
  if (!targetW || !targetH) {
    console.error('Could not read dimensions of', bPath);
    process.exit(1);
  }

  const aRaw = await loadToPngBuffer(aPath, targetW, targetH);
  const bRaw = await loadToPngBuffer(bPath, targetW, targetH);

  const diff = Buffer.alloc(aRaw.width * aRaw.height * 4);
  const mismatched = pixelmatch(aRaw.raw, bRaw.raw, diff, aRaw.width, aRaw.height, {
    threshold: 0.1,
    includeAA: true,
  });
  const total = aRaw.width * aRaw.height;
  const percent = (mismatched / total) * 100;

  const outDir = path.resolve(process.cwd(), 'docs/temp/figma-screenshots');
  await fsp.mkdir(outDir, { recursive: true });
  const diffPath = path.join(outDir, `diff-${path.basename(aPath, '.png')}-vs-${path.basename(bPath, '.png')}.png`);
  await savePngFromRaw(diff, aRaw.width, aRaw.height, diffPath);

  console.log(JSON.stringify({ ok: true, mismatched, percent, diffPath, width: aRaw.width, height: aRaw.height }));
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
