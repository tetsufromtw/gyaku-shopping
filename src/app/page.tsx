'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { PostList } from '@/components/post/PostList';
import { CreatePostButton } from '@/components/post/CreatePostButton';
import { SearchBar } from '@/components/ui/SearchBar';
import { DebugPanel } from '@/components/debug/DebugPanel';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Header />
      <DebugPanel />
      <main>
        <Container className="py-8 sm:py-12">
          {/* Hero Section */}
          <div className="mb-8 sm:mb-12 text-center px-4">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              欲しいものを投稿しよう
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              商品の写真や説明を投稿して、他のユーザーから商品情報を教えてもらおう
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto px-4">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="タイトルや説明で検索..."
            />
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8 px-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
              {searchQuery ? `検索結果：${searchQuery}` : '最新の投稿'}
            </h2>
            <CreatePostButton />
          </div>

          <PostList searchQuery={searchQuery} />
        </Container>
      </main>
    </div>
  );
}
