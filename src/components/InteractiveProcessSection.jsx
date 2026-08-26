import React, { useState } from 'react'

/**
 * StepAnimatedIcon — Bespoke SVG/HTML Micro-Illustrations for 4-Step Process
 */
function StepAnimatedIcon({ stepIndex, isHovered, color }) {
  // ── Step 01: Discovery Radar & Architecture Blueprint ──────────
  if (stepIndex === 0) {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isHovered ? 'linear-gradient(135deg, rgba(255, 87, 51, 0.22), rgba(225, 29, 72, 0.12))' : 'rgba(255, 87, 51, 0.08)',
          border: `1.5px solid ${isHovered ? 'rgba(255, 87, 51, 0.6)' : 'rgba(255, 87, 51, 0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'scale(1.12) rotate(-3deg)' : 'scale(1)',
          boxShadow: isHovered ? '0 10px 24px rgba(255, 87, 51, 0.35)' : 'none',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Radar Circles */}
          <circle cx="16" cy="16" r="13" stroke={color} strokeWidth="1.2" strokeOpacity="0.4" />
          <circle cx="16" cy="16" r="8" stroke={color} strokeWidth="1.2" strokeOpacity="0.6" />
          <circle cx="16" cy="16" r="3" fill={color} />
          {/* Scanning Sweep Line */}
          <line
            x1="16"
            y1="16"
            x2="28"
            y2="10"
            stroke={isHovered ? '#38BDF8' : color}
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{
              transformOrigin: '16px 16px',
              animation: isHovered ? 'spinGpu 1.2s linear infinite' : 'spinGpu 4s linear infinite',
            }}
          />
          {/* Blinking Data Blip */}
          <circle cx="22" cy="12" r="1.5" fill="#10B981" />
        </svg>
      </div>
    )
  }

  // ── Step 02: Rapid Prototyping & Figma Wireframes ─────────────
  if (stepIndex === 1) {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isHovered ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.22), rgba(59, 130, 246, 0.12))' : 'rgba(37, 99, 235, 0.08)',
          border: `1.5px solid ${isHovered ? 'rgba(37, 99, 235, 0.6)' : 'rgba(37, 99, 235, 0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'scale(1.12) rotate(3deg)' : 'scale(1)',
          boxShadow: isHovered ? '0 10px 24px rgba(37, 99, 235, 0.35)' : 'none',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Wireframe Canvas Window */}
          <rect x="5" y="6" width="22" height="20" rx="3.5" fill="#090D16" stroke={color} strokeWidth="1.5" />
          {/* UI Header & Sidebar blocks */}
          <rect x="8" y="9" width="16" height="3.5" rx="1" fill={isHovered ? '#38BDF8' : 'rgba(255,255,255,0.4)'} />
          <rect x="8" y="14.5" width="4.5" height="8.5" rx="1" fill={isHovered ? '#60A5FA' : 'rgba(255,255,255,0.2)'} />
          <rect x="14" y="14.5" width="10" height="8.5" rx="1" fill={isHovered ? '#2563EB' : 'rgba(255,255,255,0.1)'} />
          {/* Vector Pen / Click Pointer */}
          <path
            d="M19 19L23 25L21 26L18 20L19 19Z"
            fill="#F59E0B"
            style={{
              transform: isHovered ? 'translate(-2px, -2px)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          />
        </svg>
      </div>
    )
  }

  // ── Step 03: 4-Week Turbo Sprint & Continuous Staging ──────────
  if (stepIndex === 2) {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isHovered ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.22), rgba(168, 85, 247, 0.12))' : 'rgba(124, 58, 237, 0.08)',
          border: `1.5px solid ${isHovered ? 'rgba(124, 58, 237, 0.6)' : 'rgba(124, 58, 237, 0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'scale(1.12) translateY(-3px)' : 'scale(1)',
          boxShadow: isHovered ? '0 10px 24px rgba(124, 58, 237, 0.35)' : 'none',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Rocket Body */}
          <path
            d="M16 4C16 4 23 10 22 20L16 18L10 20C9 10 16 4 16 4Z"
            fill="#090D16"
            stroke={color}
            strokeWidth="1.6"
            style={{
              transform: isHovered ? 'translateY(-1.5px)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          />
          {/* Rocket Window */}
          <circle cx="16" cy="11" r="2.2" fill="#38BDF8" />
          {/* Rocket Fins */}
          <path d="M10 17L6 21V23L10 20V17Z" fill={color} />
          <path d="M22 17L26 21V23L22 20V17Z" fill={color} />
          {/* Turbo Thruster Flame */}
          <path
            d="M14 20C14 20 16 27 16 27C16 27 18 20 18 20"
            stroke={isHovered ? '#F59E0B' : '#EC4899'}
            strokeWidth="2.2"
            strokeLinecap="round"
            style={{
              animation: isHovered ? 'pulseDot 0.4s ease-in-out infinite alternate' : 'none',
            }}
          />
        </svg>
      </div>
    )
  }

  // ── Step 04: 30-Day Warranty & System Monitoring ──────────────
  if (stepIndex === 3) {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isHovered ? 'linear-gradient(135deg, rgba(219, 39, 119, 0.22), rgba(244, 63, 94, 0.12))' : 'rgba(219, 39, 119, 0.08)',
          border: `1.5px solid ${isHovered ? 'rgba(219, 39, 119, 0.6)' : 'rgba(219, 39, 119, 0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'scale(1.12) rotate(-3deg)' : 'scale(1)',
          boxShadow: isHovered ? '0 10px 24px rgba(219, 39, 119, 0.35)' : 'none',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Cyber Armor Shield */}
          <path
            d="M16 4L6 8V16C6 22.5 10.5 27 16 28.5C21.5 27 26 22.5 26 16V8L16 4Z"
            fill="#090D16"
            stroke={color}
            strokeWidth="1.6"
          />
          {/* 100% Verified Checkmark / Heartbeat Wave */}
          <path
            d="M11 16L14.5 19.5L21 12.5"
            stroke={isHovered ? '#10B981' : '#FFF'}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'none',
              transformOrigin: '16px 16px',
              transition: 'all 0.2s ease',
            }}
          />
        </svg>
      </div>
    )
  }

  return null
}

