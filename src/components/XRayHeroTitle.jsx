import React, { useState, useRef, useCallback } from 'react'

/**
 * XRayHeroTitle — Interactive Magnifying X-Ray Lens Spotlight
 * Solid near-black headline on base. When hovered, an interactive circular
 * magnifying X-Ray lens tracks the cursor to reveal the inverted technical secret message:
 * "We make what you tell. 🚀 Under 4 Weeks. Pure Code." with a glowing cyan cybernetic rim.
 */
export default function XRayHeroTitle() {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleTouchMove = useCallback((e) => {
    if (!containerRef.current || !e.touches[0]) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top,
    })
    setIsHovered(true)
  }, [])

  const lensRadius = 130

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-block',
        cursor: 'crosshair',
        userSelect: 'none',
        borderRadius: '24px',
        padding: '12px 18px',
        margin: '0 auto',
        maxWidth: '960px',
      }}
    >
      {/* ── BASE LAYER: Solid Commanding Near-Black Headline ── */}
      <h1
        style={{
          fontSize: 'clamp(28px, 5.5vw, 64px)',
          fontWeight: 900,
          lineHeight: 1.12,
          letterSpacing: '-1.2px',
          margin: 0,
          color: '#0f172a',
          textAlign: 'center',
          wordBreak: 'normal',
        }}
      >
        Engineering High-Performance Web Platforms, AI Automations & Hardware Systems.
      </h1>

      {/* ── X-RAY INVERTED LAYER (Revealed inside magnifying circular lens) ── */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: '24px',
            background: '#060913',
            color: '#ffffff',
            clipPath: `circle(${lensRadius}px at ${mousePos.x}px ${mousePos.y}px)`,
            WebkitClipPath: `circle(${lensRadius}px at ${mousePos.x}px ${mousePos.y}px)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.9)',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(28px, 5.5vw, 64px)',
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: '-1.2px',
              margin: 0,
              color: '#ffffff',
              textAlign: 'center',
              wordBreak: 'normal',
            }}
          >
            We make{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #38bdf8, #818cf8, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 25px rgba(56, 189, 248, 0.5)',
              }}
            >
              what you tell. 🚀
            </span>
            <br />
            <span style={{ color: '#ff5733' }}>Under 4 Weeks.</span> Pure Code.
          </h1>
        </div>
      )}

      {/* ── High-Tech Floating Magnifying Lens Rim (Pure Lens Ring, No Text) ── */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            left: `${mousePos.x - lensRadius}px`,
            top: `${mousePos.y - lensRadius}px`,
            width: `${lensRadius * 2}px`,
            height: `${lensRadius * 2}px`,
            borderRadius: '50%',
            border: '2px solid #38bdf8',
            boxShadow: '0 0 25px rgba(56, 189, 248, 0.7), inset 0 0 18px rgba(56, 189, 248, 0.25)',
            pointerEvents: 'none',
            zIndex: 20,
          }}
        />
      )}
    </div>
  )
}
