"use client";

import { useCart } from "@/store/cartStore";
import { CheckCheck } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
    const { clearCart } = useCart();

    // Sayfa yüklendiği an sepeti temizle
    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-center px-4">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full animate-fade-in-up">

                {/* Yeşil Tik İkonu */}
                <div className="flex justify-center mb-6">
                    <div className="h-24 w-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <CheckCheck className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Ödeme Başarılı!
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">
                    Siparişiniz alındı. "Boncuk" yakında yola çıkacak! 🦄
                </p>

                <Link
                    href="/"
                    className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                    Alışverişe Devam Et
                </Link>
            </div>
        </div>
    );
}