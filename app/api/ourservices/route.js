import { connectToDB } from '@utils/database'
import Service from '@models/serviceModel'

export const GET = async (request) => {
  try {
    await connectToDB()
    const services = await Service.find({})

    return new Response(JSON.stringify(services), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch your service', { status: 500 })
  }
}
