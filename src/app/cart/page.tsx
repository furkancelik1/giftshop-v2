"use client";

import { useCart } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const CartPage = () => {
    const { items, removeItem, updateQuantity, getTotalPrice } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="bg-white dark:bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">Shopping Cart</h1>
                    <p>Loading cart...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
                    Shopping Cart
                </h1>

                {items.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-6">
                            Your cart is empty.
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="lg:col-span-7">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>

                            <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200 dark:border-gray-800">
                                {items.map((item) => (
                                    <li key={item._id} className="flex py-6 sm:py-10">
                                        <div className="flex-shrink-0">
                                            {item.imageUrl && (
                                                <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover object-center"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                <div>
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm">
                                                            <Link href={`/products/${item.slug}`} className="font-medium text-gray-700 dark:text-white hover:text-gray-800">
                                                                {item.name}
                                                            </Link>
                                                        </h3>
                                                    </div>
                                                    <p className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                        ${item.price}
                                                    </p>
                                                </div>

                                                <div className="mt-4 sm:mt-0 sm:pr-9">
                                                    <label htmlFor={`quantity-${item._id}`} className="sr-only">
                                                        Quantity, {item.name}
                                                    </label>
                                                    <select
                                                        id={`quantity-${item._id}`}
                                                        name={`quantity-${item._id}`}
                                                        value={item.quantity}
                                                        onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                                                        className="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                                    >
                                                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                                            <option key={num} value={num}>{num}</option>
                                                        ))}
                                                    </select>

                                                    <div className="absolute top-0 right-0">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeItem(item._id)}
                                                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                                                        >
                                                            <span className="sr-only">Remove</span>
                                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-lg bg-gray-50 dark:bg-zinc-900 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
                        >
                            <h2 id="summary-heading" className="text-lg font-medium text-gray-900 dark:text-white">
                                Order summary
                            </h2>

                            <dl className="mt-6 space-y-4">
                                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                    <dt className="text-base font-medium text-gray-900 dark:text-white">Order total</dt>
                                    <dd className="text-base font-medium text-gray-900 dark:text-white">${getTotalPrice()}</dd>
                                </div>
                            </dl>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                >
                                    Checkout
                                </button>
                            </div>
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
