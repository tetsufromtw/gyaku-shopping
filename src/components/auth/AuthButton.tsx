'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { MESSAGES } from '@/constants/messages';
import { AuthProvider } from '@/types';

export const AuthButton = () => {
  const { user, loading, login, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async (provider: AuthProvider) => {
    setLoggingIn(true);
    try {
      await login(provider);
      setShowModal(false);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoggingIn(false);
    }
  };

  if (loading) {
    return (
      <Button variant="secondary" disabled>
        {MESSAGES.POSTS.LOADING}
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt={user.displayName || ''}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
          />
        )}
        <span className="hidden sm:inline text-sm text-gray-700 dark:text-gray-300 max-w-[150px] truncate">
          {user.displayName || user.email}
        </span>
        <Button variant="outline" onClick={logout} size="sm">
          {MESSAGES.AUTH.LOGOUT}
        </Button>
      </div>
    );
  }

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        {MESSAGES.AUTH.LOGIN}
      </Button>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={MESSAGES.AUTH.LOGIN}
      >
        <div className="space-y-4">
          {process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <p className="text-xs text-yellow-800 dark:text-yellow-200">
                🎭 <strong>Mock Mode:</strong> これはデモモードです。実際の OAuth 認証は行われず、テストユーザーとしてログインします。
              </p>
            </div>
          )}
          <Button
            fullWidth
            onClick={() => handleLogin('google')}
            disabled={loggingIn}
          >
            {loggingIn ? 'ログイン中...' : MESSAGES.AUTH.LOGIN_WITH_GOOGLE}
          </Button>
          <Button
            fullWidth
            variant="secondary"
            onClick={() => handleLogin('twitter')}
            disabled={loggingIn}
          >
            {loggingIn ? 'ログイン中...' : MESSAGES.AUTH.LOGIN_WITH_TWITTER}
          </Button>
          <Button
            fullWidth
            variant="secondary"
            onClick={() => handleLogin('apple')}
            disabled={loggingIn}
          >
            {loggingIn ? 'ログイン中...' : MESSAGES.AUTH.LOGIN_WITH_APPLE}
          </Button>
        </div>
      </Modal>
    </>
  );
};
