import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { siteConfig } from '@portfolio/content';
import { themeToCssVars } from '@/lib/theme';
import { SceneBackground } from '@/components/three/SceneBackground';
import { Cursor } from '@/components/Cursor';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const { profile } = siteConfig;

export const metadata: Metadata = {
  title: `${profile.name} - ${profile.role}`,
  description: profile.summary,
  keywords: [
    profile.name,
    profile.role,
    'Software Engineer',
    'Backend',
    'NestJS',
    'Laravel',
    'Portfolio',
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} - ${profile.role}`,
    description: profile.tagline,
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.theme.background,
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
      style={themeToCssVars(siteConfig.theme) as React.CSSProperties}
    >
      <body>
        <SceneBackground enabled={siteConfig.features.three} />
        <Cursor />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
