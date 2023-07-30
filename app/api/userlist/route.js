import { connectToDB } from '@utils/database'
import User from '@models/userModel'

export const GET = async (request) => {
  try {
    await connectToDB()
    const users = await User.find({})

    return new Response(JSON.stringify(users), { status: 200 })
  } catch (error) {
    return new Response('Failed to fetch your service', { status: 500 })
  }
}
