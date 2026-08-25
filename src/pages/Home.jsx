import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useKeyboardContext } from '../context/KeyboardContext'
import DwarfDevDesk from '../components/DwarfDevDesk'
import Veon3DCharacter from '../components/Veon3DCharacter'

// ── Typing effect hook ────────────────────────────────────────
const TYPING_STRINGS = [
  'Apps & SaaS Platforms.',
  'AI Automations & Workflows.',
  'IoT & Real-Time Dashboards.',
  'Arduino, Sensors & Custom Hardware.',
  'Custom PC & GPU Workstations.',
  'Launch in < 4 Weeks.',
]

function useTypingEffect() {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('typing') // typing | holding | erasing
  const [stringIdx, setStringIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const current = TYPING_STRINGS[stringIdx]
    let timeout

    if (phase === 'typing') {
      if (charIdx < current.length) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx + 1))
          setCharIdx(c => c + 1)
        }, 75)
      } else {
        timeout = setTimeout(() => setPhase('holding'), 1400)
      }
    } else if (phase === 'holding') {
      timeout = setTimeout(() => setPhase('erasing'), 500)
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1))
          setCharIdx(c => c - 1)
        }, 40)
      } else {
        timeout = setTimeout(() => {
          setStringIdx(i => (i + 1) % TYPING_STRINGS.length)
          setPhase('typing')
        }, 200)
      }
    }
    return () => clearTimeout(timeout)
  }, [phase, charIdx, stringIdx])

  return displayed
}

// ── Corrupted Text Scrambler Hook ─────────────────────────────────────
const GLITCH_CHARS = "Wêbµ¡ldh¡gh-pê®fø®mâñcêÁpp$01#$%&@*§µ¢£¥⌘"

function useCorruptedHeadline(isCorrupted) {
  const [lines, setLines] = useState({
    line1: 'We build high-performance ',
    line2: 'Apps & AI Automations ',
    line3: 'for Modern Startups.',
  })

  useEffect(() => {
    if (!isCorrupted) {
      setLines({
        line1: 'We build high-performance ',
        line2: 'Apps & AI Automations ',
        line3: 'for Modern Startups.',
      })
      return
    }

    const interval = setInterval(() => {
      const scramble = (str) =>
        str
          .split('')
          .map((ch) => {
            if (ch === ' ') return ' '
            if (Math.random() < 0.45) {
              return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            }
            return ch
          })
          .join('')

      setLines({
        line1: scramble('We build high-performance '),
        line2: scramble('Apps & AI Automations '),
        line3: scramble('for Modern Startups.'),
      })
    }, 70)

    return () => clearInterval(interval)
  }, [isCorrupted])

  return lines
}

// ── Tech Stack Items ──────────────────────────────────────────────────
const TECH_STACK = [
  { name: 'React', icon: '⚛️', color: '#61DAFB' },
  { name: 'Python', icon: '🐍', color: '#3776AB' },
  { name: 'Firebase', icon: '🔥', color: '#FFCA28' },
  { name: 'AWS', icon: '☁️', color: '#FF9900' },
  { name: 'TypeScript', icon: '🟦', color: '#3178C6' },
  { name: 'n8n Workflows', icon: '⚡', color: '#FF6584' },
  { name: 'Arduino & IoT', icon: '🔌', color: '#00979D' },
  { name: 'Custom Hardware & PC', icon: '🖥️', color: '#8B5CF6' },
]

// ── Process Steps (Risk-Reducing) ─────────────────────────────────────
const STEPS = [
  {
    number: '01',
    title: '🧠 We Learn Your Business (2 Days)',
    desc: 'We hop on a Zoom, map your complete user flow, and sign a mutual NDA before writing a single line of code.',
    icon: '🔍',
    color: '#ff5733',
  },
  {
    number: '02',
    title: '⚡ Rapid Prototyping (1 Week)',
    desc: 'You get a clickable Figma interactive design AND a working backend API setup (using Vercel + Firebase to move fast).',
    icon: '🏗️',
    color: '#2563eb',
  },
  {
    number: '03',
    title: '🚀 4-Week Sprint',
    desc: 'We build, test, and deploy. You get a private dashboard to track daily progress and test working features in staging.',
    icon: '⚡',
    color: '#7c3aed',
  },
  {
    number: '04',
    title: '🤝 30-Day Support',
    desc: "We don't disappear after launch. We stick around for 30 days to fix bugs, optimize performance, and train your team.",
    icon: '🛡️',
    color: '#db2777',
  },
]

