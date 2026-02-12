"use client";

import { useCart } from "@/store/cartStore";
import { useState } from "react";

interface AddToCartProps {
    product: {
        _id: string;
        name: string;
        slug: string;
        price: number;
        imageUrl: string;
    };
}

const AddToCart = ({ product }: AddToCartProps) => {
    const { addItem } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addItem({ ...product, quantity: 1 });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAddToCart}
            className={`flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-white sm:w-full transition-colors ${isAdded ? "bg-green-600 hover:bg-green-700" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
        >
            {isAdded ? "Added to Cart" : "Add to bag"}
        </button>
    );
};

export default AddToCart;
