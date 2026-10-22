import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import confetti from 'canvas-confetti'
import HeroCodeAmbiance from '../components/HeroCodeAmbiance'
import goaInstitutions from '../data/goaInstitutions.json'

const COURSE_CATALOGUE = [
  {
    id: 'python',
    category: 'python',
    courseNumber: '01',
    title: 'Python: Beginner to AI Maker',
    headline: 'Python: Beginner to AI & Computer Vision Developer',
    duration: 'Estimated: 4–6 months',
    flagship: true,
    badge: 'FLAGSHIP COURSE',
    icon: '🐍',
    accentColor: '#0284c7',
    borderAccent: '#38bdf8',
    gradient: 'linear-gradient(135deg, #0284c7, #2563eb)',
    marketingLine: 'From your first Python program to building AI-powered applications.',
    levels: [
      { level: 'Level 1', desc: 'Python syntax, variables, loops, functions and problem-solving.' },
      { level: 'Level 2', desc: 'OOP, files, APIs, libraries and automation.' },
      { level: 'Level 3', desc: 'NumPy, Pandas and data visualisation.' },
      { level: 'Level 4', desc: 'AI/ML fundamentals using scikit-learn.' },
      { level: 'Level 5', desc: 'OpenCV, image processing, object detection and camera-based projects.' },
    ],
    projects: [
      'AI image classifier',
      'Face detection app',
      'Object-tracking system',
      'Camera-based safety monitor',
    ],
    careerRole: 'Python Developer · AI & Computer Vision Maker',
    enrollTrackName: 'Python: Beginner to AI Maker (4–6 months)',
  },
  {
    id: 'cpp',
    category: 'cpp',
    courseNumber: '02',
    title: 'C/C++: Beginner to DSA & Embedded Developer',
    headline: 'C/C++: Beginner to Systems, DSA & Embedded Developer',
    duration: 'Estimated: 4–6 months',
    flagship: false,
    badge: 'CORE SYSTEMS & DSA',
    icon: '⚙️',
    accentColor: '#d97706',
    borderAccent: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    marketingLine: 'Master programming logic, solve problems and bring hardware to life.',
    levels: [
      { level: 'Level 1', desc: 'Variables, conditions, loops, functions and arrays.' },
      { level: 'Level 2', desc: 'Pointers, memory, structures and object-oriented programming in C++.' },
      { level: 'Level 3', desc: 'Data structures and algorithms (DSA), sorting, searching and recursion.' },
      { level: 'Level 4', desc: 'STL, complexity analysis and competitive programming.' },
      { level: 'Level 5', desc: 'Embedded C/C++, Arduino programming and hardware integration as a separate practical module.' },
    ],
    projects: [
      'Console-based games',
      'Algorithm visualiser',
      'Smart sensor system',
      'Arduino-controlled robot',
    ],
    careerRole: 'Systems C++ Coder · DSA Specialist · Embedded Developer',
    enrollTrackName: 'C/C++: Beginner to DSA & Embedded Developer (4–6 months)',
  },
  {
    id: 'java',
    category: 'java',
    courseNumber: '03',
    title: 'Java: Beginner to Backend Developer',
    headline: 'Java: Beginner to Backend & Enterprise Developer',
    duration: 'Estimated: 4–6 months',
    flagship: false,
    badge: 'ENTERPRISE BACKEND',
    icon: '☕',
    accentColor: '#dc2626',
    borderAccent: '#f87171',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)',
    marketingLine: 'Build robust applications and power real-world software with Java.',
    levels: [
      { level: 'Level 1', desc: 'Java syntax, control flow, arrays and methods.' },
      { level: 'Level 2', desc: 'OOP, interfaces, exceptions and collections.' },
      { level: 'Level 3', desc: 'Generics, streams, testing and database connectivity with JDBC.' },
      { level: 'Level 4', desc: 'SQL and relational database design.' },
      { level: 'Level 5', desc: 'REST APIs and backend development with Spring Boot.' },
    ],
    projects: [
      'Student management system',
      'Inventory API',
      'Authentication service',
      'Database-backed application',
    ],
    careerRole: 'Java Backend Developer · Spring Boot REST API Engineer',
    enrollTrackName: 'Java: Beginner to Backend Developer (4–6 months)',
  },
  {
    id: 'web',
    category: 'web',
    courseNumber: '04',
    title: 'Web Development: Beginner to Full-Stack Developer',
    headline: 'Web Development: Beginner to Full-Stack Web Developer using React',
    duration: 'Estimated: 4–6 months',
    flagship: false,
    badge: 'FULL-STACK WEB',
    icon: '🌐',
    accentColor: '#059669',
    borderAccent: '#34d399',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    marketingLine: 'Go from your first webpage to deploying a full-stack web application.',
    levels: [
      { level: 'Level 1', desc: 'HTML, CSS and responsive design.' },
      { level: 'Level 2', desc: 'JavaScript, DOM manipulation and asynchronous programming.' },
      { level: 'Level 3', desc: 'React components, hooks, routing and API integration.' },
      { level: 'Level 4', desc: 'Backend with Node.js and Express.' },
      { level: 'Level 5', desc: 'Databases, authentication, Git, deployment and production basics.' },
    ],
    projects: [
      'Portfolio website',
      'Online store',
      'Booking application',
      'Student dashboard',
    ],
    careerRole: 'Full-Stack Web Developer · React Frontend Specialist',
    enrollTrackName: 'Web Development: Beginner to Full-Stack Developer (4–6 months)',
  },
  {
    id: 'java-react',
    category: 'java-react',
    courseNumber: '05',
    title: 'Java + React: Full-Stack Application Development',
    headline: 'Java + React: Full-Stack Application Development',
    duration: 'Estimated: 6–9 months; best after programming foundations',
    flagship: false,
    badge: 'ENTERPRISE FULL-STACK INTENSIVE',
    icon: '⚛️',
    accentColor: '#7c3aed',
    borderAccent: '#a78bfa',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    marketingLine: 'Build complete web applications with React on the frontend and Java on the backend.',
    note: 'This is the combined Java and frontend course you had in mind.',
    levels: [
      { level: 'Level 1', desc: 'Java and object-oriented programming.' },
      { level: 'Level 2', desc: 'SQL and database modelling.' },
      { level: 'Level 3', desc: 'Spring Boot backend and REST APIs.' },
      { level: 'Level 4', desc: 'HTML, CSS, JavaScript and React frontend.' },
      { level: 'Level 5', desc: 'Connect frontend to backend, authentication, testing and deployment.' },
    ],
    projects: [
      'College portal',
      'E-commerce platform',
      'Course management system',
      'Admin dashboard',
    ],
    careerRole: 'Full-Stack Java + React Engineer',
    enrollTrackName: 'Java + React: Full-Stack Application Development (6–9 months)',
  },
]

