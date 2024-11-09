import mongoose from 'mongoose'

let categorySchema = mongoose.Schema({
  name: String,
  color: String,
  icon: String,
  image: String,
})

const Category = mongoose.model('Category', categorySchema)

export default Category