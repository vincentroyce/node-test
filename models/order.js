import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  orderItems: Array,
  shippingAddress: String,
  city: String,
  zip: String,
  country: String,
  phone: Number,
  status: String,
  totalPrice: Number,
  userID: Number,
  dateOrdered: Date,
})

const Order = mongoose.model('Order', orderSchema)

export default Order