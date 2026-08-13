import React, { useEffect, useRef } from 'react'

const CODE_SNIPPETS = [
  '01011010',
  '<Karmaveon />',
  'npm run dev',
  'git push origin main',
  'n8n.trigger()',
  'const pappu = true',
  'function build()',
  '200 OK',
  'ERR_PAGE_FALLING_DOWN',
  'Pappu.codeOverdrive()',
  'React.useMemo()',
  'CRITICAL_LAYOUT_COLLAPSE',
  '{ status: "BROKEN" }',
  '<div id="app">FALLING</div>',
  'System.crash()',
  '0x4F92A_DOM_DROP',
  '<body>FALLING</body>',
  '404_PAGE_DISMANTLED',
]

const COLORS = ['#FF5733', '#2563eb', '#7c3aed', '#db2777', '#10b981']

export default function BackgroundGlitchEffect({ isGlitching = false, isPaused = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || isPaused) return
    const ctx = canvas.getContext('2d')

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Columns for falling code
    const fontSize = 13
    const columns = Math.floor(width / 36)
    const drops = Array.from({ length: columns }, () => ({
      y: Math.random() * -120,
      speed: Math.random() * 0.25 + 0.15, // Ultra-slow, smooth flow!
      snippetIndex: Math.floor(Math.random() * CODE_SNIPPETS.length),
      charLength: 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: Math.random() * 0.3 + 0.12,
    }))

    let animId
    const render = () => {
      animId = requestAnimationFrame(render)

      // Soft clear with slight fade trail for ultra-smooth rendering
      ctx.fillStyle = isGlitching ? 'rgba(253, 251, 247, 0.18)' : 'rgba(253, 251, 247, 0.32)'
      ctx.fillRect(0, 0, width, height)

      ctx.font = `${fontSize}px 'Courier New', monospace`
      ctx.fontWeight = 'bold'

      drops.forEach((drop, i) => {
        const fullSnippet = CODE_SNIPPETS[drop.snippetIndex]
        
        // Typing animation: increment visible characters smoothly
        drop.charLength += isGlitching ? 0.35 : 0.15
        const visibleChars = Math.floor(drop.charLength)
        const typedSnippet = fullSnippet.slice(0, Math.min(fullSnippet.length, visibleChars))

        const x = i * 36

        // Ultra-slow smooth falling speed
        const activeSpeed = isGlitching ? drop.speed * 1.3 : drop.speed
        const activeOpacity = isGlitching ? Math.min(0.85, drop.opacity * 2.2) : drop.opacity

        ctx.fillStyle = drop.color
        ctx.globalAlpha = activeOpacity
        ctx.fillText(typedSnippet, x, drop.y)

        drop.y += activeSpeed

        if (drop.y > height + 40) {
          drop.y = Math.random() * -80
          drop.snippetIndex = Math.floor(Math.random() * CODE_SNIPPETS.length)
          drop.charLength = 1
          drop.color = COLORS[Math.floor(Math.random() * COLORS.length)]
          drop.opacity = Math.random() * 0.3 + 0.12
        }
      })

      ctx.globalAlpha = 1.0

      // Soft ambient glitch lines when Pappu codes at table
      if (isGlitching && Math.random() < 0.12) {
        const glitchY = Math.random() * height
        const glitchH = Math.random() * 3 + 1
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255, 87, 51, 0.15)' : 'rgba(37, 99, 235, 0.15)'
        ctx.fillRect(0, glitchY, width, glitchH)
      }
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [isGlitching, isPaused])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: isPaused ? 0 : isGlitching ? 0.95 : 0.65,
        transition: 'opacity 0.8s ease',
      }}
    />
  )
}
