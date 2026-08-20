import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useKeyboardContext } from '../context/KeyboardContext'

// ── Live Kwiee TFT Screen Simulator ─────────────────────────────
function KwieeLiveScreen() {
  const [time, setTime] = useState(new Date())
  const [temp, setTemp] = useState(24.7)
  const [pressure, setPressure] = useState(669.0)
  const [altitude, setAltitude] = useState(3367.6)
  const [distance, setDistance] = useState(382)
  const [face, setFace] = useState('neutral') // neutral | happy | blink | sad
  const [notification, setNotification] = useState(null)
  const [notifQueue] = useState([
    { id: 1, icon: '📱', text: 'WhatsApp: Hey, call me!', color: '#25d366' },
    { id: 2, icon: '📧', text: 'Gmail: New invoice received', color: '#ea4335' },
    { id: 3, icon: '🔔', text: 'Reminder: Team standup in 5m', color: '#f59e0b' },
    { id: 4, icon: '💬', text: 'Slack: Deployment done ✓', color: '#4a154b' },
  ])
  const notifIdxRef = useRef(0)

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // Drift sensor readings slightly to feel alive
  useEffect(() => {
    const t = setInterval(() => {
      setTemp(v => parseFloat((v + (Math.random() - 0.5) * 0.1).toFixed(1)))
      setPressure(v => parseFloat((v + (Math.random() - 0.5) * 0.3).toFixed(1)))
      setAltitude(v => parseFloat((v + (Math.random() - 0.5) * 0.8).toFixed(1)))
      setDistance(v => Math.max(10, Math.min(800, Math.round(v + (Math.random() - 0.5) * 8))))
    }, 2000)
    return () => clearInterval(t)
  }, [])

  // Face blink animation
  useEffect(() => {
    const blink = () => {
      setFace('blink')
      setTimeout(() => setFace('neutral'), 180)
    }
    const t = setInterval(blink, 3500 + Math.random() * 2000)
    return () => clearInterval(t)
  }, [])

  // Push notifications cycle
  useEffect(() => {
    const t = setInterval(() => {
      const notif = notifQueue[notifIdxRef.current % notifQueue.length]
      notifIdxRef.current += 1
      setNotification(notif)
      setFace('happy')
      setTimeout(() => {
        setNotification(null)
        setFace('neutral')
      }, 3000)
    }, 6000)
    return () => clearInterval(t)
  }, [notifQueue])

  const hours = time.getHours().toString().padStart(2, '0')
  const mins = time.getMinutes().toString().padStart(2, '0')
  const secs = time.getSeconds().toString().padStart(2, '0')

  // ASCII face parts
  const eyeOpen = '⌢'
  const eyeClosed = '─'
  const leftEye = face === 'blink' ? eyeClosed : eyeOpen
  const rightEye = face === 'blink' ? eyeClosed : eyeOpen
  const mouthMap = { neutral: '─', happy: '⌣', sad: '⌢', blink: '─' }
  const cheek = face === 'happy' ? '◠' : ''

  return (
    <div
      style={{
        background: '#000000',
        borderRadius: '8px',
        border: '3px solid #ffd700',
        padding: '10px 12px',
        fontFamily: "'Courier New', monospace",
        color: '#ffffff',
        minHeight: '180px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Notification overlay */}
      {notification && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: `linear-gradient(90deg, ${notification.color}22, ${notification.color}11)`,
            borderBottom: `1px solid ${notification.color}55`,
            padding: '5px 8px',
            fontSize: '9px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            zIndex: 10,
            animation: 'slideIn 0.3s ease',
          }}
        >
          <span>{notification.icon}</span>
          <span style={{ color: notification.color, fontWeight: 700 }}>{notification.text}</span>
        </div>
      )}

      {/* Top row: Time */}
      <div style={{ fontSize: '13px', fontWeight: 900, color: '#ffffff', marginBottom: '6px', marginTop: notification ? '22px' : '0' }}>
        {hours}:{mins}
        <span style={{ fontSize: '9px', color: '#94a3b8', marginLeft: '4px' }}>{secs}s</span>
      </div>

      {/* Sensor data column */}
      <div style={{ fontSize: '9.5px', color: '#e2e8f0', lineHeight: 1.7, marginBottom: '6px' }}>
        <span style={{ color: '#facc15' }}>T: </span>{temp} C<br />
        <span style={{ color: '#60a5fa' }}>P: </span>{pressure} hPa<br />
        <span style={{ color: '#34d399' }}>A: </span>{altitude} m<br />
        <span style={{ color: '#f472b6' }}>D: </span>{distance} mm
      </div>

      {/* Yellow border box face area */}
      <div
        style={{
          border: '1.5px solid #ffd700',
          borderRadius: '4px',
          padding: '6px 10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
        }}
      >
        {/* Eyes */}
        <div style={{ display: 'flex', gap: '22px', fontSize: '16px', color: '#ffffff' }}>
          <span>{leftEye}</span>
          <span>{rightEye}</span>
        </div>
        {/* Mouth */}
        <div style={{ fontSize: '12px', color: '#ffffff' }}>{mouthMap[face]}</div>
        {/* Happy cheeks */}
        {cheek && (
          <div style={{ fontSize: '8px', color: '#fda4af', display: 'flex', gap: '28px' }}>
            <span>{cheek}</span>
            <span>{cheek}</span>
          </div>
        )}
      </div>

      {/* Right side: signal bars decoration */}
      <div
        style={{
          position: 'absolute',
          top: notification ? '26px' : '10px',
          right: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '1px',
          fontSize: '8px',
          color: '#ffd700',
        }}
      >
        ╱╲<br />╱╲<br />╱╲
      </div>
    </div>
  )
}

