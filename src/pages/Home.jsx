import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useKeyboardContext } from '../context/KeyboardContext'
import CursorHijackEngine from '../components/CursorHijackEngine'
import DwarfDevDesk from '../components/DwarfDevDesk'
import BackgroundGlitchEffect from '../components/BackgroundGlitchEffect'

// ── Typing effect hook ────────────────────────────────────────
const TYPING_STRINGS = [
  'Websites.',
  'Software.',
  'Automation.',
  'We do it all.',
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
        }, 80)
      } else {
        timeout = setTimeout(() => setPhase('holding'), 1400)
      }
    } else if (phase === 'holding') {
      timeout = setTimeout(() => setPhase('erasing'), 600)
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIdx - 1))
          setCharIdx(c => c - 1)
        }, 45)
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
const GLITCH_CHARS = "3ñg¡nêêr¡ñgÈxcêllêñcêfø®Mødê®ñBµs¡ñêss01#$%&@*§µ¢£¥⌘"

function useCorruptedHeadline(isCorrupted) {
  const [lines, setLines] = useState({
    line1: 'Engineering ',
    line2: 'Excellence',
    line3: 'for Modern Business',
  })

  useEffect(() => {
    if (!isCorrupted) {
      setLines({
        line1: 'Engineering ',
        line2: 'Excellence',
        line3: 'for Modern Business',
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
        line1: scramble('Engineering '),
        line2: scramble('Excellence'),
        line3: scramble('for Modern Business'),
      })
    }, 70)

    return () => clearInterval(interval)
  }, [isCorrupted])

  return lines
}

// ── Process steps ─────────────────────────────────────────────
const STEPS = [
  {
    number: '01',
    title: 'Discovery',
    desc: 'Understanding your business needs deeply before writing a single line of code.',
    icon: '🔍',
    color: '#ff5733',
  },
  {
    number: '02',
    title: 'Architecture',
    desc: 'Designing the perfect technical blueprint that scales with your ambitions.',
    icon: '🏗️',
    color: '#2563eb',
  },
  {
    number: '03',
    title: 'Execution',
    desc: 'Building with cutting-edge technology and engineering discipline.',
    icon: '⚡',
    color: '#7c3aed',
  },
  {
    number: '04',
    title: 'Launch',
    desc: 'Deploying, optimizing, and monitoring for peak performance at scale.',
    icon: '🚀',
    color: '#db2777',
  },
]

