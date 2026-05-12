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
  
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Sync scroll lock
  useEffect(() => {
    if (mounted) {
      document.body.style.overflow = menuOpen ? 'hidden' : '';
    }
    return () => { if (typeof document !== 'undefined') document.body.style.overflow = ''; };
  }, [menuOpen, mounted]);

  const navItems = [
    { name: 'Home', href: '/', icon: '🏠' },
    { name: 'संग्रह', href: '/collection', icon: '🍯' },
    { name: 'व्हाट्सएप दुकान', href: 'https://wa.me/c/917014102742', icon: '💬' },
    { name: 'पारंपरिक विधियाँ', href: '/recipes', icon: '📜' },
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
        fontFamily: 'var(--font-devanagari)',
        display: menuOpen ? 'none' : 'block'
      }}>
        🚩 हुकुम! घर बैठे मुफ्त सैंपल मंगवाएं। अभी क्लिक करें।
      </div>

      <nav className={`mewari-nav-fixed ${scrolled ? 'is-scrolled' : ''}`} style={{ display: menuOpen ? 'none' : 'flex' }}>
        <div className="mewari-nav-container">
          <Link href="/" className="mewari-logo-link" onClick={() => setMenuOpen(false)}>
            <img src="/favicon.png" alt="Mewari Achaar" style={{ 
              height: '55px', 
              width: 'auto', 
              position: 'relative', 
              transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
              filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))',
              zIndex: 100
            }} />
          </Link>

          <div className="mobile-center-title">
            Mewari <br/> Achaar
          </div>

          <ul className="mewari-desktop-nav">
            {navItems.map((item) => {
              const isExternal = item.href.startsWith('http');
              return (
                <li key={item.name}>
                  {isExternal ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="mewari-nav-item" style={{ textDecoration: 'none' }}>
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </a>
                  ) : (
                    <Link href={item.href} className="mewari-nav-item">
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  )}
                </li>
              );
            })}
            
            {mounted && (
              <li>
                {!user ? (
                  <Link href="/login" className="drawer-action-btn" style={{ padding: '10px 25px', fontSize: '0.85rem', borderRadius: '8px' }}>Login</Link>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button onClick={logout} style={{ background: 'none', border: '1px solid #8B0000', color: '#8B0000', padding: '5px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: '600' }}>Logout</button>
                  </div>
                )}
              </li>
            )}
          </ul>

          <div className="nav-hamburger-wrapper">
            <button className="mewari-hamburger" onClick={() => setMenuOpen(true)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      {/* DRAWER */}
      {menuOpen && (
        <div className="mewari-mobile-drawer">
          <div className="drawer-header" style={{ marginBottom: '1rem' }}>
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <img src="/favicon.png" alt="Logo" style={{ height: '60px' }} />
            </Link>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#8B0000', fontSize: '2.5rem', cursor: 'pointer', lineHeight: 1 }}>&times;</button>
          </div>

          <div className="drawer-links-box">
            {navItems.map((item) => {
              const isExternal = item.href.startsWith('http');
              return isExternal ? (
                <a 
                  key={item.name} 
                  href={item.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)} 
                  className="drawer-link-item" 
                  style={{ padding: '8px 0', textDecoration: 'none' }}
                >
                  <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.95rem' }}>{item.name}</span>
                </a>
              ) : (
                <Link key={item.name} href={item.href} onClick={() => setMenuOpen(false)} className="drawer-link-item" style={{ padding: '8px 0' }}>
                  <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                  <span style={{ fontSize: '0.95rem' }}>{item.name}</span>
                </Link>
              );
            })}
            
            <div className="drawer-promo-box" style={{ 
              marginTop: '1rem', 
              padding: '12px 15px', 
              background: 'linear-gradient(135deg, #2c1810 0%, #1a0f0a 100%)', 
              borderRadius: '12px', 
              border: '1px solid rgba(212, 175, 55, 0.4)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
            }}>
              {/* Decorative Ornament */}
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1 }}>
                 <svg width="60" height="60" viewBox="0 0 40 40" fill="#D4AF37"><path d="M20 5L24 13H16L20 5Z"/></svg>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '1rem', color: '#D4AF37' }}>👑</span>
                <span style={{ 
                  color: '#D4AF37', 
                  fontSize: '0.6rem', 
                  fontWeight: '700', 
                  letterSpacing: '1.5px', 
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-main)'
                }}>Royal Privileges</span>
              </div>

              <p style={{ 
                fontSize: '0.75rem', 
                color: 'rgba(255, 255, 255, 0.9)', 
                lineHeight: '1.5', 
                margin: '0 0 10px 0', 
                fontWeight: '400',
                fontFamily: 'var(--font-royal, serif)',
                fontStyle: 'italic'
              }}>
                Hukum, Royal Family ka hissa banein! Naye launches aur discounts sabse pehle paane ke liye sign up karein.
              </p>

              {!user && (
                <Link 
                  href="/signup" 
                  onClick={() => setMenuOpen(false)}
                  style={{ 
                    display: 'inline-block',
                    background: '#D4AF37',
                    color: '#2c1810',
                    padding: '6px 12px',
                    borderRadius: '5px',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    textDecoration: 'none',
                    textAlign: 'center',
                    width: '100%',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  Family Join Karein
                </Link>
              )}
            </div>
          </div>

          <div className="drawer-footer-profile">
            {mounted && (
              <>
                {!user ? (
                  <Link href="/login" onClick={() => setMenuOpen(false)} className="drawer-action-btn">
                    प्रवेश / खाता बनाएं
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
                            return `हुकुम ${emailPrefix.split(/[._]/).map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')}`;
                          }
                          return `हुकुम ${rawName}`;
                        })()}</h4>
                        <span>पंजीकृत सदस्य</span>
                      </div>
                    </div>

                    <button onClick={logout} className="drawer-action-btn drawer-logout-btn">
                      खाते से बाहर निकलें
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
