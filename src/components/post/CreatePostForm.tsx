'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { createPost } from '@/services/posts';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { ImageUpload } from './ImageUpload';
import { validatePostTitle, validatePostDescription } from '@/utils/validation';
import { MESSAGES } from '@/constants/messages';

export const CreatePostForm = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [errors, setErrors] = useState<{ title?: string; description?: string; images?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form submitted', { user });

    if (!user) {
      alert('ログインが必要です');
      return;
    }

    // Validation
    const newErrors: { title?: string; description?: string; images?: string } = {};

    const titleError = validatePostTitle(title);
    if (titleError) newErrors.title = titleError;

    const descriptionError = validatePostDescription(description);
    if (descriptionError) newErrors.description = descriptionError;

    if (images.length === 0) {
      newErrors.images = '少なくとも1枚の画像をアップロードしてください';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    try {
      const postId = await createPost(user.id, {
        title,
        description,
        images,
      });
      router.push(`/posts/${postId}`);
    } catch (error) {
      console.error('Failed to create post:', error);
      alert(MESSAGES.ERRORS.POST_FAILED);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label={MESSAGES.POSTS.TITLE}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setErrors((prev) => ({ ...prev, title: undefined }));
        }}
        error={errors.title}
        fullWidth
        placeholder="例：この服と同じものを探しています"
        maxLength={100}
      />

      <Textarea
        label={MESSAGES.POSTS.DESCRIPTION}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setErrors((prev) => ({ ...prev, description: undefined }));
        }}
        error={errors.description}
        fullWidth
        rows={6}
        placeholder="商品の詳細、色、サイズ、探している理由などを記載してください"
        maxLength={1000}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {MESSAGES.POSTS.UPLOAD_IMAGES}
        </label>
        <ImageUpload
          images={images}
          onChange={(files) => {
            setImages(files);
            setErrors((prev) => ({ ...prev, images: undefined }));
          }}
        />
        {errors.images && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.images}</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          fullWidth
        >
          {MESSAGES.COMMON.CANCEL}
        </Button>
        <Button
          type="submit"
          disabled={submitting}
          fullWidth
        >
          {submitting ? '投稿中...' : MESSAGES.COMMON.SUBMIT}
        </Button>
      </div>
    </form>
  );
};
