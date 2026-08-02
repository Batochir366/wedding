import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { blessingTemplates, sectionTitles, ui } from '../data/site'
import { createGreeting, listGreetings, type Greeting } from '../lib/api'
import { fileToCompressedDataUrl } from '../lib/image'
import SectionTitle from './SectionTitle'

function BlessingCard({ item }: { item: Greeting }) {
  return (
    <figure className="flex w-[min(88vw,520px)] shrink-0 flex-col items-center gap-5 px-2 sm:w-[560px]">
      <img
        src={item.image}
        alt=""
        className="size-[120px] rounded-full object-cover ring-[6px] ring-white shadow-[0_12px_32px_rgba(0,38,66,0.14)] sm:size-[148px]"
      />
      <figcaption className="font-heading text-xl text-ink sm:text-2xl">{item.name}</figcaption>
      <blockquote className="relative w-full text-center">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 font-heading text-5xl leading-none text-primary/20"
        >
          “
        </span>
        <p className="whitespace-pre-wrap text-[15px] leading-[1.9] text-text sm:text-[16px]">
          {item.greeting}
        </p>
      </blockquote>
    </figure>
  )
}

export default function Greetings() {
  const [items, setItems] = useState<Greeting[]>([])
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      setItems(await listGreetings())
    } catch {
      // Wall stays empty if the API is briefly unavailable
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const resetFeedback = () => {
    setSent(false)
    setError('')
  }

  const onFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    resetFeedback()
    if (!file) {
      setImage('')
      setPreview('')
      return
    }

    try {
      const dataUrl = await fileToCompressedDataUrl(file, 640, 0.85)
      setImage(dataUrl)
      setPreview(dataUrl)
    } catch (err) {
      setImage('')
      setPreview('')
      setError(err instanceof Error ? err.message : ui.form.error)
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!image) {
      setError(ui.form.photo)
      return
    }

    setLoading(true)
    setError('')
    setSent(false)

    try {
      await createGreeting({ name, greeting, image })
      setSent(true)
      setName('')
      setGreeting('')
      setSelectedTemplate(null)
      setImage('')
      setPreview('')
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : ui.form.error)
    } finally {
      setLoading(false)
    }
  }

  // Enough copies for a dense track, then doubled for a seamless -50% loop
  const sequence =
    items.length === 0
      ? []
      : items.length < 3
        ? [...items, ...items, ...items, ...items]
        : items
  const track = sequence.length ? [...sequence, ...sequence] : []

  return (
    <section id="greetings" className="section-padding relative z-10 scroll-mt-24 overflow-hidden bg-cream md:scroll-mt-28">
      <div className="mx-auto max-w-[1320px] px-4">
        <SectionTitle>{sectionTitles.greetings}</SectionTitle>
      </div>

      {items.length > 0 && (
        <div className="relative mb-16 mask-[linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
          <div
            className="flex w-max items-start gap-14 py-6 animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center"
            style={{
              animationDuration: `${Math.max(60, items.reduce((sum, item) => sum + Math.max(12, item.greeting.length / 18), 0))}s`,
            }}
          >
            {track.map((item, index) => (
              <BlessingCard key={`${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[720px] px-4">
        <form onSubmit={handleSubmit} className="mx-auto max-w-[520px]">
          <div className="mb-8 flex flex-col items-center gap-3">
            <label className="group relative cursor-pointer">
              <span className="flex size-[140px] items-center justify-center overflow-hidden rounded-full bg-white ring-4 ring-primary/15 shadow-card transition group-hover:ring-primary/40 sm:size-[160px]">
                {preview ? (
                  <img src={preview} alt="" className="size-full object-cover" />
                ) : (
                  <span className="px-4 text-center text-sm leading-snug text-muted">
                    {ui.form.photo}
                  </span>
                )}
              </span>
              <input
                type="file"
                accept="image/*"
                required={!image}
                onChange={onFile}
                className="sr-only"
              />
            </label>
          </div>

          <input
            type="text"
            required
            placeholder={ui.form.name}
            value={name}
            onChange={(event) => {
              setName(event.target.value)
              resetFeedback()
            }}
            className="field mb-5"
          />

          <div className="mb-4">
            <p className="mb-3 text-center text-sm text-muted">{ui.form.greetingTemplates}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate(null)
                  setGreeting('')
                  resetFeedback()
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedTemplate === null
                    ? 'bg-primary text-white'
                    : 'bg-white text-ink ring-1 ring-line hover:ring-primary/40'
                }`}
              >
                {ui.form.greetingCustom}
              </button>
              {blessingTemplates.map((template, index) => {
                const active = selectedTemplate === index
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      setSelectedTemplate(index)
                      setGreeting(template)
                      resetFeedback()
                    }}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary text-white'
                        : 'bg-white text-ink ring-1 ring-line hover:ring-primary/40'
                    }`}
                  >
                    Ерөөл {index + 1}
                  </button>
                )
              })}
            </div>
          </div>

          <textarea
            required
            rows={8}
            placeholder={ui.form.greeting}
            value={greeting}
            onChange={(event) => {
              setGreeting(event.target.value)
              setSelectedTemplate(null)
              resetFeedback()
            }}
            className="field mb-5 h-auto min-h-[180px] whitespace-pre-wrap resize-y py-3 text-[15px] leading-relaxed"
          />

          <div className="text-center">
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
              {loading ? ui.form.sending : ui.form.submit}
            </button>
          </div>

          {sent && (
            <p className="mt-4 text-center text-sm text-primary">{ui.form.greetingSuccess}</p>
          )}
          {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
        </form>
      </div>
    </section>
  )
}
