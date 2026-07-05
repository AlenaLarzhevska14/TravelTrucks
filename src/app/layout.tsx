import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ReactQueryProvider from '@/lib/ReactQueryProvider';

const inter = Inter({
  subsets: ['latin'],
});
export const metadata: Metadata = {
  title: {
    default: 'TravelTrucks',
    template: '%s | TravelTrucks',
  },
  description:
    'TravelTrucks helps you find and book modern campers for road trips across Ukraine.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
