import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useKeyboardContext } from '../context/KeyboardContext'

export default function Navbar() {
  const location = useLocation()
  const { openBookingModal } = useKeyboardContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu whenever location changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Close mobile menu on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
  ]

  const featuredLinks = [
    { to: '/qr-bites', label: 'QR Bites POS', icon: '🍕' },
    { to: '/smart-udhaar', label: 'Smart Udhaar', icon: '📱' },
  ]

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <>
      <nav
        className="glass"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '0 16px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'nowrap',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
          borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          className="logo-link"
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0,
          }}
        >
          {/* Circuit Icon */}
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="16" cy="16" r="15" stroke="#FF5733" strokeWidth="1.5" />
            <rect x="10" y="10" width="5" height="5" rx="1" fill="#FF5733" opacity="0.9" />
            <rect x="17" y="10" width="5" height="5" rx="1" fill="#E11D48" opacity="0.9" />
            <rect x="10" y="17" width="5" height="5" rx="1" fill="#E11D48" opacity="0.9" />
            <rect x="17" y="17" width="5" height="5" rx="1" fill="#FF5733" opacity="0.9" />
            <line x1="12.5" y1="6" x2="12.5" y2="10" stroke="#FF5733" strokeWidth="1.5" />
            <line x1="19.5" y1="6" x2="19.5" y2="10" stroke="#E11D48" strokeWidth="1.5" />
            <line x1="12.5" y1="22" x2="12.5" y2="26" stroke="#E11D48" strokeWidth="1.5" />
            <line x1="19.5" y1="22" x2="19.5" y2="26" stroke="#FF5733" strokeWidth="1.5" />
            <line x1="6" y1="12.5" x2="10" y2="12.5" stroke="#FF5733" strokeWidth="1.5" />
            <line x1="22" y1="12.5" x2="26" y2="12.5" stroke="#E11D48" strokeWidth="1.5" />
            <line x1="6" y1="19.5" x2="10" y2="19.5" stroke="#E11D48" strokeWidth="1.5" />
            <line x1="22" y1="19.5" x2="26" y2="19.5" stroke="#FF5733" strokeWidth="1.5" />
          </svg>
          <span
            className="logo-text"
            style={{
              fontWeight: 800,
              fontSize: '16px',
              letterSpacing: '1.2px',
              background: 'linear-gradient(135deg, #FF5733, #E11D48)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              whiteSpace: 'nowrap',
            }}
          >
            KARMAVEON
          </span>
        </Link>

        {/* Desktop Center Nav Links */}
        <div className="desktop-nav-links" style={{ display: 'flex', gap: '28px', alignItems: 'center', whiteSpace: 'nowrap' }}>
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              style={{
                textDecoration: 'none',
                color: isActive(to) ? '#FF5733' : '#475569',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.5px',
                position: 'relative',
                padding: '4px 0',
                transition: 'color 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {label}
              {isActive(to) && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #FF5733, #E11D48)',
                    borderRadius: '1px',
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right Side Group: Desktop CTA + Mobile Hamburger Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button
            className="btn-glow desktop-cta-btn"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.3px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              height: '36px',
              lineHeight: 1,
            }}
            onClick={openBookingModal}
          >
            📅 Strategy Call
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              background: '#ffffff',
              color: '#0f172a',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {mobileMenuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            paddingTop: '64px',
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.2s ease-out',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
              padding: '20px 20px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxHeight: 'calc(100vh - 64px)',
              overflowY: 'auto',
            }}
          >
            {/* Primary Nav Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {navLinks.map(({ to, label }) => {
                const active = isActive(to)
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      textDecoration: 'none',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      fontSize: '15px',
                      fontWeight: active ? 800 : 600,
                      color: active ? '#ff5733' : '#1e293b',
                      background: active ? 'rgba(255, 87, 51, 0.08)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background 0.15s ease',
                    }}
                  >
                    <span>{label}</span>
                    {active && <span style={{ color: '#ff5733', fontSize: '12px' }}>●</span>}
                  </Link>
                )
              })}
            </div>

            {/* Featured Product Shortcuts */}
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginTop: '6px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', paddingLeft: '8px' }}>
                Featured Products
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {featuredLinks.map(({ to, label, icon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      textDecoration: 'none',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#475569',
                      background: '#f8fafc',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>{icon}</span>
                    <span>{label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Strategy Call Full Width Mobile Button */}
            <div style={{ marginTop: '12px' }}>
              <button
                className="btn-glow"
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
                onClick={() => {
                  setMobileMenuOpen(false)
                  openBookingModal()
                }}
              >
                <span>📅 Book Free Strategy Call</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
