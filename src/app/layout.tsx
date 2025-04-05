import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Brand Monitor - Social Media Monitoring Tool',
  description: 'Monitor your brand mentions across social media platforms',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${inter.className} min-h-screen bg-white`}>
        <div className="min-h-screen bg-white">
          <Navigation />
          {children}
          <Toaster position="bottom-right" />
        </div>
      </body>
    </html>
  );
}
