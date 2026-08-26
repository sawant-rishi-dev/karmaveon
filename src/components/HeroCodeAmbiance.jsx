import React, { useEffect, useRef } from 'react'

const SNIPPET_PRESETS = {
  home: [
    'esp32.boot(CLOCK_240MHZ)',
    'n8n.workflow.trigger("webhook_01")',
    'rtx_4090.cuda.alloc(48GB)',
    'React19.use(serverAction)',
    'POST /api/v2/orders -> 200 OK',
    'mqtt.subscribe("telemetry/live")',
    'SQLite.wal_checkpoint(PASS)',
    'pgvector.cosine_dist(0.014)',
    '0x4F92A_CHIP_CONNECT',
    'Next15.edge.render(sub-50ms)',
  ],
  qrbites: [
    'ws://kds.gateway/orders/live',
    'kds.dispatch({ table: "T-04", status: "PREPPING" })',
    'POST /menu/scan -> payload[28 items]',
    'gst.calc({ cgst: 0.025, sgst: 0.025 })',
    'socket.broadcast("ITEM_READY_CHEF_1")',
    'table_qr.auth({ uuid: "8b7a-9c4e" })',
    'print.thermal.esc_pos(3_INCH_RECEIPT)',
    'order.latency: 14ms (P99)',
  ],
  smartudhaar: [
    'sqlite3_exec("INSERT INTO udhaar_ledger")',
    'expo.camera.scanBarcode({ format: "EAN_13" })',
    'wa.sendReminder({ upi: "upi://pay?pa=store@upi" })',
    'sqlite.wal_sync("local_first_db")',
    'offline_queue.flush(32_TRANSACTIONS)',
    'thermal_bt.printInvoice(#GST-2026-084)',
    'sms_gateway.dispatch("+91-98XXX-XX412")',
  ],
  kwiee: [
    'vl53l0x.getDistanceMillimeters() -> 382mm',
    'i2c.master_write(0x29, REG_SYSTEM_RANGE)',
    'mqtt.publish("kwiee/laser", payload)',
    'st7789.drawTFTBuffer(135, 240)',
    'dht22.readClimate(&temp, &humidity)',
    'gpio_set_level(RELAY_PIN_12, 1)',
    'cad.petg_tolerance(0.2mm_HEAT_INSERTS)',
  ],
  services: [
    'pgvector.hnsw_index_scan(28ms)',
    'llama3_70b.stream({ tokens_per_sec: 48 })',
    'n8n.node_exec("stripe_reconciliation")',
    'esp32.firmware.flash(SPI_SPEED_80M)',
    'next15.middleware.geo_route()',
    'cuda_stream.synchronize(CUDA_SUCCESS)',
  ],
  products: [
    'kds.live_stream.connected()',
    'sqlite.local_offline.ok()',
    'sensor.tof_940nm.active()',
    'n8n.daemon.running()',
    'sub_second.pipeline.ready()',
  ],
}

const COLORS = ['#2563eb', '#ff5733', '#059669', '#7c3aed', '#0284c7']

/**
 * HeroCodeAmbiance
 * Contextual monospace background animation scoped to Hero sections
 * with clear visibility, smooth drift, and soft bottom fade.
 */
export default function HeroCodeAmbiance({ preset = 'home' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const parent = canvas.parentElement
    let width = (canvas.width = parent ? parent.offsetWidth : window.innerWidth)
    let height = (canvas.height = parent ? parent.offsetHeight : 480)

    const handleResize = () => {
      if (!canvas.parentElement) return
      width = canvas.width = canvas.parentElement.offsetWidth
      height = canvas.height = canvas.parentElement.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    const snippets = SNIPPET_PRESETS[preset] || SNIPPET_PRESETS.home
    const fontSize = 12
    const columnSpacing = 58
    const columns = Math.max(5, Math.floor(width / columnSpacing))

    const drops = Array.from({ length: columns }, (_, i) => ({
      x: i * columnSpacing + 18,
      y: Math.random() * -220,
      speed: Math.random() * 0.35 + 0.22,
      snippetIndex: i % snippets.length,
      charLength: Math.floor(Math.random() * 8) + 1,
      color: COLORS[i % COLORS.length],
      opacity: Math.random() * 0.08 + 0.16, // Clearly visible 16-24% opacity
    }))

    let animId
    const render = () => {
      animId = requestAnimationFrame(render)
      ctx.clearRect(0, 0, width, height)

      ctx.font = `${fontSize}px 'Courier New', monospace`
      ctx.fontWeight = '700'

      drops.forEach((drop) => {
        const fullSnippet = snippets[drop.snippetIndex]
        drop.charLength += 0.12
        const visibleChars = Math.floor(drop.charLength)
        const text = fullSnippet.slice(0, Math.min(fullSnippet.length, visibleChars))

        ctx.fillStyle = drop.color
        ctx.globalAlpha = drop.opacity
        ctx.fillText(text, drop.x, drop.y)

        drop.y += drop.speed

        if (drop.y > height + 20) {
          drop.y = Math.random() * -80
          drop.snippetIndex = (drop.snippetIndex + 1) % snippets.length
          drop.charLength = 1
          drop.opacity = Math.random() * 0.08 + 0.16
        }
      })

      ctx.globalAlpha = 1.0
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
    }
  }, [preset])

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  )
}
