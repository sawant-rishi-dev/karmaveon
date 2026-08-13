import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { REAL_KEYBOARD_LAYOUT } from '../data/keyboardLayout'

// ── Rainbow colour based on X position (0=left, 1=right) ──────
// Matches reference: pink/red → purple → blue → cyan → teal → green → yellow
function rainbowAt(t) {
  const hue = (300 - t * 240 + 360) % 360
  const c = new THREE.Color()
  c.setHSL(hue / 360, 1.0, 0.52)
  return c
}

// ── Truncated-pyramid keycap geometry (real OEM profile) ───────
function makeKeycapGeometry(w, d, h) {
  const g = new THREE.BoxGeometry(w, h, d, 1, 1, 1)
  const pos = g.attributes.position
  const ratio = 0.80          // top face shrinks to 80% of bottom

  for (let i = 0; i < pos.count; i++) {
    if (pos.getY(i) > 0) {
      pos.setXYZ(i, pos.getX(i) * ratio, pos.getY(i), pos.getZ(i) * ratio)
    }
  }
  pos.needsUpdate = true
  g.computeVertexNormals()
  return g
}

// ── Constants ─────────────────────────────────────────────────
const UNIT = 2.35    // 1 U = 2.35 world units
const GAP = 0.18
const STEP = UNIT + GAP
const KEY_H = 1.15    // keycap height
const KB_COLS_U = 18.5 // approximate TKL width in U (excl. gaps-between-clusters)

