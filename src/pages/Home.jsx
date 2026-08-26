import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useKeyboardContext } from '../context/KeyboardContext'
import ServiceAnimatedIcon from '../components/ServiceAnimatedIcon'
import TechStackMarquee from '../components/TechStackMarquee'
import HeroProductTerminal from '../components/HeroProductTerminal'
import TechnicalExecutionPipeline from '../components/TechnicalExecutionPipeline'
import XRayHeroTitle from '../components/XRayHeroTitle'
import HeroCodeAmbiance from '../components/HeroCodeAmbiance'

// ── Bento Specialty Card with Technical Hardware / Full-Stack Badges ──
function SpecialtyCard({ item, isLarge }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? '#ffffff' : '#fafaf9',
        border: `1.5px solid ${isHovered ? item.color : '#e2e8f0'}`,
        borderRadius: '16px',
        padding: isLarge ? '32px 28px' : '26px 22px',
        boxShadow: isHovered
          ? `0 16px 36px -8px ${item.color}25, 0 4px 12px rgba(0,0,0,0.04)`
          : '0 2px 10px rgba(0,0,0,0.02)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gridColumn: isLarge ? 'span 2' : 'span 1',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div>
        {/* Top Header: Icon + Category Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <ServiceAnimatedIcon type={item.type} isHovered={isHovered} color={item.color} />
          
          <span
            style={{
              fontSize: '10.5px',
              fontWeight: 800,
              fontFamily: 'monospace',
              color: item.color,
              background: `${item.color}12`,
              border: `1px solid ${item.color}30`,
              padding: '3px 8px',
              borderRadius: '4px',
              letterSpacing: '0.5px',
            }}
          >
            {item.categoryBadge}
          </span>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.3px', marginBottom: '8px' }}>
          {item.title}
        </h3>

        <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6, margin: 0 }}>
          {item.desc}
        </p>
      </div>

      {/* Bottom Technical Spec Footer */}
      <div
        style={{
          marginTop: '20px',
          paddingTop: '12px',
          borderTop: '1px dashed #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          fontFamily: 'monospace',
          color: '#64748b',
        }}
      >
        <span>{item.specLine}</span>
        <span style={{ color: item.color, fontWeight: 700 }}>{item.slaTag}</span>
      </div>
    </div>
  )
}

