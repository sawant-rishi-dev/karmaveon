import React from 'react'

const TECH_ITEMS = [
  {
    name: 'React 19',
    color: '#00D8FF',
    bg: 'rgba(0, 216, 255, 0.08)',
    border: 'rgba(0, 216, 255, 0.3)',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <ellipse cx="16" cy="16" rx="13" ry="5.5" stroke="#00D8FF" strokeWidth="1.8" />
        <ellipse cx="16" cy="16" rx="13" ry="5.5" stroke="#00D8FF" strokeWidth="1.8" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="13" ry="5.5" stroke="#00D8FF" strokeWidth="1.8" transform="rotate(120 16 16)" />
        <circle cx="16" cy="16" r="2.8" fill="#00D8FF" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    color: '#0F172A',
    bg: 'rgba(15, 23, 42, 0.06)',
    border: 'rgba(15, 23, 42, 0.25)',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#0F172A" />
        <path d="M11 23V9L23 23V9" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Python',
    color: '#387EB8',
    bg: 'rgba(56, 126, 184, 0.08)',
    border: 'rgba(56, 126, 184, 0.3)',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <path d="M16 4C10.5 4 11 6.5 11 6.5V9.5H16.5V11H8.5C6 11 4 12.5 4 16C4 19.5 6 20 8.5 20H10V18C10 15.5 12 13.5 14.5 13.5H19.5C21 13.5 22 12.5 22 11V6.5C22 6.5 22 4 16 4Z" fill="#387EB8" />
        <path d="M16 28C21.5 28 21 25.5 21 25.5V22.5H15.5V21H23.5C26 21 28 19.5 28 16C28 12.5 26 12 23.5 12H22V14C22 16.5 20 18.5 17.5 18.5H12.5C11 18.5 10 19.5 10 21V25.5C10 25.5 10 28 16 28Z" fill="#FFE052" />
        <circle cx="13" cy="7.5" r="1.2" fill="#FFFFFF" />
        <circle cx="19" cy="24.5" r="1.2" fill="#0F172A" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    color: '#3178C6',
    bg: 'rgba(49, 120, 198, 0.08)',
    border: 'rgba(49, 120, 198, 0.3)',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="3" width="26" height="26" rx="6" fill="#3178C6" />
        <path d="M9 13H17M13 13V23" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M19 21C20 22.5 22 23 23.5 21.8C24.5 21 24.5 19.5 23.5 18.8L20.5 16.5C19.5 15.8 19.5 14.2 20.5 13.5C22 12.2 24 12.8 25 14" stroke="#FFF" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'n8n Workflows',
    color: '#EA4B71',
    bg: 'rgba(234, 75, 113, 0.08)',
    border: 'rgba(234, 75, 113, 0.3)',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" fill="#EA4B71" />
        <path d="M17 6L9 18H16L15 26L23 14H16L17 6Z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    name: 'React Native',
    color: '#7C3AED',
    bg: 'rgba(124, 58, 237, 0.08)',
    border: 'rgba(124, 58, 237, 0.3)',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <rect x="8" y="4" width="16" height="24" rx="4" fill="#0F172A" stroke="#7C3AED" strokeWidth="1.8" />
        <circle cx="16" cy="23" r="1.5" fill="#7C3AED" />
        <line x1="13" y1="7" x2="19" y2="7" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Firebase & Supabase',
    color: '#FFCA28',
    bg: 'rgba(255, 202, 40, 0.08)',
    border: 'rgba(255, 202, 40, 0.35)',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <path d="M6 24L10 8L16 16L19 11L26 24L16 28L6 24Z" fill="#FFA000" />
        <path d="M6 24L10 8L16 16L6 24Z" fill="#FFCA28" />
        <path d="M16 16L19 11L26 24L16 28L16 16Z" fill="#FF8F00" />
      </svg>
    ),
  },
  {
    name: 'AWS Cloud',
    color: '#FF9900',
    bg: 'rgba(255, 153, 0, 0.08)',
    border: 'rgba(255, 153, 0, 0.3)',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <path d="M8 20C5.5 20 4 18 4 15.5C4 13.5 5.5 11.5 8 11.5C8.8 8.5 11.5 6 15.5 6C20 6 22.5 9 23 12C25.5 12.2 28 14 28 16.8C28 19.5 25.5 22 22.5 22H8" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M9 25C13 27.5 19 27.5 23 25" stroke="#FF9900" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Arduino & IoT ESP32',
    color: '#00979D',
    bg: 'rgba(0, 151, 157, 0.08)',
    border: 'rgba(0, 151, 157, 0.35)',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <circle cx="11" cy="16" r="7" stroke="#00979D" strokeWidth="2" />
        <circle cx="21" cy="16" r="7" stroke="#00979D" strokeWidth="2" />
        <path d="M9 16H13M19 16H23M21 14V18" stroke="#00979D" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Custom PC & GPU Rigs',
    color: '#10B981',
    bg: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.35)',
    svg: (
      <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
        <rect x="5" y="6" width="22" height="18" rx="3" fill="#0F172A" stroke="#10B981" strokeWidth="1.8" />
        <line x1="16" y1="24" x2="16" y2="28" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="28" x2="21" y2="28" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        <circle cx="16" cy="15" r="4" stroke="#38BDF8" strokeWidth="1.4" />
      </svg>
    ),
  },
]

export default function TechStackMarquee() {
  // Duplicated list for seamless infinite looping
  const duplicatedItems = [...TECH_ITEMS, ...TECH_ITEMS]

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        padding: '8px 0',
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          gap: '16px',
          width: 'max-content',
          animation: 'marqueeLoop 32s linear infinite',
        }}
      >
        {duplicatedItems.map((tech, idx) => (
          <div
            key={idx}
            className="tech-marquee-pill"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#FFFFFF',
              border: `1px solid ${tech.border}`,
              padding: '10px 20px',
              borderRadius: '14px',
              boxShadow: '0 3px 12px rgba(0,0,0,0.03)',
              fontSize: '14px',
              fontWeight: 750,
              color: '#0F172A',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              userSelect: 'none',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)'
              e.currentTarget.style.boxShadow = `0 10px 25px -4px ${tech.color}40, 0 4px 10px rgba(0,0,0,0.04)`
              e.currentTarget.style.borderColor = tech.color
              e.currentTarget.style.background = tech.bg
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)'
              e.currentTarget.style.boxShadow = '0 3px 12px rgba(0,0,0,0.03)'
              e.currentTarget.style.borderColor = tech.border
              e.currentTarget.style.background = '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {tech.svg}
            </div>
            <span>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
