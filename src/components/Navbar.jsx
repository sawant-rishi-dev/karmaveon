import React, { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useKeyboardContext } from '../context/KeyboardContext'

export default function Navbar() {
  const location = useLocation()
  const { openBookingModal } = useKeyboardContext()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  // Close on Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/products', label: 'Products', end: false },
    { to: '/services', label: 'Services', end: false },
  ]

  const handleNavClick = () => {
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99999,
          padding: '0 24px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(253, 251, 247, 0.94)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(203, 213, 225, 0.8)',
          boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={handleNavClick}
          style={{
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexShrink: 0,
          }}
        >
          {/* Official Karmaveon Circuit Logo */}
          <img
            src="/karmaveon-logo.png"
            alt="Karmaveon Logo"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '7px',
              objectFit: 'contain',
              flexShrink: 0,
              boxShadow: '0 2px 8px rgba(0, 102, 255, 0.25)',
            }}
          />
          <span
            style={{
              fontWeight: 900,
              fontSize: '18px',
              letterSpacing: '1.2px',
              background: 'linear-gradient(135deg, #0284c7, #2563eb)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              whiteSpace: 'nowrap',
              fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
            }}
          >
            KARMAVEON
          </span>
        </Link>

        {/* Desktop Nav Links using standard NavLink */}
        <div className="desktop-nav-links" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={handleNavClick}
              className={({ isActive }) => `nav-link-btn ${isActive ? 'nav-link-active' : ''}`}
              style={({ isActive }) => ({
                textDecoration: 'none',
                color: isActive ? '#FF5733' : '#1E293B',
                background: isActive ? 'rgba(255, 87, 51, 0.08)' : 'transparent',
                border: isActive ? '1px solid rgba(255, 87, 51, 0.25)' : '1px solid transparent',
                fontSize: '14px',
                fontWeight: isActive ? 800 : 650,
                letterSpacing: '0.2px',
                padding: '7px 16px',
                borderRadius: '8px',
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap',
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Right CTA + Mobile Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <button
            className="btn-glow desktop-cta-btn"
            style={{
              padding: '9px 20px',
              borderRadius: '10px',
              border: 'none',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '0.3px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
              height: '38px',
              lineHeight: 1,
              boxShadow: '0 4px 14px rgba(255, 87, 51, 0.35)',
            }}
            onClick={openBookingModal}
          >
            Strategy Call
          </button>

          {/* Mobile Menu Toggle Button */}
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
            zIndex: 99998,
            paddingTop: '68px',
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
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
              maxHeight: 'calc(100vh - 68px)',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {navLinks.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={handleNavClick}
                  style={({ isActive }) => ({
                    textDecoration: 'none',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    fontSize: '15px',
                    fontWeight: isActive ? 800 : 600,
                    color: isActive ? '#ff5733' : '#1e293b',
                    background: isActive ? 'rgba(255, 87, 51, 0.08)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  })}
                >
                  {({ isActive }) => (
                    <>
                      <span>{label}</span>
                      {isActive && <span style={{ color: '#ff5733', fontSize: '12px' }}>●</span>}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

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
                }}
                onClick={() => {
                  setMobileMenuOpen(false)
                  openBookingModal()
                }}
              >
                <span>Book Free Strategy Call</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
