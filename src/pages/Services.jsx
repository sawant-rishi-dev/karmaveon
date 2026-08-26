import { useState, useEffect } from 'react'
import { useKeyboardContext } from '../context/KeyboardContext'
import HeroCodeAmbiance from '../components/HeroCodeAmbiance'

// ── Interactive Kirana POS / Udhaar Mobile Simulator ─────────────
function KiranaPhoneSimulator() {
  const [activeTab, setActiveTab] = useState('pos')
  const [scannedItem, setScannedItem] = useState(false)
  const [reminderSent, setReminderSent] = useState(false)
  const [invoicePrinted, setInvoicePrinted] = useState(false)

  const handleScan = () => {
    setScannedItem(true)
    setTimeout(() => setScannedItem(false), 3500)
  }

  const handleSendReminder = () => {
    setReminderSent(true)
    setTimeout(() => setReminderSent(false), 3000)
  }

  const handlePrintInvoice = () => {
    setInvoicePrinted(true)
    setTimeout(() => setInvoicePrinted(false), 3000)
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '12px 0',
      }}
    >
      {/* Modern Smartphone Chassis */}
      <div
        style={{
          width: '100%',
          maxWidth: '280px',
          height: '470px',
          background: '#090d16',
          borderRadius: '36px',
          border: '5px solid #1e293b',
          boxShadow: '0 25px 50px -12px rgba(124, 58, 237, 0.25), 0 4px 16px rgba(0, 0, 0, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#f8fafc',
          fontFamily: "'Inter', system-ui, sans-serif",
          userSelect: 'none',
        }}
      >
        {/* Status Bar */}
        <div
          style={{
            padding: '8px 14px 4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#090d16',
            zIndex: 10,
            borderBottom: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <span style={{ fontSize: '10px', fontWeight: 800, color: '#94a3b8' }}>09:41</span>
          <div
            style={{
              width: '56px',
              height: '12px',
              background: '#020617',
              borderRadius: '12px',
              border: '1px solid #1e293b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: '6px',
            }}
          >
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#10b981' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#10b981', fontWeight: 700 }}>
            <span>⚡ SQLite</span>
          </div>
        </div>

        {/* Store Title Bar */}
        <div style={{ padding: '6px 12px', background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>🏪</span>
              <span>Kirana POS Terminal</span>
            </div>
            <span style={{ fontSize: '9px', background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
              Offline ✓
            </span>
          </div>
        </div>

        {/* Mini Tab Switcher */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '3px', padding: '6px 8px', background: '#090d16' }}>
          {[
            { id: 'pos', label: '⚡ POS Bill' },
            { id: 'udhaar', label: '📖 Udhaar' },
            { id: 'gst', label: '🧾 GST Inv' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: activeTab === t.id ? '#7c3aed' : 'rgba(255,255,255,0.05)',
                color: activeTab === t.id ? '#ffffff' : '#94a3b8',
                border: 'none',
                borderRadius: '6px',
                padding: '4px 2px',
                fontSize: '9px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Screen Content Body */}
        <div style={{ flex: 1, padding: '8px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {activeTab === 'pos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                onClick={handleScan}
                style={{
                  background: '#020617',
                  border: '1px dashed #7c3aed',
                  borderRadius: '8px',
                  padding: '8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '9px', color: '#a78bfa', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                  <span>📷</span>
                  <span>{scannedItem ? 'Scanned: Atta 5kg ✓' : 'Tap to Scan Barcode'}</span>
                </div>
                <div style={{ fontSize: '7.5px', color: '#64748b', marginTop: '2px' }}>
                  expo-camera live hardware decoder
                </div>
              </div>

              <div style={{ background: '#0f172a', borderRadius: '8px', padding: '6px 8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 700, marginBottom: '2px' }}>
                  <span>Aashirvaad Atta 5kg</span>
                  <span>₹240</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 700, marginBottom: '2px' }}>
                  <span>Fortune Mustard Oil 1L</span>
                  <span>₹160</span>
                </div>
                {scannedItem && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 700, color: '#34d399' }}>
                    <span>+ Tata Salt 1kg</span>
                    <span>₹28</span>
                  </div>
                )}
              </div>

              <button
                onClick={handlePrintInvoice}
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px',
                  fontSize: '9px',
                  fontWeight: 800,
                  cursor: 'pointer',
                }}
              >
                {invoicePrinted ? '✓ GST Bill Saved & Printed!' : '⚡ Fast Print & Multi-Format GST'}
              </button>
            </div>
          )}

          {activeTab === 'udhaar' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ background: '#0f172a', borderRadius: '8px', padding: '8px', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: '#f8fafc' }}>Rajesh Kumar</span>
                  <span style={{ fontSize: '8px', background: 'rgba(239,68,68,0.15)', color: '#f87171', padding: '1px 5px', borderRadius: '4px', fontWeight: 700 }}>
                    14 Days Overdue
                  </span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: 900, color: '#f87171', marginBottom: '4px' }}>
                  ₹2,450 Due
                </div>
                <button
                  onClick={handleSendReminder}
                  style={{
                    width: '100%',
                    background: reminderSent ? '#15803d' : '#16a34a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '6px',
                    fontSize: '8.5px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  {reminderSent ? '✓ UPI Deep Link Dispatched!' : '💬 1-Tap WhatsApp + Dynamic UPI'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'gst' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ background: '#0f172a', borderRadius: '8px', padding: '8px', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
                <div style={{ fontSize: '9px', fontWeight: 800, color: '#a78bfa', marginBottom: '4px' }}>
                  📄 GST INVOICE #GST-2026-084
                </div>
                <div style={{ fontSize: '8px', color: '#cbd5e1', lineHeight: 1.5, background: '#020617', padding: '6px', borderRadius: '6px', fontFamily: 'monospace' }}>
                  <div>HSN: 1001 · Taxable: ₹800.00</div>
                  <div style={{ color: '#34d399', fontWeight: 700 }}>Total: ₹840.00 (PAID)</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Home Indicator */}
        <div style={{ padding: '6px 12px 10px', background: '#090d16', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '50px', height: '3px', background: 'rgba(255, 255, 255, 0.25)', borderRadius: '3px' }} />
        </div>
      </div>
    </div>
  )
}

// ── Interactive n8n Workflow Pipeline Canvas ─────────────────────
function N8nWorkflowVisualizer() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    { name: 'Order Webhook', icon: '⚡', desc: 'Instant POST event from mobile/web app' },
    { name: 'Data Transform', icon: '⚙️', desc: 'JSON sanitization & automated GST split' },
    { name: 'Supabase Sync', icon: '🐘', desc: 'Atomic PostgreSQL commit (sub-12ms)' },
    { name: 'WhatsApp & Slack', icon: '💬', desc: '1-Tap UPI receipt + team dispatch alert' },
  ]

  return (
    <div
      style={{
        background: '#090d16',
        borderRadius: '20px',
        border: '1px solid #1e293b',
        padding: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>⚡</span>
          <div>
            <div style={{ fontSize: '14px', fontWeight: 900, color: '#f8fafc' }}>n8n Autonomous Orchestration Daemon</div>
            <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>34 Active Workflows · Zero Human Intervention</div>
          </div>
        </div>
        <span style={{ fontSize: '10px', background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '3px 8px', borderRadius: '12px', fontWeight: 800, fontFamily: 'monospace' }}>
          ● EXECUTING
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '10px' }}>
        {steps.map((step, idx) => (
          <div
            key={step.name}
            onClick={() => setActiveStep(idx)}
            style={{
              padding: '12px',
              borderRadius: '10px',
              background: activeStep === idx ? 'rgba(219, 39, 119, 0.15)' : '#0f172a',
              border: activeStep === idx ? '1px solid #db2777' : '1px solid #1e293b',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span>{step.icon}</span>
              <span style={{ fontSize: '12px', fontWeight: 800, color: '#ffffff' }}>{step.name}</span>
            </div>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>{step.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ background: '#020617', padding: '10px 14px', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace', color: '#38bdf8', display: 'flex', justifyContent: 'space-between' }}>
        <span>&gt; pipeline.status: PASS (0 errors across 8,400 daily triggers)</span>
        <span style={{ color: '#10b981' }}>Latency: 142ms</span>
      </div>
    </div>
  )
}

// ── Interactive Custom LLM Visualizer ────────────────────────────
function LlmAgentVisualizer() {
  const [query] = useState('Retrieve Q3 gross margins & reconcile unpaid invoices')
  const [isProcessing, setIsProcessing] = useState(false)
  const [tokens, setTokens] = useState('pgvector found 4 related chunks in 28ms · RAG guardrail confidence: 99.4%')

  const handleSimulate = () => {
    setIsProcessing(true)
    setTokens('Querying pgvector embeddings...')
    setTimeout(() => {
      setTokens('pgvector match: [Store #104 ledger: ₹42,580 settled, ₹2,450 pending]. Synthesis complete (184 tokens @ 48 t/s).')
      setIsProcessing(false)
    }, 1200)
  }

  return (
    <div
      style={{
        background: '#090d16',
        borderRadius: '20px',
        border: '1.5px solid #0284c7',
        padding: '26px',
        boxShadow: '0 20px 40px rgba(2, 132, 199, 0.15)',
        color: '#ffffff',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '12px', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#38bdf8' }}>Custom AI Agent & Vector RAG Engine</div>
          <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>Llama-3-70B · pgvector · Private VPC Deployment</div>
        </div>
        <span style={{ fontSize: '10.5px', background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', padding: '3px 8px', borderRadius: '4px', fontWeight: 800, fontFamily: 'monospace' }}>
          LOCAL INFERENCE
        </span>
      </div>

      <div style={{ background: '#020617', borderRadius: '10px', border: '1px solid #1e293b', padding: '12px', marginBottom: '14px' }}>
        <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace', marginBottom: '4px' }}>INPUT QUERY TO DOMAIN AGENT:</div>
        <div style={{ fontSize: '13px', color: '#f8fafc', fontWeight: 700 }}>"{query}"</div>
      </div>

      <div style={{ background: 'rgba(2, 132, 199, 0.08)', borderRadius: '10px', border: '1px solid rgba(2, 132, 199, 0.25)', padding: '14px', fontFamily: 'monospace', fontSize: '12px', color: '#38bdf8', marginBottom: '16px' }}>
        <div style={{ color: '#94a3b8', fontSize: '10px', marginBottom: '4px' }}>AGENT REASONING & SYNTHESIS:</div>
        <div>{tokens}</div>
      </div>

      <button
        onClick={handleSimulate}
        disabled={isProcessing}
        style={{
          background: 'linear-gradient(135deg, #0284c7, #0369a1)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          padding: '10px 18px',
          fontSize: '12.5px',
          fontWeight: 800,
          cursor: isProcessing ? 'not-allowed' : 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span>{isProcessing ? '⚡ Processing Vector Chunks...' : '⚡ Test Agent Query Stream'}</span>
      </button>
    </div>
  )
}

// ── Interactive Hardware Workbench Visualizer ────────────────────
function HardwareIotVisualizer() {
  const [activeTab, setActiveTab] = useState('iot')
  const [relayOn, setRelayOn] = useState(false)
  const [temp, setTemp] = useState(24.7)

  useEffect(() => {
    const t = setInterval(() => {
      setTemp((prev) => parseFloat((prev + (Math.random() - 0.5) * 0.2).toFixed(1)))
    }, 2500)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ width: '100%', color: '#0f172a' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => setActiveTab('iot')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'iot' ? '1.5px solid #10b981' : '1px solid #e2e8f0',
            background: activeTab === 'iot' ? '#10b981' : '#f8fafc',
            color: activeTab === 'iot' ? '#ffffff' : '#475569',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          🔌 ESP32 Microcontroller & Sensors
        </button>
        <button
          onClick={() => setActiveTab('gpu')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: activeTab === 'gpu' ? '1.5px solid #10b981' : '1px solid #e2e8f0',
            background: activeTab === 'gpu' ? '#10b981' : '#f8fafc',
            color: activeTab === 'gpu' ? '#ffffff' : '#475569',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          🖥️ Bespoke GPU AI Workstation
        </button>
      </div>

      {activeTab === 'iot' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace', fontWeight: 700 }}>DHT22 CLIMATE</div>
              <div style={{ fontSize: '17px', fontWeight: 900, color: '#10b981', marginTop: '2px' }}>{temp}°C</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace', fontWeight: 700 }}>VL53L0X TOF</div>
              <div style={{ fontSize: '17px', fontWeight: 900, color: '#0284c7', marginTop: '2px' }}>382 mm</div>
            </div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace', fontWeight: 700 }}>RELAY PIN 12</div>
              <div style={{ fontSize: '17px', fontWeight: 900, color: relayOn ? '#10b981' : '#ef4444', marginTop: '2px' }}>{relayOn ? 'CLOSED' : 'OPEN'}</div>
            </div>
          </div>

          <div style={{ background: '#090d16', padding: '14px', borderRadius: '10px', border: '1px solid #1e293b', fontSize: '11.5px', fontFamily: 'monospace', color: '#94a3b8' }}>
            <div style={{ color: '#10b981' }}>&gt; I2C Bus @ 400kHz: VL53L0X (0x29) + DHT22 ACK ✓</div>
            <div>&gt; MQTT Broker: Connected to hivemq.cloud over TLS</div>
            <div style={{ color: relayOn ? '#10b981' : '#f59e0b', marginTop: '4px' }}>
              &gt; Hardware Relay state: {relayOn ? 'ACTIVE (Power delivered)' : 'STANDBY'}
            </div>
          </div>

          <button
            onClick={() => setRelayOn((prev) => !prev)}
            style={{
              background: relayOn ? '#ef4444' : '#10b981',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '12.5px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: relayOn ? '0 4px 14px rgba(239, 68, 68, 0.3)' : '0 4px 14px rgba(16, 185, 129, 0.3)',
            }}
          >
            {relayOn ? '⚡ Deactivate Relay Pin 12' : '⚡ Trigger Hardware Relay Pin 12 (Live Test)'}
          </button>
        </div>
      ) : (
        <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1.5px solid #e2e8f0', padding: '18px', fontFamily: 'monospace', fontSize: '12px' }}>
          <div style={{ color: '#059669', fontWeight: 800, marginBottom: '8px' }}>[BESPOKE GPU AI WORKSTATION RIG]</div>
          <div style={{ color: '#334155', lineHeight: 1.8 }}>
            <div>• CPU: AMD Ryzen 9 7950X (16-Core / 32-Thread @ 5.7GHz)</div>
            <div>• GPU: Dual Nvidia RTX 4090 (48GB Total VRAM · CUDA 12.4)</div>
            <div>• RAM: 128GB DDR5 6000MHz Low-Latency ECC</div>
            <div>• Cooling: Custom 360mm Triple-Fan Liquid Loop · Zero Throttling</div>
          </div>
          <div style={{ color: '#0284c7', marginTop: '10px', fontWeight: 700 }}>
            ⚡ Benchmarked for On-Premise Llama-3-70B, 3D CAD & Local AI Compute
          </div>
        </div>
      )}
    </div>
  )
}

export default function Services() {
  const { openBookingModal } = useKeyboardContext()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 150)
      }
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', color: '#0f172a', paddingBottom: '100px' }}>
      
      {/* ── SECTION 1: HERO ── */}
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
        <HeroCodeAmbiance preset="services" />

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
            <span>FULL-STACK WEB · OFFLINE MOBILE · AI · HARDWARE</span>
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
            Engineering Capabilities. Cloud to Chip.
          </h1>

          <p
            style={{
              color: '#475569',
              fontSize: 'clamp(16px, 2vw, 19px)',
              lineHeight: 1.6,
              maxWidth: '720px',
              margin: '0 auto',
              fontWeight: 500,
            }}
          >
            We build high-performance web platforms, offline mobile apps, autonomous AI pipelines, and bespoke hardware in-house.
          </p>
        </div>
      </section>

      {/* ── 1. WEBSITE DEVELOPMENT (FIRST) ── */}
      <section
        id="web"
        style={{
          maxWidth: '1200px',
          margin: '0 auto 50px',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '2px solid #ff5733',
            padding: '40px 36px',
            boxShadow: '0 20px 50px rgba(255, 87, 51, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: '36px',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ background: '#ff5733', color: '#ffffff', fontSize: '10.5px', fontWeight: 900, fontFamily: 'monospace', padding: '3px 10px', borderRadius: '4px' }}>
                SERVICE 01
              </span>
              <span style={{ color: '#64748b', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700 }}>
                HIGH-THROUGHPUT WEB & SAAS
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: '#0f172a', marginBottom: '14px', letterSpacing: '-0.5px' }}>
              Website Development & Full-Stack SaaS Platforms
            </h2>

            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
              We build what your business needs — performant, beautiful, and conversion-optimized. From high-converting marketing engines to complex multi-tenant SaaS platforms, we architect with Next.js 15, React 19, and edge CDN delivery for sub-second speeds.
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {['Next.js 15 App Router', 'React 19', 'Tailwind CSS', 'PostgreSQL 16', 'Stripe Subscriptions', 'Sub-Second Edge'].map((t) => (
                <span key={t} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', fontSize: '11.5px', padding: '4px 10px', borderRadius: '6px', fontFamily: 'monospace', fontWeight: 700 }}>
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={openBookingModal}
              className="btn-glow"
              style={{
                padding: '14px 28px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
                color: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>Build a Custom Web Platform</span>
              <span>→</span>
            </button>
          </div>

          {/* Third Eye Live Preview */}
          <div
            style={{
              background: '#0f172a',
              borderRadius: '18px',
              border: '1px solid #334155',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
            }}
          >
            <div style={{ background: '#1e293b', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'monospace' }}>🔒 https://thirdeye.fun/ (Live Client Platform)</span>
              <a href="https://thirdeye.fun/" target="_blank" rel="noopener noreferrer" style={{ background: '#ff5733', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px', textDecoration: 'none' }}>
                Visit Live ↗
              </a>
            </div>
            <iframe src="https://thirdeye.fun/" title="Third Eye Client Showcase" style={{ width: '100%', height: '260px', border: 'none', display: 'block' }} />
          </div>
        </div>
      </section>

      {/* ── 2. MOBILE APP DEVELOPMENT (SECOND) ── */}
      <section
        id="mobile"
        style={{
          maxWidth: '1200px',
          margin: '0 auto 50px',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '2px solid #7c3aed',
            padding: '40px 36px',
            boxShadow: '0 20px 50px rgba(124, 58, 237, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: '36px',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ background: '#7c3aed', color: '#ffffff', fontSize: '10.5px', fontWeight: 900, fontFamily: 'monospace', padding: '3px 10px', borderRadius: '4px' }}>
                SERVICE 02
              </span>
              <span style={{ color: '#64748b', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700 }}>
                NATIVE & CROSS-PLATFORM
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: '#0f172a', marginBottom: '14px', letterSpacing: '-0.5px' }}>
              Mobile App Development (iOS & Android)
            </h2>

            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
              Seamless native user experiences on iOS and Android built with React Native (Expo 51). Engineered for offline SQLite capability, optical camera barcode decoding, instant WhatsApp collection deep-links, and background cloud synchronization.
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {['React Native (Expo 51)', 'Offline SQLite Database', 'expo-camera Barcode POS', '1-Tap WhatsApp Collections', 'Indian GST Engine'].map((t) => (
                <span key={t} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', fontSize: '11.5px', padding: '4px 10px', borderRadius: '6px', fontFamily: 'monospace', fontWeight: 700 }}>
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={openBookingModal}
              style={{
                background: '#7c3aed',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(124, 58, 237, 0.35)',
              }}
            >
              Start Mobile App Build →
            </button>
          </div>

          <KiranaPhoneSimulator />
        </div>
      </section>

      {/* ── 3. CUSTOM LLMS & AI MULTI-AGENTS (THIRD) ── */}
      <section
        id="llm"
        style={{
          maxWidth: '1200px',
          margin: '0 auto 50px',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '2px solid #0284c7',
            padding: '40px 36px',
            boxShadow: '0 15px 40px rgba(2, 132, 199, 0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
            gap: '40px',
            alignItems: 'center',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ background: '#0284c7', color: '#ffffff', fontSize: '10.5px', fontWeight: 900, fontFamily: 'monospace', padding: '3px 10px', borderRadius: '4px' }}>
                SERVICE 03
              </span>
              <span style={{ color: '#64748b', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700 }}>
                ENTERPRISE VECTOR RAG & AGENTS
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.5px' }}>
              Custom LLMs, Vector RAG & Autonomous Reasoning Agents
            </h2>

            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
              Turn generative AI into real business ROI. We architect domain-specific RAG retrieval pipelines over internal databases, fine-tune open-weights models (Llama 3, Mistral), and deploy autonomous multi-agent reasoning systems with zero-hallucination guardrails.
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {['pgvector Postgres', 'LangChain / LlamaIndex', 'Llama 3 70B', 'Private VPC Inference', 'Sub-100ms Search'].map((t) => (
                <span key={t} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#0f172a', padding: '4px 10px', borderRadius: '6px', fontSize: '11.5px', fontFamily: 'monospace', fontWeight: 700 }}>
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={openBookingModal}
              style={{
                background: '#0284c7',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '14px 28px',
                fontSize: '14px',
                fontWeight: 900,
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(2, 132, 199, 0.35)',
              }}
            >
              Scope AI Agent Architecture →
            </button>
          </div>

          <LlmAgentVisualizer />
        </div>
      </section>

      {/* ── 4. N8N WORKFLOW AUTOMATION (FOURTH) ── */}
      <section
        id="automation"
        style={{
          maxWidth: '1200px',
          margin: '0 auto 50px',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '2px solid #db2777',
            padding: '40px 36px',
            boxShadow: '0 15px 40px rgba(219, 39, 119, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ background: '#db2777', color: '#ffffff', fontSize: '10.5px', fontWeight: 900, fontFamily: 'monospace', padding: '3px 10px', borderRadius: '4px' }}>
                SERVICE 04
              </span>
              <span style={{ color: '#64748b', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700 }}>
                N8N ORCHESTRATION PIPELINES
              </span>
            </div>

            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.15, marginBottom: '14px', letterSpacing: '-0.5px' }}>
              Autonomous Business Process Automations
            </h2>

            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7, maxWidth: '820px' }}>
              Eliminate repetitive operational tasks with self-healing n8n pipelines: real-time webhook listeners, automated Stripe/UPI invoice reconciliation, and instant Slack/WhatsApp alerts with zero human delay.
            </p>
          </div>

          <N8nWorkflowVisualizer />
        </div>
      </section>

      {/* ── 5. HARDWARE & GPU COMPUTE RIGS ── */}
      <section
        id="hardware"
        style={{
          maxWidth: '1200px',
          margin: '0 auto 60px',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '2px solid #10b981',
            padding: '40px 36px',
            boxShadow: '0 20px 50px rgba(16, 185, 129, 0.08)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: '40px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span style={{ background: '#10b981', color: '#ffffff', fontSize: '10.5px', fontWeight: 900, fontFamily: 'monospace', padding: '3px 10px', borderRadius: '4px' }}>
                  SERVICE 05
                </span>
                <span style={{ color: '#64748b', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700 }}>
                  EMBEDDED SYSTEMS & GPU BUILDS
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.15, marginBottom: '16px', letterSpacing: '-0.5px' }}>
                IoT, Microcontrollers & Custom GPU AI Compute Rigs
              </h2>

              <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                We bridge physical hardware with cloud intelligence. Our hardware engineers design custom ESP32/Arduino microcontroller firmware, sensor arrays (ToF laser, climate, ultrasonic), and assemble custom liquid-cooled GPU compute rigs for local LLM inference.
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                {['ESP32-WROOM', 'Arduino C++', 'VL53L0X Laser ToF', 'MQTT TLS 8883', 'Dual RTX 4090 Rigs', '360mm Liquid Loop'].map((t) => (
                  <span key={t} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', padding: '4px 10px', borderRadius: '6px', fontSize: '11.5px', fontFamily: 'monospace', fontWeight: 700 }}>
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={openBookingModal}
                style={{
                  background: '#10b981',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '14px 28px',
                  fontSize: '14px',
                  fontWeight: 900,
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.35)',
                }}
              >
                Request Custom Hardware Build →
              </button>
            </div>

            {/* Hardware Live Workbench UI */}
            <HardwareIotVisualizer />
          </div>
        </div>
      </section>

      {/* ── CLOSING SECTION: TECHNICAL ARCHITECTURE & FIXED SCOPING ── */}
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
          boxShadow: '0 25px 50px rgba(15, 23, 42, 0.3)',
        }}
      >
        <span style={{ color: '#10b981', fontSize: '11px', fontWeight: 900, fontFamily: 'monospace', letterSpacing: '2px' }}>
          FIXED 4-WEEK SPRINT DELIVERY
        </span>

        <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#ffffff', marginTop: '10px', marginBottom: '16px', letterSpacing: '-0.8px' }}>
          Have a Complex Software or Hardware Problem?
        </h2>

        <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '580px', margin: '0 auto 32px', lineHeight: 1.6 }}>
          Book a 15-minute technical discovery call directly with our engineering lead. We'll map your system architecture, define deliverables, and provide a fixed-price 4-week proposal with 100% IP ownership.
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
