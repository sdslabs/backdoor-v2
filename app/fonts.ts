import { Geist, Geist_Mono, Nunito_Sans } from 'next/font/google';
import localFont from 'next/font/local';

const yukari = localFont({
  variable: '--font-yukari',
  src: './fonts/yukari.ttf',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const nunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export { geistSans, geistMono, nunitoSans, yukari };
