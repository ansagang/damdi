import mongoose from 'mongoose'

const officeSchema = new mongoose.Schema({
    address: String,
    building: String,
    city: String,
    schedule: {
        start: String,
        end: String
    },
    phone: String,
    language: String,
    id: String,
    country: String,
    title: String
},
  {
    timestamps: true
  }
)

const Office = mongoose.models.office || mongoose.model('office', officeSchema)

export default Office