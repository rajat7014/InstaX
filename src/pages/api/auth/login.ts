import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  try {
    await dbConnect() // Connect to MongoDB

    // Store username & password in the database
    const newUser = new User({ username, password })
    await newUser.save()

    return res.status(201).json({ message: 'Login successfull' })
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('❌ Database Error:', error.message)
      return res
        .status(500)
        .json({ error: 'Database error', details: error.message })
    } else {
      console.error('❌ Unexpected Error:', error)
      return res.status(500).json({ error: 'Unknown database error' })
    }
  }
}
