import express from 'express'
import cors from 'cors'
import { ObjectId } from 'mongodb'
import { checkAdminCredentials, createToken, requireAdmin } from './auth.js'
import { getDb, type GalleryDoc, type GreetingDoc, type RsvpDoc } from './db.js'

const app = express()

app.use(cors())
app.use(express.json({ limit: '4mb' }))

function trim(value: unknown, max: number) {
  if (typeof value !== 'string') return ''
  return value.trim().slice(0, max)
}

function isDataImage(value: string) {
  return /^data:image\/(jpeg|jpg|png|webp|gif);base64,/.test(value)
}

function paramId(value: string | string[]): string {
  return Array.isArray(value) ? value[0] : value
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const username = trim(req.body?.username, 80)
    const password = typeof req.body?.password === 'string' ? req.body.password : ''

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required' })
      return
    }

    if (!checkAdminCredentials(username, password)) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const token = await createToken(username)
    res.json({ token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Login failed' })
  }
})

app.post('/api/rsvps', async (req, res) => {
  try {
    const name = trim(req.body?.name, 100)
    const phone = trim(req.body?.phone, 30)
    const guests = trim(req.body?.guests, 40)

    if (!name || !phone || !guests) {
      res.status(400).json({ error: 'Name, phone, and guests are required' })
      return
    }

    const doc: RsvpDoc = {
      name,
      phone,
      guests,
      createdAt: new Date(),
    }

    const db = await getDb()
    const result = await db.collection<RsvpDoc>('rsvps').insertOne(doc)

    res.status(201).json({ id: result.insertedId.toString() })
  } catch (error) {
    console.error(error)
    const message = error instanceof Error ? error.message : 'Could not save RSVP'
    res.status(500).json({ error: message })
  }
})

app.get('/api/rsvps', requireAdmin, async (_req, res) => {
  try {
    const db = await getDb()
    const rows = await db
      .collection<RsvpDoc>('rsvps')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    res.json(
      rows.map((row) => ({
        id: row._id?.toString(),
        name: row.name,
        phone: row.phone,
        guests: row.guests,
        createdAt: row.createdAt,
      })),
    )
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not load RSVPs' })
  }
})

