'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/AuthContext';
import { products } from '@/lib/products-data';
import { useCart } from '@/components/CartContext';
import { PolicyModal, OrdersModal } from '@/components/Modals';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Order() {
    const { user } = useAuth();
    const { cart, calculateTotal, clearCart, notification, showNotification, removeFromCart } = useCart();
    const [activeModal, setActiveModal] = useState(null);
    const [formData, setFormData] = useState({ 
        name: '', phone: '', email: '', 
        address: '', instructions: '', payment: 'Online Banking' 
    });

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        if (user) {
            setFormData(prev => ({ 
                ...prev, 
                name: user.displayName || '', 
                email: user.email || '' 
            }));
        }
    }, [user]);

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(cart).length === 0) {
            showNotification("Your cart is empty!");
            return;
        }

        const items = Object.keys(cart).map(key => {
            const [id, size] = key.split("_");
            const product = products.find(p => p.id === parseInt(id));
            const price = size === "500g" ? product.price500g : product.price1kg;
            return { name: product.name, size, qty: cart[key], price };
        });

        const withTimeout = (promise, ms) => {
            return Promise.race([
                promise,
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
            ]);
        };

        try {
            try {
                await withTimeout(addDoc(collection(db, "orders"), {
                    uid: user ? user.uid : "guest",
                    ...formData,
                    items,
                    total: calculateTotal(products),
                    status: "Received",
                    timestamp: serverTimestamp()
                }), 4000);
            } catch (dbError) {
                console.warn("Firestore save failed:", dbError.message);
            }

            try {
                await fetch("/api/send-order-alert", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                        orderData: { ...formData, items, total: calculateTotal(products) } 
                    })
                });
            } catch (emailErr) {
                console.error("Email alert failed:", emailErr);
            }

            showNotification("Order Successful! Redirecting to WhatsApp...");
            const orderDetails = items.map(i => `${i.name} (${i.size}) x${i.qty}`).join('%0A');
            const whatsappUrl = `https://wa.me/919785054474?text=New Order from ${formData.name}!%0AItems:%0A${orderDetails}%0ATotal: ₹${calculateTotal(products)}%0AAddress: ${formData.address}`;
            
            clearCart();
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 1000);
        } catch (error) {
            console.error(error);
            showNotification("Error processing order.");
        }
    };

    return (
        <main className="main-wrapper">
            <div className="hero-texture"></div>
            <div className="hero-soft-glow"></div>

            <Navbar 
                onOpenOrders={() => setActiveModal('orders')} 
            />

            <AnimatePresence>
                {notification && (
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="royal-notification"
                    >
                        {notification}
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="royal-section checkout-container">
                <div className="checkout-layout">
                    {/* Left Side: Order Summary */}
                    <div className="order-summary-panel" data-aos="fade-right">
                        <div className="panel-header">
                            <span className="panel-label">Your Selection</span>
                            <h2 className="panel-title">Royal <span>Basket</span></h2>
                        </div>

                        <div className="basket-content">
                            {Object.keys(cart).length === 0 ? (
                                <div className="empty-state">
                                    <p>Your basket is empty. Add some heritage first!</p>
                                </div>
                            ) : (
                                <div className="basket-items-grid">
                                    {Object.keys(cart).map((key, i) => {
                                        const [id, size] = key.split("_");
                                        const product = products.find(p => p.id === parseInt(id));
                                        return (
                                            <motion.div 
                                                key={key} 
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="order-item-card"
                                            >
                                                <div className="item-visual">
                                                    <img src={product.image} alt={product.name} />
                                                </div>
                                                <div className="item-details">
                                                    <h4 className="item-name">{product.name}</h4>
                                                    <div className="item-meta">
                                                        <span className="item-size-badge">{size}</span>
                                                        <span className="item-qty">Qty: {cart[key]}</span>
                                                    </div>
                                                </div>
                                                <div className="item-price-info">
                                                    <span className="item-price">₹{size === "500g" ? product.price500g * cart[key] : product.price1kg * cart[key]}</span>
                                                    <button className="remove-link" onClick={() => removeFromCart(key)}>Remove</button>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="total-footer">
                            <div className="total-row">
                                <span>Grand Total</span>
                                <span className="total-value">₹{calculateTotal(products)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Checkout Form */}
                    <div className="checkout-form-panel" data-aos="fade-left">
                        <div className="panel-header">
                            <span className="panel-label">Details</span>
                            <h2 className="panel-title">Delivery <span>Address</span></h2>
                        </div>

                        <form className="royal-checkout-form" onSubmit={handleOrderSubmit}>
                            <div className="form-group-row">
                                <div className="royal-input-group">
                                    <label>Full Name</label>
                                    <input 
                                        type="text" 
                                        placeholder="Rahul Sharma" 
                                        required 
                                        value={formData.name} 
                                        onChange={e => setFormData({...formData, name: e.target.value})} 
                                    />
                                </div>
                                <div className="royal-input-group">
                                    <label>Phone Number</label>
                                    <input 
                                        type="tel" 
                                        placeholder="98765 43210" 
                                        required 
                                        onChange={e => setFormData({...formData, phone: e.target.value})} 
                                    />
                                </div>
                            </div>

                            <div className="royal-input-group">
                                <label>Email Address</label>
                                <input 
                                    type="email" 
                                    placeholder="name@example.com" 
                                    required 
                                    value={formData.email} 
                                    onChange={e => setFormData({...formData, email: e.target.value})} 
                                />
                            </div>

                            <div className="royal-input-group">
                                <label>Detailed Address</label>
                                <textarea 
                                    placeholder="House No, Street, Landmark, City, Pincode" 
                                    required 
                                    rows="4"
                                    onChange={e => setFormData({...formData, address: e.target.value})}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-order-whatsapp" disabled={Object.keys(cart).length === 0}>
                                {Object.keys(cart).length === 0 ? 'Basket is Empty' : 'Place Order via WhatsApp'}
                                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                    <path d="M17.472 14.382c-.3.149-1.777.877-2.049.976-.272.1-.471.149-.669.449-.198.3-.765.976-.938 1.173-.173.197-.347.223-.647.074-.3-.149-1.268-.468-2.416-1.492-.894-.798-1.5-1.783-1.675-2.081-.173-.298-.018-.46.132-.609.135-.133.3-.348.451-.522.15-.174.199-.298.299-.497.1-.198.05-.373-.025-.522-.075-.149-.669-1.612-.916-2.212-.24-.582-.485-.504-.669-.513-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.373-.272.299-1.04 1.018-1.04 2.484s1.017 2.883 1.166 3.081c.148.199 2.002 3.056 4.848 4.286.677.293 1.206.469 1.616.598.68.216 1.298.185 1.785.115.542-.078 1.666-.68 1.901-1.336.236-.657.236-1.221.165-1.337-.07-.116-.264-.197-.563-.347zM12 2C6.477 2 2 6.477 2 12c0 2.01.593 3.882 1.613 5.451L2 22l4.685-1.564A10.02 10.02 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.745 0-3.376-.57-4.703-1.536l-.338-.246-2.774.925.942-2.715-.27-.432A7.95 7.95 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer onOpenPolicy={() => setActiveModal('policy')} />

            {activeModal === 'policy' && <PolicyModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'orders' && <OrdersModal onClose={() => setActiveModal(null)} />}

            <style jsx>{`
                .checkout-container {
                    padding-top: 140px;
                    min-height: 80vh;
                    position: relative;
                    z-index: 2;
                }

                .checkout-layout {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    gap: 60px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .panel-header {
                    margin-bottom: 40px;
                }

                .panel-label {
                    display: block;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    color: var(--secondary-color);
                    font-weight: 700;
                    margin-bottom: 10px;
                }

                .panel-title {
                    font-family: var(--font-royal, serif);
                    font-size: 2.8rem;
                    color: var(--primary-color);
                }

                .panel-title span {
                    font-style: italic;
                    opacity: 0.8;
                }

                /* Basket Summary Styling */
                .basket-content {
                    background: rgba(255, 255, 255, 0.4);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(139, 0, 0, 0.05);
                    border-radius: 20px;
                    padding: 30px;
                    margin-bottom: 30px;
                }

                .basket-items-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .order-item-card {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid rgba(139, 0, 0, 0.05);
                }

                .order-item-card:last-child {
                    border-bottom: none;
                    padding-bottom: 0;
                }

                .item-visual {
                    width: 60px;
                    height: 60px;
                    background: #fff;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
                    flex-shrink: 0;
                }

                .item-visual img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .item-details {
                    flex: 1;
                }

                .item-name {
                    font-family: var(--font-royal, serif);
                    font-size: 1.1rem;
                    color: var(--text-color);
                    margin-bottom: 6px;
                }

                .item-meta {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                }

                .item-size-badge {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    background: rgba(139, 0, 0, 0.05);
                    color: var(--primary-color);
                    padding: 2px 8px;
                    border-radius: 4px;
                    font-weight: 700;
                }

                .item-qty {
                    font-size: 0.85rem;
                    color: #5a4a42;
                    opacity: 0.7;
                }

                .item-price-info {
                    text-align: right;
                }

                .item-price {
                    font-family: var(--font-royal, serif);
                    font-size: 1.2rem;
                    color: var(--text-color);
                    display: block;
                    font-weight: 600;
                }

                .remove-link {
                    background: none;
                    border: none;
                    color: #8B0000;
                    font-size: 0.7rem;
                    text-decoration: underline;
                    cursor: pointer;
                    opacity: 0.6;
                    transition: 0.3s;
                }

                .remove-link:hover { opacity: 1; }

                /* Total Styling - More Elegant, Less Button-like */
                .total-footer {
                    border-top: 1.5px solid #D4AF37;
                    padding: 25px 5px;
                    margin-top: 10px;
                }

                .total-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .total-row span:first-child {
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    color: var(--secondary-color);
                }

                .total-value {
                    font-family: var(--font-royal, serif);
                    font-size: 2.2rem;
                    font-weight: 700;
                    color: var(--primary-color);
                }

                /* Form Styling */
                .royal-checkout-form {
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                }

                .form-group-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }

                .royal-input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .royal-input-group label {
                    font-size: 0.85rem;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 1.5px;
                    color: #5a4a42;
                    opacity: 0.9;
                    padding-left: 4px;
                }

                .royal-input-group input,
                .royal-input-group textarea {
                    background: #fff;
                    border: 1px solid rgba(139, 0, 0, 0.1);
                    border-radius: 12px;
                    padding: 16px 20px;
                    font-size: 1rem;
                    font-family: var(--font-main);
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.02);
                }

                .royal-input-group input:focus,
                .royal-input-group textarea:focus {
                    outline: none;
                    border-color: var(--secondary-color);
                    box-shadow: 0 10px 25px rgba(212, 175, 55, 0.1);
                    transform: translateY(-2px);
                }

                .btn-order-whatsapp {
                    background: var(--primary-color);
                    color: white;
                    padding: 22px;
                    border: none;
                    border-radius: 100px;
                    font-size: 1.1rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 15px 35px rgba(139, 0, 0, 0.25);
                    margin-top: 10px;
                }

                .btn-order-whatsapp:hover {
                    background: #a30000;
                    transform: translateY(-5px);
                    box-shadow: 0 20px 50px rgba(139, 0, 0, 0.35);
                }

                .btn-order-whatsapp:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    transform: none !important;
                }

                .royal-notification {
                    position: fixed;
                    bottom: 40px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: var(--primary-color);
                    color: white;
                    padding: 15px 35px;
                    border-radius: 100px;
                    z-index: 10000;
                    font-weight: 700;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                }

                @media (max-width: 968px) {
                    .checkout-layout {
                        grid-template-columns: 1fr;
                        gap: 60px;
                        padding: 0 15px;
                    }
                    .checkout-container {
                        padding-top: 120px;
                    }
                    .panel-header {
                        text-align: center;
                        margin-bottom: 30px;
                    }
                    .panel-title {
                        font-size: 2rem;
                    }
                    .order-item-card {
                        flex-direction: column;
                        text-align: center;
                        gap: 15px;
                        padding-bottom: 25px;
                    }
                    .item-meta {
                        justify-content: center;
                    }
                    .item-price-info {
                        text-align: center;
                    }
                    .total-row {
                        flex-direction: column;
                        gap: 10px;
                        text-align: center;
                    }
                    .total-value {
                        font-size: 2.2rem;
                    }
                    .form-group-row {
                        grid-template-columns: 1fr;
                    }
                    .royal-input-group label {
                        text-align: center;
                        padding-left: 0;
                    }
                    .btn-order-whatsapp {
                        padding: 18px;
                        font-size: 1rem;
                    }
                }
            `}</style>
        </main>
    );
}
