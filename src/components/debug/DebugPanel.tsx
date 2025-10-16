'use client';

import { useAuth } from '@/hooks/useAuth';
import { isMockMode } from '@/config/env';

export const DebugPanel = () => {
  const { user, loading } = useAuth();

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white text-xs p-3 rounded-lg max-w-xs z-50">
      <div className="font-bold mb-2 text-yellow-400">🛠️ Debug Info</div>
      <div className="space-y-1">
        <div>Mode: {isMockMode ? '🎭 Mock' : '🔥 Firebase'}</div>
        <div>Loading: {loading ? 'Yes' : 'No'}</div>
        <div>User: {user ? `✅ ${user.displayName || user.email}` : '❌ Not logged in'}</div>
        {user && <div className="text-green-400">User ID: {user.id}</div>}
      </div>
    </div>
  );
};
