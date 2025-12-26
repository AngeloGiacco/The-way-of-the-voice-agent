import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Way of the Voice Agent | ElevenLabs',
  description:
    'A guide to building AI voice agents that feel human. Learn conversation design, iteration workflows, and reliability engineering.',
  keywords: [
    'voice agent',
    'AI',
    'conversational AI',
    'speech synthesis',
    'ElevenLabs',
  ],
  openGraph: {
    title: 'The Way of the Voice Agent',
    description: 'A guide to building AI voice agents that feel human.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Way of the Voice Agent',
    description: 'A guide to building AI voice agents that feel human.',
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
