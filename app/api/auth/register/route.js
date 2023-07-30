import User from '@models/userModel'
import { connectToDB } from '@utils/database'
import { NextResponse } from 'next/server'

export const POST = async (req, res) => {
  await connectToDB()
  const { name, email, password, phone, role } = await req.json()

  try {
    await connectToDB()
    const newUserExists = await User.findOne({ email })

    if (newUserExists) {
      return NextResponse.json(
        { message: 'User already exist, login instead' },
        { status: 400 }
      )
    }

    const newUser = new User({
      name,
      email,
      phone,
      password,
      role,
    })

    await newUser.save()
    console.log(newUser)

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      })
      redirect('/login')
    } else {
      return NextResponse.json(
        { message: 'Invalid newUser data' },
        { status: 400 }
      )
    }

    return NextResponse(JSON.stringify(newUser), {
      status: 201,
    })
  } catch (error) {
    return new Response(
      { message: 'failed to register new newUser' },
      { status: 500 }
    )
  }
}
