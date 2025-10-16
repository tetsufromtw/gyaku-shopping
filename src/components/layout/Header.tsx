'use client';

import Link from 'next/link';
import { AuthButton } from '@/components/auth/AuthButton';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <Link
            href="/"
            className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-300 truncate"
          >
            逆ショッピング
          </Link>
          <AuthButton />
        </div>
      </div>
    </header>
  );
};
