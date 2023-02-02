import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: {
        value: Number,
        currency: String
    },
    category: {
        name: String,
        code: String
    },
    images: [String],
    stock: Boolean,
    id: String,
    weight: {
        unit: String,
        value: Number
    },
    quantity:Number,
    flavors: [String],
    language: String,
},
  {
    timestamps: true
  }
)

const Product = mongoose.models.product || mongoose.model('product', productSchema)

export default Product