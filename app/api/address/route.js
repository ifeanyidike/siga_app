import { connectToDB } from '@utils/database'
import Address from '@models/addressModel'

export const GET = async (request) => {
  try {
    await connectToDB()
    const addresses = await Address.find({})
    console.log(' USER', user)
    return new Response(JSON.stringify(addresses), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch your address', { status: 500 })
  }
}
