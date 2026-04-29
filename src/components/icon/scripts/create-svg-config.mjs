#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { extractSvgData, iconNameFromFilename } from './svg-config-utils.mjs';

function processFile(filePath) {
  const svgContent = fs.readFileSync(filePath, 'utf-8');
  const name = iconNameFromFilename(filePath);
  const config = extractSvgData(svgContent);

  console.log(`\n// ${path.basename(filePath)} -> ${name}`);
  console.log(`export const ${name} = ${JSON.stringify(config, null, 2)};`);
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node create-svg-config.mjs <file.svg | directory/>');
    process.exit(1);
  }

  args.forEach((arg) => {
    const resolved = path.resolve(arg);
    const stat = fs.statSync(resolved);

    if (stat.isDirectory()) {
      const svgFiles = fs.readdirSync(resolved)
        .filter((f) => f.endsWith('.svg'))
        .sort();

      if (svgFiles.length === 0) {
        console.error(`No .svg files found in ${resolved}`);
        return;
      }

      console.log(`// Found ${svgFiles.length} SVG file(s) in ${arg}`);
      svgFiles.forEach((f) => processFile(path.join(resolved, f)));
    } else {
      processFile(resolved);
    }
  });
}

main();
