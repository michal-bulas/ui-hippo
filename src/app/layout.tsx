import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from 'sonner';

import { cn, constructMetadata } from '@/lib/utils';

import Providers from '@/components/Providers';

import Footer from '../components/layout/Footer';
import NavBar from '../components/layout/Navbar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = constructMetadata();

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn('relative h-full font-sans antialiased', inter.className)}
      >
        <Providers>
          <NavBar />
          <main className='relative flex min-h-screen flex-col'>
            <div className='flex-1 flex-grow'>{children}</div>
          </main>
          <Footer />
          <Toaster
            position='top-center'
            richColors
          />
        </Providers>
      </body>
    </html>
  );
}
