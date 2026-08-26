import { useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import BackgroundGlitchEffect from './BackgroundGlitchEffect'
import BookingModal from './BookingModal'
import VeonChatModal from './VeonChatModal'
import ScrollToTop from './ScrollToTop'
import VeonDwarf from './VeonDwarf'
import { KeyboardContext } from '../context/KeyboardContext'

export default function Layout() {
  const [litKeys, setLitKeys] = useState({})
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const openBookingModal = useCallback(() => setIsBookingOpen(true), [])
  const closeBookingModal = useCallback(() => setIsBookingOpen(false), [])

  const openChatModal = useCallback(() => setIsChatOpen(true), [])
  const closeChatModal = useCallback(() => setIsChatOpen(false), [])

  // Dummy handlers for context compatibility
  const triggerCascade = useCallback(() => { }, [])
  const triggerWave = useCallback(() => { }, [])
  const triggerAmbient = useCallback(() => { }, [])

  return (
    <KeyboardContext.Provider
      value={{
        litKeys,
        triggerCascade,
        triggerWave,
        triggerAmbient,
        isBookingOpen,
        openBookingModal,
        closeBookingModal,
        isChatOpen,
        openChatModal,
        closeChatModal,
      }}
    >
      <ScrollToTop />

      {/* ── Original Clean Cozy Off-White Dot Grid Background ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundColor: '#FDFBF7',
          backgroundImage: 'radial-gradient(#CBD5E1 1.2px, transparent 1.2px), radial-gradient(#CBD5E1 1.2px, #FDFBF7 1.2px)',
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px',
          opacity: 0.85,
          pointerEvents: 'none',
        }}
      />

      {/* ── Global Full-Page Ambient Falling Code Layer (All Pages) ── */}
      <BackgroundGlitchEffect />

      {/* ── Top-Level Fixed Navbar ── */}
      <Navbar />

      {/* ── Page Content Layer ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '68px',
          background: 'transparent',
        }}
      >
        <main style={{ flex: 1, background: 'transparent' }}>
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* ── VEON — Persistent Dwarf Character ── */}
      <VeonDwarf />

      {/* ── Global Strategy Call Booking Modal ── */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBookingModal} />

      {/* ── VEON AI Chatbot Modal ── */}
      <VeonChatModal isOpen={isChatOpen} onClose={closeChatModal} />
    </KeyboardContext.Provider>
  )
}
