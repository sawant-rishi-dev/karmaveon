import React, { useEffect, useState, useRef } from 'react'

/**
 * DwarfCharacter - Cute 2D Vector Dwarf Software Engineer (VEON)
 *
 * States:
 * - 'idle'      — completely still relaxed posture (zero hand/foot movement)
 * - 'run'       — lively running stride with arm pump & foot cycle
 * - 'alert'     — surprised arms & alert badge
 * - 'grab'      — reaching forward/up
 * - 'drag'      — leaning back pulling
 * - 'celebrate' — victory jump with raised arms
 * - 'at_desk'   — typing / workstation pose
 * - 'stalking'  — sneaky observing pose
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
  const [walkPhase, setWalkPhase] = useState(0)
  const stateRef = useRef(state)
  stateRef.current = state

  // Blinking timer
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 160)
    }, 3200 + Math.random() * 2400)
    return () => clearInterval(blinkInterval)
  }, [])

  // Smooth walk loop — ONLY runs when state is 'run' or 'drag'
  useEffect(() => {
    if (state !== 'run' && state !== 'drag') {
      setWalkPhase(0)
      return
    }

    let animId
    let count = 0
    const stepSpeed = state === 'run' ? 0.20 : 0.12

    const loop = () => {
      if (stateRef.current === 'run' || stateRef.current === 'drag') {
        count += stepSpeed
        setWalkPhase(count)
        animId = requestAnimationFrame(loop)
      } else {
        setWalkPhase(0)
      }
    }
    animId = requestAnimationFrame(loop)
    return () => {
      if (animId) cancelAnimationFrame(animId)
      setWalkPhase(0)
    }
  }, [state])

  // Eye pupil tracking
  useEffect(() => {
    if (!mousePos || !dwarfPos) return
    const dx = mousePos.x - dwarfPos.x
    const dy = mousePos.y - dwarfPos.y
    const dist = Math.hypot(dx, dy) || 1
    const maxOffset = 3.2
    const px = (dx / dist) * maxOffset
    const py = (dy / dist) * maxOffset
    setPupilOffset({ x: px, y: py })
  }, [mousePos, dwarfPos])

  // ── Kinematics Calculations ──────────────────────────────────
  const isMoving = (state === 'run' || state === 'drag') && walkPhase !== 0
  const isDrag = state === 'drag'
  const isCelebrate = state === 'celebrate'
  const isAlert = state === 'alert'
  const isGrab = state === 'grab'

  // Vertical body bob only when actively stepping
  const bodyBob = isMoving ? Math.abs(Math.sin(walkPhase * 2)) * -5 : 0

  // Hip / leg stride angles
  const strideAngle = isMoving ? Math.sin(walkPhase) * (isDrag ? 14 : 22) : 0
  const leftLegAngle = strideAngle
  const rightLegAngle = -strideAngle

  // Foot lift
  const leftFootLift = isMoving && Math.sin(walkPhase) > 0 ? Math.sin(walkPhase) * -4 : 0
  const rightFootLift = isMoving && Math.sin(walkPhase) < 0 ? -Math.sin(walkPhase) * -4 : 0

  // Arm swing
  const armSwing = isMoving ? Math.sin(walkPhase) * 16 : 0

  // Arm & Hand pathing
  let leftArmPath = ''
  let rightArmPath = ''
  let leftHand = { x: 28, y: 92 }
  let rightHand = { x: 92, y: 92 }

  if (isAlert) {
    leftArmPath = 'M 34 68 Q 18 56 22 42'
    rightArmPath = 'M 86 68 Q 102 56 98 42'
    leftHand = { x: 22, y: 42 }
    rightHand = { x: 98, y: 42 }
  } else if (isGrab) {
    leftArmPath = 'M 34 68 Q 30 38 46 20'
    rightArmPath = 'M 86 68 Q 90 38 74 20'
    leftHand = { x: 46, y: 20 }
    rightHand = { x: 74, y: 20 }
  } else if (isDrag) {
    leftArmPath = 'M 34 68 Q 14 74 6 62'
    rightArmPath = 'M 86 68 Q 62 72 44 64'
    leftHand = { x: 6, y: 62 }
    rightHand = { x: 44, y: 64 }
  } else if (isCelebrate) {
    leftArmPath = 'M 34 68 Q 16 44 26 24'
    rightArmPath = 'M 86 68 Q 104 44 94 24'
    leftHand = { x: 26, y: 24 }
    rightHand = { x: 94, y: 24 }
  } else if (isMoving) {
    // Bent-elbow running arm swing
    const lHandY = 88 - armSwing * 0.6
    const lHandX = 26 - armSwing * 0.7
    const rHandY = 88 + armSwing * 0.6
    const rHandX = 94 + armSwing * 0.7

    leftArmPath = `M 34 68 Q ${24 - armSwing * 0.4} 80 ${lHandX} ${lHandY}`
    rightArmPath = `M 86 68 Q ${96 + armSwing * 0.4} 80 ${rHandX} ${rHandY}`
    leftHand = { x: lHandX, y: lHandY }
    rightHand = { x: rHandX, y: rHandY }
  } else {
    // Completely stationary resting arms when idle
    leftArmPath = 'M 34 68 Q 24 82 28 92'
    rightArmPath = 'M 86 68 Q 96 82 92 92'
    leftHand = { x: 28, y: 92 }
    rightHand = { x: 92, y: 92 }
  }

  // Body lean tilt
  let bodyLean = 0
  if (state === 'run') bodyLean = facing === 'right' ? 5 : -5
  if (state === 'drag') bodyLean = facing === 'right' ? -10 : 10
  if (state === 'alert') bodyLean = -2

  return (
    <div
      style={{
        position: 'relative',
        width: `${120 * scale}px`,
        height: `${140 * scale}px`,
        transform: `scaleX(${facing === 'left' ? -1 : 1}) rotate(${bodyLean}deg)`,
        transition: 'transform 0.12s ease-out',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      <svg viewBox="0 0 120 145" width="100%" height="100%">
        <defs>
          <linearGradient id="vestGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="hoodieGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6B4A" />
            <stop offset="100%" stopColor="#E11D48" />
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
            <stop offset="0%" stopColor="#854D0E" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>
        </defs>

        {/* ── Ground Shadow ────────────────────────────── */}
        <ellipse
          cx="60"
          cy="138"
          rx={isMoving ? 26 : 30}
          ry="5.5"
          fill="rgba(0, 0, 0, 0.16)"
        />

        {/* ── Legs & Boots ─────────────────────────────── */}
        <g id="legs" transform={`translate(0, ${bodyBob * 0.4})`}>
          {/* Left Leg */}
          <g transform={`translate(46, 102) rotate(${leftLegAngle}) translate(-46, -102) translate(0, ${leftFootLift})`}>
            <rect x="38" y="96" width="16" height="20" rx="4" fill="#334155" />
            <path
              d="M 36 114 L 54 114 L 56 128 Q 56 134 46 134 L 32 134 Q 30 128 36 122 Z"
              fill="url(#bootGrad)"
            />
            <path d="M 30 132 L 56 132 L 56 136 L 30 136 Z" fill="#1C1917" />
            <line x1="36" y1="122" x2="52" y2="122" stroke="#F59E0B" strokeWidth="1.8" />
          </g>

          {/* Right Leg */}
          <g transform={`translate(74, 102) rotate(${rightLegAngle}) translate(-74, -102) translate(0, ${rightFootLift})`}>
            <rect x="66" y="96" width="16" height="20" rx="4" fill="#1E293B" />
            <path
              d="M 64 114 L 82 114 L 84 128 Q 84 134 74 134 L 60 134 Q 58 128 64 122 Z"
              fill="url(#bootGrad)"
            />
            <path d="M 58 132 L 84 132 L 84 136 L 58 136 Z" fill="#1C1917" />
            <line x1="64" y1="122" x2="80" y2="122" stroke="#F59E0B" strokeWidth="1.8" />
          </g>
        </g>

        {/* ── Main Torso, Arms & Head ──────────────────── */}
        <g id="upper-body" transform={`translate(0, ${bodyBob})`}>
          {/* Left Arm */}
          <g id="left-arm">
            <circle cx="34" cy="68" r="6.5" fill="url(#hoodieGrad)" />
            <path
              d={leftArmPath}
              stroke="url(#hoodieGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx={leftHand.x} cy={leftHand.y} r="5" fill="#1E293B" />
            <circle cx={leftHand.x} cy={leftHand.y + 1} r="4" fill="url(#skinGrad)" />
          </g>

          {/* Torso Hoodie */}
          <rect x="33" y="60" width="54" height="42" rx="10" fill="url(#hoodieGrad)" />
          {/* Slate Tech Vest */}
          <path
            d="M 35 60 L 85 60 L 89 100 L 31 100 Z"
            fill="url(#vestGrad)"
            rx="7"
          />
          {/* Zipper */}
          <line x1="60" y1="62" x2="60" y2="98" stroke="#64748B" strokeWidth="2.2" strokeDasharray="3 2" />
          {/* Tech Badge */}
          <rect x="39" y="70" width="17" height="14" rx="3.5" fill="#020617" stroke="#38BDF8" strokeWidth="1.2" />
          <text x="42" y="81" fill="#38BDF8" fontSize="7.5" fontWeight="900" fontFamily="monospace">
            &lt;/&gt;
          </text>

          {/* Right Arm */}
          <g id="right-arm">
            <circle cx="86" cy="68" r="6.5" fill="url(#hoodieGrad)" />
            <path
              d={rightArmPath}
              stroke="url(#hoodieGrad)"
              strokeWidth="9"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx={rightHand.x} cy={rightHand.y} r="5" fill="#1E293B" />
            <circle cx={rightHand.x} cy={rightHand.y + 1} r="4" fill="url(#skinGrad)" />
          </g>

          {/* Head */}
          <circle cx="60" cy="42" r="23" fill="url(#skinGrad)" />
          <path d="M 36 40 Q 28 42 36 48 Z" fill="url(#skinGrad)" />
          <path d="M 84 40 Q 92 42 84 48 Z" fill="url(#skinGrad)" />

          {/* Beard */}
          <g id="beard">
            <path
              d="M 37 44 C 35 78 50 87 60 89 C 70 87 85 78 83 44 C 75 56 45 56 37 44 Z"
              fill="url(#beardGrad)"
            />
            <path d="M 52 74 Q 60 90 68 74" stroke="#78350F" strokeWidth="2" fill="none" />
            <circle cx="60" cy="83" r="3" fill="#38BDF8" />
            <circle cx="53" cy="74" r="2.5" fill="#F59E0B" />
            <circle cx="67" cy="74" r="2.5" fill="#F59E0B" />
          </g>

          {/* Nose */}
          <circle cx="60" cy="38" r="5.5" fill="#E29578" />

          {/* Glasses & Eyes */}
          <g id="glasses">
            <rect x="42" y="28" width="15" height="14" rx="4" fill="rgba(255,255,255,0.3)" stroke="#0F172A" strokeWidth="2.5" />
            <rect x="63" y="28" width="15" height="14" rx="4" fill="rgba(255,255,255,0.3)" stroke="#0F172A" strokeWidth="2.5" />
            <line x1="57" y1="34" x2="63" y2="34" stroke="#0F172A" strokeWidth="2.5" />

            <ellipse cx="49.5" cy="35" rx="4.5" ry={blink ? 0.8 : 4.5} fill="#FFFFFF" />
            <ellipse cx="70.5" cy="35" rx="4.5" ry={blink ? 0.8 : 4.5} fill="#FFFFFF" />

            {!blink && (
              <>
                <circle cx={49.5 + pupilOffset.x} cy={35 + pupilOffset.y} r="2.4" fill="#0F172A" />
                <circle cx={70.5 + pupilOffset.x} cy={35 + pupilOffset.y} r="2.4" fill="#0F172A" />
                <circle cx={48.8 + pupilOffset.x} cy={34.2 + pupilOffset.y} r="0.8" fill="#FFFFFF" />
                <circle cx={69.8 + pupilOffset.x} cy={34.2 + pupilOffset.y} r="0.8" fill="#FFFFFF" />
              </>
            )}
          </g>

          {/* Cap */}
          <path d="M 35 32 Q 60 15 85 32 Q 87 24 60 18 Q 33 24 35 32 Z" fill="#1E293B" />
          <path d="M 39 28 Q 60 11 81 28 Z" fill="#0F172A" />
          <rect x="55" y="11" width="10" height="5" rx="2.5" fill="#F59E0B" />
        </g>
      </svg>
    </div>
  )
}
