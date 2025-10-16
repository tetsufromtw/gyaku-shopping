# 逆ショッピング - セットアップガイド

## 概要

逆ショッピングは、買い手が商品の写真や説明を投稿し、他のユーザーから商品リンクを教えてもらえる日本語対応のプラットフォームです。

## 必要な環境

- Node.js 18以上
- npm または yarn
- Firebase プロジェクト

## セットアップ手順

### 1. リポジトリのクローンと依存関係のインストール

```bash
git clone <repository-url>
cd gyaku-shopping
npm install
```

### 2. Firebase プロジェクトの設定

1. [Firebase Console](https://console.firebase.google.com/) でプロジェクトを作成
2. Authentication を有効化し、以下のプロバイダーを設定：
   - Google
   - Twitter (X)
   - Apple
3. Firestore Database を作成（本番モードで開始）
4. Storage を有効化
5. プロジェクト設定から Web アプリを追加し、設定情報を取得

### 3. Firestore セキュリティルール

Firestore のルールタブで以下を設定：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }

    // Posts collection
    match /posts/{postId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }

    // Comments collection
    match /comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### 4. Storage セキュリティルール

Storage のルールタブで以下を設定：

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /post-images/{postId}/{imageId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 5. 環境変数の設定

`.env.local.example` を `.env.local` にコピーして、Firebase の設定情報を入力：

```bash
cp .env.local.example .env.local
```

`.env.local` を編集：

```env
# Firebase Client Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# Firebase Admin SDK (Optional - for server-side operations)
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_CLIENT_EMAIL=your-client-email@your-project-id.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour Private Key\n-----END PRIVATE KEY-----\n"

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開く

## 主な機能

### 実装済み機能

- ✅ OAuth2 認証（Google、Twitter、Apple）
- ✅ 投稿作成（画像アップロード対応）
- ✅ 投稿一覧表示
- ✅ 投稿詳細表示
- ✅ コメント機能（商品リンク付き）
- ✅ 権限管理（未ログイン時は閲覧のみ）
- ✅ レスポンシブデザイン
- ✅ ダークモード対応
- ✅ SEO 最適化

### プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── posts/
│   │   ├── create/        # 投稿作成ページ
│   │   └── [id]/          # 投稿詳細ページ
│   ├── layout.tsx
│   └── page.tsx           # ホームページ
├── components/            # UI コンポーネント
│   ├── auth/             # 認証関連
│   ├── comment/          # コメント関連
│   ├── layout/           # レイアウト
│   ├── post/             # 投稿関連
│   └── ui/               # 基本UIコンポーネント
├── hooks/                # カスタムフック
├── lib/                  # ライブラリ設定
│   └── firebase/         # Firebase 設定
├── services/             # ビジネスロジック
├── types/                # TypeScript型定義
├── utils/                # ユーティリティ関数
└── constants/            # 定数定義
```

## ビルドとデプロイ

### 本番ビルド

```bash
npm run build
npm start
```

### Vercel へのデプロイ

1. Vercel アカウントに接続
2. プロジェクトをインポート
3. 環境変数を Vercel の設定に追加
4. デプロイ

## トラブルシューティング

### Firebase の初期化エラー

- `.env.local` の設定が正しいか確認
- Firebase Console でプロジェクトが正しく設定されているか確認

### 画像アップロードエラー

- Storage のセキュリティルールが正しく設定されているか確認
- 画像サイズが5MB以下か確認

### 認証エラー

- Firebase Authentication で各プロバイダーが有効化されているか確認
- 承認済みドメインに localhost と本番ドメインが追加されているか確認

## ライセンス

MIT
