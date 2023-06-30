import Service from '@models/serviceModel'
import { connectToDB } from '@utils/database'

export const POST = async (req, res) => {
  await connectToDB()
  const {
    name,
    slug,
    description,
    image,
    category,
    availability,
    quantity,
    rating,
    reviews,
  } = await req.json()

  try {
    await connectToDB()

    const newServiceExists = await Service.findOne({ name })
    if (newServiceExists) {
      return new Response('You have already added this service', {
        status: 400,
      })
    }
    const newService = new Service({
      name,
      slug,
      description,
      image,
      category,
      availability,
      quantity,
      rating,
      reviews,
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
          image: newService.image,
          category: newService.category,
          availability: newService.availability,
          quantity: newService.quantity,
          rating: newService.rating,
          reviews: newService.reviews,
        }),
        { status: 201 }
      )
    } else {
      return new Response('Invalid service data', { status: 400 })
    }
  } catch (error) {
    console.log(error)
    return new Response('failed to create a new user', { status: 500 })
  }
}
