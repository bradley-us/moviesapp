// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '../../../lib/dbConnect'
import Movie from '../../../models/Movie'

type Data = {
  name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB()

  // POST api/movie
  const { method } = req

  switch (method) {
    case 'POST':
      try {
        const movie = new Movie(req.body)
        await movie.save()
        
        return res.status(200).json({success: true, movie})
      } catch (error) {
          return res.status(400).json({
            success: false,
            error
          })
      }
    default:
      return res.status(500).json({
        success: false,
        error: 'Failing server'
      })
  }
}
