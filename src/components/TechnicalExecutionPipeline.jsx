import React, { useState } from 'react'

/**
 * TechnicalExecutionPipeline — Industrial, technical engineering timeline
 * Replaces generic soft SaaS 01-04 cards with realistic engineering milestones.
 */
export default function TechnicalExecutionPipeline() {
  const [activeMilestone, setActiveMilestone] = useState(0)

  const milestones = [
    {
      phase: 'PHASE 01',
      dayMarker: 'T+02 DAYS',
      title: 'Architecture Discovery & Threat Modeling',
      badge: 'Scope & NDA',
      badgeColor: '#ff5733',
      desc: 'We map system diagrams, database ERDs, API interfaces, and sign mutual NDAs. You receive a complete technical specification and zero-ambiguity sprint roadmap.',
      deliverables: ['System Architecture Diagram', 'Mutual NDA & IP Agreement', 'Fixed 4-Week Milestone Schedule'],
      command: '$ git init && karmaveon spec:generate --target=production',
    },
    {
      phase: 'PHASE 02',
      dayMarker: 'T+07 DAYS',
      title: 'Interactive Figma Engine & Core API Staging',
      badge: 'Clickable Wireframe',
      badgeColor: '#2563eb',
      desc: 'You receive a high-fidelity interactive Figma system AND a live staging API on Vercel/Firebase with database seed data. You test UX before heavy backend code is written.',
      deliverables: ['Clickable High-Res Prototype', 'Live Staging Backend URL', 'Auth & Database Migration Scripts'],
      command: '$ vercel deploy --environment=staging --seed=live',
    },
    {
      phase: 'PHASE 03',
      dayMarker: 'T+21 DAYS',
      title: 'Full-Stack Build & Hardware Integration',
      badge: 'Daily Deployments',
      badgeColor: '#7c3aed',
      desc: 'Active feature build sprint. WebSockets, payment gateways, mobile app builds, or ESP32 hardware telemetry. You track progress daily on our live dashboard.',
      deliverables: ['Production Web/Mobile Codebase', 'WebSocket Dispatch & KDS Engine', 'Automated E2E & Load Testing'],
      command: '$ npm run test:e2e && karmaveon build:hardware --verify',
    },
    {
      phase: 'PHASE 04',
      dayMarker: 'T+28 DAYS',
      title: 'Production Cutover & 30-Day Launch SLA',
      badge: '100% IP Transfer',
      badgeColor: '#10b981',
      desc: 'We manage DNS cutover, cloud monitoring setup, and complete Git repository ownership transfer. We stick around for 30 days post-launch for warranty & tuning.',
      deliverables: ['Zero-Downtime Production Deploy', '100% Full IP Transfer Signed', '30-Day Bug Warranty & Team Handover'],
      command: '$ karmaveon release:prod --transfer-ip=client --status=online',
    },
  ]

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* ── Desktop Pipeline Timeline Grid ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '20px',
        }}
      >
        {milestones.map((m, idx) => {
          const isActive = activeMilestone === idx
          return (
            <div
              key={m.phase}
              onClick={() => setActiveMilestone(idx)}
              style={{
                background: isActive ? '#0f172a' : '#ffffff',
                border: `1.5px solid ${isActive ? m.badgeColor : '#e2e8f0'}`,
                borderRadius: '16px',
                padding: '26px 20px',
                color: isActive ? '#ffffff' : '#0f172a',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                transform: isActive ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: isActive
                  ? `0 20px 40px -10px ${m.badgeColor}35, 0 4px 12px rgba(0,0,0,0.06)`
                  : '0 4px 14px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Header: Phase + Day Marker */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 900,
                      fontFamily: 'monospace',
                      color: m.badgeColor,
                      letterSpacing: '1px',
                    }}
                  >
                    {m.phase}
                  </span>
                  <span
                    style={{
                      fontSize: '10px',
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      background: isActive ? 'rgba(255, 255, 255, 0.1)' : '#f1f5f9',
                      color: isActive ? '#38bdf8' : '#64748b',
                    }}
                  >
                    {m.dayMarker}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: '17px',
                    fontWeight: 900,
                    lineHeight: 1.3,
                    marginBottom: '10px',
                    color: isActive ? '#ffffff' : '#0f172a',
                  }}
                >
                  {m.title}
                </h3>

                <p
                  style={{
                    fontSize: '13px',
                    color: isActive ? '#94a3b8' : '#64748b',
                    lineHeight: 1.6,
                    marginBottom: '18px',
                  }}
                >
                  {m.desc}
                </p>

                {/* Deliverables Checklist */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '18px' }}>
                  {m.deliverables.map((deliv, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: '11.5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: isActive ? '#e2e8f0' : '#334155',
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ color: m.badgeColor }}>✓</span>
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal command line */}
              <div
                style={{
                  background: isActive ? '#030712' : '#f8fafc',
                  border: `1px solid ${isActive ? '#1e293b' : '#e2e8f0'}`,
                  borderRadius: '8px',
                  padding: '8px 10px',
                  fontSize: '10.5px',
                  fontFamily: 'monospace',
                  color: isActive ? '#38bdf8' : '#475569',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {m.command}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
