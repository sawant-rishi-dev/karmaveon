import React, { useState, useEffect } from 'react'

/**
 * Bespoke Animated Micro-Graphics for each AI Feature
 */
function AIGraphic({ index, isActive, isHovered, color }) {
  // 1. AI Demand Forecast (Neural Crystal / Orbital Prediction)
  if (index === 0) {
    return (
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '14px',
          background: isActive || isHovered ? `${color}18` : '#f8fafc',
          border: `1.5px solid ${isActive || isHovered ? color : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isActive || isHovered ? 'scale(1.12) rotate(-3deg)' : 'scale(1)',
          boxShadow: isActive || isHovered ? `0 8px 20px ${color}35` : 'none',
        }}
      >
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
          {/* Central orb */}
          <circle cx="16" cy="16" r="9" fill="#0f172a" stroke={color} strokeWidth="1.6" />
          <circle cx="16" cy="16" r="4" fill={color} />
          {/* Orbital nodes */}
          <circle
            cx="24"
            cy="10"
            r="2"
            fill="#38bdf8"
            style={{
              animation: (isActive || isHovered) ? 'pulseDot 0.8s ease-in-out infinite alternate' : 'none',
            }}
          />
          <circle cx="8" cy="22" r="1.5" fill="#f59e0b" />
          <path
            d="M9 10C13 6 19 6 23 10"
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="2 2"
          />
        </svg>
      </div>
    )
  }

  // 2. Peak Hours Analysis (Clock with Rush-Hour Heat Pulse)
  if (index === 1) {
    return (
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '14px',
          background: isActive || isHovered ? `${color}18` : '#f8fafc',
          border: `1.5px solid ${isActive || isHovered ? color : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isActive || isHovered ? 'scale(1.12) rotate(3deg)' : 'scale(1)',
          boxShadow: isActive || isHovered ? `0 8px 20px ${color}35` : 'none',
        }}
      >
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
          {/* Clock face */}
          <circle cx="16" cy="16" r="11" fill="#0f172a" stroke={color} strokeWidth="1.6" />
          {/* Clock top bells */}
          <path d="M10 6L7 9M22 6L25 9" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          {/* Clock Hands indicating 8:30 Peak */}
          <line x1="16" y1="16" x2="16" y2="9" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="16" x2="22" y2="16" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
          {/* Heat beacon */}
          <circle
            cx="21"
            cy="11"
            r="3"
            fill="#ef4444"
            style={{
              animation: (isActive || isHovered) ? 'pulseDot 0.6s ease-in-out infinite alternate' : 'none',
              transformOrigin: '21px 11px',
            }}
          />
        </svg>
      </div>
    )
  }

  // 3. Low-Performing Items (Smart Optimizing Lightbulb & Spark)
  if (index === 2) {
    return (
      <div
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '14px',
          background: isActive || isHovered ? `${color}18` : '#f8fafc',
          border: `1.5px solid ${isActive || isHovered ? color : '#e2e8f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isActive || isHovered ? 'scale(1.12) translateY(-2px)' : 'scale(1)',
          boxShadow: isActive || isHovered ? `0 8px 20px ${color}35` : 'none',
        }}
      >
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
          {/* Trending down bar turned into recovery spark */}
          <path
            d="M6 10L14 18L20 13L26 21"
            stroke="#94a3b8"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* AI Turnaround Upward Rocket Spark */}
          <path
            d="M20 13L26 9M26 9H21M26 9V14"
            stroke="#10b981"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: (isActive || isHovered) ? 'drop-shadow(0 0 4px #10b981)' : 'none',
            }}
          />
          <circle cx="26" cy="9" r="1.5" fill="#10b981" />
        </svg>
      </div>
    )
  }

  return null
}

function AICard({ item, index, activeIndex, onSelect }) {
  const [isHovered, setIsHovered] = useState(false)
  const isActive = activeIndex === index

  return (
    <div
      onClick={() => onSelect(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#ffffff',
        border: `2px solid ${isActive ? item.color : isHovered ? `${item.color}80` : '#e2e8f0'}`,
        borderRadius: '20px',
        padding: '24px',
        boxShadow: isActive
          ? `0 16px 36px -8px ${item.color}30, 0 4px 12px rgba(0,0,0,0.03)`
          : isHovered
          ? `0 12px 24px -6px ${item.color}20`
          : '0 4px 16px rgba(0,0,0,0.02)',
        position: 'relative',
        cursor: 'pointer',
        transform: isActive ? 'translateY(-5px) scale(1.02)' : isHovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
      }}
    >
      {/* Radial ambient glow on active card */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-20%',
            width: '140px',
            height: '140px',
            background: `radial-gradient(circle, ${item.color}20 0%, transparent 70%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Top row: micro-graphic + live AI badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <AIGraphic index={index} isActive={isActive} isHovered={isHovered} color={item.color} />

        <div
          style={{
            fontSize: '11px',
            fontWeight: 800,
            color: item.color,
            background: `${item.color}12`,
            border: `1px solid ${isActive ? item.color : 'transparent'}`,
            padding: '4px 10px',
            borderRadius: '100px',
            letterSpacing: '0.4px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            transition: 'all 0.25s ease',
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
          <span>{item.chip}</span>
        </div>
      </div>

      {/* Title & Desc */}
      <div>
        <h3
          style={{
            fontSize: '17px',
            fontWeight: 900,
            color: '#0f172a',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>{item.emoji}</span>
          <span>{item.title}</span>
        </h3>
        <p style={{ color: '#64748b', fontSize: '14px', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
      </div>

      {/* Interactive AI Live Insight Capsule */}
      <div
        style={{
          marginTop: '16px',
          padding: '10px 12px',
          background: isActive ? `${item.color}0d` : '#f8fafc',
          border: `1px solid ${isActive ? `${item.color}35` : '#f1f5f9'}`,
          borderRadius: '10px',
          fontSize: '12px',
          fontWeight: 700,
          color: isActive ? item.color : '#64748b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.25s ease',
        }}
      >
        <span>{item.liveTip}</span>
        <span>{isActive ? '⚡ Active' : 'View →'}</span>
      </div>
    </div>
  )
}

export default function QRBitesAIFeatures() {
  const [activeIndex, setActiveIndex] = useState(0)

  const aiFeatures = [
    {
      emoji: '🔮',
      title: 'AI Demand Forecast',
      desc: 'Predict peak hours and prepare stock in advance.',
      chip: 'Prep 30m early',
      color: '#7c3aed',
      liveTip: '📈 Tonight: Expect +35% Pizza rush at 8:15 PM',
    },
    {
      emoji: '⏰',
      title: 'Peak Hours Analysis',
      desc: 'Understand your busiest times (e.g., 8 PM - 9:30 PM).',
      chip: '8:00 - 9:30 PM Peak',
      color: '#f59e0b',
      liveTip: '🔥 Friday Peak: 24 active tables expected',
    },
    {
      emoji: '📉',
      title: 'Low-Performing Items',
      desc: 'Get suggestions to launch offers on slow-moving dishes.',
      chip: 'Smart Upsell Suggestions',
      color: '#10b981',
      liveTip: '💡 Suggestion: Combo Taco + Drink (+18% lift)',
    },
  ]

  // Auto cycle active card every 4s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % aiFeatures.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [aiFeatures.length])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: '20px',
        position: 'relative',
      }}
    >
      {aiFeatures.map((item, idx) => (
        <AICard
          key={item.title}
          item={item}
          index={idx}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      ))}
    </div>
  )
}
