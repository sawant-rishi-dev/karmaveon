import { useState, useEffect, useRef } from 'react'
import { useKeyboardContext } from '../context/KeyboardContext'
import QRBitesProcessAnimation from '../components/QRBitesProcessAnimation'
import QRBitesBenefitsAnimation from '../components/QRBitesBenefitsAnimation'
import QRBitesAnalyticsDashboard from '../components/QRBitesAnalyticsDashboard'
import QRBitesAIFeatures from '../components/QRBitesAIFeatures'
import HeroCodeAmbiance from '../components/HeroCodeAmbiance'

export default function QRBites() {
  const { openBookingModal } = useKeyboardContext()
  const demoRef = useRef(null)
  const videoRef = useRef(null)

  // Document Title
  useEffect(() => {
    document.title = 'QR Bites – Smart Ordering. Smarter Restaurants.'
  }, [])

  // Auto-play / pause video ONLY when in view on this page
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => { })
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.15 }
    )

    observer.observe(video)

    return () => {
      if (video) {
        video.pause()
        observer.unobserve(video)
      }
    }
  }, [])

  // Interactive Demo State
  const [userName, setUserName] = useState('Guest')
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [orderSent, setOrderSent] = useState(false)

  const foodItems = [
    { id: 1, name: 'Margherita Pizza', price: '₹249', category: 'Pizzas', icon: '🍕' },
    { id: 2, name: 'Classic Burger', price: '₹199', category: 'Burgers', icon: '🍔' },
    { id: 3, name: 'Alfredo Pasta', price: '₹229', category: 'Pasta', icon: '🍜' },
    { id: 4, name: 'Cold Coffee', price: '₹149', category: 'Drinks', icon: '🥤' },
  ]

  const filteredItems =
    activeCategory === 'All'
      ? foodItems
      : foodItems.filter((item) => item.category === activeCategory)

  const addToCart = (item) => {
    setCart((prev) => [...prev, item])
  }

  const handlePlaceOrder = () => {
    if (cart.length === 0) return
    setOrderSent(true)
    setTimeout(() => {
      setOrderSent(false)
      setCart([])
    }, 4500)
  }

  const scrollToDemo = () => {
    if (demoRef.current) {
      demoRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'transparent', color: '#0f172a', paddingBottom: '120px' }}>

      {/* ── SECTION 1: HERO ── */}
      <section
        style={{
          width: '100%',
          padding: '80px 24px 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px -15px rgba(28, 25, 23, 0.07)',
          borderBottom: '1px solid rgba(203, 213, 225, 0.6)',
          marginBottom: '40px',
        }}
      >
        <HeroCodeAmbiance preset="qrbites" />

        <div style={{ maxWidth: '960px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 87, 51, 0.08)',
              border: '1px solid rgba(255, 87, 51, 0.25)',
              borderRadius: '100px',
              padding: '6px 18px',
              marginBottom: '24px',
              fontSize: '12px',
              color: '#ff5733',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontWeight: 800,
            }}
          >
            <span>🍕 NEXT-GEN TABLETOP ORDERING</span>
          </div>

        <h1
          style={{
            fontSize: 'clamp(44px, 7vw, 76px)',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-1.5px',
            marginBottom: '20px',
            color: '#0f172a',
          }}
        >
          Scan. Order. <span className="gradient-text">Bite.</span>
        </h1>

        <p
          style={{
            fontSize: 'clamp(18px, 2.5vw, 22px)',
            fontWeight: 700,
            color: '#334155',
            maxWidth: '780px',
            margin: '0 auto 16px',
            lineHeight: 1.4,
          }}
        >
          Your table is no longer just a table. It's the gateway to your entire dining experience.
        </p>

        <p
          style={{
            fontSize: '16px',
            color: '#64748b',
            maxWidth: '620px',
            margin: '0 auto 36px',
            lineHeight: 1.6,
          }}
        >
          No waiters. No physical menus. No confusion. Just scan, browse, order, pay, and enjoy.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={scrollToDemo}
            className="btn-glow"
            style={{
              padding: '16px 36px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              color: '#ffffff',
            }}
          >
            🍕 Try the Live Demo
          </button>
          <button
            onClick={openBookingModal}
            className="btn-outline"
            style={{
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Start 15-Day Free Trial →
          </button>
        </div>
        </div>
      </section>

      {/* ── SECTION 2: EXPERIENCE IT YOURSELF (INTERACTIVE DEMO) ── */}
      <section
        ref={demoRef}
        style={{
          maxWidth: '1100px',
          margin: '0 auto 100px',
          padding: '0 24px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: '#2563eb', fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Interactive Demo
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#0f172a', marginTop: '8px' }}>
            Don't read about it. Experience it.
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>
            Scan the QR below or use the demo to see how your customers will order.
          </p>
        </div>

        {/* 2-Column Grid: Video Showcase & Interactive Sandbox */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '36px',
            alignItems: 'center',
          }}
        >
          {/* Video Showcase Card */}
          <div
            style={{
              background: '#0f172a',
              borderRadius: '28px',
              border: '2px solid rgba(255, 87, 51, 0.3)',
              padding: '24px',
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Header Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5733', boxShadow: '0 0 8px #ff5733' }} />
                <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  🎥 Live Product Demo
                </span>
              </div>
              <span style={{ color: '#94a3b8', fontSize: '11px', background: 'rgba(255,255,255,0.08)', padding: '3px 10px', borderRadius: '12px', fontWeight: 600 }}>
                HD Loop
              </span>
            </div>

            {/* Video Player */}
            <video
              ref={videoRef}
              src="/QR_bites.mp4"
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                width: '100%',
                borderRadius: '18px',
                display: 'block',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              }}
            />
          </div>

          {/* Demo Box UI */}
          <div
            style={{
              maxWidth: '440px',
              margin: '0 auto',
              width: '100%',
              background: '#ffffff',
              borderRadius: '32px',
              border: '8px solid #0f172a',
              boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.25)',
              overflow: 'hidden',
            }}
          >
            {/* Top Bar */}
            <div style={{ background: '#0f172a', padding: '18px 20px', color: '#ffffff' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '0.5px', color: '#ff5733' }}>
                  📍 QR Bites
                </div>
                <div style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '3px 8px', borderRadius: '12px', fontWeight: 700 }}>
                  ● Table 07 Active
                </div>
              </div>
              <div style={{ marginTop: '12px', fontSize: '18px', fontWeight: 800 }}>
                Good Evening, <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '6px',
                    color: '#ffffff',
                    padding: '2px 8px',
                    fontSize: '16px',
                    fontWeight: 700,
                    width: '110px',
                    outline: 'none',
                  }}
                /> 👋
              </div>
              <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
                What are you craving?
              </div>
            </div>

            {/* Category Filters */}
            <div style={{ padding: '16px 16px 8px', display: 'flex', gap: '8px', overflowX: 'auto' }}>
              {['All', 'Pizzas', 'Burgers', 'Pasta', 'Drinks'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    border: activeCategory === cat ? 'none' : '1px solid #e2e8f0',
                    background: activeCategory === cat ? '#ff5733' : '#f8fafc',
                    color: activeCategory === cat ? '#ffffff' : '#475569',
                    fontSize: '12px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat === 'All' ? '🍽️ All' : cat === 'Pizzas' ? '🍕 Pizzas' : cat === 'Burgers' ? '🍔 Burgers' : cat === 'Pasta' ? '🍜 Pasta' : '🥤 Drinks'}
                </button>
              ))}
            </div>

            {/* Food Cards */}
            <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredItems.map((food) => (
                <div
                  key={food.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 14px',
                    borderRadius: '14px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '26px' }}>{food.icon}</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a' }}>{food.name}</div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#ff5733' }}>{food.price}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(food)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#2563eb',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>

            {/* Success Banner or Bottom Place Order Button */}
            <div style={{ padding: '16px', background: '#ffffff', borderTop: '1px solid #f1f5f9' }}>
              {orderSent ? (
                <div
                  style={{
                    background: '#dcfce7',
                    border: '1px solid #86efac',
                    color: '#166534',
                    padding: '14px',
                    borderRadius: '12px',
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: '14px',
                  }}
                >
                  ✅ Order sent to Kitchen! (Table 07)
                </div>
              ) : (
                <button
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '12px',
                    border: 'none',
                    background: cart.length > 0 ? 'linear-gradient(135deg, #10b981, #059669)' : '#cbd5e1',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '15px',
                    cursor: cart.length > 0 ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: cart.length > 0 ? '0 4px 14px rgba(16, 185, 129, 0.3)' : 'none',
                  }}
                >
                  <span>🚀 Place Order ({cart.length} items)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: HOW QR BITES WORKS ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255, 87, 51, 0.08)',
              border: '1px solid rgba(255, 87, 51, 0.25)',
              borderRadius: '100px',
              padding: '6px 18px',
              marginBottom: '16px',
              fontSize: '12px',
              color: '#ff5733',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontWeight: 800,
            }}
          >
            <span>⚡ FULL LIFECYCLE WORKFLOW</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#0f172a' }}>
            How QR Bites Works
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>
            A seamless 6-step ordering flow engineered for speed, zero friction, and high turnover.
          </p>
        </div>

        {/* Dynamic Animated 6-Step Workflow */}
        <QRBitesProcessAnimation />
      </section>

      {/* ── SECTION 4: THE QR BITES SYSTEM (CUSTOMER VS KITCHEN SPLIT) ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#0f172a' }}>
            From Customer to Kitchen in 2 Seconds.
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          {/* Left Column (Customer Side) */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '2px solid #2563eb',
              padding: '36px 30px',
              boxShadow: '0 12px 30px rgba(37, 99, 235, 0.08)',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#2563eb', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              📱 CUSTOMER SIDE
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginBottom: '14px' }}>
              Instant Table Ordering
            </h3>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7 }}>
              Customer scans QR, browses the menu, and places the order directly from their phone. No waiting for a waiter.
            </p>
          </div>

          {/* Central Connector */}
          <div style={{ textAlign: 'center', padding: '12px' }}>
            <div
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #ff5733, #e11d48)',
                color: '#ffffff',
                padding: '14px 24px',
                borderRadius: '100px',
                fontWeight: 900,
                fontSize: '13px',
                letterSpacing: '0.5px',
                boxShadow: '0 8px 24px rgba(255, 87, 51, 0.3)',
              }}
            >
              ⚡ Real-time Sync via QR Bites Cloud
            </div>
          </div>

          {/* Right Column (Kitchen Side) */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '2px solid #10b981',
              padding: '36px 30px',
              boxShadow: '0 12px 30px rgba(16, 185, 129, 0.08)',
            }}
          >
            <div style={{ fontSize: '12px', fontWeight: 900, color: '#10b981', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
              👨‍🍳 KITCHEN SIDE
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', marginBottom: '14px' }}>
              Live KDS Display Alert
            </h3>
            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.7 }}>
              Kitchen receives a live notification with the order items and table number. Accept, prepare, and update status instantly.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: AI-POWERED ANALYTICS DASHBOARD ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ color: '#7c3aed', fontSize: '12px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Smart Insights
          </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#0f172a', marginTop: '8px' }}>
            AI-Powered Insights for Smarter Restaurants
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>
            Stop guessing. Know exactly what sells, when it sells, and how to prepare better.
          </p>
        </div>

        {/* Dynamic Animated AI Features Cards */}
        <div style={{ marginBottom: '36px' }}>
          <QRBitesAIFeatures />
        </div>

        {/* Interactive Live Jumping Analytics Dashboard */}
        <QRBitesAnalyticsDashboard />
      </section>

      {/* ── SECTION 6: BENEFITS FOR YOUR RESTAURANT ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 100px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.25)',
              borderRadius: '100px',
              padding: '6px 18px',
              marginBottom: '16px',
              fontSize: '12px',
              color: '#2563eb',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontWeight: 800,
            }}
          >
            <span>📈 BUSINESS IMPACT & ROI</span>
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#0f172a' }}>
            Why Restaurant Owners Love QR Bites
          </h2>
          <p style={{ color: '#64748b', fontSize: '16px', marginTop: '8px' }}>
            Built specifically to reduce operational overhead, eliminate human errors, and increase profitability.
          </p>
        </div>

        {/* Dynamic Animated 5 Benefits Showcase */}
        <QRBitesBenefitsAnimation />
      </section>

      {/* ── SECTION 7: PRICING & FINAL CALL-TO-ACTION ── */}
      <section style={{ maxWidth: '900px', margin: '0 auto 100px', padding: '0 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>
          Ready to Digitize Your Restaurant?
        </h2>
        <p style={{ color: '#475569', fontSize: '18px', marginBottom: '40px' }}>
          Join 50+ restaurants already using QR Bites to automate their ordering process.
        </p>

        {/* Pricing Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
            border: '2px solid #ff5733',
            borderRadius: '28px',
            padding: '44px 32px',
            boxShadow: '0 20px 50px rgba(255, 87, 51, 0.12)',
            maxWidth: '520px',
            margin: '0 auto',
          }}
        >
          <div style={{ fontSize: '14px', fontWeight: 900, color: '#ff5733', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
            💎 15-DAY FREE TRIAL
          </div>
          <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
            No credit card required. Cancel anytime.
          </div>
          <div style={{ fontSize: '40px', fontWeight: 900, color: '#0f172a', marginBottom: '24px' }}>
            ₹2999<span style={{ fontSize: '18px', color: '#64748b', fontWeight: 600 }}>/month</span>
            <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500 }}>(or $12/month international)</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left', marginBottom: '32px' }}>
            <div style={{ fontSize: '14px', color: '#334155', fontWeight: 700 }}>✅ Unlimited orders</div>
            <div style={{ fontSize: '14px', color: '#334155', fontWeight: 700 }}>✅ Real-time kitchen updates</div>
            <div style={{ fontSize: '14px', color: '#334155', fontWeight: 700 }}>✅ AI analytics & insights</div>
            <div style={{ fontSize: '14px', color: '#334155', fontWeight: 700 }}>✅ Priority email support</div>
          </div>

          <button
            onClick={openBookingModal}
            className="btn-glow"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              color: '#ffffff',
            }}
          >
            🚀 Start Your Free Trial Today
          </button>
        </div>
      </section>

      {/* ── SECTION 8: CONTACT / FOOTER (TIE-IN TO KARMAVEON) ── */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '60px 24px 0',
          borderTop: '1px solid #e2e8f0',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', marginBottom: '12px' }}>
          Have Questions? Let's Talk.
        </h2>
        <p style={{ color: '#475569', fontSize: '16px', maxWidth: '600px', margin: '0 auto 32px', lineHeight: 1.6 }}>
          We build QR Bites. We also build custom SaaS, AI, and mobile apps for businesses like yours.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            fontSize: '15px',
            fontWeight: 700,
            color: '#0f172a',
            marginBottom: '40px',
          }}
        >
          <a href="mailto:karmaaveontechnologies@gmail.com" style={{ textDecoration: 'none', color: '#2563eb' }}>
            📧 Email: contact@karmaveontechnologies.in
          </a>
          <a href="tel:+918237815495" style={{ textDecoration: 'none', color: '#2563eb' }}>
            📞 Phone: +91 82378 15495
          </a>
          <span style={{ color: '#64748b' }}>📍 Built with ❤️ by Karmaveon Technologies</span>
        </div>

        {/* Footer Trust Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
          <span>🔒 Full IP Ownership – You own everything.</span>
          <span>🛡️ 100% Data Security – Encrypted cloud storage.</span>
          <span>🌍 Made for India, Built for the World.</span>
        </div>
      </section>

    </div>
  )
}
