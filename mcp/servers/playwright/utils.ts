/**
 * Playwright MCP Utility Functions
 */

import { promises as fs } from 'fs';
import path from 'path';

/**
 * Extract the file path from a Playwright screenshot result
 *
 * @param result - The result string from takeScreenshot()
 * @returns The file path or null if not found
 *
 * @example
 * ```ts
 * const result = await takeScreenshot({ filename: 'test.png' });
 * const filePath = extractScreenshotPath(result);
 * // Returns: '/var/folders/.../test.png'
 * ```
 */
export function extractScreenshotPath(result: string): string | null {
  if (typeof result !== 'string') {
    return null;
  }

  // Match pattern: "saved it as /path/to/file.png"
  const match = result.match(/saved it as ([^\n]+)/);
  if (match && match[1]) {
    return match[1].trim();
  }

  return null;
}

/**
 * Copy a screenshot from Playwright's temp directory to a destination
 *
 * @param screenshotResult - The result string from takeScreenshot()
 * @param destPath - Destination file path (absolute)
 * @returns The destination path or null if screenshot not found
 *
 * @example
 * ```ts
 * const result = await takeScreenshot({ filename: 'test.png' });
 * const savedPath = await copyScreenshot(result, '/path/to/output/test.png');
 * ```
 */
export async function copyScreenshot(
  screenshotResult: string,
  destPath: string
): Promise<string | null> {
  const sourcePath = extractScreenshotPath(screenshotResult);

  if (!sourcePath) {
    console.error('Could not extract screenshot path from result:', screenshotResult);
    return null;
  }

  try {
    // Ensure destination directory exists
    const destDir = path.dirname(destPath);
    await fs.mkdir(destDir, { recursive: true });

    // Copy file
    await fs.copyFile(sourcePath, destPath);

    return destPath;
  } catch (error) {
    console.error('Failed to copy screenshot:', error);
    return null;
  }
}

/**
 * Read a screenshot from Playwright's temp directory
 *
 * @param screenshotResult - The result string from takeScreenshot()
 * @returns Buffer containing the image data or null if not found
 *
 * @example
 * ```ts
 * const result = await takeScreenshot({ filename: 'test.png' });
 * const imageBuffer = await readScreenshot(result);
 * ```
 */
export async function readScreenshot(
  screenshotResult: string
): Promise<Buffer | null> {
  const sourcePath = extractScreenshotPath(screenshotResult);

  if (!sourcePath) {
    console.error('Could not extract screenshot path from result:', screenshotResult);
    return null;
  }

  try {
    return await fs.readFile(sourcePath);
  } catch (error) {
    console.error('Failed to read screenshot:', error);
    return null;
  }
}
