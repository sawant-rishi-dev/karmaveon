import { useEffect, useRef } from 'react'
import { useKeyboardContext } from '../context/KeyboardContext'

const SERVICES = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="2" y="6" width="36" height="26" rx="4" stroke="#ff5733" strokeWidth="1.5" fill="rgba(255,87,51,0.05)" />
        <line x1="2" y1="14" x2="38" y2="14" stroke="#ff5733" strokeWidth="1" opacity="0.5" />
        <circle cx="8" cy="10" r="2" fill="#ff4466" />
        <circle cx="14" cy="10" r="2" fill="#ffaa00" />
        <circle cx="20" cy="10" r="2" fill="#00ff88" />
        <rect x="8" y="20" width="10" height="2" rx="1" fill="#ff5733" opacity="0.8" />
        <rect x="8" y="25" width="20" height="2" rx="1" fill="#ff5733" opacity="0.4" />
        <rect x="8" y="28" width="15" height="2" rx="1" fill="#ff5733" opacity="0.3" />
      </svg>
    ),
    title: 'Website Development',
    tagline: 'From landing pages to full-scale web applications.',
    desc: 'We build what your business needs — performant, beautiful, and conversion-optimized. From marketing sites to complex SaaS platforms, we architect with modern stacks.',
    gradient: '#ffffff',
    accentColor: '#ff5733',
    features: ['React / Next.js', 'SEO Optimized', 'Mobile First', 'CMS Integration'],
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect x="10" y="2" width="20" height="36" rx="4" stroke="#7c3aed" strokeWidth="1.5" fill="rgba(124,58,237,0.05)" />
        <circle cx="20" cy="35" r="2" fill="#7c3aed" opacity="0.7" />
        <line x1="16" y1="5" x2="24" y2="5" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
        <rect x="14" y="10" width="12" height="18" rx="2" fill="rgba(124,58,237,0.15)" stroke="#7c3aed" strokeWidth="0.5" />
        <rect x="16" y="13" width="4" height="1.5" rx="0.5" fill="#7c3aed" opacity="0.6" />
        <rect x="16" y="17" width="8" height="1.5" rx="0.5" fill="#7c3aed" opacity="0.4" />
        <rect x="16" y="21" width="6" height="1.5" rx="0.5" fill="#7c3aed" opacity="0.3" />
      </svg>
    ),
    title: 'Mobile App Development',
    tagline: 'Native and cross-platform apps that deliver.',
    desc: 'Seamless user experiences on iOS and Android. We design and develop mobile apps that users love — with smooth performance and pixel-perfect UI from day one.',
    gradient: '#ffffff',
    accentColor: '#7c3aed',
    features: ['React Native', 'iOS & Android', 'Offline Ready', 'Push Notifications'],
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="8" cy="12" r="4" stroke="#db2777" strokeWidth="1.5" fill="rgba(219,39,119,0.1)" />
        <circle cx="32" cy="12" r="4" stroke="#2563eb" strokeWidth="1.5" fill="rgba(37,99,235,0.1)" />
        <circle cx="20" cy="32" r="4" stroke="#ff5733" strokeWidth="1.5" fill="rgba(255,87,51,0.1)" />
        <path d="M12 12 H28" stroke="#db2777" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M10 15 L18 29" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M30 15 L22 29" stroke="#ff5733" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>
    ),
    title: 'n8n Workflow Automation',
    tagline: 'Repetitive tasks? We kill them.',
    desc: 'Automate your business processes end-to-end with n8n workflows. Free your team from manual work and let intelligent automation handle data, emails, CRMs, and more.',
    gradient: '#ffffff',
    accentColor: '#db2777',
    features: ['n8n Workflows', 'API Integrations', 'Webhook Triggers', 'Error Handling'],
  },
]

export default function Services() {
  const { triggerAmbient } = useKeyboardContext()
  const lastScrollY = useRef(0)
  const ambientTimer = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const delta = Math.abs(scrollY - lastScrollY.current)
      lastScrollY.current = scrollY

      if (delta > 30) {
        if (ambientTimer.current) clearTimeout(ambientTimer.current)
        ambientTimer.current = setTimeout(() => {
          triggerAmbient()
        }, 50)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (ambientTimer.current) clearTimeout(ambientTimer.current)
    }
  }, [triggerAmbient])

  return (
    <div>
      {/* ── Page Header ── */}
      <section
        style={{
          padding: '80px 24px 60px',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <p style={{ color: '#ff5733', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '16px' }}>
          What We Offer
        </p>
        <h1
          style={{
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 900,
            color: '#0f172a',
            marginBottom: '20px',
            lineHeight: 1.1,
          }}
        >
          Core{' '}
          <span className="circuit-underline gradient-text">Services</span>
        </h1>
        <p style={{ color: '#475569', fontSize: '18px', lineHeight: 1.7 }}>
          We specialize in building custom technology solutions that solve real business problems and scale as you grow.
        </p>
      </section>

      {/* ── Service Cards ── */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 100px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {SERVICES.map((service, idx) => (
          <div
            key={service.title}
            className="glass service-card"
            style={{
              padding: '48px',
              borderRadius: '20px',
              background: '#ffffff',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              gap: '40px',
              alignItems: 'center',
              direction: idx % 2 === 1 ? 'rtl' : 'ltr',
            }}
          >
            {/* Icon side */}
            <div
              style={{
                direction: 'ltr',
                width: '100px',
                height: '100px',
                borderRadius: '20px',
                background: `#f8fafc`,
                border: `1px solid ${service.accentColor}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 4px 14px ${service.accentColor}15`,
                flexShrink: 0,
              }}
            >
              {service.icon}
            </div>

            {/* Text */}
            <div style={{ direction: 'ltr' }}>
              <div
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '100px',
                  background: `${service.accentColor}15`,
                  border: `1px solid ${service.accentColor}40`,
                  color: service.accentColor,
                  fontSize: '11px',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                {service.tagline}
              </div>

              <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
                {service.title}
              </h2>

              <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px' }}>
                {service.desc}
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {service.features.map(f => (
                  <span
                    key={f}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '6px',
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      color: '#334155',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Number decoration */}
            <div
              style={{
                direction: 'ltr',
                fontSize: '80px',
                fontWeight: 900,
                color: service.accentColor,
                opacity: 0.12,
                lineHeight: 1,
                userSelect: 'none',
                flexShrink: 0,
              }}
            >
              0{idx + 1}
            </div>
          </div>
        ))}
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          padding: '60px 24px 100px',
          textAlign: 'center',
          borderTop: '1px solid rgba(226, 232, 240, 0.8)',
        }}
      >
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
          Need something custom?
        </h2>
        <p style={{ color: '#475569', marginBottom: '32px', fontSize: '16px' }}>
          We go beyond the standard to engineer exactly what your business requires.
        </p>
        <a href="mailto:hello@karmaveon.tech">
          <button
            className="btn-glow"
            style={{
              padding: '14px 36px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              color: '#fff',
              letterSpacing: '0.5px',
            }}
          >
            Get in Touch
          </button>
        </a>
      </section>
    </div>
  )
}
