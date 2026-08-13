import React, { useEffect, useState, useRef } from 'react'

/**
 * DwarfCharacter - Cute 2D Vector Dwarf Software Engineer
 * Props:
 * - state: 'idle' | 'alert' | 'run' | 'grab' | 'drag' | 'celebrate'
 * - mousePos: { x: number, y: number }
 * - dwarfPos: { x: number, y: number }
 * - facing: 'left' | 'right'
 * - scale: number
 */
export default function DwarfCharacter({
  state = 'idle',
  mousePos = { x: 0, y: 0 },
  dwarfPos = { x: 0, y: 0 },
  facing = 'right',
  scale = 1.0,
}) {
  const [blink, setBlink] = useState(false)
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 })
  const [stepCycle, setStepCycle] = useState(0)

  // Blinking timer
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 160)
    }, 3800 + Math.random() * 2000)

    return () => clearInterval(blinkInterval)
  }, [])

  // Running & Dragging step animation loop
  useEffect(() => {
    let animationFrame
    let count = 0
    const updateSteps = () => {
      if (state === 'run' || state === 'drag') {
        count += state === 'run' ? 0.2 : 0.12
        setStepCycle(Math.sin(count))
      } else {
        setStepCycle(0)
      }
      animationFrame = requestAnimationFrame(updateSteps)
    }
    animationFrame = requestAnimationFrame(updateSteps)
    return () => cancelAnimationFrame(animationFrame)
  }, [state])

  // Calculate Eye Pupil Tracking towards Mouse
  useEffect(() => {
    if (!mousePos || !dwarfPos) return
    const dx = mousePos.x - dwarfPos.x
    const dy = mousePos.y - dwarfPos.y
    const dist = Math.hypot(dx, dy) || 1

    const maxOffset = 3.5
    const px = (dx / dist) * maxOffset
    const py = (dy / dist) * maxOffset
    setPupilOffset({ x: px, y: py })
  }, [mousePos, dwarfPos])

  // Leg angles for running / dragging / idle
  const legAngleLeft = stepCycle * 25
  const legAngleRight = -stepCycle * 25

  // Arm positions based on state
  let leftArmD = 'M 35 75 Q 20 85 25 100' // idle arm
  let rightArmD = 'M 85 75 Q 100 85 95 100' // idle arm

  if (state === 'alert') {
    leftArmD = 'M 35 75 Q 15 65 20 50' // arm raised in surprise
    rightArmD = 'M 85 75 Q 105 65 100 50'
  } else if (state === 'grab') {
    leftArmD = 'M 35 70 Q 30 35 45 15' // reaching high up
    rightArmD = 'M 85 70 Q 90 35 75 15'
  } else if (state === 'drag') {
    leftArmD = 'M 35 75 Q 10 70 5 60' // pulling back hard
    rightArmD = 'M 85 75 Q 60 70 45 65'
  } else if (state === 'celebrate') {
    leftArmD = 'M 35 70 Q 15 45 25 25' // arms raised celebrating
    rightArmD = 'M 85 70 Q 110 45 95 25' // pointing up/right
  } else if (state === 'run') {
    const armSwing = Math.sin(stepCycle * Math.PI) * 20
    leftArmD = `M 35 75 Q ${20 + armSwing} 90 ${25 + armSwing} 105`
    rightArmD = `M 85 75 Q ${100 - armSwing} 90 ${95 - armSwing} 105`
  }

  // Tilt angle based on state
  let bodyTilt = 0
  if (state === 'run') bodyTilt = facing === 'right' ? 8 : -8
  if (state === 'drag') bodyTilt = facing === 'right' ? -12 : 12
  if (state === 'alert') bodyTilt = -4

  return (
    <div
      style={{
        position: 'relative',
        width: `${120 * scale}px`,
        height: `${140 * scale}px`,
        transform: `scaleX(${facing === 'left' ? -1 : 1}) rotate(${bodyTilt}deg)`,
        transition: 'transform 0.15s ease-out',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      {/* Speech / Reaction Bubble */}
      {state === 'alert' && (
        <div
          style={{
            position: 'absolute',
            top: '-42px',
            left: facing === 'left' ? 'auto' : '65px',
            right: facing === 'left' ? '65px' : 'auto',
            transform: facing === 'left' ? 'scaleX(-1)' : 'none',
            background: '#FF5733',
            color: '#FFF',
            padding: '6px 12px',
            borderRadius: '16px',
            fontWeight: 800,
            fontSize: '13px',
            boxShadow: '0 4px 12px rgba(255, 87, 51, 0.4)',
            whiteSpace: 'nowrap',
            zIndex: 10,
          }}
        >
          Pappu found you! 👀
        </div>
      )}

      {state === 'stalking' && (
        <div
          style={{
            position: 'absolute',
            top: '-42px',
            left: '10px',
            transform: facing === 'left' ? 'scaleX(-1)' : 'none',
            background: 'rgba(30, 41, 59, 0.95)',
            color: '#38BDF8',
            border: '1px solid #38BDF8',
            padding: '4px 10px',
            borderRadius: '14px',
            fontWeight: 700,
            fontSize: '11px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap',
            zIndex: 10,
          }}
        >
          Pappu is watching... 🕵️‍♂️
        </div>
      )}

      {state === 'at_desk' && (
        <div
          style={{
            position: 'absolute',
            top: '-42px',
            left: '10px',
            transform: facing === 'left' ? 'scaleX(-1)' : 'none',
            background: '#D97706',
            color: '#FFF',
            padding: '5px 12px',
            borderRadius: '14px',
            fontWeight: 800,
            fontSize: '11px',
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.4)',
            whiteSpace: 'nowrap',
            zIndex: 10,
          }}
        >
          Pappu's Coffee Break ☕
        </div>
      )}

      {state === 'grab' && (
        <div
          style={{
            position: 'absolute',
            top: '-45px',
            left: '20px',
            transform: facing === 'left' ? 'scaleX(-1)' : 'none',
            background: '#3B82F6',
            color: '#FFF',
            padding: '6px 12px',
            borderRadius: '16px',
            fontWeight: 800,
            fontSize: '12px',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            whiteSpace: 'nowrap',
            zIndex: 10,
          }}
        >
          Pappu gotcha! ✊
        </div>
      )}

      {state === 'drag' && (
        <div
          style={{
            position: 'absolute',
            top: '-42px',
            left: '10px',
            transform: facing === 'left' ? 'scaleX(-1)' : 'none',
            background: '#10B981',
            color: '#FFF',
            padding: '5px 12px',
            borderRadius: '16px',
            fontWeight: 700,
            fontSize: '12px',
            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
            whiteSpace: 'nowrap',
            zIndex: 10,
          }}
        >
          Pappu leading the way! 🏃‍♂️💨
        </div>
      )}

      {state === 'celebrate' && (
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            left: '0px',
            transform: facing === 'left' ? 'scaleX(-1)' : 'none',
            background: '#8B5CF6',
            color: '#FFF',
            padding: '7px 14px',
            borderRadius: '20px',
            fontWeight: 800,
            fontSize: '13px',
            boxShadow: '0 4px 16px rgba(139, 92, 246, 0.5)',
            whiteSpace: 'nowrap',
            zIndex: 10,
          }}
        >
          Pappu says click here! 👇✨
        </div>
      )}

      {(state === 'rest' || state === 'resting') && (
        <div
          style={{
            position: 'absolute',
            top: '-48px',
            left: '0px',
            transform: facing === 'left' ? 'scaleX(-1)' : 'none',
            background: 'linear-gradient(135deg, #7C3AED, #4F46E5)',
            color: '#FFF',
            padding: '6px 14px',
            borderRadius: '20px',
            fontWeight: 800,
            fontSize: '12px',
            boxShadow: '0 4px 16px rgba(124, 58, 237, 0.45)',
            whiteSpace: 'nowrap',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span>😴 Pappu dropped cursor & resting...</span>
          <span className="zzz-particle" style={{ right: '-10px', top: '-12px' }}>z Z Z</span>
        </div>
      )}

      {/* Main SVG Dwarf Vector */}
      <svg viewBox="0 0 120 140" width="100%" height="100%">
        <defs>
          <linearGradient id="vestGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="beardGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
          <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFDDD2" />
            <stop offset="100%" stopColor="#E29578" />
          </linearGradient>
          <linearGradient id="bootGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Shadow under feet */}
        <ellipse
          cx="60"
          cy="134"
          rx={state === 'run' ? 24 : 32}
          ry="6"
          fill="rgba(0, 0, 0, 0.15)"
        />

        {/* Boots / Feet with Step Rotation */}
        <g id="boots">
          {/* Left Boot */}
          <g transform={`rotate(${legAngleLeft}, 45, 115)`}>
            <rect x="36" y="112" width="18" height="20" rx="6" fill="url(#bootGrad)" />
            <path d="M 32 124 Q 32 132 46 132 L 56 132 Q 58 124 50 124 Z" fill="#451A03" />
            <line x1="38" y1="120" x2="52" y2="120" stroke="#F59E0B" strokeWidth="2" />
          </g>
          {/* Right Boot */}
          <g transform={`rotate(${legAngleRight}, 75, 115)`}>
            <rect x="66" y="112" width="18" height="20" rx="6" fill="url(#bootGrad)" />
            <path d="M 64 124 Q 64 132 78 132 L 88 132 Q 90 124 82 124 Z" fill="#451A03" />
            <line x1="68" y1="120" x2="82" y2="120" stroke="#F59E0B" strokeWidth="2" />
          </g>
        </g>

        {/* Cargo Pants */}
        <rect x="40" y="94" width="40" height="24" rx="4" fill="#334155" />
        <line x1="60" y1="96" x2="60" y2="118" stroke="#1E293B" strokeWidth="2" />

        {/* Arms (Behind Body or Front) */}
        <path
          d={leftArmD}
          stroke="url(#skinGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d={rightArmD}
          stroke="url(#skinGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />

        {/* Torso / Tech Fleece Vest */}
        <rect x="34" y="60" width="52" height="42" rx="10" fill="#FF5733" /> {/* Inner Coral Hoodie */}
        <path d="M 36 60 L 84 60 L 88 100 L 32 100 Z" fill="url(#vestGrad)" rx="8" /> {/* Slate Tech Vest */}
        {/* Zipper */}
        <line x1="60" y1="62" x2="60" y2="98" stroke="#64748B" strokeWidth="2.5" strokeDasharray="3 2" />
        {/* Developer Badge </ > on Vest */}
        <rect x="40" y="70" width="16" height="14" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="1" />
        <text x="43" y="81" fill="#38BDF8" fontSize="8" fontWeight="bold" fontFamily="monospace">
          &lt;/&gt;
        </text>

        {/* Head Base */}
        <circle cx="60" cy="42" r="24" fill="url(#skinGrad)" />

        {/* Ears */}
        <path d="M 34 40 Q 26 42 34 48 Z" fill="url(#skinGrad)" />
        <path d="M 86 40 Q 94 42 86 48 Z" fill="url(#skinGrad)" />

        {/* Dwarf Braided Beard */}
        <g id="beard">
          <path
            d="M 36 44 C 34 78 50 86 60 88 C 70 86 86 78 84 44 C 76 56 44 56 36 44 Z"
            fill="url(#beardGrad)"
          />
          {/* Beard Braids & Details */}
          <path d="M 52 74 Q 60 92 68 74" stroke="#78350F" strokeWidth="2" fill="none" />
          {/* Tiny Terminal Ring Clips on Beard */}
          <circle cx="60" cy="82" r="3" fill="#38BDF8" />
          <circle cx="53" cy="74" r="2.5" fill="#F59E0B" />
          <circle cx="67" cy="74" r="2.5" fill="#F59E0B" />
        </g>

        {/* Nose */}
        <circle cx="60" cy="38" r="6" fill="#E29578" />

        {/* Eyes & Glasses */}
        <g id="glasses-and-eyes">
          {/* Glasses Frame (Modern Tech Glasses) */}
          <rect x="41" y="28" width="16" height="14" rx="4" fill="rgba(255,255,255,0.25)" stroke="#0F172A" strokeWidth="2.5" />
          <rect x="63" y="28" width="16" height="14" rx="4" fill="rgba(255,255,255,0.25)" stroke="#0F172A" strokeWidth="2.5" />
          <line x1="57" y1="34" x2="63" y2="34" stroke="#0F172A" strokeWidth="2.5" />

          {/* Eyes (White) */}
          <ellipse cx="49" cy="35" rx="5" ry={blink ? 0.8 : 5} fill="#FFFFFF" />
          <ellipse cx="71" cy="35" rx="5" ry={blink ? 0.8 : 5} fill="#FFFFFF" />

          {/* Pupils with Dynamic Tracking */}
          {!blink && (
            <>
              <circle cx={49 + pupilOffset.x} cy={35 + pupilOffset.y} r="2.5" fill="#0F172A" />
              <circle cx={71 + pupilOffset.x} cy={35 + pupilOffset.y} r="2.5" fill="#0F172A" />
              {/* Pupil Catchlight */}
              <circle cx={48 + pupilOffset.x} cy={34 + pupilOffset.y} r="0.8" fill="#FFFFFF" />
              <circle cx={70 + pupilOffset.x} cy={34 + pupilOffset.y} r="0.8" fill="#FFFFFF" />
            </>
          )}
        </g>

        {/* Developer Beanie / Cap */}
        <path d="M 34 32 Q 60 14 86 32 Q 88 24 60 18 Q 32 24 34 32 Z" fill="#1E293B" />
        <path d="M 38 28 Q 60 10 82 28 Z" fill="#0F172A" />
        <rect x="54" y="10" width="12" height="6" rx="3" fill="#F59E0B" />
      </svg>
    </div>
  )
}
