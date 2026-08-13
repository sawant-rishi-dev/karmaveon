import { useEffect } from 'react'
import { useKeyboardContext } from '../context/KeyboardContext'

const PRODUCTS = [
  {
    title: 'Custom CRM Portals',
    version: 'v2.4.1',
    statusColor: '#10b981',
    desc: 'Tailored dashboards to track your full sales pipeline, customer lifecycle, and team performance in real-time.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'REST API'],
    accentColor: '#ff5733',
    terminalLines: [
      '> Initializing CRM module...',
      '> Connecting to pipeline API',
      '> Loading 247 active deals',
      '> Dashboard ready ✓',
    ],
    metrics: [
      { label: 'Deals Tracked', value: '247' },
      { label: 'Automation Rules', value: '18' },
      { label: 'Uptime', value: '99.9%' },
    ],
  },
  {
    title: 'E-Commerce Engines',
    version: 'v3.1.0',
    statusColor: '#2563eb',
    desc: 'High-performance storefronts built for scale. Handles thousands of concurrent users with sub-second load times and seamless checkout flows.',
    tags: ['Next.js', 'Stripe', 'Redis', 'CDN'],
    accentColor: '#2563eb',
    terminalLines: [
      '> Booting storefront engine...',
      '> CDN edge nodes: 42 active',
      '> Payment gateways: connected',
      '> Ready for traffic ✓',
    ],
    metrics: [
      { label: 'Products', value: '10K+' },
      { label: 'Load Time', value: '<0.8s' },
      { label: 'Conversion', value: '+34%' },
    ],
  },
  {
    title: 'Automated Data Pipelines',
    version: 'v1.8.3',
    statusColor: '#7c3aed',
    desc: 'n8n-powered workflows that move your data without human error. Sync databases, trigger alerts, and orchestrate your entire data ecosystem.',
    tags: ['n8n', 'Webhooks', 'APIs', 'Cron Jobs'],
    accentColor: '#7c3aed',
    terminalLines: [
      '> Pipeline orchestrator online',
      '> 34 active workflows loaded',
      '> Last sync: 2s ago',
      '> All systems nominal ✓',
    ],
    metrics: [
      { label: 'Workflows', value: '34' },
      { label: 'Daily Runs', value: '8,400' },
      { label: 'Error Rate', value: '0.01%' },
    ],
  },
  {
    title: 'SaaS Starter Platforms',
    version: 'v1.2.0',
    statusColor: '#db2777',
    desc: 'Complete multi-tenant SaaS foundations with auth, billing, user management, and admin dashboards — ready to customize and launch fast.',
    tags: ['Auth0', 'Stripe', 'TypeScript', 'Docker'],
    accentColor: '#db2777',
    terminalLines: [
      '> Multi-tenant mode active',
      '> Auth layer: secured',
      '> Billing engine: live',
      '> Tenant isolated ✓',
    ],
    metrics: [
      { label: 'Tenants', value: 'Unlimited' },
      { label: 'Auth Methods', value: '6' },
      { label: 'Setup Time', value: '<1 week' },
    ],
  },
]

export default function Products() {
  const { triggerAmbient, triggerCascade } = useKeyboardContext()

  useEffect(() => {
    let last = 0
    let timer = null
    const handler = () => {
      const delta = Math.abs(window.scrollY - last)
      last = window.scrollY
      if (delta > 40) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(triggerAmbient, 80)
      }
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [triggerAmbient])

  return (
    <div>
      {/* ── Header ── */}
      <section
        style={{
          padding: '80px 24px 60px',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <p style={{ color: '#ff5733', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '16px' }}>
          Our Portfolio
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
          What We{' '}
          <span className="circuit-underline gradient-text">Build</span>
        </h1>
        <p style={{ color: '#475569', fontSize: '18px', lineHeight: 1.7 }}>
          Battle-tested software products engineered for performance, reliability, and scalability.
        </p>
      </section>

      {/* ── Product Grid ── */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 100px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(520px, 1fr))',
          gap: '28px',
        }}
      >
        {PRODUCTS.map((product) => (
          <div
            key={product.title}
            className="terminal-card"
            onMouseEnter={triggerCascade}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
              cursor: 'default',
            }}
          >
            {/* Terminal header bar */}
            <div
              style={{
                background: '#f8fafc',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
              }}
            >
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff4466' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffaa00' }} />
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
              <span
                style={{
                  marginLeft: '8px',
                  color: '#64748b',
                  fontSize: '11px',
                  fontFamily: "'Courier New', monospace",
                  flex: 1,
                }}
              >
                karmaveon/{product.title.toLowerCase().replace(/\s+/g, '-')} — {product.version}
              </span>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '10px',
                  color: product.statusColor,
                  fontWeight: 600,
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: product.statusColor }} />
                LIVE
              </div>
            </div>

            <div style={{ padding: '28px' }}>
              {/* Title */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h2
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    color: '#0f172a',
                    lineHeight: 1.2,
                  }}
                >
                  {product.title}
                </h2>
                <span
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    background: `${product.accentColor}15`,
                    border: `1px solid ${product.accentColor}40`,
                    color: product.accentColor,
                    fontSize: '10px',
                    fontFamily: "'Courier New', monospace",
                    flexShrink: 0,
                    marginLeft: '12px',
                  }}
                >
                  {product.version}
                </span>
              </div>

              {/* Description */}
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.8, marginBottom: '20px' }}>
                {product.desc}
              </p>

              {/* Terminal output block */}
              <div
                style={{
                  background: '#1e293b',
                  border: `1px solid ${product.accentColor}30`,
                  borderRadius: '8px',
                  padding: '14px 16px',
                  fontFamily: "'Courier New', monospace",
                  fontSize: '12px',
                  marginBottom: '20px',
                  lineHeight: 1.9,
                }}
              >
                {product.terminalLines.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      color: line.endsWith('✓')
                        ? '#34d399'
                        : line.startsWith('>')
                          ? '#38bdf8'
                          : '#94a3b8',
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  marginBottom: '20px',
                }}
              >
                {product.metrics.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      textAlign: 'center',
                      padding: '12px 8px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '20px',
                        fontWeight: 800,
                        color: product.accentColor,
                        marginBottom: '4px',
                      }}
                    >
                      {m.value}
                    </div>
                    <div style={{ fontSize: '10px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '5px',
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      color: '#334155',
                      fontSize: '11px',
                      fontFamily: "'Courier New', monospace",
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Bottom CTA ── */}
      <section
        style={{
          padding: '60px 24px 100px',
          textAlign: 'center',
          borderTop: '1px solid rgba(226, 232, 240, 0.8)',
        }}
      >
        <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
          Don't see what you need?
        </h2>
        <p style={{ color: '#475569', marginBottom: '32px', fontSize: '16px', maxWidth: '500px', margin: '0 auto 32px' }}>
          We build fully custom solutions from scratch. Tell us your vision and we'll engineer it.
        </p>
        <a href="mailto:hello@karmaveon.tech">
          <button
            className="btn-outline"
            style={{
              padding: '14px 36px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.5px',
            }}
          >
            Let's Talk →
          </button>
        </a>
      </section>
    </div>
  )
}
