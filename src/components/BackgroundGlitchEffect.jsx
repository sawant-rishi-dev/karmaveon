import React, { useEffect, useRef } from 'react'

const CODE_SNIPPETS = [
  '<Karmaveon />',
  'esp32.boot(CLOCK_240MHZ)',
  'n8n.workflow.trigger()',
  'git push origin main',
  '200 OK -> /api/v2/orders',
  'pgvector.cosine_dist(0.014)',
  'SQLite.wal_sync("local_first")',
  'RTX_4090.cuda.alloc(48GB)',
  'React19.use(serverAction)',
  'ws://kds.gateway/orders',
  '1-Tap UPI Settlement',
  '₹42,580 Live Revenue',
  'Table #04 Order Active',
  'Next.js 15 App Router',
  'ST7789.drawTFT(240, 240)',
  '0x4F92A_CHIP_CONNECT',
  'async function deploy()',
  'vl53l0x.getDistance(382mm)',
  'mqtt.publish("telemetry/live")',
  'Bcrypt.hash(salt, 12)',
  '01011010 11001001',
  'POST /orders/dispatch -> 200',
  'kds.dispatch({ table: "T-04" })',
  'expo.camera.scanBarcode()',
]

const COLORS = ['#2563eb', '#ff5733', '#059669', '#7c3aed', '#0284c7', '#d97706']

/**
 * BackgroundGlitchEffect — Ultra-Smooth Global Full-Page Ambient Code Stream
 * Runs across the entire viewport on all pages with sub-pixel delta smoothing,
 * High-DPI canvas scaling, and graceful character typing.
 */
export default function BackgroundGlitchEffect({ isPaused = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || isPaused) return
    const ctx = canvas.getContext('2d', { alpha: true })

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = window.innerWidth
    let height = window.innerHeight

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const fontSize = 11.5
    const columnSpacing = 54
    const columnCount = Math.floor(width / columnSpacing) + 1

    const drops = Array.from({ length: columnCount }, (_, i) => ({
      x: i * columnSpacing + 14,
      y: Math.random() * (height + 200) - 200,
      speed: Math.random() * 0.38 + 0.28, // Smooth, relaxing drift speed
      snippetIndex: Math.floor(Math.random() * CODE_SNIPPETS.length),
      charLength: Math.floor(Math.random() * 8) + 1,
      color: COLORS[i % COLORS.length],
      opacity: Math.random() * 0.08 + 0.11, // Soft, non-intrusive 11-19% opacity
    }))

    let animId
    let lastTime = performance.now()

    const render = (now) => {
      animId = requestAnimationFrame(render)
      const delta = Math.min((now - lastTime) / 16.67, 2.0)
      lastTime = now

      ctx.clearRect(0, 0, width, height)

      ctx.font = `${fontSize}px 'Courier New', monospace`
      ctx.fontWeight = '700'

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]
        const snippet = CODE_SNIPPETS[drop.snippetIndex]

        // Smooth character typing increment
        drop.charLength += 0.1 * delta
        const visibleCount = Math.floor(drop.charLength)
        const text = snippet.slice(0, Math.min(snippet.length, visibleCount))

        ctx.fillStyle = drop.color
        ctx.globalAlpha = drop.opacity
        ctx.fillText(text, drop.x, drop.y)

        drop.y += drop.speed * delta

        // Loop smoothly when drop moves beyond screen
        if (drop.y > height + 30) {
          drop.y = Math.random() * -120 - 20
          drop.snippetIndex = (drop.snippetIndex + 1) % CODE_SNIPPETS.length
          drop.charLength = 1
          drop.color = COLORS[Math.floor(Math.random() * COLORS.length)]
          drop.opacity = Math.random() * 0.08 + 0.11
        }
      }

      ctx.globalAlpha = 1.0
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [isPaused])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: isPaused ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    />
  )
}