export default function Kwiee() {
  const { openBookingModal } = useKeyboardContext()

  useEffect(() => {
    document.title = 'Kwiee — Smart Desktop Buddy & Sensor Hub by Karmaveon'
  }, [])

  const [activeTab, setActiveTab] = useState('features')

  const features = [
    {
      icon: '🌡️',
      title: 'Real-Time Sensor Telemetry',
      desc: 'Live temperature, atmospheric pressure, altitude, and distance readings from onboard DHT22 & VL53L0X sensors — updated every second.',
      color: '#059669',
    },
    {
      icon: '⏰',
      title: 'Always-On Clock',
      desc: 'Persistent real-time clock display on its TFT screen — glanceable time at any moment without touching your phone.',
      color: '#0284c7',
    },
    {
      icon: '🔔',
      title: 'Short Push Notifications',
      desc: 'Receive bite-sized notifications — WhatsApp messages, Gmail, Slack, Calendar reminders — right on the device screen. No phone needed.',
      color: '#7c3aed',
    },
    {
      icon: '😊',
      title: 'ASCII Face Feedback',
      desc: "Kwiee has personality. It blinks, smiles when a notification arrives, and gives you ambient 'mood' feedback based on sensor conditions.",
      color: '#db2777',
    },
    {
      icon: '📏',
      title: 'VL53L0X Distance Sensor',
      desc: 'Measures proximity and distance accurately — useful for presence detection, object ranging, or ambient intelligence triggers.',
      color: '#f59e0b',
    },
    {
      icon: '🖥️',
      title: 'High-Resolution TFT Display',
      desc: 'Crisp, bright handheld TFT screen shows all data and face animations clearly, even in direct light.',
      color: '#ff5733',
    },
  ]

  const specs = [
    { label: 'Display', value: 'High-Resolution TFT (SPI)' },
    { label: 'Temp Sensor', value: 'DHT22 (±0.5°C)' },
    { label: 'Pressure / Alt', value: 'BMP280 / MEMS Barometer' },
    { label: 'Distance Sensor', value: 'VL53L0X ToF (up to 2m)' },
    { label: 'Microcontroller', value: 'ESP32 / Arduino-compatible' },
    { label: 'Connectivity', value: 'WiFi (for push notifications)' },
    { label: 'Power', value: 'USB-C or LiPo battery' },
    { label: 'Form Factor', value: 'Compact handheld / desk stand' },
    { label: 'Firmware', value: 'Custom C++ (Arduino IDE)' },
    { label: 'Notification Bridge', value: 'MQTT over WiFi' },
  ]

  const terminalLines = [
    '> Kwiee firmware booting...',
    '> TFT display init: OK ✓',
    '> DHT22 sensor: 24.7°C active',
    '> VL53L0X distance: 382mm',
    '> WiFi connected to MQTT broker',
    '> Push notification bridge: LIVE ✓',
    '> ASCII face engine: active 😊',
    '> Clock sync: 00:41:22',
    '> All systems NOMINAL ✓',
  ]

  const [terminalShown, setTerminalShown] = useState(0)
  const [isBooting, setIsBooting] = useState(false)

  const handleBoot = () => {
    setTerminalShown(0)
    setIsBooting(true)
    terminalLines.forEach((_, idx) => {
      setTimeout(() => {
        setTerminalShown(idx + 1)
        if (idx === terminalLines.length - 1) setIsBooting(false)
      }, idx * 260)
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', color: '#0f172a', paddingBottom: '120px' }}>

      {/* ── Breadcrumb ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#94a3b8' }}>
          <Link to="/products" style={{ color: '#059669', textDecoration: 'none', fontWeight: 700 }}>Products</Link>
          <span>›</span>
          <span style={{ color: '#0f172a', fontWeight: 700 }}>Kwiee</span>
        </div>
      </div>

      {/* ── Hero Section ── */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '48px 24px 60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: '60px',
          alignItems: 'center',
        }}
      >
        {/* Left: Text */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span
              style={{
                background: 'rgba(5, 150, 105, 0.12)',
                border: '1px solid rgba(5, 150, 105, 0.35)',
                color: '#059669',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                padding: '4px 12px',
                borderRadius: '100px',
              }}
            >
              🔌 Custom Hardware · Prototype
            </span>
            <span
              style={{
                background: '#fef9c3',
                border: '1px solid #fde047',
                color: '#92400e',
                fontSize: '10px',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '100px',
              }}
            >
              New Drop
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 58px)',
              fontWeight: 900,
              color: '#0f172a',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            Kwiee —{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #059669, #0284c7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Smart Desktop Buddy
            </span>
          </h1>

          <p style={{ fontSize: '18px', color: '#475569', lineHeight: 1.7, marginBottom: '28px' }}>
            A smart device that{' '}
            <strong style={{ color: '#0f172a' }}>keeps an eye on you</strong> — showing live temperature, real time clock, atmospheric pressure, distance sensing, and short push notifications right on its TFT screen. Compact. Handheld. Always alive.
          </p>

          {/* Key pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {['Arduino / ESP32', 'TFT Display', 'DHT22 Temp Sensor', 'VL53L0X Distance', 'WiFi Push Notifs', 'ASCII Face UI'].map(t => (
              <span
                key={t}
                style={{
                  padding: '5px 13px',
                  borderRadius: '8px',
                  background: '#f1f5f9',
                  border: '1px solid #e2e8f0',
                  color: '#334155',
                  fontSize: '12px',
                  fontWeight: 700,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={openBookingModal}
              style={{
                padding: '14px 32px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #059669, #047857)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(5, 150, 105, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🔌</span>
              <span>Request a Custom Build</span>
            </button>
            <Link to="/services" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  padding: '14px 24px',
                  borderRadius: '10px',
                  border: '1.5px solid #059669',
                  background: 'transparent',
                  color: '#059669',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>View Hardware Services</span>
                <span>→</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Right: Device visual */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          {/* Device chassis */}
          <div
            style={{
              background: '#111827',
              borderRadius: '16px',
              padding: '16px',
              border: '3px solid #1f2937',
              boxShadow: '0 30px 60px rgba(0,0,0,0.25), 0 0 40px rgba(5, 150, 105, 0.12)',
              width: '100%',
              maxWidth: '320px',
              position: 'relative',
            }}
          >
            {/* PCB header component decoration */}
            <div
              style={{
                position: 'absolute',
                top: '-14px',
                right: '30px',
                background: '#6b21a8',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '8px',
                color: '#e9d5ff',
                fontFamily: 'monospace',
                fontWeight: 700,
                border: '1px solid #7c3aed',
              }}
            >
              UL53L0X
            </div>

            {/* Red PCB left rail */}
            <div
              style={{
                position: 'absolute',
                left: '-4px',
                top: '16px',
                bottom: '16px',
                width: '8px',
                background: 'linear-gradient(180deg, #dc2626, #991b1b)',
                borderRadius: '4px 0 0 4px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                paddingBlock: '6px',
              }}
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} style={{ width: '4px', height: '2px', background: '#fca5a5', borderRadius: '1px' }} />
              ))}
            </div>

            {/* Blue cable detail */}
            <div
              style={{
                position: 'absolute',
                right: '-6px',
                bottom: '30px',
                width: '10px',
                height: '40px',
                background: 'linear-gradient(180deg, #1d4ed8, #1e3a8a)',
                borderRadius: '0 4px 4px 0',
              }}
            />

            {/* The TFT Screen itself */}
            <KwieeLiveScreen />

            <div style={{ marginTop: '10px', textAlign: 'center', fontSize: '9px', color: '#6b7280', fontFamily: 'monospace', letterSpacing: '1px' }}>
              KWIEE v1.0 · ESP32 + TFT · LIVE FIRMWARE
            </div>
          </div>

          {/* Status badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(5, 150, 105, 0.08)',
              border: '1px solid rgba(5, 150, 105, 0.25)',
              borderRadius: '100px',
              padding: '6px 16px',
              fontSize: '11px',
              color: '#059669',
              fontWeight: 800,
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px #10b981',
              }}
            />
            Screen simulator above is running live sensor data
          </div>
        </div>
      </section>

      {/* ── Stats Strip ── */}
      <div
        style={{
          borderTop: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc',
          padding: '28px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '24px',
            textAlign: 'center',
          }}
        >
          {[
            { value: '< 1s', label: 'Sensor Update Rate' },
            { value: '5+', label: 'Onboard Sensors' },
            { value: 'WiFi', label: 'Push Notif Bridge' },
            { value: '100%', label: 'Offline Capable' },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: '28px', fontWeight: 900, color: '#059669' }}>{s.value}</div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabs: Features / Specs / Boot Terminal ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px 0' }}>
        {/* Tab buttons */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {[
            { id: 'features', label: '⚡ Features' },
            { id: 'specs', label: '🔩 Tech Specs' },
            { id: 'terminal', label: '💻 Firmware Boot Log' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '10px 22px',
                borderRadius: '10px',
                border: activeTab === t.id ? '1.5px solid #059669' : '1px solid #e2e8f0',
                background: activeTab === t.id ? '#059669' : '#ffffff',
                color: activeTab === t.id ? '#ffffff' : '#475569',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Features Grid ── */}
        {activeTab === 'features' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
              gap: '20px',
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '24px',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <div style={{ fontSize: '28px' }}>{f.icon}</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>{f.title}</div>
                <div style={{ fontSize: '14px', color: '#475569', lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── Tech Specs Table ── */}
        {activeTab === 'specs' && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
            }}
          >
            <div
              style={{
                background: '#0f172a',
                padding: '16px 24px',
                color: '#f8fafc',
                fontSize: '13px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🔩</span>
              <span>Kwiee Hardware Specification Sheet</span>
            </div>
            {specs.map((s, idx) => (
              <div
                key={s.label}
                style={{
                  display: 'flex',
                  padding: '14px 24px',
                  borderTop: idx === 0 ? 'none' : '1px solid #f1f5f9',
                  background: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                }}
              >
                <div style={{ width: '220px', flexShrink: 0, fontSize: '13px', fontWeight: 700, color: '#64748b' }}>{s.label}</div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{s.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── Firmware Boot Log ── */}
        {activeTab === 'terminal' && (
          <div
            style={{
              background: '#020617',
              borderRadius: '16px',
              border: '1px solid #1e293b',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            }}
          >
            {/* Terminal title bar */}
            <div
              style={{
                background: '#0f172a',
                padding: '12px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: '1px solid #1e293b',
              }}
            >
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ marginLeft: '10px', fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
                kwiee_serial_monitor @ 115200 baud
              </span>
            </div>

            {/* Terminal body */}
            <div style={{ padding: '24px', fontFamily: 'monospace', fontSize: '13px', minHeight: '260px' }}>
              {terminalLines.slice(0, terminalShown).map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    color: line.includes('✓') ? '#10b981' : line.includes('NOMINAL') ? '#34d399' : '#38bdf8',
                    marginBottom: '6px',
                  }}
                >
                  {line}
                </div>
              ))}
              {terminalShown === 0 && (
                <div style={{ color: '#334155', fontSize: '12px' }}>
                  Click "Boot Kwiee" to simulate device startup...
                </div>
              )}
              {isBooting && (
                <span style={{ color: '#f59e0b', animation: 'pulse 1s infinite' }}>▌</span>
              )}
            </div>

            <div style={{ padding: '0 24px 20px' }}>
              <button
                onClick={handleBoot}
                disabled={isBooting}
                style={{
                  background: isBooting ? '#1e293b' : 'linear-gradient(135deg, #059669, #047857)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '10px 24px',
                  fontSize: '13px',
                  fontWeight: 800,
                  cursor: isBooting ? 'not-allowed' : 'pointer',
                  boxShadow: isBooting ? 'none' : '0 4px 14px rgba(5, 150, 105, 0.4)',
                  transition: 'all 0.2s ease',
                }}
              >
                {isBooting ? '⚙️ Booting...' : '⚡ Boot Kwiee'}
              </button>
            </div>
          </div>
        )}
      </section>

      {/* ── How It Works ── */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '80px 24px 0',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ color: '#059669', fontSize: '12px', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 800, marginBottom: '10px' }}>
            How It Works
          </p>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 900, color: '#0f172a' }}>
            One Device. Eyes on Everything.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
            gap: '0',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
          }}
        >
          {[
            { step: '01', icon: '🔌', title: 'Power On', desc: 'Plug in via USB-C. Kwiee boots in under 3 seconds and immediately begins reading all sensors.' },
            { step: '02', icon: '📡', title: 'WiFi Connects', desc: 'Kwiee joins your home or office WiFi and subscribes to your MQTT notification broker.' },
            { step: '03', icon: '🌡️', title: 'Live Readings', desc: 'Temperature, pressure, altitude, and distance are measured and displayed in real-time, every second.' },
            { step: '04', icon: '🔔', title: 'Push Notifs', desc: 'Short notifications from WhatsApp, Gmail, Slack, or calendar pop on screen — Kwiee blinks and smiles.' },
          ].map((s, idx, arr) => (
            <div
              key={s.step}
              style={{
                padding: '28px 24px',
                borderRight: idx < arr.length - 1 ? '1px solid #f1f5f9' : 'none',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#059669',
                  background: 'rgba(5, 150, 105, 0.1)',
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: '100px',
                  marginBottom: '12px',
                  letterSpacing: '1px',
                }}
              >
                STEP {s.step}
              </div>
              <div style={{ fontSize: '26px', marginBottom: '10px' }}>{s.icon}</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>{s.title}</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.6 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          maxWidth: '700px',
          margin: '80px auto 0',
          padding: '0 24px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            borderRadius: '24px',
            padding: '48px 40px',
            color: '#f8fafc',
            boxShadow: '0 20px 50px rgba(0,0,0,0.12)',
          }}
        >
          <div style={{ fontSize: '36px', marginBottom: '12px' }}>🔌</div>
          <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '12px' }}>
            Want Kwiee for Your Desk?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '15px', lineHeight: 1.6, marginBottom: '28px' }}>
            We can build a custom Kwiee device tailored to your exact specs — notifications you need, sensors you want, form factor that fits your setup.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={openBookingModal}
              style={{
                padding: '14px 32px',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #059669, #047857)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 4px 18px rgba(5, 150, 105, 0.5)',
              }}
            >
              🔌 Request a Custom Build →
            </button>
            <Link to="/products" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  padding: '14px 24px',
                  borderRadius: '10px',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  background: 'transparent',
                  color: '#f8fafc',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                ← Back to Products
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
