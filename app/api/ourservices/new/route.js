import Service from '@models/serviceModel'
import { connectToDB } from '@utils/database'
import { NextResponse } from 'next/server'

export const POST = async (req, res) => {
  await connectToDB()
  const {
    name,
    slug,
    description,
    images,
    category,
    availability,
    quantity,
    rating,
    numreviews,
  } = await req.json()

  try {
    await connectToDB()

    const newServiceExists = await Service.findOne({ name })
    if (newServiceExists) {
      return NextResponse.json(
        { message: 'You have already added this service' },
        {
          status: 400,
        }
      )
    }
    const newService = new Service({
      name,
      slug,
      description,
      images,
      category,
      availability,
      quantity,
      rating,
      numreviews,
    })

    await newService.save()
    console.log(newService)

    if (newService) {
      return new Response(
        JSON.stringify({
          _id: newService._id,
          name: newService.name,
          slug: newService.slug,
          description: newService.description,
          images: newService.images,
          category: newService.category,
          availability: newService.availability,
          quantity: newService.quantity,
          rating: newService.rating,
          numreviews: newService.numreviews,
        }),
        { status: 201 }
      )
    } else {
      return NextResponse.json(
        { message: 'Invalid service data' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.log(error)
    return new Response('failed to create a new user', { status: 500 })
  }
}
