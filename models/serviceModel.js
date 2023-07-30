import { Schema, model, models } from 'mongoose'

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter service name'],
    },
    slug: {
      type: String,
      required: [true, 'Please enter slug keyword'],
    },
    description: {
      type: String,
      required: [true, 'Please enter service name'],
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    category: {
      type: String,
      required: [true, 'Please indicate the category'],
    },
    availability: {
      type: String,
      required: [true, 'Please indicate availability'],
    },
    quantity: {
      type: Number,
      default: 1,
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: [
      {
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const Service = models.Service || model('Service', serviceSchema)
export default Service
