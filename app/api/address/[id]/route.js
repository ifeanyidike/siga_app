import { connectToDB } from '@utils/database'
import Address from '@models/addressModel'

// GET ALL THE ADDRESS

export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    const address = await Address.findById(params.id)
    if (!address) {
      return new Response('Cannot find address', { status: 404 })
    }
    return new Response(JSON.stringify(address), { status: 200 })
  } catch (error) {
    return new Response('No Address available', { status: 500 })
  }
}

// GET SPECIFIC SERVICE AND EDIT IT
export const PATCH = async (request, { params }) => {
  const { street, city, state, zipCode, country, phoneNo } =
    await request.json()
  try {
    await connectToDB()
    const existingAddress = await Address.findById(params.id)
    if (!existingAddress)
      return new Response('Address not found', { status: 404 })
    existingAddress.street = street
    existingAddress.city = city
    existingAddress.state = state
    existingAddress.zipCode = zipCode
    existingAddress.country = country
    existingAddress.phoneNo = phoneNo

    await existingAddress.save()
    return new Response(JSON.stringify(existingAddress), { status: 200 })
  } catch (error) {
    return new Response('Failed to upate Address', { status: 500 })
  }
}

// GET SPECIFIC SERVICE AND DELETE IT
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    await Address.findByIdAndRemove(params.id)
    return new Response('Address deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Faied to delete address', { status: 500 })
  }
}
