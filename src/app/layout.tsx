import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "逆ショッピング - 欲しいものを投稿して、商品を見つけよう",
  description: "欲しい商品の写真や説明を投稿して、他のユーザーから商品リンクを教えてもらえるプラットフォーム",
  keywords: ["ショッピング", "商品検索", "SNS", "買い物"],
  openGraph: {
    title: "逆ショッピング",
    description: "欲しい商品の写真や説明を投稿して、他のユーザーから商品リンクを教えてもらえるプラットフォーム",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