export default function Classes() {
  // ── SEO & Meta Tag Injection ──────────────────────────────────────────────
  useEffect(() => {
    const originalTitle = document.title
    document.title = 'Karmaveon Classes — Learn to Code. Build to Innovate.'

    // Set meta description
    let metaDesc = document.querySelector('meta[name="description"]')
    const originalDesc = metaDesc ? metaDesc.getAttribute('content') : ''
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        "Practical coding, robotics & technology education in Vasco da Gama, Goa. Junior Track (Grade 5–10) and Senior Track (Grade 11+). ₹1,599 course fee, beginner's kit included. Admissions open for Batch 01."
      )
    }

    // Set canonical link
    let canonical = document.querySelector('link[rel="canonical"]')
    let createdCanonical = false
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
      createdCanonical = true
    }
    canonical.setAttribute('href', 'https://www.karmaveontechnologies.in/classes')

    // Open Graph Tags
    const setMeta = (property, content) => {
      let el = document.querySelector(`meta[property="${property}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute('property', property)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('og:title', 'Karmaveon Classes — Learn to Code. Build to Innovate.')
    setMeta(
      'og:description',
      "Practical coding, robotics & technology education in Vasco da Gama, Goa. Junior Track (Grade 5–10) and Senior Track (Grade 11+). ₹1,599 course fee, beginner's kit included. Admissions open for Batch 01."
    )
    setMeta('og:url', 'https://www.karmaveontechnologies.in/classes')
    setMeta('og:type', 'website')
    setMeta('og:image', 'https://www.karmaveontechnologies.in/karmaveon-logo.png')

    return () => {
      document.title = originalTitle
      if (metaDesc && originalDesc) metaDesc.setAttribute('content', originalDesc)
      if (createdCanonical && canonical.parentNode) canonical.parentNode.removeChild(canonical)
    }
  }, [])

  const location = useLocation()
  const [showStickyJoin, setShowStickyJoin] = useState(false)
  const [courseFilter, setCourseFilter] = useState('all')
  const [trackCategory, setTrackCategory] = useState('coding') // 'coding' | 'robotics'
  const [isManualInstitution, setIsManualInstitution] = useState(false)

  // Auto-scroll to #enroll or #catalogue if hash exists or changes
  useEffect(() => {
    if (location.hash === '#enroll' || location.hash === '#catalogue') {
      const timer = setTimeout(() => {
        const targetEl = document.getElementById(location.hash.slice(1))
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [location.hash])

  // Scroll listener for sticky floating "Join Now" CTA button
  useEffect(() => {
    const handleScroll = () => {
      const enrollEl = document.getElementById('enroll')
      const enrollTop = enrollEl ? enrollEl.getBoundingClientRect().top : 99999
      setShowStickyJoin(window.scrollY > 350 && enrollTop > 200)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Enrollment Form State ─────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    studentName: '',
    birthDate: '',
    track: 'Junior Track (Grade 5 — 10)',
    institutionType: 'School', // 'School' | 'College'
    grade: 'Grade 8',
    schoolName: '',
    address: '',
    parentName: '',
    phone: '',
    email: '',
    trialDate: '',
    message: '',
  })

  const [phoneError, setPhoneError] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate Date bounds: today to today + 14 days
  const todayStr = new Date().toISOString().split('T')[0]
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 14)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      // Auto-strip non-digits and limit to 10 digits
      const digits = value.replace(/\D/g, '').slice(0, 10)
      setFormData((prev) => ({ ...prev, phone: digits }))
      if (digits.length === 10) {
        setPhoneError('')
      }
    } else if (name === 'institutionType') {
      const isCollege = value === 'College'
      setFormData((prev) => ({
        ...prev,
        institutionType: value,
        grade: isCollege ? '1st Year (FY)' : 'Grade 8',
        track: isCollege ? 'Senior Track (Grade 11 & above)' : prev.track,
        schoolName: '',
      }))
      setIsManualInstitution(false)
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    // Validate phone number
    const cleanPhone = formData.phone.replace(/\D/g, '')
    if (cleanPhone.length !== 10) {
      setPhoneError('Please enter a valid 10-digit mobile number')
      return
    }
    setPhoneError('')
    setIsSubmitting(true)

    const payload = {
      ...formData,
      fullPhone: `+91${cleanPhone}`,
      submittedAt: new Date().toISOString(),
    }

    try {
      // 1. Post to backend endpoint /api/classes/enroll (or fallback)
      await fetch('/api/classes/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch((err) => {
        // Fallback gracefully if mock server or client-only
        console.warn('API endpoint not responding, saving to local store:', err)
      })

      // 2. Persist locally so client inquiry is never lost
      const existing = JSON.parse(localStorage.getItem('karmaveon_classes_enrollments') || '[]')
      existing.push(payload)
      localStorage.setItem('karmaveon_classes_enrollments', JSON.stringify(existing))

      // 3. Trigger celebratory confetti
      confetti({
        particleCount: 110,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#d97706', '#ff5733', '#10b981', '#2563eb'],
      })

      setFormSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToEnroll = (selectedTrack) => {
    if (selectedTrack) {
      setFormData((prev) => ({ ...prev, track: selectedTrack }))
      if (selectedTrack.includes('Track (Grade')) {
        setTrackCategory('robotics')
      } else {
        setTrackCategory('coding')
      }
    }
    const enrollEl = document.getElementById('enroll')
    if (enrollEl) {
      enrollEl.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Generate pre-filled WhatsApp link with inquiry summary
  const getWhatsAppSubmissionLink = () => {
    const text = encodeURIComponent(
      `Hi Karmaveon Classes! I submitted an enrollment request for Batch 01.\n` +
      `• Student: ${formData.studentName || 'Student'}\n` +
      (formData.birthDate ? `• Date of Birth: ${formData.birthDate}\n` : '') +
      `• Level: ${formData.institutionType}\n` +
      `• Grade/Year: ${formData.grade}\n` +
      `• ${formData.institutionType === 'College' ? 'College' : 'School'}: ${formData.schoolName}\n` +
      `• Track: ${formData.track}\n` +
      `• Parent Phone: +91 ${formData.phone}`
    )
    return `https://wa.me/917219570353?text=${text}`
  }

  return (
    <div style={{ position: 'relative', color: '#0f172a', background: 'transparent' }}>
      {/* ── 1. HERO SECTION ─────────────────────────────────────────────────── */}
      <section
        style={{
          width: '100%',
          padding: '60px 20px 50px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 40px -15px rgba(28, 25, 23, 0.07)',
          borderBottom: '1px solid rgba(203, 213, 225, 0.6)',
          zIndex: 10,
        }}
      >
        <HeroCodeAmbiance preset="classes" />

        <div style={{ maxWidth: '1050px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Top Bar: Eyebrow + Live Status Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                letterSpacing: '2px',
                color: '#d97706',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                padding: '5px 12px',
                borderRadius: '6px',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
              }}
            >
              AN INITIATIVE OF KARMAVEON TECHNOLOGIES
            </span>

            {/* Small status badge (top-right of hero) */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '100px',
                padding: '5px 14px',
                fontSize: '11px',
                color: '#0f172a',
                letterSpacing: '0.5px',
                fontWeight: 800,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 10px #10b981',
                  flexShrink: 0,
                }}
              />
              <span>Admissions Open — Batch 01</span>
            </div>
          </div>

          {/* Page H1 */}
          <h1
            style={{
              fontSize: 'clamp(34px, 5.5vw, 62px)',
              fontWeight: 900,
              letterSpacing: '-1.5px',
              lineHeight: 1.08,
              color: '#0f172a',
              marginBottom: '12px',
              fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
            }}
          >
            Karmaveon Classes
          </h1>

          {/* Subhead under H1 */}
          <h2
            style={{
              fontSize: 'clamp(19px, 3vw, 28px)',
              fontWeight: 800,
              letterSpacing: '-0.5px',
              background: 'linear-gradient(135deg, #d97706 0%, #ea580c 50%, #dc2626 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '18px',
              fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
            }}
          >
            Learn to Code. Build to Innovate.
          </h2>

          {/* Supporting line */}
          <p
            style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              color: '#475569',
              fontWeight: 500,
              lineHeight: 1.65,
              maxWidth: '740px',
              margin: '0 auto 30px',
              padding: '0 10px',
            }}
          >
            Practical coding, robotics & technology education for school and college students in Vasco da Gama, Goa.
          </p>

          {/* Primary & Secondary Hero CTAs */}
          <div
            className="mobile-stack"
            style={{
              display: 'flex',
              gap: '14px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: '560px',
              margin: '0 auto 28px',
            }}
          >
            <button
              onClick={() => scrollToEnroll()}
              className="btn-glow"
              style={{
                padding: '15px 30px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                color: '#ffffff',
                boxShadow: '0 8px 24px rgba(245, 158, 11, 0.45)',
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                minHeight: '48px',
                transition: 'all 0.2s ease',
              }}
            >
              <span>Reserve Your Trial Class</span>
              <span style={{ fontSize: '17px' }}>↓</span>
            </button>

            <a
              href="https://wa.me/917219570353"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <button
                className="btn-outline"
                style={{
                  padding: '15px 24px',
                  borderRadius: '12px',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  border: '1.5px solid #cbd5e1',
                  color: '#0f172a',
                  background: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  minHeight: '48px',
                }}
              >
                <span style={{ color: '#25D366', fontSize: '18px' }}>💬</span>
                <span>WhatsApp Us</span>
              </button>
            </a>
          </div>

          {/* Value Callouts Bar */}
          <div
            style={{
              fontSize: '12px',
              color: '#64748b',
              fontFamily: 'monospace',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              padding: '0 12px',
              lineHeight: 1.8,
            }}
          >
            <span>⚡ ₹1,599 COURSE FEE</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span>📦 ₹999 BEGINNER'S KIT INCLUDED</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span>📍 KARMA EMPRESS, VASCO</span>
            <span style={{ opacity: 0.5 }}>•</span>
            <span>👥 10–12 SEATS PER COHORT</span>
          </div>

          {/* Quick Jump to Complete Coding Catalogue */}
          <div style={{ marginTop: '22px' }}>
            <a
              href="#catalogue"
              onClick={(e) => {
                e.preventDefault()
                const catEl = document.getElementById('catalogue')
                if (catEl) catEl.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                borderRadius: '100px',
                background: 'rgba(2, 132, 199, 0.08)',
                border: '1.5px solid rgba(2, 132, 199, 0.3)',
                color: '#0284c7',
                fontSize: '13px',
                fontWeight: 800,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
            >
              <span>💻 Looking for Coding Classes? Explore 5 Complete Tracks (Python, C/C++, Java, React)</span>
              <span style={{ fontSize: '15px' }}>↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. WHAT IT IS SECTION ───────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '65px 20px 45px',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '20px',
            border: '1.5px solid #e2e8f0',
            padding: 'clamp(24px, 4vw, 40px)',
            boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Accent Glow */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '6px',
              height: '100%',
              background: 'linear-gradient(180deg, #f59e0b, #ea580c)',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                color: '#d97706',
                fontFamily: 'monospace',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              [WHAT IT IS]
            </span>
          </div>

          <h3
            style={{
              fontSize: 'clamp(20px, 2.8vw, 28px)',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.5px',
              marginBottom: '16px',
              lineHeight: 1.3,
            }}
          >
            Built by Engineers. Taught to Future Builders.
          </h3>

          <p
            style={{
              fontSize: 'clamp(15px, 1.8vw, 17px)',
              color: '#334155',
              lineHeight: 1.75,
              margin: 0,
              fontWeight: 450,
            }}
          >
            Karmaveon Classes is the educational initiative of Karmaveon Technologies — a Goa-based engineering shop building web platforms, AI automations, and embedded hardware. We took the same tools our engineers use in production and turned them into a learn-by-building curriculum for school and college students. Every concept is taught by building first; every student receives a beginner's kit on day one; every batch is mentored toward a real hackathon entry by the end of the course.
          </p>
        </div>
      </section>

      {/* ── 3. TWO TRACKS SECTION ───────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '40px 20px 65px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span
            style={{
              color: '#d97706',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 900,
              fontFamily: 'monospace',
            }}
          >
            [CURRICULUM STREAMS]
          </span>
          <h2
            style={{
              fontSize: 'clamp(24px, 3.8vw, 38px)',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.8px',
              marginTop: '6px',
            }}
          >
            Tailored Tracks for School & College
          </h2>
          <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '580px', margin: '8px auto 0' }}>
            Choose the right level of challenge — whether taking your first step in hardware or building cloud IoT rigs.
          </p>
        </div>

        {/* Side-by-Side Cards (Stack on mobile) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Card 1 — Junior Track */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '2px solid #fbbf24',
              padding: 'clamp(24px, 3vw, 36px)',
              boxShadow: '0 12px 36px -10px rgba(245, 158, 11, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid #10b981',
                color: '#065f46',
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '100px',
                fontFamily: 'monospace',
              }}
            >
              ● Batch 01 Open
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>🤖</span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#d97706',
                    textTransform: 'uppercase',
                    fontFamily: 'monospace',
                  }}
                >
                  Grade 5 — Grade 10
                </span>
              </div>

              <h3
                style={{
                  fontSize: '26px',
                  fontWeight: 900,
                  color: '#0f172a',
                  letterSpacing: '-0.5px',
                  marginBottom: '14px',
                }}
              >
                Junior Track
              </h3>

              <p
                style={{
                  fontSize: '15px',
                  color: '#475569',
                  lineHeight: 1.65,
                  marginBottom: '20px',
                }}
              >
                For school students with little or no prior coding experience. Three-phase, six-month-plus roadmap from Arduino fundamentals to Raspberry Pi integrated projects. Beginner's kit included. Admissions open for Batch 01.
              </p>

              {/* Highlights */}
              <div
                style={{
                  background: '#f8fafc',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '24px',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                  What's included:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {['Physical beginner hardware kit included', 'Arduino UNO + C/C++ visual to code', 'Real sensors: light, sound, distance, temp', 'First hackathon entry mentorship'].map((item) => (
                    <li key={item} style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#10b981', fontWeight: 900 }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => scrollToEnroll('Junior Track (Grade 5 — 10)')}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '14.5px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(245, 158, 11, 0.35)',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span>Enroll in Junior Track</span>
              <span>→</span>
            </button>
          </div>

          {/* Card 2 — Senior Track */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '2px solid #cbd5e1',
              padding: 'clamp(24px, 3vw, 36px)',
              boxShadow: '0 12px 36px -10px rgba(0, 0, 0, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(37, 99, 235, 0.1)',
                border: '1px solid #2563eb',
                color: '#1d4ed8',
                fontSize: '11px',
                fontWeight: 800,
                padding: '4px 10px',
                borderRadius: '100px',
                fontFamily: 'monospace',
              }}
            >
              ● Batch 02 Onwards
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '24px' }}>⚡</span>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#2563eb',
                    textTransform: 'uppercase',
                    fontFamily: 'monospace',
                  }}
                >
                  Grade 11 & above
                </span>
              </div>

              <h3
                style={{
                  fontSize: '26px',
                  fontWeight: 900,
                  color: '#0f172a',
                  letterSpacing: '-0.5px',
                  marginBottom: '14px',
                }}
              >
                Senior Track
              </h3>

              <p
                style={{
                  fontSize: '15px',
                  color: '#475569',
                  lineHeight: 1.65,
                  marginBottom: '20px',
                }}
              >
                For higher-secondary and college students with some coding or electronics curiosity. Compressed 3–4 month intensive covering rapid Arduino recap, ESP32 with cloud integration, and Raspberry Pi with applied AI/computer vision. Beginner's kit included. Batch 02 onwards.
              </p>

              {/* Highlights */}
              <div
                style={{
                  background: '#f8fafc',
                  borderRadius: '12px',
                  padding: '14px 16px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '24px',
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
                  What's included:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {['Physical beginner hardware kit included', 'ESP32 Wi-Fi/MQTT & Cloud Dashboard', 'Raspberry Pi + Linux + Applied AI / CV', 'College & National Hackathon prep'].map((item) => (
                    <li key={item} style={{ fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#2563eb', fontWeight: 900 }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button
              onClick={() => scrollToEnroll('Senior Track (Grade 11 & above)')}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '12px',
                background: '#0f172a',
                color: '#ffffff',
                border: 'none',
                fontWeight: 800,
                fontSize: '14.5px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(15, 23, 42, 0.25)',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span>Pre-register for Senior Track</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── 4. WHAT YOU'LL LEARN CHIP GRID ──────────────────────────────────── */}
      <section
        style={{
          borderTop: '1px solid #e2e8f0',
          borderBottom: '1px solid #e2e8f0',
          background: '#ffffff',
          padding: '48px 20px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 900,
              letterSpacing: '2px',
              color: '#64748b',
              textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}
          >
            [CORE TOOLING & THINKING]
          </span>
          <h2
            style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.5px',
              margin: '8px 0 24px',
            }}
          >
            What You'll Learn
          </h2>

          {/* 7 chips grid: 5 solid accent chips + 2 dashed-outline chips */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '12px',
              maxWidth: '850px',
              margin: '0 auto',
            }}
          >
            {/* 1. Arduino UNO */}
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.2))',
                border: '1px solid #f59e0b',
                color: '#b45309',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 800,
                fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                letterSpacing: '0.3px',
                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.12)',
              }}
            >
              Arduino UNO
            </span>

            {/* 2. C / C++ */}
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(2, 132, 199, 0.18))',
                border: '1px solid #2563eb',
                color: '#1d4ed8',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 800,
                fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                letterSpacing: '0.3px',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.12)',
              }}
            >
              C / C++
            </span>

            {/* 3. Python */}
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(5, 150, 105, 0.18))',
                border: '1px solid #10b981',
                color: '#065f46',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 800,
                fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                letterSpacing: '0.3px',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.12)',
              }}
            >
              Python
            </span>

            {/* 4. Raspberry Pi OS */}
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(225, 29, 72, 0.12), rgba(190, 18, 60, 0.18))',
                border: '1px solid #e11d48',
                color: '#9f1239',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 800,
                fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                letterSpacing: '0.3px',
                boxShadow: '0 2px 8px rgba(225, 29, 72, 0.12)',
              }}
            >
              Raspberry Pi OS
            </span>

            {/* 5. ESP32 · IoT */}
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.12), rgba(109, 40, 217, 0.18))',
                border: '1px solid #7c3aed',
                color: '#5b21b6',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 800,
                fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                letterSpacing: '0.3px',
                boxShadow: '0 2px 8px rgba(124, 58, 237, 0.12)',
              }}
            >
              ESP32 · IoT
            </span>

            {/* 6. Java & OOP */}
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.12), rgba(185, 28, 28, 0.18))',
                border: '1px solid #dc2626',
                color: '#991b1b',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 800,
                fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                letterSpacing: '0.3px',
                boxShadow: '0 2px 8px rgba(220, 38, 38, 0.12)',
              }}
            >
              Java & OOP
            </span>

            {/* 7. Spring Boot & APIs */}
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.12), rgba(4, 120, 87, 0.18))',
                border: '1px solid #059669',
                color: '#065f46',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 800,
                fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                letterSpacing: '0.3px',
                boxShadow: '0 2px 8px rgba(5, 150, 105, 0.12)',
              }}
            >
              Spring Boot & REST APIs
            </span>

            {/* 8. React & Modern Web */}
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.12), rgba(3, 105, 161, 0.18))',
                border: '1px solid #0284c7',
                color: '#075985',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 800,
                fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                letterSpacing: '0.3px',
                boxShadow: '0 2px 8px rgba(2, 132, 199, 0.12)',
              }}
            >
              React & Modern Web
            </span>

            {/* 9. SQL & Relational DBs */}
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.12), rgba(67, 56, 202, 0.18))',
                border: '1px solid #4f46e5',
                color: '#3730a3',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 800,
                fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                letterSpacing: '0.3px',
                boxShadow: '0 2px 8px rgba(79, 70, 229, 0.12)',
              }}
            >
              SQL & Relational DBs
            </span>

            {/* 10. DSA & Algorithms */}
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.12), rgba(180, 83, 9, 0.18))',
                border: '1px solid #d97706',
                color: '#92400e',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 800,
                fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                letterSpacing: '0.3px',
                boxShadow: '0 2px 8px rgba(217, 119, 6, 0.12)',
              }}
            >
              DSA & Algorithms
            </span>

            {/* 11. OpenCV & AI Vision */}
            <span
              style={{
                background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.12), rgba(126, 34, 206, 0.18))',
                border: '1px solid #9333ea',
                color: '#6b21a8',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 800,
                fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                letterSpacing: '0.3px',
                boxShadow: '0 2px 8px rgba(147, 51, 234, 0.12)',
              }}
            >
              OpenCV & AI Vision
            </span>

            {/* 12. Engineering Thinking (dashed outline) */}
            <span
              style={{
                background: 'transparent',
                border: '1.5px dashed #64748b',
                color: '#334155',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 700,
                fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                letterSpacing: '0.2px',
              }}
            >
              Engineering Thinking
            </span>

            {/* 13. Hands-on Problem Solving (dashed outline) */}
            <span
              style={{
                background: 'transparent',
                border: '1.5px dashed #64748b',
                color: '#334155',
                padding: '10px 20px',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: 700,
                fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                letterSpacing: '0.2px',
              }}
            >
              Hands-on Problem Solving
            </span>
          </div>
        </div>
      </section>

      {/* ── 4B. THE COMPLETE KARMAVEON CLASSES COURSE CATALOGUE ──────────────── */}
      <section
        id="catalogue"
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '65px 20px 70px',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(2, 132, 199, 0.1)',
              border: '1px solid rgba(2, 132, 199, 0.3)',
              color: '#0284c7',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 900,
              fontFamily: 'monospace',
              padding: '6px 14px',
              borderRadius: '100px',
              marginBottom: '12px',
            }}
          >
            <span>💻</span>
            <span>[THE COMPLETE COURSE CATALOGUE · CODING & SOFTWARE]</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(26px, 4vw, 42px)',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-1px',
              margin: '0 0 12px',
              fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
            }}
          >
            The Complete Karmaveon Classes Course Catalogue
          </h2>

          <p
            style={{
              color: '#475569',
              fontSize: 'clamp(15px, 2vw, 17px)',
              maxWidth: '780px',
              margin: '0 auto',
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            Suggested courses, progression and marketable outcomes. Durations are planning estimates; final duration depends on class frequency and student experience.
          </p>

          {/* Quick Filter Bar */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '28px',
            }}
          >
            {[
              { id: 'all', label: 'All Courses (5)' },
              { id: 'python', label: '🐍 Python: AI Maker' },
              { id: 'cpp', label: '⚙️ C/C++: DSA & Embedded' },
              { id: 'java', label: '☕ Java: Backend Dev' },
              { id: 'web', label: '🌐 Web: Full-Stack React' },
              { id: 'java-react', label: '⚛️ Java + React Full-Stack' },
            ].map((tab) => {
              const active = courseFilter === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setCourseFilter(tab.id)}
                  style={{
                    padding: '9px 18px',
                    borderRadius: '100px',
                    fontSize: '13px',
                    fontWeight: active ? 800 : 600,
                    cursor: 'pointer',
                    border: active ? '1.5px solid #0f172a' : '1.5px solid #cbd5e1',
                    background: active ? '#0f172a' : '#ffffff',
                    color: active ? '#ffffff' : '#334155',
                    transition: 'all 0.2s ease',
                    boxShadow: active ? '0 4px 12px rgba(15, 23, 42, 0.2)' : 'none',
                  }}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {COURSE_CATALOGUE.filter((c) => courseFilter === 'all' || c.category === courseFilter).map((course) => {
            return (
              <div
                key={course.id}
                style={{
                  background: '#ffffff',
                  borderRadius: '20px',
                  border: course.flagship
                    ? '2.5px solid #f59e0b'
                    : `1.5px solid ${course.borderAccent || '#e2e8f0'}`,
                  boxShadow: course.flagship
                    ? '0 16px 40px -10px rgba(245, 158, 11, 0.22)'
                    : '0 10px 30px -10px rgba(15, 23, 42, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden',
                  padding: 'clamp(24px, 3vw, 32px)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                {/* Top Ambient Highlight Banner for Flagship */}
                {course.flagship && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '6px',
                      background: 'linear-gradient(90deg, #f59e0b, #ea580c, #f59e0b)',
                    }}
                  />
                )}

                <div>
                  {/* Top Header Row: Course No + Badge + Duration */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      flexWrap: 'wrap',
                      marginBottom: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 900,
                          fontFamily: 'monospace',
                          background: '#f1f5f9',
                          color: '#475569',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          border: '1px solid #cbd5e1',
                        }}
                      >
                        COURSE {course.courseNumber}
                      </span>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 900,
                          letterSpacing: '0.5px',
                          padding: '4px 10px',
                          borderRadius: '100px',
                          fontFamily: 'monospace',
                          background: course.flagship ? 'rgba(245, 158, 11, 0.15)' : 'rgba(2, 132, 199, 0.1)',
                          color: course.flagship ? '#b45309' : course.accentColor,
                          border: `1px solid ${course.flagship ? '#f59e0b' : course.borderAccent}`,
                        }}
                      >
                        {course.flagship ? `★ ${course.badge}` : course.badge}
                      </span>
                    </div>

                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#64748b',
                        fontFamily: 'monospace',
                        background: '#f8fafc',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      ⏱ {course.duration.replace('Estimated: ', '')}
                    </span>
                  </div>

                  {/* Course Title */}
                  <h3
                    style={{
                      fontSize: 'clamp(20px, 2.5vw, 24px)',
                      fontWeight: 900,
                      color: '#0f172a',
                      letterSpacing: '-0.5px',
                      margin: '0 0 6px',
                      lineHeight: 1.25,
                      fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
                    }}
                  >
                    {course.title}
                  </h3>

                  {/* Career Trajectory / Headline */}
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: course.accentColor,
                      marginBottom: '14px',
                    }}
                  >
                    🎯 {course.headline}
                  </div>

                  {/* Note if available (e.g. Java+React special note) */}
                  {course.note && (
                    <div
                      style={{
                        background: '#f5f3ff',
                        border: '1px solid #ddd6fe',
                        borderRadius: '8px',
                        padding: '8px 12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#6d28d9',
                        marginBottom: '14px',
                      }}
                    >
                      💡 {course.note}
                    </div>
                  )}

                  {/* Marketing Quote Banner */}
                  <div
                    style={{
                      background: 'rgba(248, 250, 252, 0.8)',
                      borderLeft: `4px solid ${course.accentColor}`,
                      borderRadius: '0 8px 8px 0',
                      padding: '10px 14px',
                      marginBottom: '20px',
                      fontStyle: 'italic',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#334155',
                      lineHeight: 1.5,
                    }}
                  >
                    “{course.marketingLine}”
                  </div>

                  {/* What Students Learn (Level 1–5 Breakdown) */}
                  <div style={{ marginBottom: '22px' }}>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 900,
                        letterSpacing: '1px',
                        color: '#64748b',
                        fontFamily: 'monospace',
                        textTransform: 'uppercase',
                        marginBottom: '12px',
                      }}
                    >
                      WHAT STUDENTS LEARN · 5 LEVELS
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {course.levels.map((lvl, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '10px',
                            background: '#f8fafc',
                            borderRadius: '8px',
                            padding: '9px 12px',
                            border: '1px solid #f1f5f9',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 900,
                              fontFamily: 'monospace',
                              color: course.accentColor,
                              background: '#ffffff',
                              border: `1px solid ${course.borderAccent}`,
                              padding: '2px 6px',
                              borderRadius: '4px',
                              flexShrink: 0,
                              marginTop: '1px',
                            }}
                          >
                            {lvl.level}
                          </span>
                          <span
                            style={{
                              fontSize: '13px',
                              color: '#1e293b',
                              lineHeight: 1.45,
                              fontWeight: 500,
                            }}
                          >
                            {lvl.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Final Projects */}
                  <div style={{ marginBottom: '20px' }}>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 900,
                        letterSpacing: '1px',
                        color: '#64748b',
                        fontFamily: 'monospace',
                        textTransform: 'uppercase',
                        marginBottom: '10px',
                      }}
                    >
                      FINAL CAPSTONE PROJECTS
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                      {course.projects.map((proj, pIdx) => (
                        <span
                          key={pIdx}
                          style={{
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#334155',
                            background: '#f1f5f9',
                            border: '1px solid #e2e8f0',
                            borderRadius: '6px',
                            padding: '5px 10px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                          }}
                        >
                          <span style={{ color: course.accentColor }}>✦</span>
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Career Outcome + CTA */}
                <div
                  style={{
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '16px',
                    marginTop: '8px',
                  }}
                >
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#64748b',
                      marginBottom: '12px',
                      lineHeight: 1.4,
                    }}
                  >
                    <strong style={{ color: '#0f172a' }}>Marketable Profile:</strong>{' '}
                    <span>{course.careerRole}</span>
                  </div>

                  <button
                    onClick={() => scrollToEnroll(course.enrollTrackName)}
                    style={{
                      width: '100%',
                      padding: '13px 20px',
                      borderRadius: '12px',
                      border: 'none',
                      fontSize: '14px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      color: '#ffffff',
                      background: course.flagship
                        ? 'linear-gradient(135deg, #f59e0b, #ea580c)'
                        : course.gradient,
                      boxShadow: course.flagship
                        ? '0 6px 18px rgba(245, 158, 11, 0.35)'
                        : `0 6px 18px rgba(15, 23, 42, 0.15)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span>Reserve a Seat in this Course</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── 5. CURRICULUM ROADMAP (3-PHASE TIMELINE) ────────────────────────── */}
      <section
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '70px 20px 50px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <span
            style={{
              color: '#d97706',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 900,
              fontFamily: 'monospace',
            }}
          >
            [SYSTEMATIC PROGRESSION]
          </span>
          <h2
            style={{
              fontSize: 'clamp(24px, 3.8vw, 38px)',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.8px',
              marginTop: '6px',
            }}
          >
            Curriculum Roadmap
          </h2>
          <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '580px', margin: '8px auto 0' }}>
            A hands-on, progressive trajectory taking students from breadboards to cloud nodes and competitive hackathons.
          </p>
        </div>

        {/* 3-Phase Vertical Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Phase 1 */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1.5px solid #e2e8f0',
              padding: 'clamp(20px, 3vw, 32px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '6px',
                height: '100%',
                background: '#f59e0b',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: 'monospace',
                  color: '#d97706',
                  background: 'rgba(245, 158, 11, 0.1)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  letterSpacing: '0.5px',
                }}
              >
                PHASE 01 · FOUNDATION
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', fontFamily: 'monospace' }}>
                Platform: Arduino UNO + C/C++
              </span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(18px, 2.2vw, 22px)',
                fontWeight: 900,
                color: '#0f172a',
                letterSpacing: '-0.3px',
                marginBottom: '10px',
              }}
            >
              Phase 1 — Months 1 to 3 · Arduino + Coding Fundamentals
            </h3>

            <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.65, marginBottom: '16px' }}>
              <strong style={{ color: '#0f172a' }}>Students learn:</strong> variables, loops, conditionals, functions; breadboard wiring; digital & analog sensors (light, temperature, distance, sound); driving LEDs, buzzers, servos; systematic debugging.
            </p>

            <div
              style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px dashed #f59e0b',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '13.5px',
                color: '#92400e',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🏆</span>
              <span><strong>Capstone:</strong> a smart night-lamp, distance-based alert, or temperature display.</span>
            </div>
          </div>

          {/* Phase 2 */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1.5px solid #e2e8f0',
              padding: 'clamp(20px, 3vw, 32px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '6px',
                height: '100%',
                background: '#2563eb',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: 'monospace',
                  color: '#2563eb',
                  background: 'rgba(37, 99, 235, 0.1)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  letterSpacing: '0.5px',
                }}
              >
                PHASE 02 · CONNECTIVITY
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', fontFamily: 'monospace' }}>
                Platform: ESP32 + Wi-Fi/MQTT + cloud dashboard
              </span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(18px, 2.2vw, 22px)',
                fontWeight: 900,
                color: '#0f172a',
                letterSpacing: '-0.3px',
                marginBottom: '10px',
              }}
            >
              Phase 2 — Months 3 to 6 · ESP32 + Internet of Things
            </h3>

            <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.65, marginBottom: '16px' }}>
              <strong style={{ color: '#0f172a' }}>Students learn:</strong> connecting a device to Wi-Fi; HTTP requests and JSON payloads; two-way device control; API key handling and credential hygiene; small sensor networks.
            </p>

            <div
              style={{
                background: 'rgba(37, 99, 235, 0.08)',
                border: '1px dashed #2563eb',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '13.5px',
                color: '#1e40af',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🌐</span>
              <span><strong>Capstone:</strong> a connected project (plant-moisture sensor, door-open alert, weather station with cloud logging).</span>
            </div>
          </div>

          {/* Phase 3 */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1.5px solid #e2e8f0',
              padding: 'clamp(20px, 3vw, 32px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '6px',
                height: '100%',
                background: '#7c3aed',
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 900,
                  fontFamily: 'monospace',
                  color: '#7c3aed',
                  background: 'rgba(124, 58, 237, 0.1)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  letterSpacing: '0.5px',
                }}
              >
                PHASE 03 · INTEGRATION & AI
              </span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', fontFamily: 'monospace' }}>
                Platform: Raspberry Pi + Python + Linux
              </span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(18px, 2.2vw, 22px)',
                fontWeight: 900,
                color: '#0f172a',
                letterSpacing: '-0.3px',
                marginBottom: '10px',
              }}
            >
              Phase 3 — Month 6 onwards · Raspberry Pi + Integrated Systems
            </h3>

            <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.65, marginBottom: '16px' }}>
              <strong style={{ color: '#0f172a' }}>Students learn:</strong> Linux command line; structured Python; integrating Pi with Arduino or ESP32 nodes; building and documenting a project of meaningful scope (home-automation node, security camera, voice-controlled device, small robot); presenting to the cohort.
            </p>

            <div
              style={{
                background: 'rgba(124, 58, 237, 0.08)',
                border: '1px dashed #7c3aed',
                borderRadius: '10px',
                padding: '10px 14px',
                fontSize: '13.5px',
                color: '#5b21b6',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🚀</span>
              <span><strong>Capstone:</strong> replaces the standard project when a hackathon is on the calendar.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. BEGINNER'S KIT (WHAT'S IN THE BOX) ────────────────────────────── */}
      <section
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '40px 20px 65px',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(145deg, #0f172a, #090d16)',
            borderRadius: '24px',
            border: '1.5px solid #1e293b',
            padding: 'clamp(24px, 4vw, 44px)',
            color: '#f8fafc',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle Ambient Glow inside dark card */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              right: '-60px',
              width: '240px',
              height: '240px',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span style={{ fontSize: '20px' }}>📦</span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#fbbf24',
                fontFamily: 'monospace',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              HARDWARE INCLUDED · DAY 01
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(24px, 3.5vw, 36px)',
              fontWeight: 900,
              letterSpacing: '-0.8px',
              color: '#ffffff',
              marginBottom: '10px',
            }}
          >
            Beginner's Kit
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '640px', marginBottom: '28px', lineHeight: 1.6 }}>
            Every enrolled student receives a complete prototyping kit on Day 1 to build at the centre and continue tinkering at home.
          </p>

          {/* Kit Items List */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '12px',
              marginBottom: '28px',
            }}
          >
            {[
              '1 × Arduino NANO-compatible board',
              '1 × Half-size breadboard',
              'Assorted LEDs, resistors, push-buttons, jumper wires (male-male + male-female)',
              'Sensor starter pack — LDR (light), DHT11/DHT22 (temperature/humidity), sound sensor',
              'Actuator pack — buzzer',
              'USB cable for power & programming',
              'Printed quick-start guide',
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  fontSize: '14px',
                  color: '#e2e8f0',
                  lineHeight: 1.5,
                }}
              >
                <span style={{ color: '#fbbf24', fontWeight: 900, marginTop: '2px' }}>✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Verbatim Callout Line Below List */}
          <div
            style={{
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              fontSize: 'clamp(14px, 1.8vw, 16px)',
              fontWeight: 800,
              color: '#fbbf24',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            <span>⚡</span>
            <span >Kit valued at ₹999 — included with the ₹1,599 course fee. The kit belongs to the student.</span>
            <span >only for limited students so hurry up!</span>
          </div>
        </div>
      </section>

      {/* ── 7. FACULTY TEAM ─────────────────────────────────────────────────── */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '40px 20px 65px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <span
            style={{
              color: '#d97706',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 900,
              fontFamily: 'monospace',
            }}
          >
            [INSTRUCTORS & MENTORS]
          </span>
          <h2
            style={{
              fontSize: 'clamp(24px, 3.8vw, 38px)',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.8px',
              marginTop: '6px',
            }}
          >
            Faculty & Leadership
          </h2>
          <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '580px', margin: '8px auto 0' }}>
            Practicing technology engineers and instructors who guide every student from first circuit to national contests.
          </p>
        </div>

        {/* 3 Faculty Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Faculty 1: Pappu Ramchandra Bind */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '18px',
              border: '1.5px solid #e2e8f0',
              padding: '28px 24px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '20px',
                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
                  flexShrink: 0,
                }}
              >
                PB
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Pappu Ramchandra Bind
                </h3>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#d97706',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                  }}
                >
                  Promoter
                </span>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.65, margin: 0 }}>
              Business strategy, curriculum planning, faculty coordination, and overall development of the training initiative. Technical foundation supports the centre's educational and operational goals.
            </p>
          </div>

          {/* Faculty 2: Pratham Bandodka */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '18px',
              border: '1.5px solid #e2e8f0',
              padding: '28px 24px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '20px',
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                  flexShrink: 0,
                }}
              >
                PB
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Pratham Bandodka
                </h3>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#2563eb',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                  }}
                >
                  Teaching & Technical Support
                </span>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.65, margin: 0 }}>
              Classroom teaching, practical programming and robotics activities, and technical support for learning infrastructure. Focuses on helping students understand concepts through structured instruction and guided practice.
            </p>
          </div>

          {/* Faculty 3: Rishi Sawant */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '18px',
              border: '1.5px solid #e2e8f0',
              padding: '28px 24px',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #7c3aed, #db2777)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '20px',
                  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                  flexShrink: 0,
                }}
              >
                RS
              </div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  Rishi Sawant
                </h3>
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#7c3aed',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                  }}
                >
                  Technical Development & Innovation
                </span>
              </div>
            </div>

            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.65, margin: 0 }}>
              Technical development, project-based learning, and exposure to emerging technologies including robotics, IoT, and applied AI. Hands-on project experience and international-level innovation recognition bring a practical, innovation-oriented perspective.
            </p>
          </div>
        </div>
      </section>

      {/* ── 8. HACKATHONS & FACULTY SUPPORT ──────────────────────────────────── */}
      <section
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '20px 20px 60px',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(254, 243, 199, 0.6) 0%, rgba(255, 237, 213, 0.7) 100%)',
            border: '1.5px solid #fde68a',
            borderRadius: '20px',
            padding: 'clamp(24px, 4vw, 38px)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span style={{ fontSize: '20px' }}>🏆</span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 900,
                color: '#b45309',
                fontFamily: 'monospace',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              [EXTERNAL COMPETITIONS]
            </span>
          </div>

          <h3
            style={{
              fontSize: 'clamp(20px, 2.6vw, 26px)',
              fontWeight: 900,
              color: '#78350f',
              letterSpacing: '-0.5px',
              marginBottom: '14px',
            }}
          >
            Hackathons & Faculty Support
          </h3>

          <p
            style={{
              fontSize: '15.5px',
              color: '#451a03',
              lineHeight: 1.7,
              margin: 0,
              fontWeight: 450,
            }}
          >
            Every batch is prepared for external technology competitions — school-level robotics contests, regional IoT hackathons, and (for the Senior Track) college-level and national-level events. Faculty provide full-spectrum support: technical architecture, code review, project documentation, presentation prep, and on-site logistics. Students remain the authors of their work; faculty act as accelerators and reviewers — not builders on the student's behalf.
          </p>
        </div>
      </section>

      {/* ── 9. ADMISSION DETAILS & 10. LOCATION CARD & MAP ──────────────────── */}
      <section
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '20px 20px 65px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <span
            style={{
              color: '#d97706',
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 900,
              fontFamily: 'monospace',
            }}
          >
            [BATCH LOGISTICS]
          </span>
          <h2
            style={{
              fontSize: 'clamp(24px, 3.8vw, 38px)',
              fontWeight: 900,
              color: '#0f172a',
              letterSpacing: '-0.8px',
              marginTop: '6px',
            }}
          >
            Admission Details & Centre Location
          </h2>
          <p style={{ color: '#64748b', fontSize: '15px', maxWidth: '580px', margin: '8px auto 0' }}>
            Batch 01 seats are strictly capped at 10 to 12 students to guarantee 1-on-1 hardware and coding attention.
          </p>
        </div>

        {/* Admission Details Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px',
            marginBottom: '36px',
          }}
        >
          {[
            { field: 'Course Fee', value: '₹1,599 (beginner\'s kit valued at ₹999 included)', icon: '💳', highlight: true },
            { field: 'Batch Start', value: '5th November', icon: '📅' },
            { field: 'Fee Duration', value: '1 Month (per phase, payable monthly)', icon: '⏱️' },
            { field: 'Batch Size', value: '10 to 15 students only per batch', icon: '👥' },
            { field: 'Status', value: 'Admissions Open — Batch 01', icon: '🟢', highlight: true },
            { field: 'Mode', value: 'In-person, at the centre', icon: '📍' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: item.highlight ? 'linear-gradient(135deg, #ffffff, #fffbeb)' : '#ffffff',
                border: item.highlight ? '1.5px solid #f59e0b' : '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '18px 20px',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px' }}>{item.icon}</span>
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', fontFamily: 'monospace', textTransform: 'uppercase' }}>
                  {item.field}
                </span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: item.highlight ? '#92400e' : '#0f172a' }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        {/* Location Card + Embedded Google Map */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            alignItems: 'stretch',
          }}
        >
          {/* Location Details Card */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1.5px solid #e2e8f0',
              padding: 'clamp(24px, 3.5vw, 36px)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontSize: '20px' }}>📍</span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 900,
                    color: '#d97706',
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                  }}
                >
                  PHYSICAL CENTRE
                </span>
              </div>

              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: 900,
                  color: '#0f172a',
                  marginBottom: '16px',
                }}
              >
                Vasco da Gama Training Centre
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '15px', color: '#334155' }}>
                <div>
                  <strong style={{ color: '#0f172a' }}>Address line 1:</strong> Karma Empress, Vasco da Gama
                </div>
                <div>
                  <strong style={{ color: '#0f172a' }}>Address line 2:</strong> Mormugao, South Goa — PIN 403802
                </div>
                <div>
                  <strong style={{ color: '#0f172a' }}>Landmark:</strong> Near KTC Bus Stand
                </div>
                <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: '1px dashed #cbd5e1' }}>
                  <strong style={{ color: '#0f172a' }}>WhatsApp:</strong>{' '}
                  <a
                    href="https://wa.me/917219570353"
                    style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 700 }}
                  >
                    +91 72195 70353 / +91 82378 15495
                  </a>
                </div>
                <div>
                  <strong style={{ color: '#0f172a' }}>Website:</strong>{' '}
                  <span style={{ color: '#d97706', fontWeight: 700 }}>karmaveontechnologies.in/classes</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <a
                href="https://www.google.com/maps?q=Karma+Empress+Vasco+da+Gama+Goa+403802+near+KTC+Bus+Stand"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <button
                  style={{
                    width: '100%',
                    padding: '12px 18px',
                    borderRadius: '10px',
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    color: '#0f172a',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    minHeight: '44px',
                  }}
                >
                  <span>Open in Google Maps App</span>
                  <span>↗</span>
                </button>
              </a>
            </div>
          </div>

          {/* Location Map (embedded iframe) */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              border: '1.5px solid #e2e8f0',
              padding: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '320px',
            }}
          >
            <iframe
              src="https://www.google.com/maps?q=Karma+Empress+Vasco+da+Gama+Goa+403802+near+KTC+Bus+Stand&output=embed"
              width="100%"
              style={{
                border: 0,
                borderRadius: '12px',
                flex: 1,
                minHeight: '280px',
                maxHeight: '360px',
                width: '100%',
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Karmaveon Classes location — Karma Empress, Vasco da Gama"
            />
          </div>
        </div>
      </section>

      {/* ── 11. ENROLLMENT FORM SECTION (#enroll) ───────────────────────────── */}
      <section
        id="enroll"
        style={{
          maxWidth: '780px',
          margin: '0 auto',
          padding: '60px 20px 50px',
          scrollMarginTop: '80px',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            borderRadius: '24px',
            border: '2px solid #f59e0b',
            padding: 'clamp(24px, 5vw, 44px)',
            boxShadow: '0 20px 45px -10px rgba(245, 158, 11, 0.18)',
            position: 'relative',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(245, 158, 11, 0.12)',
                color: '#b45309',
                fontSize: '11px',
                fontWeight: 900,
                padding: '4px 12px',
                borderRadius: '100px',
                fontFamily: 'monospace',
                marginBottom: '10px',
              }}
            >
              <span>🎓</span>
              <span>BATCH 01 ENROLLMENT</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(24px, 3.8vw, 36px)',
                fontWeight: 900,
                color: '#0f172a',
                letterSpacing: '-0.8px',
                marginBottom: '8px',
              }}
            >
              Reserve Your Trial Class
            </h2>

            <p style={{ color: '#475569', fontSize: '15px', lineHeight: 1.6, maxWidth: '540px', margin: '0 auto' }}>
              Fill in your details. Our team will call you back within 24 hours to confirm your slot for Batch 01.
            </p>
          </div>

          {/* Inline Success State */}
          {formSubmitted ? (
            <div
              style={{
                background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                border: '1.5px solid #10b981',
                borderRadius: '16px',
                padding: '32px 24px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
              <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#065f46', marginBottom: '8px' }}>
                Thank you — your trial class request has been received.
              </h3>
              <p style={{ fontSize: '16px', color: '#047857', maxWidth: '480px', margin: '0 auto 20px', lineHeight: 1.6 }}>
                We will call you within 24 hours to confirm your slot for Batch 01 at our Vasco da Gama centre.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '380px', margin: '0 auto' }}>
                <a
                  href={getWhatsAppSubmissionLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <button
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      borderRadius: '12px',
                      background: '#25D366',
                      color: '#ffffff',
                      border: 'none',
                      fontWeight: 800,
                      fontSize: '15px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(37, 211, 102, 0.4)',
                    }}
                  >
                    <span>💬 Send Details to WhatsApp Now</span>
                  </button>
                </a>

                <button
                  onClick={() => setFormSubmitted(false)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: '10px',
                    background: 'transparent',
                    border: '1px solid #10b981',
                    color: '#065f46',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Field 1: Student Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="studentName"
                  style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}
                >
                  Student Name <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  id="studentName"
                  name="studentName"
                  type="text"
                  required
                  placeholder="Full name of the student"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    padding: '12px 16px',
                    fontSize: '16px', // Prevents iOS Safari zoom
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    outline: 'none',
                    background: '#f8fafc',
                    color: '#0f172a',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Field 2: Date of Birth */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="birthDate"
                  style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}
                >
                  Date of Birth <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  id="birthDate"
                  name="birthDate"
                  type="date"
                  required
                  max={todayStr}
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    outline: 'none',
                    background: '#f8fafc',
                    color: '#0f172a',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Field 3: Track / Course Selection */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}
                >
                  <label style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>
                    Select Course or Track <span style={{ color: '#dc2626' }}>*</span>
                  </label>

                  {/* Category Switcher Tabs */}
                  <div
                    style={{
                      display: 'inline-flex',
                      gap: '4px',
                      background: '#f1f5f9',
                      padding: '4px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setTrackCategory('coding')
                        if (formData.track.includes('Track (Grade')) {
                          setFormData((prev) => ({
                            ...prev,
                            track: 'Python: Beginner to AI Maker (4–6 months)',
                          }))
                        }
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: trackCategory === 'coding' ? 800 : 600,
                        cursor: 'pointer',
                        background: trackCategory === 'coding' ? '#0284c7' : 'transparent',
                        color: trackCategory === 'coding' ? '#ffffff' : '#64748b',
                        boxShadow: trackCategory === 'coding' ? '0 2px 6px rgba(2, 132, 199, 0.3)' : 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      💻 Coding Courses (5)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTrackCategory('robotics')
                        if (!formData.track.includes('Track (Grade')) {
                          setFormData((prev) => ({
                            ...prev,
                            track: 'Junior Track (Grade 5 — 10)',
                          }))
                        }
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: trackCategory === 'robotics' ? 800 : 600,
                        cursor: 'pointer',
                        background: trackCategory === 'robotics' ? '#d97706' : 'transparent',
                        color: trackCategory === 'robotics' ? '#ffffff' : '#64748b',
                        boxShadow: trackCategory === 'robotics' ? '0 2px 6px rgba(217, 119, 6, 0.3)' : 'none',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      🤖 Robotics Tracks (2)
                    </button>
                  </div>
                </div>

                {/* Track Options */}
                {trackCategory === 'coding' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                    {[
                      {
                        name: 'Python: Beginner to AI Maker (4–6 months)',
                        icon: '🐍',
                        tag: 'FLAGSHIP',
                        desc: 'AI & Computer Vision Developer · OpenCV & Scikit-learn',
                      },
                      {
                        name: 'C/C++: Beginner to DSA & Embedded Developer (4–6 months)',
                        icon: '⚙️',
                        tag: 'SYSTEMS & DSA',
                        desc: 'Pointers, Memory, Competitive Programming & Arduino',
                      },
                      {
                        name: 'Java: Beginner to Backend Developer (4–6 months)',
                        icon: '☕',
                        tag: 'BACKEND DEV',
                        desc: 'OOP, SQL, Relational Design & Spring Boot REST APIs',
                      },
                      {
                        name: 'Web Development: Beginner to Full-Stack Developer (4–6 months)',
                        icon: '🌐',
                        tag: 'FULL-STACK WEB',
                        desc: 'HTML, CSS, JavaScript, React components & Node.js',
                      },
                      {
                        name: 'Java + React: Full-Stack Application Development (6–9 months)',
                        icon: '⚛️',
                        tag: 'ENTERPRISE FULL-STACK',
                        desc: 'Complete Stack: Spring Boot Backend + React Frontend',
                      },
                    ].map((opt) => (
                      <label
                        key={opt.name}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px',
                          padding: '12px 14px',
                          borderRadius: '10px',
                          border: formData.track === opt.name ? '2px solid #0284c7' : '1.5px solid #cbd5e1',
                          background: formData.track === opt.name ? 'rgba(2, 132, 199, 0.08)' : '#f8fafc',
                          cursor: 'pointer',
                          minHeight: '48px',
                          boxSizing: 'border-box',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input
                            type="radio"
                            name="track"
                            value={opt.name}
                            checked={formData.track === opt.name}
                            onChange={handleInputChange}
                            style={{ accentColor: '#0284c7', width: '18px', height: '18px', flexShrink: 0 }}
                          />
                          <div>
                            <div
                              style={{
                                fontSize: '14px',
                                fontWeight: formData.track === opt.name ? 800 : 700,
                                color: formData.track === opt.name ? '#0369a1' : '#0f172a',
                              }}
                            >
                              <span style={{ marginRight: '6px' }}>{opt.icon}</span>
                              {opt.name}
                            </div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                              {opt.desc}
                            </div>
                          </div>
                        </div>
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 900,
                            fontFamily: 'monospace',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            background: opt.tag === 'FLAGSHIP' ? '#fef3c7' : '#f1f5f9',
                            color: opt.tag === 'FLAGSHIP' ? '#b45309' : '#475569',
                            border: opt.tag === 'FLAGSHIP' ? '1px solid #fde68a' : '1px solid #e2e8f0',
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}
                        >
                          {opt.tag}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: '10px',
                    }}
                  >
                    {[
                      {
                        name: 'Junior Track (Grade 5 — 10)',
                        icon: '🤖',
                        desc: 'Robotics, Electronics & Block to C++',
                      },
                      {
                        name: 'Senior Track (Grade 11 & above)',
                        icon: '🦾',
                        desc: 'Advanced C++, ESP32 IoT & Hardware Projects',
                      },
                    ].map((opt) => (
                      <label
                        key={opt.name}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '14px 16px',
                          borderRadius: '10px',
                          border: formData.track === opt.name ? '2px solid #d97706' : '1.5px solid #cbd5e1',
                          background: formData.track === opt.name ? 'rgba(245, 158, 11, 0.08)' : '#f8fafc',
                          cursor: 'pointer',
                          minHeight: '48px',
                          boxSizing: 'border-box',
                        }}
                      >
                        <input
                          type="radio"
                          name="track"
                          value={opt.name}
                          checked={formData.track === opt.name}
                          onChange={handleInputChange}
                          style={{ accentColor: '#d97706', width: '18px', height: '18px', flexShrink: 0 }}
                        />
                        <div>
                          <div
                            style={{
                              fontSize: '14px',
                              fontWeight: formData.track === opt.name ? 800 : 700,
                              color: formData.track === opt.name ? '#b45309' : '#0f172a',
                            }}
                          >
                            <span style={{ marginRight: '6px' }}>{opt.icon}</span>
                            {opt.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                            {opt.desc}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Field 4: School / College Option */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}>
                  School or College Student? <span style={{ color: '#dc2626' }}>*</span>
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                  {[
                    { label: '🏫 School Student', val: 'School' },
                    { label: '🎓 College Student', val: 'College' },
                  ].map((cat) => (
                    <label
                      key={cat.val}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '14px 16px',
                        borderRadius: '10px',
                        border: formData.institutionType === cat.val ? '2px solid #f59e0b' : '1.5px solid #cbd5e1',
                        background: formData.institutionType === cat.val ? 'rgba(245, 158, 11, 0.08)' : '#f8fafc',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: formData.institutionType === cat.val ? 800 : 600,
                        color: formData.institutionType === cat.val ? '#b45309' : '#334155',
                        minHeight: '48px',
                        boxSizing: 'border-box',
                      }}
                    >
                      <input
                        type="radio"
                        name="institutionType"
                        value={cat.val}
                        checked={formData.institutionType === cat.val}
                        onChange={handleInputChange}
                        style={{ accentColor: '#d97706', width: '18px', height: '18px' }}
                      />
                      <span>{cat.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Field 5: Class / Grade / Year */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="grade"
                  style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}
                >
                  {formData.institutionType === 'College' ? 'College Year / Level' : 'Class / Grade'} <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <select
                  id="grade"
                  name="grade"
                  required
                  value={formData.grade}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    outline: 'none',
                    background: '#f8fafc',
                    color: '#0f172a',
                    boxSizing: 'border-box',
                  }}
                >
                  {formData.institutionType === 'College' ? (
                    <>
                      <option value="1st Year (FY)">1st Year (FY)</option>
                      <option value="2nd Year (SY)">2nd Year (SY)</option>
                      <option value="3rd Year (TY)">3rd Year (TY)</option>
                      <option value="Final Year (4th Year)">Final Year (4th Year)</option>
                      <option value="Diploma / Polytechnic">Diploma / Polytechnic</option>
                      <option value="Post-Graduate / Other">Post-Graduate / Other</option>
                    </>
                  ) : (
                    <>
                      <option value="Grade 5">Grade 5</option>
                      <option value="Grade 6">Grade 6</option>
                      <option value="Grade 7">Grade 7</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </>
                  )}
                </select>
              </div>

              {/* Field 6: School or College / University Name with Goa Institutions Directory */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '6px',
                  }}
                >
                  <label
                    htmlFor="schoolName"
                    style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}
                  >
                    {formData.institutionType === 'College'
                      ? 'College / University Name'
                      : 'School Name'}{' '}
                    <span style={{ color: '#dc2626' }}>*</span>
                  </label>

                  {/* Toggle button to switch between list and manual entry */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsManualInstitution(!isManualInstitution)
                      setFormData((prev) => ({ ...prev, schoolName: '' }))
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#0284c7',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: '2px 4px',
                      textDecoration: 'underline',
                    }}
                  >
                    {isManualInstitution
                      ? `← Pick from Goa ${formData.institutionType === 'College' ? 'Colleges' : 'Schools'} Directory`
                      : '✎ Not in list? Enter Manually'}
                  </button>
                </div>

                {!isManualInstitution ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <select
                      id="schoolName"
                      name="schoolName"
                      required
                      value={formData.schoolName}
                      onChange={(e) => {
                        const val = e.target.value
                        if (val === '__OTHER__') {
                          setIsManualInstitution(true)
                          setFormData((prev) => ({ ...prev, schoolName: '' }))
                        } else {
                          setFormData((prev) => ({ ...prev, schoolName: val }))
                        }
                      }}
                      style={{
                        width: '100%',
                        minHeight: '48px',
                        padding: '12px 16px',
                        fontSize: '15px',
                        borderRadius: '10px',
                        border: '1.5px solid #cbd5e1',
                        outline: 'none',
                        background: '#f8fafc',
                        color: formData.schoolName ? '#0f172a' : '#64748b',
                        boxSizing: 'border-box',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="">
                        {formData.institutionType === 'College'
                          ? '-- Select your College / University (115+ Goa Institutes) --'
                          : '-- Select your School (100+ Goa Schools) --'}
                      </option>
                      <option value="__OTHER__" style={{ fontWeight: 800, color: '#d97706' }}>
                        ➕ Other / Enter Manually...
                      </option>
                      {(formData.institutionType === 'College'
                        ? goaInstitutions.colleges
                        : goaInstitutions.schools
                      ).map((inst, idx) => (
                        <option key={`${inst.name}-${idx}`} value={inst.name}>
                          {inst.name} {inst.place ? `— ${inst.place}` : ''}
                        </option>
                      ))}
                    </select>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>
                        Select from <strong>{formData.institutionType === 'College' ? '115+ Colleges & Universities' : '100+ Schools'}</strong> in Goa.
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsManualInstitution(true)
                          setFormData((prev) => ({ ...prev, schoolName: '' }))
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#b45309',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          padding: 0,
                          textDecoration: 'underline',
                        }}
                      >
                        Can't find your {formData.institutionType === 'College' ? 'college' : 'school'}? Enter manually ✎
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <input
                      id="schoolName"
                      name="schoolName"
                      type="text"
                      required
                      autoFocus
                      placeholder={
                        formData.institutionType === 'College'
                          ? 'Enter your College or University name'
                          : 'Enter your School name'
                      }
                      value={formData.schoolName}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        minHeight: '48px',
                        padding: '12px 16px',
                        fontSize: '16px',
                        borderRadius: '10px',
                        border: '2px solid #0284c7',
                        outline: 'none',
                        background: '#ffffff',
                        color: '#0f172a',
                        boxSizing: 'border-box',
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: '#0284c7', fontWeight: 700 }}>
                        ✓ Manual Entry Mode Active
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsManualInstitution(false)
                          setFormData((prev) => ({ ...prev, schoolName: '' }))
                        }}
                        style={{
                          background: '#f1f5f9',
                          border: '1px solid #cbd5e1',
                          borderRadius: '6px',
                          color: '#475569',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          padding: '4px 8px',
                        }}
                      >
                        Browse Goa Institutions Directory
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Field 5: Address */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="address"
                  style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}
                >
                  Address <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <textarea
                  id="address"
                  name="address"
                  required
                  rows={3}
                  placeholder="Full residential address including PIN code"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    outline: 'none',
                    background: '#f8fafc',
                    color: '#0f172a',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Field 6: Parent / Guardian Name */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="parentName"
                  style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}
                >
                  Parent / Guardian Name <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <input
                  id="parentName"
                  name="parentName"
                  type="text"
                  required
                  placeholder="Full name of parent or guardian"
                  value={formData.parentName}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    outline: 'none',
                    background: '#f8fafc',
                    color: '#0f172a',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Field 7: Parent / Guardian Phone */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="phone"
                  style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}
                >
                  Parent / Guardian Phone <span style={{ color: '#dc2626' }}>*</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <span
                    style={{
                      minHeight: '48px',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 14px',
                      background: '#e2e8f0',
                      border: '1.5px solid #cbd5e1',
                      borderRight: 'none',
                      borderRadius: '10px 0 0 10px',
                      fontSize: '15px',
                      fontWeight: 800,
                      color: '#475569',
                    }}
                  >
                    +91
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      flex: 1,
                      minHeight: '48px',
                      padding: '12px 16px',
                      fontSize: '16px',
                      borderRadius: '0 10px 10px 0',
                      border: phoneError ? '1.5px solid #dc2626' : '1.5px solid #cbd5e1',
                      outline: 'none',
                      background: '#f8fafc',
                      color: '#0f172a',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
                {phoneError && (
                  <span style={{ color: '#dc2626', fontSize: '12.5px', fontWeight: 700 }}>
                    {phoneError}
                  </span>
                )}
              </div>

              {/* Field 8: Parent / Guardian Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="email"
                  style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}
                >
                  Parent / Guardian Email{' '}
                  <span style={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}>(Optional)</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Optional — for confirmation"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    outline: 'none',
                    background: '#f8fafc',
                    color: '#0f172a',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Field 9: Preferred Trial Class Date */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="trialDate"
                  style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}
                >
                  Preferred Trial Class Date{' '}
                  <span style={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}>
                    (Next 14 days, optional)
                  </span>
                </label>
                <input
                  id="trialDate"
                  name="trialDate"
                  type="date"
                  min={todayStr}
                  max={maxDateStr}
                  value={formData.trialDate}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    minHeight: '48px',
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    outline: 'none',
                    background: '#f8fafc',
                    color: '#0f172a',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Field 10: Message / Questions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="message"
                  style={{ fontSize: '14px', fontWeight: 800, color: '#1e293b' }}
                >
                  Message / Questions{' '}
                  <span style={{ fontSize: '12px', fontWeight: 500, color: '#64748b' }}>(Optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  placeholder="Anything specific you'd like to know?"
                  value={formData.message}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    fontSize: '16px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    outline: 'none',
                    background: '#f8fafc',
                    color: '#0f172a',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: '8px' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: '100%',
                    minHeight: '52px',
                    padding: '16px 24px',
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: 900,
                    letterSpacing: '0.3px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    boxShadow: '0 8px 24px rgba(245, 158, 11, 0.45)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>{isSubmitting ? 'Submitting Request...' : 'Join Trial Class'}</span>
                  <span>→</span>
                </button>
              </div>

              {/* Secondary WhatsApp button below */}
              <div style={{ textAlign: 'center', marginTop: '4px' }}>
                <a
                  href="https://wa.me/917219570353?text=Hi%2C%20I%20want%20to%20enroll%20in%20Karmaveon%20Classes%20Batch%2001"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#047857',
                    textDecoration: 'none',
                    fontSize: '14.5px',
                    fontWeight: 800,
                    padding: '10px 16px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    minHeight: '44px',
                  }}
                >
                  <span style={{ fontSize: '18px' }}>💬</span>
                  <span>Or message us on WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── 12. SECTION F: FINAL CTA STRIP ──────────────────────────────────── */}
      <section
        style={{
          width: '100%',
          background: '#090d16',
          borderTop: '1px solid #1e293b',
          padding: '48px 20px',
          color: '#f8fafc',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          {/* Left Text */}
          <div style={{ maxWidth: '480px' }}>
            <span
              style={{
                color: '#fbbf24',
                fontSize: '11px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                fontWeight: 900,
                fontFamily: 'monospace',
              }}
            >
              [DIRECT COUNSELING]
            </span>
            <h3
              style={{
                fontSize: 'clamp(22px, 3vw, 28px)',
                fontWeight: 900,
                color: '#ffffff',
                margin: '8px 0',
              }}
            >
              Still have questions? Talk to us directly.
            </h3>
            <p style={{ color: '#94a3b8', fontSize: '14.5px', margin: 0, lineHeight: 1.6 }}>
              Our faculty members are happy to explain our hands-on curriculum, hardware kit, and trial class schedule with parents.
            </p>
          </div>

          {/* Right: WhatsApp CTA + 96px QR Code */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="https://wa.me/917219570353"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <button
                style={{
                  padding: '14px 22px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 800,
                  fontSize: '14.5px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 18px rgba(37, 211, 102, 0.35)',
                  minHeight: '44px',
                }}
              >
                <span style={{ fontSize: '18px' }}>💬</span>
                <span>WhatsApp: +91 72195 70353</span>
              </button>
            </a>

            {/* 96px QR Code scanning to https://www.karmaveontechnologies.in/classes */}
            <div
              style={{
                background: '#ffffff',
                padding: '8px',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
              }}
            >
              <img
                src="/classes-qr.svg"
                alt="QR Code to Karmaveon Classes"
                width={96}
                height={96}
                loading="lazy"
                style={{
                  width: '96px',
                  height: '96px',
                  display: 'block',
                }}
              />
              <span
                style={{
                  color: '#0f172a',
                  fontSize: '9px',
                  fontWeight: 800,
                  fontFamily: 'monospace',
                  letterSpacing: '0.3px',
                }}
              >
                SCAN FOR CLASSES
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Floating Sticky "Join Now" CTA on Scroll ── */}
      {showStickyJoin && (
        <button
          onClick={() => scrollToEnroll()}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '20px',
            zIndex: 9999,
            padding: '12px 22px',
            borderRadius: '100px',
            background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
            color: '#ffffff',
            border: 'none',
            fontWeight: 800,
            fontSize: '14px',
            letterSpacing: '0.3px',
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(245, 158, 11, 0.45)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeInUp 0.3s ease-out',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 12px 30px rgba(245, 158, 11, 0.6)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.45)'
          }}
        >
          <span>🎓</span>
          <span>Join Now</span>
          <span style={{ fontSize: '16px' }}>↓</span>
        </button>
      )}
    </div>
  )
}
