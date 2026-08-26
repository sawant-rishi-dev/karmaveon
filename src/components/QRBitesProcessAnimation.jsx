import React, { useState, useEffect, useRef } from 'react'

/**
 * Bespoke Micro-Illustrations for each of the 6 QR Bites Steps
 */
function StepGraphic({ stepIndex, isActive, isHovered }) {
  // Step 1: SCAN (QR Code & Laser Scanner)
  if (stepIndex === 0) {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isActive || isHovered
            ? 'linear-gradient(135deg, rgba(255, 87, 51, 0.18), rgba(255, 138, 0, 0.12))'
            : '#f8fafc',
          border: `1.5px solid ${isActive || isHovered ? '#ff5733' : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isActive || isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
          boxShadow: isActive || isHovered ? '0 10px 24px rgba(255, 87, 51, 0.3)' : 'none',
          overflow: 'hidden',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Phone outline */}
          <rect x="7" y="3" width="18" height="26" rx="4" fill="#0f172a" stroke="#ff5733" strokeWidth="1.5" />
          <rect x="10" y="6" width="12" height="18" rx="2" fill="#1e293b" />
          
          {/* QR Code Matrix grid */}
          <rect x="12" y="8" width="3" height="3" fill="#ff5733" />
          <rect x="17" y="8" width="3" height="3" fill="#ff5733" />
          <rect x="12" y="13" width="3" height="3" fill="#ff5733" />
          <rect x="16" y="12" width="2" height="2" fill="#38bdf8" />
          <rect x="17" y="15" width="2" height="2" fill="#38bdf8" />
          <rect x="14" y="17" width="2" height="2" fill="#ff5733" />
          
          {/* Home indicator bar */}
          <line x1="14" y1="26.5" x2="18" y2="26.5" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
          
          {/* Scanning Laser Sweep Beam */}
          <line
            x1="9"
            y1="6"
            x2="23"
            y2="6"
            stroke="#ff5733"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 4px #ff5733)',
              animation: (isActive || isHovered) ? 'scanLaser 1.5s ease-in-out infinite' : 'none',
            }}
          />
        </svg>
      </div>
    )
  }

  // Step 2: BROWSE MENU (Digital Menu on Mobile)
  if (stepIndex === 1) {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isActive || isHovered
            ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.18), rgba(59, 130, 246, 0.12))'
            : '#f8fafc',
          border: `1.5px solid ${isActive || isHovered ? '#2563eb' : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isActive || isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
          boxShadow: isActive || isHovered ? '0 10px 24px rgba(37, 99, 235, 0.3)' : 'none',
          overflow: 'hidden',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Clipboard / Tablet */}
          <rect x="6" y="5" width="20" height="24" rx="3.5" fill="#0f172a" stroke="#2563eb" strokeWidth="1.5" />
          {/* Clip header */}
          <rect x="12" y="3" width="8" height="4" rx="1.5" fill="#f59e0b" />
          
          {/* Menu Item rows */}
          <rect x="9" y="10" width="8" height="3" rx="1" fill="#38bdf8" />
          <rect x="19" y="10" width="4" height="3" rx="1" fill="#10b981" />
          
          <rect x="9" y="15" width="10" height="3" rx="1" fill="rgba(255,255,255,0.7)" />
          <rect x="21" y="15" width="2" height="3" rx="1" fill="#f59e0b" />
          
          <rect x="9" y="20" width="7" height="3" rx="1" fill="rgba(255,255,255,0.5)" />
          <rect x="18" y="20" width="5" height="3" rx="1" fill="#38bdf8" />

          {/* Interactive Tap Finger / Sparkle */}
          <circle
            cx="21"
            cy="11.5"
            r="3"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="1"
            style={{
              animation: (isActive || isHovered) ? 'pulseDot 1s ease-in-out infinite' : 'none',
              transformOrigin: '21px 11.5px',
            }}
          />
        </svg>
      </div>
    )
  }

  // Step 3: PLACE ORDER (Smart Cart & Item Add)
  if (stepIndex === 2) {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isActive || isHovered
            ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(5, 150, 105, 0.12))'
            : '#f8fafc',
          border: `1.5px solid ${isActive || isHovered ? '#10b981' : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isActive || isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
          boxShadow: isActive || isHovered ? '0 10px 24px rgba(16, 185, 129, 0.3)' : 'none',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Shopping Cart Body */}
          <path
            d="M5 8H8L10.5 19H23L25.5 10H9"
            stroke="#10b981"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Cart Wheels */}
          <circle cx="12" cy="24" r="2.2" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" />
          <circle cx="21" cy="24" r="2.2" fill="#0f172a" stroke="#10b981" strokeWidth="1.2" />
          
          {/* Food Item Dropping into cart */}
          <circle
            cx="17"
            cy="11"
            r="3"
            fill="#f59e0b"
            style={{
              animation: (isActive || isHovered) ? 'fadeIn 0.8s ease-in-out infinite alternate' : 'none',
            }}
          />
          {/* Badge counter "+2" */}
          <circle cx="24" cy="7" r="4.5" fill="#ef4444" />
          <text x="24" y="9.5" fontSize="6" fontWeight="900" fill="#ffffff" textAnchor="middle">2</text>
        </svg>
      </div>
    )
  }

  // Step 4: ORDER SENT (Instant Lightning Cloud Dispatch)
  if (stepIndex === 3) {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isActive || isHovered
            ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(251, 191, 36, 0.12))'
            : '#f8fafc',
          border: `1.5px solid ${isActive || isHovered ? '#f59e0b' : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isActive || isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
          boxShadow: isActive || isHovered ? '0 10px 24px rgba(245, 158, 11, 0.3)' : 'none',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Lightning Bolt */}
          <path
            d="M18 4L7 17H16L14 28L25 15H16L18 4Z"
            fill={isActive || isHovered ? '#f59e0b' : '#fbbf24'}
            stroke="#d97706"
            strokeWidth="1.2"
            strokeLinejoin="round"
            style={{
              filter: (isActive || isHovered) ? 'drop-shadow(0 0 6px #f59e0b)' : 'none',
              transform: (isActive || isHovered) ? 'scale(1.05)' : 'scale(1)',
              transformOrigin: '16px 16px',
              transition: 'transform 0.2s ease',
            }}
          />
          {/* Transmission Signal Arcs */}
          <path
            d="M24 7C26.5 9.5 26.5 13.5 24 16"
            stroke="#ff5733"
            strokeWidth="1.6"
            strokeLinecap="round"
            style={{
              animation: (isActive || isHovered) ? 'pulseDot 0.8s ease-in-out infinite alternate' : 'none',
            }}
          />
          <path
            d="M27 4C30.5 7.5 30.5 16 27 19.5"
            stroke="#ff5733"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
        </svg>
      </div>
    )
  }

  // Step 5: KITCHEN RECEIVES (KDS Alert & Chef Ticket)
  if (stepIndex === 4) {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isActive || isHovered
            ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.18), rgba(168, 85, 247, 0.12))'
            : '#f8fafc',
          border: `1.5px solid ${isActive || isHovered ? '#7c3aed' : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isActive || isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
          boxShadow: isActive || isHovered ? '0 10px 24px rgba(124, 58, 237, 0.3)' : 'none',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Kitchen Display System Screen */}
          <rect x="5" y="6" width="22" height="17" rx="3" fill="#0f172a" stroke="#7c3aed" strokeWidth="1.5" />
          <path d="M11 27H21M16 23V27" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Ticket Print sliding down */}
          <rect x="9" y="10" width="14" height="10" rx="1.5" fill="#ffffff" />
          <line x1="11" y1="13" x2="19" y2="13" stroke="#ff5733" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="11" y1="16" x2="17" y2="16" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" />
          
          {/* Alert Bell / Ping Beacon */}
          <circle
            cx="24"
            cy="7"
            r="3"
            fill="#ef4444"
            style={{
              animation: (isActive || isHovered) ? 'pulseDot 0.6s ease-in-out infinite alternate' : 'none',
              transformOrigin: '24px 7px',
            }}
          />
        </svg>
      </div>
    )
  }

  // Step 6: MANAGER DASHBOARD (Real-Time Live Analytics)
  if (stepIndex === 5) {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isActive || isHovered
            ? 'linear-gradient(135deg, rgba(219, 39, 119, 0.18), rgba(244, 63, 94, 0.12))'
            : '#f8fafc',
          border: `1.5px solid ${isActive || isHovered ? '#db2777' : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isActive || isHovered ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
          boxShadow: isActive || isHovered ? '0 10px 24px rgba(219, 39, 119, 0.3)' : 'none',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Dashboard Window Frame */}
          <rect x="4" y="5" width="24" height="22" rx="3.5" fill="#0f172a" stroke="#db2777" strokeWidth="1.5" />
          
          {/* Animated Bar Chart Columns */}
          {/* Bar 1 */}
          <rect
            x="8"
            y={isActive || isHovered ? 14 : 17}
            width="3.5"
            height={isActive || isHovered ? 9 : 6}
            rx="1"
            fill="#38bdf8"
            style={{ transition: 'all 0.4s ease' }}
          />
          {/* Bar 2 */}
          <rect
            x="14"
            y={isActive || isHovered ? 10 : 13}
            width="3.5"
            height={isActive || isHovered ? 13 : 10}
            rx="1"
            fill="#10b981"
            style={{ transition: 'all 0.4s ease' }}
          />
          {/* Bar 3 */}
          <rect
            x="20"
            y={isActive || isHovered ? 8 : 11}
            width="3.5"
            height={isActive || isHovered ? 15 : 12}
            rx="1"
            fill="#db2777"
            style={{ transition: 'all 0.4s ease' }}
          />
          
          {/* Trend arrow upward */}
          <path
            d="M8 12L15 8L21 6"
            stroke="#fbbf24"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }

  return null
}

