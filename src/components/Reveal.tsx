import { useEffect, useRef, useState, type ReactNode } from 'react'

type Direction = 'left' | 'right' | 'up'

const hidden: Record<Direction, string> = {
  left: '-translate-x-12 opacity-0',
  right: 'translate-x-12 opacity-0',
  up: 'translate-y-10 opacity-0',
}

interface RevealProps {
  children: ReactNode
  direction?: Direction
  delay?: number
  className?: string
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  // Horizontal slides expand layout width on phones — keep mobile to vertical only.
  const [motionDir, setMotionDir] = useState<Direction>('up')

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 639px)')
    const sync = () => {
      setMotionDir(narrow.matches ? 'up' : direction)
    }
    sync()
    narrow.addEventListener('change', sync)
    return () => narrow.removeEventListener('change', sync)
  }, [direction])

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        shown ? 'translate-x-0 translate-y-0 opacity-100' : hidden[motionDir]
      } ${className}`}
    >
      {children}
    </div>
  )
}
