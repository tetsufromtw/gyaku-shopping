/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate image file type
 */
export const isValidImageFile = (file: File): boolean => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
};

/**
 * Validate image file size (max 5MB)
 */
export const isValidImageSize = (file: File, maxSizeMB: number = 5): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Validate post title
 */
export const validatePostTitle = (title: string): string | null => {
  if (!title.trim()) {
    return 'タイトルを入力してください';
  }
  if (title.length > 100) {
    return 'タイトルは100文字以内で入力してください';
  }
  return null;
};

/**
 * Validate post description
 */
export const validatePostDescription = (description: string): string | null => {
  if (!description.trim()) {
    return '説明を入力してください';
  }
  if (description.length > 1000) {
    return '説明は1000文字以内で入力してください';
  }
  return null;
};

/**
 * Validate comment content
 */
export const validateCommentContent = (content: string): string | null => {
  if (!content.trim()) {
    return 'コメントを入力してください';
  }
  if (content.length > 500) {
    return 'コメントは500文字以内で入力してください';
  }
  return null;
};
