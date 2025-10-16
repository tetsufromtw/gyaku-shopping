'use client';

import { Header } from '@/components/layout/Header';
import { Container } from '@/components/layout/Container';
import { Card } from '@/components/ui/Card';
import { CreatePostForm } from '@/components/post/CreatePostForm';
import { DebugPanel } from '@/components/debug/DebugPanel';

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Header />
      <DebugPanel />
      <main>
        <Container size="md" className="py-4 sm:py-8 px-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 sm:mb-8">
            投稿を作成
          </h1>
          <Card padding="lg">
            <CreatePostForm />
          </Card>
        </Container>
      </main>
    </div>
  );
}
