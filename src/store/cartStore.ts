import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    slug: string;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    incrementItem: (id: string) => void;
    decrementItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getItemCount: () => number;
    getTotalPrice: () => number;
}

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            // Dışarıdan (Ürün Detay sayfasından) ilk ekleme
            addItem: (newItem) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item._id === newItem._id);

                if (existingItem) {
                    set({
                        items: currentItems.map((item) =>
                            item._id === newItem._id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...currentItems, { ...newItem, quantity: 1 }] });
                }
            },

            // Çöp kutusuna basılınca ürünü tamamen sil
            removeItem: (id) => {
                set((state) => ({
                    items: state.items.filter((item) => item._id !== id),
                }));
            },

            // Sepet içindeki "+" butonuna basılınca çalışacak
            incrementItem: (id) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                }));
            },

            // Sepet içindeki "-" butonuna basılınca çalışacak
            decrementItem: (id) => {
                const currentItems = get().items;
                const existingItem = currentItems.find((item) => item._id === id);

                if (existingItem?.quantity === 1) {
                    set({ items: currentItems.filter((item) => item._id !== id) });
                } else {
                    set({
                        items: currentItems.map((item) =>
                            item._id === id ? { ...item, quantity: item.quantity - 1 } : item
                        ),
                    });
                }
            },

            // Miktarı doğrudan güncelle (Select box için)
            updateQuantity: (id, newQuantity) => {
                set((state) => ({
                    items: state.items.map((item) =>
                        item._id === id ? { ...item, quantity: newQuantity } : item
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            getItemCount: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);