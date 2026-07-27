import { useEffect, useState } from 'react'
import { ui } from '../data/site'
import { ArrowUpIcon } from './Icons'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label={ui.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed right-4 bottom-4 z-50 flex size-9 cursor-pointer items-center justify-center rounded-full border-2 border-primary bg-primary/70 text-lg text-white transition-all duration-300 hover:bg-primary lg:size-[45px] ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <ArrowUpIcon />
    </button>
  )
}
