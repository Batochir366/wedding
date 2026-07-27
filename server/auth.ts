import { SignJWT, jwtVerify } from 'jose'
import type { Request, Response, NextFunction } from 'express'

const encoder = new TextEncoder()

function getSecret() {
  const secret = process.env.JWT_SECRET
  if (!secret) throw new Error('Missing JWT_SECRET environment variable')
  return encoder.encode(secret)
}

export async function createToken(username: string) {
  return new SignJWT({ role: 'admin', username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret())
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret())
  return payload
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization
    if (!header?.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    await verifyToken(header.slice(7))
    next()
  } catch {
    res.status(401).json({ error: 'Unauthorized' })
  }
}

export function checkAdminCredentials(username: string, password: string) {
  const expectedUser = process.env.ADMIN_USERNAME || 'admin'
  const expectedPass = process.env.ADMIN_PASSWORD

  if (!expectedPass) {
    throw new Error('Missing ADMIN_PASSWORD environment variable')
  }

  return username === expectedUser && password === expectedPass
}
