import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tech Foundations for Product Managers',
  description: 'Core technical concepts every PM should understand — explained with analogies and zero unnecessary jargon.',
  openGraph: {
    title: 'Tech Foundations for Product Managers',
    description: 'Core technical concepts every PM should understand.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <a
          href="https://buymeacoffee.com/techfoundationsforpms"
          target="_blank"
          rel="noopener noreferrer"
          className="bmc-btn"
        >
          ☕ Buy me a coffee
        </a>
      </body>
    </html>
  );
}
