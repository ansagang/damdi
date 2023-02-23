import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    userId: String,
    list: [
      {
        product: Array,
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
},
  {
    timestamps: true
  }
)

const Cart = mongoose.models.cart || mongoose.model('cart', cartSchema)

export default Cart