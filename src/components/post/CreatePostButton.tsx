'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { MESSAGES } from '@/constants/messages';

export const CreatePostButton = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleClick = () => {
    console.log('CreatePostButton clicked', { user, loading });
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    router.push('/posts/create');
  };

  return (
    <>
      <Button onClick={handleClick} size="md" className="whitespace-nowrap">
        <span className="hidden sm:inline">{MESSAGES.POSTS.CREATE_POST}</span>
        <span className="sm:hidden">投稿</span>
      </Button>

      <Modal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        title={MESSAGES.AUTH.LOGIN_REQUIRED}
      >
        <p className="text-gray-600 dark:text-gray-400">
          投稿を作成するにはログインが必要です。
        </p>
      </Modal>
    </>
  );
};
