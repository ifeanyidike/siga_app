import { connectToDB } from '@utils/database'
import Address from '@models/addressModel'

export const GET = async (request, { params }) => {
  console.log('Params =', params)
  try {
    await connectToDB()
    const addresses = await Address.find({
      user: params.id,
    }).populate('user')
    console.log('User Address is', addresses)
    return new Response(JSON.stringify(addresses), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch your address', { status: 500 })
  }
}


