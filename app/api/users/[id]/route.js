import { connectToDB } from '@utils/database'
import User from '@models/userModel'
import { uploads } from '@utils/cloudinary'

import fs from 'fs'
import upload from '@utils/multer'

// GET ALL THE USER

export const GET = async (request, { params }) => {
  try {
    await connectToDB()
    const user = await User.findById(params.id)
    if (!user) {
      return new Response('Cannot find User', { status: 404 })
    }
    return new Response(JSON.stringify(user), { status: 200 })
  } catch (error) {
    return new Response('No User available', { status: 500 })
  }
}

// GET SPECIFIC SERVICE AND EDIT IT

const multerMiddleware = upload.array('image')
export const PATCH = async (request, { params }) => {
  const { name, email, phone, role } = await request.json()
  try {
    await connectToDB()
    await multerMiddleware(request, response)
    const existingUser = await User.findById(params.id)

    if (request.files.length > 0) {
      const uploader = async (path) => await uploads('mysiga/avarta')

      const file = request.files[0]
      const { path } = file
      upload.array('image')
      const avartaResponse = await uploader(path)
      fs.unlinkSync(path)
      existingUser.avarta = avartaResponse
    }
    existingUser.name = name
    existingUser.email = email
    existingUser.phone = phone
    existingUser.role = role

    await existingUser.save()

    const successResponse = { message: 'User updated successfully' }
    return new Response(JSON.stringify(successResponse), { status: 200 })
  } catch (error) {
    const errorResponse = { message: 'Failed to update user' }
    return new Response(JSON.stringify(errorResponse), { status: 500 })
  }
}

// GET SPECIFIC SERVICE AND DELETE IT
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB()

    await User.findByIdAndRemove(params.id)
    return new Response('User deleted successfully', { status: 200 })
  } catch (error) {
    return new Response('Faied to delete User', { status: 500 })
  }
}
