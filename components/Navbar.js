'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenSample, onOpenOrders }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loginWithGoogle, logout } = useAuth();

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
          {[
            { name: 'Home', href: '/#home', icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
            { name: 'Collection', href: '/#products', icon: 'M21 8V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8 M1 3h22v5H1z M10 12h4' },
            { name: 'Order', href: '/#order', icon: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z M3 6h18 M16 10a4 4 0 0 1-8 0' },
            { name: 'Recipes', href: '/recipes', icon: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z' }
          ].map((item, i) => (
            <motion.li 
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.5 }}
            >
              <Link href={item.href} onClick={() => setMenuOpen(false)}>
                <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={item.icon}></path>
                </svg>
                {item.name}
              </Link>
            </motion.li>
          ))}

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="drawer-divider"
          ></motion.div>

          <motion.li 
            id="auth-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {!user ? (
              <Link href="/login" className="btn-login" onClick={() => setMenuOpen(false)}>Login</Link>
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
          .hamburger span {
            background: #8B0000;
          }
        }
      `}</style>
    </>
  );
}
