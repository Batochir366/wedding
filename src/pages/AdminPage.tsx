import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from 'react'
import {
  clearAdminToken,
  createGalleryImage,
  deleteGalleryImage,
  deleteGreeting,
  deleteRsvp,
  getAdminToken,
  listGallery,
  listGreetings,
  listRsvps,
  loginAdmin,
  reorderGallery,
  setAdminToken,
  type GalleryImage,
  type Greeting,
  type Rsvp,
} from '../lib/api'
import { fileToCompressedDataUrl } from '../lib/image'

type Tab = 'rsvps' | 'greetings' | 'gallery'

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString('mn-MN')
  } catch {
    return value
  }
}

export default function AdminPage() {
  const [token, setToken] = useState(() => getAdminToken())
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  const [tab, setTab] = useState<Tab>('rsvps')
  const [rsvps, setRsvps] = useState<Rsvp[]>([])
  const [greetings, setGreetings] = useState<Greeting[]>([])
  const [gallery, setGallery] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [reordering, setReordering] = useState(false)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [error, setError] = useState('')
  const dragIndexRef = useRef<number | null>(null)
  const galleryBeforeDrag = useRef<GalleryImage[] | null>(null)
  const galleryRef = useRef(gallery)
  galleryRef.current = gallery

  const guestTotal = useMemo(() => {
    return rsvps.reduce((sum, row) => {
      const match = row.guests.match(/\d+/)
      return sum + (match ? Number(match[0]) : 1)
    }, 0)
  }, [rsvps])

  const loadData = async () => {
    setLoading(true)
    setError('')
    try {
      const [rsvpRows, greetingRows, galleryRows] = await Promise.all([
        listRsvps(),
        listGreetings(),
        listGallery(),
      ])
      setRsvps(rsvpRows)
      setGreetings(greetingRows)
      setGallery(galleryRows)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load'
      setError(message)
      if (message === 'Unauthorized') {
        clearAdminToken()
        setToken(null)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) void loadData()
  }, [token])

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()
    setLoggingIn(true)
    setLoginError('')
    try {
      const { token: nextToken } = await loginAdmin(username, password)
      setAdminToken(nextToken)
      setToken(nextToken)
      setPassword('')
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoggingIn(false)
    }
  }

  const logout = () => {
    clearAdminToken()
    setToken(null)
    setRsvps([])
    setGreetings([])
    setGallery([])
  }

  const onGalleryUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (!files.length) return

    setUploading(true)
    setError('')
    try {
      for (const file of files) {
        const image = await fileToCompressedDataUrl(file, 1600, 0.82)
        const { id, sortOrder } = await createGalleryImage({ image })
        setGallery((current) => [
          { id, image, sortOrder, createdAt: new Date().toISOString() },
          ...current,
        ])
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const persistGalleryOrder = async (next: GalleryImage[], previous: GalleryImage[]) => {
    const unchanged =
      next.length === previous.length && next.every((row, index) => row.id === previous[index]?.id)
    if (unchanged) return

    setReordering(true)
    setError('')
    try {
      await reorderGallery(next.map((row) => row.id))
    } catch (err) {
      setGallery(previous)
      setError(err instanceof Error ? err.message : 'Could not reorder photos')
    } finally {
      setReordering(false)
    }
  }

  const onGalleryDragStart = (index: number) => (event: DragEvent<HTMLElement>) => {
    if (reordering) {
      event.preventDefault()
      return
    }
    galleryBeforeDrag.current = gallery
    dragIndexRef.current = index
    setDragIndex(index)
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(index))
  }

  const onGalleryDragOver = (overIndex: number) => (event: DragEvent<HTMLElement>) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    const fromIndex = dragIndexRef.current
    if (fromIndex === null || fromIndex === overIndex || reordering) return

    setGallery((current) => {
      const next = [...current]
      const [item] = next.splice(fromIndex, 1)
      next.splice(overIndex, 0, item)
      galleryRef.current = next
      return next
    })
    dragIndexRef.current = overIndex
    setDragIndex(overIndex)
  }

  const onGalleryDragEnd = () => {
    const previous = galleryBeforeDrag.current
    galleryBeforeDrag.current = null
    dragIndexRef.current = null
    setDragIndex(null)
    if (!previous) return
    void persistGalleryOrder(galleryRef.current, previous)
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-card"
        >
          <h1 className="mb-2 font-heading text-3xl text-primary">Admin</h1>
          <p className="mb-6 text-sm text-muted">
            Sign in to manage RSVPs, blessings, and gallery.
          </p>

          <label className="mb-4 block text-sm text-text">
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="field mt-1"
              autoComplete="username"
              required
            />
          </label>

          <label className="mb-6 block text-sm text-text">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field mt-1"
              autoComplete="current-password"
              required
            />
          </label>

          <button type="submit" disabled={loggingIn} className="btn-primary w-full disabled:opacity-60">
            {loggingIn ? 'Signing in…' : 'Sign in'}
          </button>

          {loginError && <p className="mt-4 text-center text-sm text-red-600">{loginError}</p>}
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-3xl text-primary">Admin</h1>
            <p className="text-sm text-muted">
              {rsvps.length} RSVPs · ~{guestTotal} guests · {greetings.length} blessings ·{' '}
              {gallery.length} photos
            </p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => void loadData()} className="btn-primary !bg-ink">
              Refresh
            </button>
            <button type="button" onClick={logout} className="btn-primary">
              Log out
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {(
            [
              ['rsvps', 'RSVPs'],
              ['greetings', 'Ерөөл'],
              ['gallery', 'Дурсамжит агшнууд'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold ${
                tab === id ? 'bg-primary text-white' : 'bg-white text-ink'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
        {loading && <p className="mb-4 text-sm text-muted">Loading…</p>}

        {tab === 'rsvps' && (
          <div className="overflow-x-auto rounded-2xl bg-white shadow-card">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-line text-text">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium">Guests</th>
                  <th className="px-4 py-3 font-medium">Submitted</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {rsvps.map((row) => (
                  <tr key={row.id} className="border-b border-line/70 last:border-0">
                    <td className="px-4 py-3 text-ink">{row.name}</td>
                    <td className="px-4 py-3">{row.phone}</td>
                    <td className="px-4 py-3">{row.guests}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-muted">
                      {formatDate(row.createdAt)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        className="text-red-600 hover:underline"
                        onClick={async () => {
                          if (!confirm(`Delete RSVP from ${row.name}?`)) return
                          await deleteRsvp(row.id)
                          setRsvps((current) => current.filter((item) => item.id !== row.id))
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {!rsvps.length && !loading && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-muted">
                      No RSVPs yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'greetings' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {greetings.map((row) => (
              <article key={row.id} className="rounded-2xl bg-white p-5 shadow-card">
                <div className="flex items-start gap-4">
                  <img
                    src={row.image}
                    alt=""
                    className="size-16 shrink-0 rounded-full object-cover ring-2 ring-primary/15"
                  />
                  <div className="min-w-0">
                    <h2 className="font-heading text-xl text-ink">{row.name}</h2>
                    {row.greeting && (
                      <p className="mt-2 text-sm leading-relaxed text-text whitespace-pre-wrap">
                        {row.greeting}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-muted">{formatDate(row.createdAt)}</p>
                    <button
                      type="button"
                      className="mt-3 text-sm text-red-600 hover:underline"
                      onClick={async () => {
                        if (!confirm(`Delete greeting from ${row.name}?`)) return
                        await deleteGreeting(row.id)
                        setGreetings((current) => current.filter((item) => item.id !== row.id))
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {!greetings.length && !loading && (
              <p className="text-muted sm:col-span-2 lg:col-span-3">No blessings yet.</p>
            )}
          </div>
        )}

        {tab === 'gallery' && (
          <div>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <label className="btn-primary cursor-pointer">
                {uploading ? 'Uploading…' : 'Add photos'}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading}
                  onChange={onGalleryUpload}
                  className="sr-only"
                />
              </label>
              <p className="text-sm text-muted">
                These appear in Дурсамжит агшнууд. Drag a photo to change its order.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((row, index) => (
                <article
                  key={row.id}
                  draggable={!reordering}
                  onDragStart={onGalleryDragStart(index)}
                  onDragOver={onGalleryDragOver(index)}
                  onDragEnd={onGalleryDragEnd}
                  className={`overflow-hidden rounded-xl bg-white shadow-card transition ${
                    dragIndex === index
                      ? 'cursor-grabbing opacity-60 ring-2 ring-primary'
                      : 'cursor-grab'
                  } ${reordering ? 'pointer-events-none opacity-80' : ''}`}
                >
                  <div className="relative">
                    <img
                      src={row.image}
                      alt=""
                      draggable={false}
                      className="pointer-events-none aspect-[4/3] w-full object-cover"
                    />
                    <span className="absolute top-2 left-2 rounded bg-black/55 px-2 py-0.5 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 px-3 py-2">
                    <span className="text-xs text-muted">Drag to reorder</span>
                    <button
                      type="button"
                      className="shrink-0 text-sm text-red-600 hover:underline"
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={async (event) => {
                        event.stopPropagation()
                        if (!confirm('Delete this gallery photo?')) return
                        await deleteGalleryImage(row.id)
                        setGallery((current) => current.filter((item) => item.id !== row.id))
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {!gallery.length && !loading && (
              <p className="mt-6 text-muted">No gallery photos yet. Add some above.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