export default function Home() {
  const { openBookingModal } = useKeyboardContext()
  const [showStickyCta, setShowStickyCta] = useState(false)

  // Scroll detection for sticky action button
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCta(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ position: 'relative', color: '#0f172a', background: 'transparent' }}>

      {/* ── SECTION 1: HERO (High-Contrast, Punchy, Tech-First) ── */}
      <section
        style={{
          width: '100%',
          padding: '60px 24px 50px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px -15px rgba(28, 25, 23, 0.07)',
          borderBottom: '1px solid rgba(203, 213, 225, 0.6)',
          zIndex: 10,
        }}
      >
        <HeroCodeAmbiance preset="home" />

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Availability Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            borderRadius: '100px',
            padding: '6px 14px',
            marginBottom: '20px',
            fontSize: '11px',
            color: '#0f172a',
            letterSpacing: '0.6px',
            fontWeight: 800,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
            maxWidth: '100%',
            textAlign: 'center',
          }}
        >
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981', flexShrink: 0 }} />
          <span>ACCEPTING Q1/Q2 FAST-TRACK MILESTONE BUILDS</span>
        </div>

        {/* Interactive Magnifying X-Ray Headline */}
        <div style={{ marginBottom: '20px', width: '100%' }}>
          <XRayHeroTitle />
        </div>

        {/* Crisp Sub-headline */}
        <p
          style={{
            fontSize: 'clamp(15px, 2vw, 19px)',
            color: '#334155',
            fontWeight: 500,
            lineHeight: 1.65,
            maxWidth: '780px',
            margin: '0 auto 30px',
            padding: '0 12px',
          }}
        >
          Full-stack engineering from cloud to chip. We build high-throughput SaaS platforms, offline-first mobile apps, autonomous AI pipelines, and custom hardware — launched in under 4 weeks.
        </p>

        {/* Hero CTA Hierarchy */}
        <div
          className="mobile-stack"
          style={{
            display: 'flex',
            gap: '14px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '22px',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto 22px',
          }}
        >
          <button
            onClick={openBookingModal}
            className="btn-glow"
            style={{
              padding: '15px 32px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '15px',
              fontWeight: 900,
              cursor: 'pointer',
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(255, 87, 51, 0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <span>Book Technical Discovery Call</span>
            <span style={{ fontSize: '17px' }}>→</span>
          </button>

          <Link to="/products" style={{ textDecoration: 'none' }}>
            <button
              className="btn-outline"
              style={{
                padding: '15px 26px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                border: '1.5px solid #cbd5e1',
                color: '#0f172a',
                background: '#ffffff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>Explore Products & Hardware</span>
            </button>
          </Link>
        </div>

        {/* Technical Trust Line */}
        <div
          style={{
            fontSize: '12px',
            color: '#64748b',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
            padding: '0 12px',
            lineHeight: 1.8,
          }}
        >
          <span>⚡ 4-WEEK SPRINT DELIVERY</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>🔒 100% FULL IP OWNERSHIP</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>🛡️ MUTUAL NDA EXECUTED</span>
        </div>

        {/* Replaced Dev Desk with Authentic Live Product & Hardware Terminal */}
        <HeroProductTerminal />
        </div>
      </section>

      {/* ── SECTION 2: TECH STACK MARQUEE ── */}
      <section
        style={{
          borderTop: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0',
          background: '#ffffff',
          padding: '28px 0',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 900,
              letterSpacing: '2.5px',
              color: '#64748b',
              textTransform: 'uppercase',
              marginBottom: '16px',
              fontFamily: 'monospace',
            }}
          >
            ⚡ ARCHITECTURE & PRODUCTION STACKS
          </p>
          <TechStackMarquee />
        </div>
      </section>

      {/* ── SECTION 3: FLAGSHIP & RECENT BUILDS (Asymmetrical Bento) ── */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '90px 24px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span
            style={{
              color: '#ff5733',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 900,
              fontFamily: 'monospace',
              background: 'rgba(255, 87, 51, 0.08)',
              border: '1px solid rgba(255, 87, 51, 0.25)',
              padding: '5px 12px',
              borderRadius: '6px',
            }}
          >
            FLAGSHIP & PRODUCTION BUILDS
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 900,
              color: '#0f172a',
              marginTop: '16px',
              letterSpacing: '-1px',
            }}
          >
            Built for Scale. Shipped in Under 30 Days.
          </h2>
          <p style={{ color: '#475569', fontSize: '16px', marginTop: '8px', maxWidth: '600px', margin: '8px auto 0' }}>
            Real-world systems engineered from initial schema to live production.
          </p>
        </div>

        {/* Bento Grid: QR Bites (Flagship Dominant) + Companion Systems */}
        <div
          className="bento-grid-12"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {/* ── CARD 1: QR BITES (FLAGSHIP DOMINANT 12-COL) ── */}
          <div
            className="bento-col-12 bento-card-pad"
            style={{
              gridColumn: 'span 12',
              background: '#ffffff',
              borderRadius: '20px',
              border: '2px solid #ff5733',
              padding: '36px 32px',
              boxShadow: '0 20px 50px rgba(255, 87, 51, 0.1)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '32px',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ background: '#ff5733', color: '#ffffff', fontSize: '10px', fontWeight: 900, fontFamily: 'monospace', padding: '3px 8px', borderRadius: '4px' }}>
                  FLAGSHIP PRODUCT
                </span>
                <span style={{ color: '#64748b', fontSize: '11px', fontFamily: 'monospace', fontWeight: 700 }}>
                  v1.0 Production Ready
                </span>
              </div>

              <h3 style={{ fontSize: '26px', fontWeight: 900, color: '#0f172a', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                QR Bites — Next-Gen Tabletop Ordering & KDS
              </h3>

              <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
                Full digital dining workflow: Customers scan table QR, browse live menu, place orders directly. Real-time WebSocket synchronization to Kitchen Display Screens with zero app download and 0% commission.
              </p>

              {/* Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#ff5733' }}>&lt; 2 sec</div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace', fontWeight: 700 }}>SCAN TO ORDER</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#10b981' }}>0%</div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace', fontWeight: 700 }}>COMMISSION</div>
                </div>
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 900, color: '#2563eb' }}>+40%</div>
                  <div style={{ fontSize: '10px', color: '#64748b', fontFamily: 'monospace', fontWeight: 700 }}>TABLE TURNOVER</div>
                </div>
              </div>

              <Link to="/qr-bites" style={{ textDecoration: 'none' }}>
                <button className="btn-slide-theme">
                  <span className="slide-bg">
                    <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                  <span className="slide-text">
                    <span>Explore QR Bites Platform</span>
                    <span>→</span>
                  </span>
                  <span className="spacer-text">Explore QR Bites Platform →</span>
                </button>
              </Link>
            </div>

            {/* Right: Live Interactive Workflow Preview */}
            <div
              style={{
                background: '#090d16',
                borderRadius: '16px',
                border: '1px solid #1e293b',
                padding: '24px',
                color: '#ffffff',
                fontFamily: 'monospace',
              }}
            >
              <div style={{ fontSize: '12px', color: '#38bdf8', borderBottom: '1px solid #1e293b', paddingBottom: '8px', marginBottom: '14px', fontWeight: 700 }}>
                ⚡ LIVE RESTAURANT TRANSACTION TELEMETRY
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                <div style={{ color: '#94a3b8' }}>[1] Customer scans Table #04 QR with camera</div>
                <div style={{ color: '#94a3b8' }}>[2] WebApp instant loads (320ms) · Zero App store</div>
                <div style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '8px', borderRadius: '6px' }}>
                  [3] Order Confirmed: Margherita Pizza x1 (₹249)
                </div>
                <div style={{ color: '#f59e0b' }}>[4] WebSocket payload dispatched to Kitchen KDS (Table 04)</div>
                <div style={{ color: '#38bdf8' }}>[5] Analytics stream: Daily total +₹249 (₹42,580 Live)</div>
              </div>
            </div>
          </div>

          {/* ── CARD 2: SMART UDHAAR (6-COL) ── */}
          <div
            className="bento-col-6 bento-card-pad"
            style={{
              gridColumn: 'span 6',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '30px 26px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#10b981', fontSize: '10.5px', fontWeight: 800, fontFamily: 'monospace', padding: '3px 8px', borderRadius: '4px' }}>
                  OFFLINE-FIRST MOBILE
                </span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>
                Smart Udhaar — Kirana POS & Ledger
              </h3>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6, marginBottom: '18px' }}>
                React Native & SQLite offline-first POS. Kirana shop owners scan product barcodes, manage customer credit ledgers without internet, and dispatch 1-tap WhatsApp collection links.
              </p>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontFamily: 'monospace', color: '#64748b', marginBottom: '20px' }}>
                <span>💾 SQLite Local DB</span>
                <span>📶 100% Offline Speed</span>
                <span>💬 1-Tap WhatsApp</span>
              </div>
            </div>
            <Link to="/smart-udhaar" style={{ textDecoration: 'none' }}>
              <button className="btn-slide-theme">
                <span className="slide-bg">
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="slide-text">
                  <span>Explore Smart Udhaar</span>
                  <span>→</span>
                </span>
                <span className="spacer-text">Explore Smart Udhaar →</span>
              </button>
            </Link>
          </div>

          {/* ── CARD 3: KWIEE & HARDWARE (6-COL) ── */}
          <div
            className="bento-col-6 bento-card-pad"
            style={{
              gridColumn: 'span 6',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              padding: '30px 26px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ background: 'rgba(5, 150, 105, 0.12)', color: '#059669', fontSize: '10.5px', fontWeight: 800, fontFamily: 'monospace', padding: '3px 8px', borderRadius: '4px' }}>
                  HARDWARE & EMBEDDED
                </span>
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>
                Kwiee — ESP32 Sensor Buddy & GPU Rig
              </h3>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6, marginBottom: '18px' }}>
                Full-stack physical hardware: ESP32 microcontrollers, ToF proximity sensors, TFT displays, and custom-assembled GPU AI workstations engineered for on-premise LLM inference.
              </p>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontFamily: 'monospace', color: '#64748b', marginBottom: '20px' }}>
                <span>🔌 ESP32 / Arduino</span>
                <span>🖥️ Custom GPU Rigs</span>
                <span>📡 MQTT Telemetry</span>
              </div>
            </div>
            <Link to="/kwiee" style={{ textDecoration: 'none' }}>
              <button className="btn-slide-theme">
                <span className="slide-bg">
                  <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <span className="slide-text">
                  <span>Explore Hardware Specs</span>
                  <span>→</span>
                </span>
                <span className="spacer-text">Explore Hardware Specs →</span>
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: WHAT WE BUILD (Specialties Bento Grid) ── */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '60px 24px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span
            style={{
              color: '#0284c7',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 900,
              fontFamily: 'monospace',
              background: 'rgba(2, 132, 199, 0.08)',
              border: '1px solid rgba(2, 132, 199, 0.25)',
              padding: '5px 12px',
              borderRadius: '6px',
            }}
          >
            CORE CAPABILITIES
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              fontWeight: 900,
              color: '#0f172a',
              marginTop: '16px',
              letterSpacing: '-0.8px',
            }}
          >
            Full-Stack Engineering. Cloud to Chip.
          </h2>
          <p style={{ color: '#475569', fontSize: '16px', marginTop: '8px' }}>
            We eliminate fragmented vendor handoffs by building software, autonomous AI, and physical hardware in-house.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: '20px',
          }}
        >
          {[
            {
              type: 'web',
              title: 'High-Performance Web & SaaS',
              desc: 'React, Next.js, and Node.js platforms engineered for sub-second page loads, real-time WebSockets, and high-concurrency billing flows.',
              color: '#ff5733',
              categoryBadge: 'WEB ARCHITECTURE',
              specLine: 'Next.js 15 · Tailwind · Node',
              slaTag: 'Sub-second UX',
            },
            {
              type: 'mobile',
              title: 'Offline-First Mobile Apps',
              desc: 'iOS & Android with React Native (Expo). Embedded SQLite databases, barcode scanners, and WhatsApp payment collection integrations.',
              color: '#7c3aed',
              categoryBadge: 'MOBILE SYSTEMS',
              specLine: 'React Native · SQLite · Supabase',
              slaTag: '100% Offline',
            },
            {
              type: 'automation',
              title: 'n8n & Autonomous Pipelines',
              desc: 'Self-healing automation workflows. Connect CRMs, billing systems, databases, and LLM reasoning engines without manual bottlenecks.',
              color: '#db2777',
              categoryBadge: 'AUTOMATION',
              specLine: 'n8n · Webhooks · REST APIs',
              slaTag: 'Zero-Touch Ops',
            },
            {
              type: 'llm',
              title: 'Custom AI Agents & Vector RAG',
              desc: 'Domain-specific RAG pipelines, fine-tuned open weights (Llama/Mistral), and multi-agent reasoning orchestrators deployed on private VPCs.',
              color: '#0284c7',
              categoryBadge: 'AI & ML',
              specLine: 'pgvector · LangChain · Grok/Llama',
              slaTag: 'Private VPC',
            },
            {
              type: 'iot',
              title: 'IoT, ESP32 & Embedded Hardware',
              desc: 'Custom PCB and microcontroller systems: ESP32/Arduino sensor hubs, ToF distance telemetry, TFT displays, and MQTT cloud bridges.',
              color: '#059669',
              categoryBadge: 'EMBEDDED HARDWARE',
              specLine: 'ESP32 · C++ Firmware · MQTT',
              slaTag: 'Hardware-Ready',
            },
            {
              type: 'hardware',
              title: 'Custom GPU & AI Compute Rigs',
              desc: 'Bespoke high-performance workstations and GPU AI compute rigs custom-assembled for local LLM inference, 3D rendering, and dev.',
              color: '#059669',
              categoryBadge: 'COMPUTE RIGS',
              specLine: 'RTX 4090 · CUDA 12 · Linux',
              slaTag: 'Local LLMs',
            },
          ].map((item) => (
            <SpecialtyCard key={item.title} item={item} />
          ))}
        </div>
      </section>

      {/* ── SECTION 5: TECHNICAL EXECUTION PIPELINE (Process Overhaul) ── */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <span
            style={{
              color: '#10b981',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 900,
              fontFamily: 'monospace',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              padding: '5px 12px',
              borderRadius: '6px',
            }}
          >
            4-WEEK ENGINEERING METHODOLOGY
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 900,
              color: '#0f172a',
              marginTop: '16px',
              letterSpacing: '-1px',
            }}
          >
            How We Ship High-Velocity Builds Without Risk
          </h2>
          <p style={{ color: '#475569', fontSize: '16px', marginTop: '8px', maxWidth: '600px', margin: '8px auto 0' }}>
            Structured 4-phase milestone delivery with daily staging builds, full IP transfer, and zero bloated agency overhead.
          </p>
        </div>

        {/* Industrial Engineering Sprint Pipeline */}
        <TechnicalExecutionPipeline />
      </section>

      {/* ── SECTION 6: FINAL ACTION CALL ── */}
      <section
        style={{
          maxWidth: '1000px',
          margin: '0 auto 80px',
          padding: '60px 32px',
          background: 'linear-gradient(135deg, #0f172a, #1e293b)',
          borderRadius: '24px',
          border: '1px solid #334155',
          textAlign: 'center',
          color: '#ffffff',
          boxShadow: '0 25px 60px rgba(15, 23, 42, 0.3)',
          position: 'relative',
        }}
      >
        <span
          style={{
            color: '#ff5733',
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 900,
            fontFamily: 'monospace',
          }}
        >
          ZERO-RISK · 4-WEEK SPRINT
        </span>

        <h2
          style={{
            fontSize: 'clamp(30px, 4.5vw, 50px)',
            fontWeight: 900,
            color: '#ffffff',
            marginTop: '12px',
            marginBottom: '16px',
            letterSpacing: '-1px',
          }}
        >
          Ready to Engineer Your Next Platform?
        </h2>

        <p
          style={{
            color: '#94a3b8',
            fontSize: '17px',
            maxWidth: '580px',
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}
        >
          Book a 15-minute technical discovery call with our tech lead. We'll map your system architecture, scope the deliverables, and provide a fixed-price 4-week proposal.
        </p>

        <button
          onClick={openBookingModal}
          className="btn-glow"
          style={{
            padding: '18px 48px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '16.5px',
            fontWeight: 900,
            cursor: 'pointer',
            color: '#ffffff',
            boxShadow: '0 4px 25px rgba(255, 87, 51, 0.45)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>Book a Free Strategy Call</span>
          <span style={{ fontSize: '18px' }}>→</span>
        </button>
      </section>

      {/* Floating Sticky CTA Button on Scroll */}
      {showStickyCta && (
        <button
          onClick={openBookingModal}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 90,
            padding: '12px 22px',
            borderRadius: '100px',
            background: 'linear-gradient(135deg, #ff5733, #e11d48)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 800,
            fontSize: '13px',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(255, 87, 51, 0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeInUp 0.3s ease-out',
          }}
        >
          <span>📅 Book Strategy Call</span>
          <span>→</span>
        </button>
      )}
    </div>
  )
}
