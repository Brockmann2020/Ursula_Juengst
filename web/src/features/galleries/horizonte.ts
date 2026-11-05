import { readFile } from 'node:fs/promises';
import { z } from 'zod';
import rawContent from '../../content/horizonte.json';
import type { Locale } from '../../content/locales';

const id = z.string().regex(/^[a-z0-9-]+$/);
const positive = z.number().int().positive();
const schema = z.object({
  works: z.array(z.object({
    id,
    title: z.string().min(1),
    year: positive,
    material: z.literal('oil-on-canvas'),
    heightCm: positive,
    widthCm: positive,
  })).min(1),
  entries: z.array(z.object({
    id,
    work: id,
    source: z.string().min(1),
    view: z.enum(['full', 'detail']),
  })).min(1),
});
const dimensionSchema = z.record(id, z.object({ width: positive, height: positive }));
const text = {
  de: { material: 'Öl auf Leinwand', detail: 'Ausschnitt aus' },
  en: { material: 'Oil on canvas', detail: 'Detail from' },
};

export async function loadHorizonte(locale: Locale) {
  const { works, entries } = schema.parse(rawContent);
  const dimensions = dimensionSchema.parse(JSON.parse(await readFile('public/pilot-media/dimensions.json', 'utf8')));
  const worksById = new Map(works.map((work) => [work.id, work]));
  if (worksById.size !== works.length || new Set(entries.map((entry) => entry.id)).size !== entries.length) {
    throw new Error('Duplicate Horizonte work or media ID');
  }

  return entries.map((entry) => {
    const work = worksById.get(entry.work);
    const size = dimensions[entry.id];
    if (!work || !size) throw new Error(`Incomplete Horizonte entry: ${entry.id}`);
    const detail = entry.view === 'detail';
    const alt = detail ? `${text[locale].detail} ${work.title}` : work.title;
    const caption = detail
      ? alt
      : `${work.title}, ${work.year}, ${text[locale].material}, ${work.heightCm} × ${work.widthCm} cm`;
    return { id: entry.id, ...size, alt, caption, detail };
  });
}
