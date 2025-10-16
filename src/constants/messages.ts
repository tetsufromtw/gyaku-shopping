// Japanese UI Messages
export const MESSAGES = {
  // Authentication
  AUTH: {
    LOGIN: 'ログイン',
    LOGOUT: 'ログアウト',
    LOGIN_REQUIRED: 'ログインが必要です',
    LOGIN_WITH_GOOGLE: 'Googleでログイン',
    LOGIN_WITH_TWITTER: 'Xでログイン',
    LOGIN_WITH_APPLE: 'Appleでログイン',
  },

  // Posts
  POSTS: {
    CREATE_POST: '投稿を作成',
    TITLE: 'タイトル',
    DESCRIPTION: '説明',
    UPLOAD_IMAGES: '画像をアップロード',
    NO_POSTS: '投稿がありません',
    LOADING: '読み込み中...',
  },

  // Comments
  COMMENTS: {
    ADD_COMMENT: 'コメントを追加',
    COMMENT: 'コメント',
    PRODUCT_URL: '商品リンク（オプション）',
    NO_COMMENTS: 'コメントがありません',
  },

  // Common
  COMMON: {
    SUBMIT: '送信',
    CANCEL: 'キャンセル',
    DELETE: '削除',
    EDIT: '編集',
    SAVE: '保存',
    ERROR: 'エラーが発生しました',
    SUCCESS: '成功しました',
  },

  // Errors
  ERRORS: {
    UPLOAD_FAILED: '画像のアップロードに失敗しました',
    POST_FAILED: '投稿に失敗しました',
    COMMENT_FAILED: 'コメントの投稿に失敗しました',
    DELETE_FAILED: '削除に失敗しました',
    GENERIC: 'エラーが発生しました。もう一度お試しください。',
  },
} as const;
