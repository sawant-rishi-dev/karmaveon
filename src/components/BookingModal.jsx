import { useState } from 'react'
import confetti from 'canvas-confetti'

export default function BookingModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState('10:00 AM (Morning Slot)')
  const [selectedType, setSelectedType] = useState('AI Automation')
  const [formData, setFormData] = useState({ name: '', email: '', details: '' })

  if (!isOpen) return null

  const timeSlots = [
    '10:00 AM (Morning Slot)',
    '01:30 PM (Afternoon Slot)',
    '04:00 PM (Evening Slot)',
    '07:00 PM (Late Slot)',
  ]

  const projectTypes = ['AI Automation', 'Web / SaaS App', 'Mobile App', 'n8n Workflow', 'Other']

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#FF5733', '#2563eb', '#7c3aed', '#10b981'],
    })
  }

  const resetAndClose = () => {
    setSubmitted(false)
    setFormData({ name: '', email: '', details: '' })
    onClose()
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={resetAndClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '560px',
          padding: 'clamp(20px, 4vw, 32px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          position: 'relative',
          maxHeight: '92vh',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Close Button */}
        <button
          onClick={resetAndClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: '#f1f5f9',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  background: 'rgba(255, 87, 51, 0.1)',
                  color: '#ff5733',
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '20px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}
              >
                Worldwide Availability
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
              Book a Free Strategy Call
            </h2>
            <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '20px', lineHeight: 1.5 }}>
              Select a time that works for you or share your project details to get a 4-week scope proposal.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Project Type */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Project Type
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: selectedType === type ? '2px solid #ff5733' : '1px solid #cbd5e1',
                        background: selectedType === type ? 'rgba(255, 87, 51, 0.08)' : '#f8fafc',
                        color: selectedType === type ? '#ff5733' : '#475569',
                        fontWeight: selectedType === type ? 700 : 500,
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Select Time Slot */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Preferred Strategy Call Time
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '8px' }}>
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: selectedSlot === slot ? '2px solid #2563eb' : '1px solid #cbd5e1',
                        background: selectedSlot === slot ? 'rgba(37, 99, 235, 0.06)' : '#ffffff',
                        color: selectedSlot === slot ? '#2563eb' : '#334155',
                        fontWeight: selectedSlot === slot ? 700 : 500,
                        fontSize: '12px',
                        textAlign: 'left',
                        cursor: 'pointer',
                      }}
                    >
                      🕒 {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@startup.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '4px' }}>
                  Project Brief (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us what you want to build or automate..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'none',
                  }}
                />
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #ff5733, #e11d48)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(255, 87, 51, 0.3)',
                  }}
                >
                  Confirm Strategy Call
                </button>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#475569',
                    fontWeight: 600,
                    fontSize: '13px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Calendly ↗
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
              Strategy Call Requested!
            </h3>
            <p style={{ color: '#475569', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
              Thanks, <strong>{formData.name}</strong>! We've reserved your slot for <strong>{selectedSlot}</strong> for your <strong>{selectedType}</strong> project.
              We'll send a Zoom invite & NDA to <strong>{formData.email}</strong> shortly.
            </p>
            <button
              onClick={resetAndClose}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: 'none',
                background: '#ff5733',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
