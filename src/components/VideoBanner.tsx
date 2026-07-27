import { useEffect, useState } from 'react'
import { ui, videoUrl } from '../data/site'
import { CloseIcon, PlayIcon } from './Icons'

export default function VideoBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <section
        className="relative z-10 h-[400px] bg-cover bg-fixed bg-center"
        style={{ backgroundImage: 'url(/images/cta.jpg)' }}
      >
        <span className="absolute inset-0 bg-[rgba(107,120,132,0.4)]" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={ui.playVideo}
          className="absolute top-1/2 left-1/2 flex size-[50px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-white/50 text-xl text-white transition-transform duration-300 hover:scale-110 sm:size-20 sm:text-3xl"
        >
          <PlayIcon className="ml-1" />
        </button>
      </section>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
        >
          <button
            type="button"
            aria-label={ui.closeVideo}
            className="absolute top-6 right-6 text-3xl text-white"
          >
            <CloseIcon />
          </button>
          <div
            onClick={(event) => event.stopPropagation()}
            className="aspect-video w-full max-w-4xl"
          >
            <iframe
              src={`${videoUrl}?autoplay=1`}
              title={ui.playVideo}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="size-full"
            />
          </div>
        </div>
      )}
    </>
  )
}
