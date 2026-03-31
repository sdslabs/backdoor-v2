import type { Metadata } from 'next';
import './globals.css';
import { geistMono, nunitoSans, yukari } from './fonts';
import { Toaster } from '@/components/ui/sonner';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Backdoor',
  description: 'A CTF platform for everyone',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${nunitoSans.variable} ${yukari.variable} antialiased font-sans`}
      >
        <Providers>
          <main className="container mx-auto">{children}</main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
