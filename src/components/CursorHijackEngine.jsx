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
  // States: 'at_desk' | 'run' | 'bg_coding' | 'alert' | 'grab' | 'drag' | 'celebrate' | 'going_to_desk' | 'save_mode'
  const [hijackState, setHijackState] = useState('at_desk')
  const [mousePos, setMousePos] = useState({ x: 300, y: 300 })
  const [dwarfPos, setDwarfPos] = useState({ x: 400, y: 300 })
  const [cursorPos, setCursorPos] = useState({ x: 300, y: 300 })
  const [isHijacked, setIsHijacked] = useState(false)
  const [facing, setFacing] = useState('right')
  const [isAtDesk, setIsAtDesk] = useState(true)

  const animTimelineRef = useRef(null)
  const footstepTimerRef = useRef(null)
  const bgCodingTimerRef = useRef(null)
  const idleTimerRef = useRef(null)
  const lastMoveTimeRef = useRef(Date.now())
  const currentHijackStateRef = useRef(hijackState)
  const mousePosRef = useRef(mousePos)
  const dwarfPosRef = useRef(dwarfPos)
  const isHijackedRef = useRef(isHijacked)

  const onStatusChangeRef = useRef(onStatusChange)
  useEffect(() => {
    onStatusChangeRef.current = onStatusChange
  }, [onStatusChange])

  useEffect(() => {
    currentHijackStateRef.current = hijackState
    if (onStatusChangeRef.current) {
      onStatusChangeRef.current(hijackState)
    }
  }, [hijackState])

  useEffect(() => { mousePosRef.current = mousePos }, [mousePos])
  useEffect(() => { dwarfPosRef.current = dwarfPos }, [dwarfPos])
  useEffect(() => { isHijackedRef.current = isHijacked }, [isHijacked])

  // Instant unmount cleanup to eliminate navigation lag
  useEffect(() => {
    return () => {
      if (animTimelineRef.current) animTimelineRef.current.kill()
      if (idleTimerRef.current) clearInterval(idleTimerRef.current)
      if (bgCodingTimerRef.current) clearInterval(bgCodingTimerRef.current)
      if (footstepTimerRef.current) clearInterval(footstepTimerRef.current)
      document.body.style.cursor = 'default'
    }
  }, [])

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

  // Check if current mouse position is inside the Hero Section box
  const isMouseInHeroBox = () => {
    if (heroRef && heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect()
      const mx = mousePosRef.current.x
      const my = mousePosRef.current.y
      return mx >= rect.left && mx <= rect.right && my >= rect.top && my <= rect.bottom
    }
    return false
  }

  // Track Mouse Movements, Keypresses & Scroll Activity
  useEffect(() => {
    const handleActivity = (e) => {
      if (isPaused) return
      const state = currentHijackStateRef.current
      lastMoveTimeRef.current = Date.now()

      if (e.type === 'mousemove') {
        const mouseX = e.clientX
        const mouseY = e.clientY
        mousePosRef.current = { x: mouseX, y: mouseY }

        // If mouse moves towards top navbar (Y < 75), cancel any hijack immediately
        if (mouseY < 75 && (isHijackedRef.current || state !== 'at_desk')) {
          cancelHijack()
          return
        }

        // Deactivate immediately if user moves mouse actively while Veon is acting
        if (isHijackedRef.current || state === 'alert' || state === 'run' || state === 'grab' || state === 'drag') {
          cancelHijack()
        }
      }

      if (state === 'save_mode') {
        resumeStation()
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

  // ── IDLE DRAG / SAVE MODE TIMER ───────────────────────────
  useEffect(() => {
    if (isPaused) {
      if (animTimelineRef.current) animTimelineRef.current.kill()
      return
    }

    idleTimerRef.current = setInterval(() => {
      const idleDuration = Date.now() - lastMoveTimeRef.current
      const state = currentHijackStateRef.current

      // 1. If 30 seconds of total inactivity -> ENTER SAVE MODE
      if (idleDuration >= 30000 && state !== 'save_mode' && !isHijacked) {
        if (animTimelineRef.current) animTimelineRef.current.kill()
        setHijackState('save_mode')
        return
      }

      // 2. If 3.5 seconds idle inside Hero Box -> Veon steps out to guide cursor to Strategy Call CTA
      if (
        idleDuration >= 3500 &&
        idleDuration < 30000 &&
        !isHijacked &&
        isMouseInHeroBox() &&
        state !== 'save_mode' &&
        state !== 'alert' &&
        state !== 'run' &&
        state !== 'grab' &&
        state !== 'drag' &&
        state !== 'celebrate' &&
        state !== 'going_to_desk'
      ) {
        lastMoveTimeRef.current = Date.now() + 20000 // Prevent re-trigger while dragging
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
      if (!isHijackedRef.current && state === 'at_desk') {
        setHijackState('bg_coding')
        setTimeout(() => {
          setHijackState('at_desk')
        }, 3500)
      }
    }, 25000)

    return () => {
      if (bgCodingTimerRef.current) clearInterval(bgCodingTimerRef.current)
    }
  }, [isPaused])

  // Reset to Workstation Stance
  const resumeStation = () => {
    if (animTimelineRef.current) animTimelineRef.current.kill()
    setIsAtDesk(true)
    setHijackState('at_desk')
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
    resumeStation()
  }

  // Dynamic Hijack Sequence Trigger (Veon steps from desk -> grabs cursor -> drags to button -> returns to desk)
  const startHijackSequence = (userMouseX, userMouseY) => {
    if (isHijackedRef.current) return

    const deskCoords = getDeskCoordinates()
    setDwarfPos(deskCoords)

    setCursorPos({ x: userMouseX, y: userMouseY })
    setIsHijacked(true)
    document.body.style.cursor = 'none'

    // STEP 1: ALERT AT DESK
    setHijackState('alert')
    const isTargetLeft = userMouseX < deskCoords.x
    setFacing(isTargetLeft ? 'left' : 'right')

    const tl = gsap.timeline()
    animTimelineRef.current = tl

    // STEP 2: SPRINT FROM DESK TO USER MOUSE
    const startDwarfRun = { ...deskCoords }
    const runProgress = { p: 0 }

    tl.to({}, { duration: 0.4 })
      .add(() => {
        setHijackState('run')
      })
      .to(runProgress, {
        p: 1,
        duration: 0.8,
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

    // STEP 3: GRAB CURSOR
    tl.add(() => {
      setHijackState('grab')
      setCursorPos({ x: userMouseX, y: userMouseY })
    }).to({}, { duration: 0.3 })

    // STEP 4: DRAG CURSOR TO STRATEGY CALL CTA BUTTON
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
      duration: 1.4,
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

    // STEP 5: CELEBRATE ON CTA BUTTON
    tl.add(() => {
      setHijackState('celebrate')
    }).to({}, { duration: 1.5 })

    // STEP 6: RETURN TO WORKSTATION DESK
    const returnProgress = { p: 0 }
    tl.add(() => {
      setIsHijacked(false)
      document.body.style.cursor = 'default'
      setHijackState('run')
    }).to(returnProgress, {
      p: 1,
      duration: 1.0,
      ease: 'power2.inOut',
      onUpdate: () => {
        const liveDesk = getDeskCoordinates()
        const curX = dwarfPosRef.current.x + (liveDesk.x - dwarfPosRef.current.x) * returnProgress.p
        const curY = dwarfPosRef.current.y + (liveDesk.y - dwarfPosRef.current.y) * returnProgress.p
        setDwarfPos({ x: curX, y: curY })
        setFacing(liveDesk.x < curX ? 'left' : 'right')
      },
      onComplete: () => {
        setHijackState('at_desk')
        setIsAtDesk(true)
      },
    })
  }

  // Character display state mapping
  const characterDisplayState =
    hijackState === 'going_to_desk' ? 'run' : hijackState

  return (
    <>
      {/* Veon Positioned Absolutely on Viewport (Hidden when sitting at_desk or bg_coding so he sits in workstation chair) */}
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

      {/* Vector Cursor Pointer Icon during Hijack */}
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
          {/* Action Tag on Cursor */}
          {hijackState === 'drag' && (
            <div
              style={{
                position: 'absolute',
                top: '-32px',
                left: '18px',
                background: '#FF5733',
                color: '#FFF',
                padding: '3px 10px',
                borderRadius: '10px',
                fontSize: '11px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(255, 87, 51, 0.5)',
              }}
            >
              🚀 GUIDING TO STRATEGY CALL
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

      {/* Visual Tether line connecting Veon & Cursor during drag */}
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
