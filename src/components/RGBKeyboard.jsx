import React, { useMemo } from 'react'
import { KEYBOARD_ROWS } from '../data/keyboardLayout'

const TOTAL_COLS = 16
const KEY_Z = 16   // how many px each keycap rises above the base plate

// ── Individual 3D key ──────────────────────────────────────────
const Key3D = React.memo(({ keyDef, litData }) => {
  const isLit = !!litData
  const color = litData?.color

  return (
    <div
      style={{
        gridColumn: `span ${keyDef.colSpan}`,
        position: 'relative',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* ── Keycap top face — rises KEY_Z px above the base ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translateZ(${KEY_Z}px)`,
          borderRadius: '5px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 'clamp(6px, 0.8vw, 11px)',
          fontWeight: 700,
          letterSpacing: '0.3px',
          userSelect: 'none',
          // Colors
          background: isLit
            ? `linear-gradient(145deg, ${color}58 0%, ${color}22 100%)`
            : 'linear-gradient(145deg, rgba(22,48,132,0.94) 0%, rgba(9,20,74,0.98) 100%)',
          border: `1px solid ${isLit ? color : 'rgba(72,134,255,0.55)'}`,
          color: isLit ? color : 'rgba(115,182,255,0.82)',
          textShadow: isLit
            ? `0 0 12px ${color}, 0 0 2px #fff`
            : '0 0 4px rgba(100,160,255,0.35)',
          boxShadow: isLit
            ? `0 0 24px ${color}cc, 0 0 60px ${color}55, inset 0 1px 0 ${color}aa`
            : 'inset 0 1px 0 rgba(100,160,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.3)',
          transition: 'background 0.15s, border-color 0.15s, box-shadow 0.15s, color 0.15s',
        }}
      >
        {keyDef.label}
      </div>
    </div>
  )
})
Key3D.displayName = 'Key3D'

// ── Full keyboard board ────────────────────────────────────────
export default function RGBKeyboard({ litKeys }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dark base plate — stays at Z=0, visible as key "sides" in isometric view */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(170deg, rgba(8,18,60,0.98) 0%, rgba(3,8,38,0.99) 100%)',
          border: '1px solid rgba(55,115,255,0.45)',
          borderRadius: '14px',
          boxShadow: `
            inset 0 0 120px rgba(0,50,200,0.35),
            inset 0 40px 80px rgba(0,20,100,0.3),
            0 0 80px rgba(0,70,255,0.2),
            0 0 160px rgba(0,40,200,0.12)
          `,
        }}
      />

      {/* Key rows — elevated above the base plate via translateZ */}
      <div
        style={{
          position: 'absolute',
          inset: '18px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
          transformStyle: 'preserve-3d',
        }}
      >
        {KEYBOARD_ROWS.map((row, rowIdx) => (
          <div
            key={rowIdx}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${TOTAL_COLS}, 1fr)`,
              gap: '5px',
              flex: 1,
              transformStyle: 'preserve-3d',
            }}
          >
            {row.map((keyDef) => (
              <Key3D
                key={keyDef.code}
                keyDef={keyDef}
                litData={litKeys[keyDef.code]}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
