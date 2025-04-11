import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { geistMono, nunitoSans, yukari } from './fonts';
import { ENVIROMENT } from '@/lib/constants';
import { Toaster } from 'sonner';

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
      {/* Adding react scan when in development */}
      {ENVIROMENT === 'development' && (
        <head>
          <script
            async
            src="https://unpkg.com/react-scan/dist/auto.global.js"
          />
        </head>
      )}
      <body
        className={`${geistMono.variable} ${nunitoSans.variable} ${yukari.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <main className="container mx-auto dark">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
