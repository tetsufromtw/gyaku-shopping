import { Post, Comment, User } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'tanaka@example.com',
    displayName: '田中太郎',
    photoURL: 'https://i.pravatar.cc/150?img=1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: 'user2',
    email: 'sato@example.com',
    displayName: '佐藤花子',
    photoURL: 'https://i.pravatar.cc/150?img=2',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: 'user3',
    email: 'suzuki@example.com',
    displayName: '鈴木一郎',
    photoURL: 'https://i.pravatar.cc/150?img=3',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: 'post1',
    userId: 'user1',
    user: mockUsers[0],
    title: 'この白いスニーカーを探しています',
    description:
      '街で見かけたこの白いスニーカーがとても気に入りました。シンプルなデザインで、どんな服装にも合いそうです。ブランド名が分からないので、似たようなものでも構いません。',
    imageUrls: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800',
    ],
    commentCount: 3,
    createdAt: new Date('2024-10-15T10:00:00'),
    updatedAt: new Date('2024-10-15T10:00:00'),
  },
  {
    id: 'post2',
    userId: 'user2',
    user: mockUsers[1],
    title: 'カフェで見たおしゃれなマグカップ',
    description:
      '今日行ったカフェで使われていたマグカップがとても素敵でした。陶器で、温かみのある色合いです。同じものか似たデザインのものを探しています。',
    imageUrls: ['https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800'],
    commentCount: 2,
    createdAt: new Date('2024-10-14T15:30:00'),
    updatedAt: new Date('2024-10-14T15:30:00'),
  },
  {
    id: 'post3',
    userId: 'user3',
    user: mockUsers[2],
    title: 'このデザインのバックパックが欲しい',
    description:
      'シンプルで機能的なバックパックを探しています。ノートPCが入るサイズで、防水機能があると嬉しいです。色は黒かグレーが希望です。',
    imageUrls: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800',
      'https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=800',
    ],
    commentCount: 5,
    createdAt: new Date('2024-10-13T09:15:00'),
    updatedAt: new Date('2024-10-13T09:15:00'),
  },
  {
    id: 'post4',
    userId: 'user1',
    user: mockUsers[0],
    title: 'ミニマルなデザインの腕時計',
    description:
      'シンプルで文字盤が見やすい腕時計を探しています。ビジネスでもカジュアルでも使えるデザインが理想です。予算は3万円以内で考えています。',
    imageUrls: ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800'],
    commentCount: 1,
    createdAt: new Date('2024-10-12T14:20:00'),
    updatedAt: new Date('2024-10-12T14:20:00'),
  },
  {
    id: 'post5',
    userId: 'user2',
    user: mockUsers[1],
    title: 'このデザインのイヤリングを探しています',
    description:
      '友人がつけていたシンプルなゴールドのイヤリングが素敵でした。小ぶりで上品なデザインです。プレゼント用にも検討しています。',
    imageUrls: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
    ],
    commentCount: 4,
    createdAt: new Date('2024-10-11T11:45:00'),
    updatedAt: new Date('2024-10-11T11:45:00'),
  },
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: 'comment1',
    postId: 'post1',
    userId: 'user2',
    user: mockUsers[1],
    content: 'アディダスのスタンスミスに似ていますね！シンプルで合わせやすいですよ。',
    productUrl: 'https://www.adidas.jp/stan_smith',
    createdAt: new Date('2024-10-15T11:00:00'),
    updatedAt: new Date('2024-10-15T11:00:00'),
  },
  {
    id: 'comment2',
    postId: 'post1',
    userId: 'user3',
    user: mockUsers[2],
    content: 'ナイキのエアフォース1もおすすめです。白一色でとてもきれいです。',
    productUrl: 'https://www.nike.com/jp/air-force-1',
    createdAt: new Date('2024-10-15T12:30:00'),
    updatedAt: new Date('2024-10-15T12:30:00'),
  },
  {
    id: 'comment3',
    postId: 'post1',
    userId: 'user1',
    user: mockUsers[0],
    content: 'ありがとうございます！どちらも良さそうですね。実際に店舗で見てみます！',
    createdAt: new Date('2024-10-15T13:00:00'),
    updatedAt: new Date('2024-10-15T13:00:00'),
  },
  {
    id: 'comment4',
    postId: 'post2',
    userId: 'user1',
    user: mockUsers[0],
    content: '無印良品の陶器マグカップが似ているかもしれません。',
    productUrl: 'https://www.muji.com/',
    createdAt: new Date('2024-10-14T16:00:00'),
    updatedAt: new Date('2024-10-14T16:00:00'),
  },
  {
    id: 'comment5',
    postId: 'post2',
    userId: 'user3',
    user: mockUsers[2],
    content: 'ニトリにも似たような色合いのマグカップがありましたよ！',
    productUrl: 'https://www.nitori-net.jp/',
    createdAt: new Date('2024-10-14T17:30:00'),
    updatedAt: new Date('2024-10-14T17:30:00'),
  },
];
