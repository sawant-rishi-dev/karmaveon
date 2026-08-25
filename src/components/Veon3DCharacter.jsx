import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/**
 * Veon3DCharacter — Interactive 3D Developer Character (Three.js)
 *
 * Features:
 * - 3D Stylized Developer Model (Cap, Hoodie, Expressive Face, Ears, Smiling Mouth)
 * - Real-Time Head & Torso Mouse Tracking with smooth Damping
 * - Dynamic 3D Pupils tracking cursor coordinates
 * - Organic Periodic Blinking
 * - Cursor Glowing Light Orb & Rim Lighting matching reference
 * - Zero-interference pointer-events: none background canvas
 */
export default function Veon3DCharacter({
  className = '',
  style = {},
  interactive = true,
  showOrb = true,
  scale = 1.0,
}) {
  const mountRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    let width = container.clientWidth || window.innerWidth
    let height = container.clientHeight || window.innerHeight

    // ── 1. SCENE & CAMERA ─────────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0.4, 5.2)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    container.appendChild(renderer.domElement)

    // ── 2. MATERIALS (Stylized Vinyl/Clay Shaders) ─────────────────
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xffa07a, // Warm skin tone
      roughness: 0.38,
      metalness: 0.05,
    })

    const skinShadowMat = new THREE.MeshStandardMaterial({
      color: 0xe88a64,
      roughness: 0.45,
      metalness: 0.05,
    })

    const hoodieMat = new THREE.MeshStandardMaterial({
      color: 0x1e222d, // Dark tech hoodie
      roughness: 0.65,
      metalness: 0.1,
    })

    const hoodieCollarMat = new THREE.MeshStandardMaterial({
      color: 0x0d1117,
      roughness: 0.5,
      metalness: 0.2,
    })

    const capMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9, // Crisp white/light-grey cap crown
      roughness: 0.25,
      metalness: 0.1,
    })

    const capBrimMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Dark visor brim
      roughness: 0.3,
      metalness: 0.2,
    })

    const eyeWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.15,
      metalness: 0.0,
    })

    const irisMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb, // Vibrant Tech Blue Iris
      roughness: 0.2,
      metalness: 0.1,
    })

    const pupilMat = new THREE.MeshBasicMaterial({
      color: 0x05070a, // Pitch dark pupil
    })

    const specularMat = new THREE.MeshBasicMaterial({
      color: 0xffffff, // Eye reflection gleam
    })

    const browMat = new THREE.MeshStandardMaterial({
      color: 0x18181b, // Bold dark eyebrows
      roughness: 0.5,
    })

    const teethMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
    })

    const mouthBackMat = new THREE.MeshBasicMaterial({
      color: 0x4a0e17,
    })

    const orbGlowMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
    })

    // ── 3. CHARACTER HIERARCHY ─────────────────────────────────────
    const rootGroup = new THREE.Group()
    rootGroup.position.set(0, -0.6, 0)
    rootGroup.scale.set(scale, scale, scale)
    scene.add(rootGroup)

    // ── TORSO & HOODIE ──
    const torsoGroup = new THREE.Group()
    rootGroup.add(torsoGroup)

    // Shoulders
    const shouldersGeo = new THREE.CylinderGeometry(1.35, 1.6, 1.4, 32)
    const shoulders = new THREE.Mesh(shouldersGeo, hoodieMat)
    shoulders.position.set(0, -0.7, 0)
    shoulders.scale.set(1.1, 1, 0.7)
    torsoGroup.add(shoulders)

    // Hoodie Neck Collar Rim
    const collarGeo = new THREE.TorusGeometry(0.55, 0.1, 16, 32)
    const collar = new THREE.Mesh(collarGeo, hoodieCollarMat)
    collar.rotation.x = Math.PI / 2
    collar.position.set(0, -0.05, 0.05)
    torsoGroup.add(collar)

    // Neck
    const neckGeo = new THREE.CylinderGeometry(0.38, 0.42, 0.6, 24)
    const neck = new THREE.Mesh(neckGeo, skinShadowMat)
    neck.position.set(0, 0.15, 0)
    torsoGroup.add(neck)

    // ── HEAD GROUP (Tracks mouse) ──
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 0.65, 0)
    rootGroup.add(headGroup)

    // Head Base Sphere
    const headGeo = new THREE.SphereGeometry(0.9, 32, 32)
    const head = new THREE.Mesh(headGeo, skinMat)
    head.scale.set(1, 1.05, 0.95)
    headGroup.add(head)

    // Jaw / Chin enhancement
    const jawGeo = new THREE.SphereGeometry(0.72, 32, 32)
    const jaw = new THREE.Mesh(jawGeo, skinMat)
    jaw.position.set(0, -0.28, 0.18)
    jaw.scale.set(0.95, 0.75, 0.85)
    headGroup.add(jaw)

    // ── EARS ──
    const createEar = (isLeft) => {
      const earGroup = new THREE.Group()
      const outerEarGeo = new THREE.TorusGeometry(0.24, 0.09, 16, 32, Math.PI * 1.3)
      const outerEar = new THREE.Mesh(outerEarGeo, skinMat)
      outerEar.rotation.z = isLeft ? 0.3 : -0.3
      earGroup.add(outerEar)

      const innerEarGeo = new THREE.SphereGeometry(0.18, 16, 16)
      const innerEar = new THREE.Mesh(innerEarGeo, skinShadowMat)
      innerEar.scale.set(0.6, 1, 0.4)
      earGroup.add(innerEar)

      earGroup.position.set(isLeft ? -0.92 : 0.92, -0.05, -0.02)
      earGroup.rotation.y = isLeft ? -0.3 : 0.3
      return earGroup
    }
    headGroup.add(createEar(true))
    headGroup.add(createEar(false))

    // ── NOSE ──
    const noseGeo = new THREE.SphereGeometry(0.19, 24, 24)
    const nose = new THREE.Mesh(noseGeo, skinMat)
    nose.position.set(0, -0.06, 0.92)
    nose.scale.set(1.15, 1, 1.1)
    headGroup.add(nose)

    // ── SMILING MOUTH ──
    const mouthGroup = new THREE.Group()
    mouthGroup.position.set(0, -0.32, 0.8)

    // Smiling Open Mouth Arc
    const mouthBackGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.15, 32, 1, false, 0, Math.PI)
    const mouthBack = new THREE.Mesh(mouthBackGeo, mouthBackMat)
    mouthBack.rotation.x = Math.PI / 2
    mouthBack.rotation.z = Math.PI
    mouthBack.scale.set(0.9, 0.45, 1)
    mouthGroup.add(mouthBack)

    // White Upper Teeth Arc
    const teethGeo = new THREE.BoxGeometry(0.48, 0.1, 0.1)
    const teeth = new THREE.Mesh(teethGeo, teethMat)
    teeth.position.set(0, 0.03, 0.05)
    mouthGroup.add(teeth)

    // White Lower Teeth Arc
    const lowerTeethGeo = new THREE.BoxGeometry(0.38, 0.06, 0.1)
    const lowerTeeth = new THREE.Mesh(lowerTeethGeo, teethMat)
    lowerTeeth.position.set(0, -0.06, 0.04)
    mouthGroup.add(lowerTeeth)

    headGroup.add(mouthGroup)

    // ── EYES WITH TRACKING & BLINKING ──
    const eyeSpacing = 0.34
    const eyeY = 0.16
    const eyeZ = 0.76

    const leftEyeGroup = new THREE.Group()
    leftEyeGroup.position.set(-eyeSpacing, eyeY, eyeZ)
    headGroup.add(leftEyeGroup)

    const rightEyeGroup = new THREE.Group()
    rightEyeGroup.position.set(eyeSpacing, eyeY, eyeZ)
    headGroup.add(rightEyeGroup)

    const createEye = (parentGroup) => {
      // Sclera (Eye White)
      const whiteGeo = new THREE.SphereGeometry(0.24, 24, 24)
      const white = new THREE.Mesh(whiteGeo, eyeWhiteMat)
      white.scale.set(1.1, 1, 0.9)
      parentGroup.add(white)

      // Pupil / Iris container (moves with cursor)
      const pupilContainer = new THREE.Group()
      pupilContainer.position.set(0, 0, 0.16)
      parentGroup.add(pupilContainer)

      // Iris (Blue Ring)
      const irisGeo = new THREE.CircleGeometry(0.14, 24)
      const iris = new THREE.Mesh(irisGeo, irisMat)
      pupilContainer.add(iris)

      // Pupil (Dark Center)
      const pupilCenterGeo = new THREE.CircleGeometry(0.09, 24)
      const pupilCenter = new THREE.Mesh(pupilCenterGeo, pupilMat)
      pupilCenter.position.set(0, 0, 0.005)
      pupilContainer.add(pupilCenter)

      // Specular Gleam Reflection
      const gleamGeo = new THREE.CircleGeometry(0.035, 16)
      const gleam = new THREE.Mesh(gleamGeo, specularMat)
      gleam.position.set(0.04, 0.04, 0.01)
      pupilContainer.add(gleam)

      // Eyelid for Blinking (Top lid)
      const lidGeo = new THREE.SphereGeometry(0.255, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2)
      const upperLid = new THREE.Mesh(lidGeo, skinMat)
      upperLid.rotation.x = -Math.PI / 2
      upperLid.scale.set(1.15, 1.05, 0.95)
      upperLid.position.set(0, 0, 0.01)
      parentGroup.add(upperLid)

      return { pupilContainer, upperLid }
    }

    const leftEye = createEye(leftEyeGroup)
    const rightEye = createEye(rightEyeGroup)

    // ── EYEBROWS ──
    const createEyebrow = (isLeft) => {
      const browGeo = new THREE.BoxGeometry(0.38, 0.09, 0.12)
      const brow = new THREE.Mesh(browGeo, browMat)
      brow.position.set(isLeft ? -eyeSpacing : eyeSpacing, eyeY + 0.26, eyeZ + 0.12)
      brow.rotation.z = isLeft ? 0.08 : -0.08
      brow.rotation.x = 0.12
      return brow
    }
    const leftBrow = createEyebrow(true)
    const rightBrow = createEyebrow(false)
    headGroup.add(leftBrow)
    headGroup.add(rightBrow)

    // ── BASEBALL CAP ──
    const capGroup = new THREE.Group()
    capGroup.position.set(0, 0.35, -0.05)
    headGroup.add(capGroup)

    // Cap Dome Crown (Top)
    const domeGeo = new THREE.SphereGeometry(0.96, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55)
    const dome = new THREE.Mesh(domeGeo, capMat)
    dome.position.set(0, -0.05, 0)
    dome.scale.set(1.02, 0.98, 1.06)
    capGroup.add(dome)

    // Cap Top Button
    const capButtonGeo = new THREE.SphereGeometry(0.08, 16, 16)
    const capButton = new THREE.Mesh(capButtonGeo, capBrimMat)
    capButton.position.set(0, 0.92, 0)
    capGroup.add(capButton)

    // Cap Visor Brim (Protruding forward)
    const brimShape = new THREE.Shape()
    brimShape.absarc(0, 0, 1.1, 0, Math.PI, false)
    const extrudeSettings = { depth: 0.04, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.02, bevelThickness: 0.02 }
    const brimGeo = new THREE.ExtrudeGeometry(brimShape, extrudeSettings)
    const brim = new THREE.Mesh(brimGeo, capBrimMat)
    brim.rotation.x = -Math.PI / 2 + 0.15
    brim.position.set(0, 0.18, 0.3)
    brim.scale.set(0.92, 0.9, 0.9)
    capGroup.add(brim)

    // ── 4. LIGHTING & GLOW ORB ─────────────────────────────────────
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95)
    scene.add(ambientLight)

    // Key Studio Light (Warm)
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.2)
    keyLight.position.set(3, 4, 4)
    scene.add(keyLight)

    // Cyan Rim Light (Left)
    const cyanRim = new THREE.DirectionalLight(0x06b6d4, 3.5)
    cyanRim.position.set(-4, 2, -2)
    scene.add(cyanRim)

    // Magenta/Purple Rim Light (Right)
    const purpleRim = new THREE.DirectionalLight(0xa855f7, 2.8)
    purpleRim.position.set(4, 1, -2)
    scene.add(purpleRim)

    // Bottom Fill Light
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2)
    fillLight.position.set(0, -3, 2)
    scene.add(fillLight)

    // Interactive Cursor Light Orb (Follows Mouse with Specular Highlights)
    const cursorPointLight = new THREE.PointLight(0x67e8f9, 4.5, 6, 1.2)
    scene.add(cursorPointLight)

    const orbMeshGeo = new THREE.SphereGeometry(0.12, 16, 16)
    const orbMesh = new THREE.Mesh(orbMeshGeo, orbGlowMat)
    scene.add(orbMesh)
    orbMesh.visible = showOrb

    // ── 5. MOUSE TRACKING & ANIMATION LOOP ─────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 }
    let blinkProgress = 0
    let isBlinking = false
    let nextBlinkTime = Date.now() + 2500

    const handleMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1
      mouse.targetX = nx
      mouse.targetY = ny
    }

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      width = container.clientWidth || window.innerWidth
      height = container.clientHeight || window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    let animId
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const dt = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08

      // ── Head Rotation (Pitch, Yaw, Roll) ──
      const targetYaw = mouse.x * 0.52
      const targetPitch = -mouse.y * 0.38
      const targetRoll = mouse.x * -0.06

      headGroup.rotation.y = targetYaw
      headGroup.rotation.x = targetPitch
      headGroup.rotation.z = targetRoll

      // Torso slight follow
      torsoGroup.rotation.y = mouse.x * 0.15

      // Breathing / idle motion
      const breath = Math.sin(elapsed * 2.0) * 0.015
      headGroup.position.y = 0.65 + breath
      torsoGroup.position.y = breath * 0.5

      // ── Pupil Gaze Coordinates ──
      const pupilClampX = THREE.MathUtils.clamp(mouse.x * 0.07, -0.07, 0.07)
      const pupilClampY = THREE.MathUtils.clamp(mouse.y * 0.07, -0.06, 0.06)

      leftEye.pupilContainer.position.x = pupilClampX
      leftEye.pupilContainer.position.y = pupilClampY
      rightEye.pupilContainer.position.x = pupilClampX
      rightEye.pupilContainer.position.y = pupilClampY

      // Eyebrow slight reaction
      const browReaction = mouse.y > 0.2 ? 0.04 : 0
      leftBrow.position.y = eyeY + 0.26 + browReaction
      rightBrow.position.y = eyeY + 0.26 + browReaction

      // ── Natural Blinking Cycle ──
      const now = Date.now()
      if (now > nextBlinkTime && !isBlinking) {
        isBlinking = true
        blinkProgress = 0
      }

      if (isBlinking) {
        blinkProgress += dt * 14 // Fast snap blink
        const lidClose = Math.sin(blinkProgress * Math.PI)
        leftEye.upperLid.rotation.x = -Math.PI / 2 + lidClose * 1.55
        rightEye.upperLid.rotation.x = -Math.PI / 2 + lidClose * 1.55

        if (blinkProgress >= 1.0) {
          isBlinking = false
          leftEye.upperLid.rotation.x = -Math.PI / 2
          rightEye.upperLid.rotation.x = -Math.PI / 2
          nextBlinkTime = now + 3000 + Math.random() * 3500
        }
      }

      // ── Cursor Light Orb Tracking ──
      const orbX = mouse.x * 2.6
      const orbY = mouse.y * 1.8 + 0.3
      const orbZ = 1.6 + Math.sin(elapsed * 3) * 0.15

      cursorPointLight.position.set(orbX, orbY, orbZ)
      orbMesh.position.set(orbX, orbY, orbZ)

      renderer.render(scene, camera)
    }

    animate()
    setIsLoaded(true)

    return () => {
      cancelAnimationFrame(animId)
      if (interactive) window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)

      // Dispose Three.js objects
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [interactive, showOrb, scale])

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        ...style,
      }}
    />
  )
}
