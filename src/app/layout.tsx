import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import CartCounter from "@/components/CartCounter";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Giftshop V2 | Premium 3D Figures",
  description: "High-performance e-commerce platform for custom gifts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex">
                <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                  Giftshop V2
                </Link>
              </div>
              <div className="flex items-center">
                <CartCounter />
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
