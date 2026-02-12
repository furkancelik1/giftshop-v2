"use client"; // React hooks kullanmak için
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cartStore";

interface ProductProps {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    slug: { current: string };
}

export default function ProductCard({ product }: { product: ProductProps }) {
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Link'e tıklamayı engelle
        addItem({
            ...product,
            slug: product.slug.current,
            quantity: 1, // İlk eklemede 1 adet
        });
    };

    return (
        <Link
            href={`/products/${product.slug.current}`}
            className="group relative block overflow-hidden rounded-xl bg-gray-900 border border-gray-800 hover:border-white/20 transition-all duration-300"
        >
            {/* Görsel Alanı */}
            <div className="relative h-64 w-full overflow-hidden bg-gray-800">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />

                {/* Sepete Ekle Butonu (Hoverda Çıkar) */}
                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white text-black p-3 rounded-full shadow-lg hover:bg-gray-200 cursor-pointer z-10"
                >
                    <ShoppingBag size={20} />
                </button>
            </div>

            {/* Bilgi Alanı */}
            <div className="p-5">
                <h3 className="text-lg font-medium text-white group-hover:text-gray-300 transition-colors">
                    {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-400">3D Baskı / PLA</p>
                <div className="mt-3 flex items-center justify-between">
                    <span className="text-xl font-bold text-white">₺{product.price}</span>
                </div>
            </div>
        </Link>
    );
}
