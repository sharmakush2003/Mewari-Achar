'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection } from 'firebase/firestore';

// 1. Sample Modal
export const SampleModal = ({ active, onClose }) => {
  if (!active) return null;
  
  return (
    <div className={`modal-overlay active`} onClick={(e) => { 
        if (e.target.className.includes('modal-overlay')) onClose(); 
    }}>
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <span className="modal-icon">🎁</span>
          <h2>Get a Free Sample</h2>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: '0.9rem', color: '#8B0000', marginBottom: '0.5rem', fontWeight: 600 }}>
            *Sample is free, but delivery charges apply based on distance.
          </p>
          <form className="order-form" onSubmit={(e) => {
              e.preventDefault();
              const phone = e.target.phone.value;
              const addr = e.target.address.value;
              const type = e.target.type.value;
              const message = `Khamma Ghani Hukum! I would like to request a Free Sample.
Type: ${type}
Phone: ${phone}
Address: ${addr}`;
              window.open(`https://wa.me/917014102742?text=${encodeURIComponent(message)}`, '_blank');
              onClose();
          }}>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" required placeholder="e.g. 98765 43210" />
            </div>
            <div className="form-group">
              <label>Delivery Address</label>
              <textarea name="address" rows="3" required placeholder="Full address with pincode"></textarea>
            </div>
            <div className="form-group">
              <label>Which Achaar would you like to sample?</label>
              <select name="type" required defaultValue="">
                <option value="" disabled>Select Achaar Type</option>
                <option value="Mango Achaar">Mango Achaar (आम)</option>
                <option value="Mirchi Achaar">Mirchi Achaar (मिर्च)</option>
                <option value="Adrak Achaar">Adrak Achaar (अदरक)</option>
                <option value="Amla Achaar">Amla Achaar (आंवला)</option>
                <option value="Haldi Achaar">Haldi Achaar (हल्दी)</option>
                <option value="Garlic Achaar">Garlic Achaar (लहसुन)</option>
              </select>
            </div>
            <button type="submit" className="btn-primary full-width" style={{ marginTop: '1.5rem' }}>Request Sample via WhatsApp</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// 2. Policy Modal
