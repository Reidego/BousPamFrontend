import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import LeftMenu from '@/components/menu';
import './globals.css';
import '@ant-design/v5-patch-for-react-19';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bous Pam',
  description: 'Bous Pam',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`text-black ${geistSans.variable} ${geistMono.variable} antialiased flex`}
      >
        <LeftMenu />
        {children}
      </body>
    </html>
  );
}
