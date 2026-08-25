import { Link } from 'react-router-dom'
import { useKeyboardContext } from '../context/KeyboardContext'

const PRODUCTS = [
  {
    id: 'qr-bites',
    title: 'QR Bites',
    subtitle: 'Digital Menu & Zero-Commission Ordering',
    link: '/qr-bites',
    version: 'v1.0.0',
    badge: 'Featured',
    badgeColor: '#ff5733',
    icon: '🍽️',
    desc: 'Smart QR digital menu ecosystem for restaurants & cafes. Customers scan, order, and pay in seconds — zero app downloads, 0% commission, real-time kitchen dispatch.',
    tags: ['React', 'Node.js', 'QR Scanning', 'WebSockets', 'Stripe / UPI'],
    accentColor: '#ff5733',
    terminalLines: [
      '> Initializing QR Bites engine...',
      '> Generating table QR codes',
      '> Kitchen KDS WebSocket connected',
      '> Restaurant portal ready ✓',
    ],
    metrics: [
      { label: 'Scan to Order', value: '<2 sec' },
      { label: 'Commission', value: '0%' },
      { label: 'Table Turnaround', value: '+35%' },
    ],
  },
  {
    id: 'smart-udhaar',
    title: 'Smart Udhaar',
    subtitle: 'Offline Kirana POS & Udhaar Ledger',
    link: '/smart-udhaar',
    version: 'v2.1.0',
    badge: 'Featured',
    badgeColor: '#10b981',
    icon: '🏪',
    desc: 'Offline-first React Native POS for Kirana shops. Barcode scan-to-sell, SMS-free PIN login, WhatsApp collection links, and Supabase cloud sync when online.',
    tags: ['React Native', 'Expo', 'SQLite', 'Supabase', 'expo-camera'],
    accentColor: '#10b981',
    terminalLines: [
      '> Booting Kirana POS engine...',
      '> Offline SQLite database active',
      '> Camera barcode scanner ready',
      '> Auto-sync with Supabase ✓',
    ],
    metrics: [
      { label: 'Offline Speed', value: '100%' },
      { label: 'Collections', value: '+42%' },
      { label: 'WA Reminders', value: '1-Tap' },
    ],
  },
  {
    id: 'kwiee',
    title: 'Kwiee',
    subtitle: 'Smart Desktop Buddy & Sensor Hub',
    link: '/kwiee',
    version: 'v1.0.0',
    badge: 'Hardware',
    badgeColor: '#059669',
    icon: '🔌',
    desc: 'A compact smart device that keeps an eye on you — live temp, clock, pressure, distance sensor, and push notifications (WhatsApp, Gmail, Slack) on a TFT screen.',
    tags: ['Arduino / ESP32', 'TFT Display', 'DHT22', 'VL53L0X ToF', 'WiFi MQTT'],
    accentColor: '#059669',
    terminalLines: [
      '> Kwiee firmware booting...',
      '> TFT display: OK ✓',
      '> Sensors: DHT22 + VL53L0X active',
      '> Push notification bridge: LIVE ✓',
    ],
    metrics: [
      { label: 'Sensor Update', value: '< 1s' },
      { label: 'Notif Bridge', value: 'WiFi' },
      { label: 'Offline Ready', value: '100%' },
    ],
  },
  {
    id: 'crm',
    title: 'Custom CRM',
    subtitle: 'Pipeline & Customer Lifecycle Dashboards',
    link: '/solutions',
    version: 'v2.4.1',
    badge: 'Available',
    badgeColor: '#2563eb',
    icon: '📊',
    desc: 'Tailored dashboards to track your full sales pipeline, customer lifecycle, and team performance in real-time with automated alerts and reporting.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'REST API'],
    accentColor: '#2563eb',
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
    id: 'ecom',
    title: 'E-Commerce Engine',
    subtitle: 'High-Performance Storefront Systems',
    link: '/solutions',
    version: 'v3.1.0',
    badge: 'Available',
    badgeColor: '#2563eb',
    icon: '🛒',
    desc: 'Blazing-fast storefronts built for scale. Handles thousands of concurrent users with sub-second load times, CDN delivery, and seamless checkout flows.',
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
    id: 'pipelines',
    title: 'Automated Pipelines',
    subtitle: 'n8n Workflow Orchestration',
    link: '/solutions',
    version: 'v1.8.3',
    badge: 'Available',
    badgeColor: '#7c3aed',
    icon: '⚡',
    desc: 'n8n-powered automation workflows that eliminate human error. Sync databases, trigger alerts, and orchestrate your entire data and business ecosystem.',
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
    id: 'saas',
    title: 'SaaS Starter Platform',
    subtitle: 'Multi-Tenant Foundations',
    link: '/solutions',
    version: 'v1.2.0',
    badge: 'Available',
    badgeColor: '#db2777',
    icon: '🚀',
    desc: 'Complete multi-tenant SaaS foundations with auth, billing, user management, and admin dashboards — ready to customize and launch in under a week.',
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
  const { triggerCascade } = useKeyboardContext()

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
          Battle-tested software and hardware products engineered for performance, reliability, and scale.
        </p>
      </section>

      {/* ── Product Grid ── */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: '28px',
          alignItems: 'start',
        }}
      >
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            onMouseEnter={triggerCascade}
            style={{
              background: '#ffffff',
              border: '1px solid #e8edf2',
              borderRadius: '20px',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Accent top bar */}
            <div style={{ height: '4px', background: `linear-gradient(90deg, ${product.accentColor}, ${product.accentColor}66)` }} />

            {/* Terminal header bar */}
            <div
              style={{
                background: '#f8fafc',
                padding: '9px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ff5f57', display: 'block' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#ffbd2e', display: 'block' }} />
                <span style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#28c840', display: 'block' }} />
              </div>
              <span
                style={{
                  flex: 1,
                  color: '#94a3b8',
                  fontSize: '11px',
                  fontFamily: "'Courier New', monospace",
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  minWidth: 0,
                }}
              >
                karmaveon/{product.id} · {product.version}
              </span>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: product.accentColor,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: product.accentColor,
                    boxShadow: `0 0 5px ${product.accentColor}`,
                  }}
                />
                LIVE
              </span>
            </div>

            {/* Card body */}
            <div style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>

              {/* Icon + title row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: `${product.accentColor}12`,
                    border: `1px solid ${product.accentColor}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}
                >
                  {product.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: '17px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                      {product.title}
                    </h2>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '100px',
                        background: `${product.badgeColor}14`,
                        border: `1px solid ${product.badgeColor}30`,
                        color: product.badgeColor,
                        fontSize: '10px',
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {product.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: '11.5px', color: '#94a3b8', fontWeight: 600, margin: '3px 0 0' }}>
                    {product.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p style={{ color: '#475569', fontSize: '13.5px', lineHeight: 1.75, margin: 0 }}>
                {product.desc}
              </p>

              {/* Terminal block */}
              <div
                style={{
                  background: '#0f172a',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  fontFamily: "'Courier New', monospace",
                  fontSize: '11.5px',
                  lineHeight: 1.8,
                }}
              >
                {product.terminalLines.map((line, i) => (
                  <div key={i} style={{ color: line.endsWith('✓') ? '#34d399' : '#38bdf8' }}>
                    {line}
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {product.metrics.map((m) => (
                  <div
                    key={m.label}
                    style={{
                      textAlign: 'center',
                      padding: '10px 6px',
                      background: `${product.accentColor}08`,
                      borderRadius: '10px',
                      border: `1px solid ${product.accentColor}18`,
                    }}
                  >
                    <div style={{ fontSize: '16px', fontWeight: 900, color: product.accentColor, marginBottom: '3px' }}>
                      {m.value}
                    </div>
                    <div style={{ fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech tags */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: '3px 9px',
                      borderRadius: '6px',
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      color: '#475569',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              {product.link && (
                <Link to={product.link} style={{ textDecoration: 'none', marginTop: 'auto' }}>
                  <button
                    style={{
                      width: '100%',
                      padding: '11px 20px',
                      borderRadius: '10px',
                      border: 'none',
                      background: `linear-gradient(135deg, ${product.accentColor}ee, ${product.accentColor}bb)`,
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: `0 4px 14px ${product.accentColor}28`,
                    }}
                  >
                    <span>Explore {product.title}</span>
                    <span>→</span>
                  </button>
                </Link>
              )}
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
        <a href="mailto:karmaaveontechnologies@gmail.com">
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
