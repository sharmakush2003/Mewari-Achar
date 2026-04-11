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

// Product Data (Matches original naming for 1:1 parity)
const products = [
    { id: 1, name: "Mango Achar (आम का अचार)", price500g: 200, price1kg: 380, image: "/Images/Mango Achar.jpg", desc: "Hand-cut raw mangoes sun-dried and matured in a rich blend of mustard oil, fenugreek, and fennel seeds." },
    { id: 2, name: "Mirchi Achar (मिर्च का अचार)", price500g: 170, price1kg: 300, image: "/Images/Mirchi Achar.jpg", desc: "Fresh green chillies slit and stuffed with a tangy, spicy masala mix. A fiery companion to your parathas." },
    { id: 3, name: "Adrak Achar (अदरक का अचार)", price500g: 300, price1kg: 580, image: "/Images/Adrak Achar.jpg", desc: "Tender ginger strips pickled in lemon juice and spices. A zesty, digestive aid that warms the soul." },
    { id: 4, name: "Amla Achar (आंवला का अचार)", price500g: 180, price1kg: 350, image: "/Images/Amla Achar.jpg", desc: "Whole Indian gooseberries steeped in spices. A perfect balance of sour and spicy, packed with tradition." },
    { id: 5, name: "Haldi Achar (हल्दी का अचार)", price500g: 220, price1kg: 400, image: "/Images/Haldi Achar.jpg", desc: "Fresh turmeric roots pickled to perfection. An earthy, immunity-boosting delight with a golden hue." },
    { id: 6, name: "Garlic Achar (लहसुन का अचार)", price500g: 250, price1kg: 480, image: "/Images/Lasson Achar.jpg", desc: "Whole garlic cloves slow-matured in mustard oil and red chilli powder. A robust, pungent flavor." },
];