const RECENT_BUILDS = [
  {
    id: 'qr-bites',
    title: 'QR Bites — Digital Menu & Ordering',
    subtitle: 'Contactless Table Ordering & Instant KDS Dispatch',
    desc: 'Smart QR digital menu ecosystem for restaurants and cafes. Customers scan, order, and pay in seconds with zero app downloads and 0% platform commission.',
    tags: ['React', 'Node.js', 'QR Scanning', 'Stripe / UPI'],
    metrics: [
      { label: 'Scan to Order', value: '<2 sec' },
      { label: 'Commission', value: '0%' },
      { label: 'Table Turnaround', value: '+35%' },
    ],
    accent: '#ff5733',
    link: '/qr-bites',
    preview: {
      type: 'qr-bites',
      status: 'QR BITES PLATFORM LIVE · TABLE #04 ACTIVE',
      telemetry: 'Scan QR → Interactive Digital Menu → Instant KDS Ticket Dispatch',
    },
  },
  {
    id: 'smart-udhaar',
    title: 'Smart Udhaar App — Kirana Khata & Billing',
    subtitle: 'SMS-Free Credit Tracking & Offline POS Billing',
    desc: 'Offline-first React Native mobile app built with Expo, local SQLite, and Supabase. Kirana owners scan barcodes, track Udhaar balances, and send 1-tap WhatsApp reminders.',
    tags: ['React Native', 'Expo', 'expo-sqlite', 'Supabase'],
    metrics: [
      { label: 'Offline Speed', value: '100%' },
      { label: 'WhatsApp Reminders', value: '1-Tap' },
      { label: 'Collections', value: '+42%' },
    ],
    accent: '#10b981',
    link: '/smart-udhaar',
    preview: {
      type: 'udhaar',
      status: 'KIRANA POS LIVE · STORE #104 ACTIVE',
      telemetry: 'Scan Barcode → Offline SQLite Ledger → 1-Tap WhatsApp Collection Link',
    },
  },
  {
    id: 'iot-hardware',
    title: 'IoT, Arduino & Custom PC Building',
    subtitle: 'Custom Hardware Prototypes & High-Performance Rigs',
    desc: 'Our engineering team designs and builds custom hardware for you: from Arduino/ESP32 sensor modules and IoT cloud telemetry to bespoke workstation PC builds and GPU rigs.',
    tags: ['Arduino', 'ESP32 IoT', 'Custom Sensors', 'Custom PC Building', 'Firmware'],
    metrics: [
      { label: 'Hardware + Cloud', value: '100%' },
      { label: 'Sensor Latency', value: '<5ms' },
      { label: 'Turnaround', value: '<3 Wks' },
    ],
    accent: '#0284c7',
    link: '/services',
    preview: {
      type: 'iot-hardware',
      status: 'IOT HARDWARE HUB LIVE · ARDUINO / SENSORS ACTIVE',
      telemetry: 'Sensors → Arduino/ESP32 → MQTT Cloud → Real-Time Live Dashboard',
    },
  },
]

