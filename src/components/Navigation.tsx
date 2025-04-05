'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();
  
  // Don't show navigation on dashboard pages
  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  return (
    <nav className="border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            Brand Monitor
          </Link>
          <div className="hidden space-x-6 md:flex">
            <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/sign-in" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
} 