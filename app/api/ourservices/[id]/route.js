import { connectToDB } from '@utils/database'
import Service from '@models/serviceModel'

export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    const service = await Service.findOne({ slug: params.id })

    console.log('service from backend', service)
    if (!service) {
      return new Response('Cannot find service', { status: 404 })
    }
    return new Response(JSON.stringify(service), { status: 200 })
  } catch (error) {
    return new Response('No Service available', { status: 500 })
  }
}

// GET SPECIFIC SERVICE AND EDIT IT
export const PATCH = async (request, { params }) => {
  const {
    name,
    slug,
    description,
    image,
    category,
    availability,
    quantity,
    rating,
    numreviews,
  } = await request.json()
  try {
    await connectToDB()
    const existingServicce = await Service.findOne({ slug: params.id })
    if (!existingServicce)
      return new Response('Service not found', { status: 404 })
    existingServicce.name = name
    existingServicce.slug = slug
    existingServicce.description = description
    existingServicce.image = image
    existingServicce.category = category
    existingServicce.availability = availability
    existingServicce.rating = rating
    existingServicce.quantity = quantity
    existingServicce.numreviews = numreviews
    await existingServicce.save()
    return new Response(JSON.stringify(existingServicce), { status: 200 })
  } catch (error) {
    return new Response('Failed to upate service', { status: 500 })
  }
}

// GET SPECIFIC SERVICE AND DELETE IT
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    await Service.findOneAndRemove({ slug: params.id })
    return new Response('Service deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Faied to delete service', { status: 500 })
  }
}
