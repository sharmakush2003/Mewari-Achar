'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/components/AuthContext';
import { SampleModal, PolicyModal, OrdersModal } from '@/components/Modals';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import confetti from 'canvas-confetti';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion, useScroll, useTransform } from 'framer-motion';

// Product Data (Matches original naming for 1:1 parity)
const products = [
    { id: 1, name: "Mango Achar (आम का अचार)", price500g: 200, price1kg: 380, image: "/Images/Mango Achar.jpg", desc: "Hand-cut raw mangoes sun-dried and matured in a rich blend of mustard oil, fenugreek, and fennel seeds.", flavorProfile: { spicy: 8, tangy: 9, earthy: 5, pungent: 6, savory: 7 } },
    { id: 2, name: "Mirchi Achar (मिर्च का अचार)", price500g: 170, price1kg: 300, image: "/Images/Mirchi Achar.jpg", desc: "Fresh green chillies slit and stuffed with a tangy, spicy masala mix. A fiery companion to your parathas.", flavorProfile: { spicy: 10, tangy: 4, earthy: 3, pungent: 7, savory: 6 } },
    { id: 3, name: "Adrak Achar (अदरक का अचार)", price500g: 300, price1kg: 580, image: "/Images/Adrak Achar.jpg", desc: "Tender ginger strips pickled in lemon juice and spices. A zesty, digestive aid that warms the soul.", flavorProfile: { spicy: 6, tangy: 5, earthy: 9, pungent: 4, savory: 8 } },
    { id: 4, name: "Amla Achar (आंवला का अचार)", price500g: 180, price1kg: 350, image: "/Images/Amla Achar.jpg", desc: "Whole Indian gooseberries steeped in spices. A perfect balance of sour and spicy, packed with tradition.", flavorProfile: { spicy: 4, tangy: 10, earthy: 7, pungent: 3, savory: 9 } },
    { id: 5, name: "Haldi Achar (हल्दी का अचार)", price500g: 220, price1kg: 400, image: "/Images/Haldi Achar.jpg", desc: "Fresh turmeric roots pickled to perfection. An earthy, immunity-boosting delight with a golden hue.", flavorProfile: { spicy: 5, tangy: 3, earthy: 10, pungent: 4, savory: 7 } },
    { id: 6, name: "Garlic Achar (लहसुन का अचार)", price500g: 250, price1kg: 480, image: "/Images/Lasson Achar.jpg", desc: "Whole garlic cloves slow-matured in mustard oil and red chilli powder. A robust, pungent flavor.", flavorProfile: { spicy: 7, tangy: 2, earthy: 8, pungent: 10, savory: 6 } },
];

