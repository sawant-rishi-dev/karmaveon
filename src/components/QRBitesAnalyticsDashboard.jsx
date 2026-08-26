import React, { useState, useEffect, useRef } from 'react'

/**
 * Animated Number Counter Hook that animates number counting & trigger jump pop effect
 */
function useAnimatedNumber(targetValue, duration = 1200) {
  const [displayValue, setDisplayValue] = useState(targetValue)
  const prevTargetRef = useRef(targetValue)

  useEffect(() => {
    const startValue = prevTargetRef.current
    const endValue = targetValue
    prevTargetRef.current = targetValue

    if (startValue === endValue) return

    const startTime = performance.now()

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(startValue + (endValue - startValue) * easeOut)
      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        setDisplayValue(endValue)
      }
    }

    const animFrame = requestAnimationFrame(updateCounter)
    return () => cancelAnimationFrame(animFrame)
  }, [targetValue, duration])

  return displayValue
}

export default function QRBitesAnalyticsDashboard() {
  // Live KPI state
  const [sales, setSales] = useState(42580)
  const [orders, setOrders] = useState(184)
  const [tables, setTables] = useState(23)
  const [recentBump, setRecentBump] = useState(null) // for "+₹249" floating pop
  const [jumpingMetric, setJumpingMetric] = useState(null)
  const [activeDishKey, setActiveDishKey] = useState('pizza')

  // Live Orders queue
  const [liveOrders, setLiveOrders] = useState([
    { id: 1, table: 'Table 04', status: 'Preparing', tagColor: '#f59e0b', item: '🍕 Margherita Pizza' },
    { id: 2, table: 'Table 08', status: 'Ready', tagColor: '#10b981', item: '🍔 Veg Burger x2' },
    { id: 3, table: 'Table 12', status: 'New Order', tagColor: '#3b82f6', item: '🍝 Alfredo Pasta' },
    { id: 4, table: 'Table 17', status: 'Served', tagColor: '#8b5cf6', item: '☕ Cold Coffee x3' },
  ])

  // Best selling dishes live counts
  const [dishOrders, setDishOrders] = useState({
    pizza: 320,
    burger: 245,
    pasta: 189,
    coffee: 120,
  })

  // Animated counters
  const animatedSales = useAnimatedNumber(sales, 1000)
  const animatedOrders = useAnimatedNumber(orders, 800)
  const animatedAvgOrder = Math.round(animatedSales / (animatedOrders || 1))

  // Live simulation ticker: periodically jump metrics as new orders stream in
  useEffect(() => {
    const dishes = [
      { key: 'pizza', name: '🍕 Margherita Pizza', price: 249 },
      { key: 'burger', name: '🍔 Veg Burger', price: 199 },
      { key: 'pasta', name: '🍝 Alfredo Pasta', price: 229 },
      { key: 'coffee', name: '☕ Cold Coffee', price: 149 },
    ]

    const interval = setInterval(() => {
      const randomDish = dishes[Math.floor(Math.random() * dishes.length)]
      const randomTableNum = Math.floor(Math.random() * 20) + 1
      const tableStr = `Table ${randomTableNum < 10 ? '0' + randomTableNum : randomTableNum}`

      setActiveDishKey(randomDish.key)

      // Bump sales and orders
      setSales((prev) => prev + randomDish.price)
      setOrders((prev) => prev + 1)
      setTables(Math.floor(Math.random() * 6) + 21) // 21 to 26 active tables

      // Bump specific dish
      setDishOrders((prev) => ({
        ...prev,
        [randomDish.key]: prev[randomDish.key] + 1,
      }))

      // Trigger floating jump badge
      setRecentBump(`+₹${randomDish.price}`)
      setJumpingMetric('sales')

      setTimeout(() => {
        setJumpingMetric(null)
      }, 700)

      setTimeout(() => {
        setRecentBump(null)
      }, 2200)

      // Add new live order to stream
      setLiveOrders((prev) => [
        {
          id: Date.now(),
          table: tableStr,
          status: 'New Order',
          tagColor: '#3b82f6',
          item: randomDish.name,
        },
        ...prev.slice(0, 3),
      ])
    }, 3800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        background: '#0f172a',
        borderRadius: '28px',
        padding: '36px 28px',
        color: '#ffffff',
        boxShadow: '0 25px 60px rgba(15, 23, 42, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
        marginBottom: '40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header bar: Live Indicator & Real-Time Sync */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '28px',
          paddingBottom: '18px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 12px #10b981',
              animation: 'pulseDot 1s infinite alternate',
            }}
          />
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#38bdf8', letterSpacing: '1px', textTransform: 'uppercase' }}>
            ⚡ Live POS & Kitchen Stream Active
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Animated Equalizer Soundwave / Activity Bars */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '18px' }}>
            {[0.6, 1.2, 0.8, 1.5, 0.9, 1.3].map((delay, i) => (
              <span
                key={i}
                style={{
                  width: '3px',
                  height: '100%',
                  background: '#38bdf8',
                  borderRadius: '2px',
                  transformOrigin: 'bottom',
                  animation: `barEqualizer ${delay}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>

          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              background: 'rgba(255, 87, 51, 0.15)',
              color: '#ff5733',
              border: '1px solid rgba(255, 87, 51, 0.3)',
              padding: '4px 12px',
              borderRadius: '100px',
            }}
          >
            Auto-Sync: Live
          </span>
        </div>
      </div>

      {/* Top 4 Dashboard Metric Cards with Jumping / Counting Numbers */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {/* Metric 1: Today's Sales */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: `1.5px solid ${jumpingMetric === 'sales' ? 'rgba(52, 211, 153, 0.6)' : 'rgba(255, 255, 255, 0.08)'}`,
            borderRadius: '20px',
            padding: '22px 20px',
            position: 'relative',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: jumpingMetric === 'sales' ? 'scale(1.05) translateY(-4px)' : 'scale(1)',
            boxShadow: jumpingMetric === 'sales' ? '0 12px 30px rgba(52, 211, 153, 0.25)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Today's Sales</span>
            <span style={{ fontSize: '20px' }}>📈</span>
          </div>

          <div
            style={{
              fontSize: 'clamp(24px, 3vw, 30px)',
              fontWeight: 900,
              color: '#34d399',
              letterSpacing: '-0.5px',
              display: 'flex',
              alignItems: 'baseline',
              gap: '6px',
            }}
          >
            <span>₹{animatedSales.toLocaleString()}</span>
          </div>

          {/* Floating jumping popup badge */}
          {recentBump && (
            <div
              style={{
                position: 'absolute',
                top: '12px',
                right: '16px',
                background: '#10b981',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 900,
                padding: '2px 8px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                animation: 'fadeIn 0.3s ease forwards',
              }}
            >
              {recentBump} ↗
            </div>
          )}
        </div>

        {/* Metric 2: Total Orders */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: `1.5px solid ${jumpingMetric === 'sales' ? 'rgba(96, 165, 250, 0.6)' : 'rgba(255, 255, 255, 0.08)'}`,
            borderRadius: '20px',
            padding: '22px 20px',
            position: 'relative',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transform: jumpingMetric === 'sales' ? 'scale(1.04) translateY(-3px)' : 'scale(1)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Total Orders</span>
            <span style={{ fontSize: '20px' }}>📊</span>
          </div>

          <div
            style={{
              fontSize: 'clamp(24px, 3vw, 30px)',
              fontWeight: 900,
              color: '#60a5fa',
              letterSpacing: '-0.5px',
            }}
          >
            {animatedOrders}
          </div>
        </div>

        {/* Metric 3: Active Tables */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1.5px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '22px 20px',
            position: 'relative',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Active Tables</span>
            <span style={{ fontSize: '20px' }}>🪑</span>
          </div>

          <div
            style={{
              fontSize: 'clamp(24px, 3vw, 30px)',
              fontWeight: 900,
              color: '#fbbf24',
              letterSpacing: '-0.5px',
            }}
          >
            {tables}
          </div>
        </div>

        {/* Metric 4: Avg. Order Value */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1.5px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '22px 20px',
            position: 'relative',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>Avg. Order Value</span>
            <span style={{ fontSize: '20px' }}>💰</span>
          </div>

          <div
            style={{
              fontSize: 'clamp(24px, 3vw, 30px)',
              fontWeight: 900,
              color: '#f472b6',
              letterSpacing: '-0.5px',
            }}
          >
            ₹{animatedAvgOrder}
          </div>
        </div>
      </div>

      {/* Live Orders & Best Selling Dishes Split */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '24px',
        }}
      >
        {/* Left: Live Orders Status Stream */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '18px',
            }}
          >
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>⚡</span>
              <span>Live Orders Status Updates</span>
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8', background: 'rgba(255,255,255,0.06)', padding: '2px 8px', borderRadius: '6px' }}>
              Real-Time
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {liveOrders.map((ord, idx) => (
              <div
                key={ord.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: idx === 0 ? 'rgba(56, 189, 248, 0.08)' : 'rgba(255, 255, 255, 0.04)',
                  border: `1px solid ${idx === 0 ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  animation: idx === 0 ? 'fadeIn 0.4s ease forwards' : 'none',
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: '14px', color: '#ffffff' }}>{ord.table}</div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{ord.item}</div>
                </div>

                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: ord.tagColor,
                    background: `${ord.tagColor}22`,
                    border: `1px solid ${ord.tagColor}50`,
                    padding: '4px 12px',
                    borderRadius: '12px',
                    letterSpacing: '0.3px',
                  }}
                >
                  {ord.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Best Selling Dishes Animated Moving Chart */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '18px',
            }}
          >
            <div style={{ fontSize: '15px', fontWeight: 800, color: '#f472b6', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🏆</span>
              <span>Best Selling Dishes</span>
            </div>
            <span style={{ fontSize: '11px', color: '#34d399', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
              ● Live Moving Bars
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              {
                key: 'pizza',
                name: '🍕 Margherita Pizza',
                orders: dishOrders.pizza,
                max: 360,
                gradient: 'linear-gradient(90deg, #ff5733, #f472b6, #ff5733)',
                glow: '#ff5733',
              },
              {
                key: 'burger',
                name: '🍔 Veg Burger',
                orders: dishOrders.burger,
                max: 360,
                gradient: 'linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b)',
                glow: '#f59e0b',
              },
              {
                key: 'pasta',
                name: '🍝 Pasta Alfredo',
                orders: dishOrders.pasta,
                max: 360,
                gradient: 'linear-gradient(90deg, #3b82f6, #60a5fa, #3b82f6)',
                glow: '#3b82f6',
              },
              {
                key: 'coffee',
                name: '☕ Cold Coffee',
                orders: dishOrders.coffee,
                max: 360,
                gradient: 'linear-gradient(90deg, #10b981, #34d399, #10b981)',
                glow: '#10b981',
              },
            ].map((dish) => {
              const pct = Math.min(Math.round((dish.orders / dish.max) * 100), 100)
              const isHighlight = activeDishKey === dish.key

              return (
                <div key={dish.name}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '13px',
                      fontWeight: 700,
                      marginBottom: '6px',
                    }}
                  >
                    <span style={{ color: isHighlight ? '#ffffff' : '#f1f5f9', fontWeight: isHighlight ? 800 : 700 }}>
                      {dish.name}
                    </span>
                    <span
                      style={{
                        color: isHighlight ? '#ffffff' : '#38bdf8',
                        fontWeight: 800,
                        background: isHighlight ? `${dish.glow}40` : 'rgba(56, 189, 248, 0.1)',
                        border: isHighlight ? `1px solid ${dish.glow}` : 'none',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {dish.orders} orders
                    </span>
                  </div>

                  {/* Progress Bar Track */}
                  <div
                    style={{
                      height: '10px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '6px',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    {/* Animated Moving Fill Bar */}
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: dish.gradient,
                        backgroundSize: '200% 100%',
                        animation: 'barStream 3s ease infinite',
                        borderRadius: '6px',
                        transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        position: 'relative',
                        boxShadow: `0 0 12px ${dish.glow}60`,
                      }}
                    >
                      {/* Flowing Laser Light Shimmer Sweep on the bar */}
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)',
                          animation: 'barGlowSweep 2.2s linear infinite',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
