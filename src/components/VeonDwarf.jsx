import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import DwarfCharacter from './DwarfCharacter'
import { useKeyboardContext } from '../context/KeyboardContext'

/**
 * VeonDwarf — The official AI/Software Engineer Dwarf Companion (VEON)
 *
 * Page Behavior Modes:
 * 1) HOME (/):
 *    - Sits at desk for 3s on load.
 *    - Follows cursor with safe distance of ~0.5 cm (~20px).
 *    - Max 5s continuous follow before taking a desk or stalking break.
 *    - Navbar Exclusion Zone (clamped below Y = 120px).
 *    - Stops instantly with zero jitter when cursor pauses.
 *    - Idle > 2s: Grabs cursor & drags to CTA.
 * 2) ABOUT (/about, /interactive):
 *    - Sits happily on his Developer Workstation table (at_desk).
 * 3) OTHER PAGES (/services, /products, etc.):
 *    - Dives underground on transition and stands guard at bottom-left corner.
 */
export default function VeonDwarf() {
  const { openChatModal } = useKeyboardContext()
  const location = useLocation()
  const pathname = location.pathname
  const isHome = pathname === '/'
  const isInteractive = pathname === '/interactive'

  // ── Sync Mode on Route Change ────────────────────────────────
  useEffect(() => {
    const isHomePage = location.pathname === '/'
    const isInteractivePage = location.pathname === '/interactive'

    if (isHomePage) {
      modeRef.current = 'home'
      setMode('home')
    } else if (isInteractivePage) {
      modeRef.current = 'about'
      setMode('about')
    } else {
      modeRef.current = 'corner'
      setMode('corner')
      updatePos({ x: 64, y: window.innerHeight - 80 })
    }
  }, [location.pathname])

  const initialMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  const initialPos = initialMobile
    ? { x: 44, y: (typeof window !== 'undefined' ? window.innerHeight : 700) - 56 }
    : { x: 120, y: 350 }

  // ── State ─────────────────────────────────────────────────────
  const [isMobile, setIsMobile]               = useState(initialMobile)
  const [pos, setPos]                         = useState(initialPos)
  const [facing, setFacing]                   = useState('right')
  const [dwarfState, setDwarfState]           = useState('idle')
  const [mode, setMode]                       = useState(isHome ? 'home' : isInteractive ? 'about' : 'corner')
  const [cursorPos, setCursorPos]             = useState({ x: 300, y: 300 })
  const [showFakeCursor, setShowFakeCursor]   = useState(false)
  const [dialogue, setDialogue]               = useState(null)
  const [isUserDragging, setIsUserDragging]   = useState(false)

  // ── Refs ──────────────────────────────────────────────────────
  const posRef                    = useRef(initialPos)
  const modeRef                   = useRef(isHome ? 'home' : isInteractive ? 'about' : 'corner')
  const dwarfStateRef             = useRef('idle')
  const facingRef                 = useRef('right')
  const cursorRef                 = useRef({ x: 300, y: 300 })
  const lastMoveRef               = useRef(Date.now())
  const isCursorMovingRef         = useRef(false)
  const hijackDoneRef             = useRef(false)
  const isBusyRef                 = useRef(false)
  const busyTimeoutRef            = useRef(null)
  const rafRef                    = useRef(null)
  const idleTimerRef              = useRef(null)
  const walkTimerRef              = useRef(null)
  const isInitialRef              = useRef(true)
  const prevPathRef               = useRef(pathname)
  const isUserDraggingRef         = useRef(false)
  const dragStartPointerRef       = useRef({ x: 0, y: 0 })
  const dragStartDwarfRef         = useRef({ x: 0, y: 0 })
  const hasMovedWhileDraggingRef  = useRef(false)

  // 3-second initial load guard & 5-second follow burst tracker
  const followAllowedRef    = useRef(false)
  const followStartTimeRef  = useRef(0)

  // Sync helpers
  const updatePos = (p) => {
    posRef.current = p
    setPos(p)
  }
  const updateMode = (m) => {
    modeRef.current = m
    setMode(m)
  }
  const updateDwarfState = (s) => {
    if (dwarfStateRef.current !== s) {
      dwarfStateRef.current = s
      setDwarfState(s)
    }
  }
  const updateFacing = (f) => {
    if (facingRef.current !== f) {
      facingRef.current = f
      setFacing(f)
    }
  }

  // ── Drag & Drop Pick-and-Place Handler ───────────────────────
  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0

    dragStartPointerRef.current = { x: clientX, y: clientY }
    dragStartDwarfRef.current = { ...posRef.current }
    hasMovedWhileDraggingRef.current = false
    isUserDraggingRef.current = true
    setIsUserDragging(true)
  }

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isUserDraggingRef.current) return
      const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0
      const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0

      const dx = clientX - dragStartPointerRef.current.x
      const dy = clientY - dragStartPointerRef.current.y
      const dist = Math.hypot(dx, dy)

      if (dist > 4) {
        hasMovedWhileDraggingRef.current = true
        isBusyRef.current = true
        modeRef.current = 'dragged'

        const newX = Math.max(45, Math.min(window.innerWidth - 45, dragStartDwarfRef.current.x + dx))
        const newY = Math.max(115, Math.min(window.innerHeight - 45, dragStartDwarfRef.current.y + dy))

        updatePos({ x: newX, y: newY })
        updateFacing(dx >= 0 ? 'right' : 'left')
        updateDwarfState('run')
      }
    }

    const handlePointerUp = () => {
      if (!isUserDraggingRef.current) return
      isUserDraggingRef.current = false
      setIsUserDragging(false)

      if (hasMovedWhileDraggingRef.current) {
        updateDwarfState('celebrate')
        say('Landed at new spot! 🚀', 2000)
        setTimeout(() => {
          updateDwarfState('idle')
          isBusyRef.current = false
        }, 1000)
      } else {
        if (openChatModal) openChatModal()
      }
    }

    window.addEventListener('mousemove', handlePointerMove, { passive: true })
    window.addEventListener('mouseup', handlePointerUp)
    window.addEventListener('touchmove', handlePointerMove, { passive: true })
    window.addEventListener('touchend', handlePointerUp)

    return () => {
      window.removeEventListener('mousemove', handlePointerMove)
      window.removeEventListener('mouseup', handlePointerUp)
      window.removeEventListener('touchmove', handlePointerMove)
      window.removeEventListener('touchend', handlePointerUp)
    }
  }, [openChatModal])

  // ── Dialogue balloon helper ──────────────────────────────────
  const say = (text, ms = 3000) => {
    setDialogue(text)
    setTimeout(() => setDialogue((prev) => (prev === text ? null : prev)), ms)
  }

  // ── Smooth Walk Function (for scripted animations) ───────────
  const walkTo = (target, onDone, speed = 0.02) => {
    if (walkTimerRef.current) clearInterval(walkTimerRef.current)
    const start = { ...posRef.current }
    let p = 0
    updateDwarfState('run')
    updateFacing(target.x > start.x ? 'right' : 'left')

    walkTimerRef.current = setInterval(() => {
      p = Math.min(p + speed, 1)
      const nx = start.x + (target.x - start.x) * p
      const ny = Math.max(115, start.y + (target.y - start.y) * p)

      updatePos({ x: nx, y: ny })
      if (Math.abs(target.x - nx) > 2) {
        updateFacing(target.x > nx ? 'right' : 'left')
      }
      if (p >= 1) {
        clearInterval(walkTimerRef.current)
        walkTimerRef.current = null
        updateDwarfState('idle')
        if (onDone) onDone()
      }
    }, 16)
  }

  // ── Cancel Any Active Hijack / Script ─────────────────────────
  const cancelHijack = () => {
    document.body.style.cursor = 'default'
    setShowFakeCursor(false)
    isBusyRef.current = false
    updateDwarfState('idle')
  }

  // ── Break Behaviors (Desk or Stalk) ──────────────────────────
  const goToDesk = (reason = 'Pushing code to staging... ☕') => {
    isBusyRef.current = true
    followStartTimeRef.current = 0
    const deskEl = document.querySelector('[data-veon-desk]')
    const deskPos = deskEl
      ? (() => {
          const r = deskEl.getBoundingClientRect()
          return { x: r.left + r.width / 2, y: Math.max(130, r.top + r.height / 2) }
        })()
      : { x: window.innerWidth * 0.5, y: 240 }

    walkTo(deskPos, () => {
      updateDwarfState('at_desk')
      say(reason, 3000)
      busyTimeoutRef.current = setTimeout(() => {
        updateDwarfState('idle')
        isBusyRef.current = false
      }, 4000)
    })
  }

  const goStalk = () => {
    isBusyRef.current = true
    followStartTimeRef.current = 0
    const isRight = cursorRef.current.x < window.innerWidth / 2
    const sx = isRight ? window.innerWidth * 0.88 : window.innerWidth * 0.08
    const sy = Math.max(140, 220 + Math.random() * 260)

    walkTo({ x: sx, y: sy }, () => {
      updateDwarfState('stalking')
      updateFacing(cursorRef.current.x > sx ? 'right' : 'left')
      say('Taking a breather, observing from afar 👀', 3000)
      busyTimeoutRef.current = setTimeout(() => {
        updateDwarfState('idle')
        isBusyRef.current = false
      }, 4000)
    })
  }

  // ── Trigger Autonomous Break after 5s continuous follow ───────
  const triggerFollowBreak = () => {
    if (Math.random() < 0.5) {
      goToDesk('Taking a 5s code break at my desk! ☕')
    } else {
      goStalk()
    }
  }

  // ── Rule 3: Drag Cursor to CTA Sequence ───────────────────────
  const dragToCTA = (startCursorPos) => {
    const btn = document.querySelector('[data-veon-target="cta"]')
    if (!btn) {
      cancelHijack()
      return
    }

    btn.scrollIntoView({ behavior: 'smooth', block: 'center' })

    setTimeout(() => {
      const rect = btn.getBoundingClientRect()
      const btnPos = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
      const startC = { ...startCursorPos }
      const startD = { ...posRef.current }
      let p = 0

      updateDwarfState('drag')
      say('Let me show you where the magic happens! 🚀', 2800)

      const dragInt = setInterval(() => {
        p = Math.min(p + 0.014, 1)
        const cx = startC.x + (btnPos.x - startC.x) * p
        const cy = startC.y + (btnPos.y - startC.y) * p
        setCursorPos({ x: cx, y: cy })

        const dx = startD.x + (btnPos.x - 45 - startD.x) * p
        const dy = startD.y + (btnPos.y - 35 - startD.y) * p
        updatePos({ x: dx, y: dy })
        updateFacing(btnPos.x > dx ? 'right' : 'left')

        if (p >= 1) {
          clearInterval(dragInt)
          document.body.style.cursor = 'default'
          updateDwarfState('celebrate')
          say('Book your Free Strategy Call here! ✨', 3500)

          setTimeout(() => {
            setShowFakeCursor(false)
            updateDwarfState('run')
            goToDesk('Veon back on code duty! ☕')
          }, 2000)
        }
      }, 16)
    }, 350)
  }

  // ── Rule 3 Trigger: Idle > 2s on initial load ─────────────────
  const startIdleHijack = () => {
    if (!followAllowedRef.current || isBusyRef.current || hijackDoneRef.current || modeRef.current !== 'home') return

    isBusyRef.current = true
    hijackDoneRef.current = true

    const cursor = { ...cursorRef.current }
    if (cursor.y < 100) {
      isBusyRef.current = false
      return
    }

    document.body.style.cursor = 'none'
    setShowFakeCursor(true)
    setCursorPos(cursor)
    updateDwarfState('alert')
    say('Thinking? Let me guide you! 💡', 2000)

    setTimeout(() => {
      const runTarget = { x: cursor.x - 30, y: Math.max(120, cursor.y - 55) }
      const runStart = { ...posRef.current }
      let p = 0
      updateDwarfState('run')

      const runInt = setInterval(() => {
        p = Math.min(p + 0.045, 1)
        const nx = runStart.x + (runTarget.x - runStart.x) * p
        const ny = Math.max(115, runStart.y + (runTarget.y - runStart.y) * p)
        updatePos({ x: nx, y: ny })
        updateFacing(cursor.x > nx ? 'right' : 'left')

        if (p >= 1) {
          clearInterval(runInt)
          updateDwarfState('grab')
          setTimeout(() => dragToCTA(cursor), 350)
        }
      }, 16)
    }, 500)
  }

  // ── Route Transitions ─────────────────────────────────────────
  const triggerExitAnimation = (targetMode = 'corner') => {
    if (walkTimerRef.current) clearInterval(walkTimerRef.current)
    if (busyTimeoutRef.current) clearTimeout(busyTimeoutRef.current)
    isBusyRef.current = true
    updateMode('transitioning')
    updateDwarfState('run')
    say('Travelling to new section! 🏃‍♂️💨', 1500)

    const startPos = { ...posRef.current }
    const exitY = window.innerHeight + 160
    let p = 0

    const exitInt = setInterval(() => {
      p = Math.min(p + 0.045, 1)
      const easeP = p * p
      const nx = startPos.x + (startPos.x > window.innerWidth / 2 ? -60 : 60) * easeP
      const ny = startPos.y + (exitY - startPos.y) * easeP
      updatePos({ x: nx, y: ny })

      if (p >= 1) {
        clearInterval(exitInt)
        if (targetMode === 'about') {
          // On About section: VEON sits directly on his dev workstation
          updateMode('about')
          updateDwarfState('at_desk')
          isBusyRef.current = false
          return
        }

        const cornerX = 64
        updatePos({ x: cornerX, y: exitY })
        updateFacing('right')

        setTimeout(() => {
          updateMode('corner_rising')
          updateDwarfState('run')
          let p2 = 0
          const cornerY = window.innerHeight - 80

          const riseInt = setInterval(() => {
            p2 = Math.min(p2 + 0.035, 1)
            const easeP2 = 1 - Math.pow(1 - p2, 3)
            const ny2 = exitY + (cornerY - exitY) * easeP2
            updatePos({ x: cornerX, y: ny2 })

            if (p2 >= 1) {
              clearInterval(riseInt)
              updateMode('corner')
              updateDwarfState('idle')
              updateFacing('right')
              isBusyRef.current = false
              say('Veon standing by! 🛡️', 2500)
            }
          }, 16)
        }, 200)
      }
    }, 16)
  }

  // ── Handle Page / Route Changes ───────────────────────────────
  useEffect(() => {
    if (isInitialRef.current) {
      isInitialRef.current = false
      if (isHome) {
        updateMode('home')
        followAllowedRef.current = false
        updateDwarfState('at_desk')

        const deskEl = document.querySelector('[data-veon-desk]')
        if (deskEl) {
          const r = deskEl.getBoundingClientRect()
          updatePos({ x: r.left + r.width / 2, y: Math.max(130, r.top + r.height / 2) })
        }

        // 3-SECOND INITIAL LOAD DELAY ON HOME
        setTimeout(() => {
          followAllowedRef.current = true
          updateDwarfState('idle')
          say('VEON activated! Ready to code. ⚡', 2500)
        }, 3000)
      } else if (isInteractive) {
        // ON INTERACTIVE SECTION: Sits on his dev table
        updateMode('about')
        updateDwarfState('at_desk')
      } else {
        updateMode('corner')
        updatePos({ x: 64, y: window.innerHeight - 80 })
        updateDwarfState('idle')
      }
      prevPathRef.current = pathname
      return
    }

    const prev = prevPathRef.current
    const curr = pathname
    prevPathRef.current = curr

    if (prev === '/' && curr !== '/') {
      triggerExitAnimation(isInteractive ? 'about' : 'corner')
    } else if (prev !== '/' && curr === '/') {
      hijackDoneRef.current = false
      isBusyRef.current = false
      followAllowedRef.current = false
      updateMode('home')
      updateDwarfState('at_desk')
      say('Welcome back to Headquarters! ⚡', 2500)

      const deskEl = document.querySelector('[data-veon-desk]')
      if (deskEl) {
        const r = deskEl.getBoundingClientRect()
        updatePos({ x: r.left + r.width / 2, y: Math.max(130, r.top + r.height / 2) })
      }

      setTimeout(() => {
        followAllowedRef.current = true
        updateDwarfState('idle')
      }, 3000)
    } else if (isInteractive) {
      updateMode('about')
      updateDwarfState('at_desk')
    } else {
      updateMode('corner')
      updatePos({ x: 64, y: window.innerHeight - 80 })
      updateDwarfState('idle')
    }
  }, [pathname, isInteractive, isHome])

  // ── Mouse Tracking with Immediate Stop Detection ──────────────
  useEffect(() => {
    let stopTimeout = null

    const handleMove = (e) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }
      lastMoveRef.current = Date.now()
      isCursorMovingRef.current = true

      if (stopTimeout) clearTimeout(stopTimeout)
      stopTimeout = setTimeout(() => {
        isCursorMovingRef.current = false
        followStartTimeRef.current = 0
      }, 70)

      if (showFakeCursor) {
        cancelHijack()
      }
    }

    const handleKey = () => {
      lastMoveRef.current = Date.now()
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('keydown', handleKey, { passive: true })
    return () => {
      if (stopTimeout) clearTimeout(stopTimeout)
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('keydown', handleKey)
    }
  }, [showFakeCursor])

  // ── CURSOR FOLLOWING ENGINE ───────────────────────────────────
  useEffect(() => {
    const SAFE_PX = 22 // 0.5 cm offset
    const LERP = 0.12

    const tick = () => {
      if (isMobile) return // Never follow cursor on mobile

      if (modeRef.current === 'home' && followAllowedRef.current && !isBusyRef.current) {
        const cursor = cursorRef.current
        const current = posRef.current
        const isMoving = isCursorMovingRef.current

        // Navbar boundary check
        const isNearNavbar = cursor.y < 100
        const effectiveCursorY = isNearNavbar ? 150 : cursor.y

        const offsetDirection = cursor.x > current.x ? -SAFE_PX : SAFE_PX
        const targetX = cursor.x + offsetDirection
        const targetY = Math.max(120, effectiveCursorY - 45)

        const distX = targetX - current.x
        const distY = targetY - current.y
        const totalDist = Math.hypot(distX, distY)

        if (isMoving && !isNearNavbar && totalDist > 8) {
          if (!followStartTimeRef.current) {
            followStartTimeRef.current = Date.now()
          } else if (Date.now() - followStartTimeRef.current > 5000) {
            triggerFollowBreak()
            rafRef.current = requestAnimationFrame(tick)
            return
          }

          const stepX = distX * LERP
          const stepY = distY * LERP

          const nx = current.x + stepX
          const ny = Math.max(120, current.y + stepY)
          updatePos({ x: nx, y: ny })

          if (Math.abs(distX) > 4) {
            updateFacing(cursor.x > nx ? 'right' : 'left')
          }
          updateDwarfState('run')
        } else {
          followStartTimeRef.current = 0
          updateDwarfState('idle')
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isMobile])

  // ── Rule 3: Check Idle >= 2.0s ────────────────────────────────
  useEffect(() => {
    if (isMobile) return
    idleTimerRef.current = setInterval(() => {
      if (!followAllowedRef.current || modeRef.current !== 'home' || isBusyRef.current || hijackDoneRef.current) return
      const idleTime = Date.now() - lastMoveRef.current
      if (idleTime >= 2000) {
        startIdleHijack()
      }
    }, 300)
    return () => clearInterval(idleTimerRef.current)
  }, [isMobile])

  // ── Random Autonomous Wander (every 18-30s when idle on Home) ─
  useEffect(() => {
    if (isMobile) return
    let timeout
    const scheduleNext = () => {
      const delay = 18000 + Math.random() * 12000
      timeout = setTimeout(() => {
        if (modeRef.current === 'home' && followAllowedRef.current && !isBusyRef.current && Date.now() - lastMoveRef.current > 6000) {
          if (Math.random() < 0.5) goToDesk()
          else goStalk()
        }
        scheduleNext()
      }, delay)
    }
    scheduleNext()
    return () => clearTimeout(timeout)
  }, [isMobile])

  // ── Keep Corner Position on Window Resize ────────────────────
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setIsMobile(mobile)
      if (modeRef.current === 'corner' || mobile) {
        updatePos({ x: mobile ? 42 : 64, y: window.innerHeight - (mobile ? 50 : 80) })
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isCorner = mode === 'corner' || mode === 'corner_rising' || isMobile
  const scale = isMobile ? 0.52 : isCorner ? 0.78 : 1.0
  const isOffscreen = !isMobile && pos.y > window.innerHeight + 120

  return (
    <>
      {/* ── VEON Dwarf Entity (Hidden on interactive page because VEON is sitting at his dev workstation) ── */}
      {!isInteractive && !isOffscreen && (
        <div
          onMouseDown={handlePointerDown}
          onTouchStart={handlePointerDown}
          title="Drag & Drop VEON anywhere, or click to Chat!"
          style={{
            position: 'fixed',
            left: `${pos.x - 60 * scale}px`,
            top: `${pos.y - 70 * scale}px`,
            zIndex: 9990,
            pointerEvents: 'auto',
            cursor: isUserDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'none',
            transform: isUserDragging ? 'scale(1.1) rotate(-4deg)' : 'none',
            willChange: 'transform, left, top',
            filter: isUserDragging
              ? 'drop-shadow(0 16px 28px rgba(255, 87, 51, 0.45))'
              : isCorner
              ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.15))'
              : 'drop-shadow(0 12px 24px rgba(0,0,0,0.22))',
            transition: isUserDragging ? 'none' : isCorner ? 'all 0.3s ease-out' : 'none',
          }}
        >
          {/* Speech Dialogue Bubble (Clickable) */}
          {dialogue && (
            <div
              style={{
                position: 'absolute',
                top: '-48px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(15, 23, 42, 0.94)',
                backdropFilter: 'blur(8px)',
                color: '#F8FAFC',
                border: '1px solid rgba(255, 87, 51, 0.4)',
                padding: '6px 14px',
                borderRadius: '16px',
                fontSize: '11px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                animation: 'popIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                zIndex: 100,
              }}
            >
              {dialogue}
            </div>
          )}

          {/* Character Vector SVG */}
          <DwarfCharacter
            state={dwarfState}
            mousePos={cursorRef.current}
            dwarfPos={pos}
            facing={facing}
            scale={scale}
          />

          {/* Interactive Chat Badge */}
          {!dialogue && (
            <div
              style={{
                position: 'absolute',
                top: '-26px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #FF5733, #E11D48)',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '2px 9px',
                borderRadius: '12px',
                fontSize: '9.5px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                letterSpacing: '0.5px',
                boxShadow: '0 2px 8px rgba(255, 87, 51, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>💬</span>
              <span>CHAT WITH VEON</span>
            </div>
          )}
        </div>
      )}

      {/* ── Hijacked Ghost Cursor ────────────── */}
      {showFakeCursor && (
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
          {dwarfState === 'drag' && (
            <div
              style={{
                position: 'absolute',
                top: '-32px',
                left: '18px',
                background: 'linear-gradient(135deg, #FF5733, #E11D48)',
                color: '#FFF',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 14px rgba(255, 87, 51, 0.5)',
              }}
            >
              🚀 GUIDING TO STRATEGY CALL
            </div>
          )}
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ filter: 'drop-shadow(1px 2px 5px rgba(0,0,0,0.6))' }}>
            {dwarfState === 'drag' && (
              <circle cx="6" cy="6" r="14" fill="none" stroke="#FF5733" strokeWidth="2.5" opacity="0.85">
                <animate attributeName="r" values="8;18;8" dur="0.75s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.9;0.1;0.9" dur="0.75s" repeatCount="indefinite" />
              </circle>
            )}
            <path
              d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <circle cx="5" cy="5" r="3.5" fill="#FF5733" opacity="0.95" />
          </svg>
        </div>
      )}

      {/* ── Energy Tether Line ────────────────── */}
      {dwarfState === 'drag' && showFakeCursor && (
        <svg
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none',
            zIndex: 9988,
            overflow: 'visible',
          }}
        >
          <line
            x1={pos.x}
            y1={pos.y}
            x2={cursorPos.x}
            y2={cursorPos.y}
            stroke="#FF5733"
            strokeWidth="3.5"
            strokeDasharray="6 4"
            opacity="0.8"
          />
        </svg>
      )}
    </>
  )
}
