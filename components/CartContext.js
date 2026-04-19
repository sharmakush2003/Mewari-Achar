'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from 'canvas-confetti';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});
    const [notification, setNotification] = useState("");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const showNotification = (msg) => {
        setNotification(msg);
        setTimeout(() => setNotification(""), 3000);
    };

    const addToCart = (id, size, products) => {
        const key = `${id}_${size}`;
        setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
        setIsCartOpen(true); // Automatically open side cart
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#8B0000', '#D4AF37'] });
    };

    const removeFromCart = (key) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[key] > 1) {
                newCart[key] -= 1;
            } else {
                delete newCart[key];
            }
            return newCart;
        });
    };

    const calculateTotal = (products) => {
        let total = 0;
        Object.keys(cart).forEach(key => {
            const [id, size] = key.split("_");
            const product = products.find(p => p.id === parseInt(id));
            if (product) {
                const price = size === "500g" ? product.price500g : product.price1kg;
                total += price * cart[key];
            }
        });
        return total;
    };

    const clearCart = () => setCart({});

    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            calculateTotal, 
            clearCart,
            notification,
            showNotification,
            isCartOpen,
            setIsCartOpen,
            mounted
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
