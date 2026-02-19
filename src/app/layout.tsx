import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import CartCounter from "@/components/CartCounter";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Giftshop | 3D Figür ve Özel Hediyelikler",
  description: "Özenle üretilmiş 3D figürler, sanat eserleri ve eşsiz aksesuarlar. Kendi tarzınızı yansıtacak en güzel hediyelikler güvenli alışveriş altyapısıyla burada!",
  openGraph: {
    title: "Giftshop | 3D Figür ve Özel Hediyelikler",
    description: "Özenle üretilmiş 3D figürler, sanat eserleri ve eşsiz aksesuarlar.",
    url: "https://giftshop-v2.vercel.app",
    siteName: "Giftshop",
    locale: "tr_TR",
    type: "website",
  },
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
