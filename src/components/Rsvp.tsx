import { useState, type FormEvent } from 'react'
import { guestOptions, sectionTitles, ui } from '../data/site'
import { createRsvp } from '../lib/api'
import SectionTitle from './SectionTitle'

interface RsvpForm {
  name: string
  phone: string
  guests: string
}

const emptyForm: RsvpForm = {
  name: '',
  phone: '',
  guests: '',
}

const selectClass =
  'field mb-5 cursor-pointer appearance-none bg-[url(/images/select-icon2.png)] bg-[length:10px] bg-[right_2px_center] bg-no-repeat pr-6'

export default function Rsvp() {
  const [form, setForm] = useState<RsvpForm>(emptyForm)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = <K extends keyof RsvpForm>(key: K, value: RsvpForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }))
    setSent(false)
    setError('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setSent(false)

    try {
      await createRsvp(form)
      setSent(true)
      setForm(emptyForm)
    } catch (err) {
      setError(err instanceof Error ? err.message : ui.form.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="rsvp" className="relative z-10 pb-20 sm:pb-[140px] lg:pb-[200px]">
      <div className="mx-auto max-w-[1320px] px-4">
        <div className="relative mx-auto max-w-[570px] rounded-[322px] bg-white p-5 shadow-oval xl:max-w-[650px]">
          <img
            src="/images/contact/1.png"
            alt=""
            className="pointer-events-none absolute bottom-[-10%] left-[-30%] -z-10 hidden max-w-none sm:block"
          />
          <img
            src="/images/contact/2.png"
            alt=""
            className="pointer-events-none absolute top-[-3%] right-[-26%] -z-10 hidden max-w-none sm:block"
          />

          <div className="relative z-20 rounded-[322px] border border-primary px-4 py-[50px] sm:px-5 sm:py-20 xl:px-[60px] xl:py-[130px]">
            <SectionTitle>{sectionTitles.rsvp}</SectionTitle>

            <form onSubmit={handleSubmit} className="mx-auto max-w-[360px]">
              <input
                type="text"
                required
                placeholder={ui.form.name}
                value={form.name}
                onChange={(event) => update('name', event.target.value)}
                className="field mb-5"
              />
              <input
                type="tel"
                required
                inputMode="tel"
                placeholder={ui.form.phone}
                value={form.phone}
                onChange={(event) => update('phone', event.target.value)}
                className="field mb-5"
              />

              <select
                required
                value={form.guests}
                onChange={(event) => update('guests', event.target.value)}
                className={selectClass}
              >
                <option value="" disabled>
                  {ui.form.guests}
                </option>
                {guestOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>

              <div className="pt-5 text-center">
                <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
                  {loading ? ui.form.sending : ui.form.submit}
                </button>
              </div>

              {sent && (
                <p className="mt-4 text-center text-sm text-primary">{ui.form.success}</p>
              )}
              {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
