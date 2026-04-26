'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/AuthContext';
import { products } from '@/lib/products-data';
import FlavorBars from '@/components/FlavorBars';
import { useCart } from '@/components/CartContext';
import { PolicyModal, OrdersModal, SupportModal } from '@/components/Modals';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Collection() {
    const { user } = useAuth();
    const { addToCart, notification } = useCart();
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <main className="main-wrapper">
            <div className="hero-texture"></div>
            <div className="hero-soft-glow"></div>

            <Navbar 
                onOpenOrders={() => setActiveModal('orders')} 
            />

            {notification ? (
              <div className="royal-notification">
                {notification}
              </div>
            ) : null}

            <section className="royal-section collection-hero">
                <div className="section-header" data-aos="fade-up">
                    <span className="section-label">Our Full Gallery</span>
                    <h1 className="section-display">The Complete <span>Collection</span></h1>
                    <div className="section-accent"></div>
                    <p className="section-intro">
                        Explore every jar of heritage. From the fiery chillies of Mathania to the 
                        golden roots of tradition, each one is a masterpiece of slow-matured flavour.
                    </p>
                </div>
            </section>

            <section id="products" className="royal-section">
                <div className="rituals-stack">
                    {products.map(product => (
                        <div key={product.id} className="editorial-product-display" data-aos="fade-up">
                            <div className="product-image-container">
                                <img src={product.image} alt={product.name} />
                            </div>
                            <div className="product-info-editorial">
                                <h3 className="product-title-editorial">{product.name}</h3>
                                <p className="product-desc-premium">{product.desc}</p>
                                
                                <FlavorBars profile={product.flavorProfile} />
                                
                                <div className="price-tiers-editorial">
                                    <div className="box-card-premium">
                                        <span className="weight">500g</span>
                                        <span className="editorial-pricing">₹{product.price500g}</span>
                                        <button className="btn-outline-royal" onClick={() => addToCart(product.id, "500g", products)}>Add to Basket</button>
                                    </div>
                                    <div className="box-card-premium">
                                        <span className="weight">1kg</span>
                                        <span className="editorial-pricing">₹{product.price1kg}</span>
                                        <button className="btn-outline-royal" onClick={() => addToCart(product.id, "1kg", products)}>Add to Basket</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer 
                onOpenPolicy={() => setActiveModal('policy')} 
                onOpenSupport={() => setActiveModal('support')} 
            />

            {activeModal === 'policy' && <PolicyModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'support' && <SupportModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'orders' && <OrdersModal onClose={() => setActiveModal(null)} />}

            <style jsx>{`
                .collection-hero {
                    padding-top: 140px;
                    padding-bottom: 60px;
                }
                .section-intro {
                    max-width: 800px;
                    margin: 40px auto 0;
                    color: #5a4a42;
                    opacity: 0.85;
                    font-size: 1.25rem;
                    line-height: 1.8;
                    text-align: center;
                }
                .price-tiers {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin-top: 25px;
                }
                .price-box {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    background: #fdfdfa;
                    padding: 20px;
                    border: 1px solid rgba(212, 175, 55, 0.1);
                    text-align: center;
                    border-radius: 12px;
                }
                .weight {
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-weight: 700;
                    color: var(--secondary-color);
                }
                .cost {
                    font-weight: 800;
                    color: var(--primary-color);
                    font-size: 1.4rem;
                }
            `}</style>
        </main>
    );
}
