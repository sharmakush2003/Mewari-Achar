'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/components/AuthContext';
import { products as allProducts } from '@/lib/products-data';
import FlavorBars from '@/components/FlavorBars';
import { useCart } from '@/components/CartContext';
import { SampleModal, PolicyModal, OrdersModal } from '@/components/Modals';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import FlavorQuiz from '@/components/FlavorQuiz';

import Link from 'next/link';

export default function Home() {
  const { user } = useAuth();
  const { addToCart, notification } = useCart();
  const [activeModal, setActiveModal] = useState(null);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 100]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Show only top 3 products for the homepage
  const featuredProducts = allProducts.slice(0, 3);

  return (
    <div className="main-wrapper">
      <Navbar 
        onOpenSample={() => setActiveModal('sample')} 
        onOpenOrders={() => setActiveModal('orders')} 
      />

      {notification ? (
        <div className="royal-notification">
          {notification}
        </div>
      ) : null}
      
      <section id="home" className="royal-hero">
        <div className="hero-texture"></div>
        <div className="hero-soft-glow"></div>
        
        <div className="hero-content" data-aos="fade-up">
          <div className="hero-crown-seal">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 5L24 13H16L20 5Z" fill="#8B0000"/>
              <circle cx="20" cy="20" r="15" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 3"/>
            </svg>
            <span>Legacy of Mewar</span>
          </div>

          <h1 className="hero-display">Taste the <br/><span>Heritage of Flavour</span></h1>
          
          <div className="hero-accents">
            <div className="accent-line"></div>
            <div className="accent-diamond"></div>
            <div className="accent-line"></div>
          </div>

          <p className="hero-lead">
            Experience the authentic taste of tradition. Handcrafted, sun-dried,
            and matured in the heat of the Rajasthan desert.
          </p>

          <div className="hero-cta">
            <Link href="/collection" className="btn-royal">Explore Collection</Link>
            <button className="btn-link-royal" onClick={() => setActiveModal('sample')}>Claim Free Sample</button>
          </div>
        </div>

        <div className="hero-visual-center">
          <div className="img-frame-accent"></div>
          <img src="/Images/Mango Achar.jpg" alt="Premium Mango Achar" className="hero-main-img" />
        </div>
      </section>

      {/* Featured Masterpieces */}
      <section id="products" className="royal-section">
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">Masterpieces</span>
          <h2 className="section-display">Featured <span>Collection</span></h2>
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
                    <button className="btn-add-royal" onClick={() => addToCart(product.id, '500g', allProducts)}>Add to Basket</button>
                  </div>
                  <div className="price-box">
                    <span className="weight">1kg</span>
                    <span className="cost">₹{product.price1kg}</span>
                    <button className="btn-add-royal" onClick={() => addToCart(product.id, '1kg', allProducts)}>Add to Basket</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-cta-footer" data-aos="fade-up">
          <Link href="/collection" className="btn-royal">View Full Collection</Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="royal-section alt-cream">
        <div className="section-header" data-aos="fade-up">
           <span className="section-wide-label">OUR PHILOSOPHY</span>
           <h2 className="section-display">The Art of <span>Achaar</span></h2>
           <div className="red-divider"></div>
        </div>
        
        <div className="royal-features-grid">
            <div className="royal-feature-card" data-aos="fade-up">
                <div className="feature-symbol">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 5C20 5 10 12 10 22C10 27.52 14.48 32 20 32C25.52 32 30 27.52 30 22C30 12 20 5Z" stroke="#8B0000" strokeWidth="1.5" fill="none"/>
                    <path d="M20 14C20 14 15 18 15 23C15 25.76 17.24 28 20 28" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>Artisanal Integrity</h3>
                <p>Pure ingredients, no preservatives. Just nature's goodness in a jar.</p>
            </div>
            <div className="royal-feature-card" data-aos="fade-up" data-aos-delay="100">
                <div className="feature-symbol">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="20" cy="28" rx="12" ry="6" stroke="#8B0000" strokeWidth="1.5" fill="none"/>
                    <path d="M12 24V16C12 16 14 8 20 8C26 8 28 16 28 16V24" stroke="#8B0000" strokeWidth="1.5" fill="none"/>
                    <path d="M16 14C16 14 17 10 20 10" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>Clay Pot Matured</h3>
                <p>Traditional slow-aging methods that allow flavors to deepen naturally.</p>
            </div>
            <div className="royal-feature-card" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-symbol">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 34C20 34 8 26 8 18C8 13.58 11.58 10 16 10C18 10 20 11 20 11C20 11 22 10 24 10C28.42 10 32 13.58 32 18C32 26 20 34 20 34Z" stroke="#8B0000" strokeWidth="1.5" fill="none"/>
                    <path d="M14 18C14 15 16 13 18 13" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </div>
                <h3>Small Batches</h3>
                <p>Handcrafted in limited quantities to ensure perfection in every drop.</p>
            </div>
        </div>
      </section>
      
      {/* Flavor Discovery Quiz Section */}
      <section className="royal-section flavor-discovery-hub" data-aos="fade-up">
        <div className="discovery-container">
          <FlavorQuiz />
        </div>
      </section>

      {/* MSME Trust Section */}
      <section className="royal-msme-trust" data-aos="fade-up">
        <div className="msme-container">
           <div className="msme-badge-lockup">
             <div className="msme-seal">
               <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                 {/* Outer ring */}
                 <circle cx="45" cy="45" r="43" stroke="#D4AF37" strokeWidth="1.5" fill="#fff"/>
                 <circle cx="45" cy="45" r="38" stroke="rgba(212,175,55,0.3)" strokeWidth="0.5" fill="none"/>
                 {/* Tricolor stripe */}
                 <path d="M10 35 Q45 32 80 35 L80 38 Q45 41 10 38 Z" fill="#FF9933" opacity="0.85"/>
                 <path d="M10 38 Q45 41 80 38 L80 41 Q45 44 10 41 Z" fill="#fff" stroke="#ccc" strokeWidth="0.3"/>
                 <path d="M10 41 Q45 44 80 41 L80 44 Q45 47 10 44 Z" fill="#138808" opacity="0.85"/>
                 {/* Ashoka Chakra */}
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
                 {/* Bottom text */}
                 <text x="45" y="62" textAnchor="middle" fontSize="5.5" fontWeight="700" fill="#8B0000" fontFamily="serif" letterSpacing="1">GOVT OF INDIA</text>
                 <text x="45" y="70" textAnchor="middle" fontSize="7" fontWeight="900" fill="#8B0000" fontFamily="serif" letterSpacing="2">MSME</text>
                 <text x="45" y="77" textAnchor="middle" fontSize="4.5" fontWeight="600" fill="#5a4a42" fontFamily="serif" letterSpacing="1">MINISTRY</text>
               </svg>
             </div>
             <div className="msme-info-editorial">
                <h4 className="msme-title-editorial">Government Recognized Enterprise</h4>
                <div className="msme-number">Reg No: UDYAM-RJ-10-0076393</div>
                <p className="msme-nic">NIC Code 10306: Manufacture of pickles, chutney etc.</p>
             </div>
           </div>
        </div>
      </section>

      <Footer onOpenPolicy={() => setActiveModal('policy')} />

      {Boolean(activeModal === 'sample') && <SampleModal active={true} onClose={() => setActiveModal(null)} />}
      {Boolean(activeModal === 'policy') && <PolicyModal active={true} onClose={() => setActiveModal(null)} />}
      {Boolean(activeModal === 'orders') && <OrdersModal active={true} user={user} onClose={() => setActiveModal(null)} />}

      <style jsx>{`
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 850px;
          margin-bottom: 40px;
          width: 100%;
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
        .story-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 100px;
          align-items: center;
        }
        .story-text { text-align: left; }
        .story-text p {
          font-size: 1.25rem;
          line-height: 1.95;
          color: #5a4a42;
          margin-bottom: 30px;
          opacity: 0.9;
        }
        .visual-frame {
          position: relative;
          padding: 25px;
          background: white;
          box-shadow: 0 40px 80px rgba(44, 24, 16, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.2);
        }
        .visual-frame img {
          width: 100%;
          height: 580px;
          object-fit: cover;
        }
        @media (max-width: 968px) {
          .visual-frame img {
            height: 320px;
          }
          .visual-frame {
            padding: 15px;
          }
        }
        @media (max-width: 480px) {
          .visual-frame img {
            height: 240px;
          }
          .visual-frame {
            padding: 10px;
          }
        }
        .order-cta-banner {
          background: linear-gradient(135deg, #6b0000 0%, #8B0000 50%, #7a0000 100%);
          padding: 120px 20px;
          text-align: center;
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .order-cta-banner::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(ellipse at center top, rgba(212,175,55,0.12) 0%, transparent 65%);
          pointer-events: none;
        }
        .order-cta-banner::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url("https://www.transparenttextures.com/patterns/paper.png");
          opacity: 0.06;
          pointer-events: none;
        }
        .banner-content {
          position: relative;
          z-index: 2;
          max-width: 780px;
          margin: 0 auto;
        }
        .banner-ornament {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin-bottom: 30px;
        }
        .banner-ornament-line {
          width: 60px;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(212,175,55,0.7));
        }
        .banner-ornament-line.right {
          background: linear-gradient(to left, transparent, rgba(212,175,55,0.7));
        }
        .banner-ornament-diamond {
          width: 6px;
          height: 6px;
          border: 1px solid rgba(212,175,55,0.8);
          transform: rotate(45deg);
        }
        .order-cta-banner h2 {
          color: #fff !important;
          font-size: clamp(1.8rem, 6vw, 3rem);
          margin-bottom: 0;
        }
        .order-cta-banner h2 span {
          color: #D4AF37 !important;
          font-style: italic;
          opacity: 1;
        }
        .order-cta-banner p {
          font-size: clamp(1rem, 3vw, 1.3rem);
          opacity: 0.85;
          margin: 25px auto 45px;
          max-width: 600px;
          color: #fff;
          line-height: 1.7;
        }
        .banner-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-royal.gold {
          background: #D4AF37;
          color: #2c1810;
          box-shadow: 0 10px 35px rgba(212,175,55,0.35);
        }
        .btn-royal.gold:hover {
          background: #e8c84a;
          box-shadow: 0 18px 45px rgba(212,175,55,0.5);
        }
        @media (max-width: 968px) {
          .hero-cta { flex-direction: column; gap: 20px; }
          .banner-buttons { flex-direction: column; align-items: center; }
          .order-cta-banner { padding: 80px 24px; }
        }
      `}</style>
    </div>
  );
}
