import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "next-cloudinary/dist/cld-video-player.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cloudinary Accessible Video Player Demo",
  description: "A fully accessible video player example using Cloudinary and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

