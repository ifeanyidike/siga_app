import { Schema, model, models } from 'mongoose'

const addressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    zipCode: {
      type: String,
    },
    country: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const Address = models.Address || model('Address', addressSchema)
export default Address
