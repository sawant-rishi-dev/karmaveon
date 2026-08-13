import React, { useEffect, useRef } from 'react'

// ── Constants for Keyboard Layout ─────────────────────────────────
const SHRINK = 0.12    // keycap top bevel shrink factor
const PITCH_MULT = 1.45    // Grid pitch distance multiplier between key centers (increases distance without increasing height!)
const ISO_RATIO = 0.52   // tileH / tileW (iso perspective ratio)
const KEY_RATIO = 0.35   // keyHeight / tileW

// Key code pool for keyboard events & shortcuts
const KEY_CODES_POOL = [
  'Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
  'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
  'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash',
  'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
  'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ShiftRight',
  'ControlLeft', 'AltLeft', 'Space', 'AltRight', 'ControlRight'
]

// Ultra-saturated Cyber RGB Glitch Color Palette
const CYBER_GLITCH_PALETTE = [
  { r: 0, g: 255, b: 255, hex: '#00ffff' }, // Cyber Cyan
  { r: 255, g: 0, b: 255, hex: '#ff00ff' }, // Electric Magenta
  { r: 128, g: 0, b: 255, hex: '#8000ff' }, // Neon Purple
  { r: 0, g: 255, b: 102, hex: '#00ff66' }, // Matrix Green
  { r: 255, g: 0, b: 85, hex: '#ff0055' }, // Crimson Red
  { r: 255, g: 85, b: 0, hex: '#ff5500' }, // Sunset Orange
  { r: 255, g: 230, b: 0, hex: '#ffe600' }, // Acid Yellow
  { r: 0, g: 153, b: 255, hex: '#0099ff' }, // Deep Electric Blue
]

/** Rainbow color generator based on grid position */
function rainbowAt(t) {
  const hue = (300 - t * 260 + 360) % 360
  const s = 1, l = 0.65
  const a = s * Math.min(l, 1 - l)
  const f = n => {
    const k = (n + hue / 30) % 12
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))))
  }
  return { r: f(0), g: f(8), b: f(4) }
}

function hex2rgb(hex = '#8800ff') {
  const h = hex.replace('#', '')
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }
}

// ── Projection Engine (3X Scale Keyboard with Increased Pitch Distance) ──
function makeProjection(cw, ch) {
  // 3X Scale Keycaps (Sleek 180px to 280px width)
  const tileW = Math.max(180, Math.min(280, cw / 5.2))
  const tileH = tileW * ISO_RATIO
  const keyH = tileW * KEY_RATIO // Height remains constant & proportional to key size, NOT pitch!

  // Grid pitch distance between key centers (45% wider pitch distance!)
  const pitchW = tileW * PITCH_MULT
  const pitchH = tileH * PITCH_MULT
  const unitW = 1.0 / PITCH_MULT // Keycap width relative to 1 pitch step

  const ox = cw / 2
  const oy = ch * 0.45

  const P = (col, row, z) => ({
    x: ox + (col + row) * pitchW / 2,
    y: oy + (row - col) * pitchH / 2 - z * keyH,
  })

  return { P, tileW, tileH, keyH, unitW }
}

// ── Grid Builder (3X Full-Screen Blanket Grid) ────────────────────
function buildLayout(cw, ch) {
  const { P, tileW, tileH, keyH, unitW } = makeProjection(cw, ch)

  // Expanded bounds to blanket 100% full screen with wider key pitch
  const colMin = -8
  const colMax = 10
  const rowMin = -6
  const rowMax = 8

  const keys = []
  let codeIdx = 0

  for (let r = rowMin; r <= rowMax; r++) {
    for (let c = colMin; c <= colMax; c++) {
      const code = KEY_CODES_POOL[codeIdx % KEY_CODES_POOL.length]
      const t = Math.max(0, Math.min(1, (c - colMin) / (colMax - colMin)))
      codeIdx++

      keys.push({
        code,
        uniqueId: `${r}_${c}`,
        row: r,
        col: c,
        w: unitW,
        rgb: rainbowAt(t),
        pressZ: 1.0,
        targetPressZ: 1.0,
      })
    }
  }

  return { keys, P, tileW, tileH, keyH, colMin, colMax, rowMin, rowMax }
}