export default function Home() {
  const { triggerCascade, triggerWave, openBookingModal } = useKeyboardContext()
  const typed = useTypingEffect()
  const heroRef = useRef(null)
  const deskRef = useRef(null)
  const contactBtnRef = useRef(null)
  const [dwarfStatus, setDwarfStatus] = useState('idle')
  const [isScrolledDown, setIsScrolledDown] = useState(false)
  const [showStickyCta, setShowStickyCta] = useState(false)
  const [activeDemo, setActiveDemo] = useState(null)

  // Scroll Detection: Show sticky CTA and pause animations when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolledDown(scrollY > 300)
      setShowStickyCta(scrollY > 450)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isPaused = isScrolledDown || dwarfStatus === 'save_mode'

  return (
    <div style={{ position: 'relative' }}>

      {/* ── Hero Section ── */}
      <section
        ref={heroRef}
        className="section-pad"
        style={{
          minHeight: 'calc(100vh - 64px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '60px 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* ── Atmospheric Cyan/Teal Studio Backlight ── */}
        <div
          style={{
            position: 'absolute',
            top: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.28) 0%, rgba(37, 99, 235, 0.12) 50%, transparent 75%)',
            filter: 'blur(50px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* ── 3D Interactive VEON Character Background Entity ── */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '1100px',
            height: '650px',
            zIndex: 1,
            pointerEvents: 'none',
            opacity: 0.95,
          }}
        >
          <Veon3DCharacter scale={1.08} />
        </div>
        {/* Veon Workstation Base */}
        <div data-veon-desk style={{ marginBottom: '24px' }}>
          <DwarfDevDesk deskRef={deskRef} isOccupied={dwarfStatus === 'at_desk' || dwarfStatus === 'bg_coding'} />
        </div>

        {/* Timezone & Availability Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 87, 51, 0.08)',
            border: '1px solid rgba(255, 87, 51, 0.25)',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '24px',
            fontSize: '12px',
            color: '#ff5733',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontWeight: 700,
            boxShadow: '0 2px 10px rgba(255, 87, 51, 0.1)',
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
          Available for Global Projects & Startups
        </div>

        {/* Main Headline */}
        <h1
          className="fade-in-up"
          style={{
            fontSize: 'clamp(34px, 5.5vw, 64px)',
            fontWeight: 900,
            lineHeight: 1.15,
            letterSpacing: '-1px',
            marginBottom: '20px',
            color: '#0f172a',
          }}
        >
          We build high-performance{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #ff5733, #e11d48, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: '#ff5733',
            }}
          >
            Apps & AI Automations
          </span>
          <br />
          for Modern Startups.
        </h1>

        {/* Sub-headline */}
        <p
          style={{
            fontSize: 'clamp(16px, 2.2vw, 21px)',
            color: '#475569',
            marginBottom: '24px',
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: '780px',
          }}
        >
          From real-time IoT dashboards to AI-driven CRMs—we take your idea to launch in under 4 weeks.
        </p>

        {/* Typing effect */}
        <div
          style={{
            fontSize: 'clamp(16px, 2.2vw, 24px)',
            fontWeight: 700,
            color: '#ff5733',
            minHeight: '42px',
            marginBottom: '36px',
            fontFamily: "'Courier New', monospace",
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px',
          }}
        >
          <span>{typed}</span>
          <span className="cursor" />
        </div>

        {/* CTA Buttons */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          {/* Primary CTA - Strategy Call */}
          <button
            ref={contactBtnRef}
            data-veon-target="cta"
            className="btn-glow"
            onClick={openBookingModal}
            style={{
              padding: '16px 36px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              color: '#fff',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 20px rgba(255, 87, 51, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span>📅 Book a Free Strategy Call</span>
          </button>

          <Link to="/interactive" style={{ textDecoration: 'none' }}>
            <button
              className="btn-outline"
              style={{
                padding: '16px 28px',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🧙‍♂️ Fourth-Wall UX Engine</span>
            </button>
          </Link>
        </div>
      </section>

      {/* ── "Powered By / Built With" Trust Bar ── */}
      <section
        style={{
          borderTop: '1px solid rgba(226, 232, 240, 0.8)',
          borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
          background: 'rgba(248, 250, 252, 0.75)',
          padding: '28px 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '2.5px',
              color: '#64748b',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Powered by Enterprise-Grade Architecture
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '16px 28px',
            }}
          >
            {TECH_STACK.map((tech) => (
              <div
                key={tech.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#1e293b',
                }}
              >
                <span style={{ fontSize: '18px' }}>{tech.icon}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Build — Specialties Grid ── */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '60px 24px 20px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p style={{ color: '#ff5733', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 800, marginBottom: '10px' }}>
            Our Specialties
          </p>
          <h2
            style={{
              fontSize: 'clamp(26px, 3.5vw, 40px)',
              fontWeight: 900,
              color: '#0f172a',
            }}
          >
            What We{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #ff5733, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Build
            </span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginTop: '10px' }}>
            Software, AI, and hardware — our team builds the full stack, from cloud to chip.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '16px',
          }}
        >
          {[
            {
              icon: '🌐',
              title: 'Web & SaaS Platforms',
              desc: 'High-performance React / Next.js apps built for scale.',
              color: '#ff5733',
            },
            {
              icon: '📱',
              title: 'Mobile Apps',
              desc: 'iOS & Android with React Native — offline-first & pixel-perfect.',
              color: '#7c3aed',
            },
            {
              icon: '⚡',
              title: 'n8n Workflow Automation',
              desc: 'End-to-end business automation. Zero repetitive tasks.',
              color: '#db2777',
            },
            {
              icon: '🧠',
              title: 'Custom LLMs & AI Agents',
              desc: 'RAG pipelines, fine-tuned models & multi-agent reasoning.',
              color: '#0284c7',
            },
            {
              icon: '🔌',
              title: 'IoT, Arduino & Embedded Systems',
              desc: 'Our team designs & builds custom hardware: Arduino, ESP32 sensors, MQTT telemetry, and full IoT cloud dashboards.',
              color: '#059669',
              highlight: true,
            },
            {
              icon: '🖥️',
              title: 'Custom PC & GPU Builds',
              desc: 'Bespoke high-performance workstations and GPU rigs — designed and assembled for AI compute, rendering, or gaming.',
              color: '#059669',
              highlight: true,
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                background: item.highlight ? `${item.color}08` : '#ffffff',
                border: item.highlight ? `1.5px solid ${item.color}35` : '1px solid rgba(226, 232, 240, 0.9)',
                borderRadius: '16px',
                padding: '24px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '28px' }}>{item.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{item.title}</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>{item.desc}</div>
              {item.highlight && (
                <span
                  style={{
                    display: 'inline-block',
                    marginTop: '4px',
                    padding: '3px 10px',
                    borderRadius: '100px',
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}40`,
                    color: item.color,
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    width: 'fit-content',
                  }}
                >
                  🔧 We Build Hardware For You
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Recent Builds / Portfolio Showcase (4-Week Sprints) ── */}
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
              color: '#2563eb',
              fontSize: '12px',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              fontWeight: 800,
              background: 'rgba(37, 99, 235, 0.08)',
              padding: '6px 14px',
              borderRadius: '20px',
            }}
          >
            Recent Builds (4-Week Sprints)
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 46px)',
              fontWeight: 900,
              color: '#0f172a',
              marginTop: '16px',
            }}
          >
            Proven Results for <span className="gradient-text">Fast-Moving Teams</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>
            Real-world platforms engineered from initial discovery to production in under 30 days.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
          {RECENT_BUILDS.map((build) => (
            <div
              key={build.id}
              style={{
                background: '#ffffff',
                borderRadius: '20px',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                padding: '32px',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <div>
                {/* Tech tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                  {build.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '4px 10px',
                        borderRadius: '6px',
                        background: '#f1f5f9',
                        color: build.accent,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  {build.title}
                </h3>
                <p style={{ color: build.accent, fontSize: '13px', fontWeight: 700, marginBottom: '14px' }}>
                  {build.subtitle}
                </p>
                <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
                  {build.desc}
                </p>

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
                  {build.metrics.map((m) => (
                    <div
                      key={m.label}
                      style={{
                        background: '#f8fafc',
                        padding: '10px 8px',
                        borderRadius: '10px',
                        textAlign: 'center',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{m.value}</div>
                      <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 600 }}>{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {build.link ? (
                <Link to={build.link} style={{ textDecoration: 'none' }}>
                  <button
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: 'none',
                      background: 'linear-gradient(135deg, #ff5733, #e11d48)',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 14px rgba(255, 87, 51, 0.3)',
                    }}
                  >
                    <span>Explore {build.title.split('—')[0].trim()} Page</span>
                    <span>→</span>
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => setActiveDemo(build)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '10px',
                    border: `1px solid ${build.accent}`,
                    background: 'rgba(37, 99, 235, 0.04)',
                    color: build.accent,
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                  }}
                >
                  <span>See Live Demo Preview</span>
                  <span>→</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Strategic Risk-Reducing Process Section ── */}
      <section
        className="section-pad"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ color: '#ff5733', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 800, marginBottom: '12px' }}>
            Risk-Free Execution
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 900,
              color: '#0f172a',
            }}
          >
            How We Move Fast <span className="gradient-text">Without Risk</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="glass process-step"
              onMouseEnter={triggerCascade}
              style={{
                padding: '32px 24px',
                borderRadius: '18px',
                position: 'relative',
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid rgba(226, 232, 240, 0.9)',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
              }}
            >
              {/* Background number */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '16px',
                  fontSize: '72px',
                  fontWeight: 900,
                  color: step.color,
                  opacity: 0.12,
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                {step.number}
              </div>

              {/* Icon */}
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{step.icon}</div>

              {/* Step tag */}
              <div
                style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: '100px',
                  background: `${step.color}15`,
                  border: `1px solid ${step.color}40`,
                  color: step.color,
                  fontSize: '10px',
                  letterSpacing: '2px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  marginBottom: '12px',
                }}
              >
                Step {step.number}
              </div>

              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a', marginBottom: '10px', lineHeight: 1.3 }}>
                {step.title}
              </h3>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final Action Section ── */}
      <section
        style={{
          padding: '100px 24px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow orb backdrop */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '300px',
            background: 'radial-gradient(ellipse, rgba(255, 87, 51, 0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <p style={{ color: '#ff5733', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 800, marginBottom: '20px' }}>
          Zero Risk · 4-Week Launch
        </p>

        <h2
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 900,
            color: '#0f172a',
            marginBottom: '16px',
            lineHeight: 1.1,
          }}
        >
          Ready to Build Your <span className="gradient-text">Next Big Idea?</span>
        </h2>

        <p
          style={{
            color: '#475569',
            fontSize: '18px',
            marginBottom: '40px',
            maxWidth: '560px',
            margin: '0 auto 40px',
          }}
        >
          Book a 15-minute strategy call with our team. We'll map your technical architecture and provide a fixed 4-week proposal.
        </p>

        <button
          className="btn-glow"
          onClick={() => {
            triggerWave()
            openBookingModal()
          }}
          style={{
            padding: '18px 48px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '17px',
            fontWeight: 800,
            cursor: 'pointer',
            color: '#fff',
            letterSpacing: '0.5px',
            boxShadow: '0 4px 25px rgba(255, 87, 51, 0.4)',
          }}
        >
          📅 Book a Free Strategy Call →
        </button>
      </section>

      {/* ── Floating Sticky CTA Button on Scroll ── */}
      {showStickyCta && (
        <button
          onClick={openBookingModal}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 90,
            padding: '12px 20px',
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
            maxWidth: 'calc(100vw - 40px)',
          }}
        >
          <span>📅 Free Strategy Call</span>
          <span>→</span>
        </button>
      )}

      {/* ── Interactive Demo Preview Modal ── */}
      {activeDemo && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setActiveDemo(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0f172a',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '650px',
              padding: '32px',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#ffffff',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setActiveDemo(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: '#1e293b',
                border: 'none',
                color: '#94a3b8',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>

            <div style={{ color: activeDemo.accent, fontSize: '12px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
              Live Demo Telemetry · 4-Week Build
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>
              {activeDemo.title}
            </h3>

            {/* Terminal Window View */}
            <div style={{ background: '#020617', borderRadius: '10px', padding: '16px', border: '1px solid #1e293b', fontFamily: 'monospace', fontSize: '13px', color: '#38bdf8', marginBottom: '20px' }}>
              <div style={{ color: '#10b981', marginBottom: '8px' }}>● {activeDemo.preview.status}</div>
              <div style={{ color: '#94a3b8' }}>&gt; {activeDemo.preview.telemetry}</div>
              <div style={{ color: '#f59e0b', marginTop: '8px' }}>&gt; Latency: 12ms | Cluster Health: 100% NOMINAL</div>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px', lineHeight: 1.6 }}>
              {activeDemo.desc}
            </p>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => {
                  setActiveDemo(null)
                  openBookingModal()
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeDemo.accent,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                Build Something Similar →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
