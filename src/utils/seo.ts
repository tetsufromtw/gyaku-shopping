import { Post } from '@/types';

/**
 * Generate JSON-LD structured data for a post
 */
export const generatePostStructuredData = (post: Post) => {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return {
    '@context': 'https://schema.org',
    '@type': 'SocialMediaPosting',
    headline: post.title,
    description: post.description,
    image: post.imageUrls,
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Person',
      name: post.user?.displayName || '匿名',
    },
    publisher: {
      '@type': 'Organization',
      name: '逆ショッピング',
      url: baseUrl,
    },
    url: `${baseUrl}/posts/${post.id}`,
    commentCount: post.commentCount,
  };
};

/**
 * Generate meta description from post
 */
export const generateMetaDescription = (text: string, maxLength: number = 155): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength - 3) + '...';
};
