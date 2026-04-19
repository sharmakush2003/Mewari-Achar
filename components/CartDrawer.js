'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { products } from '@/lib/products-data';
import Link from 'next/link';

export default function CartDrawer() {
    const { cart, isCartOpen, setIsCartOpen, removeFromCart, calculateTotal, mounted } = useCart();

    if (!mounted) return null;

    const cartItems = Object.keys(cart).map(key => {
        const [id, size] = key.split("_");
        const product = products.find(p => p.id === parseInt(id));
        return { ...product, size, qty: cart[key], key };
    });

    const total = calculateTotal(products);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="cart-backdrop"
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Drawer */}
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="cart-drawer"
                    >
                        <div className="cart-header">
                            <div className="header-flex">
                                <h2>Your Heritage <span>Basket</span></h2>
                                <button className="close-btn" onClick={() => setIsCartOpen(false)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 6L6 18M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className="header-accent"></div>
                        </div>

                        <div className="cart-items">
                            {cartItems.length === 0 ? (
                                <div className="empty-cart-view">
                                    <div className="empty-icon">🧺</div>
                                    <p>Your basket is empty. Start your flavour journey!</p>
                                    <button className="btn-royal" onClick={() => setIsCartOpen(false)}>Explore Collection</button>
                                </div>
                            ) : (
                                cartItems.map(item => (
                                    <div key={item.key} className="cart-item-card">
                                        <div className="item-img">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <div className="item-meta">
                                                <h4>{item.name}</h4>
                                                <span className="item-size-tag">{item.size}</span>
                                            </div>
                                            <div className="item-pricing">
                                                <span className="item-qty">Qty: {item.qty}</span>
                                                <span className="item-price">₹{item.size === "500g" ? item.price500g * item.qty : item.price1kg * item.qty}</span>
                                            </div>
                                            <button className="remove-item-link" onClick={() => removeFromCart(item.key)}>Remove Item</button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-summary">
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <span className="total-amount">₹{total}</span>
                                    </div>
                                    <p className="shipping-note">Shipping & taxes calculated at checkout.</p>
                                </div>
                                <Link 
                                    href="/order" 
                                    className="btn-royal full-width"
                                    onClick={() => setIsCartOpen(false)}
                                >
                                    Proceed to Checkout
                                </Link>
                                <button className="keep-shopping-btn" onClick={() => setIsCartOpen(false)}>
                                    Continue Shopping
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