export default function Home() {
  const { triggerCascade, triggerWave } = useKeyboardContext()
  const typed = useTypingEffect()
  const heroRef = useRef(null)
  const deskRef = useRef(null)
  const contactBtnRef = useRef(null)
  const [dwarfStatus, setDwarfStatus] = useState('idle')
  const [isScrolledDown, setIsScrolledDown] = useState(false)

  // Scroll Detection: Stop animations when scrolled down past hero section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledDown(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isPaused = isScrolledDown || dwarfStatus === 'save_mode'

  // Hacking corruption & falling happens ONLY when Pappu goes to the table/bench!
  const isHacking = !isPaused && (dwarfStatus === 'at_desk' || dwarfStatus === 'bg_coding')
  const corruptedHeadline = useCorruptedHeadline(isHacking)

  return (
    <div className={!isPaused && isHacking ? 'website-falling' : ''} style={{ position: 'relative', transition: 'all 0.5s ease' }}>
      {/* ── Background Code Rain Glitch Effect ── */}
      <BackgroundGlitchEffect isGlitching={isHacking} isPaused={isPaused} />

      {/* ── Cursor Hijack Engine Integration on Main Page ── */}
      <CursorHijackEngine
        heroRef={heroRef}
        deskRef={deskRef}
        targetButtonRef={contactBtnRef}
        soundEnabled={false}
        isPaused={isPaused}
        onStatusChange={setDwarfStatus}
      />

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
          maxWidth: '950px',
          margin: '0 auto',
          padding: '60px 24px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Dwarf Workstation Base (Pappu sits right in chair when occupied!) */}
        <div style={{ marginBottom: '24px' }}>
          <DwarfDevDesk deskRef={deskRef} isOccupied={dwarfStatus === 'at_desk' || dwarfStatus === 'bg_coding'} />
        </div>

        {/* Badge */}
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
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 700,
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ff5733' }} />
          Next-Gen Tech Solutions
        </div>

        {/* Headline */}
        <h1
          className={!isPaused && isHacking ? 'headline-falling headline-corrupted' : 'fade-in-up'}
          style={{
            fontSize: 'clamp(36px, 6vw, 72px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-1px',
            marginBottom: '20px',
            color: '#0f172a',
            transition: 'transform 0.5s ease',
          }}
        >
          {corruptedHeadline.line1}
          <span
            style={{
              background: !isPaused && isHacking ? 'none' : 'linear-gradient(135deg, #ff5733, #e11d48, #7c3aed)',
              WebkitBackgroundClip: !isPaused && isHacking ? 'none' : 'text',
              WebkitTextFillColor: !isPaused && isHacking ? '#ff5733' : 'transparent',
              backgroundClip: !isPaused && isHacking ? 'none' : 'text',
              color: '#ff5733',
            }}
          >
            {corruptedHeadline.line2}
          </span>
          <br />
          {corruptedHeadline.line3}
        </h1>

        {/* Sub-headline */}
        <p
          style={{
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            color: '#475569',
            marginBottom: '24px',
            fontWeight: 400,
            letterSpacing: '0.5px',
          }}
        >
          Built to Outperform, Designed to Last.
        </p>

        {/* Typing effect */}
        <div
          style={{
            fontSize: 'clamp(18px, 2.5vw, 26px)',
            fontWeight: 700,
            color: '#ff5733',
            minHeight: '42px',
            marginBottom: '40px',
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
          <Link to="/interactive" style={{ textDecoration: 'none' }}>
            <button
              style={{
                padding: '14px 28px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #FF5733, #F59E0B)',
                fontSize: '15px',
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
              <span>🧙‍♂️ Fourth-Wall UX Engine</span>
            </button>
          </Link>

          <Link to="/products" style={{ textDecoration: 'none' }}>
            <button
              className="btn-outline"
              style={{
                padding: '14px 32px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.5px',
              }}
            >
              See Our Work
            </button>
          </Link>

          {/* Primary Action Button Target for Dwarf Hijack Engine */}
          <Link to="/services" style={{ textDecoration: 'none' }}>
            <button
              ref={contactBtnRef}
              className="btn-glow"
              style={{
                padding: '14px 32px',
                borderRadius: '10px',
                border: 'none',
                fontSize: '15px',
                fontWeight: 700,
                cursor: 'pointer',
                color: '#fff',
                letterSpacing: '0.5px',
                boxShadow: dwarfStatus === 'celebrate' ? '0 0 30px #ff5733, 0 0 60px #ff5733' : 'none',
                transform: dwarfStatus === 'celebrate' ? 'scale(1.08)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}
            >
              Let's Talk →
            </button>
          </Link>
        </div>

        {/* Live Story Status Banner */}
        <div
          style={{
            marginTop: '24px',
            fontSize: '13px',
            fontWeight: 600,
            padding: '8px 18px',
            borderRadius: '100px',
            background: isPaused
              ? 'rgba(100, 116, 139, 0.15)'
              : isHacking
                ? 'rgba(255, 87, 51, 0.15)'
                : 'rgba(241, 245, 249, 0.9)',
            border: isPaused
              ? '1px solid #94a3b8'
              : isHacking
                ? '1px solid rgba(255, 87, 51, 0.4)'
                : '1px solid #cbd5e1',
            color: isPaused
              ? '#64748b'
              : isHacking
                ? '#ff5733'
                : '#475569',
            transition: 'all 0.3s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {dwarfStatus === 'save_mode' && (
            <span style={{ fontSize: '15px' }}>💤 SAVE MODE: 20s Cursor Inactivity. Pappu is sleeping in standby mode. Move cursor to wake!</span>
          )}
          {dwarfStatus !== 'save_mode' && isScrolledDown && (
            <span style={{ fontSize: '15px' }}>📜 SCROLLED DOWN: Animations paused while reading page content.</span>
          )}
          {!isPaused && isHacking && (
            <span style={{ fontSize: '15px' }}>⚡ WEBSITE HACK IN PROGRESS: Pappu is hacking! Watch headline fall slowly! 💻</span>
          )}
          {!isPaused && !isHacking && dwarfStatus === 'at_desk' && (
            <span style={{ fontSize: '15px' }}>💻 Pappu sat in his chair at Dev Station... Preparing hack script...</span>
          )}
          {!isPaused && (dwarfStatus === 'alert' || dwarfStatus === 'grab' || dwarfStatus === 'drag') && (
            <span style={{ fontSize: '15px' }}>🚨 IDLE DETECTED! Pappu is dragging your cursor to Let's Talk! 🎯</span>
          )}
          {!isPaused && dwarfStatus === 'celebrate' && (
            <span style={{ fontSize: '15px' }}>✨ Pappu placed your cursor on Let's Talk! Heading to station...</span>
          )}
          {!isPaused && !isHacking && dwarfStatus !== 'at_desk' && dwarfStatus !== 'alert' && dwarfStatus !== 'grab' && dwarfStatus !== 'drag' && dwarfStatus !== 'celebrate' && (
            <span>🕵️‍♂️ Pappu is stalking your cursor! Stay idle 5s to drag, 20s or scroll to pause!</span>
          )}
        </div>
      </section>

      {/* ── Strategic Process Section ── */}
      <section
        className="section-pad"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 24px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{ color: '#ff5733', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '12px' }}>
            How We Work
          </p>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              color: '#0f172a',
            }}
          >
            Our Strategic <span className="gradient-text">Process</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
          }}
        >
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="glass process-step"
              onMouseEnter={triggerCascade}
              style={{
                padding: '32px 24px',
                borderRadius: '16px',
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

              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>
                {step.title}
              </h3>
              <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.7 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA Section ── */}
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
            background: 'radial-gradient(ellipse, rgba(255, 87, 51, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <p style={{ color: '#ff5733', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '20px' }}>
          Ready?
        </p>

        <h2
          style={{
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontWeight: 900,
            color: '#0f172a',
            marginBottom: '16px',
            lineHeight: 1.1,
          }}
        >
          Let's Transform Your{' '}
          <span className="gradient-text">Business</span>
        </h2>

        <p
          style={{
            color: '#475569',
            fontSize: '18px',
            marginBottom: '40px',
            maxWidth: '500px',
            margin: '0 auto 40px',
          }}
        >
          Partner with Karmaveon to build technology that gives you an unfair advantage.
        </p>

        <button
          className="btn-glow"
          onClick={triggerWave}
          style={{
            padding: '18px 48px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '17px',
            fontWeight: 700,
            cursor: 'pointer',
            color: '#fff',
            letterSpacing: '1px',
          }}
        >
          Start Your Project →
        </button>
      </section>
    </div>
  )
}
