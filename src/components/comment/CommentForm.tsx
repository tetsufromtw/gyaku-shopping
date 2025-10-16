'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { createComment } from '@/services/comments';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { validateCommentContent, isValidUrl } from '@/utils/validation';
import { MESSAGES } from '@/constants/messages';

interface CommentFormProps {
  postId: string;
  onSuccess?: () => void;
}

export const CommentForm = ({ postId, onSuccess }: CommentFormProps) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [errors, setErrors] = useState<{ content?: string; productUrl?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setShowLoginModal(true);
      return;
    }

    // Validation
    const newErrors: { content?: string; productUrl?: string } = {};

    const contentError = validateCommentContent(content);
    if (contentError) newErrors.content = contentError;

    if (productUrl && !isValidUrl(productUrl)) {
      newErrors.productUrl = '有効なURLを入力してください';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      await createComment(user.id, {
        postId,
        content,
        productUrl: productUrl || undefined,
      });

      // Reset form
      setContent('');
      setProductUrl('');
      setErrors({});

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Failed to create comment:', error);
      alert(MESSAGES.ERRORS.COMMENT_FAILED);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          label={MESSAGES.COMMENTS.COMMENT}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            setErrors((prev) => ({ ...prev, content: undefined }));
          }}
          error={errors.content}
          fullWidth
          rows={4}
          placeholder="商品情報や購入先などを共有してください"
          maxLength={500}
        />

        <Input
          label={MESSAGES.COMMENTS.PRODUCT_URL}
          value={productUrl}
          onChange={(e) => {
            setProductUrl(e.target.value);
            setErrors((prev) => ({ ...prev, productUrl: undefined }));
          }}
          error={errors.productUrl}
          fullWidth
          placeholder="https://example.com/product"
          type="url"
        />

        <Button type="submit" disabled={submitting} fullWidth>
          {submitting ? 'コメント中...' : MESSAGES.COMMENTS.ADD_COMMENT}
        </Button>
      </form>

      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title={MESSAGES.AUTH.LOGIN_REQUIRED}
      >
        <p className="text-gray-600 dark:text-gray-400">
          コメントするにはログインが必要です。
        </p>
      </Modal>
    </>
  );
};
