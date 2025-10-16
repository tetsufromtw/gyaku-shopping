import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  orderBy,
  limit,
  Timestamp,
  updateDoc,
  increment,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/lib/firebase/client';
import { COLLECTIONS, STORAGE_PATHS } from '@/constants/collections';
import { Post, CreatePostInput } from '@/types';
import { isMockMode } from '@/config/env';
import { mockPostsService } from '@/lib/mock/services';

/**
 * Upload images to Firebase Storage
 */
export const uploadPostImages = async (
  images: File[],
  postId: string
): Promise<string[]> => {
  const uploadPromises = images.map(async (image, index) => {
    const imagePath = `${STORAGE_PATHS.POST_IMAGES}/${postId}/${index}-${Date.now()}`;
    const imageRef = ref(storage, imagePath);
    await uploadBytes(imageRef, image);
    return getDownloadURL(imageRef);
  });

  return Promise.all(uploadPromises);
};

/**
 * Create a new post
 */
export const createPost = async (
  userId: string,
  input: CreatePostInput
): Promise<string> => {
  if (isMockMode) {
    return mockPostsService.createPost(userId, input);
  }

  const postsRef = collection(db, COLLECTIONS.POSTS);

  // Create post document first to get the ID
  const postDoc = await addDoc(postsRef, {
    userId,
    title: input.title,
    description: input.description,
    imageUrls: [],
    commentCount: 0,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  // Upload images with the post ID
  const imageUrls = await uploadPostImages(input.images, postDoc.id);

  // Update post with image URLs
  await updateDoc(postDoc, {
    imageUrls,
  });

  return postDoc.id;
};

/**
 * Get all posts with pagination
 */
export const getPosts = async (
  limitCount: number = 20
): Promise<Post[]> => {
  if (isMockMode) {
    return mockPostsService.getPosts(limitCount);
  }

  const postsRef = collection(db, COLLECTIONS.POSTS);
  const q = query(postsRef, orderBy('createdAt', 'desc'), limit(limitCount));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  })) as Post[];
};

/**
 * Search posts by title and description
 */
export const searchPosts = async (
  searchQuery: string,
  limitCount: number = 20
): Promise<Post[]> => {
  if (isMockMode) {
    return mockPostsService.searchPosts(searchQuery, limitCount);
  }

  // Note: Firestore doesn't support full-text search natively
  // For production, consider using Algolia or similar service
  // This is a simple implementation that gets all posts and filters client-side
  const allPosts = await getPosts(100); // Get more posts for search
  const lowerQuery = searchQuery.toLowerCase();

  return allPosts
    .filter((post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery)
    )
    .slice(0, limitCount);
};

/**
 * Get a single post by ID
 */
export const getPostById = async (postId: string): Promise<Post | null> => {
  if (isMockMode) {
    return mockPostsService.getPostById(postId);
  }

  const postRef = doc(db, COLLECTIONS.POSTS, postId);
  const postDoc = await getDoc(postRef);

  if (!postDoc.exists()) {
    return null;
  }

  return {
    id: postDoc.id,
    ...postDoc.data(),
    createdAt: postDoc.data().createdAt.toDate(),
    updatedAt: postDoc.data().updatedAt.toDate(),
  } as Post;
};

/**
 * Increment comment count for a post
 */
export const incrementPostCommentCount = async (
  postId: string
): Promise<void> => {
  if (isMockMode) {
    return mockPostsService.incrementPostCommentCount(postId);
  }

  const postRef = doc(db, COLLECTIONS.POSTS, postId);
  await updateDoc(postRef, {
    commentCount: increment(1),
  });
};
