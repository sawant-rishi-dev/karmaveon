import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useKeyboardContext } from '../context/KeyboardContext'
import HeroCodeAmbiance from '../components/HeroCodeAmbiance'

export default function SmartUdhaar() {
  const { openBookingModal } = useKeyboardContext()
  const demoRef = useRef(null)
  const videoRef = useRef(null)

  // Document Title
  useEffect(() => {
    document.title = 'Smart Udhaar App – SMS-Free Kirana Khata & Billing'
  }, [])

  // Auto-play / pause video ONLY when in view on this page
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(video)

    return () => {
      if (video) {
        video.pause()
        observer.unobserve(video)
      }
    }
  }, [])

  // Interactive Demo States
  const [activeTab, setActiveTab] = useState('ledger')
  const [whatsappSent, setWhatsappSent] = useState(null)
  const [scannedItem, setScannedItem] = useState(null)
  const [cart, setCart] = useState([])

  const customers = [
    { id: 1, name: 'Ramesh Kumar', phone: '+91 98765 43210', balance: '₹1,450', status: 'High Due', statusColor: '#ef4444', daysOverdue: 34 },
    { id: 2, name: 'Sunita Devi', phone: '+91 98123 45678', balance: '₹320', status: 'Low Due', statusColor: '#f59e0b', daysOverdue: 6 },
    { id: 3, name: 'Rahul Verma', phone: '+91 99887 76655', balance: '₹0', status: 'Clear', statusColor: '#10b981', daysOverdue: 0 },
    { id: 4, name: 'Anik Sharma', phone: '+91 97654 32109', balance: '₹2,890', status: 'High Due', statusColor: '#ef4444', daysOverdue: 68 },
  ]

  const barcodeItems = [
    { code: '8901030001234', name: 'Aashirvaad Atta 5kg', price: '₹245', stock: 18 },
    { code: '8901234567890', name: 'Fortune Mustard Oil 1L', price: '₹140', stock: 4 },
    { code: '8909876543210', name: 'Tata Salt 1kg', price: '₹28', stock: 42 },
  ]

  const handleSendWhatsapp = (cust) => {
    setWhatsappSent(cust.name)
    setTimeout(() => setWhatsappSent(null), 4000)
  }

  const handleScanBarcode = (item) => {
    setScannedItem(item)
    setCart((prev) => [...prev, item])
  }

  const scrollToDemo = () => {
    if (demoRef.current) {
      demoRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', color: '#0f172a', paddingBottom: '120px' }}>
      
      {/* ── SECTION 1: HERO ── */}
      <section
        style={{
          width: '100%',
          padding: '80px 24px 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px -15px rgba(28, 25, 23, 0.07)',
          borderBottom: '1px solid rgba(203, 213, 225, 0.6)',
          marginBottom: '40px',
        }}
      >
        <HeroCodeAmbiance preset="smartudhaar" />

        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '100px',
              padding: '6px 18px',
              marginBottom: '24px',
              fontSize: '12px',
              color: '#10b981',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontWeight: 800,
            }}
          >
            <span>📱 OFFLINE-FIRST KIRANA POS & LEDGER</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(40px, 6.5vw, 72px)',
              fontWeight: 900,
              lineHeight: 1.08,
              letterSpacing: '-1.5px',
              marginBottom: '20px',
              color: '#0f172a',
            }}
          >
            Smart Udhaar App — <span className="gradient-text">SMS-Free Kirana Khata</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(18px, 2.5vw, 22px)',
              fontWeight: 700,
              color: '#334155',
              maxWidth: '820px',
              margin: '0 auto 16px',
              lineHeight: 1.4,
            }}
          >
            Manage customer credit (Udhaar), barcode billing, stock levels, and instant WhatsApp payment collection — all in one offline-first mobile app.
          </p>

          <p
            style={{
              fontSize: '16px',
              color: '#64748b',
              maxWidth: '640px',
              margin: '0 auto 36px',
              lineHeight: 1.6,
            }}
          >
            Built specifically for Indian Kirana store owners. Works smoothly offline with local SQLite storage and auto-syncs with the cloud.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={scrollToDemo}
              className="btn-glow"
              style={{
                padding: '16px 36px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '16px',
                fontWeight: 800,
                cursor: 'pointer',
                color: '#ffffff',
              }}
            >
              📱 Try Interactive Kirana Demo
            </button>
            <button
              onClick={openBookingModal}
              className="btn-outline"
              style={{
                padding: '16px 32px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              Start 15-Day Free Trial →
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: INTERACTIVE KIRANA POS & LEDGER DEMO ── */}
      <section
        ref={demoRef}
        style={{
          maxWidth: '1100px',
          margin: '0 auto 100px',
          padding: '0 24px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: '#10b981', fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Live Kirana Simulator
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#0f172a', marginTop: '8px' }}>
            Experience the Kirana Store Interface
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>
            Test customer credit tracking, 1-tap WhatsApp collection, and barcode billing.
          </p>
        </div>

        {/* 2-Column Grid: Live Video Demo & Interactive Kirana Simulator */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '36px',
            alignItems: 'center',
          }}
        >
          {/* Video Showcase Card */}
          <div
            style={{
              background: '#0f172a',
              borderRadius: '28px',
              border: '2px solid rgba(16, 185, 129, 0.3)',
              padding: '24px',
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Header Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  🎥 Live App Demo
                </span>
              </div>
              <span style={{ color: '#94a3b8', fontSize: '11px', background: 'rgba(255,255,255,0.08)', padding: '3px 10px', borderRadius: '12px', fontWeight: 600 }}>
                HD Loop
              </span>
            </div>

            {/* Video Player */}
            <video
              ref={videoRef}
              src="/Udhaar.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                width: '100%',
                borderRadius: '18px',
                display: 'block',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              }}
            />
          </div>

          {/* Demo Box UI */}
          <div
            style={{
              maxWidth: '460px',
              margin: '0 auto',
              width: '100%',
              background: '#ffffff',
              borderRadius: '32px',
              border: '8px solid #0f172a',
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25)',
              overflow: 'hidden',
            }}
          >
            {/* Top Bar */}
            <div style={{ background: '#0f172a', padding: '18px 20px', color: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#10b981' }}>
                🏪 Gupta Kirana Store
              </div>
              <div style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '3px 8px', borderRadius: '12px', fontWeight: 700 }}>
                ⚡ Offline SQLite Active
              </div>
            </div>
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#94a3b8' }}>
              Store ID: #KIRANA_104 · SMS-Free PIN Auth
            </div>
          </div>

          {/* Mode Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
            {[
              { id: 'ledger', label: '🧾 Udhaar Ledger' },
              { id: 'scan', label: '📷 Scan & Sell' },
              { id: 'reports', label: '📊 Aging Report' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '12px 6px',
                  border: 'none',
                  background: activeTab === tab.id ? '#ffffff' : 'transparent',
                  color: activeTab === tab.id ? '#ff5733' : '#64748b',
                  fontWeight: 800,
                  fontSize: '12px',
                  borderBottom: activeTab === tab.id ? '2px solid #ff5733' : 'none',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Udhaar Ledger */}
          {activeTab === 'ledger' && (
            <div style={{ padding: '16px' }}>
              {whatsappSent && (
                <div
                  style={{
                    background: '#dcfce7',
                    border: '1px solid #86efac',
                    color: '#166534',
                    padding: '10px',
                    borderRadius: '10px',
                    fontSize: '12px',
                    fontWeight: 700,
                    marginBottom: '12px',
                    textAlign: 'center',
                  }}
                >
                  💬 WhatsApp Reminder Sent to {whatsappSent} with pre-filled UPI link!
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {customers.map((cust) => (
                  <div
                    key={cust.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      borderRadius: '12px',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{cust.name}</div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>{cust.phone}</div>
                      {cust.daysOverdue > 0 && (
                        <div style={{ fontSize: '10px', color: '#ef4444', fontWeight: 700, marginTop: '2px' }}>
                          Overdue: {cust.daysOverdue} days
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '14px', fontWeight: 900, color: cust.statusColor }}>{cust.balance}</div>
                      <button
                        onClick={() => handleSendWhatsapp(cust)}
                        style={{
                          marginTop: '4px',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: 'none',
                          background: '#25D366',
                          color: '#ffffff',
                          fontSize: '10px',
                          fontWeight: 800,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}
                      >
                        💬 WhatsApp
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Scan & Sell */}
          {activeTab === 'scan' && (
            <div style={{ padding: '16px' }}>
              <div
                style={{
                  background: '#0f172a',
                  color: '#ffffff',
                  padding: '16px',
                  borderRadius: '14px',
                  textAlign: 'center',
                  marginBottom: '14px',
                }}
              >
                <div style={{ fontSize: '28px', marginBottom: '4px' }}>📷</div>
                <div style={{ fontSize: '12px', color: '#38bdf8', fontWeight: 800 }}>expo-camera Barcode Scanner Active</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Tap below to simulate camera barcode lookup:</div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                {barcodeItems.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => handleScanBarcode(item)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      background: '#f8fafc',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a' }}>{item.name}</div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>Barcode: {item.code}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: '#10b981', fontSize: '13px' }}>{item.price}</div>
                  </button>
                ))}
              </div>

              {cart.length > 0 && (
                <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>
                    Cart Items Scanned: {cart.length}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <button
                      onClick={() => {
                        alert('Paid instantly via Cash/UPI!')
                        setCart([])
                      }}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '6px',
                        border: 'none',
                        background: '#10b981',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 800,
                        cursor: 'pointer',
                      }}
                    >
                      💵 Pay Cash
                    </button>
                    <button
                      onClick={() => {
                        alert('Added to Ramesh Kumar Udhaar Ledger!')
                        setCart([])
                      }}
                      style={{
                        flex: 1,
                        padding: '8px',
                        borderRadius: '6px',
                        border: 'none',
                        background: '#ff5733',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 800,
                        cursor: 'pointer',
                      }}
                    >
                      🧾 Add to Udhaar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Udhaar Aging Report */}
          {activeTab === 'reports' && (
            <div style={{ padding: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>
                📊 Udhaar Aging Breakdown
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { range: '0 – 7 Days', amount: '₹320', count: '1 Customer', color: '#10b981' },
                  { range: '8 – 15 Days', amount: '₹0', count: '0 Customers', color: '#3b82f6' },
                  { range: '16 – 30 Days', amount: '₹0', count: '0 Customers', color: '#f59e0b' },
                  { range: '31 – 60 Days', amount: '₹1,450', count: '1 Customer', color: '#ef4444' },
                  { range: '60+ Days (High Risk)', amount: '₹2,890', count: '1 Customer', color: '#991b1b' },
                ].map((row) => (
                  <div
                    key={row.range}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      borderLeft: `4px solid ${row.color}`,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0f172a' }}>{row.range}</div>
                      <div style={{ fontSize: '10px', color: '#64748b' }}>{row.count}</div>
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 900, color: row.color }}>{row.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        </div>
      </section>

      {/* ── SECTION 3: TECHNICAL ARCHITECTURE & KIRANA CAPABILITIES ── */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '2px', textTransform: 'uppercase' }}>
            ENGINEERED FOR DAILY KIRANA PEAK RUSH
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#0f172a', marginTop: '8px' }}>
            Core Systems & High-Velocity POS Architecture
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px', maxWidth: '640px', margin: '8px auto 0' }}>
            Built specifically to eliminate pen-and-paper credit books and slow barcode billing with zero reliance on cloud uptime.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '20px' }}>
          {[
            {
              badge: 'LOCAL STORAGE',
              badgeColor: '#10b981',
              title: 'Offline-First SQLite Transaction Engine',
              desc: 'Every customer transaction, Udhaar entry, and stock adjustment is committed locally to expo-sqlite in under 5ms. The store keeps billing at full speed even with zero mobile signal.',
              techTag: 'expo-sqlite 14.0 · Local ACID DB',
            },
            {
              badge: 'PAYMENT RECOVERY',
              badgeColor: '#25D366',
              title: '1-Tap WhatsApp Payment Collection',
              desc: 'Generates automated WhatsApp debt collection messages containing dynamic, pre-filled UPI payment links (GPay, PhonePe, Paytm). Customers settle debts directly into the owner bank account.',
              techTag: 'WhatsApp Business API · Dynamic UPI',
            },
            {
              badge: 'BARCODE POS',
              badgeColor: '#0284c7',
              title: 'Sub-Second Camera Barcode Scanner',
              desc: 'Integrated expo-camera barcode recognition with instant local SQLite cache lookup. Automatic "Quick Add Product" prompt appears if an unrecognized barcode is scanned.',
              techTag: 'expo-camera · 1D/2D Barcode Lookup',
            },
            {
              badge: 'ZERO-SMS AUTH',
              badgeColor: '#7c3aed',
              title: 'SMS-Free 4-Digit PIN Authentication',
              desc: 'Eliminates costly SMS OTP delays during peak morning rush. Kirana shop owners authenticate securely with a 10-digit mobile number and local hashed 4-digit PIN.',
              techTag: 'Bcrypt PIN Hash · Multi-Tenant ID',
            },
            {
              badge: 'CLOUD SYNC',
              badgeColor: '#f59e0b',
              title: 'Background Cloud Sync with Supabase',
              desc: 'Once internet connectivity is restored, the background worker automatically pushes offline SQLite transaction diffs to Supabase PostgreSQL with conflict resolution.',
              techTag: 'Supabase PostgreSQL · Auto-Sync Worker',
            },
            {
              badge: 'RISK ANALYTICS',
              badgeColor: '#ef4444',
              title: 'Udhaar Aging & High-Risk Alert Reports',
              desc: 'Categorizes store debt into clear aging buckets (0–7d, 8–15d, 16–30d, 31–60d, 60+d). Alerts owners to high-risk overdue accounts before extending further credit.',
              techTag: 'Aging Ledger Matrix · Low-Stock Alerts',
            },
          ].map((f, i) => (
            <div
              key={i}
              style={{
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                borderRadius: '16px',
                padding: '28px 24px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '10.5px', fontWeight: 900, fontFamily: 'monospace', color: f.badgeColor, background: `${f.badgeColor}12`, border: `1px solid ${f.badgeColor}30`, padding: '2px 8px', borderRadius: '4px' }}>
                    {f.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', marginBottom: '10px', lineHeight: 1.3 }}>
                  {f.title}
                </h3>
                <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.65, margin: 0 }}>
                  {f.desc}
                </p>
              </div>
              <div style={{ marginTop: '20px', paddingTop: '12px', borderTop: '1px dashed #e2e8f0', fontSize: '11px', fontFamily: 'monospace', color: '#64748b' }}>
                ⚡ {f.techTag}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: SYSTEM WORKFLOW (KIRANA vs CLOUD vs CUSTOMER) ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#0f172a' }}>
            Offline Billing to WhatsApp Collection in Seconds
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '32px', alignItems: 'center' }}>
          {/* Kirana Store Side */}
          <div style={{ background: '#ffffff', borderRadius: '24px', border: '2px solid #10b981', padding: '36px 30px', boxShadow: '0 12px 30px rgba(16, 185, 129, 0.08)' }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#10b981', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              🏪 KIRANA OWNER SIDE
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginBottom: '14px' }}>
              Offline Barcode Billing & Ledger
            </h3>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7 }}>
              Scan barcodes, record Udhaar debts offline on `expo-sqlite`. Zero lag, zero reliance on active network signals.
            </p>
          </div>

          {/* Central Connector */}
          <div style={{ textAlign: 'center', padding: '12px' }}>
            <div style={{ display: 'inline-block', background: 'linear-gradient(135deg, #10b981, #2563eb)', color: '#ffffff', padding: '14px 24px', borderRadius: '100px', fontWeight: 900, fontSize: '13px', letterSpacing: '0.5px', boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)' }}>
              ⚡ Auto Sync: SQLite ↔ Supabase Cloud
            </div>
          </div>

          {/* Customer Side */}
          <div style={{ background: '#ffffff', borderRadius: '24px', border: '2px solid #25D366', padding: '36px 30px', boxShadow: '0 12px 30px rgba(37, 211, 102, 0.08)' }}>
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#25D366', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              💬 CUSTOMER SIDE
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginBottom: '14px' }}>
              1-Tap WhatsApp Payment Links
            </h3>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7 }}>
              Customer receives automated WhatsApp debt reminders with pre-filled UPI payment links for instant settlement.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: PRICING & FINAL CALL-TO-ACTION ── */}
      <section style={{ maxWidth: '900px', margin: '0 auto 100px', padding: '0 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>
          Ready to Modernize Your Kirana Store?
        </h2>
        <p style={{ color: '#475569', fontSize: '18px', marginBottom: '40px' }}>
          Join 100+ Kirana owners managing credit and sales with Smart Udhaar App.
        </p>

        {/* Pricing Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
            border: '2px solid #10b981',
            borderRadius: '28px',
            padding: '44px 32px',
            boxShadow: '0 20px 50px rgba(16, 185, 129, 0.12)',
            maxWidth: '520px',
            margin: '0 auto',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#10b981', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
            💎 15-DAY FREE TRIAL
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
            No credit card required. Cancel anytime.
          </div>
          <div style={{ fontSize: '40px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>
            ₹499<span style={{ fontSize: '18px', color: '#64748b', fontWeight: 600 }}>/month</span>
            <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>(Unlimited Kirana transactions & WhatsApp alerts)</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', marginBottom: '32px' }}>
            <div style={{ fontSize: '14px', color: '#334155', fontWeight: 700 }}>✅ Unlimited customer ledgers</div>
            <div style={{ fontSize: '14px', color: '#334155', fontWeight: 700 }}>✅ Offline-first SQLite database</div>
            <div style={{ fontSize: '14px', color: '#334155', fontWeight: 700 }}>✅ 1-Tap WhatsApp payment reminders</div>
            <div style={{ fontSize: '14px', color: '#334155', fontWeight: 700 }}>✅ Udhaar Aging & Stock Reports</div>
          </div>

          <button
            onClick={openBookingModal}
            className="btn-glow"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              color: '#ffffff',
            }}
          >
            🚀 Start Your Free Trial Today
          </button>
        </div>
      </section>

      {/* ── SECTION 6: CONTACT & FOOTER ── */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '60px 24px 0',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>
          Have Questions? Let's Talk.
        </h2>
        <p style={{ color: '#475569', fontSize: '16px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.6 }}>
          We build Smart Udhaar App. We also build custom SaaS, mobile POS apps, and AI solutions for businesses like yours.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            fontSize: '15px',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '40px',
          }}
        >
          <a href="mailto:karmaaveontechnologies@gmail.com" style={{ textDecoration: 'none', color: '#2563eb' }}>
            📧 Email: contact@karmaveontechnologies.in
          </a>
          <a href="tel:+918237815495" style={{ textDecoration: 'none', color: '#2563eb' }}>
            📞 Phone: +91 82378 15495
          </a>
          <span style={{ color: '#64748b' }}>📍 Built with ❤️ by Karmaveon Technologies</span>
        </div>

        {/* Footer Trust Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
          <span>🔒 Full IP Ownership – You own everything.</span>
          <span>🛡️ 100% Data Security – Offline SQLite & Encrypted Supabase.</span>
          <span>🌍 Built for Indian Kirana Store Owners.</span>
        </div>
      </section>

    </div>
  )
}
