import mongoose from 'mongoose'

let productSchema = mongoose.Schema({
  name: String,
  description: String,
  richDescription: String,
  image: String,
  images: Array,
  brand: String,
  price: Number,
  categoryID: Number,
  // category: ,
  countInStock: Number,
  rating: Number,
  isFeatured: Boolean,
  dateCreated: Date,
})

const Product = mongoose.model('Product', productSchema)

export default Product