import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useKeyboardContext } from '../context/KeyboardContext'
import HeroCodeAmbiance from '../components/HeroCodeAmbiance'

export default function Products() {
  const { openBookingModal } = useKeyboardContext()
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', color: '#0f172a', paddingBottom: '100px' }}>
      
      {/* ── SECTION 1: HERO (High-Contrast, Punchy, Technical) ── */}
      <section
        style={{
          width: '100%',
          padding: '70px 24px 50px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px -15px rgba(28, 25, 23, 0.07)',
          borderBottom: '1px solid rgba(203, 213, 225, 0.6)',
          marginBottom: '50px',
        }}
      >
        <HeroCodeAmbiance preset="products" />

        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '100px',
              padding: '5px 16px',
              marginBottom: '20px',
              fontSize: '11px',
              fontWeight: 800,
              fontFamily: 'monospace',
              color: '#ff5733',
              letterSpacing: '1px',
            }}
          >
            <span>PROVEN PRODUCTION PLATFORMS & HARDWARE</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(36px, 5.5vw, 64px)',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-1.8px',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}
          >
            Built for Real-World Operations.
          </h1>

          <p
            style={{
              color: '#475569',
              fontSize: 'clamp(16px, 2vw, 19px)',
              lineHeight: 1.6,
              maxWidth: '720px',
              margin: '0 auto 36px',
              fontWeight: 500,
            }}
          >
            Explore our proprietary software platforms, offline retail operating systems, and custom microcontroller IoT hardware deployed in live environments.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          {[
            { id: 'all', label: 'All Deployments' },
            { id: 'flagships', label: '⭐ Flagships' },
            { id: 'mobile', label: '📱 Offline Mobile' },
            { id: 'hardware', label: '🔌 IoT & Hardware' },
            { id: 'bespoke', label: '⚡ Bespoke SaaS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                border: activeTab === tab.id ? '1.5px solid #0f172a' : '1px solid #e2e8f0',
                background: activeTab === tab.id ? '#0f172a' : '#ffffff',
                color: activeTab === tab.id ? '#ffffff' : '#64748b',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* ── SECTION 2: FLAGSHIP 1: QR BITES (DOMINANT 12-COL HERO) ── */}
      {(activeTab === 'all' || activeTab === 'flagships') && (
        <section
          style={{
            maxWidth: '1200px',
            margin: '0 auto 36px',
            padding: '0 24px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '2px solid #ff5733',
              padding: '40px 36px',
              boxShadow: '0 20px 50px -10px rgba(255, 87, 51, 0.12)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
              gap: '36px',
              alignItems: 'center',
            }}
          >
            {/* Left: Product Spec & Details */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span
                  style={{
                    background: '#ff5733',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 900,
                    fontFamily: 'monospace',
                    padding: '3px 10px',
                    borderRadius: '4px',
                  }}
                >
                  FLAGSHIP 01
                </span>
                <span style={{ color: '#10b981', fontSize: '12px', fontFamily: 'monospace', fontWeight: 800 }}>
                  ● LIVE RESTAURANT DEPLOYMENT
                </span>
              </div>

              <h2
                style={{
                  fontSize: 'clamp(28px, 3.8vw, 42px)',
                  fontWeight: 900,
                  color: '#0f172a',
                  lineHeight: 1.15,
                  letterSpacing: '-1px',
                  marginBottom: '14px',
                }}
              >
                QR Bites — Contactless Dining & Instant KDS
              </h2>

              <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                Replaces bulky paper menus and slow staff orders. Diners scan a high-density QR code at their table, customize dishes, and order in under 2 seconds. The order streams instantly over WebSockets to the kitchen display screen. Zero app download, 0% platform commission.
              </p>

              {/* Technical Spec Matrix */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '28px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px 10px', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#ff5733' }}>&lt; 2s</div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace', fontWeight: 800 }}>SCAN TO ORDER</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px 10px', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#10b981' }}>0%</div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace', fontWeight: 800 }}>COMMISSION</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '14px 10px', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: 900, color: '#2563eb' }}>+40%</div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace', fontWeight: 800 }}>TABLE TURNOVER</div>
                </div>
              </div>

              {/* Stack Tags */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                {['React 19', 'Node.js', 'WebSocket KDS', 'Instant UPI / Stripe', 'Dynamic Table QR'].map((t) => (
                  <span
                    key={t}
                    style={{
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      color: '#334155',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      fontFamily: 'monospace',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link to="/qr-bites" style={{ textDecoration: 'none' }}>
                  <button
                    className="btn-glow"
                    style={{
                      padding: '14px 30px',
                      borderRadius: '10px',
                      border: 'none',
                      fontSize: '14.5px',
                      fontWeight: 900,
                      cursor: 'pointer',
                      color: '#ffffff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <span>View QR Bites Platform & Live Demo</span>
                    <span>→</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right: Real Restaurant KDS Simulation Frame */}
            <div
              style={{
                background: '#090d16',
                borderRadius: '18px',
                border: '1px solid #1e293b',
                padding: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '12px', marginBottom: '16px' }}>
                <span style={{ color: '#ff5733', fontWeight: 800, fontSize: '13px', fontFamily: 'monospace' }}>
                  KITCHEN DISPLAY SCREEN (KDS)
                </span>
                <span style={{ color: '#10b981', fontSize: '12px', fontFamily: 'monospace', fontWeight: 700 }}>
                  ● WebSocket Connected
                </span>
              </div>

              {/* Simulated Tickets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ background: 'rgba(255, 87, 51, 0.12)', border: '1px solid rgba(255, 87, 51, 0.35)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#ff5733', fontWeight: 800, fontSize: '13px' }}>
                    <span>TABLE #04 (NEW ORDER)</span>
                    <span>₹498</span>
                  </div>
                  <div style={{ color: '#ffffff', fontSize: '13px', marginTop: '4px' }}>1x Truffle Mushroom Pizza (Extra Cheese)</div>
                  <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px', fontFamily: 'monospace' }}>Received: 12s ago · Prep Time: 12m</div>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 800, fontSize: '13px' }}>
                    <span>TABLE #09 (READY)</span>
                    <span>₹249</span>
                  </div>
                  <div style={{ color: '#ffffff', fontSize: '13px', marginTop: '4px' }}>2x Iced Espresso Tonic</div>
                  <div style={{ color: '#94a3b8', fontSize: '11px', marginTop: '4px', fontFamily: 'monospace' }}>Dispatched to Server Station ✓</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── SECTION 3: FLAGSHIP 2 (SMART UDHAAR) & FLAGSHIP 3 (KWIEE HARDWARE) ── */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto 36px',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: '28px',
        }}
      >
        {/* ── SMART UDHAAR ── */}
        {(activeTab === 'all' || activeTab === 'flagships' || activeTab === 'mobile') && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1.5px solid #e2e8f0',
              padding: '36px 30px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span
                  style={{
                    background: '#10b981',
                    color: '#ffffff',
                    fontSize: '10.5px',
                    fontWeight: 900,
                    fontFamily: 'monospace',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  FLAGSHIP 02
                </span>
                <span style={{ color: '#64748b', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700 }}>
                  OFFLINE-FIRST POS
                </span>
              </div>

              <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', marginBottom: '10px', letterSpacing: '-0.5px' }}>
                Smart Udhaar — Kirana Khata & Billing
              </h2>

              <p style={{ color: '#475569', fontSize: '14.5px', lineHeight: 1.7, marginBottom: '20px' }}>
                Tailored for Indian retail & grocery stores. Zero internet required during peak billing hours. Instant barcode scanning, local SQLite credit balances, and 1-tap WhatsApp payment collection links.
              </p>

              {/* Highlights */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '24px' }}>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '17px', fontWeight: 900, color: '#10b981' }}>100%</div>
                  <div style={{ fontSize: '9.5px', color: '#166534', fontFamily: 'monospace', fontWeight: 700 }}>OFFLINE SPEED</div>
                </div>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '17px', fontWeight: 900, color: '#10b981' }}>1-Tap</div>
                  <div style={{ fontSize: '9.5px', color: '#166534', fontFamily: 'monospace', fontWeight: 700 }}>WA REMINDERS</div>
                </div>
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '17px', fontWeight: 900, color: '#10b981' }}>+42%</div>
                  <div style={{ fontSize: '9.5px', color: '#166534', fontFamily: 'monospace', fontWeight: 700 }}>COLLECTIONS</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {['React Native', 'Expo 51', 'SQLite Embedded', 'Supabase Sync', 'expo-camera'].map((tag) => (
                  <span key={tag} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', fontSize: '11px', padding: '3px 8px', borderRadius: '6px', fontFamily: 'monospace', fontWeight: 700 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link to="/smart-udhaar" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#10b981',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                }}
              >
                <span>Explore Smart Udhaar App</span>
                <span>→</span>
              </button>
            </Link>
          </div>
        )}

        {/* ── KWIEE & HARDWARE ── */}
        {(activeTab === 'all' || activeTab === 'flagships' || activeTab === 'hardware') && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1.5px solid #e2e8f0',
              padding: '36px 30px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span
                  style={{
                    background: '#059669',
                    color: '#ffffff',
                    fontSize: '10.5px',
                    fontWeight: 900,
                    fontFamily: 'monospace',
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  HARDWARE 01
                </span>
                <span style={{ color: '#64748b', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700 }}>
                  EMBEDDED SENSOR DEVICE
                </span>
              </div>

              <h2 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', marginBottom: '10px', letterSpacing: '-0.5px' }}>
                Kwiee — ESP32 Sensor Buddy & Hardware
              </h2>

              <p style={{ color: '#475569', fontSize: '14.5px', lineHeight: 1.7, marginBottom: '20px' }}>
                Physical desktop companion engineered with custom ESP32 firmware, VL53L0X Time-of-Flight distance sensor, DHT22 climate sensors, and real-time WiFi MQTT notification bridges on a 240x240 TFT screen.
              </p>

              {/* Hardware Spec Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '24px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '17px', fontWeight: 900, color: '#059669' }}>ESP32</div>
                  <div style={{ fontSize: '9.5px', color: '#64748b', fontFamily: 'monospace', fontWeight: 700 }}>DUAL-CORE CPU</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '17px', fontWeight: 900, color: '#059669' }}>ToF 2m</div>
                  <div style={{ fontSize: '9.5px', color: '#64748b', fontFamily: 'monospace', fontWeight: 700 }}>RANGE SENSOR</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                  <div style={{ fontSize: '17px', fontWeight: 900, color: '#059669' }}>WiFi/MQTT</div>
                  <div style={{ fontSize: '9.5px', color: '#64748b', fontFamily: 'monospace', fontWeight: 700 }}>CLOUD BRIDGE</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {['ESP32-WROOM', 'VL53L0X Laser', 'DHT22 Temp/Hum', 'ST7789 TFT Display', 'C++ / Arduino'].map((tag) => (
                  <span key={tag} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#475569', fontSize: '11px', padding: '3px 8px', borderRadius: '6px', fontFamily: 'monospace', fontWeight: 700 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link to="/kwiee" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  width: '100%',
                  padding: '14px 20px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#059669',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)',
                }}
              >
                <span>View Kwiee Hardware Specs</span>
                <span>→</span>
              </button>
            </Link>
          </div>
        )}
      </section>

      {/* ── SECTION 4: BESPOKE CLIENT PLATFORMS (HIGH-DENSITY TECHNICAL GRID) ── */}
      {(activeTab === 'all' || activeTab === 'bespoke') && (
        <section
          style={{
            maxWidth: '1200px',
            margin: '0 auto 60px',
            padding: '0 24px',
          }}
        >
          <div style={{ marginBottom: '28px' }}>
            <span style={{ fontSize: '11px', fontWeight: 900, fontFamily: 'monospace', color: '#2563eb', letterSpacing: '1px' }}>
              CUSTOM ENTERPRISE SYSTEMS
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>
              Bespoke Software & Pipeline Solutions
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '20px',
            }}
          >
            {[
              {
                id: 'crm',
                title: 'Custom CRM & Deal Pipeline',
                desc: 'Tailored customer lifecycle and deal pipeline dashboards with PostgreSQL database isolation, automated team alerts, and role-based permissions.',
                tags: ['React 19', 'Node.js', 'PostgreSQL', 'REST API'],
                metric: '247+ Active Deals',
                sla: '14-Day Delivery',
              },
              {
                id: 'ecom',
                title: 'High-Throughput E-Commerce',
                desc: 'Edge-rendered Next.js storefronts built to withstand traffic surges with Redis caching, Stripe Checkout, and automated shipping sync.',
                tags: ['Next.js 15', 'Stripe', 'Redis Edge', 'CDN'],
                metric: '<0.8s Page Load',
                sla: 'Sub-second UX',
              },
              {
                id: 'pipelines',
                title: 'Autonomous n8n Orchestrations',
                desc: 'Enterprise workflow automation eliminating manual operations. Webhook listeners, auto-invoice reconciliation, and Slack notifications.',
                tags: ['n8n', 'Webhooks', 'REST APIs', 'PostgreSQL'],
                metric: '8,400+ Daily Runs',
                sla: 'Zero Human Lag',
              },
              {
                id: 'saas',
                title: 'Multi-Tenant SaaS Starter',
                desc: 'Production-ready starter foundation featuring organization workspaces, Stripe subscription billing, Auth0 auth, and audit logging.',
                tags: ['TypeScript', 'Auth0', 'Stripe Billing', 'Docker'],
                metric: 'Multi-Tenant',
                sla: '1-Week Staging',
              },
            ].map((sol) => (
              <div
                key={sol.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>
                    {sol.title}
                  </h3>
                  <p style={{ color: '#475569', fontSize: '13.5px', lineHeight: 1.6, marginBottom: '16px' }}>
                    {sol.desc}
                  </p>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
                    {sol.tags.map((t) => (
                      <span key={t} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b', fontSize: '10.5px', padding: '2px 7px', borderRadius: '4px', fontFamily: 'monospace' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', fontFamily: 'monospace' }}>
                  <span style={{ color: '#0f172a', fontWeight: 800 }}>{sol.metric}</span>
                  <span style={{ color: '#2563eb', fontWeight: 700 }}>{sol.sla}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── SECTION 5: HIGH-IMPACT CUSTOM BUILD ACTION ── */}
      <section
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '60px 32px',
          background: '#0f172a',
          borderRadius: '24px',
          border: '1px solid #1e293b',
          textAlign: 'center',
          color: '#ffffff',
          boxShadow: '0 25px 50px rgba(15, 23, 42, 0.25)',
        }}
      >
        <span style={{ color: '#ff5733', fontSize: '11px', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '2px' }}>
          NEED A BESPOKE SYSTEM?
        </span>

        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#ffffff', marginTop: '10px', marginBottom: '16px', letterSpacing: '-0.8px' }}>
          Have a Custom Product or Hardware Requirement?
        </h2>

        <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '580px', margin: '0 auto 32px', lineHeight: 1.6 }}>
          We design, prototype, and build custom web platforms, mobile apps, and embedded hardware in fixed 4-week milestones with 100% IP ownership.
        </p>

        <button
          onClick={openBookingModal}
          className="btn-glow"
          style={{
            padding: '16px 40px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '15.5px',
            fontWeight: 900,
            cursor: 'pointer',
            color: '#ffffff',
            boxShadow: '0 4px 20px rgba(255, 87, 51, 0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>Schedule Technical Discovery Call</span>
          <span>→</span>
        </button>
      </section>
    </div>
  )
}
