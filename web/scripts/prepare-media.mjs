import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const content = JSON.parse(await readFile(new URL('../src/content/horizonte.json', import.meta.url), 'utf8'));
const source = new URL('../../Horizonte/', import.meta.url);
const output = new URL('../public/pilot-media/', import.meta.url);
const names = new Set(await readdir(source));
const dimensions = {};

for (const { id, source: filename } of content.entries) {
  if (!names.has(filename)) throw new Error(`Missing Horizonte image: ${filename}`);
  if (!/^[a-z0-9-]+$/.test(id) || Object.hasOwn(dimensions, id)) {
    throw new Error(`Invalid or duplicate image ID: ${id}`);
  }
}

await mkdir(output, { recursive: true });
for (const { id, source: filename } of content.entries) {
  const path = fileURLToPath(new URL(encodeURIComponent(filename), source));
  const { width, height } = await sharp(path).autoOrient()
    .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(fileURLToPath(new URL(`${id}.webp`, output)));
  dimensions[id] = { width, height };
}

await writeFile(new URL('dimensions.json', output), JSON.stringify(dimensions));
