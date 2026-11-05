'use client';

import type { KeyboardEvent, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import type { Locale } from '../../content/locales';
import { galleryPath, legacySite } from '../../content/locales';
import data from '../../content/navigation.json';

const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& a, & summary': { color: 'inherit', textDecoration: 'none' },
  '& a:hover, & a[aria-current], & summary:hover, & summary[data-active]': {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
  },
}));

const Navigation = styled('nav')(({ theme }) => ({
  '& ul': { listStyle: 'none', padding: 0, margin: 0 },
  '& li': { padding: theme.spacing(0.75, 0) },
  '& summary': { cursor: 'pointer' },
  '& details ul': { paddingLeft: theme.spacing(2) },
  [theme.breakpoints.down('lg')]: { flexBasis: '100%', order: 1 },
  [theme.breakpoints.up('lg')]: {
    '& > ul': { display: 'flex', gap: theme.spacing(2), alignItems: 'center' },
    '& details': { position: 'relative' },
    '& details ul': {
      position: 'absolute',
      zIndex: 1,
      minWidth: 'max-content',
      padding: theme.spacing(1, 2),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
    },
  },
}));

const Title = styled('h1')(({ theme }) => ({
  ...theme.typography.h1,
  margin: 0,
  padding: theme.spacing(5, 2),
  textAlign: 'center',
}));

const Footer = styled('footer')(({ theme }) => ({
  padding: theme.spacing(3, 2),
  textAlign: 'center',
  '& a': { color: theme.palette.text.secondary },
}));

function closeDisclosure(event: KeyboardEvent<HTMLElement>) {
  if (event.key !== 'Escape' || !(event.target instanceof HTMLElement)) return;
  const disclosure = event.target.closest<HTMLDetailsElement>('details[open]');
  if (!disclosure) return;
  disclosure.open = false;
  disclosure.querySelector('summary')?.focus();
}

export default function SiteLayout({ children, locale, title }: {
  children: ReactNode;
  locale: Locale;
  title: string;
}) {
  const other = locale === 'de' ? 'en' : 'de';
  const text = data.text[locale];
  const navLink = (item: { href: string; de: string; en: string }) => {
    const active = item.href === 'Horizonte.html';
    return <a href={active ? galleryPath(locale) : `${legacySite}/${item.href}`}
      aria-current={active ? 'page' : undefined}>{item[locale]}</a>;
  };

  return (
    <>
      <Header>
        <a href="/">Ursula Jüngst</a>
        <Navigation aria-label={text.navigation} onKeyDown={closeDisclosure}>
          <ul>
            {data.groups.map((group) => (
              <li key={group.de}>
                <details name="navigation-group">
                  <summary data-active={group.items.some((item) => item.href === 'Horizonte.html') || undefined}>
                    {group[locale]}
                  </summary>
                  <ul>{group.items.map((item) => <li key={item.href}>{navLink(item)}</li>)}</ul>
                </details>
              </li>
            ))}
            {data.links.map((item) => <li key={item.href}>{navLink(item)}</li>)}
          </ul>
        </Navigation>
        <a href={galleryPath(other)} hrefLang={other} lang={other}>
          {other === 'de' ? 'Deutsch' : 'English'}
        </a>
      </Header>
      <main><Title>{title}</Title>{children}</main>
      <Footer><a href={`${legacySite}/Impressum.html`}>{text.footer}</a></Footer>
    </>
  );
}
