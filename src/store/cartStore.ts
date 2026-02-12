import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Sepetteki ürünün tipi
export interface CartItem {
    _id: string;
    name: string;
    price: number;
    imageUrl: string;
    quantity: number;
    slug: string;
}

// Store'un tipi
interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getItemCount: () => number;
    updateQuantity: (id: string, quantity: number) => void;
}

export const useCart = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            // Ürün Ekleme (Varsa adedi artırır, yoksa yeni ekler)
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

            // Ürün Silme
            removeItem: (id) => {
                set({ items: get().items.filter((item) => item._id !== id) });
            },

            // Sepeti Boşaltma
            clearCart: () => set({ items: [] }),

            // Toplam Fiyat Hesaplama
            getTotalPrice: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            // Toplam Ürün Sayısı (Cart ikonunun yanına yazmak için)
            getItemCount: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            updateQuantity: (id, quantity) => {
                const { items } = get();
                const newItems = items.map((item) =>
                    item._id === id ? { ...item, quantity } : item
                );
                set({ items: newItems });
            },
        }),
        {
            name: 'shopping-cart', // Tarayıcı hafızasındaki (LocalStorage) ismi
        }
    )
);