import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  lang: String,
  role: String,
  email: String,
  fullname: String,
  phone: String,
  shipping: {
    address: String,
    city: String,
    country: String,
    district: String,
  }
},
  {
    timestamps: true
  }
)

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User