"use client";

import { useCart } from "@/store/cartStore";
import { ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react"; // useEffect eklendi
import CartDrawer from "./CartDrawer";

export default function CartCounter() {
    const itemCount = useCart((state) => state.getItemCount());
    const [isCartOpen, setIsCartOpen] = useState(false);

    // EKLENEN KISIM: Yüklenme kontrolü
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <>
            <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 text-white hover:text-gray-300 transition"
            >
                <div className="relative">
                    <ShoppingBag size={24} />

                    {/* Sadece 'mounted' true ise (yani tarayıcıdaysak) göster */}
                    {mounted && itemCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {itemCount}
                        </span>
                    )}
                </div>
                <span className="font-medium hidden sm:block">Sepet</span>
            </button>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}