import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
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
    }
},
  {
    timestamps: true
  }
)

const Cart = mongoose.models.cart || mongoose.model('cart', cartSchema)

export default Cart