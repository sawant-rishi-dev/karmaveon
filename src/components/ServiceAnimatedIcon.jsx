import React from 'react'

/**
 * ServiceAnimatedIcon — High-Impact Animated SVG/HTML Visualizers
 * Features smooth continuous idle animations + hyper-charged interactive hover effects.
 */
export default function ServiceAnimatedIcon({ type, isHovered, color = '#ff5733' }) {
  // ── 1. Web & SaaS Platforms ──────────────────────────────────
  if (type === 'web') {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isHovered
            ? 'linear-gradient(135deg, rgba(255, 87, 51, 0.22), rgba(225, 29, 72, 0.14))'
            : 'rgba(255, 87, 51, 0.08)',
          border: `1.5px solid ${isHovered ? 'rgba(255, 87, 51, 0.6)' : 'rgba(255, 87, 51, 0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'scale(1.12) translateY(-2px)' : 'scale(1)',
          boxShadow: isHovered ? '0 10px 24px rgba(255, 87, 51, 0.35)' : '0 2px 8px rgba(0,0,0,0.02)',
          overflow: 'hidden',
        }}
      >
        {/* Scanning laser beam on hover */}
        {isHovered && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent, rgba(255, 87, 51, 0.25), transparent)',
              animation: 'scanLaser 1.2s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
        )}

        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Mini Browser Frame */}
          <rect x="3" y="5" width="26" height="22" rx="4" fill="#090D16" stroke={color} strokeWidth="1.5" />
          {/* Traffic Dots */}
          <circle cx="7.5" cy="9" r="1.5" fill="#EF4444" opacity={isHovered ? '1' : '0.8'} />
          <circle cx="12" cy="9" r="1.5" fill="#F59E0B" opacity={isHovered ? '1' : '0.8'} />
          <circle cx="16.5" cy="9" r="1.5" fill="#10B981" opacity={isHovered ? '1' : '0.8'} />
          {/* Header Line */}
          <line x1="3" y1="13" x2="29" y2="13" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          {/* Code < / > Tags with dynamic typing bounce */}
          <path
            d="M10 20L7.5 17.5L10 15"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: isHovered ? 'translateX(-2px)' : 'translateX(0)',
              transition: 'transform 0.25s ease',
            }}
          />
          <path
            d="M22 20L24.5 17.5L22 15"
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
              transition: 'transform 0.25s ease',
            }}
          />
          <line
            x1="17.5"
            y1="15"
            x2="14.5"
            y2="21"
            stroke="#38BDF8"
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{
              transform: isHovered ? 'rotate(8deg)' : 'none',
              transformOrigin: '16px 18px',
              transition: 'transform 0.25s ease',
            }}
          />
        </svg>
      </div>
    )
  }

  // ── 2. Mobile App Development ────────────────────────────────
  if (type === 'mobile') {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isHovered
            ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.22), rgba(99, 102, 241, 0.14))'
            : 'rgba(124, 58, 237, 0.08)',
          border: `1.5px solid ${isHovered ? 'rgba(124, 58, 237, 0.6)' : 'rgba(124, 58, 237, 0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'scale(1.12) translateY(-2px)' : 'scale(1)',
          boxShadow: isHovered ? '0 10px 24px rgba(124, 58, 237, 0.35)' : '0 2px 8px rgba(0,0,0,0.02)',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Smartphone Chassis */}
          <rect x="7" y="3" width="18" height="26" rx="4.5" fill="#090D16" stroke={color} strokeWidth="1.5" />
          {/* Dynamic Island Notch with Pulse */}
          <rect
            x="13"
            y="5.5"
            width="6"
            height="2"
            rx="1"
            fill={isHovered ? '#38BDF8' : '#64748B'}
            style={{
              transform: isHovered ? 'scaleX(1.2)' : 'scaleX(1)',
              transformOrigin: '16px 6.5px',
              transition: 'all 0.2s ease',
            }}
          />
          {/* App Icons Grid with glowing wave */}
          <rect x="10" y="10" width="4" height="4" rx="1.2" fill={isHovered ? '#38BDF8' : '#7C3AED'} />
          <rect x="15" y="10" width="4" height="4" rx="1.2" fill={isHovered ? '#EC4899' : 'rgba(255,255,255,0.45)'} />
          <rect x="10" y="15.5" width="4" height="4" rx="1.2" fill={isHovered ? '#10B981' : 'rgba(255,255,255,0.45)'} />
          <rect x="15" y="15.5" width="4" height="4" rx="1.2" fill={isHovered ? '#F59E0B' : '#7C3AED'} />
          {/* Interactive Swipe Indicator Bar */}
          <line
            x1="12"
            y1="25.5"
            x2="20"
            y2="25.5"
            stroke={isHovered ? '#34D399' : 'rgba(255,255,255,0.5)'}
            strokeWidth="1.8"
            strokeLinecap="round"
            style={{
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              transition: 'transform 0.25s ease',
            }}
          />
        </svg>
      </div>
    )
  }

  // ── 3. n8n Workflow Automation ───────────────────────────────
  if (type === 'automation') {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isHovered
            ? 'linear-gradient(135deg, rgba(219, 39, 119, 0.22), rgba(244, 63, 94, 0.14))'
            : 'rgba(219, 39, 119, 0.08)',
          border: `1.5px solid ${isHovered ? 'rgba(219, 39, 119, 0.6)' : 'rgba(219, 39, 119, 0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'scale(1.12) translateY(-2px)' : 'scale(1)',
          boxShadow: isHovered ? '0 10px 24px rgba(219, 39, 119, 0.35)' : '0 2px 8px rgba(0,0,0,0.02)',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Flow Wire */}
          <path
            d="M6 16 C 11 16, 13 8.5, 18.5 8.5 S 22.5 23.5, 27 23.5"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={isHovered ? '4 3' : 'none'}
            style={{
              animation: isHovered ? 'flowWire 0.8s linear infinite' : 'none',
            }}
          />
          {/* Node 1: Webhook Trigger */}
          <circle cx="6" cy="16" r="4.5" fill="#090D16" stroke={color} strokeWidth="1.6" />
          <path d="M5 14L7.5 16L5 18" stroke="#FFF" strokeWidth="1.3" strokeLinecap="round" />
          {/* Node 2: n8n AI Logic Core */}
          <circle
            cx="18.5"
            cy="8.5"
            r="5"
            fill="#DB2777"
            stroke="#FFF"
            strokeWidth="1.4"
            style={{
              transform: isHovered ? 'scale(1.15)' : 'scale(1)',
              transformOrigin: '18.5px 8.5px',
              transition: 'transform 0.2s ease',
            }}
          />
          <path d="M19 6.5L17 9.5H20L18 11.5" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" />
          {/* Node 3: Real-Time Sync Destination */}
          <circle
            cx="27"
            cy="23.5"
            r="4"
            fill="#090D16"
            stroke={isHovered ? '#10B981' : '#38BDF8'}
            strokeWidth="1.6"
          />
          <circle cx="27" cy="23.5" r="1.8" fill={isHovered ? '#10B981' : '#38BDF8'} />
        </svg>
      </div>
    )
  }

  // ── 4. Custom LLMs & AI Agents ───────────────────────────────
  if (type === 'llm') {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isHovered
            ? 'linear-gradient(135deg, rgba(2, 132, 199, 0.22), rgba(59, 130, 246, 0.14))'
            : 'rgba(2, 132, 199, 0.08)',
          border: `1.5px solid ${isHovered ? 'rgba(2, 132, 199, 0.6)' : 'rgba(2, 132, 199, 0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'scale(1.12) translateY(-2px)' : 'scale(1)',
          boxShadow: isHovered ? '0 10px 24px rgba(2, 132, 199, 0.35)' : '0 2px 8px rgba(0,0,0,0.02)',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Synaptic Network Lines */}
          <line x1="16" y1="5.5" x2="7.5" y2="13" stroke={isHovered ? '#38BDF8' : 'rgba(2,132,199,0.5)'} strokeWidth="1.2" />
          <line x1="16" y1="5.5" x2="24.5" y2="13" stroke={isHovered ? '#38BDF8' : 'rgba(2,132,199,0.5)'} strokeWidth="1.2" />
          <line x1="7.5" y1="13" x2="10.5" y2="24.5" stroke={isHovered ? '#38BDF8' : 'rgba(2,132,199,0.5)'} strokeWidth="1.2" />
          <line x1="24.5" y1="13" x2="21.5" y2="24.5" stroke={isHovered ? '#38BDF8' : 'rgba(2,132,199,0.5)'} strokeWidth="1.2" />
          <line x1="10.5" y1="24.5" x2="21.5" y2="24.5" stroke={isHovered ? '#38BDF8' : 'rgba(2,132,199,0.5)'} strokeWidth="1.2" />
          <line x1="16" y1="5.5" x2="16" y2="16.5" stroke={color} strokeWidth="1.6" />

          {/* AI Core Brain Node with Radial Pulse */}
          <circle
            cx="16"
            cy="16.5"
            r="5.5"
            fill="#090D16"
            stroke={color}
            strokeWidth="2"
            style={{
              transform: isHovered ? 'scale(1.2)' : 'scale(1)',
              transformOrigin: '16px 16.5px',
              transition: 'transform 0.25s ease',
            }}
          />
          <circle cx="16" cy="16.5" r="2.8" fill={isHovered ? '#38BDF8' : '#0284C7'} />

          {/* Peripheral Reasoning Nodes */}
          <circle cx="16" cy="5.5" r="3" fill="#0284C7" />
          <circle cx="7.5" cy="13" r="3" fill="#38BDF8" />
          <circle cx="24.5" cy="13" r="3" fill="#38BDF8" />
          <circle cx="10.5" cy="24.5" r="2.6" fill="#090D16" stroke="#0284C7" strokeWidth="1.4" />
          <circle cx="21.5" cy="24.5" r="2.6" fill="#090D16" stroke="#0284C7" strokeWidth="1.4" />
        </svg>
      </div>
    )
  }

  // ── 5. IoT, Arduino & Embedded Systems ────────────────────────
  if (type === 'iot') {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isHovered
            ? 'linear-gradient(135deg, rgba(5, 150, 105, 0.22), rgba(16, 185, 129, 0.14))'
            : 'rgba(5, 150, 105, 0.08)',
          border: `1.5px solid ${isHovered ? 'rgba(5, 150, 105, 0.6)' : 'rgba(5, 150, 105, 0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'scale(1.12) translateY(-2px)' : 'scale(1)',
          boxShadow: isHovered ? '0 10px 24px rgba(5, 150, 105, 0.35)' : '0 2px 8px rgba(0,0,0,0.02)',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* Microcontroller Silicon Chip */}
          <rect x="8" y="8" width="16" height="16" rx="2.5" fill="#090D16" stroke={color} strokeWidth="1.6" />
          {/* Golden GPIO Pins */}
          <line x1="4.5" y1="12" x2="8" y2="12" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="4.5" y1="16" x2="8" y2="16" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="4.5" y1="20" x2="8" y2="20" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="24" y1="12" x2="27.5" y2="12" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="24" y1="16" x2="27.5" y2="16" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
          <line x1="24" y1="20" x2="27.5" y2="20" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
          {/* TX / RX Live Diodes with alternating blink */}
          <circle cx="12" cy="12" r="1.8" fill={isHovered ? '#10B981' : '#059669'} />
          <circle cx="16" cy="12" r="1.8" fill={isHovered ? '#F59E0B' : '#059669'} />
          {/* Active Oscilloscope Sine Wave */}
          <path
            d="M10.5 18 Q 13 14.5, 16 18 T 21.5 18"
            stroke={isHovered ? '#34D399' : '#059669'}
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            style={{
              transform: isHovered ? 'scaleY(1.3)' : 'scaleY(1)',
              transformOrigin: '16px 18px',
              transition: 'transform 0.2s ease',
            }}
          />
        </svg>
      </div>
    )
  }

  // ── 6. Custom PC & GPU Builds ────────────────────────────────
  if (type === 'hardware') {
    return (
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: isHovered
            ? 'linear-gradient(135deg, rgba(5, 150, 105, 0.22), rgba(14, 165, 233, 0.14))'
            : 'rgba(5, 150, 105, 0.08)',
          border: `1.5px solid ${isHovered ? 'rgba(5, 150, 105, 0.6)' : 'rgba(5, 150, 105, 0.2)'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'scale(1.12) translateY(-2px)' : 'scale(1)',
          boxShadow: isHovered ? '0 10px 24px rgba(5, 150, 105, 0.35)' : '0 2px 8px rgba(0,0,0,0.02)',
        }}
      >
        <svg width="34" height="34" viewBox="0 0 32 32" fill="none">
          {/* PC Rig Chassis */}
          <rect x="6" y="5" width="20" height="22" rx="3.5" fill="#090D16" stroke={color} strokeWidth="1.6" />
          {/* Tempered Glass Panel */}
          <rect x="8" y="7" width="16" height="18" rx="2" fill="rgba(2, 6, 23, 0.75)" />
          {/* Dual GPU Spinning Fans */}
          <g
            style={{
              transformOrigin: '12px 14px',
              animation: isHovered ? 'spinGpu 0.75s linear infinite' : 'spinGpu 3s linear infinite',
            }}
          >
            <circle cx="12" cy="14" r="3.8" stroke={isHovered ? '#38BDF8' : '#059669'} strokeWidth="1.3" />
            <path d="M12 11.5V16.5M9.5 14H14.5" stroke={isHovered ? '#38BDF8' : '#059669'} strokeWidth="1.1" strokeLinecap="round" />
          </g>
          <g
            style={{
              transformOrigin: '20px 14px',
              animation: isHovered ? 'spinGpu 0.75s linear infinite' : 'spinGpu 3s linear infinite',
            }}
          >
            <circle cx="20" cy="14" r="3.8" stroke={isHovered ? '#38BDF8' : '#059669'} strokeWidth="1.3" />
            <path d="M20 11.5V16.5M17.5 14H22.5" stroke={isHovered ? '#38BDF8' : '#059669'} strokeWidth="1.1" strokeLinecap="round" />
          </g>
          {/* RGB Coolant Loop Bar */}
          <line
            x1="9"
            y1="21"
            x2="23"
            y2="21"
            stroke={isHovered ? '#EC4899' : '#10B981'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Power LED Indicator */}
          <circle cx="23" cy="8" r="1.2" fill="#10B981" />
        </svg>
      </div>
    )
  }

  return null
}
