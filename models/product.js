import mongoose from 'mongoose'

const Product = mongoose.model('Product', mongoose.Schema({
  name: String,
  description: String,
  price: Number,
}))

export default Product