'use client';

import React, { useState, useEffect, useRef } from 'react';

import { indiaData } from '../lib/india-data';

export default function WhatsAppFloating() {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('menu'); 
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
    address: '',
    postalCode: '',
    district: '',
    state: '',
    country: 'India',
    customState: '',
    customDistrict: ''
  });

  const [locationData, setLocationData] = useState({
    countries: [],
    states: [],
    cities: [],
    isLoading: false
  });

  useEffect(() => {
    const fetchCountries = async () => {
      setLocationData(prev => ({ ...prev, isLoading: true }));
      try {
        const res = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/countries.json');
        const data = await res.json();
        setLocationData(prev => ({ ...prev, countries: data, isLoading: false }));
      } catch (err) {
        console.error("Location fetch error:", err);
        setLocationData(prev => ({ ...prev, isLoading: false }));
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = async (countryCode) => {
    const country = locationData.countries.find(c => c.iso2 === countryCode);
    setCustomerDetails(prev => ({ ...prev, country: country.name, state: '', district: '' }));
    setLocationData(prev => ({ ...prev, isLoading: true }));
    
    try {
      const res = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/states.json');
      const allStates = await res.json();
      const filteredStates = allStates.filter(s => s.country_code === countryCode);
      setLocationData(prev => ({ ...prev, states: filteredStates, cities: [], isLoading: false }));
    } catch (err) {
      console.error("State fetch error:", err);
      setLocationData(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleStateChange = async (stateCode) => {
    const state = locationData.states.find(s => s.state_code === stateCode);
    setCustomerDetails(prev => ({ ...prev, state: state.name, district: '' }));
    setLocationData(prev => ({ ...prev, isLoading: true }));

    try {
      const res = await fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/json/cities.json');
      const allCities = await res.json();
      const filteredCities = allCities.filter(c => c.state_code === stateCode && c.country_code === locationData.states[0].country_code);
      setLocationData(prev => ({ ...prev, cities: filteredCities, isLoading: false }));
    } catch (err) {
      console.error("City fetch error:", err);
      setLocationData(prev => ({ ...prev, isLoading: false }));
    }
  };

  const [callbackDetails, setCallbackDetails] = useState({
    phone: '',
    date: '',
    time: ''
  });

  // Original Searchable Select (Restored - No Arrow for perfect symmetry)
  const SearchableSelect = ({ options, value, onChange, label, placeholder, disabled }) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filtered = options.filter(opt => 
      (opt.name || opt).toLowerCase().includes(search.toLowerCase())
    ).slice(0, 50);

    return (
      <div className={`input-group ${disabled ? 'disabled' : ''}`} ref={dropdownRef}>
        <label>{label}</label>
        <div className="search-select-box" onClick={() => !disabled && setIsOpen(!isOpen)}>
          <input 
            type="text" 
            placeholder={placeholder} 
            value={isOpen ? search : (value || '')} 
            onChange={(e) => setSearch(e.target.value)}
            disabled={disabled}
            onFocus={() => setIsOpen(true)}
            className="search-inner-input"
          />
        </div>
        
        {isOpen && !disabled && (
          <div className="search-dropdown">
            {filtered.length > 0 ? filtered.map((opt, i) => (
              <div 
                key={i} 
                className="search-option"
                onClick={() => {
                  onChange(opt.iso2 || opt.state_code || opt.name || opt);
                  setSearch('');
                  setIsOpen(false);
                }}
              >
                {opt.emoji && <span style={{marginRight: '8px'}}>{opt.emoji}</span>}
                <span>{opt.name || opt}</span>
              </div>
            )) : (
              <div className="no-results">No matches found.</div>
            )}
            <div className="search-option manual" onClick={() => { onChange('Others'); setIsOpen(false); }}>
              Other (Manual Entry)
            </div>
          </div>
        )}
      </div>
    );
  };

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
    { id: 1, name: 'Mango Achaar', oldPrice: 449, price: 359, price500g: 180, image: '/Images/Mango Achar.jpg' },
    { id: 2, name: 'Ginger (Adrak) Achaar', oldPrice: 629, price: 579, price500g: 290, image: '/Images/Adrak Achar.jpg' },
    { id: 3, name: 'Mirchi Achaar', oldPrice: 349, price: 299, price500g: 150, image: '/Images/Mirchi Achar.jpg' },
    { id: 4, name: 'Garlic (Lahsun) Achaar', oldPrice: 549, price: 479, price500g: 240, image: '/Images/Yellow_Garlic_Achaar.jpg' },
    { id: 5, name: 'Turmeric (Haldi) Achaar', oldPrice: 459, price: 399, price500g: 200, image: '/Images/Haldi Achar.jpg' },
    { id: 6, name: 'Amla Achaar', oldPrice: 409, price: 349, price500g: 175, image: '/Images/Amla Achar.jpg' }
  ];

  const handleWhatsApp = (text) => {
    const url = `https://wa.me/917014102742?text=${encodeURIComponent(text || 'Khamma Ghani Hukum! I would like to know more about Mewari Achaar.')}`;
    window.open(url, '_blank');
  };

  const phoneUrl = 'tel:+917014102742';

  const handleCallbackSubmit = (e) => {
    e.preventDefault();
    const { phone, date, time } = callbackDetails;
    const message = `Khamma Ghani Hukum! I would like to request a callback.
    
*Details:*
Phone: +91 ${phone}
Date: ${date}
Preferred Time: ${time}

Looking forward to hearing from you!`;
    handleWhatsApp(message);
    setIsOpen(false);
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
    const { email, phone, address, postalCode, district, state, customState, customDistrict } = customerDetails;
    
    if (!email && !phone) {
      alert("Hukum, please provide at least an Email or Phone number to proceed!");
      return;
    }

    const finalState = state === 'Others' ? customState : state;
    const finalDistrict = district === 'Others' ? customDistrict : district;

    const message = `Hello Mewari Achaar Team! I would like to place an order.
    
*Order Details:*
Product: ${selectedProduct.name}
Price: ₹${selectedProduct.price}/kg

*Delivery Details:*
Email: ${email || 'Not provided'}
Phone: +91 ${phone}
Address: ${address}
Postal Code: ${postalCode}
District: ${finalDistrict}
State: ${finalState}
Country: ${customerDetails.country}

Looking forward to the royal taste!`;

    handleWhatsApp(message);
    setIsOpen(false);
  };

  const handleBack = () => {
    if (view === 'checkout') setView('order');
    else setView('menu');
  };

  const selectedStateData = indiaData.states.find(s => s.state === customerDetails.state);
  const districts = selectedStateData ? selectedStateData.districts : [];

  return (
    <div className="wa-floating-container">
      {isOpen && (
        <div className="wa-window">
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
                   <h4 style={{ color: '#8B0000', margin: 0 }}>Mewari Achaar Support</h4>
                   <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>Traditional Mewari Service</span>
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
                <h3 className="wa-welcome-msg">Khamma Ghani Hukum! 🙏</h3>
                <div className="wa-links">
                  <button className="wa-link-btn" onClick={() => setView('order')}>
                    <span>🛍️ Order Something</span>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                  <button className="wa-link-btn" onClick={() => setView('chat')}>
                    <span>💬 Chat with our Bot</span>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                  <button className="wa-link-btn" onClick={() => setView('contact')}>
                    <span>📞 Contact Team</span>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Order Selection */}
            {view === 'order' && (
              <div className="wa-menu-body">
                <div className="wa-disclaimer">
                  <i className="fas fa-info-circle"></i>
                  <span>Select your favorite pickle to order, Hukum:</span>
                </div>
                <div className="wa-product-list-compact">
                  {products.map(product => (
                    <button 
                      key={product.id} 
                      className="wa-product-card-compact"
                      onClick={() => {
                        setSelectedProduct(product);
                        setView('checkout');
                      }}
                    >
                      <div className="wa-prod-main-compact">
                        <div className="wa-prod-img-box-compact">
                          <img src={product.image} alt={product.name} />
                        </div>
                        <div className="wa-prod-info-compact">
                          <span className="wa-prod-name-compact">{product.name}</span>
                          <div className="wa-prod-prices-compact">
                             <span className="wa-price-500g">500g: ₹{product.price500g}</span>
                             <span className="wa-price-1kg">1kg: ₹{product.price}</span>
                          </div>
                        </div>
                      </div>
                      <i className="fas fa-chevron-right wa-chevron"></i>
                    </button>
                  ))}
                  
                  {/* Custom Achaar Option */}
                  <button 
                    className="wa-product-card-compact custom-option"
                    onClick={() => {
                      setSelectedProduct({ name: 'Custom Achaar Blend', price: 'Bulk Rates', price500g: 'N/A' });
                      setView('checkout');
                    }}
                  >
                    <div className="wa-prod-main-compact">
                      <div className="wa-prod-img-box-compact custom">
                        <i className="fas fa-mortar-pestle"></i>
                      </div>
                      <div className="wa-prod-info-compact">
                        <span className="wa-prod-name-compact">Custom Achaar Blend</span>
                        <span className="wa-prod-desc-compact">Hukum, tell us your preferred recipe!</span>
                      </div>
                    </div>
                    <i className="fas fa-chevron-right wa-chevron"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Checkout View */}
            {view === 'checkout' && (
              <div className="wa-menu-body">
                <div className="wa-checkout-header">
                    <h5>Order Details</h5>
                    <p>Hukum, please provide the delivery details for your royal parcel:</p>
                    {locationData.isLoading && <div className="wa-loading-small">Loading Location Data...</div>}
                </div>
                
                <form className="wa-checkout-form" onSubmit={handleFinalOrder}>
                  {/* EMAIL ID */}
                  <div className="input-group">
                    <label>EMAIL ID</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="hukum@example.com"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                    />
                  </div>

                  {/* PHONE NUMBER */}
                  <div className="input-group">
                    <label>PHONE NUMBER</label>
                    <div className="phone-wrapper">
                      <span className="prefix">+91</span>
                      <input 
                        type="tel" 
                        required 
                        placeholder="00000 00000"
                        value={customerDetails.phone}
                        onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* COUNTRY */}
                  <SearchableSelect 
                    label="COUNTRY"
                    placeholder="Select Country"
                    options={locationData.countries}
                    value={customerDetails.country}
                    onChange={(val) => val === 'Others' ? setCustomerDetails({...customerDetails, country: 'Others', state: '', district: ''}) : handleCountryChange(val)}
                  />

                  {/* STATE */}
                  <SearchableSelect 
                    label="STATE"
                    placeholder="Search State"
                    disabled={!customerDetails.country || customerDetails.country === 'Others'}
                    options={locationData.states}
                    value={customerDetails.state}
                    onChange={(val) => val === 'Others' ? setCustomerDetails({...customerDetails, state: 'Others', district: ''}) : handleStateChange(val)}
                  />

                  {/* DISTRICT */}
                  <SearchableSelect 
                    label="DISTRICT"
                    placeholder="Search District"
                    disabled={!customerDetails.state || customerDetails.state === 'Others'}
                    options={locationData.cities}
                    value={customerDetails.district}
                    onChange={(val) => setCustomerDetails({...customerDetails, district: val})}
                  />

                  {/* DELIVERY ADDRESS */}
                  <div className="input-group">
                    <label>DELIVERY ADDRESS</label>
                    <textarea 
                      required 
                      rows="2"
                      placeholder="Full Address with Landmark"
                      value={customerDetails.address}
                      onChange={(e) => setCustomerDetails({...customerDetails, address: e.target.value})}
                    ></textarea>
                  </div>

                  {/* PIN CODE */}
                  <div className="input-group">
                    <label>PIN CODE</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="313001"
                      value={customerDetails.pinCode}
                      onChange={(e) => setCustomerDetails({...customerDetails, pinCode: e.target.value})}
                    />
                  </div>

                  <div className="wa-info-bar">
                    <i className="fas fa-info-circle"></i>
                    <span>Hukum, please ensure all details are accurate for correct delivery rates and timely arrival. We are not responsible for delays caused by incorrect information.</span>
                  </div>

                  <button type="submit" className="wa-complete-btn">
                    Complete Order on WhatsApp <i className="fab fa-whatsapp"></i>
                  </button>
                </form>
              </div>
            )}

            {/* Contact View */}
            {view === 'contact' && (
              <div className="wa-menu-body">
                <div className="wa-welcome-msg">How would you like to reach out to us, Hukum?</div>
                <div className="wa-links">
                  <button className="wa-link-btn" onClick={() => setView('callback')}>
                    <span><i className="fas fa-headset" style={{ color: '#E1306C', marginRight: '10px' }}></i> Request a Callback</span>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                  <a href={phoneUrl} className="wa-link-btn" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <span><i className="fas fa-phone" style={{ color: '#34a853', marginRight: '10px' }}></i> Phone Call</span>
                    <i className="fas fa-chevron-right"></i>
                  </a>
                  <button className="wa-link-btn" onClick={() => handleWhatsApp('Hello!')}>
                    <span><i className="fab fa-whatsapp" style={{ color: '#25D366', marginRight: '10px' }}></i> WhatsApp</span>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Callback View */}
            {view === 'callback' && (
              <div className="wa-menu-body">
                <div className="wa-checkout-header">
                    <h5>Request a Callback</h5>
                    <p>Hukum, please let us know when to call you:</p>
                </div>
                
                <form className="wa-checkout-form" onSubmit={handleCallbackSubmit}>
                  <div className="input-group">
                    <label>Phone Number</label>
                    <div className="phone-input-wrapper">
                      <span className="phone-prefix">+91</span>
                      <input 
                        type="tel" 
                        required
                        value={callbackDetails.phone}
                        onChange={(e) => setCallbackDetails({...callbackDetails, phone: e.target.value.replace(/\D/g,'')})}
                        placeholder="00000 00000" 
                      />
                    </div>
                  </div>

                  <div className="wa-form-row">
                    <div className="input-group">
                      <label>Preferred Date</label>
                      <input 
                        type="date" 
                        required 
                        min={new Date().toISOString().split('T')[0]}
                        value={callbackDetails.date}
                        onChange={(e) => setCallbackDetails({...callbackDetails, date: e.target.value})}
                      />
                    </div>
                    <div className="input-group">
                      <label>Preferred Time</label>
                      <input 
                        type="time" 
                        required 
                        value={callbackDetails.time}
                        onChange={(e) => setCallbackDetails({...callbackDetails, time: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="wa-disclaimer">
                    <i className="fas fa-info-circle"></i>
                    <span>Our team will contact you on your preferred time.</span>
                  </div>

                  <button type="submit" className="wa-submit-btn">
                    Request via WhatsApp <i className="fab fa-whatsapp"></i>
                  </button>
                </form>
              </div>
            )}
            {view === 'chat' && (
              <div className="wa-chat-body">
                <div className="wa-chat-messages" ref={scrollRef}>
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`msg-bubble ${msg.role}`}>
                      <div className="msg-text">{msg.content.split('[ORDER:').map((part, index) => {
                        if (index === 0) return part;
                        const [productName, ...rest] = part.split(']');
                        const product = products.find(p => p.name.includes(productName) || productName.includes(p.name));
                        return (
                          <React.Fragment key={index}>
                            <div className="chat-order-card">
                              {product && (
                                <div className="chat-prod-img-box">
                                  <img 
                                    src={product.image} 
                                    alt={productName} 
                                    className="chat-prod-img" 
                                    style={{ objectFit: 'cover' }}
                                  />
                                </div>
                              )}
                              <div className="chat-order-cta">
                                <button 
                                  className="chat-order-btn"
                                  onClick={() => {
                                    if (product) {
                                      setSelectedProduct(product);
                                      setView('checkout');
                                    } else {
                                      setView('order');
                                    }
                                  }}
                                >
                                  <i className="fab fa-whatsapp"></i> Order {productName} Now
                                </button>
                              </div>
                            </div>
                            {rest.join(']')}
                          </React.Fragment>
                        );
                      })}</div>
                    </div>
                  ))}
                  {isTyping && <div className="msg-bubble assistant typing">Hukum is thinking...</div>}
                </div>
                <form className="wa-chat-input" onSubmit={handleSendMessage}>
                  <input type="text" placeholder="Type your message..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} />
                  <button type="submit"><i className="fas fa-paper-plane"></i></button>
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
          if (!isOpen) setView('menu'); 
        }}
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
          transition: all 0.3s;
          position: relative;
        }

        .wa-fab.active {
          background: #8B0000;
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
          box-sizing: border-box;
        }

        .wa-header {
          background: #fff;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
        }

        .wa-header-main {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .wa-avatar {
          width: 40px;
          height: 40px;
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

        .wa-back-btn, .wa-close-top {
          background: none;
          border: none;
          color: #8B0000;
          cursor: pointer;
          font-size: 1.1rem;
        }

        .wa-window-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fdfbf7;
        }
        
        .wa-menu-body {
          width: 100%;
          max-width: 550px;
        }

        .wa-welcome-msg {
          font-size: 1.3rem;
          margin-bottom: 25px;
          text-align: center;
          color: #2c1810;
          font-family: var(--font-royal, serif);
        }

        .wa-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .wa-link-btn {
          width: 100%;
          padding: 18px;
          background: #fff;
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 12px;
          font-size: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: 0.2s;
        }

        .wa-link-btn:hover {
          border-color: #D4AF37;
          transform: translateX(5px);
          background: #faf9f2;
        }

        .wa-product-list-compact {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }

        .wa-product-card-compact {
          width: 100%;
          background: #fff;
          border: 1px solid rgba(212, 175, 55, 0.15);
          border-radius: 12px;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .wa-product-card-compact:hover {
          border-color: #D4AF37;
          background: #faf9f2;
          transform: translateX(5px);
        }

        .wa-product-card-compact.custom-option {
          border-style: dashed;
          background: #fdfbf7;
        }

        .wa-prod-main-compact {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .wa-prod-img-box-compact {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          overflow: hidden;
          background: #f8f8f8;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wa-prod-img-box-compact.custom {
          background: #faf9f2;
          color: #8B0000;
          font-size: 1.5rem;
          border: 1px solid rgba(139, 0, 0, 0.1);
        }

        .wa-prod-img-box-compact img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .wa-prod-info-compact {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .wa-prod-name-compact {
          font-weight: 700;
          color: #2c1810;
          font-size: 0.95rem;
        }

        .wa-prod-prices-compact {
          display: flex;
          gap: 12px;
          margin-top: 4px;
        }

        .wa-price-500g, .wa-price-1kg {
          font-size: 0.75rem;
          font-weight: 600;
          color: #8B0000;
        }

        .wa-price-1kg {
          color: #5a4a42;
          opacity: 0.8;
        }

        .wa-prod-desc-compact {
          font-size: 0.7rem;
          color: #5a4a42;
          opacity: 0.7;
        }

        .wa-chevron {
          color: #D4AF37;
          font-size: 0.8rem;
          opacity: 0.5;
        }

        .wa-chat-body {
          width: 100%;
          max-width: 550px;
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

        .msg-bubble {
          max-width: 85%;
          padding: 12px 18px;
          border-radius: 15px;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .msg-bubble.assistant {
          align-self: flex-start;
          background: #fff;
          border: 1px solid rgba(212, 175, 55, 0.2);
        }

        .msg-bubble.user {
          align-self: flex-end;
          background: #8B0000;
          color: #fff;
        }

        .chat-order-card {
          margin-top: 12px;
          background: #fff;
          border: 1px solid rgba(212, 175, 55, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        .chat-prod-img-box {
          height: 120px;
          background: #f8f8f8;
        }

        .chat-prod-img {
          width: 100%;
          height: 100%;
        }

        .chat-order-cta {
          padding: 10px;
          background: #faf9f2;
        }

        .chat-order-btn {
          width: 100%;
          background: #25D366;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
        }

        .wa-chat-input {
          padding: 15px 0;
          display: flex;
          gap: 10px;
        }

        .wa-chat-input input {
          flex: 1;
          padding: 12px 20px;
          border-radius: 25px;
          border: 1px solid #ddd;
          outline: none;
        }

        .wa-chat-input button {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: #8B0000;
          color: white;
          border: none;
          cursor: pointer;
        }

        .wa-submit-btn {
          padding: 15px;
          background: #25D366;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
          margin-top: 10px;
        }

        .wa-disclaimer {
          background: #faf9f2;
          padding: 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          color: #5a4a42;
          margin-bottom: 15px;
          display: flex;
          gap: 10px;
        }
        .req {
          color: #8B0000;
          margin-left: 4px;
        }

        .wa-loading-small {
          font-size: 0.7rem;
          color: #8B0000;
          font-weight: 700;
          margin-top: 10px;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        /* RESTORING ORIGINAL MEWARI CSS */
        .wa-checkout-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 10px 0;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .input-group label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #000;
          text-transform: uppercase;
        }

        .input-group input, 
        .input-group select, 
        .input-group textarea, 
        .search-select-box {
          width: 100%;
          height: 48px;
          padding: 0 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 0.95rem;
          outline: none;
          background: #fff;
          box-sizing: border-box;
          font-family: inherit;
        }

        .input-group textarea {
          height: auto;
          padding: 12px 15px;
        }

        .search-select-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .search-inner-input {
          border: none !important;
          padding: 0 !important;
          margin: 0 !important;
          height: 100% !important;
          width: 100% !important;
          background: transparent !important;
          outline: none !important;
          font-size: 0.95rem !important;
          font-family: inherit !important;
        }

        .phone-wrapper {
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: #fff;
          height: 48px;
          box-sizing: border-box;
        }

        .phone-wrapper .prefix {
          padding: 0 12px;
          font-weight: 700;
          color: #555;
          background: #f9f9f9;
          border-right: 1px solid #ddd;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .phone-wrapper input {
          border: none !important;
        }

        .wa-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .search-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #fff;
          border: 1px solid #ddd;
          border-top: none;
          border-radius: 0 0 8px 8px;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .search-option {
          padding: 10px 15px;
          cursor: pointer;
          font-size: 0.9rem;
          border-bottom: 1px solid #f8f8f8;
        }

        .search-option:hover {
          background: #f8f8f8;
          color: #8B0000;
        }

        .wa-info-bar {
          background: #faf9f2;
          padding: 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          color: #666;
          display: flex;
          gap: 10px;
          line-height: 1.4;
        }

        .wa-complete-btn {
          width: 100%;
          padding: 15px;
          background: #25D366;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        @media (max-width: 480px) {
          .wa-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
