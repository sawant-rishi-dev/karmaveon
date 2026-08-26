import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

/**
 * HeroProductTerminal — High-contrast, sharp, technical product & hardware showcase
 * Highlights QR Bites (Flagship) alongside Cloud-to-Chip hardware telemetry.
 */
export default function HeroProductTerminal() {
  const [activeTab, setActiveTab] = useState('qrbites')
  const [liveOrdersCount, setLiveOrdersCount] = useState(184)
  const [latestTicket, setLatestTicket] = useState({ table: 'Table 07', item: '🍕 Margherita Pizza', price: '₹249' })

  // Live order ticker simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveOrdersCount((prev) => prev + 1)
      const tables = ['Table 04', 'Table 09', 'Table 12', 'Table 15', 'Table 02']
      const items = [
        { item: '🍔 Veg Burger x2', price: '₹398' },
        { item: '🍝 Alfredo Pasta', price: '₹229' },
        { item: '🍕 Farmhouse Pizza', price: '₹299' },
        { item: '☕ Cold Coffee x2', price: '₹298' },
      ]
      const randomT = tables[Math.floor(Math.random() * tables.length)]
      const randomI = items[Math.floor(Math.random() * items.length)]
      setLatestTicket({ table: randomT, item: randomI.item, price: randomI.price })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '960px',
        margin: '40px auto 0',
        background: '#090d16',
        borderRadius: '16px',
        border: '1px solid #1e293b',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
        textAlign: 'left',
      }}
    >
      {/* ── Terminal Window Top Bar ── */}
      <div
        style={{
          background: '#0f172a',
          padding: '12px 18px',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        {/* Left: Window controls & repo title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
          </div>
          <span style={{ color: '#94a3b8', fontSize: '12px', fontFamily: 'monospace', fontWeight: 600 }}>
            karmaveon-core // production-deployments
          </span>
        </div>

        {/* Center/Right: Product Switcher Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            maxWidth: '100%',
            paddingBottom: '2px',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
          }}
        >
          {[
            { id: 'qrbites', label: '🍕 QR Bites (POS)' },
            { id: 'hardware', label: '🔌 IoT & Hardware' },
            { id: 'automations', label: '⚡ n8n AI Pipelines' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? '#1e293b' : 'transparent',
                border: `1px solid ${activeTab === tab.id ? '#334155' : 'transparent'}`,
                color: activeTab === tab.id ? '#38bdf8' : '#94a3b8',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '11.5px',
                fontFamily: 'monospace',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                flexShrink: 0,
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Terminal Content Area ── */}
      <div style={{ padding: '24px', color: '#f8fafc' }}>
        {/* TAB 1: QR BITES FLAGSHIP SHOWCASE */}
        {activeTab === 'qrbites' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px', alignItems: 'center' }}>
            {/* Left: Live POS Stream & Architecture */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ background: 'rgba(255, 87, 51, 0.15)', color: '#ff5733', border: '1px solid rgba(255, 87, 51, 0.3)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800, fontFamily: 'monospace' }}>
                  FLAGSHIP SAAS
                </span>
                <span style={{ color: '#10b981', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700 }}>
                  ● WS 0.4s Latency
                </span>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', marginBottom: '8px', letterSpacing: '-0.3px' }}>
                QR Bites Tabletop Ordering Ecosystem
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: 1.6, marginBottom: '18px' }}>
                Live in restaurants. Customers scan dynamic table QR codes, order with zero app downloads, and orders dispatch directly to Kitchen Display Systems (KDS).
              </p>

              {/* Technical Spec Matrix */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '18px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid #1e293b', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>COMMISSION</div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: '#10b981' }}>0%</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid #1e293b', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>SCAN SPEED</div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: '#38bdf8' }}>&lt; 1.2s</div>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid #1e293b', padding: '10px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace' }}>TURNOVER</div>
                  <div style={{ fontSize: '16px', fontWeight: 900, color: '#ff5733' }}>+40%</div>
                </div>
              </div>

              <Link to="/qr-bites" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    background: 'linear-gradient(135deg, #ff5733, #e11d48)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 18px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>Explore QR Bites Platform</span>
                  <span>→</span>
                </button>
              </Link>
            </div>

            {/* Right: Live Telemetry Window */}
            <div
              style={{
                background: '#030712',
                borderRadius: '12px',
                border: '1px solid #1e293b',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '8px', marginBottom: '12px' }}>
                <span style={{ color: '#38bdf8' }}>[LIVE_KDS_FEED]</span>
                <span style={{ color: '#10b981' }}>TOTAL: {liveOrdersCount} ORDERS</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ color: '#94a3b8' }}>&gt; Incoming payload from QR_TABLE_NODE...</div>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '10px', borderRadius: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: 700 }}>
                    <span>{latestTicket.table}</span>
                    <span>{latestTicket.price}</span>
                  </div>
                  <div style={{ color: '#ffffff', fontSize: '13px', marginTop: '2px' }}>{latestTicket.item}</div>
                  <div style={{ color: '#64748b', fontSize: '10px', marginTop: '4px' }}>DISPATCHED IN 380ms VIA WEBSOCKET</div>
                </div>
                <div style={{ color: '#64748b', fontSize: '11px' }}>
                  &gt; Kitchen chime active · Thermal station print ✓
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IOT & HARDWARE TELEMETRY */}
        {activeTab === 'hardware' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ background: 'rgba(5, 150, 105, 0.15)', color: '#10b981', border: '1px solid rgba(5, 150, 105, 0.3)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800, fontFamily: 'monospace' }}>
                  EMBEDDED & HARDWARE
                </span>
                <span style={{ color: '#38bdf8', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700 }}>
                  ● ESP32 + GPU Rigs
                </span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', marginBottom: '8px' }}>
                Custom Hardware & IoT Sensor Hubs
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: 1.6, marginBottom: '18px' }}>
                We bridge physical hardware with cloud backends: ESP32 microcontrollers, ToF distance sensors, TFT telemetry displays, and custom-assembled GPU inference rigs for local LLMs.
              </p>
              <Link to="/kwiee" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    background: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 18px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  View Kwiee Hardware Device →
                </button>
              </Link>
            </div>

            <div
              style={{
                background: '#030712',
                borderRadius: '12px',
                border: '1px solid #1e293b',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            >
              <div style={{ color: '#10b981', marginBottom: '6px' }}>&gt; esp32_firmware.status: ONLINE</div>
              <div style={{ color: '#94a3b8' }}>&gt; I2C Bus: DHT22 (24.2°C) | VL53L0X (18cm ToF)</div>
              <div style={{ color: '#94a3b8' }}>&gt; MQTT Broker: Connected to hivemq.cloud</div>
              <div style={{ color: '#f59e0b', marginTop: '6px' }}>&gt; GPU Compute: RTX 4090 (24GB VRAM) · CUDA 12.4</div>
              <div style={{ color: '#38bdf8', marginTop: '4px' }}>&gt; Local LLM: Llama-3-70B Q4_K_M (42 t/s) ✓</div>
            </div>
          </div>
        )}

        {/* TAB 3: N8N AUTOMATIONS */}
        {activeTab === 'automations' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ background: 'rgba(124, 58, 237, 0.15)', color: '#a855f7', border: '1px solid rgba(124, 58, 237, 0.3)', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 800, fontFamily: 'monospace' }}>
                  AUTONOMOUS PIPELINES
                </span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#ffffff', marginBottom: '8px' }}>
                Enterprise n8n & Multi-Agent Automations
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '13.5px', lineHeight: 1.6, marginBottom: '18px' }}>
                Eliminate human bottlenecks with self-healing n8n pipelines, webhook listeners, automated Stripe/WhatsApp reconciliation, and autonomous AI agents.
              </p>
              <Link to="/services" style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    background: '#7c3aed',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 18px',
                    fontSize: '13px',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  Explore Automation Services →
                </button>
              </Link>
            </div>

            <div
              style={{
                background: '#030712',
                borderRadius: '12px',
                border: '1px solid #1e293b',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '12px',
              }}
            >
              <div style={{ color: '#a855f7', marginBottom: '6px' }}>&gt; n8n_worker_daemon: ACTIVE (34 Workflows)</div>
              <div style={{ color: '#94a3b8' }}>&gt; Webhook trigger: POST /api/v1/orders/webhook</div>
              <div style={{ color: '#10b981' }}>&gt; Auto-reconciliation: Stripe UPI ➔ PostgreSQL (12ms)</div>
              <div style={{ color: '#38bdf8' }}>&gt; WhatsApp Business API: Notification dispatched ✓</div>
              <div style={{ color: '#94a3b8', marginTop: '6px' }}>&gt; 0% Human intervention required.</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
