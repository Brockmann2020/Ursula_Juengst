import { notFound } from 'next/navigation';

export const locales = ['de', 'en'] as const;
export type Locale = typeof locales[number];

export function requireLocale(value: string): Locale {
  if (value !== 'de' && value !== 'en') notFound();
  return value;
}

export const legacySite = 'https://www.ursula-juengst.com';
export const galleryPath = (locale: Locale) => `/${locale}/horizonte/`;
