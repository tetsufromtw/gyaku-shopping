'use client';

import { useEffect, useState } from 'react';
import { Comment } from '@/types';
import { getCommentsByPostId } from '@/services/comments';
import { CommentCard } from './CommentCard';
import { MESSAGES } from '@/constants/messages';

interface CommentListProps {
  postId: string;
}

export const CommentList = ({ postId }: CommentListProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const fetchedComments = await getCommentsByPostId(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">{MESSAGES.POSTS.LOADING}</p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">{MESSAGES.COMMENTS.NO_COMMENTS}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};
