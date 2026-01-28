import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Cart, MenuItem } from '../types';

interface CartStore {
    cart: Cart;
    favorites: string[];
    addItem: (item: MenuItem) => void;
    removeItem: (itemId: string) => void;
    updateQuantity: (itemId: string, quantity: number) => void;
    toggleFavorite: (itemId: string) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: {},
            favorites: [],

            toggleFavorite: (itemId) => {
                set((state) => ({
                    favorites: state.favorites.includes(itemId)
                        ? state.favorites.filter((id) => id !== itemId)
                        : [...state.favorites, itemId],
                }));
            },

            addItem: (item: MenuItem) => {
                set((state) => {
                    const existingItem = state.cart[item.id];

                    if (existingItem) {
                        return {
                            cart: {
                                ...state.cart,
                                [item.id]: {
                                    ...existingItem,
                                    quantity: existingItem.quantity + 1,
                                },
                            },
                        };
                    }

                    return {
                        cart: {
                            ...state.cart,
                            [item.id]: {
                                ...item,
                                quantity: 1,
                            },
                        },
                    };
                });
            },

            removeItem: (itemId: string) => {
                set((state) => {
                    const { [itemId]: removed, ...rest } = state.cart;
                    return { cart: rest };
                });
            },

            updateQuantity: (itemId: string, quantity: number) => {
                if (quantity <= 0) {
                    get().removeItem(itemId);
                    return;
                }

                set((state) => ({
                    cart: {
                        ...state.cart,
                        [itemId]: {
                            ...state.cart[itemId],
                            quantity,
                        },
                    },
                }));
            },

            clearCart: () => {
                set({ cart: {} });
            },

            getTotalPrice: () => {
                const { cart } = get();
                return Object.values(cart).reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },

            getTotalItems: () => {
                const { cart } = get();
                return Object.values(cart).reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            name: 'saucy-storage', // name of the item in the storage (must be unique)
        }
    )
);
