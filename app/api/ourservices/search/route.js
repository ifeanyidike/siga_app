import { NextResponse } from 'next/server'
import { connectToDB } from '@utils/database'
import Service from '@models/serviceModel'

export const GET = async (req, response) => {
  await connectToDB()

  const services = await Service.find({})

  const { searchParams } = new URL(req.url)
  console.log(req.url)
  const query = searchParams.get('query')

  const filteredServices = await Service.find({
    $or: [
      { name: { $regex: query, $options: 'i' } }, // Case-insensitive search on the name field
      { slug: { $regex: query, $options: 'i' } }, // Case-insensitive search on the slug field
      { category: { $regex: query, $options: 'i' } }, // Case-insensitive search on the category field
    ],
  })
  return new NextResponse(JSON.stringify(filteredServices), { status: 200 })
}

// pages/api/search.js

// export default async function handler(req, res)
