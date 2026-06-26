'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useProducts } from '@/lib/useProducts';
import FlavorSlider from '@/components/FlavorSlider';
import { PolicyModal, OrdersModal, SupportModal } from '@/components/Modals';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';

export default function Collection() {
    const { user } = useAuth();
    const { t, language } = useLanguage();
    const allProducts = useProducts();
    const [activeModal, setActiveModal] = useState(null);
    const [mounted, setMounted] = useState(false);

    const router = useRouter();

    const [productsList, setProductsList] = useState(allProducts);

    useEffect(() => {
        if (allProducts.length > 0) {
            setProductsList(allProducts);
        }
    }, [allProducts]);

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
        const message = `${t('supportTitle')}! I would like to order ${product.translations[language].name} (${size}).\n\n*My Custom Taste Settings:*${profileText}`;
        return `https://wa.me/917014102742?text=${encodeURIComponent(message)}`;
    };

    const handleNotifyMe = async (product) => {
        if (!user) {
            setActiveModal('login-toast');
            return;
        }
        
        const productName = product.translations[language].name;
        const cacheKey = `notify_${user.email}_${productName}`;

        if (localStorage.getItem(cacheKey)) {
            alert("You are already on the waitlist, please wait...");
            return;
        }

        try {
            const response = await fetch('/api/send-notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: user.email,
                    userName: user.displayName || 'Valued Guest',
                    productName: productName
                })
            });
            
            if (response.ok) {
                localStorage.setItem(cacheKey, "true");
                alert(`You're on the waitlist! We will notify you when ${productName} launches.`);
            } else {
                alert('Failed to join waitlist. Please try again.');
            }
        } catch (err) {
            alert('Error joining waitlist.');
        }
    };

    if (!mounted) return null;

    return (
        <main className="main-wrapper">
            <div className="hero-texture"></div>
            <div className="hero-soft-glow"></div>

            <Navbar />



            <section className="royal-section collection-hero">
                <div className="section-header" data-aos="fade-up">
                    <span className="section-label">{t('traditionLabel')}</span>
                    <h1 className="section-display">{t('featuredTitle').split(' ').slice(0, -1).join(' ')} <span>{t('featuredTitle').split(' ').slice(-1).join(' ')}</span></h1>
                    <div className="section-accent"></div>
                    <p className="section-intro">
                        {t('collectionIntro')}
                    </p>
                </div>
            </section>

            <section id="products" className="royal-section">
                <div className="collection-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto', padding: '0 5%' }}>
                    {productsList.map((product, index) => (
                        <div key={product.id} className="jhaji-product-card" style={{ background: '#fff', padding: '15px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '15px', border: '1px solid #eee' }} data-aos="fade-up">
                            <div className="product-visual" style={{ width: '100%', aspectRatio: '1/1', overflow: 'hidden', borderRadius: '8px' }}>
                                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            
                            <div className="product-info" style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333', lineHeight: '1.4' }}>{product.translations[language].name}</h3>
                                
                                <div className="rating" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}>
                                  <span style={{ color: '#000' }}>★ ★ ★ ★ {index % 2 === 0 ? '★' : '☆'}</span>
                                  <span style={{ fontWeight: '600', marginLeft: '5px' }}>{index % 2 === 0 ? '4.8' : '4.7'}</span>
                                  <span style={{ color: '#666' }}>({1000 + index * 123})</span>
                                </div>

                                {product.comingSoon ? (
                                  <>
                                    <div style={{ marginTop: 'auto', background: '#f8f8f8', padding: '10px', borderRadius: '5px', textAlign: 'center', marginBottom: '10px' }}>
                                      <span style={{ color: '#e972ab', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase' }}>{t('comingSoonBadge')}</span>
                                    </div>
                                    <button 
                                      onClick={() => handleNotifyMe(product)}
                                      style={{ width: '100%', background: '#e972ab', color: '#fff', border: 'none', padding: '12px', borderRadius: '5px', fontWeight: '600', cursor: 'pointer', textTransform: 'uppercase' }}
                                    >
                                      {t('notifyMe')}
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <select 
                                      id={`size-select-${product.id}`}
                                      style={{ width: '100%', padding: '10px', marginTop: 'auto', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '5px', color: '#333', fontSize: '0.9rem', outline: 'none' }}
                                    >
                                      <option value="500g">{t('size500g')} {product.price500g}</option>
                                      <option value="1kg">{t('size1kg')} {product.price1kg}</option>
                                      <option value="5kg">{t('bulkWholesale')}</option>
                                      <option value="500g-glass" disabled>{language === 'hi' ? '500 ग्राम (कांच का जार) - ' : '500 Grams (Glass Jar) - '}{t('comingSoonBadge')}</option>
                                      <option value="1kg-glass" disabled>{language === 'hi' ? '1 किलो (कांच का जार) - ' : '1 kg (Glass Jar) - '}{t('comingSoonBadge')}</option>
                                    </select>

                                    <button 
                                      onClick={() => {
                                        const selectElement = document.getElementById(`size-select-${product.id}`);
                                        const selectedSize = selectElement ? selectElement.value : '500g';
                                        window.open(getWhatsAppLink(product, selectedSize), '_blank');
                                      }} 
                                      style={{ width: '100%', background: '#e972ab', color: '#fff', border: 'none', padding: '12px', borderRadius: '5px', fontWeight: '600', cursor: 'pointer', textAlign: 'center', textTransform: 'uppercase' }}
                                    >
                                      {t('addToCart')}
                                    </button>
                                  </>
                                )}
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
            
            {activeModal === 'login-toast' && (
              <div className="toast-overlay" onClick={() => setActiveModal(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s' }}>
                <div className="toast-content" onClick={e => e.stopPropagation()} style={{ background: '#fff', padding: '30px', borderRadius: '16px', textAlign: 'center', maxWidth: '320px', width: '90%', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>
                  <h3 style={{ color: '#8B0000', marginBottom: '10px', fontSize: '1.2rem', fontFamily: 'serif' }}>{language === 'hi' ? 'लॉगिन आवश्यक है' : 'Login Required'}</h3>
                  <p style={{ fontSize: '0.95rem', color: '#555', marginBottom: '25px', lineHeight: '1.5' }}>{language === 'hi' ? 'वेटलिस्ट में शामिल होने के लिए आपको लॉगिन करना होगा।' : 'You need to login to join the waitlist.'}</p>
                  <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button onClick={() => router.push('/login')} style={{ flex: 1, padding: '10px', fontSize: '0.95rem', textAlign: 'center', borderRadius: '8px', background: '#8B0000', color: '#fff', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>{language === 'hi' ? 'लॉगिन' : 'Login'}</button>
                    <button onClick={() => router.push('/signup')} style={{ flex: 1, padding: '10px', fontSize: '0.95rem', textAlign: 'center', background: 'transparent', color: '#8B0000', border: '1px solid #8B0000', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>{language === 'hi' ? 'साइन अप' : 'Sign Up'}</button>
                  </div>
                  <button onClick={() => setActiveModal(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' }}>×</button>
                </div>
              </div>
            )}
        </main>
    );
}
