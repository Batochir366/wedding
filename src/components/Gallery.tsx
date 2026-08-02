import { useCallback, useEffect, useState } from 'react'
import { sectionTitles, ui } from '../data/site'
import { listGallery, type GalleryImage } from '../lib/api'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  PauseIcon,
  PlayIcon,
  PlusIcon,
} from './Icons'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'

const SLIDE_MS = 3500

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    void listGallery()
      .then(setImages)
      .catch(() => setImages([]))
  }, [])

  const step = useCallback(
    (direction: number) => {
      setActiveIndex((current) =>
        current === null || images.length === 0
          ? current
          : (current + direction + images.length) % images.length,
      )
    },
    [images.length],
  )

  const openAt = useCallback((index: number, autoplay = false) => {
    setActiveIndex(index)
    setPlaying(autoplay)
  }, [])

  const closeLightbox = useCallback(() => {
    setActiveIndex(null)
    setPlaying(false)
  }, [])

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
      if (event.key === ' ' || event.key === 'k') {
        event.preventDefault()
        setPlaying((value) => !value)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, closeLightbox, step])

  useEffect(() => {
    if (!playing || activeIndex === null || images.length < 2) return

    const timer = window.setInterval(() => step(1), SLIDE_MS)
    return () => window.clearInterval(timer)
  }, [playing, activeIndex, images.length, step])

  useEffect(() => {
    if (activeIndex === null) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [activeIndex])

  return (
    <section id="gallery" className="section-padding scroll-mt-24 overflow-hidden md:scroll-mt-28">
      <div className="mx-auto max-w-[1320px] px-4">
        <SectionTitle>{sectionTitles.gallery}</SectionTitle>

        {images.length > 0 && (
          <div className="mb-6 flex justify-center sm:mb-8">
            <button
              type="button"
              onClick={() => openAt(activeIndex ?? 0, true)}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-cream px-5 py-2.5 text-sm font-medium text-ink transition hover:border-primary hover:bg-primary hover:text-white"
            >
              <PlayIcon className="text-base" />
              {ui.playGallery}
            </button>
          </div>
        )}

        {images.length === 0 ? (
          <p className="py-10 text-center text-muted">Зураг удахгүй нэмэгдэнэ.</p>
        ) : (
          <>
            {/* Phone: horizontal snap slide */}
            <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
              {images.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openAt(index)}
                  className="relative w-[78vw] max-w-[320px] shrink-0 snap-center overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={`${ui.photoAlt} ${index + 1}`}
                    className="aspect-[4/5] w-full object-cover"
                    draggable={false}
                  />
                </button>
              ))}
            </div>

            {/* Tablet / desktop: grid */}
            <div className="hidden grid-cols-2 gap-2 sm:grid md:grid-cols-3 lg:gap-[15px]">
              {images.map((item, index) => (
                <Reveal key={item.id} delay={(index % 3) * 120}>
                  <button
                    type="button"
                    onClick={() => openAt(index)}
                    className="group relative block w-full cursor-pointer overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={`${ui.photoAlt} ${index + 1}`}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <span className="absolute inset-[2%] scale-0 bg-white/80 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100" />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <PlusIcon />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>

      {activeIndex !== null && images[activeIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={sectionTitles.gallery}
          onClick={closeLightbox}
          className="fixed inset-0 z-[9999] flex flex-col bg-black/92"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-4 text-white sm:px-6">
            <p className="text-sm tracking-wide text-white/70">
              {activeIndex + 1} / {images.length}
            </p>
            <div className="flex items-center gap-2">
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    setPlaying((value) => !value)
                  }}
                  aria-label={playing ? ui.pauseGallery : ui.playGallery}
                  className="flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-lg transition hover:bg-white/20"
                >
                  {playing ? <PauseIcon /> : <PlayIcon className="ml-0.5" />}
                </button>
              )}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  closeLightbox()
                }}
                aria-label={ui.closeGallery}
                className="flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-xl transition hover:bg-white/20"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 sm:px-16">
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label={ui.prevPhoto}
                  onClick={(event) => {
                    event.stopPropagation()
                    setPlaying(false)
                    step(-1)
                  }}
                  className="absolute left-2 z-10 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-2xl text-white transition hover:bg-black/60 sm:left-4"
                >
                  <ChevronLeftIcon />
                </button>
                <button
                  type="button"
                  aria-label={ui.nextPhoto}
                  onClick={(event) => {
                    event.stopPropagation()
                    setPlaying(false)
                    step(1)
                  }}
                  className="absolute right-2 z-10 flex size-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-2xl text-white transition hover:bg-black/60 sm:right-4"
                >
                  <ChevronRightIcon />
                </button>
              </>
            )}

            <img
              key={images[activeIndex].id}
              src={images[activeIndex].image}
              alt={`${ui.photoAlt} ${activeIndex + 1}`}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[78vh] max-w-full animate-[gallery-fade_0.35s_ease-out] object-contain"
            />
          </div>

          {playing && images.length > 1 && (
            <div className="mx-auto mb-5 h-0.5 w-40 overflow-hidden rounded-full bg-white/20 sm:mb-8">
              <div
                key={activeIndex}
                className="h-full origin-left bg-white"
                style={{ animation: `gallery-progress ${SLIDE_MS}ms linear forwards` }}
              />
            </div>
          )}
        </div>
      )}
    </section>
  )
}
