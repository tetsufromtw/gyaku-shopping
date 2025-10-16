// User Types
export interface User {
  id: string;
  email: string;
  displayName: string | null;
  photoURL: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Post Types
export interface Post {
  id: string;
  userId: string;
  user?: User;
  title: string;
  description: string;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
  commentCount: number;
}

export interface CreatePostInput {
  title: string;
  description: string;
  images: File[];
}

// Comment Types
export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user?: User;
  content: string;
  productUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCommentInput {
  postId: string;
  content: string;
  productUrl?: string;
}

// Auth Types
export type AuthProvider = 'google' | 'twitter' | 'apple';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}