export default function QRBitesProcessAnimation() {
  const steps = [
    {
      step: '1',
      title: 'SCAN',
      badge: 'Table QR',
      desc: 'Customer scans the unique QR code placed on their table.',
      color: '#ff5733',
      lightBg: 'rgba(255, 87, 51, 0.06)',
      pillBg: 'rgba(255, 87, 51, 0.12)',
      liveStatus: '📱 Camera opens instant lightweight Web App — zero install or download required',
      timeEstimate: '1.2s',
    },
    {
      step: '2',
      title: 'BROWSE MENU',
      badge: 'Digital Menu',
      desc: 'The full digital menu opens instantly on their phone.',
      color: '#2563eb',
      lightBg: 'rgba(37, 99, 235, 0.06)',
      pillBg: 'rgba(37, 99, 235, 0.12)',
      liveStatus: '📋 Interactive categories, high-res photos, spice levels, and dietary tags',
      timeEstimate: 'Instant',
    },
    {
      step: '3',
      title: 'PLACE ORDER',
      badge: 'Custom Cart',
      desc: 'Customer selects items, customizes, and confirms the order.',
      color: '#10b981',
      lightBg: 'rgba(16, 185, 129, 0.06)',
      pillBg: 'rgba(16, 185, 129, 0.12)',
      liveStatus: '🛒 Special requests (no onions, extra cheese) are recorded without waiter errors',
      timeEstimate: 'Real-time',
    },
    {
      step: '4',
      title: 'ORDER SENT',
      badge: 'Cloud Sync',
      desc: 'Order is instantly sent with the exact table number (e.g., Table 05).',
      color: '#f59e0b',
      lightBg: 'rgba(245, 158, 11, 0.06)',
      pillBg: 'rgba(245, 158, 11, 0.12)',
      liveStatus: '⚡ Encrypted order package broadcasts directly to KDS with exact Table 05 pin',
      timeEstimate: '0.4s',
    },
    {
      step: '5',
      title: 'KITCHEN RECEIVES',
      badge: 'KDS Display',
      desc: 'Kitchen staff gets a real-time alert with the order details.',
      color: '#7c3aed',
      lightBg: 'rgba(124, 58, 237, 0.06)',
      pillBg: 'rgba(124, 58, 237, 0.12)',
      liveStatus: '👨‍🍳 Live Kitchen Display sounds chime & prints thermal station ticket instantly',
      timeEstimate: '< 2s',
    },
    {
      step: '6',
      title: 'MANAGER DASHBOARD',
      badge: 'Live Analytics',
      desc: 'Manager views all live orders, tracks status, and checks sales.',
      color: '#db2777',
      lightBg: 'rgba(219, 39, 119, 0.06)',
      pillBg: 'rgba(219, 39, 119, 0.12)',
      liveStatus: '📊 Owner dashboard tracks prep time, live revenue, best sellers, and table turnover',
      timeEstimate: 'Continuous',
    },
  ]

  const [activeStep, setActiveStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [hoveredStep, setHoveredStep] = useState(null)
  const [progress, setProgress] = useState(0)
  const timerRef = useRef(null)

  // Step duration in ms
  const STEP_DURATION = 3600

  useEffect(() => {
    if (!isPlaying) return

    const interval = 50 // update progress every 50ms
    const stepIncrement = (interval / STEP_DURATION) * 100

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((current) => (current + 1) % steps.length)
          return 0
        }
        return prev + stepIncrement
      })
    }, interval)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isPlaying, steps.length])

  const handleStepClick = (index) => {
    setActiveStep(index)
    setProgress(0)
  }

  const currentStepData = steps[activeStep]

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* ── Interactive Flow Controller & Live Simulator Bar ── */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          border: '1px solid #e2e8f0',
          padding: '18px 24px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
          marginBottom: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Top bar: Stage title, status, and playback controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          {/* Left: Active Step Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: currentStepData.lightBg,
                color: currentStepData.color,
                border: `1px solid ${currentStepData.color}40`,
                padding: '6px 14px',
                borderRadius: '100px',
                fontWeight: 900,
                fontSize: '13px',
                letterSpacing: '0.5px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: currentStepData.color,
                  boxShadow: `0 0 10px ${currentStepData.color}`,
                }}
              />
              STEP {currentStepData.step} of 6 : {currentStepData.title}
            </span>

            <span
              style={{
                fontSize: '12px',
                color: '#64748b',
                background: '#f1f5f9',
                padding: '4px 10px',
                borderRadius: '8px',
                fontWeight: 700,
              }}
            >
              ⚡ Latency: {currentStepData.timeEstimate}
            </span>
          </div>

          {/* Right: Step navigation and play/pause */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => {
                setActiveStep((prev) => (prev - 1 + steps.length) % steps.length)
                setProgress(0)
              }}
              aria-label="Previous step"
              style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                padding: '6px 12px',
                fontSize: '13px',
                fontWeight: 800,
                color: '#334155',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#f8fafc')}
            >
              ← Prev
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                background: isPlaying ? 'rgba(255, 87, 51, 0.1)' : '#ff5733',
                border: `1px solid ${isPlaying ? '#ff5733' : 'transparent'}`,
                color: isPlaying ? '#ff5733' : '#ffffff',
                borderRadius: '10px',
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease',
              }}
            >
              {isPlaying ? '⏸ Pause' : '▶ Auto-Play'}
            </button>

            <button
              onClick={() => {
                setActiveStep((prev) => (prev + 1) % steps.length)
                setProgress(0)
              }}
              aria-label="Next step"
              style={{
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                borderRadius: '10px',
                padding: '6px 12px',
                fontSize: '13px',
                fontWeight: 800,
                color: '#334155',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#e2e8f0')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#f8fafc')}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Live Simulation Description */}
        <div
          style={{
            fontSize: '14px',
            color: '#1e293b',
            fontWeight: 600,
            background: '#f8fafc',
            borderLeft: `4px solid ${currentStepData.color}`,
            padding: '10px 16px',
            borderRadius: '0 12px 12px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'border-color 0.3s ease',
          }}
        >
          <span>{currentStepData.liveStatus}</span>
        </div>

        {/* Continuous Step Progression Track */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          {steps.map((s, idx) => {
            const isCurrent = idx === activeStep
            const isCompleted = idx < activeStep
            return (
              <div
                key={s.step}
                onClick={() => handleStepClick(idx)}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                {/* Progress bar line segment */}
                <div
                  style={{
                    height: '6px',
                    borderRadius: '4px',
                    background: '#e2e8f0',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      background: s.color,
                      width: isCompleted ? '100%' : isCurrent ? `${progress}%` : '0%',
                      transition: isCurrent ? 'none' : 'width 0.3s ease',
                      borderRadius: '4px',
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── 6 Process Cards Grid (Matching the Exact Visual Specs with Smooth Animations) ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '24px',
        }}
      >
        {steps.map((item, idx) => {
          const isActive = idx === activeStep
          const isHovered = idx === hoveredStep

          return (
            <div
              key={item.step}
              onClick={() => handleStepClick(idx)}
              onMouseEnter={() => setHoveredStep(idx)}
              onMouseLeave={() => setHoveredStep(null)}
              style={{
                background: isActive ? '#ffffff' : '#ffffff',
                border: `2px solid ${
                  isActive ? item.color : isHovered ? `${item.color}80` : '#e2e8f0'
                }`,
                borderRadius: '24px',
                padding: '30px 24px',
                boxShadow: isActive
                  ? `0 20px 45px -10px ${item.color}35, 0 4px 16px rgba(0,0,0,0.04)`
                  : isHovered
                  ? `0 14px 30px -8px ${item.color}25`
                  : '0 4px 20px rgba(0,0,0,0.03)',
                position: 'relative',
                cursor: 'pointer',
                transform: isActive ? 'translateY(-6px) scale(1.02)' : isHovered ? 'translateY(-3px)' : 'translateY(0)',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              {/* Background ambient gradient glow for active card */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-40%',
                    right: '-30%',
                    width: '180px',
                    height: '180px',
                    background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`,
                    borderRadius: '50%',
                    pointerEvents: 'none',
                  }}
                />
              )}

              {/* Top Header: Micro-Illustration & Step Badge */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                <StepGraphic stepIndex={idx} isActive={isActive} isHovered={isHovered} />

                {/* Step badge */}
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: 900,
                    color: item.color,
                    background: item.pillBg,
                    border: `1px solid ${isActive ? item.color : 'transparent'}`,
                    padding: '5px 12px',
                    borderRadius: '100px',
                    letterSpacing: '0.8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.25s ease',
                    boxShadow: isActive ? `0 2px 10px ${item.color}30` : 'none',
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: item.color,
                        animation: 'pulseDot 0.8s infinite alternate',
                      }}
                    />
                  )}
                  STEP {item.step}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3
                  style={{
                    fontSize: '19px',
                    fontWeight: 900,
                    color: '#0f172a',
                    marginBottom: '8px',
                    letterSpacing: '-0.2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    color: '#64748b',
                    fontSize: '14.5px',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {item.desc}
                </p>
              </div>

              {/* Bottom dynamic micro-state indicator */}
              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '14px',
                  borderTop: `1px dashed ${isActive ? `${item.color}40` : '#f1f5f9'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: isActive ? item.color : '#94a3b8',
                  transition: 'all 0.25s ease',
                }}
              >
                <span>{item.badge}</span>
                <span>{isActive ? '● Active Step' : `Click to view →`}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
