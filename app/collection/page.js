'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/AuthContext';
import { products as allProducts } from '@/lib/products-data';
import FlavorSlider from '@/components/FlavorSlider';
import { PolicyModal, OrdersModal, SupportModal } from '@/components/Modals';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Collection() {
    const { user } = useAuth();
    const [activeModal, setActiveModal] = useState(null);
    const [mounted, setMounted] = useState(false);

    const [productsList, setProductsList] = useState(allProducts);

    useEffect(() => {
        setMounted(true);
        AOS.init({ duration: 1000, once: true });
    }, []);

    const handleFlavorChange = (productId, key, value) => {
        setProductsList(prev => prev.map(p => 
          p.id === productId 
            ? { ...p, flavorProfile: { ...p.flavorProfile, [key]: value } }
            : p
        ));
    };

    const getWhatsAppLink = (product, size) => {
        const profile = product.flavorProfile;
        const profileText = `\n- Spicy: ${profile.spicy}/10\n- Tangy: ${profile.tangy}/10\n- Earthy: ${profile.earthy}/10\n- Pungent: ${profile.pungent}/10`;
        const message = `Khamma Ghani Hukum! I would like to order ${product.name} (${size}).\n\n*My Custom Taste Settings:*${profileText}`;
        return `https://wa.me/917014102742?text=${encodeURIComponent(message)}`;
    };

    if (!mounted) return null;

    return (
        <main className="main-wrapper">
            <div className="hero-texture"></div>
            <div className="hero-soft-glow"></div>

            <Navbar />



            <section className="royal-section collection-hero">
                <div className="section-header" data-aos="fade-up">
                    <span className="section-label">Mewar ki Virasat</span>
                    <h1 className="section-display">Asli Swad ka <span>Sangrah</span></h1>
                    <div className="section-accent"></div>
                    <p className="section-intro">
                        Hukum, hamare har jar mein hai Mewar ki purani parampara. 
                        Mathania ki mirch ho ya parampara se judi haldi, har ek swad hai bemisaal.
                    </p>
                </div>
            </section>

            <section id="products" className="royal-section">
                <div className="collection-stack">
                    {productsList.map((product, index) => (
                        <div 
                            key={product.id} 
                            className={`royal-product-card ${index % 2 === 1 ? 'reverse' : ''}`} 
                            data-aos="fade-up"
                        >
                            <div className="product-visual">
                                <img src={product.image} alt={product.name} className="product-img" />
                            </div>
                            
                            <div className="product-info">
                                <span className="heritage-tag">Legacy of Mewar</span>
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-desc">{product.desc}</p>
                                
                                <FlavorSlider 
                                    profile={product.flavorProfile} 
                                    onChange={(key, value) => handleFlavorChange(product.id, key, value)} 
                                />
                                
                                <div className="price-tiers">
                                    <div className="price-box">
                                        <span className="weight">500g Jar</span>
                                        <span className="cost">₹{product.price500g}</span>
                                        <a 
                                          href={getWhatsAppLink(product, '500g')} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="btn-add-royal"
                                          style={{ textDecoration: 'none' }}
                                        >
                                          Order on WhatsApp
                                        </a>
                                    </div>
                                    <div className="price-box">
                                        <span className="weight">1kg Jar</span>
                                        <span className="cost">₹{product.price1kg}</span>
                                        <a 
                                          href={getWhatsAppLink(product, '1kg')} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="btn-add-royal"
                                          style={{ textDecoration: 'none' }}
                                        >
                                          Order on WhatsApp
                                        </a>
                                    </div>
                                    <div className="price-box custom-tier">
                                        <span className="weight">Custom</span>
                                        <span className="cost" style={{ fontSize: '1.2rem' }}>Bulk Rates</span>
                                        <a 
                                          href={`https://wa.me/917014102742?text=${encodeURIComponent(`Khamma Ghani Hukum! I want to inquire about custom/bulk rates for ${product.name}.`)}`} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="btn-add-royal"
                                          style={{ textDecoration: 'none', borderColor: '#D4AF37', color: '#D4AF37' }}
                                        >
                                          Contact Team
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer 
                onOpenPolicy={() => setActiveModal('policy')} 
                onOpenSupport={() => window.dispatchEvent(new CustomEvent('wa-trigger-view', { detail: 'contact' }))} 
            />

            {activeModal === 'policy' && <PolicyModal onClose={() => setActiveModal(null)} />}
            {activeModal === 'support' && <SupportModal onClose={() => setActiveModal(null)} />}


            <style jsx>{`
                .collection-hero {
                    padding-top: 100px;
                    padding-bottom: 80px;
                    background: radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
                }
                .section-intro {
                    max-width: 700px;
                    margin: 30px auto 0;
                    color: #5a4a42;
                    opacity: 0.8;
                    font-size: 1.2rem;
                    line-height: 1.7;
                    text-align: center;
                }
                .collection-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 120px;
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 5%;
                }
                .heritage-tag {
                    display: block;
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    color: var(--secondary-color);
                    margin-bottom: 15px;
                    font-weight: 800;
                }
                .royal-product-card.reverse {
                    flex-direction: row-reverse;
                }
                
                @media (max-width: 1024px) {
                    .royal-product-card, .royal-product-card.reverse {
                        flex-direction: column;
                        gap: 40px;
                        text-align: center;
                    }
                    .royal-product-card .product-visual {
                        width: 100%;
                        max-width: 450px;
                    }
                    .royal-product-card .product-name {
                        font-size: 2.5rem;
                        text-align: center;
                    }
                    .royal-product-card .product-desc {
                        text-align: center;
                    }
                }
                @media (max-width: 640px) {
                    .price-tiers {
                        grid-template-columns: 1fr;
                    }
                    .collection-stack {
                        gap: 80px;
                    }
                }
            `}</style>

        </main>
    );
}
