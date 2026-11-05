import type { Metadata } from 'next';
import { galleryPath, requireLocale } from '../../../content/locales';
import { loadHorizonte } from '../../../features/galleries/horizonte';
import Gallery from '../../../features/galleries/Gallery';
import SiteLayout from '../../../components/layout/SiteLayout';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = requireLocale((await params).locale);
  return {
    title: 'Horizonte | Ursula Jüngst',
    description: locale === 'de' ? 'Horizonte, Malerei von Ursula Jüngst' : 'Horizonte, paintings by Ursula Jüngst',
    robots: { index: false, follow: false },
    alternates: { languages: { de: galleryPath('de'), en: galleryPath('en') } },
  };
}

export default async function Horizonte({ params }: Props) {
  const locale = requireLocale((await params).locale);
  return (
    <SiteLayout locale={locale} title="Horizonte">
      <Gallery entries={await loadHorizonte(locale)} />
    </SiteLayout>
  );
}
