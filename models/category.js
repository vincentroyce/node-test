import mongoose from 'mongoose'

let categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
})

const Category = mongoose.model('Category', categorySchema)

export default Category