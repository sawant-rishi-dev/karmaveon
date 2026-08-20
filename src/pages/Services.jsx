import { useState } from 'react'

const SERVICES = [
  {
    id: 'web',
    icon: '🌐',
    title: 'Website Development',
    tagline: 'From landing pages to full-scale web applications',
    desc: 'We build what your business needs — performant, beautiful, and conversion-optimized. From high-converting marketing sites to complex SaaS platforms, we architect with modern stacks.',
    accentColor: '#ff5733',
    features: ['React / Next.js', 'SEO Optimized', 'Mobile First', 'CMS Integration', 'Sub-Second Speed'],
    showcase: {
      url: 'https://thirdeye.fun/',
      title: 'Third Eye — Production Client Showcase',
      desc: 'High-impact web application engineered for maximum user engagement and performance.',
    },
  },
  {
    id: 'mobile',
    icon: '📱',
    title: 'Mobile App Development',
    tagline: 'Native & cross-platform apps that deliver',
    desc: 'Seamless user experiences on iOS and Android. We design and develop mobile apps that users love — with smooth performance, offline SQLite capability, and pixel-perfect UI from day one.',
    accentColor: '#7c3aed',
    features: ['React Native (Expo 51)', 'iOS & Android', 'Offline SQLite Sync', '1-Tap WhatsApp Collections', 'Indian GST Engine'],
    phoneSimulator: true,
  },
  {
    id: 'automation',
    icon: '⚡',
    title: 'n8n Workflow Automation',
    tagline: 'Repetitive tasks? We kill them',
    desc: 'Automate your business processes end-to-end with n8n workflows. Free your team from manual work and let intelligent automation handle data pipelines, emails, CRMs, and real-time syncing.',
    accentColor: '#db2777',
    features: ['n8n Workflows', 'API Integrations', 'Webhook Triggers', 'Error Handling & Retries', 'Zero-Code Maintenance'],
    automationCanvas: true,
  },
  {
    id: 'llm',
    icon: '🧠',
    title: 'Custom LLMs & AI Agents',
    tagline: 'Enterprise RAG, Fine-Tuning & Multi-Agent Systems',
    desc: 'Turn generative AI into real business ROI. We architect domain-specific LLM pipelines, autonomous multi-agent reasoning workflows, semantic search (RAG) over proprietary data, and fine-tuned models with strict enterprise guardrails.',
    accentColor: '#0284c7',
    features: ['Custom RAG Pipelines', 'Autonomous Multi-Agents', 'Fine-Tuning (Llama 3 / Mistral)', 'Vector DBs (pgvector / Qdrant)', 'Zero-Hallucination Guardrails'],
    llmVisualizer: true,
  },
  {
    id: 'hardware',
    icon: '🔌',
    title: 'IoT, Arduino & Custom Hardware Engineering',
    tagline: 'Embedded Systems, Custom PC Builds & Sensor Telemetry',
    desc: 'Our engineering team designs and builds custom hardware tailored for your requirements: from Arduino and ESP32 microcontroller setups, smart sensors, and IoT cloud telemetry to bespoke high-performance PC workstation builds and GPU rigs for local AI compute.',
    accentColor: '#059669',
    features: ['Arduino & ESP32 Microcontrollers', 'Custom Sensor Arrays & PCB Prototyping', 'Real-Time MQTT Cloud Telemetry', 'Bespoke Workstation & GPU Rig Builds', 'Embedded Firmware & Hardware-Cloud Sync'],
    hardwareVisualizer: true,
  },
]

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
          maxWidth: '260px',
          height: '460px',
          background: '#090d16',
          borderRadius: '36px',
          border: '5px solid #1e293b',
          boxShadow: '0 25px 50px -12px rgba(124, 58, 237, 0.22), 0 4px 16px rgba(0, 0, 0, 0.2)',
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
        {/* Dynamic Island / Status Bar */}
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
          {/* Pill notch */}
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
              gap: '4px',
            }}
          >
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#10b981' }} />
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#334155' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#10b981', fontWeight: 700 }}>
            <span>⚡ SQLite</span>
          </div>
        </div>

        {/* Store Title Bar & Auth Indicator */}
        <div style={{ padding: '6px 12px', background: '#0f172a', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>🏪</span>
              <span>Sharma Kirana POS</span>
            </div>
            <span style={{ fontSize: '9px', background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
              PIN Auth ✓
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: '#94a3b8' }}>
            <span>React Native · Expo 51</span>
            <span style={{ color: '#38bdf8' }}>☁️ Supabase Cloud</span>
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
          {/* ── TAB 1: OFFLINE-FIRST POS & BARCODE ── */}
          {activeTab === 'pos' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {/* Barcode Camera Scanner Viewfinder */}
              <div
                onClick={handleScan}
                style={{
                  background: '#020617',
                  border: '1px dashed #7c3aed',
                  borderRadius: '8px',
                  padding: '8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  position: 'relative',
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

              {/* Scanned Cart Items */}
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 700, color: '#34d399', animation: 'fadeIn 0.2s ease' }}>
                    <span>+ Tata Salt 1kg</span>
                    <span>₹28</span>
                  </div>
                )}
              </div>

              {/* GST Tax Calculation Engine */}
              <div style={{ background: '#1e293b', borderRadius: '8px', padding: '6px 8px', fontSize: '8.5px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', marginBottom: '2px' }}>
                  <span>Subtotal (SQLite):</span>
                  <span>{scannedItem ? '₹428.00' : '₹400.00'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a78bfa', marginBottom: '2px' }}>
                  <span>CGST (2.5%) + SGST (2.5%):</span>
                  <span>{scannedItem ? '₹21.40' : '₹20.00'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: '#f8fafc', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '3px', marginTop: '2px' }}>
                  <span>Grand Total:</span>
                  <span style={{ color: '#34d399' }}>{scannedItem ? '₹449.40' : '₹420.00'}</span>
                </div>
              </div>

              {/* Fast POS Action */}
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
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
                }}
              >
                {invoicePrinted ? '✓ GST Bill Saved & Printed!' : '⚡ Fast Print & Multi-Format GST'}
              </button>
            </div>
          )}

          {/* ── TAB 2: UDHAAR LEDGER & 1-TAP WHATSAPP ── */}
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
                <div style={{ fontSize: '7.5px', color: '#94a3b8', marginBottom: '6px' }}>
                  Last transaction: 08 Aug (Offline SQLite sync)
                </div>

                {/* 1-Tap WhatsApp Trigger */}
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <span>💬</span>
                  <span>{reminderSent ? '✓ UPI Deep Link Dispatched!' : '1-Tap WhatsApp + Dynamic UPI'}</span>
                </button>
              </div>

              {/* Second customer */}
              <div style={{ background: '#0f172a', borderRadius: '8px', padding: '6px 8px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: 700 }}>
                  <span>Vikas Sharma</span>
                  <span style={{ color: '#34d399' }}>₹320 (Paid ✓)</span>
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 3: MULTI-FORMAT GST INVOICE ENGINE ── */}
          {activeTab === 'gst' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ background: '#0f172a', borderRadius: '8px', padding: '8px', border: '1px solid rgba(124, 58, 237, 0.3)' }}>
                <div style={{ fontSize: '9px', fontWeight: 800, color: '#a78bfa', marginBottom: '4px' }}>
                  📄 GST INVOICE #GST-2026-084
                </div>
                <div style={{ fontSize: '8px', color: '#cbd5e1', lineHeight: 1.5, background: '#020617', padding: '6px', borderRadius: '6px', fontFamily: 'monospace' }}>
                  <div>HSN: 1001 · Rate: 5%</div>
                  <div>Taxable Value: ₹800.00</div>
                  <div>CGST (2.5%): ₹20.00</div>
                  <div>SGST (2.5%): ₹20.00</div>
                  <div style={{ color: '#34d399', fontWeight: 700 }}>Total: ₹840.00 (PAID)</div>
                </div>
                <div style={{ display: 'flex', gap: '4px', marginTop: '6px' }}>
                  <span style={{ flex: 1, textAlign: 'center', background: '#1e293b', padding: '3px', borderRadius: '4px', fontSize: '7.5px', color: '#94a3b8' }}>
                    🖨️ Thermal 3"
                  </span>
                  <span style={{ flex: 1, textAlign: 'center', background: '#1e293b', padding: '3px', borderRadius: '4px', fontSize: '7.5px', color: '#94a3b8' }}>
                    📑 A4 PDF
                  </span>
                </div>
              </div>

              {/* Micro-SaaS Model Tag */}
              <div style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '6px', padding: '5px 8px', fontSize: '7.5px', color: '#c4b5fd' }}>
                💎 Micro-SaaS Model · Unlimited Invoices Active
              </div>
            </div>
          )}
        </div>

        {/* Phone Bottom Home Bar & Sync Pulse */}
        <div style={{ padding: '6px 12px 10px', background: '#090d16', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '8px', color: '#64748b' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981' }} />
            <span>Local SQLite ⇄ Supabase Cloud Live</span>
          </div>
          <div
            style={{
              width: '50px',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.25)',
              borderRadius: '3px',
            }}
          />
        </div>
      </div>
    </div>
  )
}