// ── Frustum Corners Helper ───────────────────────────────────────
function corners(P, col, row, w, z) {
  const s = SHRINK * w
  return {
    bTL: P(col, row, 0),
    bTR: P(col + w, row, 0),
    bBR: P(col + w, row + w, 0),
    bBL: P(col, row + w, 0),
    tTL: P(col + s, row + s, z),
    tTR: P(col + w - s, row + s, z),
    tBR: P(col + w - s, row + w - s, z),
    tBL: P(col + s, row + w - s, z),
  }
}

// ── Draw Frustum Edge Path ───────────────────────────────────────
function buildEdgePath(ctx, c, dx = 0, dy = 0) {
  const { bTL, bTR, bBR, bBL, tTL, tTR, tBR, tBL } = c
  ctx.beginPath()
  // Top face
  ctx.moveTo(tTL.x + dx, tTL.y + dy); ctx.lineTo(tTR.x + dx, tTR.y + dy)
  ctx.moveTo(tTR.x + dx, tTR.y + dy); ctx.lineTo(tBR.x + dx, tBR.y + dy)
  ctx.moveTo(tBR.x + dx, tBR.y + dy); ctx.lineTo(tBL.x + dx, tBL.y + dy)
  ctx.moveTo(tBL.x + dx, tBL.y + dy); ctx.lineTo(tTL.x + dx, tTL.y + dy)
  // Vertical side edges
  ctx.moveTo(bTL.x + dx, bTL.y + dy); ctx.lineTo(tTL.x + dx, tTL.y + dy)
  ctx.moveTo(bTR.x + dx, bTR.y + dy); ctx.lineTo(tTR.x + dx, tTR.y + dy)
  ctx.moveTo(bBR.x + dx, bBR.y + dy); ctx.lineTo(tBR.x + dx, tBR.y + dy)
  ctx.moveTo(bBL.x + dx, bBL.y + dy); ctx.lineTo(tBL.x + dx, tBL.y + dy)
}

// ── Draw Full-Screen Base Plate Grid ──────────────────────────────
function drawPlate(ctx, P, colMin, colMax, rowMin, rowMax) {
  const c0 = P(colMin - 2, rowMin - 2, 0)
  const c1 = P(colMax + 2, rowMin - 2, 0)
  const c2 = P(colMax + 2, rowMax + 2, 0)
  const c3 = P(colMin - 2, rowMax + 2, 0)

  ctx.save()
  // Dark plate fill
  ctx.fillStyle = 'rgba(4, 2, 14, 0.94)'
  ctx.beginPath()
  ctx.moveTo(c0.x, c0.y); ctx.lineTo(c1.x, c1.y)
  ctx.lineTo(c2.x, c2.y); ctx.lineTo(c3.x, c3.y)
  ctx.closePath()
  ctx.fill()

  // Circuit grid lines
  ctx.strokeStyle = 'rgba(110, 50, 200, 0.32)'
  ctx.shadowColor = '#7733cc'
  ctx.shadowBlur = 12
  ctx.lineWidth = 2.0

  for (let r = rowMin; r <= rowMax; r += 2) {
    const a = P(colMin, r, 0), b = P(colMax, r, 0)
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
  }
  for (let c = colMin; c <= colMax; c += 2) {
    const a = P(c, rowMin, 0), b = P(c, rowMax, 0)
    ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
  }
  ctx.restore()
}