app.delete('/api/rsvps/:id', requireAdmin, async (req, res) => {
  try {
    const id = paramId(req.params.id)
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid id' })
      return
    }

    const db = await getDb()
    const result = await db.collection('rsvps').deleteOne({ _id: new ObjectId(id) })

    if (!result.deletedCount) {
      res.status(404).json({ error: 'Not found' })
      return
    }

    res.json({ ok: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not delete RSVP' })
  }
})

app.post('/api/greetings', async (req, res) => {
  try {
    const name = trim(req.body?.name, 100)
    const greeting = trim(req.body?.greeting, 3000)
    const image = typeof req.body?.image === 'string' ? req.body.image : ''

    if (!name || !greeting || !image) {
      res.status(400).json({ error: 'Name, greeting, and image are required' })
      return
    }

    if (!isDataImage(image)) {
      res.status(400).json({ error: 'Image must be a JPEG, PNG, WebP, or GIF data URL' })
      return
    }

    // Rough size guard (~1.2MB base64 ≈ 900KB binary)
    if (image.length > 1_600_000) {
      res.status(400).json({ error: 'Image is too large. Please use a smaller photo.' })
      return
    }

    const doc: GreetingDoc = {
      name,
      greeting,
      image,
      createdAt: new Date(),
    }

    const db = await getDb()
    const result = await db.collection<GreetingDoc>('greetings').insertOne(doc)

    res.status(201).json({ id: result.insertedId.toString() })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not save greeting' })
  }
})

app.get('/api/greetings', async (_req, res) => {
  try {
    const db = await getDb()
    const rows = await db
      .collection<GreetingDoc>('greetings')
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray()

    res.json(
      rows.map((row) => ({
        id: row._id?.toString(),
        name: row.name,
        greeting: row.greeting ?? '',
        image: row.image,
        createdAt: row.createdAt,
      })),
    )
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not load greetings' })
  }
})

app.delete('/api/greetings/:id', requireAdmin, async (req, res) => {
  try {
    const id = paramId(req.params.id)
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid id' })
      return
    }

    const db = await getDb()
    const result = await db.collection('greetings').deleteOne({ _id: new ObjectId(id) })

    if (!result.deletedCount) {
      res.status(404).json({ error: 'Not found' })
      return
    }

    res.json({ ok: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not delete greeting' })
  }
})

function compareGallery(a: GalleryDoc, b: GalleryDoc) {
  const ao = a.sortOrder
  const bo = b.sortOrder
  if (typeof ao === 'number' && typeof bo === 'number' && ao !== bo) return ao - bo
  if (typeof ao === 'number' && typeof bo !== 'number') return -1
  if (typeof ao !== 'number' && typeof bo === 'number') return 1
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
}

app.get('/api/gallery', async (_req, res) => {
  try {
    const db = await getDb()
    const rows = await db.collection<GalleryDoc>('gallery').find({}).toArray()
    rows.sort(compareGallery)

    res.json(
      rows.map((row) => ({
        id: row._id?.toString(),
        image: row.image,
        sortOrder: row.sortOrder ?? null,
        createdAt: row.createdAt,
      })),
    )
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not load gallery' })
  }
})

app.post('/api/gallery', requireAdmin, async (req, res) => {
  try {
    const image = typeof req.body?.image === 'string' ? req.body.image : ''

    if (!image) {
      res.status(400).json({ error: 'Image is required' })
      return
    }

    if (!isDataImage(image)) {
      res.status(400).json({ error: 'Image must be a JPEG, PNG, WebP, or GIF data URL' })
      return
    }

    if (image.length > 3_500_000) {
      res.status(400).json({ error: 'Image is too large. Please use a smaller photo.' })
      return
    }

    const db = await getDb()
    const existing = await db.collection<GalleryDoc>('gallery').find({}).toArray()
    const ordered = existing
      .map((row) => row.sortOrder)
      .filter((value): value is number => typeof value === 'number')
    const sortOrder = ordered.length ? Math.min(...ordered) - 1 : 0

    const doc: GalleryDoc = {
      image,
      sortOrder,
      createdAt: new Date(),
    }

    const result = await db.collection<GalleryDoc>('gallery').insertOne(doc)

    res.status(201).json({ id: result.insertedId.toString(), sortOrder })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not save gallery image' })
  }
})

app.put('/api/gallery/reorder', requireAdmin, async (req, res) => {
  try {
    const ids = Array.isArray(req.body?.ids) ? req.body.ids : null
    if (!ids || !ids.every((id: unknown) => typeof id === 'string' && ObjectId.isValid(id))) {
      res.status(400).json({ error: 'ids must be an array of valid gallery ids' })
      return
    }

    const db = await getDb()
    const collection = db.collection<GalleryDoc>('gallery')
    const existing = await collection.find({}).toArray()
    const existingIds = new Set(existing.map((row) => row._id?.toString()).filter(Boolean))

    if (ids.length !== existingIds.size || ids.some((id: string) => !existingIds.has(id))) {
      res.status(400).json({ error: 'ids must include every gallery image exactly once' })
      return
    }

    await Promise.all(
      ids.map((id: string, index: number) =>
        collection.updateOne({ _id: new ObjectId(id) }, { $set: { sortOrder: index } }),
      ),
    )

    res.json({ ok: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not reorder gallery' })
  }
})

app.delete('/api/gallery/:id', requireAdmin, async (req, res) => {
  try {
    const id = paramId(req.params.id)
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid id' })
      return
    }

    const db = await getDb()
    const result = await db.collection('gallery').deleteOne({ _id: new ObjectId(id) })

    if (!result.deletedCount) {
      res.status(404).json({ error: 'Not found' })
      return
    }

    res.json({ ok: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Could not delete gallery image' })
  }
})

export default app
