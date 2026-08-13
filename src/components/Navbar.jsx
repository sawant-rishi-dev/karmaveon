import { Link, useLocation } from 'react-router-dom'
import { useKeyboardContext } from '../context/KeyboardContext'

export default function Navbar() {
  const location = useLocation()
  const { triggerAmbient } = useKeyboardContext()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/interactive', label: '🧙‍♂️ Fourth-Wall UX' },
    { to: '/products', label: 'Products' },
    { to: '/services', label: 'Services' },
  ]

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/'
    return location.pathname.startsWith(to)
  }

  return (
    <nav
      className="glass"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 32px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}
        onMouseEnter={triggerAmbient}
      >
        {/* Circuit icon */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
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
          style={{
            fontWeight: 800,
            fontSize: '18px',
            letterSpacing: '2px',
            background: 'linear-gradient(135deg, #FF5733, #E11D48)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          KARMAVEON
        </span>
      </Link>

      {/* Center nav links */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{
              textDecoration: 'none',
              color: isActive(to) ? '#FF5733' : '#475569',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              position: 'relative',
              padding: '4px 0',
              transition: 'color 0.3s ease',
            }}
          >
            {label}
            {isActive(to) && (
              <span style={{
                position: 'absolute',
                bottom: '-2px',
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, #FF5733, #E11D48)',
                borderRadius: '1px',
              }} />
            )}
          </Link>
        ))}
      </div>

      {/* CTA button */}
      <Link
        to="/services"
        style={{ textDecoration: 'none' }}
      >
        <button
          className="btn-glow"
          style={{
            padding: '10px 22px',
            borderRadius: '8px',
            border: 'none',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '1px',
            cursor: 'pointer',
          }}
          onMouseEnter={triggerAmbient}
        >
          Get in Touch
        </button>
      </Link>
    </nav>
  )
}
