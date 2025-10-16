'use client';

import { Comment } from '@/types';
import { Card } from '@/components/ui/Card';
import { formatRelativeTime } from '@/utils/date';

interface CommentCardProps {
  comment: Comment;
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <Card padding="md">
      <div className="flex items-start gap-3">
        {comment.user?.photoURL && (
          <img
            src={comment.user.photoURL}
            alt={comment.user.displayName || ''}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {comment.user?.displayName || '匿名'}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-500">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {comment.content}
          </p>
          {comment.productUrl && (
            <a
              href={comment.productUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              商品リンク
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};