export default function RGBKeyboard3D({ litKeys }) {
  const mountRef = useRef(null)
  const keysMapRef = useRef({})

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    let W = mount.clientWidth
    let H = mount.clientHeight

    // ── Scene ─────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x050510, 0.006)

    // ── Camera ───────────────────────────────────────────────
    // We want the keyboard to fill the full screen WIDTH.
    // Total keyboard world-width ≈ KB_COLS_U * STEP
    // Camera position (0, camY, camZ):  distance D = √(camY²+camZ²)
    // For FOV v and aspect a:  visibleHalfW = D·a·tan(v/2)
    // => set  v  so that visibleHalfW = kbWidth/2  (keyboard fills width exactly)
    const kbWidth = KB_COLS_U * STEP          // ≈ 43.4 wu
    const camY = 18, camZ = 18
    const D = Math.sqrt(camY * camY + camZ * camZ) // ≈ 25.5
    const aspect = W / H

    const makeFOV = (a) =>
      2 * Math.atan(kbWidth / (2 * D * a)) * (180 / Math.PI)

    let vFOV = makeFOV(aspect)                // calculate exact FOV to fill width

    const camera = new THREE.PerspectiveCamera(vFOV, aspect, 0.1, 1000)
    camera.position.set(0, camY, camZ)
    camera.lookAt(0, 0, 0)

    // ── Renderer ─────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.35
    mount.appendChild(renderer.domElement)

    // ── Lighting ─────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x101030, 5))

    const top = new THREE.DirectionalLight(0xffffff, 2.5)
    top.position.set(0, 30, 15)
    scene.add(top)

    const rim = new THREE.DirectionalLight(0x0040ff, 1.5)
    rim.position.set(0, 15, -20)
    scene.add(rim)

    // ── Starfield ─────────────────────────────────────────────
    const starPos = new Float32Array(400 * 3)
    for (let i = 0; i < starPos.length; i++) {
      starPos[i] = (Math.random() - 0.5) * 120
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const starField = new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0x8040ff, size: 0.3, transparent: true,
      opacity: 0.7, blending: THREE.AdditiveBlending,
    }))
    scene.add(starField)

    // ── Keyboard chassis (dark plate behind all keys) ──────────
    const plateW = kbWidth + 1.2
    const plateD = 6 * STEP + 1.2
    const plateGeo = new THREE.BoxGeometry(plateW, 0.6, plateD)
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x0d0d1a, roughness: 0.4, metalness: 0.7,
    })
    const plate = new THREE.Mesh(plateGeo, plateMat)
    plate.position.set(0, -0.5, 0)   // sits below key tops
    scene.add(plate)

    // ── Keys ─────────────────────────────────────────────────
    const kbGroup = new THREE.Group()
    scene.add(kbGroup)

    const keysMap = {}
    const startX = -kbWidth / 2     // leftmost key starts here

    REAL_KEYBOARD_LAYOUT.forEach(({ row, keys }) => {
      let curX = startX
      // Calculate Z centre of this row
      // Row 0 is at the top (negative Z) through row 5 at the bottom (positive Z)
      // Total depth = 6 rows
      const totalD = 6 * STEP
      const startZ = -totalD / 2 + STEP / 2
      const zPos = startZ + row * STEP

      keys.forEach((k) => {
        if (k.gap) { curX += k.gap * STEP; return }

        const kW = k.w * UNIT + (k.w - 1) * GAP
        const xCentre = curX + kW / 2
        // Normalise x across keyboard width for rainbow
        const t = (xCentre - startX) / kbWidth

        const rainColor = rainbowAt(t)

        // Group for this key
        const kg = new THREE.Group()
        kg.position.set(xCentre, 0, zPos)

        // -- Dark keycap body --
        const capGeom = makeKeycapGeometry(kW - 0.06, UNIT - 0.06, KEY_H)
        capGeom.translate(0, KEY_H / 2, 0)

        const capMat = new THREE.MeshStandardMaterial({
          color: 0x1c1c2e,
          roughness: 0.5,
          metalness: 0.25,
          emissive: rainColor,
          emissiveIntensity: 0.08,   // always-on dim underglow bleed
        })
        const cap = new THREE.Mesh(capGeom, capMat)
        cap.castShadow = true
        cap.receiveShadow = true
        kg.add(cap)

        // -- Wireframe outline edges (main rainbow glow line) --
        const edges = new THREE.EdgesGeometry(capGeom)
        const edgeMat = new THREE.LineBasicMaterial({
          color: rainColor, transparent: true, opacity: 0.65,
        })
        kg.add(new THREE.LineSegments(edges, edgeMat))

        // -- LED Underglow strip at key base (y=0 plane) --
        const glowGeo = new THREE.PlaneGeometry(kW * 0.95, UNIT * 0.95)
        const glowMat = new THREE.MeshBasicMaterial({
          color: rainColor, transparent: true,
          opacity: 0.0,               // starts invisible; activated on keypress
          blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
          depthWrite: false,
        })
        const glow = new THREE.Mesh(glowGeo, glowMat)
        glow.rotation.x = -Math.PI / 2
        glow.position.y = 0.05
        kg.add(glow)

        // -- Per-key point light (LED inside switch) --
        const pl = new THREE.PointLight(rainColor, 0.07, 3.5)
        pl.position.set(0, KEY_H * 0.25, 0)
        kg.add(pl)

        kbGroup.add(kg)

        keysMap[k.code] = {
          group: kg, capMat, edgeMat, glowMat, light: pl, rainColor,
          baseY: 0, targetY: 0, currentY: 0,
        }

        curX += kW + GAP
      })
    })

    keysMapRef.current = keysMap

    // ── Keyboard orientation: straight, gentle forward tilt ───
    kbGroup.rotation.x = THREE.MathUtils.degToRad(22)
    kbGroup.position.set(0, -0.5, 0)
    plate.rotation.x = THREE.MathUtils.degToRad(22)

    // ── Mouse parallax ────────────────────────────────────────
    let mx = 0, my = 0
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    // ── Resize ───────────────────────────────────────────────
    const onResize = () => {
      W = mount.clientWidth
      H = mount.clientHeight
      const a = W / H
      camera.aspect = a
      camera.fov = makeFOV(a)
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    window.addEventListener('resize', onResize)

    // ── Animation ────────────────────────────────────────────
    let animId, last = performance.now()
    const tick = (now) => {
      animId = requestAnimationFrame(tick)
      const dt = (now - last) * 0.001; last = now

      // Subtle parallax camera drift
      camera.position.x += (mx * 2.5 - camera.position.x) * 0.04
      camera.position.y += (-my * 1.5 + camY - camera.position.y) * 0.04
      camera.lookAt(0, 0, 0)

      starField.rotation.y += dt * 0.015

      // Spring physics for key travel
      Object.values(keysMap).forEach(item => {
        item.currentY += (item.targetY - item.currentY) * 0.22
        item.group.position.y = item.currentY
      })

      renderer.render(scene, camera)
    }
    animId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  // ── Sync React litKeys → 3D glow state ───────────────────────
  useEffect(() => {
    const keysMap = keysMapRef.current
    if (!keysMap) return

    Object.keys(keysMap).forEach(code => {
      const item = keysMap[code]
      const litData = litKeys[code]
      const rc = item.rainColor

      if (litData) {
        const c = new THREE.Color(litData.color)
        item.targetY = 0.65            // physical key travel UP

        item.capMat.emissive.copy(c)
        item.capMat.emissiveIntensity = 2.8

        item.edgeMat.color.copy(c)
        item.edgeMat.opacity = 1.0

        item.glowMat.color.copy(c)
        item.glowMat.opacity = 0.75   // bright underglow flood

        item.light.color.copy(c)
        item.light.intensity = 6.0
      } else {
        item.targetY = 0              // spring back down

        item.capMat.emissive.copy(rc)
        item.capMat.emissiveIntensity = 0.08

        item.edgeMat.color.copy(rc)
        item.edgeMat.opacity = 0.60

        item.glowMat.opacity = 0.0
        item.glowMat.color.copy(rc)

        item.light.intensity = 0.07
        item.light.color.copy(rc)
      }
    })
  }, [litKeys])

  return (
    <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
  )
}
