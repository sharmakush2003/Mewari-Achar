'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('menu'); // 'menu', 'chat', 'contact', 'order', 'checkout'
  const [mounted, setMounted] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Khamma Ghani Hukum! How can I help you today? Would you like to order some pickles or know more about our heritage?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Checkout State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customerDetails, setCustomerDetails] = useState({
    email: '',
    phone: '',
    address: ''
  });

  const scrollRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, view]);

  if (!mounted) return null;

  const products = [
    { id: 1, name: 'Mango Achaar', oldPrice: 449, price: 359 },
    { id: 2, name: 'Ginger (Adrak) Achaar', oldPrice: 629, price: 579 },
    { id: 3, name: 'Mirchi Achaar', oldPrice: 349, price: 299 },
    { id: 4, name: 'Garlic (Lahsun) Achaar', oldPrice: 549, price: 479 },
    { id: 5, name: 'Turmeric (Haldi) Achaar', oldPrice: 459, price: 399 },
    { id: 6, name: 'Amla Achaar', oldPrice: 409, price: 349 }
  ];

  const quickLinks = [
    { label: 'Talk to our Chatbot', type: 'chat' },
    { label: 'Order Something', type: 'order' },
    { label: 'Contact Us', type: 'contact' },
  ];

  const handleWhatsApp = (text) => {
    const url = `https://wa.me/917014102742?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    const subject = "Complaint Regarding Order - Mewari Achaar";
    const body = "Hello Mewari Achaar Team,\n\nI would like to register a complaint regarding my recent experience. Here are the details:\n\nOrder ID (if any):\nIssue:\n\nThank you.";
    window.location.href = `mailto:mewariachar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handlePhone = () => {
    window.location.href = 'tel:+917014102742';
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { role: 'user', content: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatMessages, userMsg] }),
      });
      const data = await response.json();
      if (data.content) {
        setChatMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFinalOrder = (e) => {
    e.preventDefault();
    const { email, phone, address } = customerDetails;
    if (!email || !phone || !address) {
      alert("Please fill in all details, Hukum!");
      return;
    }

    const message = `Hello Mewari Achaar Team! I would like to place an order.
    
*Order Details:*
Product: ${selectedProduct.name}
Price: ₹${selectedProduct.price}/kg

*Customer Details:*
Email: ${email}
Phone: ${phone}
Address: ${address}

Looking forward to the royal taste!`;

    handleWhatsApp(message);
    setIsOpen(false); // Close menu after order
  };

  const handleBack = () => {
    if (view === 'checkout') setView('order');
    else setView('menu');
  };

  return (
    <div className="wa-floating-container">
      {isOpen && (
        <div className={`wa-window ${view !== 'menu' ? 'detail-mode' : ''}`}>
          {/* Header */}
          <div className="wa-header">
             <div className="wa-header-main">
                {view !== 'menu' && (
                  <button className="wa-back-btn" onClick={handleBack}>
                    <i className="fas fa-chevron-left"></i>
                  </button>
                )}
                <div className="wa-avatar">
                  <img src="/favicon.png" alt="Logo" />
                </div>
                <div className="wa-header-text">
                   <h4>Mewari Achaar Support</h4>
                   <span>Traditional Mewari Service</span>
                </div>
             </div>
             <button className="wa-close-top" onClick={() => setIsOpen(false)}>
               <i className="fas fa-times"></i>
             </button>
          </div>

          <div className="wa-window-body">
            {/* Menu View */}
            {view === 'menu' && (
              <div className="wa-menu-body">
                <div className="wa-welcome-msg">
                  Padharo Hukum! What would you like to do today?
                </div>
                <div className="wa-links">
                  {quickLinks.map((link, i) => (
                    <button 
                      key={i} 
                      className="wa-link-btn"
                      onClick={() => setView(link.type)}
                    >
                      {link.label}
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Order View */}
            {view === 'order' && (
              <div className="wa-menu-body">
                <div className="wa-welcome-msg">
                  Select your favorite pickle to order, Hukum:
                </div>
                <div className="wa-links">
                  {products.map((product) => (
                    <button 
                      key={product.id} 
                      className="wa-product-btn"
                      onClick={() => {
                        setSelectedProduct(product);
                        setView('checkout');
                      }}
                    >
                      <div className="wa-prod-info">
                        <span className="wa-prod-name">{product.name}</span>
                        <span className="wa-prod-price">
                          <span className="old-price">₹{product.oldPrice}</span> ₹{product.price}/kg
                        </span>
                      </div>
                      <i className="fas fa-cart-plus"></i>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Checkout View */}
            {view === 'checkout' && (
              <div className="wa-menu-body">
                <div className="wa-checkout-header">
                    <h5>Ordering {selectedProduct?.name}</h5>
                    <p>Please provide your details to proceed:</p>
                </div>
                
                <div className="wa-disclaimer">
                  <i className="fas fa-info-circle"></i>
                  <span>Hukum, please ensure all details are accurate for correct delivery rates and timely arrival. We are not responsible for delays caused by incorrect information.</span>
                </div>

                <form className="wa-checkout-form" onSubmit={handleFinalOrder}>
                  <div className="input-group">
                    <label>Email ID</label>
                    <input 
                      type="email" 
                      required 
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                      placeholder="hukum@example.com"
                    />
                  </div>
                  <div className="input-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                      placeholder="+91 00000 00000"
                    />
                  </div>
                  <div className="input-group">
                    <label>Delivery Address</label>
                    <textarea 
                      required 
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                      placeholder="Full Address with Landmark"
                      rows="2"
                    />
                  </div>
                  <button type="submit" className="wa-submit-btn">
                    Complete Order on WhatsApp <i className="fab fa-whatsapp"></i>
                  </button>
                </form>
              </div>
            )}

            {/* Contact View */}
            {view === 'contact' && (
              <div className="wa-menu-body">
                <div className="wa-welcome-msg">
                  How would you like to reach out to us, Hukum?
                </div>
                <div className="wa-links">
                  <button className="wa-link-btn" onClick={handleEmail}>
                    <span><i className="fas fa-envelope" style={{ marginRight: '10px' }}></i> Contact via Email</span>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                  <button className="wa-link-btn" onClick={handlePhone}>
                    <span><i className="fas fa-phone" style={{ marginRight: '10px' }}></i> Contact via Phone Call</span>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                  <button className="wa-link-btn" onClick={() => handleWhatsApp('Hello! I want to contact the support team via WhatsApp.')}>
                    <span><i className="fab fa-whatsapp" style={{ marginRight: '10px' }}></i> Contact via WhatsApp</span>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Chat View */}
            {view === 'chat' && (
              <div className="wa-chat-body">
                <div className="wa-chat-messages" ref={scrollRef}>
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`msg-bubble ${msg.role}`}>
                      {msg.content}
                    </div>
                  ))}
                  {isTyping && <div className="msg-bubble assistant typing">Hukum is thinking...</div>}
                </div>
                <form className="wa-chat-input" onSubmit={handleSendMessage}>
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <button type="submit">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
      
      <button 
        className={`wa-fab ${isOpen ? 'active' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setView('menu'); // Reset to menu when opening
        }}
        title="WhatsApp Support"
      >
        <i className={isOpen ? "fas fa-times" : "fab fa-whatsapp"}></i>
        {!isOpen && <div className="wa-pulse"></div>}
      </button>

      <style jsx>{`
        .wa-floating-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          font-family: var(--font-main, 'Inter', sans-serif);
        }

        .wa-fab {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #25D366;
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 30px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
        }

        .wa-fab:hover {
          transform: scale(1.1) rotate(10deg);
        }

        .wa-fab.active {
          background: #8B0000;
          box-shadow: 0 10px 30px rgba(139, 0, 0, 0.4);
        }

        .wa-pulse {
          position: absolute;
          inset: 0;
          background: #25D366;
          border-radius: 50%;
          animation: pulse 2s infinite;
          z-index: -1;
          opacity: 0.5;
        }

        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .wa-window {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #fff;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          animation: fullFadeIn 0.4s ease-out;
          box-sizing: border-box;
        }

        .wa-header {
          background: #fff;
          padding: 20px 25px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #000;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          flex-shrink: 0;
        }

        .wa-window-body {
          flex: 1;
          overflow-y: auto;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: radial-gradient(circle at top right, rgba(212, 175, 55, 0.05) 0%, transparent 70%);
          box-sizing: border-box;
        }
        
        .wa-menu-body, .wa-chat-body, .wa-checkout-form {
          width: 100%;
          max-width: 550px;
          margin: 0 auto;
        }

        @keyframes fullFadeIn {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }

        .wa-welcome-msg {
          font-size: 1.5rem;
          margin-bottom: 30px;
          text-align: center;
          color: #2c1810;
          font-family: var(--font-royal, serif);
        }

        .wa-links {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 100%;
        }

        .wa-product-btn {
          padding: 20px 25px;
          border-radius: 18px;
        }

        .wa-disclaimer {
          max-width: 550px;
          width: 100%;
          font-size: 0.85rem;
          padding: 15px 20px;
          margin-bottom: 25px;
        }

        .wa-submit-btn {
          padding: 18px;
          font-size: 1rem;
          margin-top: 15px;
        }

        .wa-header-text h4 {
          font-size: 1.3rem;
          margin: 0;
          font-weight: 700;
        }

        .wa-header-text span {
          font-size: 0.8rem;
          opacity: 0.6;
          display: block;
        }

        .wa-avatar img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }

        .wa-close-top {
          font-size: 1.5rem;
          padding: 5px;
          color: #8B0000;
        }

        .wa-chat-body {
          height: calc(100vh - 120px);
          display: flex;
          flex-direction: column;
        }

        .wa-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .wa-chat-input {
          padding: 20px 0;
          border-top: 1px solid #eee;
          display: flex;
          gap: 10px;
        }

        .wa-chat-input input {
          flex: 1;
          padding: 15px 20px;
          border-radius: 30px;
          border: 1px solid #ddd;
          font-size: 1rem;
        }

        .wa-chat-input button {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          background: #8B0000;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wa-header {
          background: #fff;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #000;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }

        .wa-header-main {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .wa-back-btn, .wa-close-top {
          background: none;
          border: none;
          color: #8B0000;
          cursor: pointer;
          font-size: 0.9rem;
          opacity: 0.8;
          transition: 0.2s;
        }

        .wa-back-btn:hover, .wa-close-top:hover {
          opacity: 1;
          transform: scale(1.1);
        }

        .wa-avatar {
          width: 35px;
          height: 35px;
          background: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .wa-avatar img {
          width: 100%;
          height: auto;
        }

        .wa-header-text h4 {
          margin: 0;
          font-size: 0.85rem;
          font-weight: 700;
          color: #000; /* Overriding global red */
        }

        .wa-header-text span {
          font-size: 0.65rem;
          opacity: 0.8;
          display: block;
          color: #303030;
        }

        .wa-menu-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .wa-welcome-msg {
          font-size: 0.85rem;
          color: #5a4a42;
          font-weight: 500;
          line-height: 1.4;
        }

        .wa-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .wa-link-btn {
          width: 100%;
          padding: 12px 15px;
          background: #f8f9fa;
          border: 1px solid #eee;
          border-radius: 12px;
          font-size: 0.8rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #2c1810;
          font-weight: 700;
        }

        .wa-link-btn:hover {
          background: #fff;
          border-color: #D4AF37;
          box-shadow: 0 5px 15px rgba(212, 175, 55, 0.1);
          transform: translateX(5px);
        }

        .wa-link-btn i {
          font-size: 0.7rem;
          color: #075E54;
        }

        .wa-scroll-links {
          max-height: 250px;
          overflow-y: auto;
          padding-right: 5px;
        }

        .wa-scroll-links::-webkit-scrollbar {
          width: 4px;
        }

        .wa-scroll-links::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 10px;
        }

        .wa-product-btn {
          width: 100%;
          padding: 12px 15px;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 8px;
        }

        .wa-product-btn:hover {
          border-color: #D4AF37;
          background: #faf9f2;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.1);
        }

        .wa-prod-info {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .wa-prod-name {
          font-size: 0.85rem;
          font-weight: 700;
          color: #2c1810;
        }

        .wa-prod-price {
          font-size: 0.75rem;
          color: #8B0000;
          font-weight: 600;
        }

        .wa-disclaimer {
          background: #faf9f2;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 10px;
          padding: 10px 12px;
          margin-bottom: 15px;
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 0.65rem;
          color: #5a4a42;
          line-height: 1.4;
        }

        .wa-disclaimer i {
          color: #D4AF37;
          margin-top: 2px;
        }

        .old-price {
          text-decoration: line-through;
          opacity: 0.5;
          margin-right: 5px;
          font-weight: 400;
        }

        .wa-checkout-header h5 {
          margin: 0 0 5px;
          font-size: 0.95rem;
          color: #8B0000;
        }

        .wa-checkout-header p {
          margin: 0 0 15px;
          font-size: 0.75rem;
          opacity: 0.7;
        }

        .wa-checkout-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .input-group label {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #5a4a42;
        }

        .input-group input, .input-group textarea {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 0.85rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }

        .input-group input:focus, .input-group textarea:focus {
          border-color: #D4AF37;
        }

        .wa-submit-btn {
          margin-top: 5px;
          padding: 12px;
          background: #25D366;
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s;
          box-shadow: 0 4px 15px rgba(37, 211, 102, 0.2);
        }

        .wa-submit-btn:hover {
          background: #128C7E;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(37, 211, 102, 0.3);
        }

        .wa-chat-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #e5ddd5; /* WhatsApp chat bg */
          height: 350px;
        }

        .wa-chat-messages {
          flex: 1;
          padding: 15px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .msg-bubble {
          max-width: 85%;
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 0.8rem;
          line-height: 1.4;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .msg-bubble.assistant {
          align-self: flex-start;
          background: #fff;
          color: #303030;
          border-bottom-left-radius: 2px;
        }

        .msg-bubble.user {
          align-self: flex-end;
          background: #dcf8c6;
          color: #303030;
          border-bottom-right-radius: 2px;
        }

        .msg-bubble.typing {
          font-style: italic;
          opacity: 0.8;
          animation: typingPulse 1.5s infinite;
        }

        @keyframes typingPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .wa-chat-input {
          padding: 10px;
          background: #f0f0f0;
          display: flex;
          gap: 10px;
        }

        .wa-chat-input input {
          flex: 1;
          padding: 8px 15px;
          border: none;
          border-radius: 20px;
          font-size: 0.85rem;
          outline: none;
        }

        .wa-chat-input button {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #075E54;
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: 0.2s;
        }

        .wa-chat-input button:hover {
          transform: scale(1.1);
          background: #128C7E;
        }
      `}</style>
    </div>
  );
}
