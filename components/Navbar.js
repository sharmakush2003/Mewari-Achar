'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenSample, onOpenOrders }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loginWithGoogle, logout } = useAuth();
  const { cart, setIsCartOpen, mounted } = useCart();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Floating Top Bar (Matches Class AND Logic exactly) */}
      <div id="top-bar" className="top-bar" onClick={(e) => { e.stopPropagation(); onOpenSample?.(); }}>
        <span className="top-bar-text">✨ Free Sample Available at Your Doorstep! Click to learn more.</span>
      </div>

      {/* Menu Overlay (Must be body level for 1:1 CSS targets) */}
      <div 
        id="menu-overlay" 
        className={`menu-overlay ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <nav className="navbar">
        <Link href="/" className="logo">Mewari Achaar</Link>
        
        <button 
          className={`hamburger ${menuOpen ? 'active' : ''}`} 
          id="hamburger"
          onClick={toggleMenu}
        >
          <span></span><span></span><span></span>
        </button>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`} id="nav-links">
          {/* Premium Menu Header (Mobile Only) */}
          <li className="mobile-menu-header">
            <span className="menu-label">Mewari Achaar</span>
            <div className="menu-divider-gold"></div>
          </li>

          {[
            { name: 'Home', href: '/', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
            { name: 'Collection', href: '/collection', icon: 'M21 8V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8 M1 3h22v5H1z M10 12h4' },
            { name: 'Order', href: '/order', icon: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z M3 6h18 M16 10a4 4 0 0 1-8 0' },
            { name: 'Recipes', href: '/recipes', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z' }
          ].map((item, i) => (
            <motion.li 
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: i * 0.08 + 0.15 
              }}
            >
              <Link href={item.href} onClick={() => setMenuOpen(false)}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d={item.icon}></path>
                </svg>
                {item.name}
              </Link>
            </motion.li>
          ))}

          {/* Cart Icon in Navbar */}
          <motion.li
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1 }}
             className="nav-cart-item"
          >
            <button className="cart-trigger" onClick={() => setIsCartOpen(true)}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="cart-text-mobile">Cart</span>
              {mounted && Object.keys(cart).length > 0 && (
                <span className="cart-badge">{Object.values(cart).reduce((a, b) => a + b, 0)}</span>
              )}
            </button>
          </motion.li>


          <motion.li 
            id="auth-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {!user ? (
              <Link href="/login" className="btn-login" onClick={() => setMenuOpen(false)}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                Login
              </Link>
            ) : (
              <div className="user-profile-nav">
                <img id="user-photo" src={user.photoURL || '/Images/profile-placeholder.png'} alt="Profile" />
                <div className="user-dropdown">
                  <span className="user-name">{user.displayName}</span>
                  <span className="user-title">Royal Patron</span>
                  <button onClick={() => { onOpenOrders?.(); setMenuOpen(false); }}>My Orders</button>
                  <button onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
                </div>
              </div>
            )}
          </motion.li>
        </ul>
      </nav>

      <style jsx>{`
        .mobile-menu-header {
          display: none;
          flex-direction: column;
          align-items: center;
          margin-bottom: 2rem;
          width: 100%;
        }

        @media (max-width: 968px) {
          .mobile-menu-header {
            display: flex;
            margin-bottom: 1rem;
          }
          .menu-label {
            font-family: var(--font-royal, serif);
            font-size: 1.8rem;
            color: #8B0000;
            margin-bottom: 0.2rem;
          }
          .menu-divider-gold {
            width: 40px;
            height: 2px;
            background: #D4AF37;
          }

          .cart-text-mobile {
            display: none;
          }

          @media (max-width: 968px) {
            .cart-text-mobile {
              display: block;
              margin-top: 5px;
            }
          }
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 5%;
          position: sticky;
          top: 0;
          width: 100%;
          background: rgba(250, 249, 242, 0.85);
          backdrop-filter: blur(25px) saturate(180%);
          -webkit-backdrop-filter: blur(25px) saturate(180%);
          z-index: 1000;
          border-bottom: 0.5px solid rgba(139, 0, 0, 0.08);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.02);
        }

        .logo {
          font-family: var(--font-royal, serif);
          font-size: 1.8rem;
          font-weight: 600;
          color: #8B0000;
          text-decoration: none;
          letter-spacing: -0.5px;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: 2.5rem;
          align-items: center;
        }

        .nav-links a {
          text-decoration: none;
          color: rgba(44, 24, 16, 0.7);
          font-weight: 500;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-links a:hover {
          color: #8B0000;
        }

        .top-bar {
          background: linear-gradient(90deg, #8B0000 0%, #a50000 50%, #8B0000 100%);
          background-size: 200% auto;
          animation: shimmer 10s linear infinite;
          color: #fff;
          text-align: center;
          padding: 10px 5%;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          cursor: pointer;
          border-bottom: 1px solid #D4AF37;
          position: relative;
          overflow: hidden;
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .btn-login {
          background: #8B0000;
          color: #fff;
          padding: 10px 25px;
          border-radius: 50px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-size: 0.8rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(139, 0, 0, 0.2);
        }

        .btn-login:hover {
          background: #D4AF37;
          transform: translateY(-2px);
          color: #fff;
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
        }

        .user-photo {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid #D4AF37;
        }

        @media (max-width: 968px) {
          .nav-links {
            position: fixed;
            top: 0;
            right: -100%;
            height: 100vh;
            width: 320px;
            background: #faf9f2;
            flex-direction: column;
            padding: 120px 40px;
            transition: 0.6s cubic-bezier(0.85, 0, 0.15, 1);
            box-shadow: -10px 0 50px rgba(0, 0, 0, 0.1);
            border-left: 1px solid rgba(139, 0, 0, 0.1);
          }
          .nav-links.active {
            right: 0;
          }
          .drawer-divider {
            height: 1px;
            background: rgba(139, 0, 0, 0.1);
            margin: 30px 0;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .gold-dot-nav {
            width: 6px;
            height: 6px;
            background: var(--secondary-color);
            border-radius: 50%;
            transform: rotate(45deg);
          }
          .hamburger span {
            background: #8B0000;
          }
        }

        .cart-trigger {
          background: none;
          border: none;
          position: relative;
          cursor: pointer;
          color: rgba(44, 24, 16, 0.7);
          transition: 0.3s;
          display: flex;
          align-items: center;
          padding: 8px;
          border-radius: 50%;
        }
        .cart-trigger:hover {
          background: rgba(139, 0, 0, 0.05);
          color: #8B0000;
        }
        .cart-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: #8B0000;
          color: #fff;
          font-size: 0.65rem;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #fff;
        }
        .user-profile-nav {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          cursor: pointer;
        }
        .user-profile-nav img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid #D4AF37;
        }
        .user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          width: 200px;
          background: #fff;
          padding: 20px;
          border-radius: 15px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          opacity: 0;
          pointer-events: none;
          transform: translateY(10px);
          transition: 0.3s;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .user-profile-nav:hover .user-dropdown {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
        .user-name { font-weight: 700; color: #2c1810; }
        .user-title { font-size: 0.7rem; color: #8B0000; text-transform: uppercase; letter-spacing: 1px; }
        .user-dropdown button {
          text-align: left;
          background: none;
          border: none;
          font-size: 0.9rem;
          color: #5a4a42;
          cursor: pointer;
          padding: 5px 0;
        }
        .user-dropdown button:hover { color: #8B0000; }
      `}</style>
    </>
  );
}
