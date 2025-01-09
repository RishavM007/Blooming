
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((i) => i.id === item.id);
            if (existingItem) {
                return prevCart.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            return [...prevCart, item];
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: quantity } : item
            )
        );
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
};
