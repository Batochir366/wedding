import 'dotenv/config'
import { MongoClient, type Db } from 'mongodb'

const globalForMongo = globalThis as typeof globalThis & {
  __mongoClientPromise?: Promise<MongoClient>
  __mongoClientUri?: string
}

function getUri() {
  const uri = process.env.MONGODB_URI
  if (!uri || uri.includes('USER:PASS@CLUSTER')) {
    throw new Error(
      'Set a real MONGODB_URI in .env (MongoDB Atlas connection string)',
    )
  }
  return uri
}

function getClientPromise() {
  const uri = getUri()

  // Drop cached client if the connection string changed (e.g. after editing .env)
  if (globalForMongo.__mongoClientUri !== uri) {
    globalForMongo.__mongoClientPromise = undefined
    globalForMongo.__mongoClientUri = uri
  }

  if (!globalForMongo.__mongoClientPromise) {
    const client = new MongoClient(uri)
    globalForMongo.__mongoClientPromise = client.connect().catch((error) => {
      // Don't keep a rejected promise forever — allow the next request to retry
      globalForMongo.__mongoClientPromise = undefined
      throw error
    })
  }

  return globalForMongo.__mongoClientPromise
}

export async function getDb(): Promise<Db> {
  const client = await getClientPromise()
  // Database name comes from the connection string path, e.g. ...mongodb.net/wedding
  return client.db()
}

export type RsvpDoc = {
  _id?: string
  name: string
  phone: string
  guests: string
  createdAt: Date
}

export type GreetingDoc = {
  _id?: string
  name: string
  greeting: string
  image: string
  createdAt: Date
}

export type GalleryDoc = {
  _id?: string
  image: string
  /** Lower numbers appear first. Optional for older docs. */
  sortOrder?: number
  createdAt: Date
}
