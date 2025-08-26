import { useEffect } from 'react'

export default function useInfiniteScroll(callback, canLoad = true) {
  useEffect(() => {
    if (!canLoad) return
    let ticking = false
    const handler = () => {
      if (ticking) return
      window.requestAnimationFrame(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
          callback()
        }
        ticking = false
      })
      ticking = true
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [callback, canLoad])
}
