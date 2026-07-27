const TOKEN_KEY = 'mylove_admin_token'

export type Rsvp = {
  id: string
  name: string
  phone: string
  guests: string
  createdAt: string
}

export type Greeting = {
  id: string
  name: string
  greeting: string
  image: string
  createdAt: string
}

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY)
}

async function request<T>(path: string, init: RequestInit = {}, auth = false): Promise<T> {
  const headers = new Headers(init.headers)
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json')
  }
  if (auth) {
    const token = getAdminToken()
    if (token) headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(path, { ...init, headers })
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(
      typeof data?.error === 'string' ? data.error : `Request failed (${response.status})`,
    )
  }

  return data as T
}

export function loginAdmin(username: string, password: string) {
  return request<{ token: string }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  })
}

export function createRsvp(payload: { name: string; phone: string; guests: string }) {
  return request<{ id: string }>('/api/rsvps', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function listRsvps() {
  return request<Rsvp[]>('/api/rsvps', {}, true)
}

export function deleteRsvp(id: string) {
  return request<{ ok: boolean }>(`/api/rsvps/${id}`, { method: 'DELETE' }, true)
}

export function createGreeting(payload: {
  name: string
  greeting: string
  image: string
}) {
  return request<{ id: string }>('/api/greetings', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function listGreetings() {
  return request<Greeting[]>('/api/greetings')
}

export function deleteGreeting(id: string) {
  return request<{ ok: boolean }>(`/api/greetings/${id}`, { method: 'DELETE' }, true)
}

export type GalleryImage = {
  id: string
  image: string
  createdAt: string
}

export function listGallery() {
  return request<GalleryImage[]>('/api/gallery')
}

export function createGalleryImage(payload: { image: string }) {
  return request<{ id: string }>('/api/gallery', {
    method: 'POST',
    body: JSON.stringify(payload),
  }, true)
}

export function deleteGalleryImage(id: string) {
  return request<{ ok: boolean }>(`/api/gallery/${id}`, { method: 'DELETE' }, true)
}
