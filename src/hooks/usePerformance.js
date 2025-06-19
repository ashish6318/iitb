import { useState, useEffect } from 'react'

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    domContentLoaded: 0,
    firstPaint: 0,
    firstContentfulPaint: 0
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const updateMetrics = () => {
        const navigation = performance.getEntriesByType('navigation')[0]
        const paint = performance.getEntriesByType('paint')

        setMetrics({
          loadTime: navigation?.loadEventEnd - navigation?.fetchStart || 0,
          domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.fetchStart || 0,
          firstPaint: paint.find(entry => entry.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
        })
      }

      if (document.readyState === 'complete') {
        updateMetrics()
      } else {
        window.addEventListener('load', updateMetrics)
      }

      return () => window.removeEventListener('load', updateMetrics)
    }
  }, [])

  return metrics
}

export const useIntersectionObserver = (options = {}) => {
  const [ref, setRef] = useState(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting)
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options
    })

    observer.observe(ref)

    return () => observer.disconnect()
  }, [ref, options])

  return [setRef, isInView]
}

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener('change', listener)

    return () => media.removeEventListener('change', listener)
  }, [matches, query])

  return matches
}

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}
