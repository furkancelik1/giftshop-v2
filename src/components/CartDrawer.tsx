"use client";

import { useCart } from "@/store/cartStore";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { items, removeItem, incrementItem, decrementItem, getTotalPrice } = useCart();
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Hydration hatasını önlemek için
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCheckout = async () => {
        setIsLoading(true);

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items }), // Sepetteki ürünleri gönderiyoruz
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url; // Kullanıcıyı Stripe'a yönlendir
            } else {
                alert("Ödeme başlatılamadı!");
            }
        } catch (error) {
            console.error(error);
            alert("Bir hata oluştu.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <>
            {/* Arka Plan Karartma (Overlay) */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Çekmece (Drawer) */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-gray-900 z-50 shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

                {/* Başlık */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Sepetim ({items.length})</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                        <X size={24} />
                    </button>
                </div>

                {/* Ürün Listesi */}
                <div className="flex-1 overflow-y-auto p-4 h-[calc(100vh-200px)]">
                    {items.length === 0 ? (
                        <div className="text-center py-20 text-gray-500">
                            Sepetin şu an boş. <br /> Hadi "Boncuk"u ekle! 🦄
                        </div>
                    ) : (
                        <ul className="space-y-6">
                            {items.map((item) => (
                                <li key={item._id} className="flex gap-4">
                                    {/* Ürün Resmi */}
                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Ürün Detayları */}
                                    <div className="flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                                <h3>{item.name}</h3>
                                                <p className="ml-4">₺{item.price * item.quantity}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">3D Baskı</p>
                                        </div>

                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            {/* Miktar Artır/Azalt */}
                                            <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-md">
                                                <button
                                                    onClick={() => decrementItem(item._id)}
                                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => incrementItem(item._id)}
                                                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeItem(item._id)}
                                                className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                                            >
                                                <Trash2 size={16} /> Sil
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Alt Kısım (Toplam & Checkout) */}
                {items.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900">
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white mb-4">
                            <p>Ara Toplam</p>
                            <p>₺{getTotalPrice()}</p>
                        </div>
                        <button
                            onClick={handleCheckout} // <--- Fonksiyonu bağla
                            disabled={isLoading}     // <--- Yüklenirken tıklanmasın
                            className="w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Yükleniyor..." : "Ödemeye Geç"}
                        </button>
                        <div className="mt-2 flex justify-center text-center text-sm text-gray-500">
                            <p>veya <button onClick={onClose} className="font-medium text-indigo-600 hover:text-indigo-500">Alışverişe Devam Et</button></p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}