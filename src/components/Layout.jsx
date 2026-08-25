import { useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import BackgroundGlitchEffect from './BackgroundGlitchEffect'
import BookingModal from './BookingModal'
import ScrollToTop from './ScrollToTop'
import VeonDwarf from './VeonDwarf'
import { KeyboardContext } from '../context/KeyboardContext'

export default function Layout() {
  const [litKeys, setLitKeys] = useState({})
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const openBookingModal = useCallback(() => setIsBookingOpen(true), [])
  const closeBookingModal = useCallback(() => setIsBookingOpen(false), [])

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
      }}
    >
      <ScrollToTop />
      {/* ── Fixed Cozy Off-White Dot Grid Background ── */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          backgroundColor: '#FDFBF7',
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px), radial-gradient(#CBD5E1 1px, #FDFBF7 1px)',
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px',
          opacity: 0.65,
          pointerEvents: 'none',
        }}
      />

      {/* ── Ambient Falling Code Glitch Animation Layer ── */}
      <BackgroundGlitchEffect isGlitching={false} />

      {/* ── Page Content Layer ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar />
        <main style={{ flex: 1, paddingTop: '64px' }}>
          <Outlet />
        </main>
        <Footer />
      </div>

      {/* ── VEON — Persistent Dwarf Character (survives route changes) ── */}
      <VeonDwarf />

      {/* ── Global Strategy Call Booking Modal ── */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBookingModal} />
    </KeyboardContext.Provider>
  )
}