export default function Home() {
  const { user } = useAuth();
  const [cart, setCart] = useState({});
  const [formData, setFormData] = useState({ 
    name: '', phone: '', email: '', 
    address: '', instructions: '', payment: 'Online Banking' 
  });
  
  const [activeModal, setActiveModal] = useState(null);
  const [notification, setNotification] = useState("");

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
      
      {/* Hero Section (Exact original nesting) */}
      <header id="home" className="hero">
        <div className="hero-content" data-aos="fade-right">
          <span className="hero-tag">Handcrafted with Love</span>
          <h1>Taste the <br/><span>Legacy of Flavour</span></h1>
          <p>Experience the authentic taste of tradition. Homemade, preservative-free, and bursting with the finest spices.</p>
          <a href="#products" className="btn-primary">Explore Collection</a>
        </div>
        <div className="hero-visual" data-aos="zoom-in">
          <div className="hero-circle"></div>
          <img src="/Images/Mango Achar.jpg" alt="Premium Mango Achar" className="hero-img" />
        </div>
      </header>

      {/* Product List (Reverted back to exact class 'gallery-grid' for 1:1 CSS matching) */}
      <section id="products" className="section">
        <h2 className="section-title">Featured Masterpieces</h2>
        <div className="gallery-grid">
          {products.map(product => (
            <div key={product.id} className="product-card" data-aos="fade-up">
              <img src={product.image} alt={product.name} className="product-img" />
              <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="product-desc">{product.desc}</p>
                <div className="price-options">
                  <div className="price-row">
                    <span>500g - <span className="price-tag">₹{product.price500g}</span></span>
                    <button className="btn-sm" onClick={() => addToCart(product.id, "500g")}>Add</button>
                  </div>
                  <div className="price-row">
                    <span>1kg - <span className="price-tag">₹{product.price1kg}</span></span>
                    <button className="btn-sm" onClick={() => addToCart(product.id, "1kg")}>Add</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid (Exact match) */}
      <section className="section">
        <h2 className="section-title">The Art of Pickle Making</h2>
        <div className="features-grid">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="0">
                <div className="feature-icon">🌿</div>
                <h3>100% Natural</h3>
                <p>Pure ingredients, no preservatives. Just nature's goodness in a jar.</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
                <div className="feature-icon">👵</div>
                <h3>Heirloom Recipes</h3>
                <p>Secret blends of spices passed down through generations.</p>
            </div>
            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-icon">❤️</div>
                <h3>Small Batches</h3>
                <p>Handcrafted in small quantities to ensure perfection in every jar.</p>
            </div>
        </div>
      </section>

      {/* Availability (Centered without causing overflow) */}
      <section className="section" style={{ background: 'rgba(212, 175, 55, 0.05)', borderRadius: '40px', width: '90%', margin: '0 auto', padding: '4rem 2rem' }}>
          <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Taste the Legacy, Anywhere</h2>
              <p style={{ fontSize: '1.2rem', color: '#5a4a42', maxWidth: '700px', margin: '0 auto 1.5rem' }}>
                  Experience the authentic taste of tradition in person or from the comfort of your home. <strong>We are available online</strong> and we deliver our premium handcrafted jars right to your doorstep!
              </p>
          </div>
      </section>

      {/* Order Section (Exact match) */}
      <section id="order" className="section order-section">
        <h2 className="section-title">Secure Your Jar</h2>
        <div className="order-container">
          <div className="order-summary" data-aos="fade-right">
            <h3>Your Selection</h3>
            <div id="cart-items">
              {Object.keys(cart).length === 0 ? <p className="empty-cart-msg">Your basket is empty. Select your favorites.</p> : 
                Object.keys(cart).map(key => {
                  const [id, size] = key.split("_");
                  const product = products.find(p => p.id === parseInt(id));
                  return <div key={key} className="cart-item">
                      <span>{product.name} ({size}) x {cart[key]}</span>
                  </div>
                })
              }
            </div>
            <div className="delivery-notice" style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#8b1d1d', background: '#fff5f5', padding: '10px', borderRadius: '8px', borderLeft: '4px solid #8b1d1d' }}>
                📢 <strong>Note:</strong> Delivery Charges are applicable on every order based on distance.
            </div>
            <div className="total-price">Total: ₹{calculateTotal()}</div>
          </div>

          <form className="order-form" onSubmit={handleOrderSubmit} data-aos="fade-left">
            <h3>Delivery Details</h3>
            <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="e.g. Rahul Sharma" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="e.g. 98765 43210" required onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="form-group">
                <label>Email Address (For Confirmation)</label>
                <input type="email" placeholder="name@example.com" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
            <div className="form-group">
                <label>Delivery Address</label>
                <textarea placeholder="Full address with pincode" required onChange={e => setFormData({...formData, address: e.target.value})}></textarea>
            </div>
            <div className="form-group">
                <label>Special Requests</label>
                <textarea placeholder="Any specific preferences? (e.g. Extra oil, Less spicy)" onChange={e => setFormData({...formData, instructions: e.target.value})}></textarea>
            </div>
            <div className="form-group">
                <label>Payment Method</label>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
                        <input type="radio" name="payment" value="Online Banking" checked={formData.payment === 'Online Banking'} onChange={() => setFormData({...formData, payment: 'Online Banking'})} /> Online Banking
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'normal' }}>
                        <input type="radio" name="payment" value="Cash On Delivery" checked={formData.payment === 'Cash On Delivery'} onChange={() => setFormData({...formData, payment: 'Cash On Delivery'})} /> Cash On Delivery
                    </label>
                </div>
            </div>
            <button type="submit" className="btn-primary full-width">Place Order via WhatsApp</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
          <p>&copy; 2026 Mewari Homemade Achaar. Preserving Tradition.</p>
          <div style={{ margin: '15px 0' }}>
              <button onClick={() => setActiveModal('policy')} style={{ background: 'none', border: 'none', color: '#D4AF37', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}>Refund & Cancellation Policy</button>
          </div>
          <div className="footer-contact" style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: '0.8' }}>
              <p>Email: <a href="mailto:rajesh.chittaurgarh@gmail.com">rajesh.chittaurgarh@gmail.com</a> | Phone: <a href="tel:+919785054474">+91 9785054474</a></p>
          </div>
      </footer>

      <SampleModal active={activeModal === 'sample'} onClose={() => setActiveModal(null)} />
      <PolicyModal active={activeModal === 'policy'} onClose={() => setActiveModal(null)} />
      <OrdersModal active={activeModal === 'orders'} onClose={() => setActiveModal(null)} user={user} />

      <div className={`notification ${notification ? "show" : ""}`}>{notification}</div>
    </div>
  );
}
