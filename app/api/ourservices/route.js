import { connectToDB } from '@utils/database'
import Service from '@models/serviceModel'
import onError from '@backend/middlewares/errors'
import { createRouter } from 'next-connect'

export const router = createRouter()
export const GET = async (request, cxt) => {
  router.run(request, cxt)
  // const { q: query } = request.query
  try {
    await connectToDB()

    const services = await Service.find({})

    return new Response(JSON.stringify(services), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch your service', { status: 500 })
  }
}
router.handler({ onError })
