import { galleryPath, legacySite } from '../../content/locales';

export const metadata = { title: 'Ursula Jüngst | Horizonte', robots: { index: false, follow: false } };

export default function Entry() {
  return (
    <main>
      <h1>Ursula Jüngst</h1>
      <p>Horizonte · Vorschau / <span lang="en">Preview</span></p>
      <ul>
        <li><a href={galleryPath('de')} lang="de">Deutsch</a></li>
        <li><a href={galleryPath('en')} lang="en">English</a></li>
      </ul>
      <a href={legacySite}>Bestehende Website</a>
    </main>
  );
}