// ── Component (Isometric Cyber RGB Glitch Keyboard) ─────────────
export default function IsometricKeyboard({ litKeys }) {
  const canvasRef = useRef(null)
  const litRef = useRef(litKeys)
  const stateRef = useRef({ layout: null })
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const glitchRef = useRef({}) // Active glitch states keyed by uniqueId

  useEffect(() => { litRef.current = litKeys }, [litKeys])

  // Track global mouse position for interactive key hover
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })

    let dpr = 1
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.imageSmoothingEnabled = true
      stateRef.current.layout = buildLayout(window.innerWidth, window.innerHeight)
    }
    resize()
    window.addEventListener('resize', resize)

    let animId
    let lastWaveTime = performance.now()

    const tick = (now) => {
      animId = requestAnimationFrame(tick)
      const { layout } = stateRef.current
      if (!layout) return
      const { keys, P, tileW, colMin, colMax, rowMin, rowMax } = layout
      const lit = litRef.current
      const mouse = mouseRef.current
      const glitches = glitchRef.current

      // Scale canvas context for Crisp High-DPI (Retina) display
      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // ── Cyber RGB Glitch Engine ─────────────────────────────────
      // 1. Spontaneous random key glitch flickers (approx every 6-12 frames)
      if (Math.random() < 0.12 && keys.length > 0) {
        const numToGlitch = Math.random() < 0.3 ? 2 : 1
        for (let i = 0; i < numToGlitch; i++) {
          const randKey = keys[Math.floor(Math.random() * keys.length)]
          const colorObj = CYBER_GLITCH_PALETTE[Math.floor(Math.random() * CYBER_GLITCH_PALETTE.length)]
          glitches[randKey.uniqueId] = {
            color: colorObj,
            expiresAt: now + Math.random() * 250 + 150, // 150ms - 400ms duration
            intensity: Math.random() * 0.5 + 0.5,
            targetZ: Math.random() * 0.4 + 0.3, // Z press displacement
            chromatic: Math.random() < 0.45,    // Chromatic aberration shift
          }
        }
      }

      // 2. Periodic Cyber Wave Glitch Sweep across diagonal rows (every 7 seconds)
      if (now - lastWaveTime > 7000) {
        lastWaveTime = now
        const waveColor = CYBER_GLITCH_PALETTE[Math.floor(Math.random() * CYBER_GLITCH_PALETTE.length)]
        keys.forEach(k => {
          const diagIndex = k.row + k.col
          const delay = (diagIndex + 6) * 70
          setTimeout(() => {
            if (glitchRef.current) {
              glitchRef.current[k.uniqueId] = {
                color: waveColor,
                expiresAt: performance.now() + 350,
                intensity: 0.95,
                targetZ: 0.4,
                chromatic: true,
              }
            }
          }, delay)
        })
      }

      // Clean expired glitches & apply Z targets
      Object.keys(glitches).forEach(id => {
        if (now > glitches[id].expiresAt) {
          delete glitches[id]
        }
      })

      // Mouse Hover Distance Math
      const hoveredMap = {}
      const rippleMap = {}

      const directRadiusSq = (tileW * 0.55) ** 2
      const rippleRadiusSq = (tileW * 1.5) ** 2
      const directRadius = tileW * 0.55
      const rippleRadius = tileW * 1.5

      keys.forEach(k => {
        const glitch = glitches[k.uniqueId]
        const c = corners(P, k.col, k.row, k.w, k.pressZ)
        const cx = (c.tTL.x + c.tTR.x + c.tBR.x + c.tBL.x) * 0.25
        const cy = (c.tTL.y + c.tTR.y + c.tBR.y + c.tBL.y) * 0.25

        const dx = mouse.x - cx
        const dy = mouse.y - cy
        const distSq = dx * dx + dy * dy

        if (distSq < directRadiusSq) {
          hoveredMap[k.uniqueId] = { color: '#00ffff' }
          k.targetPressZ = 0.45
        } else if (distSq < rippleRadiusSq) {
          const dist = Math.sqrt(distSq)
          const factor = 1 - (dist - directRadius) / (rippleRadius - directRadius)
          rippleMap[k.uniqueId] = { color: '#8000ff', factor }
          if (!lit[k.code] && !glitch) {
            k.targetPressZ = 1.0 - factor * 0.25
          }
        } else if (glitch) {
          k.targetPressZ = glitch.targetZ + (Math.random() - 0.5) * 0.12 // Glitch jitter
        } else if (!lit[k.code]) {
          k.targetPressZ = 1.0
        }
      })

      // Physics interpolation
      keys.forEach(k => { k.pressZ += (k.targetPressZ - k.pressZ) * 0.24 })

      // 1. Base Plate
      drawPlate(ctx, P, colMin, colMax, rowMin, rowMax)

      // 2. Idle & Glitching Wireframe Keys
      keys.forEach(k => {
        const isLit = lit[k.code]
        const isHovered = hoveredMap[k.uniqueId]
        const glitch = glitches[k.uniqueId]

        if (isLit || isHovered) return // Drawn in glowing pass

        const { rgb, col, row, w, pressZ } = k
        const c = corners(P, col, row, w, pressZ)
        const ripple = rippleMap[k.uniqueId]

        if (glitch) {
          // ── Cyber Glitch Key Render ──
          const { r, g, b, hex } = glitch.color

          // Glitch body fill
          ctx.save()
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.25 + glitch.intensity * 0.45})`
          ctx.shadowColor = hex
          ctx.shadowBlur = 35 * glitch.intensity
          ctx.beginPath()
          ctx.moveTo(c.tTL.x, c.tTL.y); ctx.lineTo(c.tTR.x, c.tTR.y)
          ctx.lineTo(c.tBR.x, c.tBR.y); ctx.lineTo(c.tBL.x, c.tBL.y)
          ctx.closePath()
          ctx.fill()
          ctx.restore()

          // Chromatic Aberration Dual Edge Strokes
          if (glitch.chromatic) {
            // Red Offset Stroke
            ctx.save()
            ctx.strokeStyle = `rgba(255, 0, 80, 0.85)`
            ctx.lineWidth = 3.5
            buildEdgePath(ctx, c, -3, 1)
            ctx.stroke()
            ctx.restore()

            // Cyan Offset Stroke
            ctx.save()
            ctx.strokeStyle = `rgba(0, 255, 255, 0.85)`
            ctx.lineWidth = 3.5
            buildEdgePath(ctx, c, 3, -1)
            ctx.stroke()
            ctx.restore()
          }

          // Main Glitch Edge Outline
          ctx.save()
          ctx.strokeStyle = hex
          ctx.shadowColor = hex
          ctx.shadowBlur = 25
          ctx.lineWidth = 4.5
          buildEdgePath(ctx, c)
          ctx.stroke()
          ctx.restore()

        } else {
          // Standard Idle Key Render
          ctx.fillStyle = ripple
            ? `rgba(128, 0, 255, ${0.18 + ripple.factor * 0.35})`
            : `rgba(${rgb.r * 0.05},${rgb.g * 0.05},${rgb.b * 0.10},0.60)`

          ctx.beginPath()
          ctx.moveTo(c.tTL.x, c.tTL.y); ctx.lineTo(c.tTR.x, c.tTR.y)
          ctx.lineTo(c.tBR.x, c.tBR.y); ctx.lineTo(c.tBL.x, c.tBL.y)
          ctx.closePath()
          ctx.fill()

          ctx.strokeStyle = ripple
            ? `rgba(0, 255, 255, ${0.5 + ripple.factor * 0.5})`
            : `rgba(${rgb.r},${rgb.g},${rgb.b},0.55)`
          ctx.lineWidth = ripple ? 5.0 : 3.8
          buildEdgePath(ctx, c)
          ctx.stroke()
        }
      })

      // 3. Glowing Lit & Hovered Keys (High Intensity Neon Glow)
      keys.forEach(k => {
        const ld = lit[k.code] || hoveredMap[k.uniqueId]
        if (!ld) return
        const { r, g, b } = hex2rgb(ld.color)
        const rgb = `rgb(${r},${g},${b})`
        const c = corners(P, k.col, k.row, k.w, k.pressZ)

        ctx.save()
        ctx.fillStyle = `rgba(${r},${g},${b},0.55)`
        ctx.shadowColor = rgb
        ctx.shadowBlur = 80
        ctx.beginPath()
        ctx.moveTo(c.tTL.x, c.tTL.y); ctx.lineTo(c.tTR.x, c.tTR.y)
        ctx.lineTo(c.tBR.x, c.tBR.y); ctx.lineTo(c.tBL.x, c.tBL.y)
        ctx.closePath()
        ctx.fill()
        ctx.restore()

        ctx.save()
        ctx.strokeStyle = rgb
        ctx.shadowColor = rgb
        ctx.shadowBlur = 70
        ctx.lineWidth = 14.0
        ctx.globalAlpha = 0.85
        buildEdgePath(ctx, c)
        ctx.stroke()
        ctx.restore()

        ctx.save()
        ctx.strokeStyle = rgb
        ctx.shadowColor = rgb
        ctx.shadowBlur = 25
        ctx.lineWidth = 5.5
        ctx.globalAlpha = 1.0
        buildEdgePath(ctx, c)
        ctx.stroke()
        ctx.restore()
      })

      ctx.restore() // Restore dpr scaling
    }

    animId = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  // Sync lit state → key press animation
  useEffect(() => {
    const { layout } = stateRef.current
    if (!layout) return
    layout.keys.forEach(k => {
      if (litKeys[k.code]) k.targetPressZ = 0.55
    })
  }, [litKeys])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, display: 'block', width: '100vw', height: '100vh' }}
    />
  )
}
