import mongoose from 'mongoose'

let productSchema = mongoose.Schema({
  name: String,
  description: String,
  price: Number,
})

const Product = mongoose.model('Product', productSchema)

export default Product