import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    code: String,
    language: String,
    id: String
},
  {
    timestamps: true
  }
)

const Category = mongoose.models.category || mongoose.model('category', categorySchema)

export default Category