import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client';
import { COLLECTIONS } from '@/constants/collections';
import { Comment, CreateCommentInput } from '@/types';
import { incrementPostCommentCount } from './posts';
import { isMockMode } from '@/config/env';
import { mockCommentsService } from '@/lib/mock/services';

/**
 * Create a new comment
 */
export const createComment = async (
  userId: string,
  input: CreateCommentInput
): Promise<string> => {
  if (isMockMode) {
    return mockCommentsService.createComment(userId, input);
  }

  const commentsRef = collection(db, COLLECTIONS.COMMENTS);

  const commentDoc = await addDoc(commentsRef, {
    postId: input.postId,
    userId,
    content: input.content,
    productUrl: input.productUrl || null,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  // Increment comment count on the post
  await incrementPostCommentCount(input.postId);

  return commentDoc.id;
};

/**
 * Get comments for a specific post
 */
export const getCommentsByPostId = async (
  postId: string
): Promise<Comment[]> => {
  if (isMockMode) {
    return mockCommentsService.getCommentsByPostId(postId);
  }

  const commentsRef = collection(db, COLLECTIONS.COMMENTS);
  const q = query(
    commentsRef,
    where('postId', '==', postId),
    orderBy('createdAt', 'desc')
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    createdAt: doc.data().createdAt.toDate(),
    updatedAt: doc.data().updatedAt.toDate(),
  })) as Comment[];
};
