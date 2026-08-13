import React from 'react'
import DwarfCharacter from './DwarfCharacter'

/**
 * DwarfDevDesk - Cozy Developer Workstation for the Dwarf Software Engineer
 * Props:
 * - isOccupied: boolean (true when dwarf is at desk)
 * - deskRef: ReactRef
 */
export default function DwarfDevDesk({ isOccupied = true, deskRef }) {
  return (
    <div
      ref={deskRef}
      style={{
        position: 'relative',
        width: '260px',
        height: '160px',
        margin: '0 auto',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      {/* Station Title Sign Badge */}
      <div
        style={{
          position: 'absolute',
          top: '-16px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1E293B',
          color: '#F59E0B',
          border: '1px solid #334155',
          borderRadius: '20px',
          padding: '4px 14px',
          fontSize: '11px',
          fontWeight: 800,
          letterSpacing: '1px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          whiteSpace: 'nowrap',
          zIndex: 15,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span>🛠️</span>
        <span>PAPPU'S DEV STATION</span>
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: isOccupied ? '#10B981' : '#FF5733',
            boxShadow: isOccupied ? '0 0 8px #10B981' : '0 0 8px #FF5733',
          }}
        />
      </div>

      {/* Pappu Seated Seated IN the Chair when at Dev Station */}
      {isOccupied && (
        <div
          style={{
            position: 'absolute',
            left: '84px',
            top: '48px',
            zIndex: 8,
            transform: 'scale(0.75)',
            pointerEvents: 'none',
          }}
        >
          <DwarfCharacter state="at_desk" facing="left" scale={0.75} />
        </div>
      )}

      {/* SVG Workstation Illustration */}
      <svg viewBox="0 0 260 160" width="100%" height="100%">
        <defs>
          <linearGradient id="deskTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
          <filter id="lampGlow">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Floor Shadow */}
        <ellipse cx="130" cy="152" rx="110" ry="8" fill="rgba(0,0,0,0.12)" />

        {/* Desk Legs */}
        <rect x="35" y="98" width="10" height="52" fill="#334155" rx="2" />
        <rect x="215" y="98" width="10" height="52" fill="#334155" rx="2" />

        {/* Wooden Desk Surface */}
        <rect x="20" y="88" width="220" height="14" rx="4" fill="url(#deskTop)" />
        <rect x="22" y="100" width="216" height="4" fill="#92400E" />

        {/* Dual LED Monitors */}
        {/* Monitor 1 (Main Code Editor) */}
        <g id="monitor-main">
          <rect x="55" y="28" width="85" height="54" rx="4" fill="url(#screenGrad)" stroke="#334155" strokeWidth="3" />
          {/* Screen Content: Tiny Code Lines */}
          <rect x="62" y="35" width="30" height="3" fill="#38BDF8" rx="1.5" />
          <rect x="62" y="42" width="50" height="2.5" fill="#F59E0B" rx="1" />
          <rect x="68" y="48" width="45" height="2.5" fill="#10B981" rx="1" />
          <rect x="68" y="54" width="38" height="2.5" fill="#FF5733" rx="1" />
          <rect x="62" y="60" width="60" height="2.5" fill="#8B5CF6" rx="1" />
          <rect x="62" y="66" width="20" height="2.5" fill="#38BDF8" rx="1" />
          {/* Monitor Stand */}
          <rect x="92" y="82" width="12" height="7" fill="#475569" />
          <ellipse cx="98" cy="88" rx="16" ry="2" fill="#334155" />
        </g>

        {/* Monitor 2 (Live Terminal Console) */}
        <g id="monitor-second">
          <rect x="145" y="34" width="65" height="46" rx="4" fill="#090D16" stroke="#334155" strokeWidth="2.5" />
          {/* Matrix Terminal Lines */}
          <text x="150" y="45" fill="#10B981" fontSize="5" fontFamily="monospace" fontWeight="bold">
            &gt; pappu.init()
          </text>
          <text x="150" y="52" fill="#38BDF8" fontSize="4.5" fontFamily="monospace">
            [OK] Stalking cursor
          </text>
          <text x="150" y="59" fill="#F59E0B" fontSize="4.5" fontFamily="monospace">
            [OK] Coffee mode
          </text>
          <text x="150" y="66" fill="#10B981" fontSize="4.5" fontFamily="monospace">
            &gt; ready_
          </text>
          {/* Monitor Stand */}
          <rect x="174" y="80" width="8" height="9" fill="#475569" />
          <ellipse cx="178" cy="88" rx="12" ry="2" fill="#334155" />
        </g>

        {/* Warm Desk Lamp */}
        <g id="desk-lamp">
          <path d="M 32 88 Q 30 55 42 45 Q 46 42 42 38" fill="none" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 36 34 L 52 42 L 34 46 Z" fill="#D97706" />
          {/* Soft Golden Lamp Light Beam */}
          <polygon points="43,40 100,88 30,88" fill="rgba(245, 158, 11, 0.12)" filter="url(#lampGlow)" />
        </g>

        {/* Cozy Coffee Mug ☕ */}
        <g id="coffee-mug">
          <rect x="126" y="80" width="10" height="9" rx="2" fill="#FF5733" />
          <path d="M 136 82 Q 139 84 136 87" fill="none" stroke="#FF5733" strokeWidth="1.5" />
          {/* Rising Steam */}
          <path d="M 129 78 Q 131 74 129 70" fill="none" stroke="rgba(200,200,200,0.5)" strokeWidth="1" />
          <path d="M 133 77 Q 131 73 133 69" fill="none" stroke="rgba(200,200,200,0.5)" strokeWidth="1" />
        </g>

        {/* Mechanical Keyboard & Mouse */}
        <rect x="75" y="84" width="40" height="4" rx="1" fill="#1E293B" stroke="#475569" strokeWidth="0.5" />
        <ellipse cx="120" cy="86" rx="3.5" ry="2" fill="#334155" />

        {/* Ergonomic Developer Office Chair */}
        <g id="dev-chair">
          <rect x="90" y="90" width="40" height="30" rx="5" fill="#1E293B" stroke="#334155" strokeWidth="2" />
          <rect x="105" y="120" width="10" height="24" fill="#475569" />
          <ellipse cx="110" cy="144" rx="22" ry="4" fill="#0F172A" />
        </g>
      </svg>
    </div>
  )
}
