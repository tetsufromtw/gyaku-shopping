'use client';

import Link from 'next/link';
import { Post } from '@/types';
import { Card } from '@/components/ui/Card';
import { formatRelativeTime } from '@/utils/date';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <Link href={`/posts/${post.id}`} className="group">
      <Card hover padding="lg" className="h-full flex flex-col overflow-hidden">
        {/* Images */}
        {post.imageUrls.length > 0 && (
          <div className="mb-5 -mx-6 -mt-6">
            <div className="grid grid-cols-2 gap-2 p-2">
              {post.imageUrls.slice(0, 4).map((url, index) => (
                <div
                  key={index}
                  className={`relative ${
                    index === 0 && post.imageUrls.length === 1
                      ? 'col-span-2'
                      : ''
                  } rounded-xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-300`}
                  style={{ aspectRatio: '16/9' }}
                >
                  <img
                    src={url}
                    alt={`${post.title} - 画像${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="space-y-3 flex-1">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            {post.user?.photoURL ? (
              <img
                src={post.user.photoURL}
                alt={post.user.displayName || ''}
                className="w-8 h-8 rounded-full ring-2 ring-gray-100 dark:ring-gray-700"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold">
                {post.user?.displayName?.charAt(0) || '?'}
              </div>
            )}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {post.user?.displayName || '匿名'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatRelativeTime(post.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {post.commentCount}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
