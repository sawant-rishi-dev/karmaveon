import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import confetti from 'canvas-confetti'
import CursorHijackEngine from '../components/CursorHijackEngine'
import DwarfDevDesk from '../components/DwarfDevDesk'
import { playClickSuccessSound } from '../utils/soundEffects'

export default function InteractiveLanding() {
  const heroRef = useRef(null)
  const deskRef = useRef(null)
  const contactBtnRef = useRef(null)

  const [soundEnabled, setSoundEnabled] = useState(true)
  const [dwarfStatus, setDwarfStatus] = useState('idle')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [terminalLogs, setTerminalLogs] = useState([
    '[SYSTEM INIT] Fourth-Wall Engine loaded.',
    '[DWARF OS] Resting at Dev Workstation Base...',
  ])

  // Handle status update log output
  const handleStatusChange = (status) => {
    setDwarfStatus(status)
    const timestamp = new Date().toLocaleTimeString()
    let logMsg = ''

    if (status === 'alert') logMsg = `[${timestamp}] ⚡ Mouse paused 2s! Dwarf spotted cursor!`
    else if (status === 'run') logMsg = `[${timestamp}] 🏃 Dwarf sprinting from Dev Station to cursor...`
    else if (status === 'grab') logMsg = `[${timestamp}] ✊ CURSOR HIJACKED! Pointer locked!`
    else if (status === 'drag') logMsg = `[${timestamp}] 🧲 Dragging cursor across screen to CTA button...`
    else if (status === 'celebrate') logMsg = `[${timestamp}] ✨ TARGET LOCKED! Cursor placed over Contact button!`
    else if (status === 'return') logMsg = `[${timestamp}] 🚶 Dwarf walking back to Dev Workstation Base...`

    if (logMsg) {
      setTerminalLogs((prev) => [logMsg, ...prev.slice(0, 5)])
    }
  }

  // Handle "Click to Contact" Primary CTA Click
  const handleContactClick = () => {
    playClickSuccessSound(soundEnabled)

    // Trigger colorful confetti burst
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF5733', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
    })

    setIsModalOpen(true)
  }

  // Handle form submission
  const handleSubmitForm = (e) => {
    e.preventDefault()
    setContactSubmitted(true)
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } })
    setTimeout(() => {
      setIsModalOpen(false)
      setContactSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 2200)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FDFBF7', // Clean cozy off-white theme
        color: '#1E293B',
        fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* Subtle Dot Grid Paper Texture Background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(#CBD5E1 1px, transparent 1px), radial-gradient(#CBD5E1 1px, #FDFBF7 1px)',
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px',
          opacity: 0.45,
          pointerEvents: 'none',
        }}
      />

      {/* Floating Decorative Code Snippets (</>) */}
      <div
        style={{
          position: 'absolute',
          top: '120px',
          left: '5%',
          fontSize: '14px',
          fontFamily: 'monospace',
          color: '#94A3B8',
          opacity: 0.6,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        &lt;HeroSection hijack="proactive" /&gt;
      </div>
      <div
        style={{
          position: 'absolute',
          top: '280px',
          right: '6%',
          fontSize: '14px',
          fontFamily: 'monospace',
          color: '#94A3B8',
          opacity: 0.6,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        const dwarf = new SoftwareEngineer(&#123; glasses: true &#125;);
      </div>

      {/* ── Framed Top Header Navigation ── */}
      <header
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 20,
        }}
      >
        {/* Brand Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #FF5733, #F59E0B)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFF',
              fontWeight: 800,
              fontSize: '18px',
              boxShadow: '0 4px 14px rgba(255, 87, 51, 0.3)',
            }}
          >
            &lt;/&gt;
          </div>
          <div>
            <span style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px', color: '#0F172A' }}>
              Karmaveon
            </span>
            <span style={{ fontSize: '10px', display: 'block', color: '#FF5733', fontWeight: 700, letterSpacing: '1px' }}>
              FOURTH-WALL UX
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          {['About', 'Services', 'Blog'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                textDecoration: 'none',
                color: '#475569',
                fontSize: '15px',
                fontWeight: 600,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.target.style.color = '#FF5733')}
              onMouseLeave={(e) => (e.target.style.color = '#475569')}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Audio Toggle & Sound Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{
              background: soundEnabled ? '#F1F5F9' : '#FEE2E2',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '13px',
              fontWeight: 600,
              color: soundEnabled ? '#334155' : '#EF4444',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {soundEnabled ? '🔊 Sound On' : '🔇 Sound Muted'}
          </button>
        </div>
      </header>

      {/* ── Cursor Hijack Engine Integration ── */}
      <CursorHijackEngine
        heroRef={heroRef}
        deskRef={deskRef}
        targetButtonRef={contactBtnRef}
        soundEnabled={soundEnabled}
        onStatusChange={handleStatusChange}
      />

      {/* ── Main Hero Section ── */}
      <section
        ref={heroRef}
        style={{
          maxWidth: '1100px',
          margin: '20px auto 60px',
          padding: '60px 32px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Dwarf Dev Workstation Base (Dwarf's Home on the Page!) */}
        <div style={{ marginBottom: '32px' }}>
          <DwarfDevDesk deskRef={deskRef} isOccupied={dwarfStatus === 'idle'} />
        </div>

        {/* Whimsical Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#FFF3ED',
            border: '1px solid #FFD8C9',
            borderRadius: '100px',
            padding: '8px 20px',
            marginBottom: '28px',
            fontSize: '13px',
            fontWeight: 700,
            color: '#FF5733',
            boxShadow: '0 2px 10px rgba(255, 87, 51, 0.08)',
          }}
        >
          <span style={{ fontSize: '16px' }}>🧙‍♂️</span>
          <span>Fourth-Wall Micro-Interaction Engine</span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(42px, 6vw, 76px)',
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-2px',
            color: '#0F172A',
            marginBottom: '24px',
            maxWidth: '900px',
            margin: '0 auto 24px',
          }}
        >
          Most websites wait for you.{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #FF5733, #D97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            We reach out and grab you.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            color: '#475569',
            maxWidth: '680px',
            margin: '0 auto 48px',
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          Pause your mouse for 2 seconds anywhere in the Hero section! Our dwarf engineer will wake up, lock onto your cursor, smooth-scroll the page, and guide you straight to the contact button.
        </p>

        {/* Target Action Area with Primary CTA Button */}
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            position: 'relative',
            padding: '24px',
            borderRadius: '24px',
            background: '#FFFFFF',
            boxShadow: '0 20px 40px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.05)',
            border: '1px solid #F1F5F9',
          }}
        >
          {/* CTA Prompt Halo Ring */}
          {dwarfStatus === 'celebrate' && (
            <div
              style={{
                position: 'absolute',
                inset: '-12px',
                borderRadius: '32px',
                border: '3px solid #FF5733',
                animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                pointerEvents: 'none',
              }}
            />
          )}

          {/* Primary CTA Button: "Click to Contact" */}
          <button
            ref={contactBtnRef}
            onClick={handleContactClick}
            style={{
              background:
                dwarfStatus === 'celebrate'
                  ? 'linear-gradient(135deg, #10B981, #059669)'
                  : 'linear-gradient(135deg, #FF5733, #E11D48)',
              color: '#FFFFFF',
              border: 'none',
              padding: '18px 48px',
              borderRadius: '16px',
              fontSize: '18px',
              fontWeight: 800,
              cursor: 'pointer',
              letterSpacing: '0.5px',
              boxShadow:
                dwarfStatus === 'celebrate'
                  ? '0 12px 32px rgba(16, 185, 129, 0.4)'
                  : '0 12px 32px rgba(255, 87, 51, 0.35)',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: dwarfStatus === 'celebrate' ? 'scale(1.08)' : 'scale(1)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span>Click to Contact</span>
            <span style={{ fontSize: '20px' }}>🚀</span>
          </button>

          <div style={{ fontSize: '13px', color: '#64748B', fontWeight: 600 }}>
            {dwarfStatus === 'celebrate'
              ? '✨ Dwarf snapped cursor here! Click now!'
              : '⏳ Pause mouse for 2 sec in Hero zone to activate Dwarf (resets on mouse move)'}
          </div>
        </div>
      </section>

      {/* ── Dwarf Telemetry Live Terminal Console ── */}
      <section
        style={{
          maxWidth: '850px',
          margin: '0 auto 80px',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            background: '#0F172A',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(15, 23, 42, 0.25)',
            border: '1px solid #1E293B',
          }}
        >
          {/* Terminal Window Header */}
          <div
            style={{
              background: '#1E293B',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EF4444' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10B981' }} />
            </div>
            <div style={{ color: '#94A3B8', fontSize: '12px', fontFamily: 'monospace', fontWeight: 600 }}>
              dwarf-engineer-telemetry.log
            </div>
            <div style={{ color: '#38BDF8', fontSize: '11px', fontFamily: 'monospace' }}>LIVE</div>
          </div>

          {/* Terminal Content */}
          <div
            style={{
              padding: '20px 24px',
              fontFamily: "'Courier New', monospace",
              fontSize: '13px',
              color: '#38BDF8',
              minHeight: '140px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {terminalLogs.map((log, idx) => (
              <div key={idx} style={{ opacity: 1 - idx * 0.15, transition: 'all 0.3s ease' }}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why It Works Pitch Section ── */}
      <section
        style={{
          maxWidth: '1150px',
          margin: '0 auto 100px',
          padding: '0 32px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <span style={{ color: '#FF5733', fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
            UX PSYCHOLOGY & STRATEGY
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: '#0F172A', marginTop: '8px' }}>
            Why The "Cursor-Hijack" Converts
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
          }}
        >
          {[
            {
              icon: '⚡',
              title: 'Pattern Separation',
              desc: 'Disrupts expected mouse behavior, breaking banner blindness and demanding total visitor engagement.',
              color: '#FF5733',
            },
            {
              icon: '🎮',
              title: 'Gamification & Delight',
              desc: 'Turns a boring conversion path into an unforgettable visual story that users love to share.',
              color: '#3B82F6',
            },
            {
              icon: '🎯',
              title: 'Zero Friction Guidance',
              desc: 'Physically guides the user’s eye and input device directly to the goal in under two seconds.',
              color: '#10B981',
            },
            {
              icon: '🛡️',
              title: 'Strong Brand Identity',
              desc: 'Anchors Karmaveon as creative, technically clever, and delightfully unorthodox.',
              color: '#8B5CF6',
            },
          ].map((card, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                padding: '32px 24px',
                border: '1px solid #F1F5F9',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.03)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: `${card.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: '20px',
                }}
              >
                {card.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0F172A', marginBottom: '10px' }}>
                {card.title}
              </h3>
              <p style={{ color: '#64748B', fontSize: '14px', lineHeight: 1.6 }}>{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact Inquiry Modal ── */}
      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '24px',
              maxWidth: '480px',
              width: '100%',
              padding: '36px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: '#F1F5F9',
                border: 'none',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontWeight: 700,
                color: '#64748B',
              }}
            >
              ✕
            </button>

            {contactSubmitted ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '8px' }}>
                  Message Received!
                </h3>
                <p style={{ color: '#64748B', fontSize: '15px' }}>
                  Our dwarf software engineer is already compiling your request. We'll be in touch shortly!
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>
                  Let's Build Something Clever 🚀
                </h3>
                <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '24px' }}>
                  Leave your details and we'll craft an extraordinary solution for you.
                </p>

                <form onSubmit={handleSubmitForm} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                      Project Details
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Tell us about your goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        border: '1px solid #CBD5E1',
                        fontSize: '14px',
                        outline: 'none',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: 'linear-gradient(135deg, #FF5733, #E11D48)',
                      color: '#FFF',
                      border: 'none',
                      padding: '14px',
                      borderRadius: '12px',
                      fontWeight: 800,
                      fontSize: '16px',
                      cursor: 'pointer',
                      marginTop: '8px',
                      boxShadow: '0 8px 20px rgba(255, 87, 51, 0.3)',
                    }}
                  >
                    Send Message ✉️
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
