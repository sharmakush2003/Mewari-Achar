'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

// 1. Sample Modal (Matches exact HTML structure/classes)
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
          <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '1.5rem', opacity: 0.8 }}>
            ℹ️ Sample delivery date will be provided by the owner on WhatsApp.
          </p>
          <form className="order-form" onSubmit={(e) => {
              e.preventDefault();
              const phone = e.target.phone.value;
              const addr = e.target.address.value;
              const type = e.target.type.value;
              window.open(`https://wa.me/919785054474?text=Free Sample Request!%0AType: ${type}%0APhone: ${phone}%0AAddress: ${addr}`, '_blank');
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
              <label>Which Achar would you like to sample?</label>
              <select name="type" required defaultValue="">
                <option value="" disabled>Select Achar Type</option>
                <option value="Mango Achar">Mango Achar (आम)</option>
                <option value="Mirchi Achar">Mirchi Achar (मिर्च)</option>
                <option value="Adrak Achar">Adrak Achar (अदरक)</option>
                <option value="Amla Achar">Amla Achar (आंवला)</option>
                <option value="Haldi Achar">Haldi Achar (हल्दी)</option>
                <option value="Garlic Achar">Garlic Achar (लहसुन)</option>
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
export const PolicyModal = ({ active, onClose }) => {
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
          <p style={{ marginTop: '15px', fontWeight: 600, color: '#8B0000' }}>Questions? Contact: rajesh.chittaurgarh@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

// 3. Orders Modal (History)
export const OrdersModal = ({ active, onClose, user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (active && user) {
        setLoading(true);
        const q = query(
            collection(db, "orders"), 
            where("uid", "==", user.uid),
            orderBy("timestamp", "desc")
        );
        getDocs(q).then(snap => {
            const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setOrders(data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }
  }, [active, user]);

  if (!active) return null;

  return (
    <div className={`modal-overlay active`} onClick={(e) => { 
        if (e.target.className.includes('modal-overlay')) onClose(); 
    }}>
      <div className="modal-content" style={{ maxWidth: '800px' }}>
        <button className="close-modal" onClick={onClose}>&times;</button>
        <div className="modal-header">
          <span className="modal-icon">📜</span>
          <h2>Your Order History</h2>
        </div>
        <div className="orders-list">
          {loading ? <div className="loading-spinner">Loading your orders...</div> : 
           orders.length === 0 ? <p style={{ textAlign: 'center', padding: '2rem' }}>No orders found.</p> :
           orders.map(order => (
             <div key={order.id} className="order-history-card">
               <div className="order-history-header">
                 <div>
                   <div className="order-history-id">Order ID: #{order.id.slice(0,6)}</div>
                   <div className="order-history-date">{order.timestamp?.toDate().toLocaleDateString()}</div>
                 </div>
                 <div className="order-history-status">{order.status || 'Received'}</div>
               </div>
               <div className="order-history-items">
                 {order.items?.map((item, idx) => (
                   <div key={idx}>{item.name} ({item.size}) x{item.qty}</div>
                 ))}
               </div>
               <div className="order-history-total">Total: ₹{order.total}</div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};
