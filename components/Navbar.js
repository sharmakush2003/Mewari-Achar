'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';
import Link from 'next/link';

export default function Navbar({ onOpenSample, onOpenOrders }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loginWithGoogle, logout } = useAuth();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {/* Floating Top Bar (Matches Class AND Logic exactly) */}
      <div id="top-bar" className="top-bar" onClick={(e) => { e.stopPropagation(); onOpenSample(); }}>
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
          <li>
            <Link href="#home" onClick={() => setMenuOpen(false)}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
              Home
            </Link>
          </li>
          <li>
            <Link href="#products" onClick={() => setMenuOpen(false)}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 8V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8"></path>
                <path d="M1 3h22v5H1z"></path>
                <path d="M10 12h4"></path>
              </svg>
              Collection
            </Link>
          </li>
          <li>
            <Link href="#order" onClick={() => setMenuOpen(false)}>
              <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
                <path d="M3 6h18"></path>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              Order
            </Link>
          </li>

          <div className="drawer-divider"></div>

          <li id="auth-container">
            {!user ? (
              <Link href="/login" className="btn-login" onClick={() => setMenuOpen(false)}>Login</Link>
            ) : (
              <div className="user-profile-nav">
                <img id="user-photo" src={user.photoURL || '/Images/profile-placeholder.png'} alt="Profile" />
                <div className="user-dropdown">
                  <span>{user.displayName}</span>
                  <button onClick={() => { onOpenOrders(); setMenuOpen(false); }}>My Orders</button>
                  <button onClick={() => { logout(); setMenuOpen(false); }}>Logout</button>
                </div>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
