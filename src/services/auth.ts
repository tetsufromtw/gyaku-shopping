import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/client';
import { COLLECTIONS } from '@/constants/collections';
import { User, AuthProvider } from '@/types';
import { isMockMode } from '@/config/env';
import { mockAuthService } from '@/lib/mock/services';

/**
 * Get or create user document in Firestore
 */
const getOrCreateUserDocument = async (
  firebaseUser: FirebaseUser
): Promise<User> => {
  const userRef = doc(db, COLLECTIONS.USERS, firebaseUser.uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return {
      id: userDoc.id,
      ...userDoc.data(),
      createdAt: userDoc.data().createdAt.toDate(),
      updatedAt: userDoc.data().updatedAt.toDate(),
    } as User;
  }

  // Create new user document
  const newUser: Omit<User, 'id'> = {
    email: firebaseUser.email || '',
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await setDoc(userRef, {
    ...newUser,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  return {
    id: firebaseUser.uid,
    ...newUser,
  };
};

/**
 * Sign in with OAuth provider
 */
export const signInWithProvider = async (
  provider: AuthProvider
): Promise<User> => {
  // Use mock service in development mode
  if (isMockMode) {
    return mockAuthService.signInWithProvider(provider);
  }

  let authProvider;

  switch (provider) {
    case 'google':
      authProvider = new GoogleAuthProvider();
      break;
    case 'twitter':
      authProvider = new TwitterAuthProvider();
      break;
    case 'apple':
      authProvider = new OAuthProvider('apple.com');
      break;
    default:
      throw new Error('Invalid provider');
  }

  const result = await signInWithPopup(auth, authProvider);
  return getOrCreateUserDocument(result.user);
};

/**
 * Sign out
 */
export const signOut = async (): Promise<void> => {
  if (isMockMode) {
    return mockAuthService.signOut();
  }
  await firebaseSignOut(auth);
};

/**
 * Get current user
 */
export const getCurrentUser = async (
  firebaseUser?: FirebaseUser
): Promise<User | null> => {
  if (isMockMode) {
    return mockAuthService.getCurrentUser();
  }
  if (!firebaseUser) {
    return null;
  }
  return getOrCreateUserDocument(firebaseUser);
};
