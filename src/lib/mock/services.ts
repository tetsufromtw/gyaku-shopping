import { Post, Comment, User, CreatePostInput, CreateCommentInput } from '@/types';
import { mockPosts, mockComments, mockUsers } from './data';

// In-memory storage for development
let posts = [...mockPosts];
let comments = [...mockComments];
let currentUser: User | null = null;

// Auth Mock Services
export const mockAuthService = {
  signInWithProvider: async (provider: string): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    currentUser = mockUsers[0]; // Default to first user
    return currentUser;
  },

  signOut: async (): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    currentUser = null;
  },

  getCurrentUser: async (): Promise<User | null> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return currentUser;
  },
};

// Posts Mock Services
export const mockPostsService = {
  getPosts: async (limitCount: number = 20): Promise<Post[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return posts
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limitCount);
  },

  searchPosts: async (query: string, limitCount: number = 20): Promise<Post[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const lowerQuery = query.toLowerCase();
    return posts
      .filter((post) =>
        post.title.toLowerCase().includes(lowerQuery) ||
        post.description.toLowerCase().includes(lowerQuery)
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limitCount);
  },

  getPostById: async (postId: string): Promise<Post | null> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return posts.find((p) => p.id === postId) || null;
  },

  createPost: async (userId: string, input: CreatePostInput): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate upload time

    const newPost: Post = {
      id: `post${Date.now()}`,
      userId,
      user: currentUser || undefined,
      title: input.title,
      description: input.description,
      imageUrls: input.images.map((file) => URL.createObjectURL(file)),
      commentCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    posts.unshift(newPost);
    return newPost.id;
  },

  incrementPostCommentCount: async (postId: string): Promise<void> => {
    const post = posts.find((p) => p.id === postId);
    if (post) {
      post.commentCount++;
    }
  },
};

// Comments Mock Services
export const mockCommentsService = {
  getCommentsByPostId: async (postId: string): Promise<Comment[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return comments
      .filter((c) => c.postId === postId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  },

  createComment: async (userId: string, input: CreateCommentInput): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newComment: Comment = {
      id: `comment${Date.now()}`,
      postId: input.postId,
      userId,
      user: currentUser || undefined,
      content: input.content,
      productUrl: input.productUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    comments.unshift(newComment);
    await mockPostsService.incrementPostCommentCount(input.postId);
    return newComment.id;
  },
};

// Reset function for testing
export const resetMockData = () => {
  posts = [...mockPosts];
  comments = [...mockComments];
  currentUser = null;
};