export const PolicyModal = ({ active = true, onClose }) => {
  if (!active) return null;
  
  return (
    <div className={`modal-overlay active`} onClick={(e) => { 
        if (e.target.className.includes('modal-overlay')) onClose(); 
    }}>
      <div className="modal-content" style={{ textAlign: 'left', maxWidth: '650px' }}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <span className="modal-icon">📄</span>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Refund & Cancellation Policy</h2>
        </div>
        <div className="modal-body" style={{ fontSize: '0.95rem', lineHeight: '1.6', color: '#444' }}>
          <p><strong>Returns:</strong> We do not accept returns once the order is delivered.</p>
          <p style={{ marginTop: '10px' }}><strong>Refunds are issued if:</strong></p>
          <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li>Product is unavailable after payment.</li>
            <li>Product was damaged on delivery (photo proof required).</li>
            <li>Product was lost in transit.</li>
          </ul>
          <p><strong>Cancellations:</strong> We reserve the right to cancel orders for any reason. If cancelled after payment, you will receive a refund within 5-7 working days.</p>
          <p style={{ marginTop: '15px', fontWeight: 600, color: '#8B0000' }}>Questions? Contact: mewariachar@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

// 3. Support Modal
export const SupportModal = ({ active = true, onClose }) => {
  if (!active) return null;
  
  return (
    <div className={`modal-overlay active`} onClick={(e) => { 
        if (e.target.className.includes('modal-overlay')) onClose(); 
    }}>
      <div className="modal-content" style={{ maxWidth: '500px' }}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <span className="modal-icon">☎️</span>
          <h2>Contact Support</h2>
        </div>
        <div className="modal-body" style={{ textAlign: 'center' }}>
          <p style={{ color: '#5a4a42', marginBottom: '2rem' }}>We are here to help you with your order or any queries about our heritage achaar.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <a 
              href="https://www.instagram.com/mewariachar/" 
              target="_blank" 
              className="btn-outline-royal" 
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', borderColor: '#E1306C', color: '#E1306C' }}
            >
              <i className="fab fa-instagram" style={{ fontSize: '20px' }}></i>
              Instagram
            </a>
            
            <a 
              href={`https://wa.me/917014102742?text=${encodeURIComponent('Khamma Ghani Hukum! I need some support with my order.')}`} 
              target="_blank" 
              className="btn-outline-royal" 
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', borderColor: '#25D366', color: '#25D366' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.3.149-1.777.877-2.049.976-.272.1-.471.149-.669.449-.198.3-.765.976-.938 1.173-.173.197-.347.223-.647.074-.3-.149-1.268-.468-2.416-1.492-.894-.798-1.5-1.783-1.675-2.081-.173-.298-.018-.46.132-.609.135-.133.3-.348.451-.522.15-.174.199-.298.299-.497.1-.198.05-.373-.025-.522-.075-.149-.669-1.612-.916-2.212-.24-.582-.485-.504-.669-.513-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.373-.272.299-1.04 1.018-1.04 2.484s1.017 2.883 1.166 3.081c.148.199 2.002 3.056 4.848 4.286.677.293 1.206.469 1.616.598.68.216 1.298.185 1.785.115.542-.078 1.666-.68 1.901-1.336.236-.657.236-1.221.165-1.337-.07-.116-.264-.197-.563-.347zM12 2C6.477 2 2 6.477 2 12c0 2.01.593 3.882 1.613 5.451L2 22l4.685-1.564A10.02 10.02 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.745 0-3.376-.57-4.703-1.536l-.338-.246-2.774.925.942-2.715-.27-.432A7.95 7.95 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8z"/></svg>
              WhatsApp Us
            </a>
          </div>
          
          <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Owner: Vijay Laxmi Sharma</p>
            <p style={{ fontSize: '0.8rem', opacity: 0.6, color: '#8B0000', fontWeight: 'bold' }}>Contact: mewariachar@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Perks Modal (Popup on load)
export const PerksModal = ({ active, onClose }) => {
  const [lang, setLang] = useState('hi'); 

  if (!active) return null;

  const content = {
    hi: {
      badge: "राजसी सदस्यता",
      title: "खास मेवाड़ी फायदे",
      subtitle: "व्हाट्सएप ऑर्डर के साथ",
      intro: "हुकुम, खाता बनाने से आपको मिलेंगे ये विशेष लाभ:",
      perks: [
        { icon: "📧", title: "जल्द अपडेट्स", desc: "नए बैच की खबर व्हाट्सएप और ईमेल पर सबसे पहले।" },
        { icon: "🏷️", title: "खास छूट", desc: "पंजीकृत सदस्यों के लिए विशेष डिस्काउंट और ऑफर्स।" },
        { icon: "⚡", title: "आसान आर्डर", desc: "वेबसाइट से पसंद चुनें और व्हाट्सएप पर बुकिंग करें।" }
      ],
      checkbox: "7 दिनों तक मत दिखाएँ",
      btn: "शॉपिंग शुरू करें",
      toggle: "Switch to English"
    },
    en: {
      badge: "Royal Membership",
      title: "Exclusive Perks",
      subtitle: "On Mewari Achaar Portal",
      intro: "Hukum, creating an account unlocks these privileges:",
      perks: [
        { icon: "📧", title: "Priority Updates", desc: "New batch alerts via WhatsApp and Email instantly." },
        { icon: "🏷️", title: "Member Discounts", desc: "Special offers reserved only for registered users." },
        { icon: "⚡", title: "Faster Booking", desc: "Pick favorites online and order via WhatsApp." }
      ],
      checkbox: "Don't show for 7 days",
      btn: "Start Shopping",
      toggle: "Hindi में देखें"
    }
  };

  const t = content[lang];

  return (
    <div className={`modal-overlay active`} style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '15px'
    }} onClick={(e) => { 
        if (e.target.className.includes('modal-overlay')) onClose(); 
    }}>
      <div className="modal-content" style={{ 
        width: '90%',
        maxWidth: '380px', 
        maxHeight: '90vh',
        overflowY: 'auto',
        background: 'linear-gradient(165deg, #2c1810 0%, #1a0f0a 100%)', 
        color: '#fff', 
        border: '1px solid rgba(212, 175, 55, 0.4)', 
        padding: '25px 25px 25px',
        borderRadius: '25px',
        boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button className="close-modal" onClick={onClose} style={{ color: '#D4AF37', top: '15px', right: '15px', fontSize: '1.5rem' }}>&times;</button>
        
        <div className="modal-header" style={{ marginBottom: '15px' }}>
          <span className="perks-badge" style={{ 
              background: 'rgba(212, 175, 55, 0.1)',
              color: '#D4AF37',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              padding: '4px 15px',
              borderRadius: '100px',
              fontSize: '0.6rem',
              fontWeight: '800',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              display: 'inline-block',
              fontFamily: lang === 'hi' ? 'var(--font-devanagari)' : 'inherit',
              marginBottom: '12px'
          }}>{t.badge}</span>
          
          <h2 style={{ 
            fontFamily: 'var(--font-heading), serif', 
            margin: 0, 
            fontSize: '1.6rem',
            lineHeight: '1.1',
            color: '#fff'
          }}>
            {t.title} <br/>
            <span style={{ color: '#D4AF37', fontStyle: 'italic', fontSize: '1.2rem' }}>{t.subtitle}</span>
          </h2>
        </div>

        <div className="modal-body">
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            fontSize: '0.8rem', 
            lineHeight: '1.4', 
            marginBottom: '20px',
            fontFamily: lang === 'hi' ? 'var(--font-devanagari)' : 'inherit'
          }}>
            {t.intro}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px' }}>
            {t.perks.map((perk, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                gap: '15px', 
                alignItems: 'center', 
                background: 'rgba(255, 255, 255, 0.03)', 
                padding: '12px 15px', 
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'left'
              }}>
                <span style={{ fontSize: '1.4rem' }}>{perk.icon}</span>
                <div>
                  <h4 style={{ 
                    color: '#D4AF37', 
                    margin: '0 0 2px 0', 
                    fontSize: '0.85rem',
                    fontFamily: lang === 'hi' ? 'var(--font-devanagari)' : 'inherit' 
                  }}>{perk.title}</h4>
                  <p style={{ 
                    fontSize: '0.7rem', 
                    margin: 0, 
                    opacity: 0.6,
                    lineHeight: '1.3',
                    fontFamily: lang === 'hi' ? 'var(--font-devanagari)' : 'inherit'
                  }}>{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="checkbox" 
                id="dontShowAgain" 
                style={{ cursor: 'pointer', width: '16px', height: '16px', accentColor: '#D4AF37' }} 
                onChange={(e) => {
                  if (e.target.checked) {
                    const expiry = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
                    localStorage.setItem('mewari_perks_dismissed_until', expiry.toString());
                  } else {
                    localStorage.removeItem('mewari_perks_dismissed_until');
                  }
                }}
              />
              <label htmlFor="dontShowAgain" style={{ 
                fontSize: '0.75rem', 
                opacity: 0.8, 
                cursor: 'pointer',
                fontFamily: lang === 'hi' ? 'var(--font-devanagari)' : 'inherit'
              }}>{t.checkbox}</label>
            </div>

            <button 
              onClick={onClose}
              style={{ 
                  width: '100%', 
                  padding: '14px', 
                  background: 'linear-gradient(90deg, #D4AF37, #C5A028)', 
                  color: '#2c1810', 
                  border: 'none', 
                  borderRadius: '12px', 
                  fontWeight: '800',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  boxShadow: '0 12px 25px rgba(0,0,0,0.3)',
                  fontFamily: lang === 'hi' ? 'var(--font-devanagari)' : 'inherit',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
              }}
            >
              {t.btn}
            </button>

            <button 
              onClick={() => setLang(lang === 'hi' ? 'en' : 'hi')}
              style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#D4AF37', 
                  fontSize: '0.8rem', 
                  textDecoration: 'underline', 
                  cursor: 'pointer',
                  opacity: 0.9,
                  fontFamily: lang === 'hi' ? 'inherit' : 'var(--font-devanagari)'
              }}
            >
              {t.toggle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
