import { connectToDB } from '@utils/database'
import User from '@models/userModel'
import path from 'path'
import fs from 'fs'
import { cloudinary } from '@utils/cloudinary'

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

const getFormDataFields = (formData) => {
  const fields = {}
  let files = []

  for (const field of formData) {
    if (field[1] instanceof Blob) {
      files.push({ name: field[0], file: field[1] })
    } else {
      fields[field[0]] = field[1]
    }
  }
  return { fields, files }
}

const checkFileType = (blob) => {
  // We only want to accept image files of type jpg, jpeg, and png.
  // If file is not such, we reject it.
  const allowedTypes = /jpg|jpeg|png/

  if (!allowedTypes.test(path.extname(blob.name).toLowerCase())) {
    throw new Error('Please upload either a jpeg, jpg or a pn file online')
  }
}
const saveFileToDisk = async (blob) => {
  checkFileType(blob)

  try {
    const blobBuffer = Buffer.from(await blob.arrayBuffer())
    const extname = path.extname(blob.name)
    const partName = path.basename(blob.name, extname)
    const filename = `${partName}-${Date.now()}${extname}`
    const destinationPath = 'public/assets/uploads/' + filename

    // Write the Blob data to the destination file
    fs.writeFile(destinationPath, blobBuffer, (err) => {
      if (err) {
        console.error('Error writing file:', err)
        return
      }

      console.log('File saved successfully to upload folder')
    })
    return destinationPath
  } catch (error) {
    console.log('error: ', error.message)
  }
}

export const PATCH = async (request, { params }) => {
  // const { name, email, phone, role } = await request.json()
  try {
    const form = await request.formData()
    const { fields, files } = getFormDataFields(form)

    const filePath = await saveFileToDisk(files[0].file)

    await connectToDB()
    // await multerMiddleware(request, response);
    const existingUser = await User.findById(params.id)

    const avatarFolder = 'mysiga/avatar'
    if (filePath) {
      const uploadResponse = await cloudinary.uploader.upload(filePath, {
        folder: avatarFolder,
      })
      fs.unlinkSync(filePath)
      existingUser.avatar = {
        public_id: uploadResponse.public_id,
        url: uploadResponse.url,
      }
    }

    existingUser.name = fields.name
    existingUser.email = fields.email
    existingUser.phone = fields.phone
    existingUser.role = fields.role

    await existingUser.save()

    const successResponse = { message: 'User updated successfully' }
    return new Response(JSON.stringify(successResponse), { status: 200 })
  } catch (error) {
    console.log('error', error.message, error.response?.data)
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