// ── Interactive n8n Workflow Pipeline Canvas ─────────────────────
function N8nWorkflowVisualizer() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    { name: 'Order Webhook', icon: '⚡', desc: 'Instant trigger from app' },
    { name: 'Data Transform', icon: '⚙️', desc: 'JSON parsing & GST calc' },
    { name: 'Supabase Sync', icon: '🐘', desc: 'Atomic Postgres transaction' },
    { name: 'WhatsApp Alert', icon: '💬', desc: '1-Tap UPI receipt sent' },
  ]

  return (
    <div
      style={{
        background: '#0f172a',
        borderRadius: '20px',
        border: '1px solid rgba(219, 39, 119, 0.3)',
        padding: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>⚡</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>n8n Real-Time Automation Pipeline</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Zero human error · Sub-second execution</div>
          </div>
        </div>
        <span style={{ fontSize: '10px', background: 'rgba(16,185,129,0.15)', color: '#34d399', padding: '2px 8px', borderRadius: '12px', fontWeight: 800 }}>
          ● LIVE
        </span>
      </div>

      {/* Nodes Flow */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {steps.map((step, idx) => (
          <div
            key={step.name}
            onClick={() => setActiveStep(idx)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              borderRadius: '10px',
              background: activeStep === idx ? 'rgba(219, 39, 119, 0.15)' : '#1e293b',
              border: activeStep === idx ? '1px solid #db2777' : '1px solid rgba(255,255,255,0.06)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '16px' }}>{step.icon}</span>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc' }}>{step.name}</div>
                <div style={{ fontSize: '10px', color: '#94a3b8' }}>{step.desc}</div>
              </div>
            </div>
            <span style={{ fontSize: '11px', color: '#34d399', fontWeight: 800 }}>
              {activeStep === idx ? '⚡ Active' : '✓ Ready'}
            </span>
          </div>
        ))}
      </div>

      {/* Footer Metrics */}
      <div style={{ display: 'flex', justifyContent: 'space-between', background: '#020617', padding: '10px 14px', borderRadius: '10px', fontSize: '11px' }}>
        <span style={{ color: '#94a3b8' }}>Average Pipeline Latency:</span>
        <span style={{ color: '#38bdf8', fontWeight: 800 }}>18ms (99.99% Uptime)</span>
      </div>
    </div>
  )
}

// ── Interactive Custom LLM & AI Agents Visualizer ────────────────
function LlmAgentVisualizer() {
  const [isRunning, setIsRunning] = useState(false)
  const [activeStep, setActiveStep] = useState(2)

  const handleRunAgent = () => {
    setIsRunning(true)
    setActiveStep(0)
    setTimeout(() => setActiveStep(1), 700)
    setTimeout(() => setActiveStep(2), 1400)
    setTimeout(() => setIsRunning(false), 2000)
  }

  return (
    <div
      style={{
        background: '#090d16',
        borderRadius: '20px',
        border: '1px solid rgba(2, 132, 199, 0.35)',
        padding: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🧠</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>Autonomous LLM Agent Reasoning</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>RAG Engine + Strict Enterprise Guardrails</div>
          </div>
        </div>
        <span style={{ fontSize: '10px', background: 'rgba(2,132,199,0.2)', color: '#38bdf8', padding: '2px 8px', borderRadius: '12px', fontWeight: 800 }}>
          Llama-3 / Claude
        </span>
      </div>

      {/* User Query Prompt Box */}
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '10px 12px' }}>
        <div style={{ fontSize: '9px', color: '#0284c7', fontWeight: 800, textTransform: 'uppercase', marginBottom: '2px' }}>
          USER GOAL / AGENT TASK:
        </div>
        <div style={{ fontSize: '11px', color: '#f1f5f9', fontWeight: 600 }}>
          "Analyze 14-day Khata balances, detect revenue leaks, and draft 1-tap WhatsApp collections."
        </div>
      </div>

      {/* Reasoning Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {[
          { label: '1. Semantic Vector Search', detail: 'Fetched 8 relevant ledger vectors from pgvector' },
          { label: '2. Multi-Agent Reasoning', detail: 'Cross-validated GST compliance with local SQLite DB' },
          { label: '3. Zero-Hallucination Guardrail', detail: '100% verified citation & UPI deep-link generation' },
        ].map((step, idx) => (
          <div
            key={step.label}
            style={{
              padding: '6px 10px',
              borderRadius: '8px',
              background: activeStep >= idx ? 'rgba(2, 132, 199, 0.12)' : '#0f172a',
              border: activeStep >= idx ? '1px solid rgba(2, 132, 199, 0.4)' : '1px solid rgba(255,255,255,0.04)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: activeStep >= idx ? '#38bdf8' : '#64748b' }}>
                {step.label}
              </div>
              <div style={{ fontSize: '9px', color: '#94a3b8' }}>{step.detail}</div>
            </div>
            <span style={{ fontSize: '11px', color: activeStep >= idx ? '#34d399' : '#475569', fontWeight: 800 }}>
              {activeStep >= idx ? '✓' : '...'}
            </span>
          </div>
        ))}
      </div>

      {/* Output preview */}
      <div style={{ background: '#020617', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
          <span style={{ fontSize: '9px', color: '#34d399', fontWeight: 800 }}>⚡ STRUCTURED OUTPUT READY:</span>
          <span style={{ fontSize: '9px', color: '#64748b' }}>Confidence: 99.8%</span>
        </div>
        <div style={{ fontSize: '10px', color: '#cbd5e1', lineHeight: 1.5, fontFamily: 'monospace' }}>
          ✓ Generated personalized WhatsApp dispatch for ₹2,450 balance with encoded UPI intent deep-link.
        </div>
      </div>

      {/* Action Trigger */}
      <button
        onClick={handleRunAgent}
        disabled={isRunning}
        style={{
          background: isRunning ? '#0284c7' : 'linear-gradient(135deg, #0284c7, #0369a1)',
          color: '#ffffff',
          border: 'none',
          borderRadius: '10px',
          padding: '9px',
          fontSize: '11px',
          fontWeight: 800,
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
          transition: 'all 0.2s ease',
        }}
      >
        {isRunning ? '⚡ Executing LLM Agent Pipeline...' : '⚡ Test Run Autonomous Agent'}
      </button>
    </div>
  )
}

// ── Interactive IoT, Arduino & Custom Hardware Visualizer ────────
function HardwareIotVisualizer() {
  const [relayOn, setRelayOn] = useState(false)
  const [temp, setTemp] = useState(24.6)
  const [activeTab, setActiveTab] = useState('iot')

  const toggleRelay = () => {
    setRelayOn(!relayOn)
    setTemp(prev => Number((prev + (relayOn ? -0.4 : 0.8)).toFixed(1)))
  }

  return (
    <div
      style={{
        background: '#090d16',
        borderRadius: '20px',
        border: '1px solid rgba(5, 150, 105, 0.35)',
        padding: '24px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.18)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>🔌</span>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: '#f8fafc' }}>Custom Hardware & Embedded Hub</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>Arduino · ESP32 · Custom PC Builds</div>
          </div>
        </div>
        <span style={{ fontSize: '10px', background: 'rgba(5,150,105,0.2)', color: '#34d399', padding: '2px 8px', borderRadius: '12px', fontWeight: 800 }}>
          ⚡ 115200 BAUD LIVE
        </span>
      </div>

      {/* Mode Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        <button
          onClick={() => setActiveTab('iot')}
          style={{
            background: activeTab === 'iot' ? '#059669' : '#0f172a',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '6px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          📡 Arduino & IoT Sensors
        </button>
        <button
          onClick={() => setActiveTab('pc')}
          style={{
            background: activeTab === 'pc' ? '#059669' : '#0f172a',
            color: '#ffffff',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '6px',
            borderRadius: '8px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          🖥️ Custom PC & GPU Builds
        </button>
      </div>

      {activeTab === 'iot' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Live Sensor Telemetry Gauges */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 700 }}>DHT22 TEMP</div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#34d399', marginTop: '2px' }}>{temp}°C</div>
            </div>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 700 }}>PRESSURE</div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: '#38bdf8', marginTop: '2px' }}>1014 hPa</div>
            </div>
            <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px', padding: '8px', textAlign: 'center' }}>
              <div style={{ fontSize: '8px', color: '#94a3b8', fontWeight: 700 }}>RELAY PIN #12</div>
              <div style={{ fontSize: '15px', fontWeight: 900, color: relayOn ? '#10b981' : '#64748b', marginTop: '2px' }}>
                {relayOn ? 'ON' : 'OFF'}
              </div>
            </div>
          </div>

          {/* Pinout Status */}
          <div style={{ background: '#020617', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', fontSize: '10px', fontFamily: 'monospace', color: '#cbd5e1', lineHeight: 1.5 }}>
            <div style={{ color: '#34d399' }}>[ESP32 FIRMWARE] WiFi connected to MQTT broker ✓</div>
            <div>[ADC 34] Analog input stream: 2.84V stable</div>
            <div>[GPIO 12] Hardware switch state: {relayOn ? 'ACTIVE (Relay Closed)' : 'STANDBY (Open)'}</div>
          </div>

          {/* Hardware Toggle Action */}
          <button
            onClick={toggleRelay}
            style={{
              background: relayOn ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #059669, #047857)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '10px',
              padding: '9px',
              fontSize: '11px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(5, 150, 105, 0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            {relayOn ? '⚡ Deactivate Arduino Relay Pin #12' : '⚡ Trigger Arduino Relay Pin #12 (Live Test)'}
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Custom PC Specs Box */}
          <div style={{ background: '#0f172a', borderRadius: '10px', border: '1px solid #1e293b', padding: '12px' }}>
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#f8fafc', marginBottom: '6px' }}>
              🖥️ Bespoke High-Performance PC Rig Build
            </div>
            <div style={{ fontSize: '10px', color: '#cbd5e1', lineHeight: 1.6, fontFamily: 'monospace' }}>
              <div>• CPU: AMD Ryzen 9 7950X (16 Cores / 32 Threads)</div>
              <div>• GPU: Dual Nvidia RTX 4090 24GB (AI Compute Rig)</div>
              <div>• Memory: 128GB DDR5 6000MHz Low-Latency</div>
              <div>• Cooling: Custom 360mm Liquid Loop · Zero Noise</div>
            </div>
          </div>
          <div style={{ background: '#020617', padding: '8px 12px', borderRadius: '8px', fontSize: '10px', color: '#38bdf8', fontWeight: 700 }}>
            ⚡ Benchmarked for Local LLMs, 3D Rendering & High-FPS Workstations
          </div>
        </div>
      )}
    </div>
  )
}

export default function Services() {
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
          We specialize in building custom software and hardware technology solutions that solve real business problems and scale as you grow.
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
          gap: '40px',
        }}
      >
        {SERVICES.map((service, idx) => (
          <div
            key={service.title}
            className="glass service-card"
            style={{
              padding: '40px',
              borderRadius: '24px',
              background: '#ffffff',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              boxShadow: '0 12px 36px rgba(0, 0, 0, 0.04)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
              gap: '40px',
              alignItems: 'center',
            }}
          >
            {/* Left Side: Content & Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Tagline Badge */}
              <div>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 14px',
                    borderRadius: '100px',
                    background: `${service.accentColor}15`,
                    border: `1px solid ${service.accentColor}40`,
                    color: service.accentColor,
                    fontSize: '11px',
                    letterSpacing: '1px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                  }}
                >
                  <span>{service.icon}</span>
                  <span>{service.tagline}</span>
                </span>
              </div>

              {/* Title */}
              <h2 style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.15 }}>
                {service.title}
              </h2>

              {/* Description */}
              <p style={{ color: '#475569', fontSize: '16px', lineHeight: 1.7 }}>
                {service.desc}
              </p>

              {/* Feature Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                {service.features.map((f) => (
                  <span
                    key={f}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '8px',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      color: '#334155',
                      fontSize: '12px',
                      fontWeight: 700,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Side: Visual Showcase (Browser / Smartphone / Automation Canvas / LLM Visualizer / Hardware Visualizer) */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              {/* Case 1: Website Browser Showcase */}
              {service.showcase && (
                <div
                  style={{
                    background: '#0f172a',
                    borderRadius: '18px',
                    border: '1px solid rgba(255, 87, 51, 0.3)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    overflow: 'hidden',
                    width: '100%',
                    maxWidth: '520px',
                  }}
                >
                  {/* Browser Bar */}
                  <div
                    style={{
                      background: '#1e293b',
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid #334155',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                    </div>

                    <div
                      style={{
                        background: '#0f172a',
                        borderRadius: '20px',
                        padding: '4px 14px',
                        fontSize: '11px',
                        color: '#94a3b8',
                        fontWeight: 600,
                        border: '1px solid #334155',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <span>🔒</span>
                      <span style={{ color: '#f8fafc', fontWeight: 700 }}>https://thirdeye.fun/</span>
                    </div>

                    <a
                      href={service.showcase.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: 'none',
                        background: '#ff5733',
                        color: '#ffffff',
                        fontSize: '11px',
                        fontWeight: 800,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      Visit Live ↗
                    </a>
                  </div>

                  {/* Browser Live Preview Body */}
                  <div style={{ position: 'relative', background: '#090d16', minHeight: '260px' }}>
                    <iframe
                      src={service.showcase.url}
                      title={service.showcase.title}
                      style={{
                        width: '100%',
                        height: '260px',
                        border: 'none',
                        display: 'block',
                      }}
                    />
                    <div
                      style={{
                        padding: '12px 18px',
                        background: 'rgba(15, 23, 42, 0.95)',
                        borderTop: '1px solid #334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ fontSize: '12px', color: '#10b981', fontWeight: 800 }}>
                        ⚡ Production Client Showcase: Third Eye
                      </div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                        Sub-second load speed · Custom Interactive UI
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Case 2: Mobile App Smartphone Simulator */}
              {service.phoneSimulator && <KiranaPhoneSimulator />}

              {/* Case 3: n8n Workflow Automation Canvas */}
              {service.automationCanvas && <N8nWorkflowVisualizer />}

              {/* Case 4: Custom LLM & AI Agents Reasoning Canvas */}
              {service.llmVisualizer && <LlmAgentVisualizer />}

              {/* Case 5: Custom Hardware, Arduino & IoT Visualizer */}
              {service.hardwareVisualizer && <HardwareIotVisualizer />}
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
        <a href="mailto:karmaaveontechnologies@gmail.com">
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
