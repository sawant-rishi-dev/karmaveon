import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Disable smooth scroll temporarily so route navigation is instantaneous
    const prevScrollBehavior = document.documentElement.style.scrollBehavior
    document.documentElement.style.scrollBehavior = 'auto'
    window.scrollTo(0, 0)
    document.documentElement.style.scrollBehavior = prevScrollBehavior
  }, [pathname])

  return null
}
