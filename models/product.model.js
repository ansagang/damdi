import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: {
        value: Number,
        currency: String
    },
    category: {
        title: String,
        code: String
    },
    images: [String],
    stock: Boolean,
    id: String,
    quantity:Number,
    flavors: [String],
    ingredients: [String],
    language: String,
    trendScore: Number
},
  {
    timestamps: true
  }
)

const Product = mongoose.models.product || mongoose.model('product', productSchema)

export default Product