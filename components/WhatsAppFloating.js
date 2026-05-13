'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { indiaData } from '../lib/india-data';

export default function WhatsAppFloating() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState('menu'); 
  const [sampleData, setSampleData] = useState({ phone: '', address: '', type: '' });
  const [mounted, setMounted] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Khamma Ghani Hukum! How can I help you today? Would you like to order some pickles or know more about our heritage?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Checkout State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    pinCode: '',
    country: 'India',
    state: '',
    district: '',
    customState: '',
    customDistrict: '',
    // Customization fields
    mainIngredient: 'Mango',
    spiceLevel: 'Medium',
    oilType: 'Mustard Oil',
    specialNote: ''
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

  useEffect(() => {
    const handleTrigger = (e) => {
      setIsOpen(true);
      if (e.detail) setView(e.detail);
    };
    const handleExternal = () => {
      setIsOpen(true);
      setView('sample');
    };
    window.addEventListener('wa-trigger-view', handleTrigger);
    window.addEventListener('open-wa-sample', handleExternal);
    return () => {
      window.removeEventListener('wa-trigger-view', handleTrigger);
      window.removeEventListener('open-wa-sample', handleExternal);
    };
  }, []);

  const products = [
    { id: 1, name: 'Mango Achaar', oldPrice: 449, price: 359, price500g: 180, image: '/Images/Mango Achar.jpg' },
    { id: 2, name: 'Ginger (Adrak) Achaar', oldPrice: 629, price: 579, price500g: 290, image: '/Images/Adrak Achar.jpg' },
    { id: 3, name: 'Mirchi Achaar', oldPrice: 349, price: 299, price500g: 150, image: '/Images/Mirchi Achar.jpg' },
    { id: 4, name: 'Garlic (Lahsun) Achaar', oldPrice: 549, price: 479, price500g: 240, image: '/Images/Yellow_Garlic_Achaar.jpg' },
    { id: 5, name: 'Turmeric (Haldi) Achaar', oldPrice: 459, price: 399, price500g: 200, image: '/Images/Haldi Achar.jpg' },
    { id: 6, name: 'Amla Achaar', oldPrice: 409, price: 349, price500g: 175, image: '/Images/Amla Achar.jpg' },
    { id: 'custom', name: 'Custom Achaar Blend', oldPrice: 0, price: 'Variable', price500g: 'N/A', image: '/Images/CustomBlend.png' }
  ];

  // Handlers
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
    const { email, phone, address, pinCode, district, state, customState, customDistrict } = customerDetails;
    
    if (!email && !phone) {
      alert("Hukum, please provide at least an Email or Phone number to proceed!");
      return;
    }

    const finalState = state === 'Others' ? customState : state;
    const finalDistrict = district === 'Others' ? customDistrict : district;
    const price = selectedProduct.price;
    const selectedSize = "1kg";
    const spiceDetails = selectedProduct.id === 'custom' ? 
      `\n*Custom Blend Details:* \n- Main Ingredient: ${customerDetails.mainIngredient}\n- Spice Level: ${customerDetails.spiceLevel}\n- Oil Type: ${customerDetails.oilType}\n- Note: ${customerDetails.specialNote}` : '';

    const message = `Hello Mewari Achaar Team! I would like to place an order.
    
*Order Details:*
Product: ${selectedProduct.name}${spiceDetails}
Price: ₹${price}

*Delivery Details:*
Email: ${email || 'Not provided'}
Phone: +91 ${phone}
Address: ${address}
Postal Code: ${pinCode}
District: ${finalDistrict}
State: ${finalState}
Country: ${customerDetails.country}

Looking forward to the royal taste!`;

    handleWhatsApp(message);
    setIsOpen(false);
  };

  const handleBack = () => {
    if (view === 'checkout') {
      if (selectedProduct.id === 'custom' && currentStep === 2) {
        setCurrentStep(1);
      } else {
        setView('order');
      }
    }
    else setView('menu');
  };

  if (!mounted) return null;

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
                  <button className="wa-link-btn" onClick={() => setView('sample')} style={{ border: '2px solid #D4AF37', background: 'rgba(212, 175, 55, 0.05)', borderRadius: '12px', marginBottom: '15px' }}>
                    <span style={{ color: '#8B0000', fontWeight: '800' }}>🎁 Get a Free Sample</span>
                    <i className="fas fa-chevron-right" style={{ color: '#D4AF37' }}></i>
                  </button>

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
                  <button className="wa-link-btn" onClick={() => { window.open('/login', '_blank'); }}>
                    <span>🔐 Login to Account</span>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                  <button className="wa-link-btn" onClick={() => { window.open('/signup', '_blank'); }}>
                    <span>✍️ Register (New Customer)</span>
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
            )}

            {/* Sample View */}
            {view === 'sample' && (
              <div className="wa-menu-body">
                <div className="wa-section-header" style={{ textAlign: 'center', padding: '10px 0 20px' }}>
                  <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '5px' }}>🎁</span>
                  <h3 style={{ fontFamily: 'var(--font-devanagari)', color: '#8B0000', fontSize: '1.4rem', margin: 0 }}>मुफ्त सैंपल मंगवाएं</h3>
                  <p style={{ fontSize: '0.65rem', color: '#D4AF37', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>Royal Taste At Your Doorstep</p>
                </div>

                <div className="wa-form-container" style={{ padding: '0 5px' }}>
                  <p style={{ fontSize: '0.75rem', color: '#8B0000', textAlign: 'center', marginBottom: '20px', fontWeight: '600', padding: '12px', background: 'rgba(139, 0, 0, 0.05)', borderRadius: '10px', lineHeight: '1.4', fontFamily: 'var(--font-devanagari)' }}>
                    *हुकुम, सैंपल मुफ्त है, लेकिन दूरी के अनुसार डिलीवरी शुल्क लागू होगा।
                  </p>

                  <div className="wa-input-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '800', color: '#5a4a42', marginBottom: '8px', textTransform: 'uppercase' }}>आपका फोन नंबर</label>
                    <div style={{ display: 'flex', border: '1px solid rgba(139, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden', background: '#fdfdfa' }}>
                      <span style={{ padding: '12px', background: 'rgba(139, 0, 0, 0.02)', borderRight: '1px solid rgba(139, 0, 0, 0.1)', color: '#8B0000', fontWeight: '700', fontSize: '0.85rem' }}>+91</span>
                      <input 
                        type="tel" 
                        placeholder="00000 00000" 
                        style={{ flex: 1, border: 'none', padding: '12px', outline: 'none', background: 'none', fontSize: '0.9rem' }}
                        value={sampleData.phone}
                        onChange={(e) => setSampleData({...sampleData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="wa-input-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '800', color: '#5a4a42', marginBottom: '8px', textTransform: 'uppercase' }}>पूरा पता (पिनकोड के साथ)</label>
                    <textarea 
                      placeholder="अपना पूरा पता यहाँ लिखें..." 
                      style={{ width: '100%', padding: '12px', border: '1px solid rgba(139, 0, 0, 0.1)', borderRadius: '10px', outline: 'none', minHeight: '70px', background: '#fdfdfa', fontSize: '0.9rem', fontFamily: 'inherit' }}
                      value={sampleData.address}
                      onChange={(e) => setSampleData({...sampleData, address: e.target.value})}
                    />
                  </div>

                  <div className="wa-input-group" style={{ marginBottom: '25px' }}>
                    <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: '800', color: '#5a4a42', marginBottom: '8px', textTransform: 'uppercase' }}>अचार का प्रकार चुनें</label>
                    <select 
                      style={{ width: '100%', padding: '12px', border: '1px solid rgba(139, 0, 0, 0.1)', borderRadius: '10px', outline: 'none', background: '#fdfdfa', fontSize: '0.9rem' }}
                      value={sampleData.type}
                      onChange={(e) => setSampleData({...sampleData, type: e.target.value})}
                    >
                      <option value="">अचार चुनें...</option>
                      <option value="Mango Achaar">आम का अचार (Mango)</option>
                      <option value="Mirchi Achaar">मिर्च का अचार (Mirchi)</option>
                      <option value="Adrak Achaar">अदरक का अचार (Ginger)</option>
                      <option value="Amla Achaar">आंवला का अचार (Amla)</option>
                      <option value="Haldi Achaar">हल्दी का अचार (Turmeric)</option>
                      <option value="Garlic Achaar">लहसुन का अचार (Garlic)</option>
                    </select>
                  </div>

                  <button 
                    className="wa-final-btn"
                    style={{ 
                      width: '100%', 
                      padding: '16px', 
                      background: 'linear-gradient(135deg, #8B0000 0%, #a50000 100%)', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '12px', 
                      fontWeight: '800',
                      cursor: 'pointer',
                      boxShadow: '0 10px 25px rgba(139, 0, 0, 0.25)',
                      fontSize: '0.9rem'
                    }}
                    onClick={() => {
                      if (!sampleData.phone || !sampleData.address || !sampleData.type) {
                        alert('कृपया सभी जानकारी भरें।');
                        return;
                      }
                      const message = `Khamma Ghani Hukum! I would like to request a Free Sample.
Type: ${sampleData.type}
Phone: +91 ${sampleData.phone}
Address: ${sampleData.address}`;
                      handleWhatsApp(message);
                    }}
                  >
                    व्हाट्सएप पर सैंपल मंगवाएं <i className="fab fa-whatsapp" style={{ marginLeft: '8px' }}></i>
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
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: '#8B0000', 
                  background: 'rgba(212, 175, 55, 0.1)', 
                  padding: '10px 15px', 
                  borderRadius: '8px',
                  marginBottom: '15px',
                  fontFamily: 'var(--font-devanagari)',
                  fontWeight: '600',
                  textAlign: 'center',
                  border: '1px dashed rgba(212, 175, 55, 0.3)'
                }}>
                  🚩 हुकुम, बल्क (थोक) आर्डर के लिए कृपया हमें व्हाट्सएप (+91 70141 02742) पर संपर्क करें।
                </p>
                <div className="wa-product-list-compact">
                  {products.map(product => (
                    <button 
                      key={product.id} 
                      className="wa-product-card-compact"
                      onClick={() => {
                        setSelectedProduct(product);
                        setCurrentStep(product.id === 'custom' ? 1 : 2);
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
                </div>
              </div>
            )}

            {/* Checkout View */}
            {view === 'checkout' && (
              <div className="wa-menu-body">
                <div className="wa-checkout-header">
                  <h3>{selectedProduct.id === 'custom' && currentStep === 1 ? 'Craft Your Blend' : 'Delivery Details'}</h3>
                  <p>{selectedProduct.id === 'custom' && currentStep === 1 ? 'Hukum, tell us your taste preferences:' : 'Please provide the delivery details for your royal parcel:'}</p>
                </div>
                
                <div className="wa-location-loader">
                    {locationData.isLoading && <div className="wa-loading-small">Loading Location Data...</div>}
                </div>
                
                {selectedProduct.id === 'custom' && currentStep === 1 ? (
                  <form className="wa-checkout-form" onSubmit={(e) => { e.preventDefault(); setCurrentStep(2); }}>
                    {/* Main Ingredient */}
                    <div className="input-group">
                      <label>MAIN INGREDIENT</label>
                      <select 
                        className="wa-select-native"
                        value={customerDetails.mainIngredient}
                        onChange={(e) => setCustomerDetails({...customerDetails, mainIngredient: e.target.value})}
                      >
                        <option value="Mango">Traditional Mango (Aam)</option>
                        <option value="Garlic">Royal Garlic (Lahsun)</option>
                        <option value="Chilli">Green/Red Chilli (Mirch)</option>
                        <option value="Lemon">Tangy Lemon (Nimbu)</option>
                        <option value="Mixed">Mewari Mixed</option>
                        <option value="Other">Something Else (Mention in notes)</option>
                      </select>
                    </div>

                    {/* Spice Level */}
                    <div className="input-group">
                      <label>SPICE LEVEL</label>
                      <select 
                        className="wa-select-native"
                        value={customerDetails.spiceLevel}
                        onChange={(e) => setCustomerDetails({...customerDetails, spiceLevel: e.target.value})}
                      >
                        <option value="Mild">Mild (Low Spice)</option>
                        <option value="Medium">Medium (Balanced)</option>
                        <option value="Royal Spicy">Royal Spicy (Teekha)</option>
                      </select>
                    </div>

                    {/* Oil Type */}
                    <div className="input-group">
                      <label>OIL PREFERENCE</label>
                      <select 
                        className="wa-select-native"
                        value={customerDetails.oilType}
                        onChange={(e) => setCustomerDetails({...customerDetails, oilType: e.target.value})}
                      >
                        <option value="Mustard Oil">Traditional Mustard Oil</option>
                        <option value="Groundnut Oil">Refined Groundnut Oil</option>
                        <option value="Olive Oil">Healthy Olive Oil</option>
                      </select>
                    </div>

                    {/* Special Notes */}
                    <div className="input-group">
                      <label>SPECIAL REQUESTS / NOTES</label>
                      <textarea 
                        rows="3"
                        placeholder="e.g., Less salt, extra methi, or specific grandmother recipe style..."
                        value={customerDetails.specialNote}
                        onChange={(e) => setCustomerDetails({...customerDetails, specialNote: e.target.value})}
                      ></textarea>
                    </div>

                    <button type="submit" className="wa-complete-btn">
                      Proceed to Delivery Details <i className="fas fa-arrow-right"></i>
                    </button>
                  </form>
                ) : (
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
                )}
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
          height: 100dvh;
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
          overflow: hidden;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background: #fdfbf7;
        }
        
        .wa-menu-body {
          width: 100%;
          max-width: 550px;
          overflow-y: auto;
          max-height: 100%;
          padding-bottom: 20px;
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
          background: #fff;
          border: 1px solid #eee;
          padding: 18px 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: 0.3s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
          font-size: 1rem;
          width: 100%;
          font-family: inherit;
        }

        .wa-link-btn:hover {
          border-color: #8B0000;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(139, 0, 0, 0.08);
        }

        .wa-link-btn i.fa-chevron-right {
          font-size: 0.8rem;
          opacity: 0.3;
        }

        .wa-disclaimer {
          background: #fff;
          border: 1px solid #faf9f2;
          padding: 12px 15px;
          border-radius: 10px;
          font-size: 0.85rem;
          color: #666;
          margin-bottom: 20px;
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .wa-disclaimer i {
          color: #D4AF37;
        }

        .wa-product-list-compact {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .wa-product-card-compact {
          background: #fff;
          border: 1px solid #eee;
          padding: 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: 0.2s;
          width: 100%;
          text-align: left;
        }

        .wa-product-card-compact:hover {
          border-color: #8B0000;
          background: #fdfbf7;
        }

        .wa-prod-main-compact {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .wa-prod-img-box-compact {
          width: 50px;
          height: 50px;
          border-radius: 8px;
          overflow: hidden;
          background: #f9f9f9;
        }

        .wa-prod-img-box-compact img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .wa-prod-info-compact {
          display: flex;
          flex-direction: column;
        }

        .wa-prod-name-compact {
          font-weight: 700;
          color: #2c1810;
          font-size: 0.95rem;
        }

        .wa-prod-prices-compact {
          display: flex;
          gap: 10px;
          font-size: 0.75rem;
          margin-top: 2px;
        }

        .wa-price-500g { color: #666; }
        .wa-price-1kg { color: #8B0000; font-weight: 700; }

        .wa-checkout-header {
          margin-bottom: 20px;
          text-align: center;
        }

        .wa-checkout-header h3 {
          color: #8B0000;
          margin-bottom: 5px;
          font-family: var(--font-royal, serif);
        }

        .wa-checkout-header p {
          font-size: 0.9rem;
          color: #666;
        }

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
        .search-select-box,
        .wa-select-native {
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

        .wa-select-native {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 15px center;
          padding-right: 40px;
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

        .wa-complete-btn,
        .wa-submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          box-shadow: 0 10px 25px rgba(37, 211, 102, 0.25);
          transition: all 0.3s;
          font-size: 0.95rem;
          font-family: inherit;
        }

        .wa-complete-btn:hover,
        .wa-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px rgba(37, 211, 102, 0.35);
        }

        .wa-chat-body {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .wa-chat-messages {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .msg-bubble {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 15px;
          font-size: 0.95rem;
          line-height: 1.4;
        }

        .msg-bubble.assistant {
          align-self: flex-start;
          background: #f1f0f0;
          color: #2c1810;
          border-bottom-left-radius: 2px;
        }

        .msg-bubble.user {
          align-self: flex-end;
          background: #8B0000;
          color: white;
          border-bottom-right-radius: 2px;
        }

        .msg-bubble.typing {
          font-style: italic;
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .wa-chat-input {
          padding: 15px;
          border-top: 1px solid #eee;
          display: flex;
          gap: 10px;
        }

        .wa-chat-input input {
          flex: 1;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 20px;
          outline: none;
        }

        .wa-chat-input button {
          background: #8B0000;
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
        }

        .chat-order-card {
          background: #fff;
          border: 1px solid #eee;
          border-radius: 12px;
          margin-top: 10px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }

        .chat-prod-img-box {
          height: 100px;
          width: 100%;
          background: #f9f9f9;
        }

        .chat-prod-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .chat-order-cta {
          padding: 10px;
        }

        .chat-order-btn {
          width: 100%;
          padding: 10px;
          background: #25D366;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}
