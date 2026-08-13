import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        position: 'relative',
        background: 'rgba(245, 243, 239, 0.95)',
        borderTop: '1px solid rgba(226, 232, 240, 0.9)',
        padding: '48px 32px 24px',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {/* Circuit board decoration */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none' }}>
        <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="circuit" width="80" height="80" patternUnits="userSpaceOnUse">
              {/* Horizontal lines */}
              <line x1="0" y1="20" x2="30" y2="20" stroke="#2563eb" strokeWidth="1" />
              <line x1="50" y1="20" x2="80" y2="20" stroke="#2563eb" strokeWidth="1" />
              <line x1="0" y1="60" x2="20" y2="60" stroke="#0284c7" strokeWidth="1" />
              <line x1="60" y1="60" x2="80" y2="60" stroke="#0284c7" strokeWidth="1" />
              {/* Vertical lines */}
              <line x1="30" y1="0" x2="30" y2="20" stroke="#2563eb" strokeWidth="1" />
              <line x1="30" y1="40" x2="30" y2="80" stroke="#2563eb" strokeWidth="1" />
              <line x1="60" y1="0" x2="60" y2="60" stroke="#7c3aed" strokeWidth="1" />
              <line x1="60" y1="80" x2="60" y2="80" stroke="#7c3aed" strokeWidth="1" />
              {/* Nodes */}
              <circle cx="30" cy="20" r="3" fill="#2563eb" />
              <circle cx="60" cy="60" r="3" fill="#0284c7" />
              <circle cx="20" cy="60" r="2" fill="#7c3aed" />
              <circle cx="50" cy="20" r="2" fill="#db2777" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Brand */}
        <div>
          <h3
            style={{
              fontWeight: 800,
              fontSize: '20px',
              letterSpacing: '2px',
              background: 'linear-gradient(135deg, #0284c7, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '12px',
            }}
          >
            KARMAVEON
          </h3>
          <p style={{ color: '#475569', fontSize: '13px', lineHeight: 1.7 }}>
            Engineering Excellence for Modern Business. Built to Outperform, Designed to Last.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 style={{ color: '#2563eb', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 700 }}>
            Navigation
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[['/', 'Home'], ['/services', 'Services'], ['/products', 'Products']].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                style={{
                  color: '#475569',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.target.style.color = '#2563eb' }}
                onMouseLeave={(e) => { e.target.style.color = '#475569' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 style={{ color: '#2563eb', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 700 }}>
            Services
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {['Website Development', 'Mobile Apps', 'n8n Automation', 'Custom Software'].map((s) => (
              <span key={s} style={{ color: '#475569', fontSize: '14px' }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: '#2563eb', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 700 }}>
            Contact
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a
              href="mailto:hello@karmaveon.tech"
              style={{ color: '#475569', textDecoration: 'none', fontSize: '14px' }}
            >
              hello@karmaveon.tech
            </a>
            <span style={{ color: '#64748b', fontSize: '14px' }}>
              Building the future, one line at a time.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '40px auto 0',
          paddingTop: '24px',
          borderTop: '1px solid rgba(226, 232, 240, 0.8)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span style={{ color: '#64748b', fontSize: '12px' }}>
          © {year} Karmaveon Technologies. All rights reserved.
        </span>
        <span style={{ color: '#94a3b8', fontSize: '12px' }}>
          Built with ⚡ precision.
        </span>
      </div>
    </footer>
  )
}
