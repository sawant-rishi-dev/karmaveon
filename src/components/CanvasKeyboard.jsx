import React, { useEffect, useRef } from 'react'
import { REAL_KEYBOARD_LAYOUT } from '../data/keyboardLayout'

// ── Colour helpers ────────────────────────────────────────────────
const TOTAL_U = 18.5

/** Rainbow hue: t=0 (left=pink 300°) → t=1 (right=yellow 60°) */
function rainbowAt(t) {
  const hue = (300 - t * 240 + 360) % 360
  const s = 1, l = 0.54
  const a = s * Math.min(l, 1 - l)
  const f = n => {
    const k = (n + hue / 30) % 12
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))))
  }
  return { r: f(0), g: f(8), b: f(4) }
}

/** '#rrggbb' → {r,g,b} */
function hex2rgb(hex = '#ff00ff') {
  const h = hex.replace('#', '')
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }
}

/** Rounded rect path (cross-browser) */
function rr(ctx, x, y, w, h, r) {
  if (w <= 0 || h <= 0) return
  r = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

// ── Layout builder ─────────────────────────────────────────────────
function buildLayout(cw, ch) {
  const PAD = cw * 0.008
  const kbW = cw - PAD * 2
  const STEP = kbW / TOTAL_U       // pixels per 1U

  // 3-D split: each row-slot divided into top-face + front-wall + tiny row-gap
  const FRONT = Math.round(STEP * 0.20)    // front wall height  (3-D depth)
  const GAP_R = Math.round(STEP * 0.05)    // row gap (above next row's front-wall)
  const GAP_C = Math.round(STEP * 0.07)    // column gap (between keys horizontally)
  const TOP_H = STEP - FRONT - GAP_R       // top-face height

  const ROW_COUNT = 6
  const totalH = ROW_COUNT * STEP
  const kbX = PAD
  const kbY = Math.round((ch - totalH) * 0.44)

  const keys = []

  REAL_KEYBOARD_LAYOUT.forEach(({ row, keys: rowKeys }) => {
    let curX = kbX
    const y = kbY + row * STEP          // top of this row slot

    rowKeys.forEach(k => {
      if (!k.code) { curX += (k.gap || 0) * STEP; return }

      const kW = Math.round(k.w * STEP) - GAP_C
      const xC = curX + kW / 2
      const t = Math.max(0, Math.min(1, (xC - kbX) / kbW))
      const col = rainbowAt(t)

      keys.push({
        code: k.code, label: (k.label || '').trim(),
        x: Math.round(curX), y: Math.round(y),
        w: kW,
        topH: TOP_H,        // top-face height
        frontH: FRONT,      // front-wall height
        col,
        pressY: 0, targetPressY: 0,
      })
      curX += k.w * STEP
    })
  })

  return { keys, kbX, kbY, kbW, totalH, STEP, GAP_C, TOP_H, FRONT }
}

// ── Draw a single 3-D keycap ───────────────────────────────────────
function drawKey(ctx, key, litData) {
  const { x, y, w, topH, frontH, col, pressY, label } = key
  const dy = y + pressY
  const r = Math.max(3, Math.min(8, topH * 0.13))
  const lit = !!litData
  const gCol = litData ? hex2rgb(litData.color) : col
  const gHex = `rgb(${gCol.r},${gCol.g},${gCol.b})`

  // ─────────────────────────────────────────────────────────────
  //  1.  FRONT WALL  (the 3-D keycap depth face)
  //      sits below the top face — visible because of CSS rotateX
  // ─────────────────────────────────────────────────────────────
  const wallY = dy + topH            // y where front wall starts
  const wallH = frontH + 2          // +2 fills the tiny row gap

  // Dark base of wall
  ctx.fillStyle = '#0a0a18'
  ctx.fillRect(x + r, wallY, w - r * 2, wallH)

  // Coloured LED light bleeding through the front wall (bottom of key)
  const wallGrad = ctx.createLinearGradient(x, wallY, x, wallY + wallH)
  wallGrad.addColorStop(0, `rgba(${gCol.r},${gCol.g},${gCol.b},${lit ? 0.90 : 0.50})`)
  wallGrad.addColorStop(0.6, `rgba(${gCol.r},${gCol.g},${gCol.b},${lit ? 0.30 : 0.12})`)
  wallGrad.addColorStop(1, 'transparent')
  ctx.fillStyle = wallGrad
  ctx.fillRect(x + r, wallY, w - r * 2, wallH)

  // Thin bright seam at top of wall (edge where top-face meets wall)
  ctx.strokeStyle = `rgba(${gCol.r},${gCol.g},${gCol.b},${lit ? 0.95 : 0.35})`
  ctx.lineWidth = lit ? 1.5 : 0.8
  ctx.beginPath()
  ctx.moveTo(x + r, wallY)
  ctx.lineTo(x + w - r, wallY)
  ctx.stroke()

  // ─────────────────────────────────────────────────────────────
  //  2.  KEY TOP FACE
  // ─────────────────────────────────────────────────────────────

  // Glow / outer shadow — only for lit keys (expensive, keep batched)
  if (lit) {
    ctx.save()
    ctx.shadowColor = gHex
    ctx.shadowBlur = 24
    ctx.fillStyle = 'transparent'
    rr(ctx, x, dy, w, topH + r, r)
    ctx.fill()
    ctx.restore()
  }

  // Body fill
  ctx.fillStyle = lit ? `rgba(${gCol.r * 0.15},${gCol.g * 0.15},${gCol.b * 0.15},0.95)` : '#181825'
  rr(ctx, x, dy, w, topH + r, r)   // +r: overlaps into wall seam for clean join
  ctx.fill()

  // Bottom LED underglow strip on top face
  const ledStrip = ctx.createLinearGradient(x, dy + topH * 0.45, x, dy + topH + r)
  ledStrip.addColorStop(0, 'transparent')
  ledStrip.addColorStop(1, `rgba(${gCol.r},${gCol.g},${gCol.b},${lit ? 0.95 : 0.50})`)
  ctx.fillStyle = ledStrip
  rr(ctx, x, dy, w, topH + r, r)
  ctx.fill()

  // Halo around lit key
  if (lit) {
    const halo = ctx.createRadialGradient(x + w / 2, dy + topH, 0, x + w / 2, dy + topH, w * 0.9)
    halo.addColorStop(0, `rgba(${gCol.r},${gCol.g},${gCol.b},0.40)`)
    halo.addColorStop(1, 'transparent')
    ctx.fillStyle = halo
    ctx.fillRect(x - w * 0.5, dy + topH * 0.2, w * 2, topH * 1.5)
  }

  // Top surface highlight (subtle gloss)
  const gloss = ctx.createLinearGradient(x, dy, x, dy + topH * 0.4)
  gloss.addColorStop(0, 'rgba(255,255,255,0.08)')
  gloss.addColorStop(1, 'transparent')
  ctx.fillStyle = gloss
  rr(ctx, x + 1, dy + 1, w - 2, topH - 2, r - 1)
  ctx.fill()

  // Outer border
  if (lit) {
    ctx.save()
    ctx.shadowColor = gHex
    ctx.shadowBlur = 12
    ctx.strokeStyle = gHex
    ctx.lineWidth = 1.3
    rr(ctx, x, dy, w, topH + r, r)
    ctx.stroke()
    ctx.restore()
  } else {
    ctx.strokeStyle = `rgba(${gCol.r},${gCol.g},${gCol.b},0.20)`
    ctx.lineWidth = 0.7
    rr(ctx, x, dy, w, topH + r, r)
    ctx.stroke()
  }

  // ─────────────────────────────────────────────────────────────
  //  3.  KEY LABEL
  // ─────────────────────────────────────────────────────────────
  if (label) {
    const fs = Math.max(6, Math.min(11, topH * 0.30))
    ctx.save()
    if (lit) { ctx.shadowColor = gHex; ctx.shadowBlur = 9 }
    ctx.fillStyle = lit ? '#ffffff' : `rgba(${gCol.r},${gCol.g},${gCol.b},0.72)`
    ctx.font = `bold ${fs}px Inter,"Segoe UI",sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(label, x + w / 2, dy + topH * 0.5, w - 6)
    ctx.restore()
  }
}

// ── Component ──────────────────────────────────────────────────────
export default function CanvasKeyboard({ litKeys }) {
  const canvasRef = useRef(null)
  const litRef = useRef(litKeys)
  const layoutRef = useRef(null)

  useEffect(() => { litRef.current = litKeys }, [litKeys])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      layoutRef.current = buildLayout(canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    let animId
    const tick = () => {
      animId = requestAnimationFrame(tick)
      const layout = layoutRef.current
      if (!layout) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Spring key travel
      layout.keys.forEach(k => {
        k.pressY += (k.targetPressY - k.pressY) * 0.22
      })

      // Keyboard body plate (dark slab behind all keys)
      const { kbX, kbY, kbW, totalH, STEP } = layout
      const pad = STEP * 0.30
      ctx.fillStyle = 'rgba(5, 5, 18, 0.92)'
      rr(ctx, kbX - pad, kbY - pad * 0.3, kbW + pad * 2, totalH + pad * 0.9, 14)
      ctx.fill()

      // Inset bevel on plate
      ctx.strokeStyle = 'rgba(0,80,200,0.15)'
      ctx.lineWidth = 1
      rr(ctx, kbX - pad + 3, kbY - pad * 0.3 + 3, kbW + pad * 2 - 6, totalH + pad * 0.9 - 6, 12)
      ctx.stroke()

      const lit = litRef.current

      // ① Idle keys — no expensive shadow
      layout.keys.forEach(k => { if (!lit[k.code]) drawKey(ctx, k, null) })

      // ② Lit keys on top — with glow
      layout.keys.forEach(k => {
        const ld = lit[k.code]
        if (ld) drawKey(ctx, k, ld)
      })
    }

    animId = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  // Sync litKeys → key-travel spring
  useEffect(() => {
    const layout = layoutRef.current
    if (!layout) return
    layout.keys.forEach(k => { k.targetPressY = litKeys[k.code] ? 3 : 0 })
  }, [litKeys])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, display: 'block' }} />
}
