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
              window.open(`https://wa.me/917014102742?text=Free Sample Request!%0AType: ${type}%0APhone: ${phone}%0AAddress: ${addr}`, '_blank');
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
            <a href="mailto:mewariachar@gmail.com" className="btn-outline-royal" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              Email Us
            </a>
            
            <a href="https://wa.me/917014102742" target="_blank" className="btn-outline-royal" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', borderColor: '#25D366', color: '#25D366' }}>
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
  if (!active) return null;

  return (
    <div className={`modal-overlay active`} onClick={(e) => { 
        if (e.target.className.includes('modal-overlay')) onClose(); 
    }}>
      <div className="modal-content" style={{ maxWidth: '450px', background: '#2c1810', color: '#fff', border: '1px solid #D4AF37', padding: '25px' }}>
        <button className="close-modal" onClick={onClose} style={{ color: '#D4AF37', top: '10px', right: '15px' }}>&times;</button>
        <div className="modal-header" style={{ borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '15px' }}>
          <span className="perks-badge" style={{ 
              background: 'rgba(212, 175, 55, 0.1)',
              color: '#D4AF37',
              border: '1px solid #D4AF37',
              padding: '3px 12px',
              borderRadius: '100px',
              fontSize: '0.65rem',
              fontWeight: '700',
              letterSpacing: '1.5px',
              textTransform: 'uppercase'
          }}>Elite Membership Benefits</span>
          <h2 style={{ fontFamily: 'serif', marginTop: '12px', fontSize: '1.5rem' }}>WhatsApp Order, <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Account Faide</span></h2>
        </div>
        <div className="modal-body" style={{ padding: '15px 0' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '20px' }}>
            Hukum, Mewari Achaar account hone ke dheron faide hain:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>📧</span>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ color: '#D4AF37', margin: 0, fontSize: '0.9rem' }}>Exclusive Updates</h4>
                <p style={{ fontSize: '0.75rem', margin: 0, opacity: 0.7 }}>Naye batches ki jankari sabse pehle.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>🏷️</span>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ color: '#D4AF37', margin: 0, fontSize: '0.9rem' }}>Member Discounts</h4>
                <p style={{ fontSize: '0.75rem', margin: 0, opacity: 0.7 }}>Khaas discounts sirf registered users ke liye.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '8px' }}>
              <span style={{ fontSize: '1.2rem' }}>📄</span>
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ color: '#D4AF37', margin: 0, fontSize: '0.9rem' }}>Automated Billing</h4>
                <p style={{ fontSize: '0.75rem', margin: 0, opacity: 0.7 }}>Order summary aur bills seedha email par.</p>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <input 
              type="checkbox" 
              id="dontShowAgain" 
              style={{ cursor: 'pointer' }} 
              onChange={(e) => {
                if (e.target.checked) {
                  // Set dismissal for 7 days
                  const expiry = new Date().getTime() + (7 * 24 * 60 * 60 * 1000);
                  localStorage.setItem('mewari_perks_dismissed_until', expiry.toString());
                } else {
                  localStorage.removeItem('mewari_perks_dismissed_until');
                }
              }}
            />
            <label htmlFor="dontShowAgain" style={{ fontSize: '0.75rem', opacity: 0.7, cursor: 'pointer' }}>7 dino tak dobara mat dikhayein</label>
          </div>

          <button 
            onClick={onClose}
            style={{ 
                marginTop: '15px', 
                width: '100%', 
                padding: '10px', 
                background: '#D4AF37', 
                color: '#2c1810', 
                border: 'none', 
                borderRadius: '8px', 
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.9rem'
            }}
          >
            Shopping Shuru Karein
          </button>
        </div>
      </div>
    </div>
  );
};
