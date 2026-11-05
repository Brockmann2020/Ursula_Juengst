import type { ReactNode } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { locales, requireLocale } from '../../content/locales';
import SiteTheme from '../../theme/Theme';

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export default async function Layout({ children, params }: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = requireLocale((await params).locale);
  return (
    <html lang={locale}>
      <body>
        <AppRouterCacheProvider>
          <SiteTheme>{children}</SiteTheme>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