function FlavorBars({ profile }) {
    const categories = [
        { key: 'spicy', label: 'Spicy', hindi: 'तीखा', icon: '🌶️' },
        { key: 'tangy', label: 'Tangy', hindi: 'खट्टा', icon: '🍋' },
        { key: 'earthy', label: 'Earthy', hindi: 'सोंधा', icon: '🌿' },
        { key: 'pungent', label: 'Pungent', hindi: 'तेज़', icon: '🧄' }
    ];

    return (
        <div className="flavor-profile-section">
            <span className="flavor-section-title">Taste Meter (स्वाद मीटर)</span>
            <div className="flavor-bars-grid">
                {categories.map(cat => (
                    <div key={cat.key} className="flavor-bar-row">
                        <div className="flavor-label-group">
                            <span className="flavor-icon">{cat.icon}</span>
                            <span className="flavor-name">{cat.label} <span className="hindi-label">({cat.hindi})</span></span>
                        </div>
                        <div className="flavor-bar-track">
                            <div className="flavor-bar-fill" style={{ width: `${profile[cat.key] * 10}%` }}></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default function Home() {
  const { user } = useAuth();
  const [cart, setCart] = useState({});
  const [formData, setFormData] = useState({ 
    name: '', phone: '', email: '', 
    address: '', instructions: '', payment: 'Online Banking' 
  });
  
  const [activeModal, setActiveModal] = useState(null);
  const [notification, setNotification] = useState("");

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 100]);

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

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const addToCart = (id, size) => {
    const key = `${id}_${size}`;
    setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    showNotification(`Added ${size} to basket! 🛒`);
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
    showNotification("Removed from basket 🗑️");
  };

  const calculateTotal = () => {
    let total = 0;
    Object.keys(cart).forEach(key => {
      const [id, size] = key.split("_");
      const product = products.find(p => p.id === parseInt(id));
      const price = size === "500g" ? product.price500g : product.price1kg;
      total += price * cart[key];
    });
    return total;
  };

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

    // Helper for timeout
    const withTimeout = (promise, ms) => {
        return Promise.race([
            promise,
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
        ]);
    };

    try {
      // 1. Try to save to Firestore with timeout
      try {
        await withTimeout(addDoc(collection(db, "orders"), {
          uid: user ? user.uid : "guest",
          ...formData,
          items,
          total: calculateTotal(),
          status: "Received",
          timestamp: serverTimestamp()
        }), 4000);
        console.log("Order saved to Firestore successfully");
      } catch (dbError) {
        console.warn("Firestore order save failed or timed out (Safe Mode):", dbError.message);
      }

      // 2. Always send the Email Backup (Fail-Safe)
      try {
        const emailRes = await fetch("/api/send-order-alert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
              orderData: { ...formData, items, total: calculateTotal() } 
          })
        });
        const emailData = await emailRes.json();
        if (emailData.success) {
            showNotification("Order confirmation email sent! 📧");
        }
      } catch (emailErr) {
        console.error("Email Backup failed:", emailErr);
      }

      showNotification("Order Successful! Redirecting...");
      const orderDetails = items.map(i => `${i.name} (${i.size}) x${i.qty}`).join('%0A');
      const whatsappUrl = `https://wa.me/919785054474?text=New Order from ${formData.name}!%0AItems:%0A${orderDetails}%0ATotal: ₹${calculateTotal()}%0AAddress: ${formData.address}`;
      
      // Clear cart
      setCart({});
      
      // WhatsApp redirect
      window.open(whatsappUrl, '_blank');
      
    } catch (error) {
      console.error(error);
      showNotification("Error processing order.");
    }
  };

  return (
    <div className="main-wrapper">
      <Navbar 
        onOpenSample={() => setActiveModal('sample')} 
        onOpenOrders={() => setActiveModal('orders')} 
      />
      
      <section id="home" className="royal-hero">
        <div className="hero-texture"></div>
        <div className="hero-soft-glow"></div>
        
        <div className="hero-content" data-aos="fade-up">
          <div className="hero-crown-seal">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 5L24 13H16L20 5Z" fill="#8B0000" />
              <circle cx="20" cy="20" r="15" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="3 3" />
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
            <a href="#products" className="btn-royal">Explore Collection</a>
            <button onClick={() => setActiveModal('sample')} className="btn-link-royal">Claim Free Sample</button>
          </div>
        </div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5, ease: "easeOut" }}
           style={{ y: yParallax }}
           className="hero-visual-center"
        >
           <div className="img-frame-accent"></div>
           <img src="/Images/Mango Achar.jpg" alt="Premium Mango Achar" className="hero-main-img" />
        </motion.div>
      </section>

      {/* Product List */}
      <section id="products" className="royal-section">
        <div className="section-header" data-aos="fade-up">
           <span className="section-label">Masterpieces</span>
           <h2 className="section-display">Featured <span>Collection</span></h2>
           <div className="section-accent"></div>
        </div>

        <div className="gallery-stack">
          {products.map(product => (
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
                    <button className="btn-add-royal" onClick={() => addToCart(product.id, "500g")}>Add to Basket</button>
                  </div>
                  <div className="price-box">
                    <span className="weight">1kg</span>
                    <span className="cost">₹{product.price1kg}</span>
                    <button className="btn-add-royal" onClick={() => addToCart(product.id, "1kg")}>Add to Basket</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="royal-section alt-cream">
        <div className="section-header" data-aos="fade-up">
           <span className="section-label">Our Philosophy</span>
           <h2 className="section-display">The Art of <span>Achaar</span></h2>
           <div className="section-accent"></div>
        </div>
        
        <div className="royal-features-grid">
            <div className="royal-feature-card" data-aos="fade-up">
                <div className="feature-symbol">🌿</div>
                <h3>Artisanal Integrity</h3>
                <p>Pure ingredients, no preservatives. Just nature's goodness in a jar.</p>
            </div>
            <div className="royal-feature-card" data-aos="fade-up" data-aos-delay="100">
                <div className="feature-symbol">🏺</div>
                <h3>Clay Pot Matured</h3>
                <p>Traditional slow-aging methods that allow flavors to deepen naturally.</p>
            </div>
            <div className="royal-feature-card" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-symbol">❤️</div>
                <h3>Small Batches</h3>
                <p>Handcrafted in limited quantities to ensure perfection in every drop.</p>
            </div>
        </div>
      </section>

      {/* MSME Trust Section */}
      <section className="royal-msme-trust" data-aos="fade-up">
        <div className="msme-container">
           <div className="msme-badge-lockup">
              <div className="msme-logo-shield">
                 <span>GOVT OF INDIA</span>
                 MSME
                 <span>MINISTRY</span>
              </div>
              <div className="msme-info">
                 <span className="msme-tag">Certified Micro Enterprise</span>
                 <h2 className="msme-title">Government Recognized Enterprise</h2>
                 <div className="msme-number">Reg No: UDYAM-RJ-10-0076393</div>
                 <p className="msme-nic">NIC Code 10306: Manufacture of pickles, chutney etc.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Order Section */}
      <section id="order" className="royal-section order-royal">
        <div className="section-header" data-aos="fade-up">
           <span className="section-label">Checkout</span>
           <h2 className="section-display">Secure Your <span>Jar</span></h2>
           <div className="section-accent"></div>
        </div>

        <div className="royal-order-container">
          <div className="basket-summary" data-aos="fade-right">
            <h3>Your Selection</h3>
            <div className="basket-items">
              {Object.keys(cart).length === 0 ? <p className="empty-msg">Your basket is waiting for tradition.</p> : 
                Object.keys(cart).map(key => {
                  const [id, size] = key.split("_");
                  const product = products.find(p => p.id === parseInt(id));
                  return <div key={key} className="basket-row">
                      <div className="item-info">
                        <span>{product.name} ({size})</span>
                        <span className="qty">x {cart[key]}</span>
                      </div>
                      <button className="btn-remove-basket" onClick={() => removeFromCart(key)} title="Remove item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </button>
                  </div>
                })
              }
            </div>
            <div className="basket-total">Total: ₹{calculateTotal()}</div>
          </div>

          <form className="royal-form" onSubmit={handleOrderSubmit} data-aos="fade-left">
            <div className="form-row">
                <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Rahul Sharma" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="input-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="98765 43210" required onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
            </div>
            <div className="input-group">
                <label>Email Address</label>
                <input type="email" placeholder="name@example.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="input-group">
                <label>Delivery Address</label>
                <textarea placeholder="Full address with pincode" required onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
            </div>
            <button type="submit" className="btn-royal full-width">Place Order via WhatsApp</button>
          </form>
        </div>
      </section>

      <footer className="royal-footer">
          <div className="footer-main-content">
              <div className="footer-brand">
                  <div className="footer-logo">Mewari Achaar</div>
                  <p className="footer-tagline">Preserving the legacy of Rajasthani flavors, one jar at a time.</p>
              </div>
              
              <div className="footer-msme-details">
                  <div className="msme-icon-small">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                  </div>
                  <span>MSME Certified Enterprise</span>
                  <span className="divider">|</span>
                  <span className="udyam-reg">UDYAM-RJ-10-0076393</span>
              </div>

              <div className="footer-nav">
                   <button onClick={() => setActiveModal('policy')} className="footer-nav-link">Policies</button>
                   <span className="dot-divider"></span>
                   <a href="mailto:rajesh.chittaurgarh@gmail.com" className="footer-nav-link">Contact Support</a>
              </div>
          </div>
          
          <div className="footer-bottom">
              <div className="footer-copyright">&copy; 2026 Mewari Homemade Achaar. All Rights Reserved.</div>
          </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .royal-hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 20px 60px;
          overflow: hidden;
          background: #faf9f2;
        }

        .hero-texture {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background-image: url("https://www.transparenttextures.com/patterns/paper.png");
          opacity: 0.15;
          pointer-events: none;
        }

        .hero-soft-glow {
          position: absolute;
          top: 30%; left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          max-width: 1200px;
          height: 90vh;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

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

        .btn-royal {
          background: linear-gradient(90deg, #8B0000 0%, #a50000 50%, #8B0000 100%);
          background-size: 200% auto;
          color: #fff;
          padding: 14px 35px;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          text-decoration: none;
          transition: 0.4s;
          box-shadow: 0 8px 25px rgba(139, 0, 0, 0.15);
          font-size: 0.9rem;
          animation: shimmer 8s linear infinite;
        }

        .btn-royal:hover {
          background-position: 100% 50%;
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(212, 175, 55, 0.25);
        }

        .btn-link-royal {
          background: none;
          border: none;
          color: #8B0000;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          border-bottom: 1.5px solid #D4AF37;
          padding-bottom: 3px;
        }

        .hero-visual-center {
          position: relative;
          z-index: 2;
          max-width: 450px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          justify-content: center;
        }

        .hero-main-img {
          width: 100%;
          max-width: 380px;
          height: auto;
          border-radius: 4px;
          box-shadow: 0 30px 60px rgba(44, 24, 16, 0.1);
          border: 1px solid #fff;
          position: relative;
          z-index: 2;
        }

        .img-frame-accent {
          position: absolute;
          top: -20px; left: -20px; right: -20px; bottom: -20px;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 4px;
          z-index: 1;
        }

        .royal-section {
          background: #faf9f2;
          padding: 120px 24px;
        }

        .alt-cream {
          background: #fdfdfa;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 4px;
          color: #D4AF37;
          margin-bottom: 15px;
          display: block;
          font-weight: 700;
        }

        .section-display {
          font-family: var(--font-royal, serif);
          font-size: 3.2rem;
          color: #2c1810;
          margin-bottom: 20px;
        }

        .section-display span {
          color: #8B0000;
          font-style: italic;
        }

        .section-accent {
          width: 40px;
          height: 1.5px;
          background: #8B0000;
          margin: 0 auto;
        }

        .gallery-stack {
          display: flex;
          flex-direction: column;
          gap: 120px;
          max-width: 950px;
          margin: 0 auto;
        }

        .royal-product-card {
          display: flex;
          gap: 60px;
          align-items: center;
        }

        .product-visual {
          flex: 1;
          aspect-ratio: 1/1;
          border: 1px solid rgba(139, 0, 0, 0.1);
          background: #fff;
          padding: 15px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
        }

        .product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-info {
          flex: 1.2;
        }

        .product-name {
          font-family: var(--font-royal, serif);
          font-size: 2.2rem;
          color: #2c1810;
          margin-bottom: 12px;
        }

        .product-desc {
          font-size: 1.05rem;
          color: #5a4a42;
          line-height: 1.6;
          margin-bottom: 25px;
          opacity: 0.8;
        }

        .flavor-profile-section {
          background: rgba(255, 255, 255, 0.4);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid rgba(212, 175, 55, 0.1);
          margin-bottom: 30px;
        }

        .flavor-section-title {
          display: block;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #8B0000;
          font-weight: 700;
          margin-bottom: 15px;
          opacity: 0.8;
        }

        .flavor-bars-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px 30px;
        }

        .flavor-bar-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .flavor-label-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .flavor-icon {
          font-size: 0.9rem;
        }

        .flavor-name {
          font-size: 0.75rem;
          font-weight: 600;
          color: #2c1810;
          opacity: 0.6;
        }

        .hindi-label {
          font-family: var(--font-main);
          font-weight: 400;
          font-size: 0.7rem;
          opacity: 0.8;
          margin-left: 2px;
        }

        .flavor-bar-track {
          height: 4px;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 2px;
          overflow: hidden;
        }

        .flavor-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #D4AF37 0%, #8B0000 100%);
          border-radius: 2px;
        }

        @media (max-width: 480px) {
          .flavor-bars-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        .price-tiers {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
        }

        .price-box {
          padding: 25px;
          background: #fff;
          border: 1px solid rgba(139, 0, 0, 0.05);
          text-align: center;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
        }

        .weight {
          display: block;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #8B0000;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .cost {
          display: block;
          font-size: 1.8rem;
          color: #2c1810;
          margin-bottom: 20px;
          font-family: var(--font-royal, serif);
        }

        .btn-add-royal {
          background: #fff;
          border: 1.5px solid #8B0000;
          color: #8B0000;
          padding: 10px 20px;
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 1px;
          cursor: pointer;
          transition: 0.3s;
        }

        .btn-add-royal:hover {
          background: #8B0000;
          color: #fff;
        }

        .royal-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .royal-feature-card {
          text-align: center;
          padding: 50px 30px;
          background: #fff;
          border: 1px solid rgba(139, 0, 0, 0.03);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.03);
        }

        .feature-symbol {
          font-size: 2.8rem;
          margin-bottom: 20px;
        }

        .royal-order-container {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 80px;
          max-width: 1150px;
          margin: 0 auto;
        }

        .basket-summary {
          background: #fff;
          padding: 45px;
          border: 1px solid rgba(139, 0, 0, 0.05);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.03);
        }

        .basket-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          color: #5a4a42;
        }

        .item-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .btn-remove-basket {
          background: none;
          border: none;
          color: #8B0000;
          opacity: 0.4;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 8px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-remove-basket:hover {
          opacity: 1;
          background: rgba(139, 0, 0, 0.05);
          transform: scale(1.1);
        }

        .basket-total {
          font-size: 2.2rem;
          color: #8B0000;
          margin-top: 35px;
          font-family: var(--font-royal, serif);
        }

        .royal-form {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .form-row {
          display: flex;
          gap: 25px;
        }

        .input-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-group label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #8B0000;
          font-weight: 700;
        }

        .input-group input, 
        .input-group textarea {
          background: #fff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          padding: 18px;
          color: #2c1810;
          font-family: var(--font-main);
          border-radius: 4px;
          font-size: 1rem;
        }

        .royal-footer {
          background: #fdfdfa;
          padding: 80px 24px 40px;
          border-top: 1px solid rgba(139, 0, 0, 0.08);
          position: relative;
        }

        .footer-main-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          text-align: center;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .footer-logo {
          font-family: var(--font-royal, serif);
          font-size: 3rem;
          color: #8B0000;
          line-height: 1;
        }

        .footer-tagline {
          font-size: 0.95rem;
          color: #5a4a42;
          opacity: 0.7;
          max-width: 400px;
          font-style: italic;
        }

        .footer-msme-details {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          background: rgba(139, 0, 0, 0.03);
          padding: 12px 25px;
          border-radius: 50px;
          border: 1px solid rgba(139, 0, 0, 0.05);
          color: #8B0000;
          font-weight: 600;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .msme-icon-small {
          color: #D4AF37;
          display: flex;
        }

        .footer-msme-details .divider {
          opacity: 0.3;
        }

        .footer-msme-details .udyam-reg {
          color: #2c1810;
          font-family: monospace;
          letter-spacing: 0;
        }

        .footer-nav {
          display: flex;
          align-items: center;
          gap: 25px;
        }

        .footer-nav-link {
          background: none;
          border: none;
          color: #2c1810;
          font-weight: 700;
          text-decoration: none;
          cursor: pointer;
          font-size: 0.9rem;
          opacity: 0.6;
          transition: 0.3s;
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .footer-nav-link:hover {
          opacity: 1;
          color: #8B0000;
        }

        .dot-divider {
          width: 4px;
          height: 4px;
          background: #D4AF37;
          border-radius: 50%;
        }

        .footer-bottom {
          margin-top: 60px;
          padding-top: 30px;
          border-top: 1px solid rgba(0, 0, 0, 0.03);
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .footer-copyright {
          font-size: 0.8rem;
          color: #2c1810;
          opacity: 0.4;
          letter-spacing: 0.5px;
        }


        @media (max-width: 968px) {
          .royal-hero {
            padding: 100px 20px 40px;
            min-height: auto;
          }
          .hero-display {
            font-size: 2.5rem;
          }
          .hero-main-img {
            max-width: 280px;
          }
          .royal-section {
            padding: 80px 20px;
          }
          .section-display {
            font-size: 2.2rem;
          }
          .royal-product-card {
            flex-direction: column;
            gap: 30px;
            text-align: center;
          }
          .product-visual {
            max-width: 320px;
            margin: 0 auto;
            width: 100%;
          }
          .product-name {
            font-size: 1.8rem;
          }
          .price-tiers {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          .royal-features-grid, .royal-order-container {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .form-row {
            flex-direction: column;
            gap: 20px;
          }
          .basket-summary {
            padding: 30px 20px;
          }
        }
      `}} />

      <SampleModal active={activeModal === 'sample'} onClose={() => setActiveModal(null)} />
      <PolicyModal active={activeModal === 'policy'} onClose={() => setActiveModal(null)} />
      <OrdersModal active={activeModal === 'orders'} onClose={() => setActiveModal(null)} user={user} />

      <div className={`notification ${notification ? "show" : ""}`}>{notification}</div>
    </div>
  );
}