function ProcessStepCard({ step, idx }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        padding: '32px 24px',
        borderRadius: '20px',
        position: 'relative',
        overflow: 'hidden',
        background: isHovered ? '#FFFFFF' : '#FAFAF9',
        border: `1.5px solid ${isHovered ? step.color : 'rgba(226, 232, 240, 0.9)'}`,
        boxShadow: isHovered
          ? `0 16px 36px -8px ${step.color}25, 0 4px 12px rgba(0,0,0,0.03)`
          : '0 6px 20px rgba(0, 0, 0, 0.02)',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        cursor: 'default',
      }}
    >
      {/* Giant Watermark Step Number with Neon Glow on Hover */}
      <div
        style={{
          position: 'absolute',
          top: '-8px',
          right: '16px',
          fontSize: '80px',
          fontWeight: 900,
          color: step.color,
          opacity: isHovered ? 0.22 : 0.08,
          lineHeight: 1,
          userSelect: 'none',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'scale(1.05) rotate(-3deg)' : 'scale(1)',
        }}
      >
        {step.number}
      </div>

      {/* Custom Interactive Animated Micro-Illustration */}
      <div style={{ zIndex: 2 }}>
        <StepAnimatedIcon stepIndex={idx} isHovered={isHovered} color={step.color} />
      </div>

      {/* Step Tag Pill */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: '100px',
          background: `${step.color}15`,
          border: `1px solid ${isHovered ? step.color : `${step.color}40`}`,
          color: step.color,
          fontSize: '11px',
          letterSpacing: '1.5px',
          fontWeight: 800,
          textTransform: 'uppercase',
          width: 'fit-content',
          transition: 'all 0.25s ease',
          boxShadow: isHovered ? `0 2px 10px ${step.color}30` : 'none',
          zIndex: 2,
        }}
      >
        <span>●</span>
        <span>Step {step.number}</span>
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 800,
          color: '#0f172a',
          lineHeight: 1.35,
          margin: 0,
          zIndex: 2,
        }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        style={{
          color: '#475569',
          fontSize: '14px',
          lineHeight: 1.6,
          margin: 0,
          zIndex: 2,
        }}
      >
        {step.desc}
      </p>
    </div>
  )
}

export default function InteractiveProcessSection({ steps }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '24px',
        position: 'relative',
      }}
    >
      {steps.map((step, idx) => (
        <ProcessStepCard key={step.number} step={step} idx={idx} />
      ))}
    </div>
  )
}
