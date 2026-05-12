'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/AuthContext';
import { products as allProducts } from '@/lib/products-data';
import FlavorBars from '@/components/FlavorBars';
import { SampleModal, PolicyModal, SupportModal, PerksModal } from '@/components/Modals';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

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
  const featuredProducts = allProducts.slice(0, 3);

  return (
    <div className="main-wrapper">
      <Navbar 
        onOpenSample={() => setActiveModal('sample')} 
      />

      <section id="home" className="royal-hero">
        <div className="hero-texture"></div>
        <div className="hero-soft-glow"></div>
        
        <div className="hero-content" data-aos="fade-up">
          <div className="hero-crown-seal">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 5L24 13H16L20 5Z" fill="#8B0000"/>
              <circle cx="20" cy="20" r="15" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 3"/>
            </svg>
            <span>Mewar ki Virasat</span>
          </div>

          <h1 className="hero-display">Mewar ka <br/><span>Shahi Swad</span></h1>
          
          <div className="hero-accents">
            <div className="accent-line"></div>
            <div className="accent-diamond"></div>
            <div className="accent-line"></div>
          </div>

          <p className="hero-lead">
            Padharo Hukum! Swad aisa jo aapko Mewar ki galiyon ki yaad dila de. 
            Shuddh desi masalon se bana, dhoop mein pakka asli Achaar.
          </p>

          <div className="hero-cta" style={{ marginBottom: '15px' }}>
            <Link href="/collection" className="btn-royal">संग्रह देखें</Link>
            <button className="btn-link-royal" onClick={() => setActiveModal('sample')}>मुफ्त सैंपल मंगवाएं</button>
          </div>
          
          <button 
            onClick={() => setActiveModal('perks')} 
            style={{ 
              background: 'none', 
              border: 'none', 
              color: '#D4AF37', 
              fontSize: '0.75rem', 
              textDecoration: 'underline', 
              cursor: 'pointer',
              opacity: 0.8,
              letterSpacing: '0.5px',
              fontFamily: 'var(--font-devanagari)'
            }}
          >
            राजसी सदस्यता के लाभ देखें
          </button>
        </div>
      </section>

      {/* Featured Masterpieces */}
      <section id="products" className="royal-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">Rajwadi Swaad</span>
          <h2 className="section-display">Khaas <span>Sangrah</span></h2>
          <div className="section-accent"></div>
        </div>

        <div className="gallery-stack">
          {featuredProducts.map(product => (
            <div key={product.id} className="royal-product-card" data-aos="fade-up">
              <div className="product-visual">
                <img src={product.image} alt={product.name} className="product-img" />
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-desc">{product.desc}</p>
                
                <FlavorBars profile={product.flavorProfile} />
                
                <div className="price-tiers">
                  <div className="price-box">
                    <span className="weight">500g</span>
                    <span className="cost">₹{product.price500g}</span>
                    <a 
                      href={`https://wa.me/917014102742?text=${encodeURIComponent(`Khamma Ghani Hukum! I would like to order ${product.name} (500g).`)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-add-royal"
                      style={{ textDecoration: 'none', textAlign: 'center' }}
                    >
                      Order on WhatsApp
                    </a>
                  </div>
                  <div className="price-box">
                    <span className="weight">1kg</span>
                    <span className="cost">₹{product.price1kg}</span>
                    <a 
                      href={`https://wa.me/917014102742?text=${encodeURIComponent(`Khamma Ghani Hukum! I would like to order ${product.name} (1kg).`)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-add-royal"
                      style={{ textDecoration: 'none', textAlign: 'center' }}
                    >
                      Order on WhatsApp
                    </a>
                  </div>
                  <div className="price-box custom-tier">
                    <span className="weight">Custom</span>
                    <span className="cost">संपर्क करें</span>
                    <a 
                      href={`https://wa.me/917014102742?text=${encodeURIComponent(`Khamma Ghani Hukum! I want to inquire about custom/bulk rates for ${product.name}.`)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-add-royal custom-btn"
                      style={{ textDecoration: 'none', textAlign: 'center' }}
                    >
                      Contact Team
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-cta-footer" data-aos="fade-up">
          <Link href="/collection" className="btn-royal">पूरा संग्रह देखें</Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="royal-section alt-cream">
        <div className="section-header" data-aos="fade-up">
           <span className="section-wide-label">Hamari Parampara</span>
           <h2 className="section-display">Achaar ka Asli <span>Hunar</span></h2>
           <div className="red-divider"></div>
        </div>
        
        <div className="royal-features-grid">
            <div className="royal-feature-card" data-aos="fade-up">
                <div className="feature-symbol">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 5C20 5 10 12 10 22C10 27.52 14.48 32 20 32C25.52 32 30 27.52 30 22C30 12 20 5 20 5Z" stroke="#8B0000" strokeWidth="1.5" fill="none"/>
                    <path d="M20 14C20 14 15 18 15 23C15 25.76 17.24 28 20 28" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>शुद्धता और सत्यनिष्ठा</h3>
                <p>बिना किसी मिलावट के, प्रकृति की शुद्धता हर जार में।</p>
            </div>
            <div className="royal-feature-card" data-aos="fade-up" data-aos-delay="100">
                <div className="feature-symbol">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="20" cy="28" rx="12" ry="6" stroke="#8B0000" strokeWidth="1.5" fill="none"/>
                    <path d="M12 24V16C12 16 14 8 20 8C26 8 28 16 28 16V24" stroke="#8B0000" strokeWidth="1.5" fill="none"/>
                    <path d="M16 14C16 14 17 10 20 10" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>मिट्टी के बर्तनों में पकाया हुआ</h3>
                <p>पुरानी पद्धतियों से धीरे-धीरे तैयार, ताकि स्वाद गहराई तक उतर जाए।</p>
            </div>
            <div className="royal-feature-card" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-symbol">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 34C20 34 8 26 8 18C8 13.58 11.58 10 16 10C18 10 20 11 20 11C20 11 22 10 24 10C28.42 10 32 13.58 32 18C32 26 20 34 20 34Z" stroke="#8B0000" strokeWidth="1.5" fill="none"/>
                    <path d="M14 18C14 15 16 13 18 13" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>सीमित मात्रा में निर्माण</h3>
                <p>हाथों से बना, ताकि हर बूंद में परफेक्शन बना रहे।</p>
            </div>
        </div>
      </section>
      


      <section className="royal-msme-trust" data-aos="fade-up">
        <div className="msme-container">
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
                <h4 className="msme-title-editorial">भारत सरकार द्वारा मान्यता प्राप्त उद्यम</h4>
                <div className="msme-number">पंजीकरण संख्या: UDYAM-RJ-10-0076393</div>
                <p className="msme-nic">NIC कोड 10306: अचार और चटनी का निर्माण।</p>
             </div>
           </div>
        </div>
      </section>

      <Footer 
        onOpenPolicy={() => setActiveModal('policy')} 
        onOpenSupport={() => setActiveModal('support')} 
      />

      {Boolean(activeModal === 'sample') && <SampleModal active={true} onClose={() => setActiveModal(null)} />}
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
          text-transform: uppercase;
          letter-spacing: 4px;
          color: #8B0000;
          font-weight: 700;
        }
        .hero-display {
          font-family: var(--font-royal, serif);
          font-size: clamp(2.5rem, 8vw, 5.5rem);
          line-height: 1.1;
          margin-bottom: 20px;
          color: #2c1810;
          font-weight: 500;
          letter-spacing: -1px;
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
