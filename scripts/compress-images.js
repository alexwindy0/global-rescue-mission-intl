/* eslint-disable no-console */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const MAX_SIZE_KB = 500;

async function compressImage(filePath) {
  if (!fs.existsSync(filePath)) return;
  const stats = fs.statSync(filePath);
  const sizeKB = stats.size / 1024;

  if (sizeKB <= MAX_SIZE_KB) return;

  const ext = path.extname(filePath).toLowerCase();
  const buffer = fs.readFileSync(filePath);

  let processed;
  if (['.jpg', '.jpeg'].includes(ext)) {
    processed = await sharp(buffer).jpeg({ quality: 80, progressive: true }).toBuffer();
  } else if (ext === '.png') {
    processed = await sharp(buffer)
      .png({ compressionLevel: 8, adaptiveFiltering: true })
      .toBuffer();
  } else if (ext === '.webp') {
    processed = await sharp(buffer).webp({ quality: 80 }).toBuffer();
  } else {
    return; // Skip unsupported formats
  }

  fs.writeFileSync(filePath, processed);
  console.log(
    `Compressed: ${filePath} (${Math.round(sizeKB)}KB → ${Math.round(processed.length / 1024)}KB)`
  );
}

async function main() {
  const stagedFiles = process.argv.slice(2);
  const imageFiles = stagedFiles.filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f));

  for (const file of imageFiles) {
    await compressImage(file);
  }
}

main().catch((err) => {
  console.error('Image compression failed:', err);
  process.exit(1);
});
