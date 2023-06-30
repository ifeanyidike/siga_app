import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
  mongoose.set('strictQuery', true)

  if (isConnected) {
    console.log('MongoDB successfully connected!')
    return
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'siga_app',
      maxPoolSize: 50,
      wtimeoutMS: 2500,
    })
    isConnected = true
    console.log('MongoDB has now Connected!')
    console.log(process.env.MONGODB_URI)
  } catch (error) {
    console.log(error)
  }
}

export default connectToDB
