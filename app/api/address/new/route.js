import Address from '@models/addressModel'
import { connectToDB } from '@utils/database'

export const POST = async (req, res) => {
  await connectToDB()

  const { street, city, state, phoneNo, zipCode, country, user } =
    await req.json()
  
  try {
    await connectToDB()
    const newAddressExists = await Address.findOne({ phoneNo })

    if (newAddressExists) {
      return new Response('The address with this PhoneNo already exist', {
        status: 400,
      })
    }

    const newAddress = new Address({
      street,
      city,
      state,
      phoneNo,
      zipCode,
      country,
      user: user._id,
    })

    await newAddress.save()
    console.log(newAddress)

    if (newAddress) {
      return new Response(
        JSON.stringify({
          _id: newAddress._id,
          user: newAddress.user,
          street: newAddress.street,
          city: newAddress.city,
          state: newAddress.state,
          phoneNo: newAddress.phoneNo,
          zipCode: newAddress.zipCode,
          country: newAddress.country,
        }),
        { status: 201 }
      )
    } else {
      return new Response('Invalid newAddress data', { status: 400 })
    }
  } catch (error) {
    console.log(error)
    return new Response('failed to add newAddress', { status: 500 })
  }
}
