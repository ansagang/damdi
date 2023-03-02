import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userId: String,
    list: [
      {
        product: Object,
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          value: Number,
          currency: String
        }
      },
    ],
    totalPrice: {
      value: Number,
      currency: String
    },
    status: String, //pending, delivering or ready
    shipping: {
        address: String,
        city: String,
        zipCode: String,
        district: String,
        country: String,
    },
    phoneNumber: String,
    fullname: String,
    type: String,
    office: Array
},
  {
    timestamps: true
  }
)

const Order = mongoose.models.order || mongoose.model('order', orderSchema)

export default Order