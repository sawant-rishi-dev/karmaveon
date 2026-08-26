import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  const riskReversals = [
    { icon: '🔒', text: '100% IP Transfer & Code Ownership' },
    { icon: '🛡️', text: 'Mutual NDA Available Upon Request' },
    { icon: '💳', text: 'Fixed Milestone Payments (50/50)' },
    { icon: '⚡', text: 'Sub-4-Week Sprint Delivery Guarantee' },
  ]

  return (
    <footer
      style={{
        position: 'relative',
        background: '#090d16',
        borderTop: '1px solid #1e293b',
        boxShadow: '0 -20px 50px rgba(0, 0, 0, 0.35)',
        padding: '52px 28px 24px',
        zIndex: 10,
        color: '#f8fafc',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Brand Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <img
              src="/karmaveon-logo.png"
              alt="Karmaveon Logo"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                objectFit: 'contain',
                boxShadow: '0 2px 8px rgba(0, 102, 255, 0.3)',
              }}
            />
            <h3
              style={{
                fontWeight: 900,
                fontSize: '19px',
                letterSpacing: '1.5px',
                color: '#ffffff',
                margin: 0,
              }}
            >
              KARMAVEON
            </h3>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: 1.65, maxWidth: '280px' }}>
            Engineering high-throughput web platforms, offline mobile apps, autonomous AI pipelines & bespoke hardware from cloud to chip.
          </p>
        </div>

        {/* Navigation Column */}
        <div>
          <h4 style={{ color: '#38bdf8', fontSize: '11.5px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 800, fontFamily: 'monospace' }}>
            [Navigation]
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              ['/', 'Home'],
              ['/products', 'Products'],
              ['/services', 'Services'],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                style={{
                  color: '#cbd5e1',
                  textDecoration: 'none',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => { e.target.style.color = '#ff5733' }}
                onMouseLeave={(e) => { e.target.style.color = '#cbd5e1' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Capabilities Column */}
        <div>
          <h4 style={{ color: '#38bdf8', fontSize: '11.5px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 800, fontFamily: 'monospace' }}>
            [Engineering]
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              'Next.js 15 Web Platforms',
              'Offline React Native Apps',
              'Enterprise Vector RAG & LLMs',
              'n8n Workflow Orchestration',
              'ESP32 & GPU Compute Rigs',
            ].map((s) => (
              <span key={s} style={{ color: '#94a3b8', fontSize: '13.5px' }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Direct Contact Column */}
        <div>
          <h4 style={{ color: '#38bdf8', fontSize: '11.5px', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '14px', fontWeight: 800, fontFamily: 'monospace' }}>
            [Direct Contact]
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a
              href="mailto:contact@karmaveontechnologies.in"
              style={{ color: '#ff5733', textDecoration: 'none', fontSize: '13.5px', fontWeight: 700 }}
            >
              contact@karmaveontechnologies.in
            </a>
            <a
              href="tel:+918237815495"
              style={{ color: '#f8fafc', textDecoration: 'none', fontSize: '13.5px', fontWeight: 700 }}
            >
              +91 82378 15495
            </a>
            <span style={{ color: '#64748b', fontSize: '12.5px' }}>
              Worldwide delivery across US, EU & APAC timezones.
            </span>
          </div>
        </div>
      </div>

      {/* ── Single Thin Sleek Trust Badges Bar ── */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '36px auto 0',
          padding: '12px 18px',
          borderRadius: '8px',
          background: '#020617',
          border: '1px solid #1e293b',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {riskReversals.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px' }}>{r.icon}</span>
            <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#cbd5e1', fontFamily: 'monospace' }}>
              {r.text}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Legal / Signature */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '20px auto 0',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <span style={{ color: '#64748b', fontSize: '11.5px' }}>
          © {year} Karmaveon Technologies. All rights reserved.
        </span>
        <span style={{ color: '#38bdf8', fontSize: '11.5px', fontFamily: 'monospace' }}>
          ⚡ Engineering Precision · Cloud to Chip
        </span>
      </div>
    </footer>
  )
}
