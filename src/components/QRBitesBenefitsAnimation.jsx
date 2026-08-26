import React, { useState, useEffect } from 'react'

/**
 * Bespoke SVG Micro-Illustrations for each of the 5 QR Bites Restaurant Benefits
 */
function BenefitGraphic({ index, isHovered, isActive, color }) {
  // 1. Faster Ordering (Speedometer / Lightning Clock)
  if (index === 0) {
    return (
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '16px',
          background: isHovered || isActive ? `${color}18` : '#f8fafc',
          border: `1.5px solid ${isHovered || isActive ? color : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered || isActive ? 'scale(1.1) rotate(-3deg)' : 'scale(1)',
          boxShadow: isHovered || isActive ? `0 10px 24px ${color}35` : 'none',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Stopwatch circle */}
          <circle cx="16" cy="17" r="11" stroke={color} strokeWidth="1.8" />
          <path d="M16 6V3M13 3H19M24 9L26 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          {/* Lightning needle */}
          <path
            d="M16 11L14 17H18L16 23"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: (isHovered || isActive) ? 'drop-shadow(0 0 4px #f59e0b)' : 'none',
              animation: (isHovered || isActive) ? 'pulseDot 0.6s ease-in-out infinite alternate' : 'none',
            }}
          />
        </svg>
      </div>
    )
  }

  // 2. Fewer Order Mistakes (Zero-Error Shield & Checkmark)
  if (index === 1) {
    return (
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '16px',
          background: isHovered || isActive ? `${color}18` : '#f8fafc',
          border: `1.5px solid ${isHovered || isActive ? color : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered || isActive ? 'scale(1.1) rotate(3deg)' : 'scale(1)',
          boxShadow: isHovered || isActive ? `0 10px 24px ${color}35` : 'none',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Shield outline */}
          <path
            d="M16 4L6 8V16C6 22 10.5 26.5 16 28C21.5 26.5 26 22 26 16V8L16 4Z"
            fill="#0f172a"
            stroke={color}
            strokeWidth="1.6"
          />
          {/* Checkmark */}
          <path
            d="M11 16L14.5 19.5L21 12.5"
            stroke="#10b981"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: (isHovered || isActive) ? 'scale(1.1)' : 'scale(1)',
              transformOrigin: '16px 16px',
              transition: 'transform 0.2s ease',
            }}
          />
        </svg>
      </div>
    )
  }

  // 3. Less Staff Workload (Happy Chef / Hospitality Heart)
  if (index === 2) {
    return (
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '16px',
          background: isHovered || isActive ? `${color}18` : '#f8fafc',
          border: `1.5px solid ${isHovered || isActive ? color : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered || isActive ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
          boxShadow: isHovered || isActive ? `0 10px 24px ${color}35` : 'none',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Chef Hat */}
          <path
            d="M10 18C8 18 6.5 16.5 6.5 14.5C6.5 12.8 7.8 11.4 9.5 11.1C9.2 10.3 9 9.4 9 8.5C9 5.5 11.5 3 14.5 3C16.8 3 18.8 4.5 19.6 6.5C20.4 5.6 21.6 5 23 5C25.5 5 27.5 7 27.5 9.5C27.5 10.2 27.3 10.9 27 11.5C28.2 12.3 29 13.6 29 15C29 17.2 27.2 19 25 19H10Z"
            fill="#0f172a"
            stroke={color}
            strokeWidth="1.4"
          />
          {/* Hat band */}
          <rect x="9" y="19" width="16" height="5" rx="1.5" fill={color} />
          {/* Smile / Sparkle */}
          <path
            d="M13 27C15 29 19 29 21 27"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinecap="round"
            style={{
              animation: (isHovered || isActive) ? 'pulseDot 0.8s ease-in-out infinite alternate' : 'none',
            }}
          />
        </svg>
      </div>
    )
  }

  // 4. Better Sales & Profits (Rising Trend & Profit Coins)
  if (index === 3) {
    return (
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '16px',
          background: isHovered || isActive ? `${color}18` : '#f8fafc',
          border: `1.5px solid ${isHovered || isActive ? color : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered || isActive ? 'scale(1.1) translateY(-2px)' : 'scale(1)',
          boxShadow: isHovered || isActive ? `0 10px 24px ${color}35` : 'none',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Rising Chart Bars */}
          <rect x="6" y={isHovered || isActive ? 16 : 20} width="4" height={isHovered || isActive ? 10 : 6} rx="1" fill="#38bdf8" style={{ transition: 'all 0.3s ease' }} />
          <rect x="13" y={isHovered || isActive ? 12 : 15} width="4" height={isHovered || isActive ? 14 : 11} rx="1" fill="#818cf8" style={{ transition: 'all 0.3s ease' }} />
          <rect x="20" y={isHovered || isActive ? 8 : 11} width="4" height={isHovered || isActive ? 18 : 15} rx="1" fill="#10b981" style={{ transition: 'all 0.3s ease' }} />
          {/* Growth Trend Arrow */}
          <path
            d="M6 14L14 9L21 4M21 4H16M21 4V9"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }

  // 5. Easy Menu Updates (Instant Digital Sync Notepad)
  if (index === 4) {
    return (
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '16px',
          background: isHovered || isActive ? `${color}18` : '#f8fafc',
          border: `1.5px solid ${isHovered || isActive ? color : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered || isActive ? 'scale(1.1) rotate(-3deg)' : 'scale(1)',
          boxShadow: isHovered || isActive ? `0 10px 24px ${color}35` : 'none',
        }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Document page */}
          <path
            d="M8 5C8 3.89543 8.89543 3 10 3H19L26 10V27C26 28.1046 25.1046 29 24 29H10C8.89543 29 8 28.1046 8 27V5Z"
            fill="#0f172a"
            stroke={color}
            strokeWidth="1.5"
          />
          {/* Folded corner */}
          <path d="M19 3V10H26" stroke={color} strokeWidth="1.5" />
          {/* Text lines */}
          <line x1="12" y1="14" x2="22" y2="14" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="18" x2="18" y2="18" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
          {/* Glowing edit pencil / spark */}
          <path
            d="M17 24L25 16L27 18L19 26L16 27L17 24Z"
            fill="#f59e0b"
            style={{
              transform: (isHovered || isActive) ? 'translate(-2px, -2px)' : 'none',
              transition: 'transform 0.25s ease',
            }}
          />
        </svg>
      </div>
    )
  }

  return null
}

function BenefitCard({ item, index, activeBenefit, onSelect }) {
  const [isHovered, setIsHovered] = useState(false)
  const isActive = activeBenefit === index

  return (
    <div
      onClick={() => onSelect(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#ffffff',
        border: `2px solid ${isActive ? item.color : isHovered ? `${item.color}80` : '#e2e8f0'}`,
        borderRadius: '24px',
        padding: '30px 24px',
        boxShadow: isActive
          ? `0 20px 45px -10px ${item.color}35, 0 4px 16px rgba(0,0,0,0.04)`
          : isHovered
          ? `0 14px 30px -8px ${item.color}25`
          : '0 4px 20px rgba(0,0,0,0.025)',
        position: 'relative',
        cursor: 'pointer',
        transform: isActive ? 'translateY(-6px) scale(1.02)' : isHovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient lighting */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-25%',
            width: '160px',
            height: '160px',
            background: `radial-gradient(circle, ${item.color}22 0%, transparent 70%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Header with bespoke micro-illustration and impact metric pill */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
        <BenefitGraphic index={index} isHovered={isHovered} isActive={isActive} color={item.color} />

        <div
          style={{
            fontSize: '11px',
            fontWeight: 800,
            color: item.color,
            background: `${item.color}14`,
            border: `1px solid ${isActive ? item.color : 'transparent'}`,
            padding: '5px 12px',
            borderRadius: '100px',
            letterSpacing: '0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.25s ease',
          }}
        >
          {item.stat}
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

      {/* Footer Feature Tag */}
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
        <span>{item.featureTag}</span>
        <span>{isActive ? '● Featured' : 'Explore →'}</span>
      </div>
    </div>
  )
}

export default function QRBitesBenefitsAnimation() {
  const benefits = [
    {
      title: 'Faster Ordering',
      desc: 'Customers order directly, cutting wait times and increasing table turnover.',
      stat: '⚡ +40% Turnover',
      featureTag: 'Instant Table QR',
      color: '#ff5733',
    },
    {
      title: 'Fewer Order Mistakes',
      desc: 'Digital orders go straight to the kitchen—no miscommunication with waiters.',
      stat: '🎯 99.8% Accuracy',
      featureTag: 'Direct KDS Dispatch',
      color: '#ef4444',
    },
    {
      title: 'Less Staff Workload',
      desc: 'Your staff can focus on hospitality and service, not taking orders.',
      stat: '🧑‍🍳 Save 3.5h / day',
      featureTag: 'Automated Operations',
      color: '#8b5cf6',
    },
    {
      title: 'Better Sales & Profits',
      desc: 'AI-driven insights help you optimize menu pricing and stock management.',
      stat: '📈 +22% Avg Ticket',
      featureTag: 'AI Smart Upsell',
      color: '#10b981',
    },
    {
      title: 'Easy Menu Updates',
      desc: 'Update prices, descriptions, or availability instantly without reprinting menus.',
      stat: '📝 ₹0 Printing Cost',
      featureTag: 'Cloud Menu Sync',
      color: '#2563eb',
    },
  ]

  const [activeBenefit, setActiveBenefit] = useState(0)

  // Auto cycle benefits every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBenefit((prev) => (prev + 1) % benefits.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [benefits.length])

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* 5-Grid Cards with Micro-Animations */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 310px), 1fr))',
          gap: '24px',
        }}
      >
        {benefits.map((b, idx) => (
          <BenefitCard
            key={b.title}
            item={b}
            index={idx}
            activeBenefit={activeBenefit}
            onSelect={setActiveBenefit}
          />
        ))}
      </div>
    </div>
  )
}
