import type { Metadata } from 'next';

import { Inter } from 'next/font/google';

import { Header } from '@/components/header';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/utils';
import { Providers } from '@/providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Alba - Asistente de Búsqueda Local y Privado',
  description: 'Asistente de Búsqueda Local y Privado',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang='es'>
      <body className={cn('antialiased', inter.className)}>
        <Providers>
          <div className='flex min-h-screen flex-col'>
            <Header />
            <main className='flex flex-1 flex-col bg-muted/60'>{children}</main>
          </div>
        </Providers>
        <Toaster richColors position='top-right' />
      </body>
    </html>
  );
}
