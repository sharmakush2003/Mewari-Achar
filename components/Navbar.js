'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthContext';
import { useRouter } from 'next/navigation';

export default function Navbar({ onOpenOrders, onOpenSample }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  // Secret Trigger Logic
  const clickCount = useRef(0);
  const lastClickTime = useRef(0);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    
    // Keyboard Shortcut Trigger: Alt + Shift + A
    const handleKeyDown = (e) => {
      if (e.altKey && e.shiftKey && e.code === 'KeyA') {
        router.push('/admin');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  const handleSecretLogoClick = (e) => {
    const now = Date.now();
    if (now - lastClickTime.current > 1000) {
      clickCount.current = 1;
    } else {
      clickCount.current += 1;
    }
    lastClickTime.current = now;

    if (clickCount.current === 3) {
      e.preventDefault();
      router.push('/admin');
      clickCount.current = 0;
    }
  };

  // Sync scroll lock
  useEffect(() => {
    if (mounted) {
      document.body.style.overflow = menuOpen ? 'hidden' : '';
    }
    return () => { if (typeof document !== 'undefined') document.body.style.overflow = ''; };
  }, [menuOpen, mounted]);

  const navItems = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'Collection', href: '/collection', icon: '🍯' },
    { name: 'Order Now', href: '/order', icon: '🛒' },
    { name: 'Recipes', href: '/recipes', icon: '📜' },
    { name: 'Cart', href: '/cart', icon: '🛍️' },
  ];

  return (
    <>
      <div className="nav-alert-bar" style={{ 
        background: '#8B0000', 
        color: 'white', 
        textAlign: 'center', 
        padding: '10px 5%', 
        fontWeight: '600', 
        fontSize: '0.85rem',
        display: menuOpen ? 'none' : 'block'
      }}>
        🚩 Free Sample Available at Your Doorstep! Click to learn more.
      </div>

      <nav className={`mewari-nav-fixed ${scrolled ? 'is-scrolled' : ''}`} style={{ display: menuOpen ? 'none' : 'flex' }}>
        <div className="mewari-nav-container">
          <Link href="/" onClick={(e) => { 
            handleSecretLogoClick(e);
            if (clickCount.current !== 3) setMenuOpen(false); 
          }}>
            <img src="/favicon.png" alt="Mewari Achaar" style={{ height: '55px', display: 'block' }} />
          </Link>

          <ul className="mewari-desktop-nav">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="mewari-nav-item">
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
            
            {mounted && (
              <li>
                {!user ? (
                  <Link href="/login" className="drawer-action-btn" style={{ padding: '10px 25px', fontSize: '0.85rem', borderRadius: '8px' }}>Login</Link>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span onClick={() => onOpenOrders?.()} style={{ cursor: 'pointer', fontWeight: '700', color: '#2c1810', fontSize: '0.9rem' }}>Orders</span>
                    <button onClick={logout} style={{ background: 'none', border: '1px solid #8B0000', color: '#8B0000', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: '600' }}>Logout</button>
                  </div>
                )}
              </li>
            )}
          </ul>

          <button className="mewari-hamburger" onClick={() => setMenuOpen(true)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      {/* DRAWER */}
      {menuOpen && (
        <div className="mewari-mobile-drawer">
          <div className="drawer-header" style={{ marginBottom: '2rem' }}>
            <Link href="/" onClick={(e) => {
              handleSecretLogoClick(e);
              if (clickCount.current === 3) setMenuOpen(false);
            }}>
              <img src="/favicon.png" alt="Logo" style={{ height: '55px' }} />
            </Link>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#8B0000', fontSize: '2.5rem', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
          </div>

          <div className="drawer-links-box">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setMenuOpen(false)} className="drawer-link-item">
                <span style={{ fontSize: '1.6rem' }}>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="drawer-footer-profile">
            {mounted && (
              <>
                {!user ? (
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="drawer-action-btn">
                    Login / Create Account
                  </Link>
                ) : (
                  <>
                    <div className="drawer-profile-info">
                      <div className="drawer-avatar-circle">👤</div>
                      <div className="drawer-user-details">
                        <h4>{(() => {
                          const rawName = user.displayName;
                          if (!rawName || rawName === 'Valued Guest' || rawName === 'Guest') {
                            const emailPrefix = user.email?.split('@')[0] || '';
                            // Format kushsharma.cor to Kush Sharma
                            return `हुकुम ${emailPrefix.split(/[._]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}`;
                          }
                          return `हुकुम ${rawName}`;
                        })()}</h4>
                        <span>Registered Member</span>
                      </div>
                    </div>
                    <button onClick={() => { onOpenOrders?.(); setMenuOpen(false); }} className="drawer-action-btn">
                      📦 View My Orders
                    </button>
                    <button onClick={logout} className="drawer-action-btn drawer-logout-btn">
                      Logout From Account
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
