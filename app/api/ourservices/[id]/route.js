import { connectToDB } from '@utils/database'
import Service from '@models/serviceModel'

export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    const service = await Service.findById(params.id)

    console.log(service)
    if (!service) {
      return new Response('Cannot find service', { status: 404 })
    }
    return new Response(JSON.stringify(service), { status: 200 })
  } catch (error) {
    return new Response('No Service available', { status: 500 })
  }
}
