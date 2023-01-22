import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  lang: String,
  role: String,
  img: String,
  email: String,
},
  {
    timestamps: true
  }
)

const User = mongoose.models.user || mongoose.model('user', userSchema)

export default User