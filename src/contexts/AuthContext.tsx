'use client';

import { createContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { User, AuthProvider, AuthState } from '@/types';
import { signInWithProvider, signOut, getCurrentUser } from '@/services/auth';
import { isMockMode } from '@/config/env';

interface AuthContextValue extends AuthState {
  login: (provider: AuthProvider) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // In mock mode, check for current user directly
    if (isMockMode) {
      getCurrentUser().then((user) => {
        console.log('🔐 AuthProvider: Initial user check in Mock Mode', { user });
        setAuthState({ user, loading: false, error: null });
      });
      return;
    }

    // In real mode, use Firebase auth state listener
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          try {
            const user = await getCurrentUser(firebaseUser);
            console.log('🔐 AuthProvider: User logged in', { user });
            setAuthState({ user, loading: false, error: null });
          } catch (error) {
            console.error('🔐 AuthProvider: Error getting user', error);
            setAuthState({
              user: null,
              loading: false,
              error: 'ユーザー情報の取得に失敗しました',
            });
          }
        } else {
          console.log('🔐 AuthProvider: No user');
          setAuthState({ user: null, loading: false, error: null });
        }
      }
    );

    return () => unsubscribe();
  }, []);

  const login = async (provider: AuthProvider): Promise<void> => {
    console.log('🔐 AuthProvider: Login attempt', { provider });
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const user = await signInWithProvider(provider);
      console.log('🔐 AuthProvider: Login successful', { user });
      setAuthState({ user, loading: false, error: null });
    } catch (error) {
      console.error('🔐 AuthProvider: Login failed', error);
      setAuthState({
        user: null,
        loading: false,
        error: 'ログインに失敗しました',
      });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    console.log('🔐 AuthProvider: Logout attempt');
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await signOut();
      console.log('🔐 AuthProvider: Logout successful');
      setAuthState({ user: null, loading: false, error: null });
    } catch (error) {
      console.error('🔐 AuthProvider: Logout failed', error);
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: 'ログアウトに失敗しました',
      }));
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
