# Mock Mode - Firebase なしで開発する方法

## 概要

このプロジェクトには **Mock Mode（開発モード）** が実装されており、Firebase の設定なしでアプリケーションの開発とテストができます。

## Mock Mode の使い方

### 1. Mock Mode を有効にする

`.env.local` ファイルに以下を設定：

```env
NEXT_PUBLIC_USE_MOCK_DATA=true
```

これだけで Firebase 不要で開発できます！

### 2. 開発サーバーを起動

```bash
npm run dev
```

http://localhost:3000 にアクセスすると、サンプルデータが表示されます。

## Mock Mode でできること

### ✅ 利用可能な機能

- **ログイン**: 任意のプロバイダー（Google/X/Apple）でログイン可能
  - モックユーザー「田中太郎」としてログイン
- **投稿一覧**: 5件のサンプル投稿を表示
- **投稿詳細**: 各投稿の詳細とコメントを表示
- **新規投稿**: 画像アップロード付きで投稿作成
  - 画像は Blob URL として表示（リロードすると消えます）
- **コメント**: 投稿にコメントと商品リンクを追加
- **リアルタイム更新**: 投稿やコメントの追加が即座に反映

### ⚠️ 制限事項

- データは **メモリ内** に保存（ページリロードで初期化）
- 画像は実際にアップロードされず、Blob URL として表示
- 複数ユーザーのシミュレーションは未実装（常に同じユーザー）

## サンプルデータ

### Mock Users
```typescript
田中太郎 (tanaka@example.com)
佐藤花子 (sato@example.com)
鈴木一郎 (suzuki@example.com)
```

### Mock Posts
- スニーカーを探している投稿
- カフェのマグカップの投稿
- バックパックの投稿
- 腕時計の投稿
- イヤリングの投稿

### Mock Comments
各投稿に複数のコメントとサンプル商品リンクが含まれています。

## Firebase への切り替え

実際の Firebase を使う場合は、`.env.local` を更新：

```env
# Mock Mode を無効化
NEXT_PUBLIC_USE_MOCK_DATA=false

# Firebase 設定を追加
NEXT_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
# ... 他の Firebase 設定
```

詳しくは `README_SETUP.md` を参照してください。

## 実装の仕組み

### アーキテクチャ

```
src/
├── config/
│   └── env.ts              # 環境設定（Mock/Real の切り替え）
├── lib/
│   └── mock/
│       ├── data.ts         # サンプルデータ定義
│       └── services.ts     # Mock サービス実装
└── services/
    ├── auth.ts             # 認証サービス（条件分岐）
    ├── posts.ts            # 投稿サービス（条件分岐）
    └── comments.ts         # コメントサービス（条件分岐）
```

### 切り替えロジック

各サービスは環境変数 `NEXT_PUBLIC_USE_MOCK_DATA` を確認し、自動的に Mock または Real のサービスを使用します：

```typescript
import { isMockMode } from '@/config/env';
import { mockPostsService } from '@/lib/mock/services';

export const getPosts = async () => {
  if (isMockMode) {
    return mockPostsService.getPosts(); // Mock データ
  }
  // Firebase から取得
  return realFirebaseService.getPosts();
};
```

## 開発のヒント

### Mock データのカスタマイズ

`src/lib/mock/data.ts` を編集して、独自のサンプルデータを追加できます：

```typescript
export const mockPosts: Post[] = [
  {
    id: 'custom-post',
    title: 'カスタム投稿',
    description: '自分で追加した投稿',
    // ...
  },
  // 既存のデータ...
];
```

### データのリセット

開発中にデータをリセットしたい場合は、ページをリロードしてください。

### 画像の扱い

Mock Mode では画像は `URL.createObjectURL()` で Blob URL として表示されます。実際のアップロードはシミュレートされません。

## よくある質問

**Q: Mock Mode でログアウトできますか？**
A: はい、ログアウトも正常に動作します。

**Q: 複数のユーザーをシミュレートできますか？**
A: 現在は固定で「田中太郎」としてログインします。複数ユーザーのシミュレーションが必要な場合は `src/lib/mock/services.ts` を拡張してください。

**Q: Mock データは永続化されますか？**
A: いいえ、メモリ内のみです。ページをリロードすると初期状態に戻ります。

**Q: 本番環境で Mock Mode が有効になることはありますか？**
A: `.env.local` は Git に含まれないため、本番では自動的に無効になります。

## まとめ

Mock Mode を使えば、Firebase の設定なしですぐに開発を開始できます。UI/UX の開発やテストに集中して、後から Firebase に接続することができます！
