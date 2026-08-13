import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import DwarfCharacter from './DwarfCharacter'
import {
  playFootstepSound,
  playAlertSound,
  playGrabSound,
  playDragPulseSound,
  playVictoryChime,
} from '../utils/soundEffects'

export default function CursorHijackEngine({
  heroRef,
  deskRef,
  targetButtonRef,
  soundEnabled = false,
  isPaused = false,
  onStatusChange,
}) {
  // States: 'stalking' | 'run_to_mouse' | 'run' | 'at_desk' | 'going_to_desk' | 'bg_coding' | 'alert' | 'grab' | 'drag' | 'rest' | 'save_mode'
  const [hijackState, setHijackState] = useState('stalking')
  const [mousePos, setMousePos] = useState({ x: 300, y: 300 })
  const [dwarfPos, setDwarfPos] = useState({ x: 400, y: 300 })
  const [cursorPos, setCursorPos] = useState({ x: 300, y: 300 })
  const [isHijacked, setIsHijacked] = useState(false)
  const [facing, setFacing] = useState('right')
  const [isAtDesk, setIsAtDesk] = useState(false)

  const animTimelineRef = useRef(null)
  const footstepTimerRef = useRef(null)
  const bgCodingTimerRef = useRef(null)
  const idleTimerRef = useRef(null)
  const lastMoveTimeRef = useRef(Date.now())
  const currentHijackStateRef = useRef(hijackState)
  const mousePosRef = useRef(mousePos)
  const dwarfPosRef = useRef(dwarfPos)
  const isHijackedRef = useRef(isHijacked)

  useEffect(() => {
    currentHijackStateRef.current = hijackState
    if (onStatusChange) onStatusChange(hijackState)
  }, [hijackState, onStatusChange])

  useEffect(() => { mousePosRef.current = mousePos }, [mousePos])
  useEffect(() => { dwarfPosRef.current = dwarfPos }, [dwarfPos])
  useEffect(() => { isHijackedRef.current = isHijacked }, [isHijacked])

  // Get live Dev Desk coordinates on viewport
  const getDeskCoordinates = () => {
    if (deskRef && deskRef.current) {
      const rect = deskRef.current.getBoundingClientRect()
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2 - 10,
      }
    }
    return { x: window.innerWidth * 0.75, y: 260 }
  }

  // Get live Target Button coordinates on viewport
  const getTargetButtonCoordinates = () => {
    if (targetButtonRef && targetButtonRef.current) {
      const rect = targetButtonRef.current.getBoundingClientRect()
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      }
    }
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 }
  }

  // Track Mouse Movements, Keypresses, Scroll & Idle Inactivity
  useEffect(() => {
    const handleActivity = (e) => {
      if (isPaused) return
      const state = currentHijackStateRef.current
      lastMoveTimeRef.current = Date.now()

      if (e.type === 'mousemove') {
        const mouseX = e.clientX
        const mouseY = e.clientY
        setMousePos({ x: mouseX, y: mouseY })

        if (!isHijacked) {
          setCursorPos({ x: mouseX, y: mouseY })
        }
      }

      // Exit Save Mode, Rest Mode, or Celebrate Mode on user activity
      if (state === 'save_mode' || state === 'rest' || (state === 'celebrate' && !isHijacked)) {
        resumeStalking()
      }
    }

    window.addEventListener('mousemove', handleActivity, { passive: true })
    window.addEventListener('keydown', handleActivity, { passive: true })
    window.addEventListener('scroll', handleActivity, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleActivity)
      window.removeEventListener('keydown', handleActivity)
      window.removeEventListener('scroll', handleActivity)
    }
  }, [isHijacked, isPaused])

  // ── 2-SEC IDLE DRAG / 20-SEC SAVE MODE TIMER ───────────────────────────
  useEffect(() => {
    if (isPaused) {
      if (animTimelineRef.current) animTimelineRef.current.kill()
      return
    }

    idleTimerRef.current = setInterval(() => {
      const idleDuration = Date.now() - lastMoveTimeRef.current
      const state = currentHijackStateRef.current

      // 1. If 20 seconds of total inactivity -> ENTER SAVE MODE
      if (idleDuration >= 20000 && state !== 'save_mode' && !isHijacked) {
        if (animTimelineRef.current) animTimelineRef.current.kill()
        setHijackState('save_mode')
        return
      }

      // 2. If 2 seconds idle -> Pappu picks cursor & drags to Let's Talk
      if (
        idleDuration >= 2000 &&
        idleDuration < 20000 &&
        !isHijacked &&
        state !== 'save_mode' &&
        state !== 'rest' &&
        state !== 'alert' &&
        state !== 'run' &&
        state !== 'grab' &&
        state !== 'drag' &&
        state !== 'going_to_desk' &&
        state !== 'bg_coding'
      ) {
        lastMoveTimeRef.current = Date.now() + 15000 // Prevent re-trigger while dragging
        startHijackSequence(mousePosRef.current.x, mousePosRef.current.y)
      }
    }, 500)

    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current)
    }
  }, [isHijacked, isPaused])

  // ── 30-SECOND RECURRING BACKGROUND BENCH CODING LOOP ──────────────────
  useEffect(() => {
    if (isPaused) return

    bgCodingTimerRef.current = setInterval(() => {
      const state = currentHijackStateRef.current
      if (!isHijackedRef.current && state !== 'save_mode' && state !== 'drag' && state !== 'grab' && state !== 'alert') {
        sendPappuToBenchFor2sCoding()
      }
    }, 30000)

    return () => {
      if (bgCodingTimerRef.current) clearInterval(bgCodingTimerRef.current)
    }
  }, [isPaused])

  // ── PAPPU STALKING MOUSE PHYSICS LOOP ──────────────────────────────
  useEffect(() => {
    let animFrame
    const tick = () => {
      animFrame = requestAnimationFrame(tick)
      if (isPaused) return

      const state = currentHijackStateRef.current

      // In Save Mode, Rest, or Bench Coding: Pappu stays in position!
      if (state === 'save_mode' || state === 'rest' || state === 'bg_coding' || state === 'at_desk') return

      // Stalking mode: Pappu follows the mouse cursor everywhere!
      if (state === 'stalking' || state === 'run_to_mouse') {
        const mouse = mousePosRef.current
        const curDwarf = dwarfPosRef.current

        // Target offset so Pappu walks right alongside cursor
        const targetX = mouse.x + (mouse.x < window.innerWidth / 2 ? 45 : -45)
        const targetY = mouse.y + 15

        const dx = targetX - curDwarf.x
        const dy = targetY - curDwarf.y
        const dist = Math.hypot(dx, dy)

        if (dist > 14) {
          // Smooth Lerp towards Mouse Cursor
          const newX = curDwarf.x + dx * 0.075
          const newY = curDwarf.y + dy * 0.075
          setDwarfPos({ x: newX, y: newY })
          setFacing(mouse.x < curDwarf.x ? 'left' : 'right')

          if (state !== 'run_to_mouse') {
            setHijackState('run_to_mouse')
          }
        } else {
          // Reached cursor -> stay in stalking idle stance
          setFacing(mouse.x < curDwarf.x ? 'left' : 'right')
          if (state !== 'stalking') {
            setHijackState('stalking')
          }
        }
      }
    }

    animFrame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animFrame)
  }, [isPaused])

  // Send Pappu to bench for 2 seconds to code the webpage in background (Runs every 30 seconds)
  const sendPappuToBenchFor2sCoding = () => {
    if (animTimelineRef.current) animTimelineRef.current.kill()

    const deskCoords = getDeskCoordinates()
    setHijackState('going_to_desk')
    setIsAtDesk(false)

    const startDwarf = { ...dwarfPosRef.current }
    setFacing(deskCoords.x < startDwarf.x ? 'left' : 'right')

    const progressObj = { p: 0 }
    gsap.to(progressObj, {
      p: 1,
      duration: 0.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        const liveDesk = getDeskCoordinates()
        const curX = startDwarf.x + (liveDesk.x - startDwarf.x) * progressObj.p
        const curY = startDwarf.y + (liveDesk.y - startDwarf.y) * progressObj.p
        setDwarfPos({ x: curX, y: curY })
      },
      onComplete: () => {
        // Pappu sits at bench and codes webpage actively for 2 seconds!
        setHijackState('bg_coding')
        setIsAtDesk(true)
        setFacing('left')

        // Stay at desk for exactly 2 seconds, then return to normal!
        setTimeout(() => {
          setIsAtDesk(false)
          resumeStalking()
        }, 2000)
      },
    })
  }

  // Resume Stalking Cursor
  const resumeStalking = () => {
    if (animTimelineRef.current) animTimelineRef.current.kill()
    setIsAtDesk(false)
    setHijackState('stalking')
  }

  // ESC key emergency un-hijack
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        cancelHijack()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Cancel / Reset Hijack
  const cancelHijack = () => {
    if (animTimelineRef.current) animTimelineRef.current.kill()
    if (footstepTimerRef.current) clearInterval(footstepTimerRef.current)

    setIsHijacked(false)
    document.body.style.cursor = 'default'
    resumeStalking()
  }

  // Dynamic Hijack Sequence Trigger
  const startHijackSequence = (userMouseX, userMouseY) => {
    if (isHijackedRef.current) return

    // Immediately snap cursor position to exact real mouse coordinates
    setCursorPos({ x: userMouseX, y: userMouseY })
    setIsHijacked(true)
    document.body.style.cursor = 'none'

    // STEP 1: ALERT
    setHijackState('alert')

    const isTargetLeft = userMouseX < dwarfPosRef.current.x
    setFacing(isTargetLeft ? 'left' : 'right')

    const tl = gsap.timeline({
      onComplete: () => {
        setIsHijacked(false)
        document.body.style.cursor = 'default'
        setHijackState('rest')
      },
    })
    animTimelineRef.current = tl

    // STEP 2: SPRINT TO USER MOUSE
    const startDwarfRun = { ...dwarfPosRef.current }
    const runProgress = { p: 0 }

    tl.to({}, { duration: 0.35 })
      .add(() => {
        setHijackState('run')
      })
      .to(runProgress, {
        p: 1,
        duration: 0.75,
        ease: 'power2.out',
        onUpdate: () => {
          const targetX = userMouseX - (isTargetLeft ? -35 : 35)
          const targetY = userMouseY - 55
          const curX = startDwarfRun.x + (targetX - startDwarfRun.x) * runProgress.p
          const curY = startDwarfRun.y + (targetY - startDwarfRun.y) * runProgress.p
          setDwarfPos({ x: curX, y: curY })
          setFacing(userMouseX < curX ? 'left' : 'right')
        },
      })

    // STEP 3: GRAB CURSOR AT REAL MOUSE LOCATION
    tl.add(() => {
      setHijackState('grab')
      setCursorPos({ x: userMouseX, y: userMouseY })
    }).to({}, { duration: 0.25 })

    // STEP 4: DRAG CURSOR TO CTA BUTTON
    let dragStartCursor = { x: userMouseX, y: userMouseY }
    const dragProgress = { p: 0 }

    tl.add(() => {
      setHijackState('drag')
      dragStartCursor = { x: userMouseX, y: userMouseY }

      if (targetButtonRef && targetButtonRef.current) {
        targetButtonRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }).to(dragProgress, {
      p: 1,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const liveBtn = getTargetButtonCoordinates()
        const curCX = dragStartCursor.x + (liveBtn.x - dragStartCursor.x) * dragProgress.p
        const curCY = dragStartCursor.y + (liveBtn.y - dragStartCursor.y) * dragProgress.p

        setCursorPos({ x: curCX, y: curCY })
        setDwarfPos({ x: curCX - 45, y: curCY - 35 })
        setFacing(liveBtn.x < curCX ? 'left' : 'right')
      },
    })

    // STEP 5: FINISH
    tl.add(() => {
      if (footstepTimerRef.current) clearInterval(footstepTimerRef.current)
    })
  }

  // Character display state mapping
  const characterDisplayState =
    hijackState === 'going_to_desk' || hijackState === 'run_to_mouse' ? 'run' : hijackState

  return (
    <>
      {/* Pappu Positioned Absolutely on Viewport (Hidden when sitting at_desk or bg_coding so he sits in chair) */}
      {hijackState !== 'at_desk' && hijackState !== 'bg_coding' && (
        <div
          style={{
            position: 'fixed',
            left: `${dwarfPos.x - 60}px`,
            top: `${dwarfPos.y - 70}px`,
            zIndex: 9990,
            pointerEvents: 'none',
            filter: isHijacked ? 'drop-shadow(0 12px 24px rgba(0,0,0,0.25))' : 'none',
          }}
        >
          <DwarfCharacter
            state={characterDisplayState}
            mousePos={mousePos}
            dwarfPos={dwarfPos}
            facing={facing}
            scale={1.0}
          />
        </div>
      )}

      {/* Custom Vector Laptop Cursor Pointer Icon during Hijack */}
      {(isHijacked || hijackState === 'celebrate') && (
        <div
          style={{
            position: 'fixed',
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            zIndex: 9999,
            pointerEvents: 'none',
            transform: 'translate(-2px, -2px)',
          }}
        >
          {/* Robbery Reaction Tag on Cursor */}
          {hijackState === 'drag' && (
            <div
              style={{
                position: 'absolute',
                top: '-32px',
                left: '18px',
                background: '#FF5733',
                color: '#FFF',
                padding: '3px 8px',
                borderRadius: '10px',
                fontSize: '10px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(255, 87, 51, 0.5)',
              }}
            >
              🚨 CURSOR ROBBED BY PAPPU!
            </div>
          )}

          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(1px 2px 4px rgba(0,0,0,0.5))' }}>
            {hijackState === 'drag' && (
              <circle cx="6" cy="6" r="14" fill="none" stroke="#FF5733" strokeWidth="2" opacity="0.8">
                <animate attributeName="r" values="8;16;8" dur="0.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.2;0.9" dur="0.8s" repeatCount="indefinite" />
              </circle>
            )}
            {/* Authentic OS White Pointer Arrow */}
            <path
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            {isHijacked && <circle cx="5" cy="5" r="3.5" fill="#FF5733" opacity="0.9" />}
          </svg>
        </div>
      )}

      {/* Visual Tether line connecting Pappu & Cursor during drag */}
      {hijackState === 'drag' && (
        <svg
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 9988,
          }}
        >
          <line
            x1={dwarfPos.x}
            y1={dwarfPos.y}
            x2={cursorPos.x}
            y2={cursorPos.y}
            stroke="#FF5733"
            strokeWidth="3"
            strokeDasharray="6 4"
          />
        </svg>
      )}
    </>
  )
}
