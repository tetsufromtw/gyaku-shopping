'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { CommentList } from '@/components/comment/CommentList';
import { CommentForm } from '@/components/comment/CommentForm';
import { Post } from '@/types';
import { getPostById } from '@/services/posts';
import { formatRelativeTime } from '@/utils/date';
import { MESSAGES } from '@/constants/messages';

export default function PostDetailPage() {
  const params = useParams();
  const postId = params.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [commentListKey, setCommentListKey] = useState(0);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await getPostById(postId);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Failed to fetch post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  const handleCommentSuccess = () => {
    // Refresh comments by changing the key
    setCommentListKey((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main>
          <Container className="py-8">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">{MESSAGES.POSTS.LOADING}</p>
            </div>
          </Container>
        </main>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main>
          <Container className="py-8">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">投稿が見つかりませんでした</p>
            </div>
          </Container>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Header />
      <main>
        <Container size="md" className="py-4 sm:py-8 px-4">
          <div className="space-y-6 sm:space-y-8">
            {/* Post Content */}
            <Card padding="lg">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {post.title}
              </h1>

              {/* Images */}
              {post.imageUrls.length > 0 && (
                <div className="mb-6 grid grid-cols-2 gap-4">
                  {post.imageUrls.map((url, index) => (
                    <div
                      key={index}
                      className={`relative ${
                        index === 0 && post.imageUrls.length === 1
                          ? 'col-span-2'
                          : ''
                      } rounded-lg overflow-hidden`}
                      style={{ aspectRatio: '16/9' }}
                    >
                      <img
                        src={url}
                        alt={`${post.title} - 画像${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap mb-6">
                {post.description}
              </p>

              {/* Author and Date */}
              <div className="flex items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                {post.user?.photoURL && (
                  <img
                    src={post.user.photoURL}
                    alt={post.user.displayName || ''}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {post.user?.displayName || '匿名'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    {formatRelativeTime(post.createdAt)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Comment Form */}
            <Card padding="lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                コメントを追加
              </h2>
              <CommentForm postId={postId} onSuccess={handleCommentSuccess} />
            </Card>

            {/* Comments */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                コメント ({post.commentCount})
              </h2>
              <CommentList key={commentListKey} postId={postId} />
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
