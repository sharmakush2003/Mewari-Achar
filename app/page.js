'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { products as allProducts } from '@/lib/products-data';
import Link from 'next/link';
import FlavorSlider from '@/components/FlavorSlider';
import { PolicyModal, SupportModal, PerksModal } from '@/components/Modals';

export default function Home() {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    // Show Perks Modal logic
    const now = new Date().getTime();
    const dismissedUntil = localStorage.getItem('mewari_perks_dismissed_until');
    const lastShown = localStorage.getItem('mewari_perks_last_shown');
    
    // 1. Check if user dismissed it for 7 days
    if (dismissedUntil && now < parseInt(dismissedUntil)) return;

    // 2. Check if shown in the last 24 hours
    const oneDay = 24 * 60 * 60 * 1000;
    if (lastShown && (now - parseInt(lastShown) < oneDay)) return;

    // Trigger modal
    const timer = setTimeout(() => {
      setActiveModal('perks');
      localStorage.setItem('mewari_perks_last_shown', now.toString());
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Show only top 3 products for the homepage
  const [featuredProducts, setFeaturedProducts] = useState(allProducts.slice(0, 3));

  const handleFlavorChange = (productId, key, value) => {
    setFeaturedProducts(prev => prev.map(p => 
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

  return (
    <div className="main-wrapper">
      <Navbar 
        onOpenSample={() => window.dispatchEvent(new CustomEvent('wa-trigger-view', { detail: 'sample' }))} 
      />

      <section id="home" className="royal-hero">
        <div className="hero-texture"></div>
        <div className="hero-soft-glow"></div>
        
        <div className="hero-content" >
          <div className="hero-crown-seal">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 5L24 13H16L20 5Z" fill="#8B0000"/>
              <circle cx="20" cy="20" r="15" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 3"/>
            </svg>
            <span>{t('traditionLabel')}</span>
          </div>

          <h1 className="hero-display">{t('heroTitle').split(' ').slice(0, -2).join(' ')} <br/><span>{t('heroTitle').split(' ').slice(-2).join(' ')}</span></h1>
          
          <div className="hero-accents">
            <div className="accent-line"></div>
            <div className="accent-diamond"></div>
            <div className="accent-line"></div>
          </div>

          <p className="hero-lead">
            {t('heroLead')}
          </p>

          <div className="hero-cta">
            <Link href="/collection" className="btn-royal">{t('heroCta')}</Link>
          </div>
        </div>
      </section>

      {/* Featured Masterpieces */}
      <section id="products" className="royal-section">
        <div className="section-header" >
          <span className="section-label">{t('featuredLabel')}</span>
          <h2 className="section-display">{t('featuredTitle').split(' ').slice(0, -1).join(' ')} <span>{t('featuredTitle').split(' ').slice(-1).join(' ')}</span></h2>
          <div className="section-accent"></div>
        </div>

        <div className="gallery-stack">
          {featuredProducts.map(product => (
            <div key={product.id} className="royal-product-card" >
              <div className="product-visual">
                <img src={product.image} alt={product.name} className="product-img" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.translations[language].name}</h3>
                <p className="product-desc">{product.translations[language].desc}</p>
                
                <FlavorSlider 
                  profile={product.flavorProfile} 
                  onChange={(key, value) => handleFlavorChange(product.id, key, value)} 
                />
                
                <div className="price-tiers">
                  <div className="price-box">
                    <span className="weight">500g</span>
                    <span className="cost">₹{product.price500g}</span>
                    <a 
                      href={getWhatsAppLink(product, '500g')} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-add-royal"
                      style={{ textDecoration: 'none', textAlign: 'center' }}
                    >
                      {t('orderWhatsApp')}
                    </a>
                  </div>
                  <div className="price-box">
                    <span className="weight">1kg</span>
                    <span className="cost">₹{product.price1kg}</span>
                    <a 
                      href={getWhatsAppLink(product, '1kg')} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-add-royal"
                      style={{ textDecoration: 'none', textAlign: 'center' }}
                    >
                      {t('orderWhatsApp')}
                    </a>
                  </div>
                  <div className="price-box custom-tier">
                    <span className="weight">{t('bulkOrders')}</span>
                    <span className="cost" style={{ fontSize: '0.6rem', lineHeight: '1.2', marginTop: '5px' }}>{t('bulkPriceDesc')}</span>
                    <a 
                      href={`https://wa.me/917014102742?text=${encodeURIComponent(`Khamma Ghani Hukum! I want to inquire about custom/bulk rates for ${product.name}.`)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-add-royal custom-btn"
                      style={{ textDecoration: 'none', textAlign: 'center' }}
                    >
                      {t('contactTeam')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-cta-footer" >
          <Link href="/collection" className="btn-royal">{t('heroCta')}</Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="royal-section alt-cream">
        <div className="section-header" >
           <span className="section-wide-label">{t('traditionLabel')}</span>
           <h2 className="section-display">{t('traditionTitle').split(' ').slice(0, -1).join(' ')} <span>{t('traditionTitle').split(' ').slice(-1).join(' ')}</span></h2>
           <div className="red-divider"></div>
        </div>
        
        <div className="royal-features-grid">
            <div className="royal-feature-card" >
                <div className="feature-symbol">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 5C20 5 10 12 10 22C10 27.52 14.48 32 20 32C25.52 32 30 27.52 30 22C30 12 20 5 20 5Z" stroke="#8B0000" strokeWidth="1.5" fill="none"/>
                    <path d="M20 14C20 14 15 18 15 23C15 25.76 17.24 28 20 28" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>{t('pureTitle')}</h3>
                <p>{t('pureDesc')}</p>
            </div>
            <div className="royal-feature-card"  data-aos-delay="100">
                <div className="feature-symbol">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="20" cy="28" rx="12" ry="6" stroke="#8B0000" strokeWidth="1.5" fill="none"/>
                    <path d="M12 24V16C12 16 14 8 20 8C26 8 28 16 28 16V24" stroke="#8B0000" strokeWidth="1.5" fill="none"/>
                    <path d="M16 14C16 14 17 10 20 10" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>{t('clayPotTitle')}</h3>
                <p>{t('clayPotDesc')}</p>
            </div>
            <div className="royal-feature-card"  data-aos-delay="200">
                <div className="feature-symbol">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 34C20 34 8 26 8 18C8 13.58 11.58 10 16 10C18 10 20 11 20 11C20 11 22 10 24 10C28.42 10 32 13.58 32 18C32 26 20 34 20 34Z" stroke="#8B0000" strokeWidth="1.5" fill="none"/>
                    <path d="M14 18C14 15 16 13 18 13" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>{t('handcraftedTitle')}</h3>
                <p>{t('handcraftedDesc')}</p>
            </div>
        </div>
      </section>
      
      <section className="royal-msme-trust" >
        <div className="msme-container">
            {/* Card 1: MSME Registration */}
            <div className="msme-badge-lockup">
              <div className="msme-seal">
                <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="45" cy="45" r="43" stroke="#D4AF37" strokeWidth="1.5" fill="#fff"/>
                  <circle cx="45" cy="45" r="38" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" fill="none"/>
                  <path d="M10 35 Q45 32 80 35 L80 38 Q45 41 10 38 Z" fill="#FF9933" opacity="0.85"/>
                  <path d="M10 38 Q45 41 80 38 L80 41 Q45 44 10 41 Z" fill="#fff" stroke="#ccc" strokeWidth="0.3"/>
                  <path d="M10 41 Q45 44 80 41 L80 44 Q45 47 10 44 Z" fill="#138808" opacity="0.85"/>
                  <circle cx="45" cy="40" r="5" stroke="#00008B" strokeWidth="1" fill="none"/>
                  <circle cx="45" cy="40" r="1.2" fill="#00008B"/>
                  {[...Array(24)].map((_, i) => {
                    const angle = (i * 15 * Math.PI) / 180;
                    const x1 = 45 + 1.5 * Math.cos(angle);
                    const y1 = 40 + 1.5 * Math.sin(angle);
                    const x2 = 45 + 4.5 * Math.cos(angle);
                    const y2 = 40 + 4.5 * Math.sin(angle);
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00008B" strokeWidth="0.5"/>;
                  })}
                  <text x="45" y="62" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#8B0000" fontFamily="serif" letterSpacing="1">GOVT OF INDIA</text>
                  <text x="45" y="70" textAnchor="middle" fontSize="7" fontWeight="900" fill="#8B0000" fontFamily="serif" letterSpacing="2">MSME</text>
                  <text x="45" y="77" textAnchor="middle" fontSize="4.5" fontWeight="600" fill="#5a4a42" fontFamily="serif" letterSpacing="1">MINISTRY</text>
                </svg>
              </div>
              <div className="msme-info-editorial">
                 <h4 className="msme-title-editorial">{t('govtRecognized')}</h4>
                 <div className="msme-number">{t('regNum')}</div>
                 <p className="msme-nic">{t('nicCode')}</p>
              </div>
            </div>

            {/* Card 2: FSSAI Registration */}
            <div className="msme-badge-lockup">
              <div className="msme-seal">
                <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="45" cy="45" r="43" stroke="#D4AF37" strokeWidth="1.5" fill="#fff"/>
                  <circle cx="45" cy="45" r="38" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" fill="none"/>
                  <path d="M45 20 Q39 27 45 32 Q51 27 45 20 Z" fill="#138808" opacity="0.85"/>
                  <path d="M48 22 Q52 26 48 30 Z" fill="#FF9933" opacity="0.85"/>
                  <text x="45" y="47" textAnchor="middle" fontSize="12" fontWeight="900" fill="#138808" fontFamily="sans-serif" letterSpacing="0.2">fssai</text>
                  <line x1="22" y1="52" x2="68" y2="52" stroke="#D4AF37" strokeWidth="0.8"/>
                  <text x="45" y="62" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#8B0000" fontFamily="serif" letterSpacing="0.8">GOVT OF INDIA</text>
                  <text x="45" y="70" textAnchor="middle" fontSize="6.5" fontWeight="900" fill="#8B0000" fontFamily="serif" letterSpacing="1">FOOD SAFETY</text>
                  <text x="45" y="77" textAnchor="middle" fontSize="5" fontWeight="600" fill="#5a4a42" fontFamily="serif" letterSpacing="0.5">STANDARDS</text>
                </svg>
              </div>
              <div className="msme-info-editorial">
                 <h4 className="msme-title-editorial">{t('fssaiTitle')}</h4>
                 <div className="msme-number">{t('fssaiRegNum')}</div>
                 <p className="msme-nic" style={{ marginTop: '10px', fontSize: '0.85rem', lineHeight: '1.4' }}>
                    <strong>Mewari Achaar</strong><br />
                    • {t('fssaiKOB')}<br />
                    • {t('fssaiCategories')}<br />
                    • {t('fssaiValidity')}
                 </p>
              </div>
            </div>
        </div>
      </section>

      <Footer 
        onOpenPolicy={() => setActiveModal('policy')} 
        onOpenSupport={() => window.dispatchEvent(new CustomEvent('wa-trigger-view', { detail: 'contact' }))} 
      />

      {Boolean(activeModal === 'policy') && <PolicyModal active={true} onClose={() => setActiveModal(null)} />}
      {Boolean(activeModal === 'support') && <SupportModal active={true} onClose={() => setActiveModal(null)} />}
      {Boolean(activeModal === 'perks') && <PerksModal active={true} onClose={() => setActiveModal(null)} />}

      <style jsx>{`
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 850px;
          margin: 0 auto;
          width: 100%;
          text-align: center;
        }
        .hero-crown-seal {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          margin-bottom: 25px;
        }
        .hero-crown-seal span {
          font-size: 0.65rem;
          text-transform: ${language === 'hi' ? 'none' : 'uppercase'};
          letter-spacing: ${language === 'hi' ? '0' : '4px'};
          color: #8B0000;
          font-weight: 700;
        }
        .hero-display {
          font-family: var(--font-royal, serif);
          font-size: clamp(2.5rem, 8vw, 5.5rem);
          line-height: 1.2;
          margin-bottom: 20px;
          color: #2c1810;
          font-weight: 500;
          letter-spacing: ${language === 'hi' ? '0' : '-1px'};
        }
        .hero-display span {
          color: #8B0000;
          font-style: italic;
        }
        .hero-accents {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 30px;
        }
        .accent-line {
          width: 50px;
          height: 1px;
          background: linear-gradient(to right, transparent, #D4AF37, transparent);
        }
        .accent-diamond {
          width: 5px;
          height: 5px;
          border: 1px solid #8B0000;
          transform: rotate(45deg);
        }
        .hero-lead {
          font-size: clamp(1rem, 3vw, 1.2rem);
          color: #5a4a42;
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto 35px;
          font-weight: 400;
          opacity: 0.85;
          padding: 0 10px;
        }
        .hero-cta {
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
        }
        .section-cta-footer {
          margin-top: 80px;
          text-align: center;
        }
        @media (max-width: 968px) {
          .hero-cta { flex-direction: column; gap: 20px; }
        }
        .price-tiers {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            width: 100%;
        }
        @media (max-width: 768px) {
            .price-tiers {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </div>
  );
}
