import React, { useState, useEffect, useRef } from 'react'
import { askVeonAI } from '../utils/veonAi'
import { useKeyboardContext } from '../context/KeyboardContext'

export default function VeonChatModal({ isOpen, onClose }) {
  const { openBookingModal } = useKeyboardContext()
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hey! I'm **VEON**, lead AI Software Engineer at Karmaveon. ⚡\n\nWhether you're looking to build a high-performance **Web App**, **React Native Mobile App**, **n8n Automation**, or a **Custom AI RAG Pipeline** in <4 weeks—I'm here to help architect it. What's on your mind? 🚀",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [messages, isOpen, isLoading])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const quickPrompts = [
    'What tech stack do you use?',
    'Can you launch my MVP in < 4 weeks?',
    'Tell me about n8n AI automations',
    'How does milestone pricing work?',
  ]

  const handleSend = async (textToSend) => {
    const msgText = (textToSend || input).trim()
    if (!msgText || isLoading) return

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      text: msgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    const updated = [...messages, userMsg]
    setMessages(updated)
    setInput('')
    setIsLoading(true)

    try {
      const history = updated.map((m) => ({ role: m.role, content: m.text }))
      const replyText = await askVeonAI(msgText, history)

      const botMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      console.error('Error fetching AI response:', err)
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: "I'm compiling code at the moment! ☕ Let's connect directly on a **Free Strategy Call** to map out your architecture.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // Format simple markdown (**bold**, bullet points)
  const renderFormattedText = (text) => {
    const lines = (text || '').split('\n')
    return lines.map((line, idx) => {
      // Parse **bold** with properly escaped asterisks
      const parts = line.split(/(\*\*[^*]+\*\*)/g)
      return (
        <div key={idx} style={{ marginBottom: line === '' ? '8px' : '3px' }}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} style={{ color: '#F8FAFC', fontWeight: 800 }}>
                  {part.slice(2, -2)}
                </strong>
              )
            }
            return <span key={pIdx}>{part}</span>
          })}
        </div>
      )
    })
  }

  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        padding: '24px',
        background: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '620px',
          maxHeight: 'calc(100vh - 48px)',
          background: '#090D16',
          borderRadius: '24px',
          border: '1px solid rgba(255, 87, 51, 0.35)',
          boxShadow: '0 25px 60px -15px rgba(0,0,0,0.6), 0 0 35px rgba(255, 87, 51, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
          animation: 'slideUpModal 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* ── Terminal Window Top Bar ── */}
        <div
          style={{
            padding: '14px 18px',
            background: 'linear-gradient(135deg, #1E293B, #0F172A)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Avatar + Status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #FF5733, #E11D48)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                boxShadow: '0 4px 12px rgba(255, 87, 51, 0.4)',
                position: 'relative',
              }}
            >
              🧙‍♂️
              {/* Online Pulse */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-2px',
                  right: '-2px',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#10B981',
                  border: '2px solid #090D16',
                }}
              />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>VEON</span>
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8' }}>Karmaveon AI Tech Architect</div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => {
                onClose()
                openBookingModal()
              }}
              style={{
                background: 'linear-gradient(135deg, #FF5733, #E11D48)',
                color: '#FFF',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '11.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(255, 87, 51, 0.3)',
                whiteSpace: 'nowrap',
              }}
            >
              📅 Book Call
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#94A3B8',
                width: '30px',
                height: '30px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
              }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* ── Messages Feed ── */}
        <div
          style={{
            flex: 1,
            padding: '18px 16px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            background: 'radial-gradient(ellipse at top, #0F172A 0%, #090D16 80%)',
          }}
        >
          {messages.map((m) => {
            const isUser = m.role === 'user'
            return (
              <div
                key={m.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isUser ? 'flex-end' : 'flex-start',
                  gap: '4px',
                }}
              >
                <div
                  style={{
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: isUser
                      ? 'linear-gradient(135deg, #FF5733, #E11D48)'
                      : '#1E293B',
                    color: isUser ? '#FFFFFF' : '#CBD5E1',
                    fontSize: '13.5px',
                    lineHeight: 1.55,
                    boxShadow: isUser
                      ? '0 4px 14px rgba(255, 87, 51, 0.3)'
                      : '0 4px 14px rgba(0,0,0,0.3)',
                    border: isUser ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    wordBreak: 'break-word',
                  }}
                >
                  {renderFormattedText(m.text)}
                </div>
                <span style={{ fontSize: '10px', color: '#64748B', padding: '0 4px' }}>
                  {m.time}
                </span>
              </div>
            )
          })}

          {/* Typing indicator */}
          {isLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px' }}>
              <div style={{ fontSize: '12px', color: '#38BDF8', fontWeight: 700 }}>
                VEON is thinking
              </div>
              <div style={{ display: 'flex', gap: '3px' }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: '#38BDF8',
                      animation: 'pulseDot 1s infinite alternate',
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ── Quick Prompt Chips ── */}
        <div
          style={{
            padding: '8px 12px',
            background: '#0D131F',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
          }}
        >
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              disabled={isLoading}
              style={{
                background: 'rgba(255, 87, 51, 0.08)',
                border: '1px solid rgba(255, 87, 51, 0.25)',
                color: '#FF8A65',
                padding: '5px 11px',
                borderRadius: '100px',
                fontSize: '11px',
                fontWeight: 600,
                cursor: isLoading ? 'default' : 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* ── Chat Input Bar ── */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          style={{
            padding: '12px 14px',
            background: '#090D16',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask VEON anything about your project..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            style={{
              flex: 1,
              background: '#1E293B',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '12px',
              padding: '10px 14px',
              fontSize: '13.5px',
              color: '#F8FAFC',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#FF5733')}
            onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            style={{
              background: input.trim() && !isLoading
                ? 'linear-gradient(135deg, #FF5733, #E11D48)'
                : 'rgba(255,255,255,0.1)',
              color: '#FFF',
              border: 'none',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              cursor: input.trim() && !isLoading ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              transition: 'all 0.2s ease',
              boxShadow: input.trim() && !isLoading ? '0 4px 14px rgba(255, 87, 51, 0.35)' : 'none',
            }}
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  )
}
