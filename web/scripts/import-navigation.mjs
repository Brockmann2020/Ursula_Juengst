import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../../', import.meta.url);
const script = await readFile(new URL('shared-navigation.js', root), 'utf8');
const catalogs = await Promise.all(['de', 'en'].map(async (locale) =>
  JSON.parse((await readFile(new URL(`Textressourcen/${locale}.json`, root), 'utf8')).trim())
));

function labels(key) {
  const [de, en] = catalogs.map((catalog) => catalog[key]);
  if (!de?.trim() || !en?.trim()) throw new Error(`Missing navigation text: ${key}`);
  return { de, en };
}

const source = script.match(/var NAVIGATION_ITEMS = \[([\s\S]*?)\n    \];/)?.[1];
if (!source) throw new Error('Legacy navigation not found');

const groups = [];
const links = [];
const groupsPattern = /labelKey: "([^"]+)",\s+items: \[([\s\S]*?)\n            \]/g;
const parseLinks = (input) =>
  [...input.matchAll(/href: "([^"]+)", label: "[^"]+", labelKey: "([^"]+)"/g)].map(
    ([, href, key]) => ({ href, ...(href === 'Horizonte.html' ? { de: 'Horizonte', en: 'Horizonte' } : labels(key)) }),
  );

for (const [, key, items] of source.matchAll(groupsPattern)) {
  groups.push({ ...labels(key), items: parseLinks(items) });
}
links.push(...parseLinks(source.replace(groupsPattern, '')));
if (groups.length !== 3 || groups.flatMap((group) => group.items).length !== 22 || links.length !== 6) {
  throw new Error('Unexpected legacy navigation structure');
}

const footer = labels('footer.impressum_datenschutz');
const data = {
  groups, links,
  text: {
    de: { navigation: 'Hauptnavigation', footer: footer.de },
    en: { navigation: 'Main navigation', footer: footer.en },
  },
};
await writeFile(new URL('../src/content/navigation.json', import.meta.url), JSON.stringify(data, null, 2) + '\n');
