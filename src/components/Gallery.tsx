import { useCallback, useEffect, useState } from 'react'
import { sectionTitles, ui } from '../data/site'
import { listGallery, type GalleryImage } from '../lib/api'
import { CloseIcon, PlusIcon } from './Icons'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

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

  useEffect(() => {
    if (activeIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') step(1)
      if (event.key === 'ArrowLeft') step(-1)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, step])

  return (
    <section id="gallery" className="section-padding overflow-hidden">
      <div className="mx-auto max-w-[1320px] px-4">
        <SectionTitle>{sectionTitles.gallery}</SectionTitle>

        {images.length === 0 ? (
          <p className="py-10 text-center text-muted">Зураг удахгүй нэмэгдэнэ.</p>
        ) : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:gap-[15px]">
            {images.map((item, index) => (
              <Reveal key={item.id} delay={(index % 3) * 120}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
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
        )}
      </div>

      {activeIndex !== null && images[activeIndex] && (
        <div
          onClick={() => setActiveIndex(null)}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
        >
          <button
            type="button"
            aria-label={ui.closeGallery}
            className="absolute top-6 right-6 text-3xl text-white"
          >
            <CloseIcon />
          </button>
          <img
            src={images[activeIndex].image}
            alt={`${ui.photoAlt} ${activeIndex + 1}`}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85vh] max-w-full object-contain"
          />
        </div>
      )}
    </section>
  )
}
