import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Way of the Voice Agent',
  description:
    'The timeless art of building AI that speaks. A philosophical guide to voice agent design.',
  keywords: [
    'voice agent',
    'AI',
    'conversational AI',
    'design philosophy',
  ],
  openGraph: {
    title: 'The Way of the Voice Agent',
    description: 'The timeless art of building AI that speaks.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Way of the Voice Agent',
    description: 'The timeless art of building AI that speaks.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
