'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { isValidImageFile, isValidImageSize } from '@/utils/validation';

interface ImageUploadProps {
  images: File[];
  onChange: (files: File[]) => void;
  maxImages?: number;
}

export const ImageUpload = ({ images, onChange, maxImages = 4 }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setError(null);

    if (images.length + files.length > maxImages) {
      setError(`画像は最大${maxImages}枚までです`);
      return;
    }

    const validFiles: File[] = [];
    for (const file of files) {
      if (!isValidImageFile(file)) {
        setError('JPEG、PNG、WebP形式の画像のみアップロードできます');
        return;
      }
      if (!isValidImageSize(file)) {
        setError('ファイルサイズは5MB以下にしてください');
        return;
      }
      validFiles.push(file);
    }

    onChange([...images, ...validFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      <div className="space-y-4">
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {images.map((file, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {images.length < maxImages && (
          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={() => fileInputRef.current?.click()}
          >
            画像を追加 ({images.length}/{maxImages})
          </Button>
        )}

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
};
