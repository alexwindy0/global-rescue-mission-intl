/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

const MAX_SIZE_KB = 500;
const IMAGE_DIRS = ['src', 'public/images'];

function checkImages(dir) {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let violations = [];

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      violations = violations.concat(checkImages(fullPath));
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(file.name)) {
      const sizeKB = fs.statSync(fullPath).size / 1024;
      if (sizeKB > MAX_SIZE_KB) {
        violations.push(`${fullPath}: ${Math.round(sizeKB)}KB (max ${MAX_SIZE_KB}KB)`);
      }
    }
  }
  return violations;
}

const violations = IMAGE_DIRS.flatMap(checkImages);
if (violations.length > 0) {
  console.error('Image size violations found:');
  violations.forEach((v) => console.error(`  - ${v}`));
  process.exit(1);
}
console.log('All images within size limits.');
