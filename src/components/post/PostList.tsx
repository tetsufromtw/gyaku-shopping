'use client';

import { useEffect, useState } from 'react';
import { Post } from '@/types';
import { getPosts, searchPosts } from '@/services/posts';
import { PostCard } from './PostCard';
import { MESSAGES } from '@/constants/messages';

interface PostListProps {
  searchQuery?: string;
}

export const PostList = ({ searchQuery }: PostListProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = searchQuery
          ? await searchPosts(searchQuery)
          : await getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
        setError(MESSAGES.COMMON.ERROR);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 dark:border-gray-600 dark:border-t-blue-500"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">{MESSAGES.POSTS.LOADING}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="w-20 h-20 mx-auto text-gray-300 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {searchQuery ? `「${searchQuery}」に一致する投稿が見つかりませんでした` : MESSAGES.POSTS.NO_POSTS}
        </p>
        {searchQuery && (
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            別のキーワードで検索してみてください
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
